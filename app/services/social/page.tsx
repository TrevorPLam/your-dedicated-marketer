import type { Metadata } from 'next'
import { Share2 } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import { STANDARD_SERVICE_DESCRIPTION, STANDARD_SERVICE_FAQS } from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Social Presence (Content & Brand Presence) | Your Dedicated Marketer',
  description: 'Social presence handled within the Content & Brand Presence pillar.',
}

const standardFaqs = [
  {
    question: 'How does this focus area fit into the engagement?',
    answer:
      'Social presence is handled within the Content & Brand Presence pillar so it stays aligned with messaging and visibility goals.',
  },
  {
    question: 'What happens after we align on priorities?',
    answer: 'I take responsibility for execution, follow-through, and ongoing adjustments while keeping your team aligned.',
  },
]

export default function SocialMediaPage() {
  return (
    <ServiceDetailLayout
      icon={Share2}
      title="Social Presence (Content & Brand Presence)"
      subtitle="Component within the pillar"
      description={STANDARD_SERVICE_DESCRIPTION}
      serviceSlug="social"
      included={[
        'Social presence direction aligned to the broader plan',
        'Platform focus based on where your audience already engages',
        'Consistency in voice, visuals, and timing',
        'Content distribution that supports organic visibility',
        'Engagement patterns monitored to refine priorities',
      ]}
      whoItsFor={[
        'When public visibility and consistency on social platforms need focused attention. This becomes important when the brand voice is uneven or the presence is inconsistent across channels. If you want social presence managed as part of the broader pillar work, this focus area fits.',
      ]}
      pricing={[
        {
          tier: 'Starter',
          description: '2 platforms, 12 posts/month',
          href: '/pricing#starter',
        },
        {
          tier: 'Growth',
          description: '3 platforms, 20 posts/month + engagement',
          href: '/pricing#growth',
        },
        {
          tier: 'Scale',
          description: '4+ platforms, 30+ posts + community management',
          href: '/pricing#scale',
        },
      ]}
      faqs={standardFaqs}
    />
  )
}
