import { test, expect, type Page } from '@playwright/test'

async function submitContactForm(
  page: Page,
  {
    name,
    email,
    message,
    phone,
    company,
    marketingSpend,
    hearAboutUs,
  }: {
    name: string
    email: string
    message: string
    phone?: string
    company?: string
    marketingSpend?: string
    hearAboutUs?: string
  }
) {
  await page.getByLabel('Name').fill(name)
  await page.getByLabel('Email').fill(email)
  if (company) {
    await page.getByLabel('Company').fill(company)
  }
  if (phone) {
    await page.getByLabel('Phone').fill(phone)
  }
  if (marketingSpend) {
    await page.getByLabel('Current Monthly Marketing Spend').selectOption(marketingSpend)
  }
  await page.getByLabel('Message').fill(message)
  if (hearAboutUs) {
    await page.getByLabel('How did you hear about us?').selectOption(hearAboutUs)
  }
  await page.getByRole('button', { name: /send message/i }).click()
}

test('homepage to services to contact form flow', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Services' }).click()
  await expect(page).toHaveURL(/\/services/)

  await page.getByRole('button', { name: /schedule free consultation/i }).click()
  await expect(page).toHaveURL(/\/contact/)

  await expect(page.getByRole('form', { name: /contact form/i })).toBeVisible()
})

test('blog listing to blog post to CTA', async ({ page }) => {
  await page.goto('/blog')

  const firstPost = page.getByRole('link', { name: /read more/i }).first()
  await firstPost.click()

  await expect(page).toHaveURL(/\/blog\//)
  await page.getByRole('link', { name: /get started today/i }).click()

  await expect(page).toHaveURL(/\/contact/)
})

test('mobile navigation flow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  await page.getByRole('button', { name: /toggle mobile menu/i }).click()
  await page.getByRole('link', { name: /blog/i }).click()

  await expect(page).toHaveURL(/\/blog/)
})

test('contact form validation', async ({ page }) => {
  await page.goto('/contact')

  await page.getByRole('button', { name: /send message/i }).click()

  await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible()
  await expect(page.getByText(/invalid email address/i)).toBeVisible()
  await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible()
})

test('contact form submission success', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': '203.0.113.10' })
  await page.goto('/contact')

  await submitContactForm(page, {
    name: 'Jamie Test',
    email: `jamie.${Date.now()}@example.com`,
    message: 'Looking for marketing strategy support for Q2 growth.',
    phone: '555-120-9988',
  })

  await expect(page.getByRole('alert')).toContainText(/thank you for your message/i)
})

test('contact form submission with optional fields', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': '203.0.113.12' })
  await page.goto('/contact')

  await submitContactForm(page, {
    name: 'Casey Optional',
    email: `casey.${Date.now()}@example.com`,
    message: 'Interested in support for a multi-channel campaign.',
    phone: '555-321-7777',
    company: 'Optional Fields LLC',
    marketingSpend: '1k-5k',
    hearAboutUs: 'referral',
  })

  await expect(page.getByRole('alert')).toContainText(/thank you for your message/i)
})

test('contact form rate limiting', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': '203.0.113.11' })
  await page.goto('/contact')

  const email = `rate.limit.${Date.now()}@example.com`

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await submitContactForm(page, {
      name: `Rate Limit ${attempt + 1}`,
      email,
      message: `Submission attempt ${attempt + 1} to validate rate limiting.`,
    })
    await expect(page.getByRole('alert')).toContainText(/thank you for your message/i)
  }

  await submitContactForm(page, {
    name: 'Rate Limit 4',
    email,
    message: 'Submission attempt 4 should trigger rate limiting.',
  })

  await expect(page.getByRole('alert')).toContainText(/too many submissions/i)
})

test('search returns no results for unmatched query', async ({ page }) => {
  await page.goto('/search?q=unlikely-to-match-search-query')

  await expect(page.getByText(/no results found/i)).toBeVisible()
})

test('404 page handling', async ({ page }) => {
  await page.goto('/non-existent-page')

  await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
})
