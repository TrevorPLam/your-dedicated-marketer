import type { Metadata } from 'next'
import { Users } from 'lucide-react'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import {
  STANDARD_SERVICE_DESCRIPTION,
  STANDARD_SERVICE_FAQS,
  STANDARD_SERVICE_PRICING,
} from '@/app/services/constants'

export const metadata: Metadata = {
  title: 'Website & Conversion | Your Dedicated Marketer',
  description: 'Website, conversion paths, and front-end funnels handled within one pillar.',
}


export default function WebsiteConversionPage() {
  return (
    <ServiceDetailLayout
      icon={Users}
      title="Website & Conversion"
      subtitle="The Storefront"
      description={STANDARD_SERVICE_DESCRIPTION}
      serviceSlug="website"
      included={[
        'Website structure, messaging, and maintenance',
        'Conversion paths and user experience (UX)',
        'Front-end funnel mechanics and click flows',
        'Performance, speed, and technical SEO',
        'Conversion Rate Optimization (CRO)',
      ]}
      whoItsFor={[
        'When traffic is coming in but leads aren’t — or when the website doesn’t reflect how the business should be positioned. This becomes critical when the site is creating friction: unclear messaging, weak conversion paths, slow performance, or poor mobile experience. If your team needs the website to act like a growth asset instead of a brochure, this pillar matters.',
      ]}
      pricing={STANDARD_SERVICE_PRICING}
      faqs={STANDARD_SERVICE_FAQS}
    />
  )
}
