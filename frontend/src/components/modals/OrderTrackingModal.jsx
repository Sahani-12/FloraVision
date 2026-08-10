import React, { useState, useEffect } from 'react';
import {
  X, Search, CheckCircle2, Clock, Truck, Package, Home, ShieldCheck,
  MapPin, Phone, Copy, Check, Printer, FileText, ChevronRight, AlertCircle, RefreshCw, Leaf
} from 'lucide-react';
import { orderService } from '../../services/api';

export default function OrderTrackingModal({
  isOpen,
  onClose,
  initialOrderId = '',
  currentUser
}) {
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [loading, setLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [myOrdersList, setMyOrdersList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'history'

  useEffect(() => {
    if (isOpen) {
      if (initialOrderId) {
        setSearchQuery(initialOrderId);
        fetchSingleOrder(initialOrderId);
      } else if (currentUser) {
        fetchUserOrders();
      }
    }
  }, [isOpen, initialOrderId, currentUser]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const userId = currentUser ? (currentUser.id || currentUser._id || currentUser.email) : null;
      if (!userId) {
        setMyOrdersList([]);
        setActiveOrder(null);
        setLoading(false);
        return;
      }
      const res = await orderService.getOrders(userId);
      if (res && res.length > 0) {
        setMyOrdersList(res);
        if (!initialOrderId) {
          setActiveOrder(res[0]);
        }
      } else {
        setMyOrdersList([]);
        setActiveOrder(null);
      }
    } catch {
      setMyOrdersList([]);
      setActiveOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleOrder = async (queryStr) => {
    if (!queryStr) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const clean = queryStr.trim();
      let foundOrder = null;

      // 1. Try Backend HTTP API
      try {
        const res = await fetch(`http://localhost:5000/api/orders/track/${encodeURIComponent(clean)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            foundOrder = data.order;
          }
        }
      } catch {
        // Silent fallback to local storage
      }

      // 2. Search local storage orders if backend not reachable or returned null
      if (!foundOrder) {
        const saved = localStorage.getItem('flora_orders');
        if (saved) {
          const list = JSON.parse(saved);
          foundOrder = list.find(o => 
            (o.orderId || o.orderNumber || o._id) === clean ||
            (o.shippingAddress && (o.shippingAddress.phone === clean || o.shippingAddress.phone?.includes(clean)))
          );
        }
      }

      if (foundOrder) {
        setActiveOrder(foundOrder);
        setActiveTab('tracker');
      } else {
        setErrorMsg('No matching order found for this Order ID or Mobile Number.');
      }
    } catch {
      setErrorMsg('No matching order found. Please verify your Order ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      fetchSingleOrder(searchQuery);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  // Lifecycle Steps Pipeline
  const lifecycleSteps = [
    { key: 'placed', title: 'Order Placed', desc: 'Order & payment confirmed', icon: CheckCircle2 },
    { key: 'processing', title: 'Nursery Check', desc: 'Health inspection & watering', icon: Leaf },
    { key: 'packed', title: 'Eco-Vented Packed', desc: 'Breathable boxing with hydration', icon: Package },
    { key: 'shipped', title: 'Shipped & In Transit', desc: 'Handed over to Express Courier', icon: Truck },
    { key: 'out_for_delivery', title: 'Out For Delivery', desc: 'Local delivery agent assigned today', icon: MapPin },
    { key: 'delivered', title: 'Delivered', desc: 'Handed safely to customer', icon: Home }
  ];

  const getStepStatus = (stepKey, currentOrderStatus) => {
    const orderRanks = {
      placed: 1,
      processing: 2,
      packed: 3,
      shipped: 4,
      out_for_delivery: 5,
      delivered: 6,
      cancelled: 0
    };
    const currentRank = orderRanks[currentOrderStatus || 'placed'] || 1;
    const stepRank = orderRanks[stepKey] || 1;

    if (currentOrderStatus === 'cancelled') return 'cancelled';
    if (stepRank < currentRank) return 'completed';
    if (stepRank === currentRank) return 'active';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-[#1C1C1A]">
      <div className="bg-[#F7F4EE] border border-[#EFE9DD] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#1F3B2C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#7A9B76]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C96F4A] flex items-center justify-center text-white shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                Live Order Tracker & History
              </h3>
              <p className="text-xs text-[#7A9B76]">
                Track nursery inspection, packaging, transit, and doorstep delivery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Search Bar Strip */}
        <div className="bg-[#EFE9DD] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#EFE9DD]">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white/60 p-1 rounded-2xl border border-[#EFE9DD] w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-initial ${
                activeTab === 'tracker'
                  ? 'bg-[#1F3B2C] text-white shadow-sm'
                  : 'text-[#6B6B63] hover:text-[#1F3B2C]'
              }`}
            >
              Live Order Status
            </button>
            {currentUser && (
              <button
                onClick={() => {
                  setActiveTab('history');
                  fetchUserOrders();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-initial ${
                  activeTab === 'history'
                    ? 'bg-[#1F3B2C] text-white shadow-sm'
                    : 'text-[#6B6B63] hover:text-[#1F3B2C]'
                }`}
              >
                My Orders History ({myOrdersList.length})
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                placeholder="Enter Order ID or Mobile No."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#EFE9DD] focus:outline-none focus:border-[#7A9B76] text-[#1C1C1A]"
              />
              <Search className="w-4 h-4 text-[#6B6B63] absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C96F4A] hover:bg-[#B55D39] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Track'}
            </button>
          </form>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {errorMsg && (
            <div className="bg-red-50 text-[#B3452F] p-4 rounded-2xl border border-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'history' ? (
            /* Orders History Grid */
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#1F3B2C]">Your Past Orders</h4>
              {myOrdersList.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-[#EFE9DD]">
                  <Package className="w-10 h-10 text-[#7A9B76] mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-[#6B6B63]">No past orders found for this account.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {myOrdersList.map((ord) => {
                    const idStr = ord.orderNumber || ord.orderId || ord._id;
                    const itemsCount = ord.items ? ord.items.reduce((sum, i) => sum + (i.qty || i.quantity || 1), 0) : 0;
                    return (
                      <div
                        key={ord._id || ord.orderId || Math.random()}
                        onClick={() => {
                          setActiveOrder(ord);
                          setActiveTab('tracker');
                        }}
                        className="bg-white p-4 rounded-2xl border border-[#EFE9DD] hover:border-[#7A9B76] transition-all cursor-pointer flex flex-wrap items-center justify-between gap-4 shadow-xs hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#EFE9DD] overflow-hidden shrink-0 border border-[#EFE9DD]">
                            <img
                              src={ord.items && ord.items[0] ? (ord.items[0].image || ord.items[0].img) : 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=150&q=80'}
                              alt="Plant"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#1F3B2C]">{idStr}</span>
                            <p className="text-[11px] text-[#6B6B63]">{itemsCount} Plant(s) • ₹{ord.totalAmount || ord.total}</p>
                            <span className="text-[10px] text-[#6B6B63]">{new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                            ord.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            ord.orderStatus === 'shipped' || ord.orderStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {(ord.orderStatus || ord.status || 'Placed').toUpperCase()}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#6B6B63]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeOrder ? (
            /* Live Order Tracker Detail View */
            <div className="space-y-6">
              
              {/* Order Meta Header Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A9B76]">ORDER NUMBER</span>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-serif font-bold text-[#1F3B2C]">
                      {activeOrder.orderNumber || activeOrder.orderId || activeOrder._id}
                    </h4>
                    <button
                      onClick={() => copyToClipboard(activeOrder.orderNumber || activeOrder.orderId || activeOrder._id)}
                      className="text-[#6B6B63] hover:text-[#1F3B2C] text-xs cursor-pointer flex items-center gap-1 bg-[#F7F4EE] px-2 py-1 rounded-md border border-[#EFE9DD]"
                      title="Copy Order ID"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-xs text-[#6B6B63] mt-0.5">
                    Placed on: {new Date(activeOrder.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B6B63]">Courier Partner:</span>
                    <span className="text-xs font-bold text-[#1F3B2C]">{activeOrder.courierPartner || 'FloraVision Express Logistics'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B6B63]">Tracking Code:</span>
                    <span className="text-xs font-mono font-bold text-[#C96F4A]">{activeOrder.trackingNumber || `TRK-FLORA-${Math.floor(100000 + Math.random() * 900000)}`}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200 mt-1">
                    Est. Delivery: {new Date(activeOrder.estimatedDeliveryDate || Date.now() + 3*86400000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>

              {/* 5-Stage Visual Lifecycle Progress Stepper */}
              <div className="bg-white p-6 rounded-2xl border border-[#EFE9DD] shadow-xs space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3B2C] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C96F4A]" /> Order Lifecycle Progress
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
                  {lifecycleSteps.map((step, idx) => {
                    const status = getStepStatus(step.key, activeOrder.orderStatus || activeOrder.status);
                    const StepIcon = step.icon;

                    return (
                      <div
                        key={step.key}
                        className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                          status === 'completed'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : status === 'active'
                            ? 'bg-[#1F3B2C] text-white border-[#1F3B2C] shadow-md scale-105 ring-4 ring-[#7A9B76]/20'
                            : status === 'cancelled'
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : 'bg-[#F7F4EE]/60 border-[#EFE9DD] text-[#6B6B63]'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : status === 'active'
                            ? 'bg-[#C96F4A] text-white animate-bounce'
                            : 'bg-black/10 text-[#6B6B63]'
                        }`}>
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold leading-tight">{step.title}</span>
                        <span className={`text-[9px] mt-1 ${status === 'active' ? 'text-white/80' : 'text-[#6B6B63]'}`}>{step.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Timeline History Logs */}
              <div className="bg-white p-6 rounded-2xl border border-[#EFE9DD] shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3B2C] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C96F4A]" /> Live Activity Log
                </h4>

                <div className="space-y-3 pl-2 border-l-2 border-[#7A9B76]/30">
                  {activeOrder.trackingHistory && activeOrder.trackingHistory.length > 0 ? (
                    activeOrder.trackingHistory.map((hist, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute -left-[17px] top-1 w-3 h-3 rounded-full bg-[#1F3B2C] border-2 border-white" />
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#1F3B2C]">
                            {(hist.status || 'Status Event').toUpperCase()}: {hist.comment || hist.status}
                          </span>
                          <span className="text-[10px] text-[#6B6B63]">
                            {new Date(hist.date || Date.now()).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B6B63] mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C96F4A]" /> {hist.location || 'FloraVision Nursery Hub'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="pl-6 text-xs text-[#6B6B63]">
                      Order confirmed. Nursery packing initiated.
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items & Shipping Address Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Order Items */}
                <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3B2C]">Purchased Plants</h4>
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {activeOrder.items && activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F7F4EE] border border-[#EFE9DD]">
                        <img
                          src={item.image || item.img || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=150&q=80'}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-white"
                        />
                        <div className="flex-1">
                          <h5 className="text-xs font-bold text-[#1F3B2C] line-clamp-1">{item.name}</h5>
                          <span className="text-[10px] text-[#6B6B63]">Qty: {item.qty || item.quantity || 1} • {item.variant || item.size || 'Standard'}</span>
                        </div>
                        <span className="text-xs font-bold text-[#1F3B2C]">₹{(item.price || 0) * (item.qty || item.quantity || 1)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#EFE9DD] flex justify-between items-center text-xs font-bold text-[#1F3B2C]">
                    <span>Total Amount Paid ({activeOrder.paymentMethod || 'COD'}):</span>
                    <span className="text-sm text-[#C96F4A]">₹{activeOrder.totalAmount || activeOrder.total}</span>
                  </div>
                </div>

                {/* Shipping Address & Actions */}
                <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-[#EFE9DD] shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3B2C] flex items-center gap-1.5 mb-2">
                      <MapPin className="w-4 h-4 text-[#C96F4A]" /> Delivery Destination
                    </h4>
                    {typeof activeOrder.shippingAddress === 'object' ? (
                      <div className="text-xs text-[#6B6B63] space-y-1">
                        <p className="font-bold text-[#1F3B2C]">{activeOrder.shippingAddress.name}</p>
                        <p>{activeOrder.shippingAddress.addressLine || activeOrder.shippingAddress.address}</p>
                        <p>{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pincode}</p>
                        <p className="text-[#1F3B2C] font-semibold flex items-center gap-1 pt-1">
                          <Phone className="w-3 h-3 text-[#C96F4A]" /> {activeOrder.shippingAddress.phone}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#6B6B63]">{activeOrder.shippingAddress || 'Address on file'}</p>
                    )}
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full bg-[#1F3B2C] hover:bg-[#2D543F] text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Printer className="w-4 h-4 text-[#C96F4A]" /> Print Official Invoice
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* No Order Selected View */
            <div className="bg-white p-12 rounded-2xl text-center border border-[#EFE9DD] space-y-3">
              <Search className="w-12 h-12 text-[#7A9B76] mx-auto opacity-50" />
              <h4 className="text-base font-bold text-[#1F3B2C]">Track Your FloraVision Plant Shipment</h4>
              <p className="text-xs text-[#6B6B63] max-w-sm mx-auto">
                Enter your <strong>Order ID</strong> (e.g. FV-2026-981023) or registered <strong>Mobile Number</strong> in the search bar above to see live nursery dispatch progress.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
