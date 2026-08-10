import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'Plant Care & Health Guarantee',
      q: 'What if my plant arrives stressed or damaged during shipping?',
      a: 'We offer a 100% 7-Day Plant Health Guarantee. If your plant arrives damaged, dehydrated, or with broken foliage, simply send us a photo on WhatsApp or email within 7 days of delivery and we will send a free replacement immediately.'
    },
    {
      category: 'Shipping & Delivery',
      q: 'How do you package plants safely for long-distance transport?',
      a: 'We use specialized eco-vented protective boxes with custom moisture-retaining soil covers and breathable air channels. This prevents soil spillage while keeping roots hydrated and leaves ventilated for up to 10 days of travel.'
    },
    {
      category: 'Orders & Payments',
      q: 'What payment methods do you accept?',
      a: 'We accept instant UPI / QR payments (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), Netbanking, and Cash on Delivery (COD) across eligible pincodes in India.'
    },
    {
      category: 'Plant Care & Health Guarantee',
      q: 'Are your house plants safe for cats and dogs?',
      a: 'We explicitly tag pet-friendly plants (such as Peperomia, Parlor Palm, and Calathea) with a Pet Safe badge. You can use our catalog filter toggle "Pet Friendly Only" to view all non-toxic plants.'
    },
    {
      category: 'Shipping & Delivery',
      q: 'How long does delivery take?',
      a: 'Standard express delivery takes 2 to 4 business days depending on your city. Metro cities like Mumbai, Delhi, Bangalore, and Pune usually receive packages within 48 hours.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7A9B76]/15 text-[#1F3B2C] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#C96F4A]" /> Frequently Asked Questions
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1F3B2C]">
          Got Questions? We Have Answers.
        </h1>
        <p className="text-sm text-[#6B6B63]">
          Find answers to common questions about plant care, 7-day health guarantee, and eco-friendly packaging.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="card-plant rounded-2xl overflow-hidden bg-white border border-[#EFE9DD]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left font-serif font-bold text-base text-[#1F3B2C] cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-[#C96F4A] shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#7A9B76] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-5 bg-[#F7F4EE] border-t border-[#EFE9DD] text-xs sm:text-sm text-[#6B6B63] leading-relaxed">
                  <span className="text-[10px] font-bold uppercase text-[#7A9B76] block mb-1">{faq.category}</span>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
