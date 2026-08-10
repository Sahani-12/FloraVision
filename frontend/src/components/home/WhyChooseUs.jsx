import React from 'react';
import { ShieldCheck, MessageSquareHeart, PackageCheck, RefreshCw } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: '7-Day Plant Health Guarantee',
      description: 'If your plant arrives damaged or stressed during transit, we replace it instantly for free.'
    },
    {
      icon: MessageSquareHeart,
      title: 'Expert Botanist Support',
      description: 'Get lifetime personalized care advice & watering schedules from our master horticulturists.'
    },
    {
      icon: PackageCheck,
      title: '100% Eco-Vented Packaging',
      description: 'Specialized breathable recycled boxes engineered to protect leaves and retain moisture.'
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free Returns',
      description: 'Simple 7-day return policy for un-potted decor & accessories with full refund guarantee.'
    }
  ];

  return (
    <section className="py-16 bg-[#EFE9DD]/60 border-y border-[#EFE9DD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-start gap-4 group p-2">
                <div className="w-12 h-12 rounded-2xl bg-[#1F3B2C] text-[#C96F4A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-base text-[#1F3B2C]">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#6B6B63] mt-1 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
