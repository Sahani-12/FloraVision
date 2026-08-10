import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import asset1 from '../../assets/444fba49a2674d2262c5455bcc501cb91b314490.png';

export default function O2PlantsSection({ onExplore }) {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <section className="py-20 sm:py-28 bg-[#121A15] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Outlined Pill Heading matching Figma screenshot Image 4 ("Our Best o2") */}
        <div className="text-center relative">
          
          {/* Floating Avatar Stack Badge above title matching Figma Image 4 */}
          <div className="absolute left-1/2 -translate-x-12 -top-8 z-10 flex items-center gap-1 bg-[#18231C] px-2.5 py-1 rounded-full border border-white/20 shadow-xl">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-gray-950 font-bold text-[10px] flex items-center justify-center">R</span>
            <img className="w-5 h-5 rounded-full ring-1 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" alt="User" />
          </div>

          <div className="inline-block border border-amber-300/40 rounded-full px-8 py-2.5 bg-white/5 backdrop-blur-md">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Our Best o2
            </h2>
          </div>
        </div>

        {/* Main O2 Card Container matching Figma screenshot Image 1 */}
        <div className="bg-[#18231C]/90 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Terrazzo Potted Aglaonema Plant */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-md h-72 sm:h-96 flex items-center justify-center">
                <img
                  src={asset1}
                  alt="We Have Small And Best O2 Plants"
                  className="max-h-full max-w-full object-contain drop-shadow-2xl animate-float-slow"
                />
              </div>
            </div>

            {/* Right Column: Heading, Paragraphs & Carousel Controls */}
            <div className="md:col-span-6 space-y-6 text-center md:text-left">
              <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white leading-tight">
                We Have Small And Best O2 Plants Collection’s
              </h3>

              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-normal">
                <p>
                  Oxygen-producing plants, often referred to as "O2 plants," are those that release oxygen into the atmosphere through the process of photosynthesis.
                </p>
                <p>
                  Many plants can help filter out pollutants and toxins from the air, such as formaldehyde, benzene, and trichloroethylene. This makes the air cleaner and healthier to breathe.
                </p>
              </div>

              {/* Action Button & Carousel Controls matching Figma screenshot */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                <button
                  onClick={onExplore}
                  className="btn-outline-pill px-8 py-3 text-sm font-semibold cursor-pointer"
                >
                  Explore
                </button>

                {/* Carousel Controls: < 01/04 > */}
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                  <button 
                    onClick={() => setActiveSlide(prev => prev > 1 ? prev - 1 : 4)}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-white font-mono tracking-wider">0{activeSlide}/04</span>
                  <button 
                    onClick={() => setActiveSlide(prev => prev < 4 ? prev + 1 : 1)}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Pagination Dots below O2 card matching Figma Image 1 */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className={`h-2 rounded-full transition-all ${activeSlide === 1 ? 'w-6 bg-white' : 'w-2 bg-white/30'}`} />
          <span className={`h-2 rounded-full transition-all ${activeSlide === 2 ? 'w-6 bg-white' : 'w-2 bg-white/30'}`} />
          <span className={`h-2 rounded-full transition-all ${activeSlide === 3 ? 'w-6 bg-white' : 'w-2 bg-white/30'}`} />
        </div>

      </div>
    </section>
  );
}
