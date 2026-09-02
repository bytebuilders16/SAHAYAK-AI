import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, X, Smartphone, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

export default function DemoLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { loginWithDemoOtp } = useAuth();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [error, setError] = useState('');
  const [step, setStep] = useState('otp'); // 'phone' or 'otp'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = loginWithDemoOtp(phone, otp);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } else {
      setError(res.message);
    }
  };

  const handleQuickDemoLogin = () => {
    setPhone('9876543210');
    setOtp('123456');
    const res = loginWithDemoOtp('9876543210', '123456');
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Tricolor top header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-800 mb-3 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Demo Citizen Authentication
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simulated verification environment for hackathon testing
            </p>
          </div>

          {/* Prominent Demo Notice */}
          <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Demo Authentication Notice</p>
              <p className="text-amber-800">
                No real credentials or Aadhaar numbers are required. Use demo mobile <strong className="font-mono">9876543210</strong> and OTP <strong className="font-mono">123456</strong>.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Demo Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Simulated OTP
                </label>
                <span className="text-[11px] text-blue-600 font-semibold cursor-pointer" onClick={() => setOtp('123456')}>
                  Use demo: 123456
                </span>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  placeholder="123456"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
            >
              Verify & Enter Demo Portal
            </button>
          </form>

          {/* Quick 1-click test button */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              ⚡ Instant 1-Click Demo Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
