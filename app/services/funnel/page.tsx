import type { Metadata } from 'next'
import { Users } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Funnels (Website & Conversion) | Your Dedicated Marketer',
  description: 'Funnel work handled within the Website & Conversion pillar.',
}

const standardFaqs = [
  {
    question: 'How does this focus area fit into the engagement?',
    answer:
      'Funnel work is handled within the Website & Conversion pillar so it stays aligned with the website and conversion paths.',
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
      description={STANDARD_SERVICE_DESCRIPTION}
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
      pricing={STANDARD_SERVICE_PRICING}
      faqs={standardFaqs}
    />
  )
}
