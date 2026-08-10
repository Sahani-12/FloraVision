import React from 'react';
import { ShoppingBag } from 'lucide-react';
import asset2 from '../../assets/5196aba58f7006d90ec0712ac1d01688cde1a537.png';
import asset3 from '../../assets/6d90916507b2b3030961c99c6af0ebac97b86c78 (1).png';

export default function TrendingPlants({ plants, onAddToCart, onQuickView }) {
  const deskPlant1 = plants.find(p => p.price === 599) || {
    id: 7,
    name: "For Your Desks Decorations",
    price: 599,
    image: asset2
  };

  const deskPlant2 = plants.find(p => p.price === 399) || {
    id: 8,
    name: "Haworthia Succulent",
    price: 399,
    image: asset3
  };

  return (
    <section id="types" className="py-20 sm:py-28 bg-[#121A15] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading inside Figma-style outlined pill */}
        <div className="text-center">
          <div className="inline-block border border-amber-300/40 rounded-full px-8 py-2.5 bg-white/5 backdrop-blur-md">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Our Trendy plants
            </h2>
          </div>
        </div>

        {/* CARD 1: Potted Plant on Left + Text on Right matching Figma screenshot */}
        <div className="bg-[#18231C]/90 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl transition-all duration-300 hover:border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Plant Image Left */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-md h-72 sm:h-96 flex items-center justify-center">
                <img
                  src={asset2}
                  alt="For Your Desks Decorations"
                  className="max-h-full max-w-full object-contain drop-shadow-2xl animate-float-slow"
                />
              </div>
            </div>

            {/* Content Right */}
            <div className="md:col-span-6 space-y-6 text-center md:text-left">
              <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white leading-tight">
                For Your Desks Decorations
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                I recently added a beautiful desk decoration plant to my workspace, and it has made such a positive difference!
              </p>

              <div className="pt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  Rs. 599/-
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <button
                  onClick={() => onQuickView(deskPlant1)}
                  className="btn-outline-pill px-8 py-3 text-sm font-semibold cursor-pointer"
                >
                  Explore
                </button>

                <button
                  onClick={() => onAddToCart(deskPlant1)}
                  className="p-3 bg-transparent border border-white/30 rounded-2xl hover:border-white text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* CARD 2: Text on Left + Succulent Cyan Pot on Right matching Figma screenshot */}
        <div className="bg-[#18231C]/90 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl transition-all duration-300 hover:border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Content Left */}
            <div className="md:col-span-6 space-y-6 text-center md:text-left order-2 md:order-1">
              <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white leading-tight">
                For Your Desks Decorations
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                The greenery adds a touch of nature and serenity to my desk, making it feel more inviting and calming
              </p>

              <div className="pt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  Rs. 399/-
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <button
                  onClick={() => onQuickView(deskPlant2)}
                  className="btn-outline-pill px-8 py-3 text-sm font-semibold cursor-pointer"
                >
                  Explore
                </button>

                <button
                  onClick={() => onAddToCart(deskPlant2)}
                  className="p-3 bg-transparent border border-white/30 rounded-2xl hover:border-white text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Succulent Plant Image Right */}
            <div className="md:col-span-6 flex justify-center order-1 md:order-2">
              <div className="w-full max-w-md h-72 sm:h-96 flex items-center justify-center">
                <img
                  src={asset3}
                  alt="Haworthia Succulent Desk Decor"
                  className="max-h-full max-w-full object-contain drop-shadow-2xl animate-float-slow"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
