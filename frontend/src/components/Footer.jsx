import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PhoneCall, ExternalLink, Info, Heart } from 'lucide-react';

export default function Footer({ onNav }) {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Banner */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 sm:p-6 mb-10 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-slate-300">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-white text-sm">
              Official Disclaimer & Informational Guidance Notice
            </p>
            <p className="text-slate-300 leading-relaxed">
              {t.disclaimerText} All scheme names, logos, guidelines, and benefits referenced are the property of their respective Union Ministries and State Government Departments.
            </p>
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-xl font-bold font-display text-white">
                Sahayak<span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven welfare discovery platform built to connect over 1.4 billion Indian citizens with eligible government support schemes.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/60 border border-blue-800/60 rounded-full text-[11px] text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Zero-Storage Privacy Architecture</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNav('home')} className="hover:text-amber-400 transition">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNav('wizard')} className="hover:text-amber-400 transition">
                  {t.checkEligibility}
                </button>
              </li>
              <li>
                <button onClick={() => onNav('schemes')} className="hover:text-amber-400 transition">
                  {t.schemes} Database
                </button>
              </li>
              <li>
                <button onClick={() => onNav('bot')} className="hover:text-amber-400 transition">
                  {t.askBot}
                </button>
              </li>
              <li>
                <button onClick={() => onNav('dashboard')} className="hover:text-amber-400 transition">
                  Citizen {t.dashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Major Schemes Covered */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Verified Schemes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• National Scholarship Portal (NSP)</li>
              <li>• PM-KISAN Samman Nidhi</li>
              <li>• Ayushman Bharat (PM-JAY)</li>
              <li>• Pradhan Mantri Awas Yojana (PMAY)</li>
              <li>• PM Vishwakarma Scheme</li>
              <li>• Sukanya Samriddhi & Atal Pension</li>
            </ul>
          </div>

          {/* Citizen Helpdesk & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Citizen Assistance
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>National Portal Helpline: 1800-11-0031</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Common Service Centres (CSC) available across all Gram Panchayats.
              </p>
              <div className="pt-2">
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  National Portal of India (india.gov.in)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>© 2026 SahayakAI. Built for Indian Citizen Welfare Hackathon.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Bharat • All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
