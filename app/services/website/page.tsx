import type { Metadata } from 'next'
import { Users } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Website & Conversion | Your Dedicated Marketer',
  description: 'Website, conversion paths, and front-end funnels handled within one pillar.',
}

const standardDescription =
  'This area represents one part of a broader marketing partnership. You and your team set the direction. I take responsibility for execution, follow-through, and continuous improvement within this pillar.'

const standardPricing = [
  {
    tier: 'Starter',
    description: 'Starter engagement for focused priorities.',
    href: '/pricing#starter',
  },
  {
    tier: 'Growth',
    description: 'Growth engagement for multi-channel coordination.',
    href: '/pricing#growth',
  },
  {
    tier: 'Scale',
    description: 'Scale engagement for ongoing leadership and execution.',
    href: '/pricing#scale',
  },
]

const standardFaqs = [
  {
    question: 'How does this pillar fit into the engagement?',
    answer: 'It is handled alongside the other pillars so priorities can shift without losing momentum.',
  },
  {
    question: 'What happens after we align on priorities?',
    answer: 'I take responsibility for execution, follow-through, and ongoing adjustments while keeping your team aligned.',
  },
]

export default function WebsiteConversionPage() {
  return (
    <ServiceDetailLayout
      icon={Users}
      title="Website & Conversion"
      subtitle="The Storefront"
      description={standardDescription}
      serviceSlug="website"
      included={[
        'Website structure, messaging, and maintenance',
        'Conversion paths and user experience (UX)',
        'Front-end funnel mechanics and click flows',
        'Performance, speed, and technical SEO',
        'Conversion Rate Optimization (CRO)',
      ]}
      whoItsFor={[
        'When traffic is coming in but leads aren’t — or when the website doesn’t reflect how the business should be positioned. This becomes critical when the site is creating friction: unclear messaging, weak conversion paths, slow performance, or poor mobile experience. If your team needs the website to act like a growth asset instead of a brochure, this pillar matters.',
      ]}
      pricing={standardPricing}
      faqs={standardFaqs}
    />
  )
}
