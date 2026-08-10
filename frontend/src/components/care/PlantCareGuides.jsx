import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, Leaf, CheckCircle2 } from 'lucide-react';
import { careGuidesList } from '../../data/plantsData';

export default function PlantCareGuides() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <section id="care-guides" className="py-24 bg-gradient-to-b from-[#071911] via-[#0D2B1D] to-[#071911] text-white relative overflow-hidden">
      
      {/* Glow Ambient Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#8DAA86]/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D96B43]/15 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-[#F9E8A2]">
            <Sparkles className="w-4 h-4 text-[#D96B43] animate-pulse" />
            <span>Botanical Knowledge Hub • Free Expert Masterclasses</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight">
            Plant Care Guides & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9E8A2] via-[#D96B43] to-[#FFFFFF]">Tips</span>
          </h2>

          <p className="text-sm sm:text-base text-[#EFE9DD]/90 max-w-xl mx-auto leading-relaxed">
            Everything you need to keep your indoor plants thriving, lush, and healthy for years with our botanist-curated guides.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {careGuidesList.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#D96B43]/50 group cursor-pointer flex flex-col text-left"
            >
              {/* Image Zone */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  {guide.category}
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#F9E8A2] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#D96B43]" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#F9E8A2] transition-colors leading-snug line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-[#EFE9DD]/80 mt-2.5 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-[#F9E8A2] group-hover:text-white transition-colors">
                  <span>Read Full Masterclass Guide</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D96B43] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D2B1D] border border-white/30 max-w-xl w-full rounded-[36px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-white my-auto max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img src={selectedGuide.image} alt={selectedGuide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B1D] via-transparent to-black/40"></div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-[#D96B43] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer border border-white/30 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 bg-[#D4AF37] text-black text-xs font-extrabold px-3.5 py-1 rounded-full uppercase">
                {selectedGuide.category}
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4 text-left">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">{selectedGuide.title}</h3>
              <p className="text-xs sm:text-sm text-[#EFE9DD]/90 leading-relaxed">{selectedGuide.content}</p>
              
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8DAA86] font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Botanist Verified Article
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="btn-primary-terracotta text-xs py-2.5 px-6 cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
