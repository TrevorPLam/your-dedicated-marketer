import type { Metadata } from 'next'
import { Share2 } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Advertising & Lead Generation | Your Dedicated Marketer',
  description: 'Paid acquisition and lead flow managed within one pillar.',
}


export default function AdvertisingLeadGenerationPage() {
  return (
    <ServiceDetailLayout
      icon={Share2}
      title="Advertising & Lead Generation"
      subtitle="The Traffic"
      description={STANDARD_SERVICE_DESCRIPTION}
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
      pricing={STANDARD_SERVICE_PRICING}
      faqs={STANDARD_SERVICE_FAQS}
    />
  )
}
