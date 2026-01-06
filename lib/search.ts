/**
 * Search index generation for site-wide search.
 * 
 * **Purpose:**
 * - Combine static pages and blog posts into searchable index
 * - Provide structured data for SearchDialog component
 * - Enable client-side filtering by title, description, tags
 * 
 * **Architecture:**
 * - Static pages: Hardcoded in this file (update when adding pages)
 * - Blog posts: Dynamically loaded from lib/blog.ts
 * - Generated at: Build time (SSG)
 * 
 * **Usage:**
 * ```typescript
 * import { getSearchIndex } from '@/lib/search'
 * 
 * const items = getSearchIndex()
 * // Pass to SearchDialog component
 * ```
 * 
 * **When to Update:**
 * - Add to `staticPages` array when creating new static pages
 * - Blog posts are automatically included
 * 
 * @module lib/search
 */

import { getAllPosts } from '@/lib/blog'

/**
 * Search index item structure.
 * 
 * @property id - Unique identifier (prefixed with 'page-' or 'post-')
 * @property title - Display title
 * @property description - Search snippet / meta description
 * @property href - URL path
 * @property type - 'Page' for static pages, 'Blog' for posts
 * @property tags - Optional keywords for search matching
 */
export type SearchItem = {
  id: string
  title: string
  description: string
  href: string
  type: 'Page' | 'Blog'
  tags?: string[]
}

/**
 * Static pages registry.
 * 
 * **Maintenance:**
 * When adding a new static page to the site:
 * 1. Create the page in app/
 * 2. Add an entry here with appropriate metadata
 * 3. Update sitemap.ts if needed
 * 
 * @internal
 */
const staticPages: SearchItem[] = [
  {
    id: 'page-home',
    title: 'Home',
    description: 'Overview of our marketing services, results, and client success stories.',
    href: '/',
    type: 'Page',
    tags: ['marketing', 'services', 'agency'],
  },
  {
    id: 'page-services',
    title: 'Services',
    description: 'Explore SEO, content, social media, and email marketing services.',
    href: '/services',
    type: 'Page',
    tags: ['seo', 'content', 'social', 'email'],
  },
  {
    id: 'page-pricing',
    title: 'Pricing',
    description: 'Review marketing packages, deliverables, and pricing tiers.',
    href: '/pricing',
    type: 'Page',
    tags: ['pricing', 'packages'],
  },
  {
    id: 'page-case-studies',
    title: 'Case Studies',
    description: 'See how we deliver measurable growth for clients.',
    href: '/case-studies',
    type: 'Page',
    tags: ['results', 'growth'],
  },
  {
    id: 'page-blog',
    title: 'Blog',
    description: 'Marketing insights, trends, and strategies from our team.',
    href: '/blog',
    type: 'Page',
    tags: ['blog', 'insights'],
  },
  {
    id: 'page-contact',
    title: 'Contact',
    description: 'Get in touch to schedule a free consultation.',
    href: '/contact',
    type: 'Page',
    tags: ['contact', 'consultation'],
  },
  {
    id: 'page-about',
    title: 'About',
    description: 'Learn about the team, mission, and marketing approach.',
    href: '/about',
    type: 'Page',
    tags: ['team', 'mission'],
  },
]

export function getSearchIndex(): SearchItem[] {
  const posts = getAllPosts().map((post) => ({
    id: `post-${post.slug}`,
    title: post.title,
    description: post.description,
    href: `/blog/${post.slug}`,
    type: 'Blog' as const,
    tags: [post.category, post.author],
  }))

  return [...staticPages, ...posts]
}
