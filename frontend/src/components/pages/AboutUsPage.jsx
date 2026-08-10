import React from 'react';
import { Leaf, Heart, ShieldCheck, Sparkles, Award, Globe, TreePine } from 'lucide-react';

export default function AboutUsPage({ onBackToShop }) {
  const milestones = [
    { year: '2020', title: 'FloraVision Greenhouse Founded', desc: 'Started with a single 2-acre organic greenhouse in Powai, Mumbai.' },
    { year: '2022', title: 'Eco-Vented Packaging Patent', desc: 'Engineered specialized breathable transit boxes to keep plants alive for 10+ days.' },
    { year: '2024', title: '10,000+ Plant Parents Served', desc: 'Expanded delivery across 500+ cities in India with a 7-day health guarantee.' },
    { year: '2026', title: 'Zero-Waste Organic Certified', desc: 'Achieved 100% peat-free organic potting soil & recyclable packaging.' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7A9B76]/15 text-[#1F3B2C] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#C96F4A]" /> Our Botanical Journey
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#1F3B2C]">
          Nurturing Nature for Modern Homes
        </h1>
        <p className="text-base text-[#6B6B63] leading-relaxed">
          FloraVision was born out of a simple belief: every home deserves living, air-purifying foliage nurtured with organic care and delivered straight from the greenhouse.
        </p>
      </div>

      {/* Founder Note & Brand Story Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl bg-white">
          <img
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
            alt="FloraVision Botanical Greenhouse"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold text-[#7A9B76] uppercase tracking-wider block">
            A Note From Our Founder
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1F3B2C]">
            "Plants don't just decorate spaces — they transform how we breathe and live."
          </h2>
          <p className="text-sm text-[#6B6B63] leading-relaxed">
            When we started FloraVision, most plants sold online arrived stressed, dehydrated, or damaged. We spent 2 years researching soil moisture retention, specialized venting, and organic pest control so that every plant arrives at your doorstep looking greenhouse fresh.
          </p>
          <div className="pt-2 border-t border-[#EFE9DD]">
            <span className="font-serif font-bold text-lg text-[#1F3B2C] block">Aarav & Ananya Sharma</span>
            <span className="text-xs text-[#6B6B63]">Co-Founders & Master Horticulturists</span>
          </div>
        </div>
      </div>

      {/* Sustainability Feature Grid */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EFE9DD] mb-20 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3B2C]">
            Our Commitment to Sustainability
          </h3>
          <p className="text-xs text-[#6B6B63] mt-2">
            How we protect the planet while delivering lush botanical species to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#F7F4EE] space-y-2 text-center">
            <TreePine className="w-8 h-8 text-[#4C8055] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#1F3B2C]">100% Peat-Free Soil</h4>
            <p className="text-xs text-[#6B6B63]">Preserving natural peat bogs by using renewable coconut coir.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F4EE] space-y-2 text-center">
            <Globe className="w-8 h-8 text-[#7A9B76] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#1F3B2C]">Recyclable Boxes</h4>
            <p className="text-xs text-[#6B6B63]">Zero plastic transit packaging made from 100% recycled paper coffer.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F4EE] space-y-2 text-center">
            <ShieldCheck className="w-8 h-8 text-[#C96F4A] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#1F3B2C]">Organic Fertilisers</h4>
            <p className="text-xs text-[#6B6B63]">Free from synthetic pesticides or harmful chemical sprays.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F7F4EE] space-y-2 text-center">
            <Heart className="w-8 h-8 text-[#4C8055] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#1F3B2C]">7-Day Health Promise</h4>
            <p className="text-xs text-[#6B6B63]">Guaranteed plant replacement if stressed or damaged during shipping.</p>
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-3xl mx-auto space-y-8 mb-20">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3B2C] text-center">
          FloraVision Milestones
        </h3>
        <div className="space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-[#EFE9DD]">
              <span className="font-serif font-bold text-xl text-[#C96F4A] bg-[#C96F4A]/10 px-4 py-2 rounded-xl shrink-0">
                {m.year}
              </span>
              <div>
                <h4 className="font-serif font-bold text-base text-[#1F3B2C]">{m.title}</h4>
                <p className="text-xs text-[#6B6B63] mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
