import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Footer,
  HeroBanner,
  CategoryShowcase,
  BestsellersSection,
  ShopByRoom,
  WhyChooseUs,
  CustomerReviews,
  NewsletterBand,
  TrendingPlants,
  TopSellingPlants,
  O2PlantsSection,
  ShopCatalog,
  PlantQuiz,
  PlantCareGuides,
  CartDrawer,
  WishlistDrawer,
  CheckoutModal,
  AuthModal,
  UserProfileModal,
  AdminDashboard,
  ProductModal,
  SearchModal,
  DesignSystemShowcase,
  ProductDetailPage,
  AboutUsPage,
  ContactUsPage,
  FaqPage,
  PolicyPages,
  NotFoundPage
} from './components';
import OrderTrackingModal from './components/modals/OrderTrackingModal';
import { plantsData as defaultPlantsData } from './data/plantsData';
import { authService, plantService } from './services/api';
import { CheckCircle2, Palette } from 'lucide-react';
import heroTree from './assets/hero_tree.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [detailPlant, setDetailPlant] = useState(null);
  const [plantsList, setPlantsList] = useState(defaultPlantsData);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadPlants = async () => {
    const apiPlants = await plantService.getPlants();
    if (apiPlants && Array.isArray(apiPlants) && apiPlants.length > 0) {
      setPlantsList((prev) => {
        const map = new Map();
        // Add newly added plants from state first
        prev.forEach(p => {
          if (p) map.set(p._id || p.id || p.name, p);
        });
        // Merge apiPlants
        apiPlants.forEach(p => {
          if (p) map.set(p._id || p.id || p.name, p);
        });
        return Array.from(map.values());
      });
    }
  };

  const userKey = currentUser ? (currentUser.id || currentUser._id || currentUser.email) : 'guest';

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    loadPlants();
  }, []);

  // Load User-Specific Cart & Wishlist whenever logged in user changes
  useEffect(() => {
    const savedCart = localStorage.getItem(`flora_cart_${userKey}`);
    const savedWishlist = localStorage.getItem(`flora_wishlist_${userKey}`);
    if (savedCart) setCartItems(JSON.parse(savedCart));
    else setCartItems([]);

    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    else setWishlist([]);
  }, [userKey]);

  // Auto-sync Cart to LocalStorage for active user
  useEffect(() => {
    localStorage.setItem(`flora_cart_${userKey}`, JSON.stringify(cartItems));
  }, [cartItems, userKey]);

  // Auto-sync Wishlist to LocalStorage for active user
  useEffect(() => {
    localStorage.setItem(`flora_wishlist_${userKey}`, JSON.stringify(wishlist));
  }, [wishlist, userKey]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, [selectedPlant, isCartOpen, isWishlistOpen, isCheckoutOpen, isAuthOpen, isProfileOpen, isAdminOpen, detailPlant]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (plant) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === plant.id || item._id === plant._id);
      if (existing) {
        return prevItems.map((item) =>
          (item.id === plant.id || item._id === plant._id) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...plant, id: plant.id || plant._id, quantity: 1 }];
    });
    showToast(`Added "${plant.name}" to cart!`);
  };

  const handleToggleWishlist = (plant) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => (item.id || item._id) === (plant.id || plant._id));
      if (exists) {
        showToast(`Removed "${plant.name}" from wishlist`);
        return prev.filter((item) => (item.id || item._id) !== (plant.id || plant._id));
      } else {
        showToast(`Saved "${plant.name}" to wishlist!`);
        return [...prev, plant];
      }
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => (item.id || item._id) !== id));
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => ((item.id || item._id) === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuyNowHero = () => {
    const shopSection = document.getElementById('shop-catalog');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreHero = () => {
    const quizSection = document.getElementById('plant-quiz');
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    const shopSection = document.getElementById('shop-catalog');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showDesignSystem) {
    return <DesignSystemShowcase onClose={() => setShowDesignSystem(false)} />;
  }

  const handleOpenAdmin = () => {
    if (currentUser && currentUser.role === 'admin') {
      setIsAdminOpen(true);
    } else {
      showToast("Please sign in with Admin account (admin@floravision.com)");
      setIsAuthOpen(true);
    }
  };

  const handleAddNewPlantToState = (newPlant) => {
    setPlantsList((prev) => [
      newPlant,
      ...prev.filter((p) => (p._id || p.id) !== (newPlant._id || newPlant.id))
    ]);
  };

  const handleDeletePlantFromState = (plantId) => {
    setPlantsList((prev) => prev.filter((p) => (p._id || p.id) !== plantId));
  };

  const handleCloseDetail = () => {
    setDetailPlant(null);
    setSelectedPlant(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlantDetail = (plant) => {
    setDetailPlant(plant);
    setSelectedPlant(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (id) => {
    setDetailPlant(null);
    setSelectedPlant(null);
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#7A9B76] selection:text-white relative bg-[#09130D]">
      {/* Global Fixed Background Image of Botanical Tree */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-40"
        style={{ backgroundImage: `url(${heroTree})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0B150F]/70 via-[#09120C]/65 to-[#0B150F]/80 pointer-events-none z-0" />

      <div className="relative z-10">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F3B2C] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#7A9B76]/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#7A9B76]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Sticky Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenTracking={() => {
          setTrackingOrderId('');
          setIsTrackingOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="pt-16">
        {detailPlant ? (
          <ProductDetailPage
            plant={detailPlant}
            onAddToCart={handleAddToCart}
            onBuyNow={() => {
              setIsCartOpen(true);
            }}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onBackToShop={handleCloseDetail}
          />
        ) : activeTab === 'about' ? (
          <AboutUsPage onBackToShop={handleCloseDetail} />
        ) : activeTab === 'contact' ? (
              <ContactUsPage />
            ) : activeTab === 'faq' ? (
              <FaqPage />
            ) : activeTab === 'privacy' || activeTab === 'terms' || activeTab === 'shipping' ? (
              <PolicyPages />
            ) : activeTab === '404' ? (
              <NotFoundPage onGoHome={() => setActiveTab('home')} />
            ) : (
              <>
                {/* 2. Hero Banner */}
                <HeroBanner
                  onBuyNow={handleBuyNowHero}
                  onExplore={handleExploreHero}
                />

                {/* 3. Category Showcase */}
                <CategoryShowcase
                  onSelectCategory={handleCategorySelect}
                />

                {/* 4. Bestsellers Section */}
                <BestsellersSection
                  plants={plantsList}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleOpenPlantDetail}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />

                {/* 5. Shop By Room */}
                <ShopByRoom
                  onSelectRoom={handleCategorySelect}
                />

                {/* 6. Why Choose Us */}
                <WhyChooseUs />

                {/* Catalog Section */}
                <ShopCatalog
                  plants={plantsList}
                  selectedCategory={selectedCategory}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleOpenPlantDetail}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />

                {/* Quiz & Care Section */}
                <PlantQuiz
                  plants={plantsList}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleOpenPlantDetail}
                />

                <PlantCareGuides />

                {/* 7. Testimonials Carousel */}
                <CustomerReviews />

                {/* 8. Newsletter Signup Band */}
                <NewsletterBand />
              </>
            )}
          </main>

      {/* 9. Footer */}
      <Footer onNavigate={(id) => {
        setActiveTab(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={(details) => {
          setCheckoutDetails(details);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout & Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        checkoutDetails={checkoutDetails}
        currentUser={currentUser}
        onOrderComplete={(createdOrdId) => {
          handleClearCart();
          showToast("Order placed & nursery dispatched!");
          if (createdOrdId) {
            setTrackingOrderId(createdOrdId);
            setIsTrackingOpen(true);
          }
        }}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
        currentUser={currentUser}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
        }}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast("Logged out successfully");
        }}
        onOpenOrderTracking={(ordId) => {
          setTrackingOrderId(ordId);
          setIsTrackingOpen(true);
        }}
      />

      {/* Store Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshCatalog={loadPlants}
        showToast={showToast}
        onAddPlantSuccess={handleAddNewPlantToState}
        onDeletePlantSuccess={handleDeletePlantFromState}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={handleAddToCart}
        onQuickView={(plant) => setSelectedPlant(plant)}
      />

      </div>
    </div>
  );
}
