import type { Metadata } from 'next'
import { Database } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'CRM & Customer Communication | Your Dedicated Marketer',
  description: 'CRM and customer communication systems managed as one pillar.',
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

export default function CrmServicesPage() {
  return (
    <ServiceDetailLayout
      icon={Database}
      title="CRM & Customer Communication"
      subtitle="The Engine"
      description={standardDescription}
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
      pricing={standardPricing}
      faqs={standardFaqs}
    />
  )
}
