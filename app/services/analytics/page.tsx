import type { Metadata } from 'next'
import { BarChart } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Analytics & Decision Support | Your Dedicated Marketer',
  description: 'Analytics and decision support handled within one pillar.',
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

export default function AnalyticsDecisionSupportPage() {
  return (
    <ServiceDetailLayout
      icon={BarChart}
      title="Analytics & Decision Support"
      subtitle="The Scoreboard"
      description={standardDescription}
      serviceSlug="analytics"
      included={[
        'Tracking setup and data integrity',
        'Performance reporting and visibility',
        'Attribution modeling',
        'Making data usable for strategic decisions',
      ]}
      whoItsFor={[
        'When the team is investing time or money into marketing but lacks clarity on what’s actually driving results. This becomes critical when decisions are based on opinions, metrics are inconsistent, or attribution is unclear. If you want confident decisions backed by clean measurement, this pillar matters.',
      ]}
      pricing={standardPricing}
      faqs={standardFaqs}
    />
  )
}
