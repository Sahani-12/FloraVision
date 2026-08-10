import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (view === 'register') {
      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }
      if (!agreeTerms) {
        return setError('Please accept the Terms & Conditions');
      }
    }

    setLoading(true);

    try {
      if (view === 'login') {
        const res = await authService.login(email, password);
        if (res.success) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setError(res.message || 'Invalid email or password');
        }
      } else if (view === 'register') {
        const res = await authService.signup(name, email, password, phone);
        if (res.success) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setError(res.message || 'Registration failed');
        }
      } else if (view === 'forgot') {
        setSuccessMsg(`Password reset link sent to ${email}`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#F7F4EE] rounded-3xl max-w-3xl w-full grid grid-cols-1 md:grid-cols-12 shadow-2xl overflow-y-auto max-h-[90vh] relative border border-[#EFE9DD] animate-in fade-in duration-200 my-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-[#1F3B2C] hover:bg-[#1F3B2C] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Auth Form */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Header */}
            <div className="space-y-1 mb-6 text-left">
              <span className="text-[11px] font-bold text-[#7A9B76] uppercase tracking-wider">
                FloraVision Nursery
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1F3B2C]">
                {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Join FloraVision' : 'Reset Password'}
              </h3>
              <p className="text-xs text-[#6B6B63]">
                {view === 'login'
                  ? 'Sign in to track orders, manage wishlist & member perks.'
                  : view === 'register'
                  ? 'Create an account for 10% off your first order & botanist support.'
                  : 'Enter your email address to receive password reset instructions.'}
              </p>
            </div>

            {/* Error / Success Notifications */}
            {error && (
              <div className="bg-[#B3452F]/10 border border-[#B3452F]/30 text-[#B3452F] text-xs p-3 rounded-xl mb-4 font-semibold text-left">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="bg-[#4C8055]/10 border border-[#4C8055]/30 text-[#4C8055] text-xs p-3 rounded-xl mb-4 font-semibold text-left">
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {view === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1A] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7A9B76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE9DD] rounded-xl text-xs font-medium text-[#1C1C1A] focus:outline-none focus:ring-2 focus:ring-[#7A9B76]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1A] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7A9B76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE9DD] rounded-xl text-xs font-medium text-[#1C1C1A] focus:outline-none focus:ring-2 focus:ring-[#7A9B76]"
                  />
                </div>
              </div>

              {view !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#1C1C1A]">Password</label>
                    {view === 'login' && (
                      <button
                        type="button"
                        onClick={() => setView('forgot')}
                        className="text-[11px] font-semibold text-[#C96F4A] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#7A9B76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE9DD] rounded-xl text-xs font-medium text-[#1C1C1A] focus:outline-none focus:ring-2 focus:ring-[#7A9B76]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary-terracotta text-xs py-3.5 cursor-pointer mt-2"
              >
                {loading ? 'Processing...' : view === 'login' ? 'Sign In' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>

            {/* View Switchers */}
            <div className="text-center text-xs text-[#6B6B63] pt-4 border-t border-[#EFE9DD] mt-4">
              {view === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setView('register')} className="font-bold text-[#1F3B2C] hover:underline cursor-pointer">
                    Register Now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setView('login')} className="font-bold text-[#1F3B2C] hover:underline cursor-pointer">
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Lifestyle Plant Visual Banner */}
        <div className="hidden md:block md:col-span-5 relative bg-[#1F3B2C] overflow-hidden text-white p-8 flex flex-col justify-between">
          <img
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
            alt="Plant Lifestyle"
            className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-10 space-y-3">
            <span className="bg-[#C96F4A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Nursery Fresh
            </span>
            <h4 className="font-serif text-2xl font-bold text-white">
              Greenery Delivered With Care
            </h4>
            <p className="text-xs text-[#EFE9DD]/80 leading-relaxed">
              Every order comes with our 7-day health guarantee and lifetime botanist support.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/20 text-[11px] text-[#EFE9DD]/80">
            Over 12,000+ happy plant parents across India.
          </div>
        </div>

      </div>
    </div>
  );
}
