import type { Metadata } from 'next'
import { Users } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Funnels (Website & Conversion) | Your Dedicated Marketer',
  description: 'Funnel work handled within the Website & Conversion pillar.',
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
    question: 'How does this focus area fit into the engagement?',
    answer: 'Funnel work is handled within the Website & Conversion pillar so it stays aligned with the website and conversion paths.',
  },
  {
    question: 'What happens after we align on priorities?',
    answer: 'I take responsibility for execution, follow-through, and ongoing adjustments while keeping your team aligned.',
  },
]

export default function FunnelBuildOutPage() {
  return (
    <ServiceDetailLayout
      icon={Users}
      title="Funnels (Website & Conversion)"
      subtitle="Component within the pillar"
      description={standardDescription}
      serviceSlug="funnel"
      included={[
        'Conversion path alignment inside the Website & Conversion pillar',
        'Landing page and offer flow coordination',
        'Step-by-step handoff between ads, site, and CRM',
        'Friction checks across key visitor actions',
        'Ongoing adjustments tied to pillar priorities',
      ]}
      whoItsFor={[
        'When the path from visit to action needs attention within the broader engagement. This becomes important when the handoff between pages, forms, and follow-up is unclear or inconsistent. If you want funnel work handled as part of the Website & Conversion pillar, this focus area fits.',
      ]}
      pricing={standardPricing}
      faqs={standardFaqs}
    />
  )
}
