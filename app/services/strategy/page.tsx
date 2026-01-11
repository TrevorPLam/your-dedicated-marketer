import type { Metadata } from 'next'
import { TrendingUp } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Marketing Strategy | Your Dedicated Marketer',
  description: 'Marketing strategy leadership across priorities, budgets, and success measures.',
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

export default function MarketingStrategyPage() {
  return (
    <ServiceDetailLayout
      icon={TrendingUp}
      title="Marketing Strategy"
      subtitle="The Brain"
      description={standardDescription}
      serviceSlug="strategy"
      included={[
        'Translating vision into priorities',
        'Deciding what matters now vs. later',
        'Resource allocation and budgeting',
        'Aligning all work to business goals',
        'Defining clear KPIs and measures of success',
      ]}
      whoItsFor={[
        'When the business has ideas but no clear priorities — or when marketing effort feels scattered. This becomes critical when budget, time, and attention need structure, and your team needs a clear plan that connects to real business outcomes. If you want execution to stay aligned instead of drifting into random tactics, this pillar matters.',
      ]}
      pricing={standardPricing}
      faqs={standardFaqs}
    />
  )
}
