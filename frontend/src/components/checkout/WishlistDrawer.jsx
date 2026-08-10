import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveFromWishlist, onAddToCart }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-[#121A15] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              <h2 className="text-lg font-heading font-bold">Your Saved Wishlist</h2>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length > 0 ? (
              wishlist.map((plant) => (
                <div 
                  key={plant.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 group"
                >
                  <img
                    src={(plant.images && plant.images[0]) || plant.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'}
                    alt={plant.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-16 h-16 rounded-xl object-cover bg-emerald-50/50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm text-gray-900 truncate">
                      {plant.name}
                    </h4>
                    <p className="text-xs text-gray-500">{plant.category}</p>
                    <div className="text-sm font-extrabold text-emerald-700 mt-1">
                      ₹{plant.price}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(plant);
                        onRemoveFromWishlist(plant.id);
                      }}
                      className="px-3 py-1.5 bg-[#1B4D3E] hover:bg-[#143c30] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Move to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(plant.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-gray-700">Your wishlist is empty</p>
                <p className="text-xs text-gray-400 mt-1">Click the heart icon on any plant card to save your favorite greenery!</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => {
                  wishlist.forEach(p => onAddToCart(p));
                  wishlist.forEach(p => onRemoveFromWishlist(p.id));
                  onClose();
                }}
                className="w-full py-3.5 bg-[#1B4D3E] hover:bg-[#143c30] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-pointer"
              >
                Add All Wishlist Items to Cart <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
