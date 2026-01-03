import { Metadata } from 'next';
import Link from 'next/link';
import { Crown, Star, Zap, Shield, ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Membership | Your Dedicated Marketer',
  description: 'Join our exclusive membership program and enjoy premium benefits, priority booking, and special member-only perks.',
};

export default function MembershipPage() {
  // TODO: Import and use actual salon config
  // const config = getSalonConfig();
  // const links = getMonetizationLinks(config);
  
  // For now, using placeholder values
  const membershipUrl = null; // Will be populated from config
  const displayName = 'Join Membership';
  const fallbackPhone = '(555) 123-4567';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Crown className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become a VIP Member
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Unlock exclusive benefits, priority booking, and special member-only perks 
              with our premium membership program.
            </p>
            
            {membershipUrl ? (
              <a
                href={membershipUrl}
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {displayName}
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <p className="text-white mb-4">
                  Contact us to learn about membership options
                </p>
                <a
                  href={`tel:${fallbackPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Call {fallbackPhone}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Membership Benefits
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Experience premium service with exclusive member advantages
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Priority Booking
                  </h3>
                  <p className="text-gray-600">
                    Get first access to appointment slots and never wait for your 
                    preferred time. Members book before the general public.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Exclusive Discounts
                  </h3>
                  <p className="text-gray-600">
                    Save on every visit with member-only pricing and special promotional 
                    offers throughout the year.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Complimentary Services
                  </h3>
                  <p className="text-gray-600">
                    Enjoy complimentary add-ons and upgrades with select services. 
                    More value with every visit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Check className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Special Events Access
                  </h3>
                  <p className="text-gray-600">
                    Get invited to exclusive member-only events, workshops, and 
                    product launches throughout the year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Choose Your Membership Level
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Tier */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-gray-600 mb-6">Perfect for occasional visits</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$X</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">10% discount on services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Member newsletter</span>
                  </li>
                </ul>
              </div>

              {/* Premium Tier */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-8 shadow-lg transform scale-105 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-white/90 mb-6">For regular visitors</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$XX</span>
                  <span className="text-white/90">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>20% discount on services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>Priority booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>1 complimentary service/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>Special event invitations</span>
                  </li>
                </ul>
              </div>

              {/* VIP Tier */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">VIP</h3>
                <p className="text-gray-600 mb-6">Ultimate experience</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$XXX</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">30% discount on services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Guaranteed booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">2 complimentary services/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">All Premium benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Personalized service</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-8">
              * Pricing and benefits are examples. Contact us for actual membership details.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Membership FAQs
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How does membership billing work?
                </h3>
                <p className="text-gray-600">
                  Memberships are billed monthly on a recurring basis. 
                  You can cancel anytime with 30 days notice.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I upgrade or downgrade my membership?
                </h3>
                <p className="text-gray-600">
                  Yes! You can change your membership level at any time. 
                  Changes take effect at the start of your next billing cycle.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What happens to unused complimentary services?
                </h3>
                <p className="text-gray-600">
                  Complimentary services are valid for the month they're issued. 
                  They don't roll over but you get fresh ones each month.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Is there a contract or commitment period?
                </h3>
                <p className="text-gray-600">
                  No long-term commitment required. Month-to-month membership 
                  with the freedom to cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Become a member today and start enjoying exclusive benefits.
            </p>
            
            {membershipUrl ? (
              <a
                href={membershipUrl}
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {displayName}
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <div>
                <a
                  href={`tel:${fallbackPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors mb-4"
                >
                  Call {fallbackPhone}
                </a>
                <p className="text-white/80 text-sm">
                  Or visit us to sign up in person
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
