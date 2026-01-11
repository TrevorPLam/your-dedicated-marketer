import type { Metadata } from 'next'
import { BarChart } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Reporting (Analytics & Decision Support) | Your Dedicated Marketer',
  description: 'Reporting handled within the Analytics & Decision Support pillar.',
}

const standardFaqs = [
  {
    question: 'How does this focus area fit into the engagement?',
    answer:
      'Reporting is handled within the Analytics & Decision Support pillar so it reflects the broader priorities.',
  },
  {
    question: 'What happens after we align on priorities?',
    answer: 'I take responsibility for execution, follow-through, and ongoing adjustments while keeping your team aligned.',
  },
]

export default function MarketingReportingPage() {
  return (
    <ServiceDetailLayout
      icon={BarChart}
      title="Reporting (Analytics & Decision Support)"
      subtitle="Component within the pillar"
      description={STANDARD_SERVICE_DESCRIPTION}
      serviceSlug="reporting"
      included={[
        'Performance visibility aligned to Analytics & Decision Support',
        'Reporting cadence tied to decision needs',
        'Metric definitions kept consistent across teams',
        'Context that connects performance to priorities',
        'Adjustments based on what the data makes clear',
      ]}
      whoItsFor={[
        'When the team needs clarity without treating reporting as a standalone effort. This becomes important when visibility is inconsistent or decisions rely on partial data. If you want reporting handled as part of the Analytics & Decision Support pillar, this focus area fits.',
      ]}
      pricing={STANDARD_SERVICE_PRICING}
      faqs={standardFaqs}
    />
  )
}
