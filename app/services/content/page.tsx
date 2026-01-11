import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Content & Brand Presence | Your Dedicated Marketer',
  description: 'Content, social presence, and organic visibility managed as one pillar.',
}

const standardDescription =
  'This area represents one part of a broader marketing partnership. You and your team set the direction. I take responsibility for execution, follow-through, and continuous improvement within this pillar.'

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

export default function ContentMarketingPage() {
  return (
    <ServiceDetailLayout
      icon={FileText}
      title="Content & Brand Presence"
      subtitle="The Voice"
      description={standardDescription}
      serviceSlug="content"
      included={[
        'Content direction and production',
        'Social media presence and distribution',
        'Brand consistency across channels',
        'Organic visibility and SEO content strategy',
        'Topic authority and relevance',
      ]}
      whoItsFor={[
        'When the business needs consistent messaging and visibility — not just occasional posts. This becomes critical when your brand presence is fragmented, your content isn’t supporting organic growth, or customers don’t clearly understand what makes you different. If your team needs a steady voice that builds trust over time, this pillar matters.',
      ]}
      pricing={[
        {
          tier: 'Starter',
          description: '4 blog posts per month',
          href: '/pricing#starter',
        },
        {
          tier: 'Growth',
          description: '8 blog posts + content strategy',
          href: '/pricing#growth',
        },
        {
          tier: 'Scale',
          description: '12+ posts + advanced content hub',
          href: '/pricing#scale',
        },
      ]}
      faqs={standardFaqs}
    />
  )
}
