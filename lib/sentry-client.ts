let sentryPromise: Promise<typeof import('@sentry/nextjs')> | null = null

function loadSentry() {
  if (!sentryPromise) {
    sentryPromise = import('@sentry/nextjs')
  }
  return sentryPromise
}

export async function setSentryUser(user: { id?: string; email?: string; name?: string }) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SENTRY_DSN) return
  const Sentry = await loadSentry().catch(() => null)
  if (Sentry) {
    Sentry.setUser(user)
  }
}

export async function setSentryContext(name: string, context: Record<string, unknown>) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SENTRY_DSN) return
  const Sentry = await loadSentry().catch(() => null)
  if (Sentry) {
    Sentry.setContext(name, context)
  }
}
