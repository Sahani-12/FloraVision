import React, { useState } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { plantsData } from '../../data/plantsData';

export default function SearchModal({ isOpen, onClose, onAddToCart, onQuickView }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? plantsData.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : plantsData;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in duration-200">
        
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Search className="w-5 h-5 text-[#1B4D3E]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plants by name, indoor, desk, O2..."
            autoFocus
            className="w-full text-base outline-none text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto mt-4 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No plants found matching "{query}"</p>
          ) : (
            filtered.map((plant) => (
              <div 
                key={plant.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-emerald-50/60 transition-colors border border-transparent hover:border-emerald-100"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    onQuickView(plant);
                    onClose();
                  }}
                >
                  <img 
                    src={(plant.images && plant.images[0]) || plant.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'} 
                    alt={plant.name} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-12 h-12 rounded-xl object-cover" 
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{plant.name}</h4>
                    <span className="text-xs text-[#1B4D3E] font-semibold">Rs. {plant.price}/-</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(plant);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#1B4D3E] text-white text-xs font-semibold rounded-xl hover:bg-[#143B2F] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
