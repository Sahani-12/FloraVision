import React, { useState, useEffect, useMemo } from 'react';
import PlantCard from './PlantCard';
import { Filter, Search, SlidersHorizontal, Sun, ShieldCheck, Sparkles, RefreshCw, X, LayoutGrid, List, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { plantService } from '../../services/api';

export default function ShopCatalog({ plants: initialPlants = [], selectedCategory: initialCategory, onAddToCart, onQuickView, wishlist = [], onToggleWishlist }) {
  const [products, setProducts] = useState(initialPlants);
  const [loading, setLoading] = useState(false);

  // Filter & Pagination States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedLight, setSelectedLight] = useState('All');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [airPurifyingOnly, setAirPurifyingOnly] = useState(false);
  const [selectedPotColor, setSelectedPotColor] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ['All', 'Indoor Plants', 'Outdoor Plants', 'Succulents & Cacti', 'Pots & Planters', 'Air Purifying', 'Gift Combos'];
  const sizes = ['All', 'Small', 'Medium', 'Large'];
  const lights = ['All', 'Low Light', 'Bright Indirect', 'Full Sun'];

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialPlants && Array.isArray(initialPlants) && initialPlants.length > 0) {
      setProducts(initialPlants);
    }
  }, [initialPlants]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      const apiPlants = await plantService.getPlants();
      if (apiPlants && apiPlants.length > 0) setProducts(apiPlants);
      setLoading(false);
    };
    fetchCatalog();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'All') {
        const catName = p.categoryName || (p.category && typeof p.category === 'object' ? p.category.name : p.category) || '';
        const catMatch = typeof catName === 'string' && catName.toLowerCase().includes(selectedCategory.toLowerCase());
        const tagMatch = p.tags && Array.isArray(p.tags) && p.tags.some(t => typeof t === 'string' && t.toLowerCase().includes(selectedCategory.toLowerCase()));
        if (!catMatch && !tagMatch) return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description ? p.description.toLowerCase().includes(q) : false;
        const tagMatch = p.tags ? p.tags.some(t => t.toLowerCase().includes(q)) : false;
        if (!nameMatch && !descMatch && !tagMatch) return false;
      }
      const price = p.discountPrice || p.price;
      if (price > maxPrice) return false;
      if (petFriendlyOnly && !p.careGuide?.petFriendly && !p.petFriendly) return false;
      if (airPurifyingOnly && !p.careGuide?.airPurifying && !p.isO2) return false;
      if (selectedLight !== 'All') {
        const pLight = (p.careGuide?.light || p.light || '').toLowerCase();
        if (!pLight.includes(selectedLight.toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return (b.ratingsAverage || b.rating || 0) - (a.ratingsAverage || a.rating || 0);
      if (sortBy === 'popular') return (b.numReviews || b.reviewsCount || 0) - (a.numReviews || a.reviewsCount || 0);
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (timeA && timeB) return timeB - timeA;
    });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice, petFriendlyOnly, airPurifyingOnly, selectedLight]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, maxPrice, petFriendlyOnly, airPurifyingOnly, selectedLight, selectedSize, selectedPotColor]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (searchQuery !== '') count++;
    if (maxPrice < 2500) count++;
    if (selectedSize !== 'All') count++;
    if (selectedLight !== 'All') count++;
    if (petFriendlyOnly) count++;
    if (airPurifyingOnly) count++;
    if (selectedPotColor !== 'All') count++;
    return count;
  }, [selectedCategory, searchQuery, maxPrice, selectedSize, selectedLight, petFriendlyOnly, airPurifyingOnly, selectedPotColor]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(2500);
    setSelectedSize('All');
    setSelectedLight('All');
    setPetFriendlyOnly(false);
    setAirPurifyingOnly(false);
    setSelectedPotColor('All');
    setSortBy('featured');
  };

  return (
    <section id="shop-catalog" className="py-16 bg-[#0B150F]/70 backdrop-blur-md relative border-y border-white/10 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs text-gray-300 mb-6">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-white">Shop Catalog</span>
        </nav>

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-3 pb-5 border-b border-white/15">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" /> Nursery Fresh Botanical Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Explore Houseplants &amp; Decor
            </h1>
          </div>
          <span className="text-sm font-semibold text-gray-300 shrink-0">
            Showing <strong className="text-white">{filteredProducts.length}</strong> of {products.length} species
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════
            HORIZONTAL FILTER BAR  (was the left sidebar)
        ══════════════════════════════════════════════════════ */}
        <div className="bg-white border border-[#EFE9DD] rounded-2xl shadow-sm mb-6 overflow-hidden">

          {/* ── Row 1: Search  |  Category chips  |  Sort  |  View ── */}
          <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#EFE9DD]">

            {/* Search */}
            <div className="relative min-w-[200px] flex-1 max-w-xs">
              <Search className="w-4 h-4 text-[#7A9B76] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl text-xs font-medium text-[#1C1C1A] placeholder-[#6B6B63] focus:outline-none focus:ring-2 focus:ring-[#7A9B76] transition"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B63] hover:text-[#1F3B2C] cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category chips (scrollable) */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1F3B2C] text-white shadow-sm'
                      : 'bg-[#F7F4EE] text-[#6B6B63] hover:bg-[#EFE9DD] hover:text-[#1F3B2C] border border-[#EFE9DD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Refine toggle */}
              <button
                onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  filterPanelOpen
                    ? 'bg-[#1F3B2C] text-white border-[#1F3B2C]'
                    : 'bg-[#F7F4EE] text-[#1F3B2C] border-[#EFE9DD] hover:border-[#7A9B76]'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                Refine
                {activeFiltersCount > 0 && (
                  <span className="bg-[#C96F4A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${filterPanelOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Sort */}
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A9B76] shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F7F4EE] border border-[#EFE9DD] text-[#1C1C1A] text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A9B76] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Reviewed</option>
                </select>
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-[#F7F4EE] p-1 rounded-xl border border-[#EFE9DD]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white text-[#1F3B2C] shadow-sm' : 'text-[#6B6B63]'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#1F3B2C] shadow-sm' : 'text-[#6B6B63]'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Row 2: Expanded Refine Panel (collapsible) ── */}
          {filterPanelOpen && (
            <div className="p-5 bg-[#FDFCF9] border-t border-[#EFE9DD] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Budget Slider */}
              <div>
                <label className="text-[10px] font-bold text-[#1C1C1A] uppercase tracking-widest block mb-2">
                  Max Budget: <span className="text-[#C96F4A] font-bold text-sm">₹{maxPrice}</span>
                </label>
                <input
                  type="range" min="200" max="2500" step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C96F4A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6B6B63] mt-1">
                  <span>₹200</span><span>₹2,500</span>
                </div>
              </div>

              {/* Light Requirement */}
              <div>
                <label className="text-[10px] font-bold text-[#1C1C1A] uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#C9A24B]" /> Light
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {lights.map((l) => (
                    <button
                      key={l}
                      onClick={() => setSelectedLight(l)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        selectedLight === l
                          ? 'bg-[#1F3B2C] text-white'
                          : 'bg-white border border-[#EFE9DD] text-[#6B6B63] hover:border-[#7A9B76] hover:text-[#1F3B2C]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Benefits */}
              <div>
                <label className="text-[10px] font-bold text-[#1C1C1A] uppercase tracking-widest block mb-2">Plant Benefits</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl bg-white border border-[#EFE9DD] hover:border-[#7A9B76] transition-colors">
                    <input
                      type="checkbox" checked={petFriendlyOnly}
                      onChange={(e) => setPetFriendlyOnly(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#C96F4A]"
                    />
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4C8055]" />
                    <span className="text-xs font-medium text-[#1F3B2C]">Pet Friendly Only</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl bg-white border border-[#EFE9DD] hover:border-[#7A9B76] transition-colors">
                    <input
                      type="checkbox" checked={airPurifyingOnly}
                      onChange={(e) => setAirPurifyingOnly(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#C96F4A]"
                    />
                    <Sparkles className="w-3.5 h-3.5 text-[#7A9B76]" />
                    <span className="text-xs font-medium text-[#1F3B2C]">Air Purifying Only</span>
                  </label>
                </div>
              </div>

              {/* Plant Size + Reset */}
              <div>
                <label className="text-[10px] font-bold text-[#1C1C1A] uppercase tracking-widest block mb-2">Plant Size</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1.5 px-3 rounded-xl text-[11px] font-semibold text-center transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#C96F4A] text-white'
                          : 'bg-white border border-[#EFE9DD] text-[#6B6B63] hover:border-[#C96F4A] hover:text-[#1F3B2C]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={resetAllFilters}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C96F4A] hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Active Filter Chips ── */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-[11px] font-semibold text-[#6B6B63]">Active:</span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-[#7A9B76]/15 text-[#1F3B2C] text-[11px] font-semibold px-3 py-1 rounded-full">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-[#B3452F]" onClick={() => setSelectedCategory('All')} />
              </span>
            )}
            {maxPrice < 2500 && (
              <span className="inline-flex items-center gap-1.5 bg-[#7A9B76]/15 text-[#1F3B2C] text-[11px] font-semibold px-3 py-1 rounded-full">
                Max ₹{maxPrice}
                <X className="w-3 h-3 cursor-pointer hover:text-[#B3452F]" onClick={() => setMaxPrice(2500)} />
              </span>
            )}
            {petFriendlyOnly && (
              <span className="inline-flex items-center gap-1.5 bg-[#4C8055]/15 text-[#4C8055] text-[11px] font-semibold px-3 py-1 rounded-full">
                Pet Safe
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPetFriendlyOnly(false)} />
              </span>
            )}
            {airPurifyingOnly && (
              <span className="inline-flex items-center gap-1.5 bg-[#7A9B76]/15 text-[#1F3B2C] text-[11px] font-semibold px-3 py-1 rounded-full">
                Air Purifying
                <X className="w-3 h-3 cursor-pointer" onClick={() => setAirPurifyingOnly(false)} />
              </span>
            )}
            {selectedLight !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-[#C9A24B]/15 text-[#1F3B2C] text-[11px] font-semibold px-3 py-1 rounded-full">
                {selectedLight}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLight('All')} />
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-[11px] text-[#B3452F] hover:underline font-semibold ml-auto cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* ── Product Grid (4 cols) ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white border border-[#EFE9DD] rounded-2xl overflow-hidden animate-pulse">
                <div className="bg-[#EFE9DD]" style={{ aspectRatio: '4/5' }}></div>
                <div className="p-4 space-y-2.5">
                  <div className="h-2.5 bg-[#EFE9DD] rounded-full w-1/3"></div>
                  <div className="h-4 bg-[#EFE9DD] rounded-full w-3/4"></div>
                  <div className="h-2.5 bg-[#EFE9DD] rounded-full w-full"></div>
                  <div className="h-2.5 bg-[#EFE9DD] rounded-full w-2/3"></div>
                </div>
                <div className="px-4 pb-4 pt-3 border-t border-[#EFE9DD] flex items-center justify-between">
                  <div className="h-5 bg-[#EFE9DD] rounded-full w-14"></div>
                  <div className="h-8 bg-[#EFE9DD] rounded-full w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch'
                : 'flex flex-col gap-4'
            }>
              {paginatedProducts.map((plant) => (
                <PlantCard
                  key={plant._id || plant.id}
                  plant={plant}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isWishlisted={wishlist ? wishlist.some(w => (w.id || w._id) === (plant.id || plant._id)) : false}
                  onToggleWishlist={onToggleWishlist}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-[#EFE9DD] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#6B6B63]">
                  Showing <strong className="text-[#1F3B2C]">{((currentPage - 1) * itemsPerPage) + 1}</strong>–<strong className="text-[#1F3B2C]">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> of <strong className="text-[#1F3B2C]">{filteredProducts.length}</strong> plants
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(1, prev - 1));
                      document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#EFE9DD] bg-white text-[#1F3B2C] hover:border-[#7A9B76] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1 shadow-xs"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      type="button"
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#1F3B2C] text-white shadow-md'
                          : 'bg-white border border-[#EFE9DD] text-[#6B6B63] hover:border-[#7A9B76] hover:text-[#1F3B2C]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                      document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#EFE9DD] bg-white text-[#1F3B2C] hover:border-[#7A9B76] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1 shadow-xs"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white border border-[#EFE9DD] rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-[#7A9B76]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#1F3B2C]">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#1F3B2C]">No Botanical Match Found</h4>
            <p className="text-sm text-[#6B6B63] mt-2 max-w-sm mx-auto leading-relaxed">
              No plants match your current filters. Try adjusting the budget or clearing active filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 bg-[#1F3B2C] hover:bg-[#2D543F] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
