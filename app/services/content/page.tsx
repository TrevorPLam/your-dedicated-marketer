import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import { STANDARD_SERVICE_DESCRIPTION, STANDARD_SERVICE_FAQS } from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Content & Brand Presence | Your Dedicated Marketer',
  description: 'Content, social presence, and organic visibility managed as one pillar.',
}


export default function ContentMarketingPage() {
  return (
    <ServiceDetailLayout
      icon={FileText}
      title="Content & Brand Presence"
      subtitle="The Voice"
      description={STANDARD_SERVICE_DESCRIPTION}
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
      faqs={STANDARD_SERVICE_FAQS}
    />
  )
}
