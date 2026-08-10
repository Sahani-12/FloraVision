import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, DollarSign, Plus, Trash2, CheckCircle2,
  RefreshCw, X, ArrowUpRight, Users, Tag, Settings, Eye, AlertTriangle, FileText, Upload, Search
} from 'lucide-react';
import { plantService, orderService, adminService, uploadService } from '../../services/api';

const formatAddress = (addr) => {
  if (!addr) return 'Mumbai, India';
  if (typeof addr === 'string') return addr;
  if (typeof addr === 'object') {
    const parts = [
      addr.addressLine || addr.street,
      addr.landmark,
      addr.city,
      addr.state,
      addr.pincode
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : (addr.name || 'Mumbai, India');
  }
  return String(addr);
};

export default function AdminDashboard({ isOpen, onClose, onRefreshCatalog, showToast, onAddPlantSuccess, onDeletePlantSuccess }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'coupons' | 'customers' | 'settings'
  const [stats, setStats] = useState({ totalPlants: 8, totalOrders: 14, totalUsers: 28, totalRevenue: 15400 });
  const [plantsList, setPlantsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [couponsList, setCouponsList] = useState([
    { id: 'c1', code: 'WELCOME10', discountType: 'percent', value: 10, minOrderValue: 499, usedCount: 42, isActive: true },
    { id: 'c2', code: 'GREENFLORA200', discountType: 'flat', value: 200, minOrderValue: 999, usedCount: 18, isActive: true }
  ]);
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'FloraVision Admin', email: 'admin@floravision.com', role: 'admin', ordersCount: 0 },
    { id: 'u2', name: 'Aarav Sharma', email: 'customer@example.com', role: 'customer', ordersCount: 3 }
  ]);

  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // Order Management States
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState('All');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);

  // Form States
  const [newPlant, setNewPlant] = useState({
    name: '',
    categoryName: 'Indoor Plants',
    price: '',
    discountPrice: '',
    stock: 20,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    description: '',
    light: 'Bright Indirect',
    water: 'Weekly',
    petFriendly: true,
    airPurifying: true,
    promoTag: 'Special Offer'
  });

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percent',
    value: 10,
    minOrderValue: 499
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const res = await uploadService.uploadImage(file);
    if (res.success) {
      setNewPlant((prev) => ({ ...prev, image: res.url }));
      showToast && showToast('Image uploaded to Cloudinary CDN successfully!');
    } else {
      showToast && showToast(res.message || 'Image upload failed');
    }
    setUploadingImage(false);
  };

  const fetchData = async () => {
    const s = await adminService.getStats();
    const o = await orderService.getOrders('admin');
    
    const ordersArray = o || [];
    
    let calcTotalRevenue = 0;
    let calcPaidRevenue = 0;
    let calcDeliveredRevenue = 0;
    let calcPendingRevenue = 0;
    let calcDiscounts = 0;

    ordersArray.forEach((ord) => {
      const amt = Number(ord.totalAmount || ord.total || ord.subtotal || 0);
      const isCancelled = (ord.orderStatus || ord.status) === 'cancelled';
      if (!isCancelled) {
        calcTotalRevenue += amt;
        if (ord.paymentStatus === 'completed' || (ord.paymentMethod && ord.paymentMethod !== 'COD')) {
          calcPaidRevenue += amt;
        } else {
          calcPendingRevenue += amt;
        }
        if ((ord.orderStatus || ord.status) === 'delivered') {
          calcDeliveredRevenue += amt;
        }
      }
      calcDiscounts += Number(ord.discountAmount || ord.discount || 0);
    });

    const calculatedAov = ordersArray.length > 0 ? Math.round(calcTotalRevenue / ordersArray.length) : 0;

    setStats({
      totalPlants: s?.totalPlants || 0,
      totalOrders: ordersArray.length,
      totalUsers: s?.totalUsers || 0,
      totalRevenue: calcTotalRevenue,
      paidRevenue: calcPaidRevenue,
      deliveredRevenue: calcDeliveredRevenue,
      pendingRevenue: calcPendingRevenue,
      averageOrderValue: calculatedAov,
      totalDiscounts: calcDiscounts
    });

    const p = await plantService.getPlants();
    if (p) setPlantsList(p);
    if (o) setOrdersList(o);
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleAddPlantSubmit = async (e) => {
    e.preventDefault();
    if (!newPlant.name || !newPlant.price) return;

    const originalPrice = Number(newPlant.price);
    const offerPrice = newPlant.discountPrice ? Number(newPlant.discountPrice) : originalPrice;
    
    // Auto-generate promo tags & discount badge
    const tagsArr = [
      newPlant.categoryName,
      newPlant.promoTag,
      newPlant.petFriendly ? 'Pet Friendly' : null,
      newPlant.airPurifying ? 'Air Purifying' : null
    ].filter(Boolean);

    const res = await plantService.createPlant({
      name: newPlant.name,
      categoryName: newPlant.categoryName,
      price: originalPrice,
      discountPrice: offerPrice,
      stock: Number(newPlant.stock || 20),
      isFeatured: Boolean(newPlant.isFeatured),
      description: newPlant.description || `${newPlant.name} - premium organic houseplant for decor and fresh air.`,
      images: [newPlant.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'],
      careGuide: {
        light: newPlant.light,
        water: newPlant.water,
        petFriendly: Boolean(newPlant.petFriendly),
        airPurifying: Boolean(newPlant.airPurifying)
      },
      tags: tagsArr
    });

    if (res.success && res.plant) {
      const addedPlant = res.plant;
      showToast && showToast(`Added product: ${addedPlant.name}`);
      setIsAddPlantOpen(false);
      setNewPlant({
        name: '',
        categoryName: 'Indoor Plants',
        price: '',
        discountPrice: '',
        stock: 20,
        isFeatured: false,
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
        description: '',
        light: 'Bright Indirect',
        water: 'Weekly',
        petFriendly: true,
        airPurifying: true,
        promoTag: 'Special Offer'
      });
      
      setPlantsList((prev) => [
        addedPlant,
        ...prev.filter((p) => (p._id || p.id) !== (addedPlant._id || addedPlant.id))
      ]);
      setStats((prev) => ({ ...prev, totalPlants: (prev.totalPlants || 0) + 1 }));
      onAddPlantSuccess && onAddPlantSuccess(addedPlant);
    } else {
      showToast && showToast(res.message || 'Could not add product');
    }
  };

  const handleDeletePlant = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from store catalog?`)) {
      const res = await plantService.deletePlant(id);
      if (res.success) {
        showToast && showToast(`Deleted product: ${name}`);
        setPlantsList((prev) => prev.filter((p) => (p._id || p.id) !== id));
        setStats((prev) => ({ ...prev, totalPlants: Math.max(0, (prev.totalPlants || 1) - 1) }));
        onDeletePlantSuccess && onDeletePlantSuccess(id);
      } else {
        showToast && showToast(res.message || 'Could not delete product');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status, trackingNumber, courierPartner) => {
    await orderService.updateOrderStatus(orderId, status, trackingNumber, courierPartner);
    showToast && showToast(`Updated order status to ${status ? status.toUpperCase() : 'SAVED'}`);
    fetchData();
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm(`Are you sure you want to permanently delete order record #${orderId}?`)) {
      await orderService.deleteOrder(orderId);
      showToast && showToast(`Deleted order #${orderId}`);
      fetchData();
    }
  };

  const filteredAdminOrders = (ordersList || []).filter((order) => {
    if (!order) return false;
    const idStr = String(order.orderNumber || order.orderId || order._id || '').toLowerCase();
    const custName = String(order.customerName || order.user?.name || (typeof order.shippingAddress === 'object' ? order.shippingAddress?.name : '') || '').toLowerCase();
    const phoneStr = String(typeof order.shippingAddress === 'object' ? order.shippingAddress?.phone : '').toLowerCase();
    const cityStr = String(typeof order.shippingAddress === 'object' ? order.shippingAddress?.city : '').toLowerCase();
    const searchMatch = !orderSearchQuery || idStr.includes(orderSearchQuery.toLowerCase()) || custName.includes(orderSearchQuery.toLowerCase()) || phoneStr.includes(orderSearchQuery.toLowerCase()) || cityStr.includes(orderSearchQuery.toLowerCase());

    const statusMatch = orderStatusFilter === 'All' || (order.orderStatus || order.status || 'placed') === orderStatusFilter;
    const paymentMatch = orderPaymentFilter === 'All' || (order.paymentStatus || 'pending') === orderPaymentFilter;

    return searchMatch && statusMatch && paymentMatch;
  });

  const handleAddCouponSubmit = (e) => {
    e.preventDefault();
    if (newCoupon.code) {
      setCouponsList([...couponsList, { id: `c_${Date.now()}`, ...newCoupon, usedCount: 0, isActive: true }]);
      setIsAddCouponOpen(false);
      showToast && showToast(`Created coupon: ${newCoupon.code.toUpperCase()}`);
    }
  };

  const filteredPlants = plantsList.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F4EE] border border-[#EFE9DD] w-full max-w-6xl h-[90vh] rounded-3xl flex flex-col overflow-hidden text-[#1C1C1A] shadow-2xl">
        
        {/* Top Header */}
        <div className="p-6 bg-[#1F3B2C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C96F4A] flex items-center justify-center text-white shadow-md">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                FloraVision Store Admin Panel <span className="bg-[#4C8055] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Live</span>
              </h2>
              <p className="text-xs text-[#EFE9DD]/80">Manage products, customer orders, coupons, and store metrics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="px-6 bg-white border-b border-[#EFE9DD] flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'products', label: `Products (${plantsList.length})`, icon: Package },
            { id: 'orders', label: `Orders (${ordersList.length})`, icon: ShoppingCart },
            { id: 'coupons', label: `Coupons (${couponsList.length})`, icon: Tag },
            { id: 'customers', label: `Customers (${usersList.length})`, icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#C96F4A] text-[#1F3B2C] font-bold'
                    : 'border-transparent text-[#6B6B63] hover:text-[#1F3B2C]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#7A9B76]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Admin Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs">
                  <div className="flex justify-between items-center text-[#6B6B63] mb-2">
                    <span className="text-xs font-semibold uppercase">Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#C96F4A]" />
                  </div>
                  <div className="text-2xl font-bold font-serif text-[#1F3B2C]">₹{stats.totalRevenue.toLocaleString()}</div>
                  <span className="text-[11px] text-[#4C8055] flex items-center gap-0.5 mt-1 font-semibold">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this month
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs">
                  <div className="flex justify-between items-center text-[#6B6B63] mb-2">
                    <span className="text-xs font-semibold uppercase">Total Orders</span>
                    <ShoppingCart className="w-4 h-4 text-[#7A9B76]" />
                  </div>
                  <div className="text-2xl font-bold font-serif text-[#1F3B2C]">{stats.totalOrders}</div>
                  <span className="text-[11px] text-[#6B6B63] mt-1 block">Active & Fulfilled orders</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs">
                  <div className="flex justify-between items-center text-[#6B6B63] mb-2">
                    <span className="text-xs font-semibold uppercase">Products In Catalog</span>
                    <Package className="w-4 h-4 text-[#7A9B76]" />
                  </div>
                  <div className="text-2xl font-bold font-serif text-[#1F3B2C]">{stats.totalPlants}</div>
                  <span className="text-[11px] text-[#4C8055] mt-1 block">Active inventory items</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs">
                  <div className="flex justify-between items-center text-[#6B6B63] mb-2">
                    <span className="text-xs font-semibold uppercase">Registered Customers</span>
                    <Users className="w-4 h-4 text-[#C96F4A]" />
                  </div>
                  <div className="text-2xl font-bold font-serif text-[#1F3B2C]">{stats.totalUsers}</div>
                  <span className="text-[11px] text-[#6B6B63] mt-1 block">Verified customer accounts</span>
                </div>
              </div>

              {/* Quick Actions Band */}
              <div className="bg-white p-6 rounded-2xl border border-[#EFE9DD] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1F3B2C]">Quick Inventory Management</h3>
                  <p className="text-xs text-[#6B6B63]">Add new plant species or view pending customer orders.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('products');
                      setIsAddPlantOpen(true);
                    }}
                    className="btn-primary-terracotta text-xs py-2.5 px-4 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-white" /> Add New Plant
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="btn-secondary-forest text-xs py-2.5 px-4 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" /> View Customer Orders
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS TABLE */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Search products in inventory..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full sm:w-72 bg-white border border-[#EFE9DD] rounded-xl px-3.5 py-2 text-xs text-[#1C1C1A]"
                />
                <button
                  onClick={() => setIsAddPlantOpen(true)}
                  className="btn-primary-terracotta text-xs py-2.5 px-4 cursor-pointer self-end sm:self-auto"
                >
                  <Plus className="w-4 h-4 text-white" /> Add Product
                </button>
              </div>

              {/* Product Data Table */}
              <div className="bg-white rounded-2xl border border-[#EFE9DD] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F4EE] text-[#1F3B2C] font-serif font-bold border-b border-[#EFE9DD]">
                    <tr>
                      <th className="p-3.5">Plant Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Rating</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD]">
                    {filteredPlants.map((plant) => {
                      const img = plant.images && plant.images[0] ? plant.images[0] : plant.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                      const stockVal = plant.stock !== undefined ? plant.stock : 15;
                      const isLowStock = stockVal <= 5;

                      return (
                        <tr key={plant._id || plant.id} className={`hover:bg-[#F7F4EE]/50 ${isLowStock ? 'bg-[#B3452F]/5' : ''}`}>
                          <td className="p-3.5 flex items-center gap-3">
                            <img 
                              src={img} 
                              alt={plant.name} 
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                              }}
                              className="w-10 h-10 rounded-xl object-cover bg-[#EFE9DD]" 
                            />
                            <div>
                              <div className="font-bold text-[#1F3B2C]">{plant.name}</div>
                              <div className="text-[10px] text-[#6B6B63]">{plant.careGuide?.light || 'Indoor'}</div>
                            </div>
                          </td>
                          <td className="p-3.5 text-[#6B6B63] font-medium">{plant.categoryName || plant.category || 'Indoor Plants'}</td>
                          <td className="p-3.5 font-bold text-[#1F3B2C]">₹{plant.discountPrice || plant.price}</td>
                          <td className="p-3.5 font-semibold">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                              isLowStock ? 'bg-[#B3452F]/15 text-[#B3452F] font-bold' : 'bg-[#4C8055]/15 text-[#4C8055]'
                            }`}>
                              {stockVal} pcs {isLowStock && '(Low Stock)'}
                            </span>
                          </td>
                          <td className="p-3.5 text-[#C9A24B] font-bold">★ {plant.ratingsAverage || plant.rating || 4.9}</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeletePlant(plant._id || plant.id, plant.name)}
                              className="p-1.5 text-[#6B6B63] hover:text-[#B3452F] transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & LOGISTICS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1F3B2C]">Nursery Order Fulfillment & Logistics Hub</h3>
                  <p className="text-xs text-[#6B6B63]">Track, pack, assign express courier tracking IDs, inspect items, print shipping labels, and update milestones</p>
                </div>
                <button
                  type="button"
                  onClick={fetchData}
                  className="bg-white border border-[#EFE9DD] text-[#1F3B2C] hover:border-[#7A9B76] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C96F4A]" /> Refresh Orders ({filteredAdminOrders.length})
                </button>
              </div>

              {/* Order Search & Multi-Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-[#EFE9DD] shadow-xs flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search Order ID, Customer, Phone, City..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl text-[#1C1C1A] focus:outline-none focus:border-[#7A9B76]"
                  />
                  <Search className="w-4 h-4 text-[#6B6B63] absolute left-3 top-2.5" />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#6B6B63] font-semibold">Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-[#F7F4EE] border border-[#EFE9DD] text-xs font-bold text-[#1F3B2C] rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="placed">1. Placed</option>
                    <option value="processing">2. Nursery Check</option>
                    <option value="packed">3. Packed</option>
                    <option value="shipped">4. Shipped</option>
                    <option value="out_for_delivery">5. Out for Delivery</option>
                    <option value="delivered">6. Delivered</option>
                    <option value="cancelled">7. Cancelled</option>
                  </select>
                </div>

                {/* Payment Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#6B6B63] font-semibold">Payment:</span>
                  <select
                    value={orderPaymentFilter}
                    onChange={(e) => setOrderPaymentFilter(e.target.value)}
                    className="bg-[#F7F4EE] border border-[#EFE9DD] text-xs font-bold text-[#1F3B2C] rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Payments</option>
                    <option value="completed">Paid (Completed)</option>
                    <option value="pending">COD / Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              {/* Orders Grid List */}
              <div className="space-y-4">
                {filteredAdminOrders.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl text-center border border-[#EFE9DD]">
                    <Package className="w-10 h-10 text-[#7A9B76] mx-auto mb-2 opacity-50" />
                    <p className="text-xs text-[#6B6B63]">No matching customer orders found.</p>
                  </div>
                ) : (
                  filteredAdminOrders.map((order) => {
                    const orderIdStr = order.orderNumber || order.orderId || order._id;
                    const curStatus = order.orderStatus || order.status || 'placed';

                    return (
                      <div key={orderIdStr} className="bg-white p-5 rounded-2xl border border-[#EFE9DD] space-y-4 shadow-xs hover:shadow-md transition-all">
                        
                        {/* Header Row */}
                        <div className="flex flex-wrap items-center justify-between text-xs gap-3 pb-3 border-b border-[#EFE9DD]">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-[#1F3B2C] text-base">{orderIdStr}</span>
                              <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold ${
                                curStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                                curStatus === 'shipped' || curStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                                curStatus === 'packed' ? 'bg-indigo-100 text-indigo-800' :
                                curStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {curStatus.replace('_', ' ').toUpperCase()}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                (order.paymentStatus || 'pending') === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                Payment: {(order.paymentStatus || 'pending').toUpperCase()}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#6B6B63]">
                              Placed: {new Date(order.createdAt || Date.now()).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderForModal(order)}
                              className="bg-[#1F3B2C] hover:bg-[#2D543F] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#C96F4A]" /> Inspect & Print
                            </button>

                            <button
                              type="button"
                              onClick={() => handleUpdateOrderStatus(order._id || order.orderId, 'packed')}
                              className="bg-[#F7F4EE] hover:bg-[#EFE9DD] text-[#1F3B2C] text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-[#EFE9DD] cursor-pointer"
                            >
                              📦 Pack
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateOrderStatus(order._id || order.orderId, 'shipped')}
                              className="bg-[#F7F4EE] hover:bg-[#EFE9DD] text-[#1F3B2C] text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-[#EFE9DD] cursor-pointer"
                            >
                              🚚 Ship
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateOrderStatus(order._id || order.orderId, 'delivered')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                              🏡 Delivered
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(order._id || order.orderId)}
                              className="bg-red-50 hover:bg-red-100 text-[#B3452F] p-1.5 rounded-lg border border-red-200 cursor-pointer"
                              title="Delete Order Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Customer & Address Details */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs text-[#6B6B63]">
                          <div className="md:col-span-5 bg-[#F7F4EE] p-3 rounded-xl border border-[#EFE9DD]">
                            <span className="text-[10px] font-bold text-[#7A9B76] uppercase tracking-wider block mb-1">Customer & Destination</span>
                            <p className="font-bold text-[#1F3B2C]">{order.customerName || order.user?.name || order.shippingAddress?.name || 'Customer'}</p>
                            <p>Phone: <strong className="text-[#1F3B2C]">{order.shippingAddress?.phone || '+91 9876543210'}</strong></p>
                            <p>Address: {formatAddress(order.shippingAddress)}</p>
                          </div>

                          {/* Logistics & Tracking Input Forms */}
                          <div className="md:col-span-7 bg-[#F7F4EE] p-3 rounded-xl border border-[#EFE9DD] space-y-2">
                            <span className="text-[10px] font-bold text-[#7A9B76] uppercase tracking-wider block">Logistics & Tracking Details</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-semibold text-[#6B6B63] block">Courier Partner</label>
                                <input
                                  type="text"
                                  placeholder="e.g. BlueDart / Delhivery"
                                  defaultValue={order.courierPartner || 'FloraVision Express'}
                                  onBlur={(e) => {
                                    handleUpdateOrderStatus(order._id || order.orderId, curStatus, order.trackingNumber, e.target.value);
                                  }}
                                  className="w-full bg-white border border-[#EFE9DD] rounded-lg p-1.5 text-xs text-[#1C1C1A]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-semibold text-[#6B6B63] block">Tracking Code</label>
                                <input
                                  type="text"
                                  placeholder="e.g. TRK-FLORA-981023"
                                  defaultValue={order.trackingNumber || `TRK-FLORA-${Math.floor(100000 + Math.random() * 900000)}`}
                                  onBlur={(e) => {
                                    handleUpdateOrderStatus(order._id || order.orderId, curStatus, e.target.value, order.courierPartner);
                                  }}
                                  className="w-full bg-white border border-[#EFE9DD] rounded-lg p-1.5 text-xs text-[#1C1C1A] font-mono"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <select
                                value={curStatus}
                                onChange={(e) => handleUpdateOrderStatus(order._id || order.orderId, e.target.value)}
                                className="bg-white border border-[#EFE9DD] text-xs font-bold text-[#1F3B2C] rounded-lg p-1.5 focus:outline-none cursor-pointer flex-1"
                              >
                                <option value="placed">1. Placed & Confirmed</option>
                                <option value="processing">2. Nursery Inspection</option>
                                <option value="packed">3. Eco-Vented Packed</option>
                                <option value="shipped">4. Shipped & In Transit</option>
                                <option value="out_for_delivery">5. Out for Delivery</option>
                                <option value="delivered">6. Delivered</option>
                                <option value="cancelled">7. Cancelled</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Order Items & Total */}
                        <div className="pt-2 border-t border-[#EFE9DD] flex flex-wrap justify-between items-center text-xs">
                          <span className="text-[#6B6B63]">
                            Items: <strong className="text-[#1F3B2C]">{order.items ? order.items.map(i => `${i.name} (x${i.qty || i.quantity || 1})`).join(', ') : 'Plant Package'}</strong>
                          </span>
                          <span className="font-bold text-[#1F3B2C] text-sm">Total Paid: <span className="text-[#C96F4A]">₹{order.total || order.totalAmount || 400}</span> ({order.paymentMethod || 'COD'})</span>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-[#1F3B2C]">Active & Expired Promo Coupons</h3>
                <button
                  onClick={() => setIsAddCouponOpen(true)}
                  className="btn-primary-terracotta text-xs py-2 px-4 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" /> Create Coupon
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#EFE9DD] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F4EE] text-[#1F3B2C] font-serif font-bold border-b border-[#EFE9DD]">
                    <tr>
                      <th className="p-3.5">Coupon Code</th>
                      <th className="p-3.5">Discount</th>
                      <th className="p-3.5">Min Order Value</th>
                      <th className="p-3.5">Times Used</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD]">
                    {couponsList.map((c) => (
                      <tr key={c.id}>
                        <td className="p-3.5 font-bold font-mono text-[#1F3B2C]">{c.code}</td>
                        <td className="p-3.5 font-semibold text-[#C96F4A]">
                          {c.discountType === 'percent' ? `${c.value}% OFF` : `₹${c.value} FLAT`}
                        </td>
                        <td className="p-3.5 text-[#6B6B63]">₹{c.minOrderValue}</td>
                        <td className="p-3.5 text-[#1F3B2C] font-bold">{c.usedCount} times</td>
                        <td className="p-3.5">
                          <span className="bg-[#4C8055]/15 text-[#4C8055] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#1F3B2C]">Registered Store Customers</h3>
              <div className="bg-white rounded-2xl border border-[#EFE9DD] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F4EE] text-[#1F3B2C] font-serif font-bold border-b border-[#EFE9DD]">
                    <tr>
                      <th className="p-3.5">Customer Name</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD]">
                    {usersList.map((u) => (
                      <tr key={u.id}>
                        <td className="p-3.5 font-bold text-[#1F3B2C]">{u.name}</td>
                        <td className="p-3.5 text-[#6B6B63]">{u.email}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === 'admin' ? 'bg-[#C96F4A] text-white' : 'bg-[#7A9B76]/20 text-[#1F3B2C]'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add New Product Modal */}
      {isAddPlantOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddPlantSubmit} className="bg-white border border-[#EFE9DD] w-full max-w-lg rounded-3xl p-6 shadow-2xl text-[#1C1C1A] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1F3B2C]">Add New Plant to Store Catalog</h3>
              <button type="button" onClick={() => setIsAddPlantOpen(false)} className="text-[#6B6B63] hover:text-[#1F3B2C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="font-bold text-[#1C1C1A] block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ficus Lyrata Violin Fig"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Category</label>
                <select
                  value={newPlant.categoryName}
                  onChange={(e) => setNewPlant({ ...newPlant, categoryName: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                >
                  <option value="Indoor Plants">Indoor Plants</option>
                  <option value="Outdoor Plants">Outdoor Plants</option>
                  <option value="Succulents & Cacti">Succulents & Cacti</option>
                  <option value="Air Purifying">Air Purifying</option>
                  <option value="Pots & Planters">Pots & Planters</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Regular Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1499"
                  value={newPlant.price}
                  onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#1C1C1A] block">Offer Price (₹)</label>
                  {Number(newPlant.price) > Number(newPlant.discountPrice) && Number(newPlant.discountPrice) > 0 && (
                    <span className="text-[10px] font-bold text-[#B3452F] bg-[#B3452F]/10 px-1.5 py-0.5 rounded">
                      -{Math.round(((Number(newPlant.price) - Number(newPlant.discountPrice)) / Number(newPlant.price)) * 100)}% OFF
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  placeholder="e.g. 1199 (Optional Offer)"
                  value={newPlant.discountPrice}
                  onChange={(e) => setNewPlant({ ...newPlant, discountPrice: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Offer Tag / Badge</label>
                <select
                  value={newPlant.promoTag}
                  onChange={(e) => setNewPlant({ ...newPlant, promoTag: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                >
                  <option value="Special Deal">Special Deal 🔥</option>
                  <option value="Best Seller">Best Seller ⭐</option>
                  <option value="Limited Stock">Limited Stock ⏳</option>
                  <option value="Summer Sale">Summer Sale ☀️</option>
                  <option value="20% OFF">20% OFF Deal 🏷️</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="20"
                  value={newPlant.stock}
                  onChange={(e) => setNewPlant({ ...newPlant, stock: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Sunlight Need</label>
                <select
                  value={newPlant.light}
                  onChange={(e) => setNewPlant({ ...newPlant, light: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                >
                  <option value="Bright Indirect">Bright Indirect</option>
                  <option value="Low Light">Low Light</option>
                  <option value="Full Sun">Full Sun</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Water Schedule</label>
                <select
                  value={newPlant.water}
                  onChange={(e) => setNewPlant({ ...newPlant, water: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Every 2 Weeks">Every 2 Weeks</option>
                  <option value="Keep Moist">Keep Soil Moist</option>
                </select>
              </div>

              <div className="col-span-2 flex flex-wrap gap-4 pt-1 pb-1 bg-[#F7F4EE] p-3 rounded-xl border border-[#EFE9DD]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                  <input
                    type="checkbox"
                    checked={newPlant.isFeatured}
                    onChange={(e) => setNewPlant({ ...newPlant, isFeatured: e.target.checked })}
                    className="accent-[#1F3B2C] w-4 h-4 rounded"
                  />
                  <span>Show in Bestsellers</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                  <input
                    type="checkbox"
                    checked={newPlant.petFriendly}
                    onChange={(e) => setNewPlant({ ...newPlant, petFriendly: e.target.checked })}
                    className="accent-[#1F3B2C] w-4 h-4 rounded"
                  />
                  <span>Pet Friendly 🐶</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1C1A]">
                  <input
                    type="checkbox"
                    checked={newPlant.airPurifying}
                    onChange={(e) => setNewPlant({ ...newPlant, airPurifying: e.target.checked })}
                    className="accent-[#1F3B2C] w-4 h-4 rounded"
                  />
                  <span>Air Purifying 🌿</span>
                </label>
              </div>

              <div className="col-span-2 space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#1C1C1A] block">Product Image</label>
                  <label className="text-[11px] font-bold text-[#C96F4A] hover:underline cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-[#C96F4A]" />
                    <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image File'}</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Paste Image URL or click 'Upload Image File' above"
                  value={newPlant.image}
                  onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                />
                {newPlant.image && (
                  <div className="flex items-center gap-2 pt-1">
                    <img src={newPlant.image} alt="Preview" className="w-10 h-10 rounded-lg object-cover bg-[#EFE9DD] border border-[#EFE9DD]" />
                    <span className="text-[10px] text-[#4C8055] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4C8055]" /> Cloudinary / Image Ready
                    </span>
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label className="font-bold text-[#1C1C1A] block mb-1">Description & Key Highlights</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Rare tropical indoor plant with glossy dark leaves. Easy to maintain."
                  value={newPlant.description}
                  onChange={(e) => setNewPlant({ ...newPlant, description: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs text-[#1C1C1A]"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-[#EFE9DD]">
              <button
                type="button"
                onClick={() => setIsAddPlantOpen(false)}
                className="px-4 py-2 text-xs text-[#6B6B63]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary-terracotta text-xs py-2 px-5 cursor-pointer"
              >
                Publish Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Coupon Modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddCouponSubmit} className="bg-white border border-[#EFE9DD] w-full max-w-md rounded-3xl p-6 shadow-2xl text-[#1C1C1A] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1F3B2C]">Create Promo Coupon</h3>
              <button type="button" onClick={() => setIsAddCouponOpen(false)} className="text-[#6B6B63]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1C1C1A] block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1C1C1A] block mb-1">Discount Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                    className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#1C1C1A] block mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                    className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-[#EFE9DD]">
              <button
                type="button"
                onClick={() => setIsAddCouponOpen(false)}
                className="px-4 py-2 text-xs text-[#6B6B63]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary-terracotta text-xs py-2 px-5 cursor-pointer"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Order Details & Shipping Label Modal */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F7F4EE] border border-[#EFE9DD] w-full max-w-2xl rounded-3xl p-6 shadow-2xl text-[#1C1C1A] space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1F3B2C]">
                  Order #{selectedOrderForModal.orderNumber || selectedOrderForModal.orderId || selectedOrderForModal._id}
                </h3>
                <p className="text-xs text-[#6B6B63]">Detailed Inspection & Shipping Label Generator</p>
              </div>
              <button type="button" onClick={() => setSelectedOrderForModal(null)} className="text-[#6B6B63] hover:text-[#1F3B2C] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Shipping Label Box */}
            <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-[#1F3B2C] text-xs space-y-3 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#EFE9DD] pb-2">
                <span className="font-serif font-bold text-sm text-[#1F3B2C]">FloraVision Botanical Nursery</span>
                <span className="font-mono text-[10px] bg-[#EFE9DD] px-2 py-0.5 rounded text-[#1F3B2C] font-bold">SHIPMENT LABEL</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#7A9B76] uppercase">DELIVER TO:</span>
                  <p className="font-bold text-[#1F3B2C] text-sm">{selectedOrderForModal.customerName || selectedOrderForModal.user?.name || selectedOrderForModal.shippingAddress?.name || 'Customer'}</p>
                  <p className="text-[#6B6B63]">{formatAddress(selectedOrderForModal.shippingAddress)}</p>
                  <p className="font-semibold text-[#1F3B2C] pt-1">Phone: {selectedOrderForModal.shippingAddress?.phone || '+91 98765 43210'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#7A9B76] uppercase">LOGISTICS INFO:</span>
                  <p>Courier: <strong>{selectedOrderForModal.courierPartner || 'FloraVision Express'}</strong></p>
                  <p className="font-mono">AWB: <strong>{selectedOrderForModal.trackingNumber || `TRK-FLORA-${Math.floor(100000 + Math.random() * 900000)}`}</strong></p>
                  <p>Payment: <strong>{(selectedOrderForModal.paymentMethod || 'COD').toUpperCase()} (₹{selectedOrderForModal.totalAmount || selectedOrderForModal.total})</strong></p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EFE9DD]">
                <span className="text-[10px] font-bold text-[#7A9B76] uppercase block mb-1">PACKED ITEMS:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#1F3B2C]">
                  {selectedOrderForModal.items && selectedOrderForModal.items.map((it, i) => (
                    <li key={i}>{it.name} — Qty: {it.qty || it.quantity || 1} ({it.variant || 'Standard'})</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-1/2 bg-[#1F3B2C] hover:bg-[#2D543F] text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#C96F4A]" /> Print Shipping Label
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrderForModal(null)}
                className="w-1/2 bg-white border border-[#EFE9DD] text-[#1F3B2C] font-semibold text-xs py-3 rounded-xl cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
