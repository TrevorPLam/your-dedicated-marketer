import type { Metadata } from 'next'
import { Database } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'CRM & Customer Communication | Your Dedicated Marketer',
  description: 'CRM and customer communication systems managed as one pillar.',
}


export default function CrmServicesPage() {
  return (
    <ServiceDetailLayout
      icon={Database}
      title="CRM & Customer Communication"
      subtitle="The Engine"
      description={STANDARD_SERVICE_DESCRIPTION}
      serviceSlug="crm"
      included={[
        'CRM setup, management, and hygiene',
        'Marketing automation and email systems',
        'Pipelines, follow-ups, and lifecycle flows',
        'Retention mechanics and segmentation',
        'Lead handoff integrity (from form to sales)',
      ]}
      whoItsFor={[
        'When leads are slipping through the cracks, follow-up is inconsistent, or customer communication is ad hoc. This becomes critical when your team needs automation, segmentation, and a reliable lifecycle flow so sales and retention don’t depend on memory and manual effort. If you want fewer dropped leads and a cleaner customer journey after the click, this pillar matters.',
      ]}
      pricing={STANDARD_SERVICE_PRICING}
      faqs={STANDARD_SERVICE_FAQS}
    />
  )
}
