import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SchemeCard from '../components/SchemeCard';
import { Sparkles, Filter, Edit3, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ResultsPage({ 
  resultsData, 
  onEditProfile, 
  onViewDetails, 
  onStartGuidance,
  onOpenBot
}) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const profile = resultsData?.profile || {};
  const results = resultsData?.results || [];
  const summary = resultsData?.summary || {};

  const filterOptions = [
    'All',
    'Education',
    'Healthcare',
    'Housing',
    'Agriculture',
    'Social Security'
  ];

  const filteredSchemes = activeFilter === 'All'
    ? results
    : results.filter(s => s.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Profile Summary Header */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 p-5 sm:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Evaluated Profile
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {profile.age} yrs • {profile.state} • {profile.occupation} • ₹{Number(profile.annual_income || 0).toLocaleString('en-IN')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-1">
            {t.resultsTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.resultsSubtitle} • {summary.eligible_count || 0} Schemes High Match, {summary.possible_count || 0} Possible
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onEditProfile}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 border border-slate-300"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>

          <button
            onClick={onOpenBot}
            className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition flex items-center gap-1.5 border border-blue-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Ask Sahayak Bot
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-400 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === f
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.scheme_id || scheme.id}
              scheme={scheme}
              onViewDetails={onViewDetails}
              onStartGuidance={onStartGuidance}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No schemes found in {activeFilter}</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try selecting "All" or updating your profile requirements to view matching options.
          </p>
          <button
            onClick={() => setActiveFilter('All')}
            className="mt-4 px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Non-Binding Legal Notice */}
      <div className="mt-12 p-4 bg-slate-100 border border-slate-200 rounded-xl text-[11px] text-slate-500 text-center max-w-4xl mx-auto">
        <p>
          ⚖️ <strong>Legal Notice:</strong> The "Profile Match" percentage is an automated informational estimate generated by SahayakAI algorithms. It does not constitute official approval, sanction, or legal entitlement. Official verification and disbursement are strictly executed by the respective State / Central Ministry portal.
        </p>
      </div>

    </div>
  );
}
