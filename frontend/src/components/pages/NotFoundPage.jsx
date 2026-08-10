import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage({ onGoHome }) {
  return (
    <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-6 text-center text-[#1C1C1A]">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#EFE9DD] shadow-xl animate-in zoom-in duration-200">
        
        {/* Wilted Leaf Illustration */}
        <div className="w-24 h-24 rounded-full bg-[#EFE9DD] text-[#C96F4A] flex items-center justify-center mx-auto shadow-inner">
          <span className="text-5xl font-serif font-bold">404</span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A9B76]">Lost In The Greenhouse</span>
          <h1 className="text-3xl font-serif font-bold text-[#1F3B2C]">
            Oops! This Leaf Got Pruned.
          </h1>
          <p className="text-xs text-[#6B6B63] leading-relaxed">
            The page you are looking for might have been moved, renamed, or is taking a sunbath. Let's get you back to fresh plants.
          </p>
        </div>

        <button
          onClick={onGoHome}
          className="w-full btn-primary-terracotta text-xs py-3.5 cursor-pointer"
        >
          <Home className="w-4 h-4 text-white" />
          <span>Take Me Back To Home & Shop</span>
        </button>
      </div>
    </div>
  );
}
