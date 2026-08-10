import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Gift } from 'lucide-react';

export default function NewsletterBand() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#071911] via-[#0D2B1D] to-[#18422F] text-white relative overflow-hidden border-t border-white/10">
      {/* Background Glows */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#8DAA86]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#D96B43]/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 bg-[#D96B43]/20 border border-[#D96B43]/40 text-[#F9E8A2] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Gift className="w-4 h-4 text-[#D96B43]" /> Special Welcome Gift • 10% Off Instant Coupon
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9E8A2] to-[#D96B43]">10% Off</span> Your First Plant Order
            </h2>

            <p className="text-sm sm:text-base text-[#EFE9DD]/90 max-w-xl leading-relaxed">
              Subscribe to the FloraVision Botanical Gazette for weekly care guides, rare species alerts, and secret subscriber discounts.
            </p>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 flex items-center gap-4 text-white shadow-2xl">
                <CheckCircle2 className="w-8 h-8 text-[#8DAA86] shrink-0" />
                <div className="text-left">
                  <h4 className="font-serif font-bold text-lg text-white">Thank You for Subscribing!</h4>
                  <p className="text-xs text-[#EFE9DD]/90 mt-1">
                    Use coupon code <strong className="text-[#F9E8A2] bg-white/10 px-2 py-0.5 rounded border border-white/20">WELCOME10</strong> at checkout for 10% off.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-white/15 border border-white/25 text-white pl-12 pr-4 py-4 rounded-full text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D96B43] backdrop-blur-md transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary-terracotta text-sm py-4 px-8 cursor-pointer shrink-0 shadow-2xl"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
