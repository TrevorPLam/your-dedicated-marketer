import type { Metadata } from 'next'
import { Share2 } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Advertising & Lead Generation | Your Dedicated Marketer',
  description: 'Paid acquisition and lead flow managed within one pillar.',
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

export default function AdvertisingLeadGenerationPage() {
  return (
    <ServiceDetailLayout
      icon={Share2}
      title="Advertising & Lead Generation"
      subtitle="The Traffic"
      description={standardDescription}
      serviceSlug="advertising"
      included={[
        'Paid growth strategy and media buying',
        'Campaign execution, testing, and optimization',
        'Lead flow quality and efficiency',
        'Budget management (ROAS / CAC focus)',
        'Paid search visibility',
      ]}
      whoItsFor={[
        'When your team wants faster growth and is willing to invest — but needs efficiency and control. This becomes critical when lead quality is inconsistent, spend is rising without clarity, or campaigns aren’t aligned with how sales actually works. If you want acquisition that is managed, measured, and improved continuously, this pillar matters.',
      ]}
      pricing={standardPricing}
      faqs={standardFaqs}
    />
  )
}
