import React from 'react';
import { Leaf, Mail, ShieldCheck, Phone, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer id="footer" className="bg-[#14281E] text-white pt-16 pb-10 border-t border-[#7A9B76]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#7A9B76]/15">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-[#C96F4A] flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                FloraVision<span className="text-[#C96F4A]">.</span>
              </span>
            </div>

            <p className="text-[#EFE9DD]/80 text-xs sm:text-sm max-w-sm leading-relaxed">
              India's premier luxury botanical nursery. Curating healthy, 100% organic indoor plants, 24/7 air purifiers, and sustainable planters for modern living.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#7A9B76]">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#C96F4A]" /> 7-Day Guarantee</span>
              <span>•</span>
              <span>Eco-Vented Packaging</span>
            </div>
          </div>

          {/* Col 2: Shop Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#C9A24B] uppercase tracking-wider">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE9DD]/80">
              <li><button onClick={() => onNavigate && onNavigate('shop-catalog')} className="hover:text-white transition-colors cursor-pointer">Indoor Plants</button></li>
              <li><button onClick={() => onNavigate && onNavigate('shop-catalog')} className="hover:text-white transition-colors cursor-pointer">Air Purifiers</button></li>
              <li><button onClick={() => onNavigate && onNavigate('shop-catalog')} className="hover:text-white transition-colors cursor-pointer">Succulents & Cacti</button></li>
              <li><button onClick={() => onNavigate && onNavigate('shop-catalog')} className="hover:text-white transition-colors cursor-pointer">Pots & Planters</button></li>
              <li><button onClick={() => onNavigate && onNavigate('shop-catalog')} className="hover:text-white transition-colors cursor-pointer">Gift Bundles</button></li>
            </ul>
          </div>

          {/* Col 3: Company & Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#C9A24B] uppercase tracking-wider">
              Company & Care
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE9DD]/80">
              <li><button onClick={() => onNavigate && onNavigate('care-guides')} className="hover:text-white transition-colors cursor-pointer">Plant Care Guides</button></li>
              <li><button onClick={() => onNavigate && onNavigate('plant-quiz')} className="hover:text-white transition-colors cursor-pointer">Plant Finder Quiz</button></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Nursery Story</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Eco Practices</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info & Social */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#C9A24B] uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EFE9DD]/80">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7A9B76] shrink-0" />
                <span>Powai Botanical Nursery, Mumbai 400076</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7A9B76] shrink-0" />
                <span>+91 98765 00000 (Mon-Sat, 9am-7pm)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7A9B76] shrink-0" />
                <span>care@floravision.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-3">
              <a href="#social" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C96F4A] transition-colors" title="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C96F4A] transition-colors" title="Community">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C96F4A] transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Payment Icons & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9B76] gap-4">
          <p>© 2026 FloraVision E-Commerce Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#EFE9DD]/60">
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">UPI / GPay</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">VISA</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">Mastercard</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">NetBanking</span>
            <span className="px-2 py-1 bg-white/10 rounded font-semibold text-white">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
