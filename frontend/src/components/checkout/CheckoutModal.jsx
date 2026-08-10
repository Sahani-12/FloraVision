import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, QrCode, CreditCard, Truck, ArrowRight, Landmark, MapPin, Wallet, Sparkles, Check } from 'lucide-react';
import { orderService } from '../../services/api';

export default function CheckoutModal({ isOpen, onClose, cartItems, checkoutDetails, currentUser, onOrderComplete }) {
  // Stepper state: 1: Address, 2: Delivery, 3: Payment, 4: Confirm
  const [step, setStep] = useState(1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [paymentStageText, setPaymentStageText] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);

  // Interactive Payment Form Inputs
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 8912 3456 7890',
    cardHolder: currentUser?.name || 'Aarav Sharma',
    expiry: '08/28',
    cvv: '891'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const addressUserKey = currentUser ? (currentUser.id || currentUser._id || currentUser.email) : 'guest';

  // Address List State
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`flora_addresses_${addressUserKey}`);
    if (saved) {
      setSavedAddresses(JSON.parse(saved));
    } else {
      const defaultAddrs = [
        {
          id: 'addr_1',
          name: currentUser?.name || 'Aarav Sharma',
          phone: currentUser?.phone || '+91 98765 43210',
          addressLine: 'Flat 302, Lotus Heights, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050',
          type: 'Home',
          isDefault: true
        }
      ];
      setSavedAddresses(defaultAddrs);
      localStorage.setItem(`flora_addresses_${addressUserKey}`, JSON.stringify(defaultAddrs));
    }
  }, [addressUserKey, currentUser]);

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home'
  });

  if (!isOpen || cartItems.length === 0) return null;

  const subtotal = checkoutDetails?.subtotal || cartItems.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const discountVal = checkoutDetails?.discountVal || 0;
  const shippingFee = checkoutDetails?.shippingFee !== undefined ? checkoutDetails.shippingFee : (subtotal >= 999 ? 0 : 99);
  const grandTotal = checkoutDetails?.grandTotal || Math.max(0, subtotal - discountVal + shippingFee);

  const activeAddress = savedAddresses[selectedAddressIndex] || savedAddresses[0] || {
    name: currentUser?.name || 'Customer',
    phone: currentUser?.phone || '+91 9876543210',
    addressLine: '123 Green Valley',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001'
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (newAddress.name && newAddress.addressLine && newAddress.pincode) {
      const created = { id: `addr_${Date.now()}`, ...newAddress };
      const updatedList = [...savedAddresses, created];
      setSavedAddresses(updatedList);
      localStorage.setItem(`flora_addresses_${addressUserKey}`, JSON.stringify(updatedList));
      setSelectedAddressIndex(savedAddresses.length);
      setShowAddAddress(false);
      setNewAddress({ name: '', phone: '', addressLine: '', city: '', state: '', pincode: '', type: 'Home' });
    }
  };

  const handleFinalOrderSubmit = async () => {
    setLoading(true);
    setPaymentStageText('🔒 Connecting to 256-Bit Encrypted Payment Gateway...');
    
    setTimeout(() => {
      setPaymentStageText(
        paymentMethod === 'UPI' ? `Verifying VPA (${upiId}) with NPCI...` :
        paymentMethod === 'CARD' ? `Authenticating Card ending in ${cardDetails.cardNumber.slice(-4)}...` :
        paymentMethod === 'NETBANKING' ? `Redirecting to ${selectedBank} Gateway...` :
        'Confirming Cash On Delivery Order Details...'
      );
    }, 700);

    setTimeout(async () => {
      setPaymentStageText('✅ Payment Approved! Dispatched to Nursery...');
      
      const orderUserId = currentUser ? (currentUser.id || currentUser._id || currentUser.email) : 'guest';

      const orderPayload = {
        userId: orderUserId,
        customerName: currentUser?.name || activeAddress?.name || 'Customer',
        customerEmail: currentUser?.email || '',
        items: cartItems,
        subtotal,
        discountAmount: discountVal,
        shippingFee,
        totalAmount: grandTotal,
        shippingAddress: activeAddress,
        paymentMethod: paymentMethod === 'UPI' ? 'UPI' : paymentMethod === 'CARD' ? 'Card' : paymentMethod === 'NETBANKING' ? 'Netbanking' : paymentMethod === 'WALLET' ? 'Wallet' : 'COD',
        paymentStatus: paymentMethod === 'COD' ? 'pending' : 'completed',
        deliveryInstructions
      };

      const res = await orderService.createOrder(orderPayload);
      if (res.success && res.order) {
        setCreatedOrder(res.order);
        setStep(4);
        const ordId = res.order.orderNumber || res.order.orderId || res.order._id;
        onOrderComplete && onOrderComplete(ordId);
      }
      setLoading(false);
      setPaymentStageText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#F7F4EE] rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative border border-[#EFE9DD] animate-in fade-in duration-200 my-4 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        {step !== 4 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-[#1F3B2C] hover:bg-[#1F3B2C] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Stepper Header Bar */}
        {step !== 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#EFE9DD] -translate-y-1/2 z-0" />
              
              {[
                { s: 1, label: 'Address' },
                { s: 2, label: 'Delivery' },
                { s: 3, label: 'Payment' }
              ].map((st) => (
                <div key={st.s} className="relative z-10 flex flex-col items-center gap-1 bg-[#F7F4EE] px-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step === st.s
                      ? 'bg-[#C96F4A] text-white ring-4 ring-[#C96F4A]/20 scale-110'
                      : step > st.s
                      ? 'bg-[#4C8055] text-white'
                      : 'bg-[#EFE9DD] text-[#6B6B63]'
                  }`}>
                    {step > st.s ? <Check className="w-4 h-4" /> : st.s}
                  </div>
                  <span className="text-[11px] font-bold text-[#1F3B2C]">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Checkout Step Area */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: ADDRESS SELECTION */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">Select Shipping Address</h3>
                  <p className="text-xs text-[#6B6B63] mt-1">Choose where you want your nursery plants delivered.</p>
                </div>

                {/* Saved Address Cards */}
                <div className="space-y-3">
                  {savedAddresses.map((addr, idx) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressIndex(idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddressIndex === idx
                          ? 'border-[#C96F4A] bg-white shadow-md ring-2 ring-[#C96F4A]/20'
                          : 'border-[#EFE9DD] bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm text-[#1F3B2C]">{addr.name}</span>
                          <span className="bg-[#7A9B76]/20 text-[#1F3B2C] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {addr.type}
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressIndex === idx}
                          onChange={() => setSelectedAddressIndex(idx)}
                          className="w-4 h-4 accent-[#C96F4A] cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-[#6B6B63] mt-1">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <span className="text-[11px] text-[#6B6B63] mt-1 block">Phone: {addr.phone}</span>
                    </div>
                  ))}
                </div>

                {/* Add New Address Accordion/Form */}
                {!showAddAddress ? (
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="w-full py-3 bg-white border border-dashed border-[#7A9B76] text-[#1F3B2C] font-semibold text-xs rounded-2xl hover:bg-[#7A9B76]/10 transition-colors cursor-pointer"
                  >
                    + Add New Delivery Address
                  </button>
                ) : (
                  <form onSubmit={handleAddNewAddress} className="bg-white p-5 rounded-2xl border border-[#EFE9DD] space-y-3">
                    <h4 className="font-serif font-bold text-sm text-[#1F3B2C]">New Address Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        required
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Address / House / Flat No."
                      required
                      value={newAddress.addressLine}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                      className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        required
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-2 text-xs text-[#6B6B63]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-secondary-forest text-xs py-2 px-4 cursor-pointer"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full btn-primary-terracotta text-sm py-4 cursor-pointer"
                >
                  <span>Continue to Delivery Options</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            {/* STEP 2: DELIVERY OPTIONS */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">Delivery Estimate & Instructions</h3>
                  <p className="text-xs text-[#6B6B63] mt-1">Specialized plant transport box delivery.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] space-y-3">
                  <div className="flex items-center gap-3 text-[#4C8055]">
                    <Truck className="w-6 h-6 shrink-0" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#1F3B2C]">Express Plant Delivery</h4>
                      <p className="text-xs text-[#6B6B63]">Estimated Arrival: <strong className="text-[#1F3B2C]">Tuesday, Aug 12</strong></p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1C1C1A] uppercase tracking-wider block mb-2">
                    Delivery Instructions (Optional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Leave box with security guard / Call on arrival..."
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full bg-white border border-[#EFE9DD] rounded-2xl p-3 text-xs text-[#1C1C1A] placeholder-[#6B6B63] focus:outline-none focus:ring-2 focus:ring-[#7A9B76]"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3.5 bg-white border border-[#EFE9DD] text-[#1F3B2C] font-semibold text-xs rounded-2xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="w-2/3 btn-primary-terracotta text-xs py-3.5 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT SELECTION */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">Select Payment Method</h3>
                  <p className="text-xs text-[#6B6B63] mt-1">Total Amount Payable: <strong className="text-[#1F3B2C] text-sm">₹{grandTotal}</strong></p>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all bg-white ${
                      paymentMethod === 'UPI' ? 'border-[#C96F4A] ring-2 ring-[#C96F4A]/20 shadow-sm' : 'border-[#EFE9DD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-[#C96F4A]" />
                      <div className="flex-1">
                        <p className="text-xs font-serif font-bold text-[#1F3B2C]">Instant UPI / GPay / PhonePe / Paytm</p>
                        <p className="text-[11px] text-[#6B6B63]">Scan QR code or enter UPI VPA Handle</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">INSTANT</span>
                    </div>

                    {paymentMethod === 'UPI' && (
                      <div className="mt-4 pt-3 border-t border-[#EFE9DD] space-y-3 bg-[#F7F4EE] p-3 rounded-xl" onClick={(e) => e.stopPropagation()}>
                        <label className="text-[11px] font-bold text-[#1F3B2C] block">Enter Virtual Payment Address (VPA)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. name@okaxis / username@paytm"
                            className="bg-white border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs flex-1 text-[#1C1C1A] focus:outline-none focus:border-[#C96F4A]"
                          />
                          <span className="bg-[#1F3B2C] text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center">
                            VERIFIED
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[#6B6B63]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Auto-verifying with Google Pay / PhonePe / BHIM network</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all bg-white ${
                      paymentMethod === 'CARD' ? 'border-[#C96F4A] ring-2 ring-[#C96F4A]/20 shadow-sm' : 'border-[#EFE9DD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#1F3B2C]" />
                      <div className="flex-1">
                        <p className="text-xs font-serif font-bold text-[#1F3B2C]">Credit / Debit Card</p>
                        <p className="text-[11px] text-[#6B6B63]">Visa, Mastercard, RuPay, Amex</p>
                      </div>
                      <span className="text-[11px] font-mono text-[#6B6B63]">🔒 256-BIT SSL</span>
                    </div>

                    {paymentMethod === 'CARD' && (
                      <div className="mt-4 pt-3 border-t border-[#EFE9DD] space-y-3 bg-[#F7F4EE] p-3 rounded-xl" onClick={(e) => e.stopPropagation()}>
                        <div>
                          <label className="text-[10px] font-bold text-[#6B6B63] block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            placeholder="4532 XXXX XXXX 1234"
                            className="bg-white border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs w-full text-[#1C1C1A] font-mono focus:outline-none focus:border-[#C96F4A]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-[#6B6B63] block mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              placeholder="08/28"
                              className="bg-white border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs w-full text-[#1C1C1A] font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#6B6B63] block mb-1">CVV / CVC</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              placeholder="***"
                              className="bg-white border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs w-full text-[#1C1C1A] font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Netbanking */}
                  <div
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all bg-white ${
                      paymentMethod === 'NETBANKING' ? 'border-[#C96F4A] ring-2 ring-[#C96F4A]/20 shadow-sm' : 'border-[#EFE9DD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Landmark className="w-5 h-5 text-[#1F3B2C]" />
                      <div className="flex-1">
                        <p className="text-xs font-serif font-bold text-[#1F3B2C]">Netbanking</p>
                        <p className="text-[11px] text-[#6B6B63]">HDFC, SBI, ICICI, Axis & All Major Banks</p>
                      </div>
                    </div>

                    {paymentMethod === 'NETBANKING' && (
                      <div className="mt-4 pt-3 border-t border-[#EFE9DD] space-y-2 bg-[#F7F4EE] p-3 rounded-xl" onClick={(e) => e.stopPropagation()}>
                        <label className="text-[11px] font-bold text-[#1F3B2C] block">Select Your Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="bg-white border border-[#EFE9DD] rounded-xl px-3 py-2 text-xs w-full text-[#1C1C1A] font-semibold cursor-pointer"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                          <option value="Punjab National Bank">Punjab National Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all bg-white ${
                      paymentMethod === 'COD' ? 'border-[#C96F4A] ring-2 ring-[#C96F4A]/20 shadow-sm' : 'border-[#EFE9DD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#1F3B2C]" />
                      <div className="flex-1">
                        <p className="text-xs font-serif font-bold text-[#1F3B2C]">Cash On Delivery (COD)</p>
                        <p className="text-[11px] text-[#6B6B63]">Pay ₹{grandTotal} when eco-vent nursery box arrives</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">NO EXTRA FEE</span>
                    </div>
                  </div>
                </div>

                {/* Multi-stage Payment Loading Banner */}
                {loading && paymentStageText && (
                  <div className="bg-[#1F3B2C] text-white p-4 rounded-2xl text-xs flex items-center gap-3 animate-pulse shadow-lg">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-semibold">{paymentStageText}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    disabled={loading}
                    className="w-1/3 py-3.5 bg-white border border-[#EFE9DD] text-[#1F3B2C] font-semibold text-xs rounded-2xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinalOrderSubmit}
                    disabled={loading}
                    className="w-2/3 btn-primary-terracotta text-xs py-3.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? 'Authorizing Payment...' : `Pay ₹${grandTotal} & Place Order`}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER CONFIRMATION RECEIPT */}
            {step === 4 && createdOrder && (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 bg-[#4C8055]/20 text-[#4C8055] rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="bg-[#C9A24B]/20 text-[#1F3B2C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" /> Order Confirmed & Nursery Dispatched
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#1F3B2C]">Thank You for Your Order!</h3>
                  <p className="text-xs text-[#6B6B63] mt-1">
                    Order ID: <strong className="text-[#1F3B2C] text-sm">{createdOrder?.orderNumber || createdOrder?.orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`}</strong>
                  </p>
                </div>

                {/* Receipt Breakdown */}
                <div className="bg-white p-5 rounded-2xl border border-[#EFE9DD] text-left text-xs space-y-2.5">
                  <div className="flex justify-between border-b border-[#EFE9DD] pb-2">
                    <span className="text-[#6B6B63]">Recipient:</span>
                    <strong className="text-[#1F3B2C]">{activeAddress.name} ({activeAddress.phone})</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#EFE9DD] pb-2">
                    <span className="text-[#6B6B63]">Delivery Address:</span>
                    <strong className="text-[#1F3B2C] text-right">{activeAddress.addressLine}, {activeAddress.city}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#EFE9DD] pb-2">
                    <span className="text-[#6B6B63]">Payment Mode:</span>
                    <strong className="text-[#1F3B2C]">{paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-sm text-[#1F3B2C]">
                    <span>Grand Total Paid:</span>
                    <span className="text-[#1F3B2C] font-serif text-lg">₹{grandTotal}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const ordId = createdOrder?.orderNumber || createdOrder?.orderId || createdOrder?._id;
                      onOrderComplete && onOrderComplete(ordId);
                      onClose();
                    }}
                    className="w-full sm:w-1/2 bg-[#C96F4A] hover:bg-[#B55D39] text-white text-xs font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Truck className="w-4 h-4" /> Track Live Order Status
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOrderComplete && onOrderComplete();
                      onClose();
                    }}
                    className="w-full sm:w-1/2 btn-forest-fill text-xs py-3.5 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Order Summary Sidebar (Visible Steps 1 to 3) */}
          {step !== 4 && (
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EFE9DD] h-fit space-y-4">
              <h4 className="font-serif font-bold text-[#1F3B2C] text-base border-b border-[#EFE9DD] pb-3">
                Order Summary ({cartItems.length})
              </h4>

              {/* Items Thumbnails */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const itemImg = item.images && item.images[0] ? item.images[0] : item.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                  const price = item.discountPrice || item.price;
                  return (
                    <div key={item.id || item._id} className="flex items-center gap-3 text-xs">
                      <img 
                        src={itemImg} 
                        alt={item.name} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-12 h-12 rounded-xl object-cover bg-[#EFE9DD]" 
                      />
                      <div className="flex-1 truncate">
                        <h5 className="font-semibold text-[#1F3B2C] truncate">{item.name}</h5>
                        <span className="text-[11px] text-[#6B6B63]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#1F3B2C]">₹{price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-[#EFE9DD] text-xs">
                <div className="flex justify-between text-[#6B6B63]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountVal > 0 && (
                  <div className="flex justify-between text-[#4C8055] font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountVal}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6B63]">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#4C8055]">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1F3B2C] pt-2 border-t border-[#EFE9DD]">
                  <span>Total Payable</span>
                  <span className="text-base font-serif text-[#1F3B2C]">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
