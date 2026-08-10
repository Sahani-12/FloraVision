import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, Heart } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.discountPrice || item.price;
    return acc + price * item.quantity;
  }, 0);

  const applyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedCoupon({ code, discountAmount: discount });
    } else if (code === 'GREENFLORA200') {
      if (subtotal >= 999) {
        setAppliedCoupon({ code, discountAmount: 200 });
      } else {
        setCouponError('Minimum order of ₹999 required for GREENFLORA200');
      }
    } else {
      setCouponError('Invalid code. Try WELCOME10 or GREENFLORA200');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const discountVal = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const shippingFee = subtotal >= 999 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountVal + shippingFee);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F4EE] shadow-2xl flex flex-col border-l border-[#EFE9DD]">
          
          {/* Header */}
          <div className="p-6 bg-[#1F3B2C] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C96F4A] flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold">Your Plant Basket</h2>
                <span className="text-xs text-[#EFE9DD]/80">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-[#7A9B76]/15 px-6 py-2.5 border-b border-[#7A9B76]/20 flex items-center gap-2 text-xs font-semibold text-[#1F3B2C]">
            <Truck className="w-4 h-4 text-[#C96F4A] shrink-0" />
            {subtotal >= 999 ? (
              <span>🎉 You unlocked <strong className="text-[#4C8055]">FREE Express Delivery</strong></span>
            ) : (
              <span>Add <strong>₹{999 - subtotal}</strong> more for <strong>FREE Delivery</strong></span>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#6B6B63] py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#1F3B2C]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-serif font-bold text-[#1F3B2C]">Your Basket is Empty</p>
                <p className="text-xs text-[#6B6B63] max-w-xs leading-relaxed">
                  Explore our air-purifying foliage, desk succulents, and luxury planters to add green life to your home.
                </p>
                <button
                  onClick={onClose}
                  className="btn-primary-terracotta text-xs py-2.5 px-6 cursor-pointer mt-2"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemImg = item.images && item.images[0] ? item.images[0] : item.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                const itemPrice = item.discountPrice || item.price;

                return (
                  <div key={item.id || item._id} className="flex gap-4 p-4 bg-white rounded-2xl border border-[#EFE9DD] shadow-xs">
                    <img 
                      src={itemImg} 
                      alt={item.name} 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-20 h-20 object-cover rounded-xl bg-[#EFE9DD]"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-semibold text-[#1F3B2C] text-sm line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => onRemoveItem(item.id || item._id)}
                            className="text-[#6B6B63] hover:text-[#B3452F] transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.selectedSize && (
                          <span className="text-[11px] text-[#6B6B63]">Size: {item.selectedSize}</span>
                        )}
                        <span className="text-xs text-[#6B6B63] block">₹{itemPrice} each</span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE9DD]">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#EFE9DD] rounded-lg bg-[#F7F4EE]">
                          <button 
                            onClick={() => onUpdateQuantity(item.id || item._id, item.quantity - 1)}
                            className="p-1 text-[#1F3B2C] hover:text-[#C96F4A] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#1F3B2C]">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id || item._id, item.quantity + 1)}
                            className="p-1 text-[#1F3B2C] hover:text-[#C96F4A] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#1F3B2C]">
                          ₹{itemPrice * item.quantity}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Coupon Code Section */}
          {cartItems.length > 0 && (
            <div className="px-6 py-3 bg-white border-t border-[#EFE9DD]">
              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#7A9B76] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A9B76] uppercase"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="btn-secondary-forest text-xs py-2 px-4 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-[#7A9B76]/20 border border-[#7A9B76]/30 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F3B2C]">
                    <Check className="w-4 h-4 text-[#4C8055]" /> Coupon '{appliedCoupon.code}' Applied (-₹{discountVal})
                  </div>
                  <button onClick={removeCoupon} className="text-xs font-semibold text-[#B3452F] hover:underline cursor-pointer">
                    Remove
                  </button>
                </div>
              )}
              {couponError && <span className="text-[11px] text-[#B3452F] block mt-1 font-semibold">{couponError}</span>}
            </div>
          )}

          {/* Order Summary Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#EFE9DD] bg-white space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6B63]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#4C8055] font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountVal}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6B63]">
                  <span>Delivery Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#4C8055]">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F3B2C] pt-2 border-t border-[#EFE9DD]">
                  <span>Total Amount</span>
                  <span className="text-[#1F3B2C] text-xl font-serif">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => onProceedToCheckout({ subtotal, discountVal, shippingFee, grandTotal, coupon: appliedCoupon })}
                className="w-full btn-primary-terracotta text-sm py-4 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
