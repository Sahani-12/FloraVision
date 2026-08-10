import React from 'react';
import { Leaf, ShoppingBag, Heart, Star, Sparkles, CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function DesignSystemShowcase({ onClose }) {
  const colors = [
    { name: 'Primary (Forest Green)', hex: '#1F3B2C', bg: 'bg-[#1F3B2C]', text: 'text-white', usage: 'Headers, nav bar, brand elements' },
    { name: 'Secondary (Sage Green)', hex: '#7A9B76', bg: 'bg-[#7A9B76]', text: 'text-white', usage: 'Accents, hover states, tag pills' },
    { name: 'Accent (Warm Terracotta)', hex: '#C96F4A', bg: 'bg-[#C96F4A]', text: 'text-white', usage: 'Primary CTAs, sale badges, highlights' },
    { name: 'Accent Gold (Subtle Luxury)', hex: '#C9A24B', bg: 'bg-[#C9A24B]', text: 'text-black', usage: 'Featured badges, star ratings' },
    { name: 'Background Base', hex: '#F7F4EE', bg: 'bg-[#F7F4EE]', text: 'text-[#1C1C1A]', usage: 'Primary organic page background' },
    { name: 'Background Alt', hex: '#EFE9DD', bg: 'bg-[#EFE9DD]', text: 'text-[#1C1C1A]', usage: 'Soft beige section breaks' },
    { name: 'Card Background', hex: '#FFFFFF', bg: 'bg-white', text: 'text-[#1C1C1A]', usage: 'Elevated white product cards' },
    { name: 'Text Primary', hex: '#1C1C1A', bg: 'bg-[#1C1C1A]', text: 'text-white', usage: 'Headings, main copy' },
    { name: 'Text Muted', hex: '#6B6B63', bg: 'bg-[#6B6B63]', text: 'text-white', usage: 'Subtitles, secondary labels' },
    { name: 'Success Plant', hex: '#4C8055', bg: 'bg-[#4C8055]', text: 'text-white', usage: 'In-stock indicator, health guarantee' },
    { name: 'Error / Sale', hex: '#B3452F', bg: 'bg-[#B3452F]', text: 'text-white', usage: 'Discount badges, stock alerts' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] py-12 px-4 sm:px-8 max-w-7xl mx-auto font-sans relative">
      {/* Organic background blobs */}
      <div className="bg-blob-sage w-96 h-96 top-10 left-10 opacity-70"></div>
      <div className="bg-blob-terracotta w-96 h-96 bottom-10 right-10 opacity-70"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#EFE9DD]">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#7A9B76]/15 text-[#1F3B2C] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" /> Module 0 Deliverable
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1F3B2C]">
            FloraVision Design System
          </h1>
          <p className="text-[#6B6B63] mt-1 text-base max-w-2xl">
            Design tokens, color swatches, typography scales, components, and visual identity guidelines for FloraVision Luxury Botanical E-Commerce.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="btn-primary-terracotta text-sm self-start md:self-auto cursor-pointer"
          >
            ← Back to Store App
          </button>
        )}
      </div>

      {/* 1. Color Palette */}
      <section className="relative z-10 my-12">
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F3B2C] mb-6 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C96F4A]"></span> 1. Color Swatches & Tokens
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {colors.map((c, i) => (
            <div key={i} className="card-plant p-4 flex flex-col justify-between group">
              <div className={`h-24 rounded-xl ${c.bg} shadow-inner flex items-end justify-end p-3 transition-transform group-hover:scale-[1.02]`}>
                <span className={`text-xs font-mono px-2 py-1 rounded bg-black/20 backdrop-blur-xs ${c.text}`}>
                  {c.hex}
                </span>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-sm text-[#1F3B2C]">{c.name}</h3>
                <p className="text-xs text-[#6B6B63] mt-1">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="relative z-10 my-12 bg-[#EFE9DD]/60 p-6 sm:p-8 rounded-3xl border border-[#EFE9DD]">
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F3B2C] mb-6 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#7A9B76]"></span> 2. Typography Hierarchy
        </h2>
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#1F3B2C]/10">
            <span className="text-xs font-mono text-[#6B6B63] uppercase tracking-wider">Fraunces Serif — H1 Display (48px / 36px mobile)</span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#1F3B2C] mt-1">
              Bring Natural Luxury into Your Space
            </h1>
          </div>

          <div className="pb-4 border-b border-[#1F3B2C]/10">
            <span className="text-xs font-mono text-[#6B6B63] uppercase tracking-wider">Fraunces Serif — H2 Section Title (36px / 28px mobile)</span>
            <h2 className="text-2xl sm:text-4xl font-semibold font-serif text-[#1F3B2C] mt-1">
              Hand-Nurtured Houseplants & Botanical Decor
            </h2>
          </div>

          <div className="pb-4 border-b border-[#1F3B2C]/10">
            <span className="text-xs font-mono text-[#6B6B63] uppercase tracking-wider">Fraunces Serif — H3 Subtitle (24px)</span>
            <h3 className="text-xl sm:text-2xl font-medium font-serif text-[#1F3B2C] mt-1">
              Ficus Lyrata 'Violin-Leaf Fig' — Statement Collection
            </h3>
          </div>

          <div>
            <span className="text-xs font-mono text-[#6B6B63] uppercase tracking-wider">Plus Jakarta Sans — Body Text (16px / line-height 1.6)</span>
            <p className="text-base text-[#1C1C1A] mt-1 leading-relaxed max-w-3xl">
              Each plant in our nursery is individually inspected by experienced botanists. Delivered straight to your doorstep with our 7-day health guarantee and organic sustainable packaging.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Buttons & Interactive Elements */}
      <section className="relative z-10 my-12">
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F3B2C] mb-6 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C96F4A]"></span> 3. Button System & CTAs
        </h2>
        <div className="card-plant p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-mono text-[#6B6B63] uppercase mb-3">Primary CTA (Terracotta Pill)</h4>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-primary-terracotta cursor-pointer">
                <ShoppingBag className="w-4 h-4" /> Shop Collection
              </button>
              <button className="btn-primary-terracotta cursor-pointer text-sm py-2 px-5">
                Add to Cart — ₹1,299
              </button>
              <button className="btn-primary-terracotta opacity-60 cursor-not-allowed" disabled>
                Out of Stock
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#6B6B63] uppercase mb-3">Secondary CTA (Forest Green Outline & Solid)</h4>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-secondary-forest cursor-pointer">
                <Leaf className="w-4 h-4" /> Explore Care Guide
              </button>
              <button className="btn-forest-fill cursor-pointer">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Badges & Tags */}
      <section className="relative z-10 my-12">
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F3B2C] mb-6 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C9A24B]"></span> 4. Badges & Tag System
        </h2>
        <div className="card-plant p-6 sm:p-8 flex flex-wrap gap-3">
          <span className="bg-[#B3452F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            25% OFF
          </span>
          <span className="bg-[#C9A24B] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3" /> BESTSELLER
          </span>
          <span className="bg-[#7A9B76]/20 text-[#1F3B2C] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-[#7A9B76]" /> Air Purifying
          </span>
          <span className="bg-[#4C8055]/15 text-[#4C8055] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pet Friendly
          </span>
          <span className="bg-[#1F3B2C] text-white text-xs font-medium px-3 py-1 rounded-full">
            Indoor Plants
          </span>
        </div>
      </section>

      {/* 5. Product Card Preview */}
      <section className="relative z-10 my-12">
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1F3B2C] mb-6 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#1F3B2C]"></span> 5. Organic Product Card (4:5 Ratio)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="card-plant group cursor-pointer">
            <div className="relative aspect-4/5 overflow-hidden bg-[#EFE9DD]/50">
              <img
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80"
                alt="Monstera Deliciosa"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#B3452F] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                SALE
              </span>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#1F3B2C] hover:text-[#C96F4A] hover:bg-white transition-all shadow-xs">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 text-[#C9A24B] text-xs font-semibold mb-1">
                <Star className="w-3.5 h-3.5 fill-current" /> 4.9 (128 reviews)
              </div>
              <h3 className="font-serif font-semibold text-lg text-[#1F3B2C] group-hover:text-[#C96F4A] transition-colors">
                Monstera Deliciosa
              </h3>
              <p className="text-xs text-[#6B6B63] mt-0.5">Swiss Cheese Plant • Large</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#1F3B2C]">₹1,499</span>
                  <span className="text-xs text-[#6B6B63] line-through ml-2">₹1,999</span>
                </div>
                <button className="btn-primary-terracotta text-xs py-2 px-4 cursor-pointer">
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-plant group cursor-pointer">
            <div className="relative aspect-4/5 overflow-hidden bg-[#EFE9DD]/50">
              <img
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80"
                alt="Fiddle Leaf Fig"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#C9A24B] text-black text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> FEATURED
              </span>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#1F3B2C] hover:text-[#C96F4A] hover:bg-white transition-all shadow-xs">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 text-[#C9A24B] text-xs font-semibold mb-1">
                <Star className="w-3.5 h-3.5 fill-current" /> 5.0 (94 reviews)
              </div>
              <h3 className="font-serif font-semibold text-lg text-[#1F3B2C] group-hover:text-[#C96F4A] transition-colors">
                Ficus Lyrata 'Violin'
              </h3>
              <p className="text-xs text-[#6B6B63] mt-0.5">Fiddle Leaf Fig • Extra Large</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#1F3B2C]">₹2,899</span>
                </div>
                <button className="btn-primary-terracotta text-xs py-2 px-4 cursor-pointer">
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Trust Feature Cards */}
          <div className="bg-[#EFE9DD]/50 rounded-2xl p-6 border border-[#EFE9DD] flex flex-col justify-center space-y-6">
            <h3 className="font-serif font-semibold text-xl text-[#1F3B2C]">
              Why Our Nursery?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7A9B76]/20 text-[#1F3B2C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1F3B2C]">7-Day Health Guarantee</h4>
                  <p className="text-xs text-[#6B6B63] mt-0.5">Free replacement if your plant arrives stressed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C96F4A]/20 text-[#C96F4A] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1F3B2C]">Express Plant Delivery</h4>
                  <p className="text-xs text-[#6B6B63] mt-0.5">Specialized eco-vented protective boxes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 pt-8 mt-12 border-t border-[#EFE9DD] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6B63] gap-4">
        <p>© 2026 FloraVision Design System. All tokens synced with style-guide.md.</p>
        <span className="bg-[#1F3B2C] text-white px-3 py-1 rounded-full text-xs font-mono">
          Tailwind CSS v4 + Fraunces & Plus Jakarta Sans
        </span>
      </div>
    </div>
  );
}
