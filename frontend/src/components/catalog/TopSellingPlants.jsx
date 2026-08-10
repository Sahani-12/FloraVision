import React, { useState } from 'react';
import PlantCard from './PlantCard';

export default function TopSellingPlants({ plants, onAddToCart, onQuickView }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Indoor', 'Desk', 'Low Maintenance', 'Outdoor'];

  const filteredPlants = plants.filter(plant => {
    if (activeCategory === 'All') return plant.isTopSelling;
    return plant.isTopSelling && plant.category === activeCategory;
  });

  return (
    <section className="py-20 sm:py-28 bg-[#121A15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading Pill */}
        <div className="text-center">
          <div className="inline-block border border-amber-300/40 rounded-full px-8 py-2.5 bg-white/5 backdrop-blur-md">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Our Top Selling Plants
            </h2>
          </div>
          <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto">
            Loved by thousands of plant enthusiasts. High-oxygen, low-maintenance indoor favorites.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-gray-950 font-bold shadow-lg scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
