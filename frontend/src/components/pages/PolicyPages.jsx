import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Truck } from 'lucide-react';

export default function PolicyPages() {
  const [activeTab, setActiveTab] = useState('shipping'); // 'shipping' | 'privacy' | 'terms'

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sticky Table of Contents Sidebar */}
        <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-[#EFE9DD] h-fit space-y-2 sticky top-24">
          <h3 className="font-serif font-bold text-[#1F3B2C] text-base px-3 py-2 border-b border-[#EFE9DD]">
            Store Legal & Policies
          </h3>
          
          <button
            onClick={() => setActiveTab('shipping')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'shipping' ? 'bg-[#1F3B2C] text-white shadow-xs' : 'text-[#6B6B63] hover:bg-[#F7F4EE]'
            }`}
          >
            <Truck className="w-4 h-4 text-[#C96F4A]" />
            <span>Shipping & 7-Day Returns Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'privacy' ? 'bg-[#1F3B2C] text-white shadow-xs' : 'text-[#6B6B63] hover:bg-[#F7F4EE]'
            }`}
          >
            <Lock className="w-4 h-4 text-[#7A9B76]" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'terms' ? 'bg-[#1F3B2C] text-white shadow-xs' : 'text-[#6B6B63] hover:bg-[#F7F4EE]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#C9A24B]" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Policy Content */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-[#EFE9DD] space-y-6">
          
          {/* SHIPPING & RETURNS */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A9B76]">Policy Overview</span>
              <h1 className="text-3xl font-serif font-bold text-[#1F3B2C]">Shipping & 7-Day Health Guarantee Policy</h1>
              <p className="text-xs text-[#6B6B63] leading-relaxed">Last Updated: August 2026</p>

              <div className="space-y-4 text-xs text-[#6B6B63] leading-relaxed pt-4 border-t border-[#EFE9DD]">
                <h3 className="font-serif font-bold text-base text-[#1F3B2C]">1. 7-Day Plant Health Guarantee</h3>
                <p>
                  Every plant shipped by FloraVision is backed by our 7-Day Health Guarantee. If your plant arrives damaged, wilted, or with broken main stems, send a photo to care@floravision.com or WhatsApp within 7 days of delivery for a 100% free replacement.
                </p>

                <h3 className="font-serif font-bold text-base text-[#1F3B2C]">2. Shipping Delivery Timelines</h3>
                <p>
                  Orders are processed within 24 hours. Express shipping takes 2-4 business days depending on pincode destination. Free shipping is applicable on all orders above ₹999.
                </p>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A9B76]">Data Protection</span>
              <h1 className="text-3xl font-serif font-bold text-[#1F3B2C]">Privacy Policy</h1>
              <p className="text-xs text-[#6B6B63] leading-relaxed">Last Updated: August 2026</p>

              <div className="space-y-4 text-xs text-[#6B6B63] leading-relaxed pt-4 border-t border-[#EFE9DD]">
                <h3 className="font-serif font-bold text-base text-[#1F3B2C]">1. Data We Collect</h3>
                <p>
                  We collect personal information such as name, email address, phone number, and delivery address to fulfill orders and provide plant care support. We never sell your personal data to third parties.
                </p>

                <h3 className="font-serif font-bold text-base text-[#1F3B2C]">2. Security Standards</h3>
                <p>
                  All payment transactions are encrypted using Industry Standard SSL (Secure Socket Layer) via trusted payment gateways.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A9B76]">Terms of Service</span>
              <h1 className="text-3xl font-serif font-bold text-[#1F3B2C]">Terms of Service</h1>
              <p className="text-xs text-[#6B6B63] leading-relaxed">Last Updated: August 2026</p>

              <div className="space-y-4 text-xs text-[#6B6B63] leading-relaxed pt-4 border-t border-[#EFE9DD]">
                <h3 className="font-serif font-bold text-base text-[#1F3B2C]">1. Usage Agreement</h3>
                <p>
                  By accessing FloraVision website or placing an order, you agree to adhere to these terms and conditions. All images and content belong to FloraVision E-Commerce Ltd.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
