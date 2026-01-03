import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Gift, TrendingUp, Users, ArrowRight, Check, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rewards Program | Your Dedicated Marketer',
  description: 'Earn rewards with every visit. Join our loyalty program and get exclusive perks, special offers, and points toward free services.',
};

export default function RewardsPage() {
  // TODO: Import and use actual salon config
  // const config = getSalonConfig();
  // const links = getMonetizationLinks(config);
  
  // For now, using placeholder values
  const rewardsUrl = null; // Will be populated from config (typically null for rewards)
  const displayName = 'Join Rewards';
  const fallbackPhone = '(555) 123-4567';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Earn Rewards With Every Visit
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Join our loyalty program and start earning points toward free services, 
              exclusive discounts, and special member perks.
            </p>
            
            {rewardsUrl ? (
              <a
                href={rewardsUrl}
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {displayName}
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <p className="text-white mb-4">
                  Ask about our rewards program during your next visit
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

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              How Rewards Work
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              It's simple! Earn points automatically with every purchase
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Visit & Purchase
                </h3>
                <p className="text-gray-600">
                  Earn points automatically with every service and product purchase. 
                  No cards to carry or codes to remember.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Accumulate Points
                </h3>
                <p className="text-gray-600">
                  Watch your points grow with each visit. Earn bonus points during 
                  special promotions and on your birthday.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Redeem Rewards
                </h3>
                <p className="text-gray-600">
                  Use your points for discounts, free services, or exclusive products. 
                  Rewards never expire!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Rewards Program Benefits
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Earn on Everything
                  </h3>
                  <p className="text-gray-600">
                    Every dollar spent earns you points. Services, products, 
                    and gift cards all count toward your rewards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Birthday Bonuses
                  </h3>
                  <p className="text-gray-600">
                    Celebrate your special day with bonus points and a 
                    complimentary birthday treat on us.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tier Upgrades
                  </h3>
                  <p className="text-gray-600">
                    The more you visit, the more you earn. Unlock higher tiers 
                    with better rewards and exclusive perks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Referral Rewards
                  </h3>
                  <p className="text-gray-600">
                    Refer a friend and you both get bonus points. Share the 
                    experience and earn together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Reward Tiers
            </h2>
            
            <div className="space-y-6">
              {/* Bronze Tier */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Bronze Member</h3>
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    0-500 points
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">Earn 1 point per $1 spent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">Birthday bonus: 50 points</span>
                  </li>
                </ul>
              </div>

              {/* Silver Tier */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Silver Member</h3>
                  <span className="bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    501-1000 points
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Earn 1.25 points per $1 spent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Birthday bonus: 100 points</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Early access to promotions</span>
                  </li>
                </ul>
              </div>

              {/* Gold Tier */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Gold Member</h3>
                  <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    1000+ points
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Earn 1.5 points per $1 spent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Birthday bonus: 200 points</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Priority booking privileges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Exclusive Gold member events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Rewards FAQs
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do I join the rewards program?
                </h3>
                <p className="text-gray-600">
                  Simply ask our staff during your next visit or call us at {fallbackPhone}. 
                  Enrollment is free and instant!
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Do my points expire?
                </h3>
                <p className="text-gray-600">
                  No! Your rewards points never expire as long as your account 
                  remains active with at least one visit per year.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do I check my points balance?
                </h3>
                <p className="text-gray-600">
                  Ask any staff member during your visit, or we'll provide your 
                  current balance on your receipt after each purchase.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What can I redeem my points for?
                </h3>
                <p className="text-gray-600">
                  Use points for service discounts, free add-ons, products, or 
                  save them for bigger rewards. Typically 100 points = $5 off.
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
              Start Earning Rewards Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our rewards program and turn every visit into valuable points.
            </p>
            
            <div>
              <a
                href={`tel:${fallbackPhone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors mb-4"
              >
                Call {fallbackPhone}
              </a>
              <p className="text-white/80 text-sm">
                Or ask about rewards during your next visit
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
