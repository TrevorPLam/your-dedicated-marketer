import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import ValueProps from '@/components/ValueProps'
import ServicesOverview from '@/components/ServicesOverview'

const SocialProof = dynamic(() => import('@/components/SocialProof'), {
  loading: () => <div className="sr-only">Loading testimonials…</div>,
  ssr: true,
})

const CaseStudyHighlight = dynamic(() => import('@/components/CaseStudyHighlight'), {
  loading: () => <div className="sr-only">Loading case study…</div>,
  ssr: true,
})

const FinalCTA = dynamic(() => import('@/components/FinalCTA'), {
  loading: () => <div className="sr-only">Loading final call to action…</div>,
  ssr: true,
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesOverview />
      <SocialProof />
      <CaseStudyHighlight />
      <FinalCTA />
    </>
  )
}
