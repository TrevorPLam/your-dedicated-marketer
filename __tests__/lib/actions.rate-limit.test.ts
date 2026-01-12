import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitContactForm } from '@/lib/actions'
import { logError, logWarn } from '@/lib/logger'

let currentIp = '203.0.113.1'
const fetchMock = vi.hoisted(() => vi.fn())

vi.stubGlobal('fetch', fetchMock)

vi.mock('next/headers', () => ({
  headers: () => ({
    get: (key: string) => {
      if (key === 'x-forwarded-for') {
        return currentIp
      }
      return null
    },
  }),
}))

vi.mock('@/lib/logger', () => ({
  logError: vi.fn(),
  logInfo: vi.fn(),
  logWarn: vi.fn(),
}))

const buildPayload = (email: string) => ({
  name: 'Test User',
  email,
  phone: '555-123-4567',
  website: '',
  message: 'This is a sufficiently long message for validation.',
})

describe('contact form rate limiting', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    currentIp = '203.0.113.1'
    let leadCounter = 0
    fetchMock.mockImplementation(async (input: RequestInfo) => {
      const url = typeof input === 'string' ? input : input.toString()
      const supabaseRestUrl = `${process.env.SUPABASE_URL}/rest/v1/leads`

      if (url === supabaseRestUrl) {
        leadCounter += 1
        return {
          ok: true,
          status: 201,
          json: async () => [{ id: `lead-${leadCounter}` }],
        }
      }

      if (url.startsWith(`${supabaseRestUrl}?id=eq.`)) {
        return { ok: true, status: 200, json: async () => [] }
      }

      if (url.endsWith('/crm/v3/objects/contacts/search')) {
        return { ok: true, status: 200, json: async () => ({ total: 0, results: [] }) }
      }

      if (url.endsWith('/crm/v3/objects/contacts')) {
        return { ok: true, status: 200, json: async () => ({ id: 'hubspot-123' }) }
      }

      if (url.includes('/crm/v3/objects/contacts/')) {
        return { ok: true, status: 200, json: async () => ({ id: 'hubspot-123' }) }
      }

      return { ok: false, status: 404, json: async () => ({ message: 'not found' }) }
    })
  })

  it('enforces email limits even when the IP changes', async () => {
    const email = 'limit@example.com'

    const first = await submitContactForm(buildPayload(email))
    const second = await submitContactForm(buildPayload(email))
    const third = await submitContactForm(buildPayload(email))

    currentIp = '203.0.113.2'
    const fourth = await submitContactForm(buildPayload(email))

    expect(first.success).toBe(true)
    expect(second.success).toBe(true)
    expect(third.success).toBe(true)
    expect(fourth.success).toBe(false)
  })

  it('allows submissions when both email and IP change', async () => {
    const email = 'original@example.com'

    await submitContactForm(buildPayload(email))
    await submitContactForm(buildPayload(email))
    await submitContactForm(buildPayload(email))

    currentIp = '198.51.100.5'
    const next = await submitContactForm(buildPayload('fresh@example.com'))

    expect(next.success).toBe(true)
  })

  it('rejects submissions when the honeypot is filled', async () => {
    const response = await submitContactForm({
      ...buildPayload('bot@example.com'),
      website: 'https://spam.example.com',
    })

    expect(response.success).toBe(false)
    expect(logWarn).toHaveBeenCalledWith('Honeypot field triggered for contact form submission')
    expect(logError).not.toHaveBeenCalled()
  })
})
