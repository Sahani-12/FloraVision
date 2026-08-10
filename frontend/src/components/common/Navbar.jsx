import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, Heart, LayoutDashboard, Leaf, Truck, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  wishlistCount,
  onOpenCart, 
  onOpenWishlist,
  activeTab, 
  setActiveTab, 
  onOpenSearch,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin,
  onOpenTracking
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
      setScrolled(currentScroll > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop Catalog', id: 'shop-catalog' },
    { name: 'Living Space', id: 'shop-by-room' },
    { name: 'Plant Quiz', id: 'plant-quiz' },
    { name: 'Care Guides', id: 'care-guides' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#071911]/95 backdrop-blur-2xl border-b border-white/15 py-2.5 shadow-2xl' 
        : 'bg-[#071911]/85 backdrop-blur-md py-3.5 border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group cursor-pointer" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8DAA86] via-[#D96B43] to-[#D4AF37] p-0.5 shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#071911] rounded-[10px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#8DAA86]" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-0.5">
                FloraVision<span className="text-[#D96B43]">.</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#8DAA86] font-bold -mt-1">
                Botanical Nursery
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/10 p-1.5 rounded-full border border-white/15 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === link.id 
                    ? 'bg-[#D96B43] text-white shadow-md scale-102' 
                    : 'text-[#EFE9DD]/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </button>
            ))}

            {/* Admin Trigger Button - Shown only for Admin users */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D96B43] hover:bg-[#C2562E] text-white text-xs font-bold rounded-full border border-white/20 transition-all cursor-pointer ml-1 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F9E8A2]" />
                <span>👑 Admin</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Track Order Button */}
            <button 
              onClick={onOpenTracking}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#D96B43] text-white text-xs font-bold border border-white/15 transition-all cursor-pointer shadow-xs"
              title="Track Order Status"
            >
              <Truck className="w-3.5 h-3.5 text-[#8DAA86]" />
              <span>Track Order</span>
            </button>

            {/* Search Button */}
            <button 
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Search Plants"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={onOpenWishlist}
              className="relative p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C83B2B] text-[10px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D96B43] text-[10px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Admin Control */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={onOpenProfile}
                  className="flex items-center gap-1.5 p-1 pl-1.5 pr-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer hover:scale-105"
                  title="Manage Account"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#8DAA86]"
                  />
                  <span className="text-xs font-bold text-white hidden sm:inline">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}
                  </span>
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all cursor-pointer hover:scale-105"
                title="Sign In"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 lg:hidden rounded-full bg-white/10 text-white border border-white/15 cursor-pointer hover:bg-white/20 transition-all"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Enhanced Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 py-4 px-4 bg-[#071911]/98 backdrop-blur-2xl rounded-3xl border border-white/20 flex flex-col space-y-2.5 shadow-2xl animate-in slide-in-from-top-4 duration-200 text-left">
            
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DAA86] px-3 pb-1 border-b border-white/10">
              Navigation Menu
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === link.id 
                    ? 'bg-[#D96B43] text-white shadow-lg' 
                    : 'text-[#EFE9DD]/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            ))}

            {/* Quick Action Mobile Buttons */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8DAA86]" />
                  <span>🚚 Track Live Order Status</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              {currentUser?.role === 'admin' ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-[#D96B43] text-white border border-white/20 flex items-center justify-between cursor-pointer shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F9E8A2]" />
                    <span>👑 Open Store Admin Dashboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              ) : currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold bg-white/10 text-white border border-white/15 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#8DAA86]" />
                    <span>👤 My Account & Orders ({currentUser.name})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#D96B43] text-white border border-white/20 flex items-center justify-between cursor-pointer shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Sign In / Register</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Thin Metallic Scroll Progress Bar at Bottom of Navbar */}
      <div 
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#8DAA86] via-[#D96B43] to-[#D4AF37] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
