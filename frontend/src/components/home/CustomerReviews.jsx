import React, { useState } from 'react';
import { customerReviews } from '../../data/plantsData';
import { Star, Quote, ShieldCheck, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? customerReviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#071911] via-[#0D2B1D] to-[#071911] text-white relative overflow-hidden">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#8DAA86]/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D96B43]/15 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-[#F9E8A2]">
              <Sparkles className="w-4 h-4 text-[#D96B43]" />
              <span>Real Plant Parent Stories • Verified Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight">
              Loved By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9E8A2] via-[#D96B43] to-[#FFFFFF]">12,000+ Homes</span>
            </h2>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#D96B43] border border-white/25 text-white transition-all backdrop-blur-md flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
              title="Previous Review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#D96B43] border border-white/25 text-white transition-all backdrop-blur-md flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
              title="Next Review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerReviews.map((review, idx) => (
            <div
              key={review.id || idx}
              className={`bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[32px] p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#D96B43]/50 text-left shadow-2xl ${
                idx === currentIndex ? 'ring-2 ring-[#D96B43] shadow-2xl scale-[1.02]' : 'opacity-90'
              }`}
            >
              <div>
                {/* Verified Buyer Tag + Quote */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5 text-[#8DAA86] text-xs font-extrabold bg-[#8DAA86]/20 px-3.5 py-1 rounded-full border border-[#8DAA86]/30">
                    <ShieldCheck className="w-4 h-4 text-[#8DAA86]" /> Verified Buyer
                  </div>
                  <Quote className="w-8 h-8 text-[#D96B43]/40" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-[#EFE9DD]/90 text-sm sm:text-base leading-relaxed font-normal italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/15">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#D96B43]"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {review.name}
                  </h4>
                  <span className="text-[11px] text-[#8DAA86] font-semibold">{review.role || 'Plant Parent • Mumbai'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
