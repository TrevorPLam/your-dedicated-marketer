import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Users, Share2, FileText, Database, BarChart } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Marketing Services | Your Dedicated Marketer',
  description: 'A complete view of the six pillars I cover in a single engagement.',
}

const pillars = [
  {
    icon: TrendingUp,
    title: 'Marketing Strategy',
    subtitle: 'The Brain',
    tagline:
      'I turn vision into priorities, budgets, and clear measures of success so every effort serves a real business objective.',
    href: '/services/strategy',
  },
  {
    icon: Users,
    title: 'Website & Conversion',
    subtitle: 'The Storefront',
    tagline:
      'I take responsibility for your website, front-end funnels, and conversion paths so traffic turns into meaningful action.',
    href: '/services/website',
  },
  {
    icon: Share2,
    title: 'Advertising & Lead Generation',
    subtitle: 'The Traffic',
    tagline:
      'I manage paid media and acquisition with a focus on lead quality, efficiency, and alignment with your sales process.',
    href: '/services/advertising',
  },
  {
    icon: FileText,
    title: 'Content & Brand Presence',
    subtitle: 'The Voice',
    tagline:
      'I shape how your business shows up publicly through content, social presence, and organic visibility.',
    href: '/services/content',
  },
  {
    icon: Database,
    title: 'CRM & Customer Communication',
    subtitle: 'The Engine',
    tagline:
      'I manage the systems that handle leads after the click — automation, segmentation, follow-ups, and lifecycle communication.',
    href: '/services/crm',
  },
  {
    icon: BarChart,
    title: 'Analytics & Decision Support',
    subtitle: 'The Scoreboard',
    tagline:
      'I provide clarity on what’s working, what isn’t, and why — so decisions are based on truth, not guesswork.',
    href: '/services/analytics',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-charcoal to-charcoal/95 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Here is everything I take responsibility for while bringing your vision to life.
            </h1>
            <p className="text-xl text-white/80 mb-8">
              You set the direction. I handle the execution. I don’t replace internal leadership or
              operate as an outside vendor. I partner closely with your team — translating vision
              into action, prioritizing what matters, and executing consistently as the business
              evolves.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="large">
                Start with a conversation
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section className="bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Card key={pillar.title} variant="service">
                  <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate mb-3">{pillar.subtitle}</p>
                  <h3 className="text-2xl font-semibold text-charcoal mb-3">{pillar.title}</h3>
                  <p className="text-slate mb-6 leading-relaxed">{pillar.tagline}</p>
                  <Link
                    href={pillar.href}
                    className="text-teal font-semibold hover:text-teal-dark transition-colors inline-flex items-center"
                  >
                    Learn More →
                  </Link>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Bridge Section */}
      <Section className="bg-off-white">
        <Container>
          <div className="max-w-3xl mx-auto text-slate space-y-4 text-lg leading-relaxed">
            <p>These pillars work together as part of a single engagement.</p>
            <p>
              Focus shifts over time. Some areas require active attention while others are maintained
              in the background. What matters most changes as the business evolves.
            </p>
            <p>
              I stay responsible across all six — prioritizing the right work at the right time and
              carrying it forward within one ongoing engagement.
            </p>
          </div>
        </Container>
      </Section>

      {/* ICP Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-charcoal mb-6">Who this is for</h2>
            <div className="text-slate space-y-4 text-lg leading-relaxed">
              <p>
                This model works best for founders and teams who want marketing handled with clear
                ownership and consistent execution — without adding headcount or managing an outside firm.
              </p>
              <p>
                It’s a strong fit if your team has direction but needs someone to carry the work
                forward, keep priorities moving, and follow through week after week.
              </p>
              <p>
                If you’re only looking for isolated tasks or a one-time project, this probably isn’t
                the right setup.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-teal/10 to-teal/5">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Want to align on priorities first?
            </h2>
            <p className="text-lg text-slate mb-8">
              Start with a conversation to map the pillar that needs attention now and what should be
              maintained in the background.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="large">
                  Start with a conversation
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="large">
                  View Pricing
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/contact" className="text-teal font-semibold underline underline-offset-4">
                Start with a conversation
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
