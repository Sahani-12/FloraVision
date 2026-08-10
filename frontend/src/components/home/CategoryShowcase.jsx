import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryShowcase({ onSelectCategory }) {
  const categories = [
    {
      id: 'indoor-plants',
      name: 'Indoor Plants',
      count: '45+ Varieties',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular'
    },
    {
      id: 'outdoor-plants',
      name: 'Outdoor Plants',
      count: '30+ Varieties',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
      badge: null
    },
    {
      id: 'succulents-cacti',
      name: 'Succulents & Cacti',
      count: '25+ Varieties',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      badge: 'Low Care'
    },
    {
      id: 'pots-planters',
      name: 'Pots & Planters',
      count: '60+ Designs',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      badge: 'Ceramic'
    },
    {
      id: 'home-decor',
      name: 'Home Botanical Decor',
      count: '20+ Accessories',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
      badge: 'New'
    },
    {
      id: 'gift-combos',
      name: 'Gift Combos',
      count: '15+ Bundles',
      image: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=600&q=80',
      badge: 'Best Gift'
    }
  ];

  return (
    <section id="categories" className="py-20 bg-[#0A130D]/60 backdrop-blur-md relative overflow-hidden border-b border-white/10">
      {/* Background decoration */}
      <div className="bg-blob-sage w-80 h-80 top-0 right-0 opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#C96F4A]" /> Curated Nursery Collections
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
              Shop By Category
            </h2>
          </div>
          <p className="text-sm text-gray-300 max-w-md">
            Hand-picked botanical species nurtured organically in our greenhouse, ready to elevate every space in your home.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              className="card-plant group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[#EFE9DD]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {cat.badge && (
                  <span className="absolute top-2 left-2 bg-[#C96F4A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {cat.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3B2C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs font-semibold text-white flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <div className="p-3 text-center bg-white">
                <h3 className="font-serif font-semibold text-sm text-[#1F3B2C] group-hover:text-[#C96F4A] transition-colors truncate">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#6B6B63]">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
