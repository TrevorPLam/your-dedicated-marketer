import type { Metadata } from 'next'
import { BarChart } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Analytics & Decision Support | Your Dedicated Marketer',
  description: 'Analytics and decision support handled within one pillar.',
}


export default function AnalyticsDecisionSupportPage() {
  return (
    <ServiceDetailLayout
      icon={BarChart}
      title="Analytics & Decision Support"
      subtitle="The Scoreboard"
      description={STANDARD_SERVICE_DESCRIPTION}
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
      pricing={STANDARD_SERVICE_PRICING}
      faqs={STANDARD_SERVICE_FAQS}
    />
  )
}
