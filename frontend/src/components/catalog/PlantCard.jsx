import React from 'react';
import { Heart, ShoppingBag, Eye, Star, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export default function PlantCard({ plant, onAddToCart, onQuickView, isWishlisted, onToggleWishlist, viewMode = 'grid' }) {
  const discountPercent = plant.discountPrice && plant.price > plant.discountPrice
    ? Math.round(((plant.price - plant.discountPrice) / plant.price) * 100)
    : plant.originalPrice && plant.originalPrice > plant.price
    ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
    : 0;

  const displayPrice = plant.discountPrice || plant.price;
  const originalPrice = plant.discountPrice ? plant.price : plant.originalPrice;
  const DEFAULT_PLANT_IMG = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
  const plantImg = (plant.images && plant.images[0] && plant.images[0].trim() !== '')
    ? plant.images[0]
    : (plant.image && plant.image.trim() !== '') ? plant.image : DEFAULT_PLANT_IMG;

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_PLANT_IMG;
  };

  /* ─── LIST MODE ─────────────────────────────────────────── */
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onQuickView && onQuickView(plant)}
        className="group bg-white border border-[#F2ECE1] rounded-3xl overflow-hidden flex flex-col sm:flex-row items-stretch transition-all duration-400 hover:shadow-2xl hover:-translate-y-1 hover:border-[#D96B43]/30 cursor-pointer"
      >
        {/* Image */}
        <div className="relative w-full sm:w-56 shrink-0 overflow-hidden bg-[#F7F4EE]">
          <img
            src={plantImg}
            alt={plant.name}
            onError={handleImageError}
            className="w-full h-56 sm:h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {discountPercent > 0 && (
            <span className="absolute top-3.5 left-3.5 bg-[#D96B43] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {plant.careGuide?.petFriendly && (
            <span className="absolute bottom-3.5 left-3.5 bg-[#0D2B1D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3 text-[#8DAA86]" /> Pet Safe
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 p-5 sm:p-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DAA86]">
                {plant.categoryName || plant.category || 'Indoor Botanical'}
              </span>
              <div className="flex items-center gap-1 text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-[#141A16]">{plant.ratingsAverage || plant.rating || 4.9}</span>
                <span className="text-[10px] text-[#5C665F] font-semibold">({plant.numReviews || 94})</span>
              </div>
            </div>

            <h3 className="font-serif font-bold text-xl text-[#0D2B1D] group-hover:text-[#D96B43] transition-colors leading-snug mb-2">
              {plant.name}
            </h3>
            <p className="text-xs text-[#5C665F] leading-relaxed line-clamp-2">
              {plant.description || plant.subtitle || 'Organic nursery plant delivered in protective eco-vent box.'}
            </p>

            {/* Care Tags */}
            {plant.careGuide && (
              <div className="flex flex-wrap gap-2 mt-3.5">
                {plant.careGuide.light && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#FBF8F3] text-[#5C665F] px-3 py-1 rounded-full border border-[#F2ECE1]">
                    ☀ {plant.careGuide.light}
                  </span>
                )}
                {plant.careGuide.water && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#FBF8F3] text-[#5C665F] px-3 py-1 rounded-full border border-[#F2ECE1]">
                    💧 {plant.careGuide.water}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bottom: Price + Actions */}
          <div className="mt-4 pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-3">
            <div>
              <span className="text-2xl font-extrabold text-[#0D2B1D]">₹{displayPrice}</span>
              {originalPrice && originalPrice > displayPrice && (
                <span className="text-xs text-[#5C665F] line-through ml-2 font-semibold">₹{originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleWishlist && onToggleWishlist(plant); }}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                  isWishlisted ? 'bg-[#C83B2B] border-[#C83B2B] text-white' : 'border-[#F2ECE1] text-[#5C665F] hover:border-[#D96B43] hover:text-[#D96B43]'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(plant); }}
                className="flex items-center gap-2 bg-[#0D2B1D] hover:bg-[#D96B43] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── GRID MODE ──────────────────────────────────────────── */
  return (
    <div 
      onClick={() => onQuickView && onQuickView(plant)}
      className="group bg-white border border-[#F2ECE1] rounded-3xl overflow-hidden flex flex-col transition-all duration-400 hover:shadow-2xl hover:-translate-y-2 hover:border-[#D96B43]/30 cursor-pointer"
    >
      {/* Image Zone */}
      <div className="relative overflow-hidden bg-[#F7F4EE]" style={{ aspectRatio: '4/5' }}>
        <img
          src={plantImg}
          alt={plant.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Top-left Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-[#D96B43] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {plant.isFeatured && (
            <span className="bg-[#D4AF37] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-current" /> Bestseller
            </span>
          )}
          {plant.careGuide?.petFriendly && (
            <span className="bg-[#0D2B1D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-2.5 h-2.5 text-[#8DAA86]" /> Pet Safe
            </span>
          )}
        </div>

        {/* Top-right: Wishlist + Quick View Overlay */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10 opacity-90 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist && onToggleWishlist(plant); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110 ${
              isWishlisted ? 'bg-[#C83B2B] text-white' : 'bg-white/90 text-[#0D2B1D] hover:text-[#D96B43] hover:bg-white border border-white/40'
            }`}
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(plant); }}
              className="w-9 h-9 rounded-full bg-white/90 text-[#0D2B1D] hover:text-[#8DAA86] hover:bg-white border border-white/40 flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Air Purifying tag overlay at bottom of image */}
        {plant.careGuide?.airPurifying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0D2B1D]/80 via-[#0D2B1D]/40 to-transparent px-3.5 py-2.5 z-10">
            <span className="text-[10px] text-[#F9E8A2] font-bold flex items-center gap-1">
              <Leaf className="w-3 h-3 text-[#8DAA86]" /> Air Purifying Botanical
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DAA86] truncate max-w-[65%]">
            {plant.categoryName || plant.category || 'Indoor Plant'}
          </span>
          <div className="flex items-center gap-1 text-[#D4AF37] shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-extrabold text-[#141A16]">{plant.ratingsAverage || plant.rating || 4.9}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-serif font-bold text-[#0D2B1D] text-lg leading-snug group-hover:text-[#D96B43] transition-colors line-clamp-1 mb-1.5">
          {plant.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-[#5C665F] leading-relaxed line-clamp-2 flex-1">
          {plant.description || plant.subtitle || 'Fresh nursery plant delivered in protective eco-vent box.'}
        </p>

        {/* Care icons row */}
        {plant.careGuide && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {plant.careGuide.light && (
              <span className="text-[10px] font-bold text-[#5C665F] bg-[#FBF8F3] px-2.5 py-0.5 rounded-full border border-[#F2ECE1]">
                ☀ {plant.careGuide.light}
              </span>
            )}
            {plant.careGuide.water && (
              <span className="text-[10px] font-bold text-[#5C665F] bg-[#FBF8F3] px-2.5 py-0.5 rounded-full border border-[#F2ECE1]">
                💧 {plant.careGuide.water}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2 bg-[#FBF8F3]/50">
        {/* Price */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold text-[#0D2B1D]">₹{displayPrice}</span>
          {originalPrice && originalPrice > displayPrice && (
            <span className="text-[11px] text-[#5C665F] line-through font-semibold">₹{originalPrice}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(plant); }}
          className="flex items-center gap-1.5 bg-[#0D2B1D] hover:bg-[#D96B43] text-white text-[11px] font-bold px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow hover:shadow-lg active:scale-95 whitespace-nowrap"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
