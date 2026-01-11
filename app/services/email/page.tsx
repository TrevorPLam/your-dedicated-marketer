import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Email Communication (CRM & Customer Communication) | Your Dedicated Marketer',
  description: 'Email communication handled within the CRM & Customer Communication pillar.',
}

const standardDescription =
  'This area represents one part of a broader marketing partnership. You and your team set the direction. I take responsibility for execution, follow-through, and continuous improvement within this pillar.'

const standardFaqs = [
  {
    question: 'How does this focus area fit into the engagement?',
    answer: 'Email communication is handled within the CRM & Customer Communication pillar so it stays aligned with lifecycle priorities.',
  },
  {
    question: 'What happens after we align on priorities?',
    answer: 'I take responsibility for execution, follow-through, and ongoing adjustments while keeping your team aligned.',
  },
]

export default function EmailMarketingPage() {
  return (
    <ServiceDetailLayout
      icon={Mail}
      title="Email Communication (CRM & Customer Communication)"
      subtitle="Component within the pillar"
      description={standardDescription}
      serviceSlug="email"
      included={[
        'Lifecycle communication aligned to CRM priorities',
        'Automation and follow-up sequences tied to pipeline stages',
        'Segmentation that supports retention and repeat engagement',
        'Message timing aligned to the customer journey',
        'Performance checks focused on consistency and clarity',
      ]}
      whoItsFor={[
        'When customer communication needs structure beyond one-off sends. This becomes important when follow-up and lifecycle touchpoints are inconsistent or manual. If you want email handled as part of the broader CRM pillar instead of a standalone effort, this focus area fits.',
      ]}
      pricing={[
        {
          tier: 'Starter',
          description: '2 campaigns/month + basic automation',
          href: '/pricing#starter',
        },
        {
          tier: 'Growth',
          description: '4 campaigns/month + advanced automation',
          href: '/pricing#growth',
        },
        {
          tier: 'Scale',
          description: 'Unlimited campaigns + complex workflows',
          href: '/pricing#scale',
        },
      ]}
      faqs={standardFaqs}
    />
  )
}
