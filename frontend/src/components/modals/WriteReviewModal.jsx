import React, { useState } from 'react';
import { X, Star, Upload, CheckCircle2 } from 'lucide-react';

export default function WriteReviewModal({ isOpen, onClose, productName, onSubmitReview }) {
  if (!isOpen) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmitReview && onSubmitReview({
        rating,
        name: name || 'Verified Plant Parent',
        comment,
        date: new Date().toISOString().split('T')[0]
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#EFE9DD] animate-in fade-in zoom-in duration-200">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F7F4EE] text-[#1F3B2C] hover:bg-[#1F3B2C] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#4C8055] mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">Review Submitted!</h3>
            <p className="text-xs text-[#6B6B63]">Thank you for helping our plant community grow.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-[#7A9B76] uppercase tracking-wider block mb-1">
                Write a Review
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">
                {productName || 'Monstera Deliciosa'}
              </h3>
            </div>

            {/* Star Selection */}
            <div>
              <label className="text-xs font-semibold text-[#1C1C1A] block mb-2">Overall Rating:</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-[#C9A24B] text-[#C9A24B]'
                          : 'text-[#EFE9DD]'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#1F3B2C] ml-2">{rating} Stars</span>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Your Name:</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl px-4 py-2.5 text-xs text-[#1C1C1A] placeholder-[#6B6B63] focus:outline-none focus:ring-2 focus:ring-[#7A9B76]"
              />
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="text-xs font-semibold text-[#1C1C1A] block mb-1">Your Feedback & Experience:</label>
              <textarea
                rows={4}
                placeholder="Share details about plant health, packaging quality, leaf condition..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#EFE9DD] rounded-xl p-3 text-xs text-[#1C1C1A] placeholder-[#6B6B63] focus:outline-none focus:ring-2 focus:ring-[#7A9B76]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary-terracotta text-xs py-3.5 cursor-pointer"
            >
              Post Verified Review
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
