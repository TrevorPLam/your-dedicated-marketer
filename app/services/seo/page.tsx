import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'SEO (Content & Brand Presence) | Your Dedicated Marketer',
  description: 'SEO support delivered within the Content & Brand Presence and Website & Conversion pillars.',
}

const standardDescription =
  'This area represents one part of a broader marketing partnership. You and your team set the direction. I take responsibility for execution, follow-through, and continuous improvement within this pillar.'

const standardFaqs = [
  {
    question: 'How does this focus area fit into the engagement?',
    answer: 'SEO is handled within the Content & Brand Presence and Website & Conversion pillars so it stays aligned with the broader plan.',
  },
  {
    question: 'What happens after we align on priorities?',
    answer: 'I take responsibility for execution, follow-through, and ongoing adjustments while keeping your team aligned.',
  },
]

export default function SEOServicesPage() {
  return (
    <ServiceDetailLayout
      icon={Search}
      title="SEO (Content & Brand Presence)"
      subtitle="Component within the pillars"
      description={standardDescription}
      serviceSlug="seo"
      included={[
        'Search visibility priorities aligned to the broader plan',
        'Technical SEO coordination within Website & Conversion',
        'Organic visibility alignment within Content & Brand Presence',
        'Search-friendly structure and metadata reviews',
        'Ongoing monitoring tied to pillar priorities',
      ]}
      whoItsFor={[
        'When search visibility needs focused attention within the broader engagement. This becomes important when the website or content needs stronger alignment to how people discover and evaluate your business. If you want SEO handled as part of the overall plan rather than a standalone effort, this focus area fits.',
      ]}
      pricing={[
        {
          tier: 'Starter',
          description: 'Basic SEO foundation for small businesses',
          href: '/pricing#starter',
        },
        {
          tier: 'Growth',
          description: 'Advanced SEO with ongoing optimization',
          href: '/pricing#growth',
        },
        {
          tier: 'Scale',
          description: 'Comprehensive SEO with technical implementation',
          href: '/pricing#scale',
        },
      ]}
      faqs={standardFaqs}
    />
  )
}
