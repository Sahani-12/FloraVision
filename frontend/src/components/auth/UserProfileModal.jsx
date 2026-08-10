import React, { useState, useEffect } from 'react';
import { X, Package, MapPin, Heart, User, Key, LogOut, CheckCircle2, FileText, Truck, ShieldCheck } from 'lucide-react';
import { orderService, authService } from '../../services/api';

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

export default function UserProfileModal({ isOpen, onClose, user, onLogout, onOpenOrderTracking }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'addresses' | 'profile'
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // Profile Form State
  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'customer@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        const uId = user.id || user._id || user.email;
        const res = await orderService.getOrders(uId);
        if (res && Array.isArray(res)) {
          const filtered = res.filter(ord => {
            const matchesId = ord.userId === uId || ord.user?._id === uId || ord.user === uId;
            const matchesEmail = user.email && (ord.customerEmail === user.email || ord.user?.email === user.email);
            return matchesId || matchesEmail;
          });
          setOrders(filtered);
        } else {
          setOrders([]);
        }
      }
    };
    if (isOpen) fetchUserOrders();
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email, phone };
    localStorage.setItem('flora_user', JSON.stringify(updatedUser));
    setProfileMsg('Profile settings updated successfully!');
    setTimeout(() => setProfileMsg(''), 3000);
  };

  const handleDownloadInvoice = (ordId) => {
    alert(`Downloading Invoice for Order #${ordId}...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#F7F4EE] rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative border border-[#EFE9DD] overflow-y-auto max-h-[90vh] my-4 animate-in fade-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-[#1F3B2C] hover:bg-[#1F3B2C] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-[#EFE9DD]">
          <div className="w-16 h-16 rounded-full bg-[#1F3B2C] text-[#C96F4A] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#7A9B76]">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">{user.name}</h3>
              {user.role === 'admin' && (
                <span className="bg-[#C96F4A] text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full inline-block">
                  Store Admin
                </span>
              )}
            </div>
            <p className="text-xs text-[#6B6B63] mt-0.5">{user.email} • {user.phone || '+91 98765 43210'}</p>
            <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#4C8055] bg-[#4C8055]/15 px-3 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Botanical Member
            </span>
          </div>

          <button
            onClick={() => {
              authService.logout();
              onLogout && onLogout();
              onClose();
            }}
            className="px-4 py-2 bg-[#B3452F]/15 hover:bg-[#B3452F] text-[#B3452F] hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Account Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          
          {/* Navigation Sidebar */}
          <div className="md:col-span-4 bg-white p-3 rounded-2xl border border-[#EFE9DD] space-y-1">
            {[
              { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'profile', label: 'Profile & Password', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1F3B2C] text-white shadow-xs'
                      : 'text-[#6B6B63] hover:bg-[#F7F4EE] hover:text-[#1F3B2C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      activeTab === tab.id ? 'bg-[#C96F4A] text-white' : 'bg-[#EFE9DD] text-[#1F3B2C]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="md:col-span-8">
            
            {/* 1. MY ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl text-center border border-[#EFE9DD] text-[#6B6B63]">
                    <Package className="w-12 h-12 stroke-1 mx-auto mb-2 text-[#7A9B76]" />
                    <p className="font-serif font-bold text-base text-[#1F3B2C]">No Order History Yet</p>
                    <p className="text-xs mt-1">Place your first plant order to track its delivery timeline here.</p>
                  </div>
                ) : (
                  orders.map((ord) => {
                    const isExpanded = expandedOrderId === (ord.orderId || ord._id);
                    return (
                      <div key={ord.orderId || ord._id} className="bg-white p-5 rounded-2xl border border-[#EFE9DD] space-y-3 shadow-xs">
                        <div className="flex flex-wrap items-center justify-between text-xs gap-2 pb-2 border-b border-[#EFE9DD]">
                          <div>
                            <span className="font-serif font-bold text-[#1F3B2C] text-sm">{ord.orderId || `ORD-${ord._id.substring(0, 6)}`}</span>
                            <span className="text-[#6B6B63] ml-2">• {ord.date || 'Aug 05, 2026'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-[#4C8055]/15 text-[#4C8055]'
                                : 'bg-[#C9A24B]/20 text-[#1F3B2C]'
                            }`}>
                              {ord.status || 'Placed'}
                            </span>
                          </div>
                        </div>

                        {/* Items Thumbnail Preview */}
                        <div className="space-y-2">
                          {ord.items && ord.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-[#EFE9DD]"
                                />
                                <div>
                                  <h5 className="font-semibold text-[#1F3B2C]">{item.name}</h5>
                                  <span className="text-[11px] text-[#6B6B63]">Qty: {item.quantity || item.qty || 1}</span>
                                </div>
                              </div>
                              <span className="font-bold text-[#1F3B2C]">₹{(item.price || 400) * (item.quantity || item.qty || 1)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Order Timeline Visual Stepper */}
                        {isExpanded && (
                          <div className="pt-3 border-t border-[#EFE9DD] space-y-3 bg-[#F7F4EE] p-4 rounded-xl">
                            <h6 className="font-serif font-bold text-xs text-[#1F3B2C]">Delivery Tracking Timeline</h6>
                            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                              <div className="bg-[#4C8055] text-white py-1 rounded-full">1. Placed</div>
                              <div className="bg-[#4C8055] text-white py-1 rounded-full">2. Packed</div>
                              <div className="bg-[#C9A24B] text-black py-1 rounded-full">3. Shipped</div>
                              <div className="bg-[#EFE9DD] text-[#6B6B63] py-1 rounded-full">4. Delivered</div>
                            </div>
                            <p className="text-[11px] text-[#6B6B63] pt-1">
                              Shipping Address: <strong>{formatAddress(ord.shippingAddress)}</strong>
                            </p>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#EFE9DD] flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              const targetId = ord.orderNumber || ord.orderId || ord._id;
                              if (onOpenOrderTracking) {
                                onOpenOrderTracking(targetId);
                                onClose();
                              } else {
                                setExpandedOrderId(isExpanded ? null : (ord.orderId || ord._id));
                              }
                            }}
                            className="bg-[#C96F4A] hover:bg-[#B55D39] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                          >
                            <Truck className="w-3.5 h-3.5" /> Track Live Status
                          </button>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDownloadInvoice(ord.orderId || '123456')}
                              className="text-[#1F3B2C] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#7A9B76]" /> Invoice
                            </button>
                            <span className="font-bold text-sm text-[#1F3B2C]">Total: ₹{ord.total || ord.totalAmount || 400}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* 2. SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#1F3B2C] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C96F4A]" /> Primary Delivery Address
                    </span>
                    <span className="bg-[#4C8055]/15 text-[#4C8055] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B63] leading-relaxed">
                    Flat 302, Lotus Heights, Bandra West, Mumbai, Maharashtra - 400050
                  </p>
                  <p className="text-xs font-semibold text-[#1F3B2C]">Contact Phone: +91 98765 43210</p>
                </div>
              </div>
            )}

            {/* 3. PROFILE & PASSWORD TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-2xl border border-[#EFE9DD] space-y-4">
                {profileMsg && (
                  <div className="p-3 bg-[#4C8055]/15 text-[#4C8055] text-xs font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {profileMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1A]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary-terracotta text-xs py-3 px-6 cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
