import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Bookmark, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Edit3, 
  ShieldCheck, 
  FileText,
  Clock
} from 'lucide-react';

export default function DashboardPage({ 
  allSchemes, 
  onStartWizard, 
  onOpenBot, 
  onViewDetails, 
  onStartGuidance,
  onOpenLogin
}) {
  const { t } = useLanguage();
  const { user, userProfile, savedSchemes, toggleSaveScheme } = useAuth();

  const profile = userProfile || {
    age: 20,
    state: "Uttar Pradesh",
    annual_income: 250000,
    occupation: "Student",
    category: "General",
    student_status: true
  };

  const savedList = (allSchemes || []).filter(s => 
    savedSchemes.includes(s.id) || savedSchemes.includes(s.scheme_id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-800 text-blue-200 text-xs font-bold border border-blue-700">
              Citizen Portal Dashboard
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Demo Identity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            Welcome, {user ? user.name : 'Citizen User'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl font-normal">
            Track your welfare eligibility, manage saved schemes, review document checklists, and receive step-by-step guidance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartWizard}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Check Eligibility
          </button>

          <button
            onClick={onOpenBot}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-300" />
            Ask Sahayak Bot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Citizen Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Citizen Profile Summary
                </h3>
              </div>
              <button
                onClick={onStartWizard}
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Citizen Name:</span>
                <span className="font-bold text-slate-800">{user?.name || "Aakash Sharma (Demo)"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Mobile Authentication:</span>
                <span className="font-mono font-bold text-emerald-700">+91 {user?.phone || "9876543210"} (Demo OTP)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Age:</span>
                <span className="font-bold text-slate-800">{profile.age} Years</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">State:</span>
                <span className="font-bold text-slate-800">{profile.state}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Family Income:</span>
                <span className="font-bold text-blue-900">₹{Number(profile.annual_income).toLocaleString('en-IN')}/yr</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Occupation:</span>
                <span className="font-bold text-slate-800">{profile.occupation}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Category / Student:</span>
                <span className="font-bold text-slate-800">{profile.category} • {profile.student_status ? 'Student' : 'Non-Student'}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                onClick={onStartWizard}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition"
              >
                Re-evaluate All Schemes
              </button>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Need Scheme Assistance?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sahayak Bot is available 24/7 in English and हिंदी to explain eligibility rules and required documents.
            </p>
            <button
              onClick={onOpenBot}
              className="w-full py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 font-bold text-xs rounded-xl shadow-xs transition"
            >
              Start Chat with Sahayak Bot →
            </button>
          </div>

        </div>

        {/* Right Column: Saved Schemes & Recommended Highlights */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Saved Schemes Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  Bookmarked & Saved Schemes ({savedList.length})
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Quick access for application
              </span>
            </div>

            {savedList.length > 0 ? (
              <div className="space-y-3">
                {savedList.map((s) => (
                  <div 
                    key={s.id || s.scheme_id} 
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                          {s.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer" onClick={() => onViewDetails(s)}>
                          {s.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {s.benefits}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onStartGuidance(s)}
                        className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition"
                      >
                        Apply Guide
                      </button>
                      <button
                        onClick={() => toggleSaveScheme(s.id || s.scheme_id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
                        title="Remove bookmark"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                <p>You haven't bookmarked any schemes yet.</p>
                <p className="mt-1">Click the bookmark icon on any scheme card to save it here for quick access.</p>
              </div>
            )}
          </div>

          {/* Recommended Schemes Highlights */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  Recommended for Your Profile
                </h3>
              </div>
              <button
                onClick={onStartWizard}
                className="text-xs font-bold text-blue-700 hover:text-blue-800"
              >
                View Full Results →
              </button>
            </div>

            <div className="space-y-3">
              {(allSchemes || []).slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                        {s.category}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {s.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {s.benefits}
                    </p>
                  </div>

                  <button
                    onClick={() => onViewDetails(s)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs rounded-lg transition shrink-0"
                  >
                    Details →
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
