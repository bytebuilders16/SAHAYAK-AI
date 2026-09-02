import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Bookmark, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink, Sparkles, FileText } from 'lucide-react';

const categoryColors = {
  Education: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-800',
    badge: 'bg-indigo-600',
    iconColor: 'text-indigo-600'
  },
  Healthcare: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-800',
    badge: 'bg-rose-600',
    iconColor: 'text-rose-600'
  },
  Agriculture: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    badge: 'bg-emerald-600',
    iconColor: 'text-emerald-600'
  },
  Housing: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badge: 'bg-amber-600',
    iconColor: 'text-amber-600'
  },
  'Social Security': {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-800',
    badge: 'bg-teal-600',
    iconColor: 'text-teal-600'
  }
};

export default function SchemeCard({ scheme, onViewDetails, onStartGuidance }) {
  const { t } = useLanguage();
  const { savedSchemes, toggleSaveScheme } = useAuth();
  
  const id = scheme.scheme_id || scheme.id;
  const isSaved = savedSchemes.includes(id);
  const matchScore = scheme.profile_match || scheme.match_score || 85;
  const status = scheme.status || (matchScore >= 80 ? 'Eligible' : 'Possibly Eligible');
  const catStyle = categoryColors[scheme.category] || categoryColors.Education;

  return (
    <div className="civic-card-shadow civic-card-hover bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between relative group">
      
      {/* Category colored top bar */}
      <div className={`h-1.5 w-full ${catStyle.badge}`} />

      <div className="p-5 sm:p-6 flex-1">
        {/* Top Badges Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}>
              {scheme.category}
            </span>
            
            {status === 'Eligible' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {t.statusEligible}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                {t.statusPossible}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSaveScheme(id)}
            className={`p-1.5 rounded-lg border transition ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save scheme'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Scheme Title */}
        <h3 
          onClick={() => onViewDetails(scheme)}
          className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition cursor-pointer leading-snug line-clamp-2"
        >
          {scheme.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {scheme.short_description || scheme.description}
        </p>

        {/* Profile Match Score Indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {t.matchScore}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xl font-black font-display text-blue-900">
                {matchScore}%
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                (Non-binding estimate)
              </span>
            </div>
          </div>

          {/* Progress ring or mini bar */}
          <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full rounded-full ${
                matchScore >= 80 ? 'bg-gradient-to-r from-blue-600 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
              }`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        {/* Key Benefits Highlight Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Key Benefit:
          </div>
          <p className="text-slate-600 font-medium line-clamp-2 leading-snug">
            {scheme.benefits}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(scheme)}
          className="text-xs font-bold text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition flex items-center gap-1"
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          {t.viewDetails}
        </button>

        <button
          onClick={() => onStartGuidance(scheme)}
          className="text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1"
        >
          {t.startGuidance}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
