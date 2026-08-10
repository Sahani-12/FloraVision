import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Sun, Droplets, ShieldCheck, Minus, Plus } from 'lucide-react';

export default function ProductModal({ plant, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');



  if (!plant) return null;

  const displayPrice = plant.discountPrice || plant.price;
  const originalPrice = plant.discountPrice ? plant.price : plant.originalPrice;
  const plantImg = plant.images && plant.images[0] ? plant.images[0] : plant.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';

  const handleAdd = () => {
    onAddToCart({ ...plant, quantity, selectedSize });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-[#EFE9DD] animate-in fade-in zoom-in duration-200 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1F3B2C] hover:bg-[#1F3B2C] hover:text-white transition-colors cursor-pointer flex items-center justify-center shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Container */}
          <div className="h-64 md:h-full bg-[#EFE9DD] relative aspect-4/5 overflow-hidden">
            <img
              src={plantImg}
              alt={plant.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-[#1F3B2C]">
              {plant.categoryName || plant.category || 'Indoor Plant'}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1 text-[#C9A24B] text-xs font-semibold mb-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-[#1C1C1A]">{(plant.ratingsAverage || plant.rating || 4.9).toFixed(1)}</span>
                <span className="text-[#6B6B63]">({plant.numReviews || plant.reviewsCount || 84} reviews)</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">{plant.name}</h3>

              <p className="text-xs text-[#6B6B63] mt-3 leading-relaxed">
                {plant.description || 'Hand-selected nursery species delivered with 7-day health guarantee.'}
              </p>

              {/* Size Selector */}
              <div className="mt-4 pt-4 border-t border-[#EFE9DD]">
                <label className="text-xs font-semibold text-[#1C1C1A] uppercase tracking-wider block mb-2">
                  Select Size:
                </label>
                <div className="flex gap-2">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        selectedSize === size
                          ? 'bg-[#1F3B2C] text-white'
                          : 'bg-[#F7F4EE] text-[#6B6B63] hover:text-[#1F3B2C]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Care Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 text-xs text-[#1F3B2C] bg-[#F7F4EE] p-2 rounded-xl">
                  <Sun className="w-4 h-4 text-[#C9A24B]" />
                  <span>{plant.careGuide?.light || plant.light || 'Indirect Light'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#1F3B2C] bg-[#F7F4EE] p-2 rounded-xl">
                  <Droplets className="w-4 h-4 text-[#7A9B76]" />
                  <span>{plant.careGuide?.water || 'Weekly Water'}</span>
                </div>
              </div>
            </div>

            {/* Price & Quantity & Add Button */}
            <div className="pt-4 border-t border-[#EFE9DD] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B6B63] block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1F3B2C]">₹{displayPrice * quantity}</span>
                    {originalPrice && originalPrice > displayPrice && (
                      <span className="text-xs text-[#6B6B63] line-through">₹{originalPrice * quantity}</span>
                    )}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-2 bg-[#F7F4EE] px-3 py-1.5 rounded-xl border border-[#EFE9DD]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#1F3B2C] hover:text-[#C96F4A] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-[#1F3B2C] w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-[#1F3B2C] hover:text-[#C96F4A] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full btn-primary-terracotta text-xs py-3.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Cart — ₹{displayPrice * quantity}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
