import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  GraduationCap, 
  HeartPulse, 
  Home, 
  Wheat, 
  Coins, 
  MessageSquare, 
  FileCheck2, 
  Users, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function LandingPage({ onStartWizard, onOpenBot, onSelectCategory, onOpenLogin }) {
  const { t } = useLanguage();

  const categories = [
    { id: 'Education', name: t.catEducation, icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', count: '10+ Central & State' },
    { id: 'Healthcare', name: t.catHealthcare, icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', count: 'PM-JAY & State Covers' },
    { id: 'Housing', name: t.catHousing, icon: Home, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', count: 'PMAY Urban & Gramin' },
    { id: 'Agriculture', name: t.catAgriculture, icon: Wheat, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', count: 'PM-KISAN & Subsidies' },
    { id: 'Social Security', name: t.catSocialSecurity, icon: Coins, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', count: 'Pensions & Artisan Grants' },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
        
        {/* Subtle Civic Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0b2545_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-xs font-bold text-blue-900 mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm">🇮🇳</span>
                <span>{t.heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-[1.15]">
                Find Government Schemes <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-900">
                  Made For You.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={onStartWizard}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {t.heroBtnPrimary}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenBot}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-700 font-bold text-sm border border-slate-300 hover:border-blue-300 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  {t.heroBtnSecondary}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Scheme Database</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>No Real Aadhaar Required</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Live Recommended Scheme Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                
                {/* Decorative background glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-15" />

                {/* Card preview */}
                <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Citizen Match Preview
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Sample Student Case
                    </span>
                  </div>

                  {/* Sample Scheme */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 uppercase">
                        Education
                      </span>
                      <div className="flex items-center gap-1 text-emerald-700 font-black text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>96% Profile Match</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mt-2">
                      Post-Matric Scholarship for Higher Education
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Tuition fees covered + monthly maintenance allowance up to ₹13,500/yr.
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 font-medium">
                      <span>Eligibility: Income ≤ ₹2.5 Lakh</span>
                      <span className="text-blue-700 font-bold cursor-pointer" onClick={onStartWizard}>
                        Verify Yourself →
                      </span>
                    </div>
                  </div>

                  {/* Secondary Preview */}
                  <div className="p-3 rounded-xl bg-blue-900 text-white flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold">Ayushman Bharat (PM-JAY)</p>
                      <p className="text-blue-200 text-[11px]">₹5 Lakh cashless family hospital cover</p>
                    </div>
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-[10px]">
                      Eligible
                    </span>
                  </div>

                  {/* Judge 1-click CTA */}
                  <div className="pt-2">
                    <button
                      onClick={onStartWizard}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      ⚡ Try the 20-Year Student Demo Case
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Simple & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-3">
              {t.howHeadline}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {t.howSubheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:bg-blue-50/40 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {t.step1Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:bg-blue-50/40 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {t.step2Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:bg-blue-50/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {t.step3Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPORTED CATEGORIES */}
      <section className="py-16 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              {t.categoriesTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Explore welfare schemes spanning key sectors of the Indian economy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 civic-card-hover cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.border} border flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {cat.count}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-700">
                    <span>View Schemes</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              {t.featuresTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Engineered with civic empathy, accuracy, and ease-of-use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.feat1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.feat1Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.feat2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.feat2Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.feat3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.feat3Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.feat4Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.feat4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-800/80 border border-blue-600 text-blue-200">
            Citizen First Initiative
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Ready to Discover Welfare Schemes You Qualify For?
          </h2>
          <p className="text-sm sm:text-base text-blue-200 max-w-2xl mx-auto font-normal">
            Take 2 minutes to evaluate your profile against 10+ verified government schemes and get direct application guidance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Free Citizen Check
            </button>
            <button
              onClick={onOpenBot}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Ask Sahayak Bot (हिंदी / English)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
