import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Star, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { plantService } from '../../services/api';

export default function BestsellersSection({ plants: passedPlants, onAddToCart, onQuickView, wishlist = [], onToggleWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (passedPlants && passedPlants.length > 0) {
      setProducts(passedPlants.slice(0, 8));
      setLoading(false);
      return;
    }
    const fetchBestsellers = async () => {
      setLoading(true);
      const data = await plantService.getPlants({ featured: 'true' });
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts([
          {
            _id: 'b1',
            id: 1,
            name: "Aglaonema Chinese Evergreen",
            categoryName: "Indoor Plants",
            price: 499,
            discountPrice: 399,
            ratingsAverage: 5.0,
            numReviews: 120,
            images: ["https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80"],
            tags: ["Air Purifying", "Best Seller"]
          },
          {
            _id: 'b2',
            id: 2,
            name: "Monstera Deliciosa",
            categoryName: "Indoor Plants",
            price: 1499,
            discountPrice: 1299,
            ratingsAverage: 4.9,
            numReviews: 210,
            images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80"],
            tags: ["Tropical", "Popular"]
          }
        ]);
      }
      setLoading(false);
    };

    fetchBestsellers();
  }, [passedPlants]);

  return (
    <section id="bestsellers" className="py-20 bg-[#EFE9DD]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C96F4A] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 fill-current" /> Customer Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F3B2C]">
              Botanical Bestsellers
            </h2>
          </div>
          <p className="text-sm text-[#6B6B63] max-w-md">
            Our most loved foliage, top-rated by over 10,000 plant parents for their resilience, beauty, and air-purifying power.
          </p>
        </div>

        {/* Skeleton Loaders */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="card-plant p-4 animate-pulse space-y-4">
                <div className="aspect-4/5 bg-[#EFE9DD] rounded-xl"></div>
                <div className="h-4 bg-[#EFE9DD] rounded w-3/4"></div>
                <div className="h-4 bg-[#EFE9DD] rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((plant) => {
              const isWishlisted = wishlist.some((item) => item.id === (plant.id || plant._id));
              const mainImg = plant.images && plant.images[0] ? plant.images[0] : 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';

              return (
                <div 
                  key={plant._id || plant.id} 
                  onClick={() => onQuickView && onQuickView(plant)}
                  className="card-plant group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-4/5 overflow-hidden bg-[#EFE9DD]">
                    <img
                      src={mainImg}
                      alt={plant.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Discount Tag */}
                    {plant.discountPrice && plant.discountPrice < plant.price && (
                      <span className="absolute top-3 left-3 bg-[#B3452F] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        SAVE ₹{plant.price - plant.discountPrice}
                      </span>
                    )}

                    {/* Quick Action Overlay Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist && onToggleWishlist(plant);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
                          isWishlisted
                            ? 'bg-[#B3452F] text-white'
                            : 'bg-white/90 text-[#1F3B2C] hover:text-[#C96F4A] hover:bg-white'
                        }`}
                        title="Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      {onQuickView && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(plant);
                          }}
                          className="w-9 h-9 rounded-full bg-white/90 text-[#1F3B2C] hover:text-[#C96F4A] hover:bg-white transition-all shadow-xs flex items-center justify-center"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-1 text-[#C9A24B] text-xs font-semibold mb-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{plant.ratingsAverage || 4.9} ({plant.numReviews || 94})</span>
                      </div>
                      <h3 className="font-serif font-semibold text-base text-[#1F3B2C] group-hover:text-[#C96F4A] transition-colors line-clamp-1">
                        {plant.name}
                      </h3>
                      <p className="text-xs text-[#6B6B63] mt-0.5">{plant.categoryName || 'Indoor Plant'}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#EFE9DD]">
                      <div>
                        <span className="text-lg font-bold text-[#1F3B2C]">
                          ₹{plant.discountPrice || plant.price}
                        </span>
                        {plant.discountPrice && plant.discountPrice < plant.price && (
                          <span className="text-xs text-[#6B6B63] line-through ml-2">
                            ₹{plant.price}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart && onAddToCart(plant);
                        }}
                        className="btn-primary-terracotta text-xs py-2 px-3.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
