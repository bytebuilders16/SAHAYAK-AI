import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, Sparkles, Target, Users, BookOpen } from 'lucide-react';

export default function AboutPage({ onStartWizard, onOpenBot }) {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn space-y-12">
      
      {/* Top Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          About SahayakAI
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
          Empowering Indian Citizens Through Open AI Welfare Discovery
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Over 500+ Central and State welfare initiatives exist in India, but millions of eligible citizens miss out due to information asymmetry, complicated eligibility gazettes, and confusing application portals.
        </p>
      </div>

      {/* Mission & Problem Statement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">The Problem We Are Solving</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Citizens struggle to identify which schemes they are entitled to, spend unnecessary fees at middleman kiosks, and frequently face rejections due to incomplete document preparations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">The SahayakAI Solution</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            An automated, zero-storage AI eligibility engine paired with a RAG-grounded bilingual chatbot that speaks English, हिंदी, and Hinglish to guide any citizen from discovery to successful application.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
        <h3 className="text-xl font-bold font-display text-slate-900 text-center">
          Our Civic Tech Principles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Privacy by Design
            </h4>
            <p>We never collect or store real Aadhaar numbers, biometric data, or sensitive passwords. All demo workflows are simulated safely.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Verified Information Only
            </h4>
            <p>Every scheme in our knowledge base links directly to authentic .gov.in or .nic.in portals with verified official requirements.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500" />
              Free for Every Citizen
            </h4>
            <p>100% open, zero ad tracking, built with love for the digital public infrastructure of Bharat.</p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-4">
        <button
          onClick={onStartWizard}
          className="px-7 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition"
        >
          Check Your Welfare Eligibility Now →
        </button>
      </div>

    </div>
  );
}
