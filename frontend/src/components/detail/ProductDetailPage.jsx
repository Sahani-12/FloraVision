import React, { useState, useEffect } from 'react';
import {
  Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Sun, Droplets,
  Share2, ChevronRight, CheckCircle2, ChevronDown, Sparkles, MapPin, Eye, Rotate3d, ArrowLeft
} from 'lucide-react';
import WriteReviewModal from '../modals/WriteReviewModal';

export default function ProductDetailPage({
  plant: initialPlant,
  onAddToCart,
  onBuyNow,
  onQuickView,
  wishlist = [],
  onToggleWishlist,
  onBackToShop
}) {
  // Default fallback plant if none provided
  const plant = initialPlant || {
    id: 'p_detail_1',
    name: "Monstera Deliciosa 'Swiss Cheese'",
    categoryName: "Indoor Plants",
    price: 1499,
    discountPrice: 1299,
    ratingsAverage: 4.9,
    numReviews: 128,
    description: "The Monstera Deliciosa, commonly known as the Swiss Cheese Plant, is an iconic tropical houseplant prized for its large, glossy split leaves (fenestrations). Thrives in bright indirect light and adds instant natural luxury to any room.",
    careGuide: {
      light: "Bright Indirect Sunlight (avoid harsh afternoon sun)",
      water: "Water once every 7-10 days when top 2 inches of soil feel dry",
      petFriendly: false,
      airPurifying: true
    },
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"
    ]
  };

  // State Management
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedPot, setSelectedPot] = useState('Ceramic White');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [openTab, setOpenTab] = useState('care'); // 'desc' | 'care' | 'shipping'
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState(false);

  // Reviews State
  const [reviewsList, setReviewsList] = useState([
    { id: 1, name: 'Priya Sharma', rating: 5, date: '2026-08-01', comment: 'Arrived in perfect condition with vibrant green leaves! The eco-vented box kept it fresh.' },
    { id: 2, name: 'Vikram Mehta', rating: 5, date: '2026-07-28', comment: 'Looks stunning in my living room corner. Highly recommend getting the ceramic pot bundle!' },
    { id: 3, name: 'Ananya Verma', rating: 4, date: '2026-07-20', comment: 'Great plant quality and fast delivery to Bangalore.' }
  ]);

  const images = plant.images && plant.images.length > 0 ? plant.images : [
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
  ];

  const displayPrice = plant.discountPrice || plant.price;
  const originalPrice = plant.discountPrice ? plant.price : plant.originalPrice;
  const discountPercent = originalPrice && originalPrice > displayPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  const isWishlisted = wishlist.some((item) => (item.id || item._id) === (plant.id || plant._id));

  // Magnifier Zoom Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Pincode Check
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({ success: true, message: 'Delivered in 2-3 business days. COD Available.' });
    } else {
      setPincodeStatus({ success: false, message: 'Please enter a valid 6-digit Pincode.' });
    }
  };

  // Add to Cart Micro-Animation Trigger
  const handleAddToCartClick = () => {
    setFlyingItem(true);
    setTimeout(() => setFlyingItem(false), 800);
    onAddToCart && onAddToCart({ ...plant, quantity, selectedSize, selectedPot });
  };

  // Scroll to Reviews Section
  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddReview = (newReview) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans relative">
      
      {/* Flying Micro-Animation Item */}
      {flyingItem && (
        <div className="fixed z-50 w-12 h-12 rounded-full bg-[#C96F4A] text-white flex items-center justify-center animate-ping pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ShoppingBag className="w-6 h-6" />
        </div>
      )}

      {/* Top Header Bar with Back Button & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EFE9DD]">
        <button
          type="button"
          onClick={onBackToShop}
          className="flex items-center gap-2 bg-[#1F3B2C] text-white hover:bg-[#2D543F] text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer border border-[#7A9B76]/30 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#C96F4A]" />
          <span>Back to Store Catalog</span>
        </button>

        <nav className="flex items-center gap-2 text-xs text-[#6B6B63]">
          <button onClick={onBackToShop} className="hover:text-[#1F3B2C] font-semibold cursor-pointer">Shop</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#6B6B63]">{plant.categoryName || plant.category || 'Indoor Plants'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-[#1F3B2C] truncate max-w-xs">{plant.name}</span>
        </nav>
      </div>

      {/* Main 2-Column Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
        
        {/* LEFT COLUMN: Gallery with Magnifier Zoom & 360 Toggle */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Stage Image */}
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-4/5 rounded-3xl overflow-hidden bg-white shadow-md border border-[#EFE9DD] cursor-crosshair group"
          >
            <img
              src={images[selectedImgIndex]}
              alt={plant.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
              }}
              className="w-full h-full object-cover transition-transform duration-200"
              style={
                is360Mode
                  ? { transform: `rotate(${rotationAngle}deg)` }
                  : isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: 'scale(2)'
                    }
                  : {}
              }
            />

            {/* Discount Badge */}
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#B3452F] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {discountPercent}% OFF
              </span>
            )}

            {/* 360° View Button */}
            <button
              type="button"
              onClick={() => {
                setIs360Mode(!is360Mode);
                if (is360Mode) setRotationAngle(0);
              }}
              className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer ${
                is360Mode ? 'bg-[#1F3B2C] text-white ring-2 ring-[#C96F4A]' : 'bg-white/90 text-[#1F3B2C] hover:bg-white'
              }`}
            >
              <Rotate3d className="w-4 h-4 text-[#C96F4A]" />
              <span>{is360Mode ? 'Close 360° View' : '360° View'}</span>
            </button>

            {/* Manual 360° Rotation Controls */}
            {is360Mode && (
              <div className="absolute bottom-4 left-4 right-4 bg-[#09130D]/90 backdrop-blur-md text-white p-3 rounded-2xl flex flex-col gap-2 shadow-2xl border border-[#7A9B76]/30 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1.5 text-[#C96F4A]">
                    <Rotate3d className="w-3.5 h-3.5" /> 360° Manual Rotation
                  </span>
                  <span className="bg-[#1F3B2C] px-2 py-0.5 rounded text-[10px] text-[#7A9B76]">{rotationAngle}° Angle</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-full accent-[#C96F4A] cursor-pointer h-1.5 bg-white/20 rounded-lg"
                />
                <div className="flex justify-between items-center text-[10px] font-semibold text-white/80 pt-0.5">
                  <button type="button" onClick={() => setRotationAngle((prev) => (prev - 45 + 360) % 360)} className="hover:text-white bg-white/10 px-2.5 py-1 rounded-full cursor-pointer">↺ -45°</button>
                  <button type="button" onClick={() => setRotationAngle(0)} className="hover:text-white bg-white/10 px-2.5 py-1 rounded-full cursor-pointer">Reset 0°</button>
                  <button type="button" onClick={() => setRotationAngle((prev) => (prev + 45) % 360)} className="hover:text-white bg-white/10 px-2.5 py-1 rounded-full cursor-pointer">↻ +45°</button>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedImgIndex(i);
                  setIs360Mode(false);
                }}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  selectedImgIndex === i ? 'border-[#C96F4A] scale-105 shadow-md' : 'border-[#EFE9DD] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Buying Info & Configuration */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A9B76]">
              {plant.categoryName || plant.category || 'Indoor Plant'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F3B2C] mt-1 leading-tight">
              {plant.name}
            </h1>

            {/* Rating Row */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={scrollToReviews}
                className="flex items-center gap-1 text-[#C9A24B] text-sm font-bold hover:underline cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current" />
                <span>{plant.ratingsAverage || plant.rating || 4.9}</span>
                <span className="text-[#6B6B63] font-normal">({plant.numReviews || reviewsList.length} reviews)</span>
              </button>
              <span className="text-[#EFE9DD]">|</span>
              <span className="text-xs font-semibold text-[#4C8055] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Nursery Fresh
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl font-bold text-[#1F3B2C]">₹{displayPrice}</span>
            {originalPrice && originalPrice > displayPrice && (
              <span className="text-base text-[#6B6B63] line-through">₹{originalPrice}</span>
            )}
            <span className="text-xs font-semibold text-[#4C8055] bg-[#4C8055]/10 px-2.5 py-1 rounded-full">
              Taxes Included
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm text-[#6B6B63] leading-relaxed">
            {plant.description}
          </p>

          {/* Variant Selector: Size & Pot */}
          <div className="space-y-4 pt-2">
            
            {/* Size Selector */}
            <div>
              <label className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider block mb-2">
                Plant Size: <span className="text-[#C96F4A]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {['Small (6")', 'Medium (10")', 'Large (14")', 'Extra Large (18")'].map((s) => {
                  const sizeName = s.split(' ')[0];
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(sizeName)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === sizeName
                          ? 'bg-[#1F3B2C] text-white shadow-xs'
                          : 'bg-white border border-[#EFE9DD] text-[#1C1C1A] hover:bg-[#EFE9DD]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pot Type Selector */}
            <div>
              <label className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider block mb-2">
                Planter Pot: <span className="text-[#C96F4A]">{selectedPot}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {['Ceramic White', 'Eco Terracotta', 'Self-Watering', 'Nursery Pot'].map((pot) => (
                  <button
                    key={pot}
                    onClick={() => setSelectedPot(pot)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedPot === pot
                        ? 'bg-[#C96F4A] text-white shadow-xs'
                        : 'bg-white border border-[#EFE9DD] text-[#1C1C1A] hover:bg-[#EFE9DD]'
                    }`}
                  >
                    {pot}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Quantity Stepper & Actions */}
          <div className="space-y-4 pt-4 border-t border-[#EFE9DD]">
            <div className="flex items-center gap-4">
              
              {/* Stepper */}
              <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-full border border-[#EFE9DD]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-[#1F3B2C] font-bold hover:text-[#C96F4A] cursor-pointer"
                >
                  -
                </button>
                <span className="text-sm font-bold text-[#1F3B2C] w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-[#1F3B2C] font-bold hover:text-[#C96F4A] cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Wishlist & Share */}
              <button
                onClick={() => onToggleWishlist && onToggleWishlist(plant)}
                className={`p-3.5 rounded-full border border-[#EFE9DD] transition-all cursor-pointer ${
                  isWishlisted ? 'bg-[#B3452F] text-white' : 'bg-white text-[#1F3B2C] hover:text-[#C96F4A]'
                }`}
                title="Wishlist"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => navigator.clipboard && navigator.clipboard.writeText(window.location.href)}
                className="p-3.5 rounded-full bg-white border border-[#EFE9DD] text-[#1F3B2C] hover:text-[#C96F4A] transition-all cursor-pointer"
                title="Share Link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Side by Side CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCartClick}
                className="btn-primary-terracotta text-sm py-4 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Cart — ₹{displayPrice * quantity}</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart && onAddToCart({ ...plant, quantity, selectedSize, selectedPot });
                  onBuyNow && onBuyNow();
                }}
                className="btn-forest-fill text-sm py-4 cursor-pointer"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE9DD] space-y-2">
            <label className="text-xs font-bold text-[#1F3B2C] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C96F4A]" /> Estimate Delivery Date
            </label>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 400076)..."
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                className="flex-1 bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#1C1C1A]"
              />
              <button
                type="submit"
                className="btn-secondary-forest text-xs py-2 px-4 cursor-pointer shrink-0"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-xs font-semibold mt-1 ${pincodeStatus.success ? 'text-[#4C8055]' : 'text-[#B3452F]'}`}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Trust Icons Row */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white border border-[#EFE9DD] text-center">
              <ShieldCheck className="w-5 h-5 text-[#4C8055] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-[#1F3B2C] block">7-Day Guarantee</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#EFE9DD] text-center">
              <Truck className="w-5 h-5 text-[#C96F4A] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-[#1F3B2C] block">Safe Eco Transit</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#EFE9DD] text-center">
              <RefreshCw className="w-5 h-5 text-[#7A9B76] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-[#1F3B2C] block">Easy Returns</span>
            </div>
          </div>

          {/* Expandable Accordion Tabs */}
          <div className="space-y-2 pt-4">
            
            {/* Tab 1: Plant Care Guide */}
            <div className="card-plant rounded-2xl overflow-hidden border border-[#EFE9DD]">
              <button
                onClick={() => setOpenTab(openTab === 'care' ? null : 'care')}
                className="w-full p-4 flex items-center justify-between font-serif font-bold text-base text-[#1F3B2C] bg-white cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#C9A24B]" /> Plant Care Guide
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openTab === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openTab === 'care' && (
                <div className="p-4 bg-[#F7F4EE] border-t border-[#EFE9DD] text-xs text-[#6B6B63] space-y-3">
                  <div className="flex items-start gap-2">
                    <Sun className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F3B2C] block">Light Requirement:</strong>
                      {plant.careGuide?.light || 'Bright indirect sunlight. Avoid direct intense midday sun.'}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Droplets className="w-4 h-4 text-[#7A9B76] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F3B2C] block">Watering Schedule:</strong>
                      {plant.careGuide?.water || 'Water once every 7 days when top 2 inches of soil feel dry.'}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#4C8055] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F3B2C] block">Pet Safety & Toxicity:</strong>
                      {plant.careGuide?.petFriendly ? 'Pet Safe & Non-Toxic' : 'Mildly toxic if ingested by pets; keep out of reach.'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tab 2: Detailed Description */}
            <div className="card-plant rounded-2xl overflow-hidden border border-[#EFE9DD]">
              <button
                onClick={() => setOpenTab(openTab === 'desc' ? null : 'desc')}
                className="w-full p-4 flex items-center justify-between font-serif font-bold text-base text-[#1F3B2C] bg-white cursor-pointer"
              >
                <span>Botanical Details & Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openTab === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              {openTab === 'desc' && (
                <div className="p-4 bg-[#F7F4EE] border-t border-[#EFE9DD] text-xs text-[#6B6B63] leading-relaxed">
                  {plant.description}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* BELOW: Reviews & Ratings Breakdown */}
      <section id="reviews-section" className="pt-12 border-t border-[#EFE9DD] my-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#7A9B76] uppercase tracking-wider block mb-1">
              Customer Feedback
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1F3B2C]">
              Reviews & Ratings ({reviewsList.length})
            </h2>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="btn-primary-terracotta text-xs py-3 px-6 cursor-pointer self-start md:self-auto"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE9DD]">
          <div className="lg:col-span-4 text-center lg:text-left space-y-2 flex flex-col justify-center">
            <span className="text-5xl font-bold font-serif text-[#1F3B2C]">{plant.ratingsAverage || 4.9}</span>
            <div className="flex justify-center lg:justify-start gap-1 text-[#C9A24B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#6B6B63]">Based on {plant.numReviews || reviewsList.length} verified reviews</p>
          </div>

          <div className="lg:col-span-8 space-y-2">
            {[
              { stars: 5, pct: 85 },
              { stars: 4, pct: 10 },
              { stars: 3, pct: 3 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 1 }
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-right font-semibold text-[#1F3B2C]">{bar.stars} Stars</span>
                <div className="flex-1 h-2.5 bg-[#F7F4EE] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C9A24B] rounded-full" style={{ width: `${bar.pct}%` }}></div>
                </div>
                <span className="w-10 text-xs text-[#6B6B63]">{bar.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-[#EFE9DD] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-[#1F3B2C]">{rev.name}</span>
                  <span className="bg-[#4C8055]/15 text-[#4C8055] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
                <span className="text-xs text-[#6B6B63]">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-[#C9A24B]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-[#1C1C1A] leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Review Submission Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productName={plant.name}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}
