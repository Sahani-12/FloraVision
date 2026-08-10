import React from 'react';
import { Play, Star, ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles, Truck, Heart, Leaf } from 'lucide-react';
import heroTree from '../../assets/hero_tree.jpg';
import plantAglaonema from '../../assets/444fba49a2674d2262c5455bcc501cb91b314490.png';
import plantDesk1 from '../../assets/5196aba58f7006d90ec0712ac1d01688cde1a537.png';
import plantDesk2 from '../../assets/95e728282f4fb901ee2edc80783c2fbd7df490c2.png';

export default function HeroBanner({ onBuyNow, onExplore }) {
  return (
    <section id="home" className="relative pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden text-white">
      
      {/* ── 1. Atmospheric Deep Botanical Background with Rich Gradients ── */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${heroTree})` }}
      />
      {/* Semi-transparent radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071911]/90 via-[#0D2B1D]/80 to-[#071911]/95 z-0 backdrop-blur-[2px]" />

      {/* Glow ambient background circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#8DAA86]/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D96B43]/15 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ── 2. Top Hero Split Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Earth's Exhale Headline & Info */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-[#F9E8A2] shadow-md">
              <Sparkles className="w-4 h-4 text-[#D96B43] animate-pulse" />
              <span>100% Organic Botanical Nursery • 24hr Express Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif text-white tracking-tight leading-[1.06]">
              Earth’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9E8A2] via-[#D96B43] to-[#FFFFFF]">Exhale</span>
            </h1>

            <p className="text-sm sm:text-base text-[#EFE9DD]/90 max-w-xl leading-relaxed font-normal">
              Bring pure oxygen, natural tranquility, and luxury botanical design directly to your living space. Hand-nurtured house plants delivered in protective eco-vent packaging.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBuyNow}
                className="btn-primary-terracotta text-sm px-8 py-3.5 shadow-2xl cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Plant Catalog</span>
              </button>

              <button
                onClick={onExplore}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/25 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:border-white"
              >
                <div className="w-7 h-7 rounded-full bg-[#D96B43] flex items-center justify-center text-white shadow-md">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span>Live Nursery Tour</span>
              </button>
            </div>

            {/* Left Bottom Floating Testimonial & Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="bg-black/50 backdrop-blur-xl border border-white/20 p-4 rounded-2xl max-w-sm space-y-2 shadow-2xl">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Ronnie Hamill"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#D96B43]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      Ronnie Hamill <CheckCircle2Icon />
                    </h4>
                    <div className="flex items-center gap-0.5 text-[#D4AF37] text-[10px]">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-gray-300 ml-1 font-bold">5.0 (12,400+ Reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#EFE9DD]/90 leading-relaxed italic">
                  "I can't express how thrilled I am with my new Aglaonema plant! Arrived super fresh and vibrant."
                </p>
              </div>

              {/* Quick Perks Badge */}
              <div className="hidden sm:flex flex-col gap-2 text-xs text-[#EFE9DD]">
                <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-xl backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-[#8DAA86]" />
                  <span>7-Day Free Plant Guarantee</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-xl backdrop-blur-md">
                  <Truck className="w-4 h-4 text-[#D96B43]" />
                  <span>Eco-Vented Safe Shipping</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Aglaonema Spotlight Glass Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-black/50 backdrop-blur-2xl border border-white/25 rounded-[32px] p-6 relative overflow-hidden shadow-2xl group text-left transition-all duration-500 hover:border-[#D96B43]/50">
              
              {/* Top Luxury Pill Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#D4AF37] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  ★ Bestseller Spotlight
                </span>
                <div className="flex items-center -space-x-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                  <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80" alt="Buyer" />
                  <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" alt="Buyer" />
                  <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80" alt="Buyer" />
                </div>
              </div>

              {/* Plant Image Box */}
              <div className="relative h-64 sm:h-72 rounded-2xl mb-4 flex items-center justify-center p-2 bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <img
                  src={plantAglaonema}
                  alt="Aglaonema Plant"
                  className="relative z-10 max-h-60 sm:max-h-68 object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_25px_30px_rgba(0,0,0,0.8)] animate-float-slow"
                />
              </div>

              {/* Card Bottom Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8DAA86] uppercase tracking-wider">
                    Air Purifying Indoor Plant
                  </span>
                  <span className="text-xs text-gray-300 font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> 4.9 (480)
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Aglaonema Plant
                    </h3>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-xl font-extrabold text-[#F9E8A2]">₹499</span>
                      <span className="text-xs text-gray-400 line-through">₹899</span>
                      <span className="text-[10px] font-bold text-[#D96B43] bg-[#D96B43]/20 px-2 py-0.5 rounded-md">44% OFF</span>
                    </div>
                  </div>
                  <button
                    onClick={onBuyNow}
                    className="p-3 rounded-full bg-[#D96B43] hover:bg-[#C2562E] text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                    title="Quick View / Add to Cart"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onBuyNow}
                    className="w-full bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-bold py-3 rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D96B43]" /> Buy Now With Free Pot
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── 3. "Our Trendy Plants" Showcase Section ── */}
        <div className="pt-8 space-y-10">
          
          {/* Section Pill Title */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-xl text-xl sm:text-2xl font-serif font-bold text-white shadow-2xl">
              <Leaf className="w-5 h-5 text-[#8DAA86]" /> Our Trendy Nursery Plants
            </span>
          </div>

          {/* 2 Wide Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Trendy Card 1 */}
            <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[36px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden shadow-2xl group text-left transition-all duration-500 hover:border-[#8DAA86]/50">
              <div className="w-full sm:w-1/2 h-56 sm:h-64 flex items-center justify-center shrink-0 bg-white/5 rounded-2xl p-2 border border-white/10">
                <img
                  src={plantDesk1}
                  alt="Desk Decoration Plant"
                  className="max-h-56 sm:max-h-64 object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
                />
              </div>

              <div className="flex-1 space-y-3">
                <span className="bg-[#8DAA86]/20 text-[#8DAA86] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Desk Decor Special
                </span>
                <h3 className="font-serif font-bold text-2xl text-white leading-tight">
                  For Your Desk Decorations
                </h3>
                <p className="text-xs text-[#EFE9DD]/80 leading-relaxed">
                  Transform your workspace with lush greenery. Boosts focus, purifies air, and brings a calming organic vibe to your desk.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-2xl font-extrabold text-white">₹599</span>
                  <span className="text-xs text-gray-400 line-through">₹999</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={onBuyNow}
                    className="bg-[#D96B43] hover:bg-[#C2562E] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={onBuyNow}
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trendy Card 2 */}
            <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[36px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden shadow-2xl group text-left transition-all duration-500 hover:border-[#D96B43]/50">
              <div className="flex-1 space-y-3 order-2 sm:order-1">
                <span className="bg-[#D96B43]/20 text-[#D96B43] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Low Maintenance Succulent
                </span>
                <h3 className="font-serif font-bold text-2xl text-white leading-tight">
                  Haworthia Zebra Plant
                </h3>
                <p className="text-xs text-[#EFE9DD]/80 leading-relaxed">
                  Stunning architectural succulent that thrives in bright indirect light. Needs watering only once every 2 weeks!
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-2xl font-extrabold text-white">₹399</span>
                  <span className="text-xs text-gray-400 line-through">₹699</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={onBuyNow}
                    className="bg-[#D96B43] hover:bg-[#C2562E] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={onBuyNow}
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="w-full sm:w-1/2 h-56 sm:h-64 flex items-center justify-center shrink-0 order-1 sm:order-2 bg-white/5 rounded-2xl p-2 border border-white/10">
                <img
                  src={plantDesk2}
                  alt="Haworthia Succulent"
                  className="max-h-56 sm:max-h-64 object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function CheckCircle2Icon() {
  return (
    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#8DAA86] text-black font-bold text-[9px]">
      ✓
    </span>
  );
}
