import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Globe, User, LogOut, Sparkles, Menu, X, BookOpen } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenLogin }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.home },
    { id: 'how-it-works', label: t.howItWorks },
    { id: 'schemes', label: t.schemes },
    { id: 'bot', label: t.askBot, badge: 'AI' },
    { id: 'dashboard', label: t.dashboard }
  ];

  const handleNav = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Tricolor Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
      
      {/* Top Official Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-8 flex justify-between items-center font-medium">
        <div className="flex items-center gap-2">
          <span className="text-base">🇮🇳</span>
          <span className="hidden sm:inline text-slate-400">भारत सरकार • Government of India Initiative</span>
          <span className="sm:hidden text-slate-300 font-semibold">SahayakAI Citizen Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-slate-400">National Citizen Assistance AI</span>
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold transition border border-slate-700"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className={lang === 'en' ? 'text-amber-400 font-bold' : 'text-slate-300'}>EN</span>
            <span className="text-slate-500">|</span>
            <span className={lang === 'hi' ? 'text-amber-400 font-bold' : 'text-slate-300'}>हिंदी</span>
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white font-black text-xl shadow-md border border-blue-800 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black font-display tracking-tight text-slate-900">
                Sahayak<span className="text-blue-700">AI</span>
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase border border-amber-300">
                Official MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide leading-none">
              {t.portalSubtitle}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activePage === link.id
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wide">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* User / CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-sm">
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Demo Verified
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Sign out of demo"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-xs font-bold text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg border border-slate-300 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              {t.login}
            </button>
          )}

          <button
            onClick={() => handleNav('wizard')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {t.getStarted}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between ${
                activePage === link.id
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-[10px] bg-blue-600 text-white rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!user ? (
              <button
                onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg"
              >
                {t.login}
              </button>
            ) : (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg"
              >
                {t.logout} ({user.name})
              </button>
            )}
            <button
              onClick={() => handleNav('wizard')}
              className="w-full text-center py-2.5 bg-blue-700 text-white font-bold rounded-lg text-sm shadow"
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
