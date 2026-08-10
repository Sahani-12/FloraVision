import React from 'react';
import { ArrowUpRight, Sparkles, Home, Bed, Sun, Briefcase, Leaf } from 'lucide-react';

export default function ShopByRoom({ onSelectRoom }) {
  const rooms = [
    {
      id: 'living-room',
      title: 'Living Room Sanctuary',
      subtitle: 'Statement tall plants & decorative ceramic pot styling',
      badge: '18 Species Available',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      cols: 'lg:col-span-2'
    },
    {
      id: 'bedroom',
      title: 'Bedroom Oasis',
      subtitle: '24/7 oxygen boosters for sound, restorative sleep',
      badge: 'Night Purifiers',
      icon: Bed,
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
      cols: 'lg:col-span-1'
    },
    {
      id: 'balcony-patio',
      title: 'Sunlit Balcony & Patio',
      subtitle: 'Sun-loving flowering flora & trailing vines',
      badge: 'Direct Sunlight',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
      cols: 'lg:col-span-1'
    },
    {
      id: 'office',
      title: 'Work & Office Desk',
      subtitle: 'Compact stress-relieving desk succulents & terrariums',
      badge: 'Low Maintenance',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
      cols: 'lg:col-span-2'
    }
  ];

  return (
    <section id="shop-by-room" className="py-24 bg-gradient-to-b from-[#071911] via-[#0D2B1D] to-[#071911] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Glow Ambient Background Circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#8DAA86]/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D96B43]/15 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-[#F9E8A2]">
            <Sparkles className="w-4 h-4 text-[#D96B43] animate-pulse" />
            <span>Tailored Botanical Interior Styling • Room Light Guide</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight">
            Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9E8A2] via-[#D96B43] to-[#FFFFFF]">Living Space</span>
          </h2>

          <p className="text-sm sm:text-base text-[#EFE9DD]/90 max-w-xl mx-auto leading-relaxed font-normal">
            Every room has unique light and humidity levels. Select your living space to discover plants guaranteed to thrive.
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {rooms.map((r) => {
            const IconComp = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => onSelectRoom && onSelectRoom(r.title)}
                className={`relative h-96 rounded-[36px] overflow-hidden group cursor-pointer border border-white/20 shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#D96B43]/60 ${r.cols}`}
              >
                {/* Background Image */}
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Layered Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071911]/95 via-[#0D2B1D]/50 to-transparent transition-opacity duration-300"></div>

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="bg-black/60 backdrop-blur-md border border-white/25 text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <IconComp className="w-3.5 h-3.5 text-[#F9E8A2]" /> {r.badge}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#F9E8A2] transition-colors leading-tight">
                        {r.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EFE9DD]/90 max-w-md leading-relaxed font-normal">
                        {r.subtitle}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#D96B43] group-hover:border-[#D96B43] transition-all duration-300 transform group-hover:scale-110 shrink-0 shadow-lg">
                      <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
