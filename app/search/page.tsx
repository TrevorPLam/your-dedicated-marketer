import type { Metadata } from 'next'
import SearchPage from '@/components/SearchPage'
import { getSearchIndex } from '@/lib/search'

export const metadata: Metadata = {
  title: 'Search | Your Dedicated Marketer',
  description: 'Search blog posts, services, and marketing resources across the site.',
}

export default async function SearchRoute({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''
  const items = getSearchIndex()

  return <SearchPage items={items} initialQuery={query} />
}
