import { Metadata } from 'next';
import Link from 'next/link';
import { Gift, Heart, Clock, Shield, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gift Cards | Your Dedicated Marketer',
  description: 'Give the gift of premium services. Purchase gift cards for your loved ones and let them experience excellence.',
};

export default function GiftCardsPage() {
  // TODO: Import and use actual salon config
  // const config = getSalonConfig();
  // const links = getMonetizationLinks(config);
  
  // For now, using placeholder values
  const giftCardUrl = null; // Will be populated from config
  const displayName = 'Buy Gift Card';
  const fallbackPhone = '(555) 123-4567';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Gift className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Give the Perfect Gift
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Share the gift of exceptional service with someone special. 
              Our gift cards are perfect for any occasion.
            </p>
            
            {giftCardUrl ? (
              <a
                href={giftCardUrl}
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {displayName}
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <p className="text-white mb-4">
                  Call us to purchase a gift card
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why Choose Our Gift Cards?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Perfect for Any Occasion
                  </h3>
                  <p className="text-gray-600">
                    Birthdays, holidays, thank you gifts, or just because. 
                    Our gift cards work for any celebration.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Never Expires
                  </h3>
                  <p className="text-gray-600">
                    Recipients can use their gift card whenever it's convenient 
                    for them, with no expiration date.
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
                    Easy to Use
                  </h3>
                  <p className="text-gray-600">
                    Simple redemption process. Recipients can use their gift card 
                    for any of our services.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Premium Experience
                  </h3>
                  <p className="text-gray-600">
                    Give the gift of a premium experience with our top-rated services 
                    and exceptional customer care.
                  </p>
                </div>
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
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do I purchase a gift card?
                </h3>
                <p className="text-gray-600">
                  {giftCardUrl 
                    ? `Click the "${displayName}" button above to purchase online instantly.`
                    : `Call us at ${fallbackPhone} to purchase a gift card. We'll help you with the process.`
                  }
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I choose a custom amount?
                </h3>
                <p className="text-gray-600">
                  Yes! We offer flexible gift card amounts to fit any budget. 
                  Choose from preset amounts or specify a custom value.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How is the gift card delivered?
                </h3>
                <p className="text-gray-600">
                  Gift cards are delivered electronically via email, which can be 
                  printed or forwarded to the recipient.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can gift cards be used for multiple visits?
                </h3>
                <p className="text-gray-600">
                  Absolutely! The gift card balance can be used over multiple visits 
                  until the full value is redeemed.
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
              Ready to Give the Perfect Gift?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Purchase a gift card today and make someone's day special.
            </p>
            
            {giftCardUrl ? (
              <a
                href={giftCardUrl}
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
                  Or visit us in person to purchase
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
