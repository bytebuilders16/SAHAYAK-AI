import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SchemeCard from '../components/SchemeCard';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function SchemesDirectoryPage({ 
  schemes, 
  onViewDetails, 
  onStartGuidance, 
  selectedCategory, 
  setSelectedCategory 
}) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Education', 'Healthcare', 'Housing', 'Agriculture', 'Social Security'];

  const filtered = (schemes || []).filter(s => {
    const matchesCat = (!selectedCategory || selectedCategory === 'All') 
      ? true 
      : s.category.toLowerCase() === selectedCategory.toLowerCase();
      
    const matchesSearch = !searchTerm 
      ? true 
      : (s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         s.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.benefits?.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Central & State Welfare Scheme Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
          Verified Government Schemes
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Explore official guidelines, eligibility criteria, and required document checklists for major Indian welfare programs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search schemes by keyword, benefit, or sector (e.g. scholarship, pension, farmer, hospital)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                (selectedCategory || 'All') === cat
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onViewDetails={onViewDetails}
              onStartGuidance={onStartGuidance}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <p className="text-sm font-bold text-slate-700">No schemes found matching "{searchTerm}"</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-3 px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

    </div>
  );
}
