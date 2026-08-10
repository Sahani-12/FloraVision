import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A9B76]">
          We are Here to Help
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#1F3B2C]">
          Get In Touch With Our Nursery
        </h1>
        <p className="text-sm text-[#6B6B63]">
          Have questions about plant care, bulk order customization, or tracking? Send us a message or chat directly on WhatsApp.
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE9DD] space-y-6 shadow-xs">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">Send Us a Message</h3>
            <p className="text-xs text-[#6B6B63] mt-1">Our horticulturists reply within 24 business hours.</p>
          </div>

          {submitted && (
            <div className="p-4 bg-[#4C8055]/15 text-[#4C8055] text-xs font-semibold rounded-2xl flex items-center gap-2 border border-[#4C8055]/30">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thank you! Your message has been received. We will get back to you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Bulk Corporate Gift Order Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Write your question or request details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-3 text-xs text-[#1C1C1A]"
              />
            </div>

            <button
              type="submit"
              className="btn-primary-terracotta text-xs py-3.5 px-8 cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" /> Send Message
            </button>
          </form>
        </div>

        {/* Right Nursery Details & WhatsApp CTA */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Chat Card */}
          <div className="bg-[#1F3B2C] text-white p-6 rounded-3xl space-y-4 relative overflow-hidden">
            <span className="bg-[#7A9B76]/30 text-[#EFE9DD] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Fastest Response
            </span>
            <h3 className="font-serif text-2xl font-bold">Chat With Us on WhatsApp</h3>
            <p className="text-xs text-[#EFE9DD]/80 leading-relaxed">
              Get instant photos of specific plants in our nursery or ask our botanists for plant advice live!
            </p>
            <a
              href="https://wa.me/919876500000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-terracotta text-xs py-3 px-6 cursor-pointer inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
            </a>
          </div>

          {/* Nursery Info Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE9DD] space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#1F3B2C]">Nursery Location & Hours</h4>
            <div className="space-y-3 text-xs text-[#6B6B63]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C96F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F3B2C] block font-semibold">Greenhouse Headquarters:</strong>
                  FloraVision Botanical Nursery, Plot 42, Powai Tech Park, Mumbai, Maharashtra - 400076
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#7A9B76] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F3B2C] block font-semibold">Operating Hours:</strong>
                  Monday – Saturday: 9:00 AM – 7:00 PM IST
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#7A9B76] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F3B2C] block font-semibold">Customer Helpline:</strong>
                  +91 98765 00000
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map Placeholder */}
          <div className="h-48 rounded-3xl overflow-hidden bg-[#EFE9DD] border border-[#EFE9DD] flex items-center justify-center text-center p-4">
            <div className="text-[#6B6B63] space-y-1">
              <MapPin className="w-8 h-8 text-[#C96F4A] mx-auto animate-bounce" />
              <span className="font-serif font-bold text-sm text-[#1F3B2C] block">Powai Nursery Greenhouse, Mumbai</span>
              <span className="text-[11px] block">Interactive Google Maps Directions</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
