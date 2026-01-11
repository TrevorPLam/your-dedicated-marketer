import type { Metadata } from 'next'
import { TrendingUp } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Marketing Strategy | Your Dedicated Marketer',
  description: 'Marketing strategy leadership across priorities, budgets, and success measures.',
}


export default function MarketingStrategyPage() {
  return (
    <ServiceDetailLayout
      icon={TrendingUp}
      title="Marketing Strategy"
      subtitle="The Brain"
      description={STANDARD_SERVICE_DESCRIPTION}
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
      pricing={STANDARD_SERVICE_PRICING}
      faqs={STANDARD_SERVICE_FAQS}
    />
  )
}
