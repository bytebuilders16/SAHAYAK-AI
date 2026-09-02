import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  Sparkles, 
  AlertTriangle,
  Info,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function SchemeDetailPage({ scheme, onBack, onStartGuidance }) {
  const { t } = useLanguage();
  const { savedSchemes, toggleSaveScheme } = useAuth();

  if (!scheme) return null;

  const id = scheme.scheme_id || scheme.id;
  const isSaved = savedSchemes.includes(id);
  const matchScore = scheme.profile_match || scheme.match_score || 90;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Back Button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Schemes / Results</span>
        </button>

        <button
          onClick={() => toggleSaveScheme(id)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
            isSaved
              ? 'bg-amber-50 border-amber-300 text-amber-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
          <span>{isSaved ? 'Saved in Dashboard' : 'Save Scheme'}</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
        
        {/* Top Civic Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FF9933] via-blue-600 to-[#138808]" />

        {/* Scheme Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
              {scheme.category}
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{matchScore}% {t.matchScore}</span>
            </span>

            <span className="text-xs font-medium text-slate-400">
              • Scheme ID: #{id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
            {scheme.name}
          </h1>

          <p className="text-sm text-slate-600 mt-2.5 max-w-3xl leading-relaxed">
            {scheme.description || scheme.short_description}
          </p>

          {/* Action CTAs Header */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartGuidance(scheme)}
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.startGuidance}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {scheme.official_url && (
              <a
                href={scheme.official_url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 font-bold text-xs border border-slate-300 transition flex items-center gap-1.5"
              >
                <span>{t.officialPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* 1. Benefits in Simple Language */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                ₹
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Key Benefits & Entitlements
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-sm text-slate-800 leading-relaxed font-medium">
              {scheme.benefits}
            </div>
          </div>

          {/* 2. Eligibility Criteria */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Detailed Eligibility Criteria
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 mb-2">Who is eligible:</p>
              <p className="mb-3">{scheme.eligibility || scheme.eligibility_summary}</p>

              {scheme.match_reasons && scheme.match_reasons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-xs font-bold text-emerald-800 mb-1.5">
                    Why your profile matches:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {scheme.match_reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 3. Required Document Checklist */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Mandatory Document Checklist
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(scheme.required_documents || [
                "Aadhaar Card (Aadhaar linked Mobile Number)",
                "Income Certificate issued by Tehsildar / SDM",
                "Bank Account Passbook (Aadhaar Seeded)",
                "Previous Academic Marksheets & Bonafide Certificate"
              ]).map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Official Application Steps */}
          {scheme.application_steps && scheme.application_steps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Application Procedure
                </h3>
              </div>

              <div className="space-y-2.5">
                {scheme.application_steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-bold text-xs shrink-0 mt-0.5">
                      Step {idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Mandatory Disclaimer Banner */}
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Important Citizen Notice</p>
              <p className="mt-0.5 leading-relaxed">
                {t.disclaimerText} Never pay any unauthorized agent or middleman for government welfare enrollment. Most Central & State schemes are 100% free of application fees.
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              ← Return to List
            </button>

            <button
              onClick={() => onStartGuidance(scheme)}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.startGuidance}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
