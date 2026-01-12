import { describe, expect, it, vi } from 'vitest'

const buildPayload = (overrides?: Partial<{
  name: string
  email: string
  phone: string
  website: string
  message: string
}>) => ({
  name: 'Test User',
  email: 'test.user@example.com',
  phone: '555-123-4567',
  website: '',
  message: 'This is a sufficiently long message for validation.',
  ...overrides,
})

const setupActions = async ({
  envOverrides,
  mockResend = false,
  resendSendResult = Promise.resolve({}),
  mockUpstash = false,
  upstashLimitResults = [{ success: true }, { success: true }],
}: {
  envOverrides?: Partial<{
    RESEND_API_KEY?: string
    CONTACT_EMAIL?: string
    UPSTASH_REDIS_REST_URL?: string
    UPSTASH_REDIS_REST_TOKEN?: string
  }>
  mockResend?: boolean
  resendSendResult?: Promise<unknown>
  mockUpstash?: boolean
  upstashLimitResults?: Array<{ success: boolean }>
}) => {
  vi.resetModules()

  const logError = vi.fn()
  const logInfo = vi.fn()
  const logWarn = vi.fn()

  vi.doMock('@/lib/logger', () => ({
    logError,
    logInfo,
    logWarn,
  }))

  vi.doMock('next/headers', () => ({
    headers: () => ({
      get: (key: string) => (key === 'x-forwarded-for' ? '203.0.113.44' : null),
    }),
  }))

  vi.doMock('@/lib/env', () => ({
    validatedEnv: {
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_SITE_NAME: 'Your Dedicated Marketer',
      CONTACT_EMAIL: 'contact@example.com',
      NODE_ENV: 'test',
      ...envOverrides,
    },
  }))

  const resendSendMock = vi.fn().mockReturnValue(resendSendResult)

  if (mockResend) {
    vi.doMock('resend', () => ({
      Resend: vi.fn().mockImplementation(() => ({
        emails: { send: resendSendMock },
      })),
    }))
  }

  const limitMock = vi.fn()

  if (mockUpstash) {
    upstashLimitResults.forEach((result) => {
      limitMock.mockResolvedValueOnce(result)
    })

    const Ratelimit = vi.fn().mockImplementation(() => ({
      limit: limitMock,
    })) as unknown as { new (): { limit: typeof limitMock }; slidingWindow: () => string }
    Ratelimit.slidingWindow = vi.fn().mockReturnValue('sliding-window')

    const Redis = vi.fn().mockImplementation(() => ({}))

    vi.doMock('@upstash/ratelimit', () => ({ Ratelimit }))
    vi.doMock('@upstash/redis', () => ({ Redis }))
  }

  const { submitContactForm } = await import('@/lib/actions')

  return {
    submitContactForm,
    resendSendMock,
    limitMock,
    logError,
    logInfo,
    logWarn,
  }
}

describe('contact form integrations', () => {
  it('sends email via Resend when configured', async () => {
    const { submitContactForm, resendSendMock } = await setupActions({
      envOverrides: {
        RESEND_API_KEY: 'test-api-key',
        CONTACT_EMAIL: 'leads@example.com',
      },
      mockResend: true,
    })

    const result = await submitContactForm(buildPayload())

    expect(result.success).toBe(true)
    expect(resendSendMock).toHaveBeenCalledTimes(1)
    expect(resendSendMock.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        to: 'leads@example.com',
      })
    )
    expect(resendSendMock.mock.calls[0]?.[0]?.subject).not.toMatch(/[\r\n]/)
  })

  it('returns a generic error when email delivery fails', async () => {
    const { submitContactForm, logError } = await setupActions({
      envOverrides: {
        RESEND_API_KEY: 'test-api-key',
      },
      mockResend: true,
      resendSendResult: Promise.reject(new Error('Resend offline')),
    })

    const result = await submitContactForm(buildPayload({ email: 'error@example.com' }))

    expect(result.success).toBe(false)
    expect(result.message).toMatch(/something went wrong/i)
    expect(logError).toHaveBeenCalled()
  })
})

describe('contact form rate limiting with Upstash', () => {
  it('stops processing when the email limit is exceeded', async () => {
    const { submitContactForm, limitMock } = await setupActions({
      envOverrides: {
        UPSTASH_REDIS_REST_URL: 'https://example.upstash.io',
        UPSTASH_REDIS_REST_TOKEN: 'token',
      },
      mockUpstash: true,
      upstashLimitResults: [{ success: false }],
    })

    const result = await submitContactForm(buildPayload({ email: 'limited@example.com' }))

    expect(result.success).toBe(false)
    expect(result.message).toMatch(/too many submissions/i)
    expect(limitMock).toHaveBeenCalledTimes(1)
  })
})
