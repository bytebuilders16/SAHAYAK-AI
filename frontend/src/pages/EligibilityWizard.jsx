import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  IndianRupee, 
  CheckSquare, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Building2,
  GraduationCap,
  HeartPulse,
  Home,
  Wheat
} from 'lucide-react';

const INDIAN_STATES = [
  "Uttar Pradesh", "Maharashtra", "Bihar", "West Bengal", "Madhya Pradesh", 
  "Tamil Nadu", "Rajasthan", "Karnataka", "Gujarat", "Andhra Pradesh", 
  "Odisha", "Telangana", "Kerala", "Jharkhand", "Assam", "Punjab", 
  "Chhattisgarh", "Haryana", "Delhi", "Jammu and Kashmir", "Uttarakhand", 
  "Himachal Pradesh", "Goa", "All India / Other"
];

const OCCUPATIONS = [
  "Student", "Farmer", "Self-Employed", "Artisan / Craftsman", 
  "Daily Wage Worker", "Salaried / Private", "Unemployed", "Retired / Senior"
];

export default function EligibilityWizard({ onResultsReady }) {
  const { t } = useLanguage();
  const { userProfile, setUserProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(userProfile || {
    age: 20,
    state: "Uttar Pradesh",
    annual_income: 250000,
    occupation: "Student",
    student_status: true,
    category: "General",
    gender: "Male",
    residence: "Urban",
    farmer_status: false,
    healthcare_req: false,
    housing_req: false,
    education_req: true
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickDemoPrefill = () => {
    const demo = {
      age: 20,
      state: "Uttar Pradesh",
      annual_income: 250000,
      occupation: "Student",
      student_status: true,
      category: "General",
      gender: "Male",
      residence: "Urban",
      farmer_status: false,
      healthcare_req: false,
      housing_req: false,
      education_req: true
    };
    setFormData(demo);
    setUserProfile(demo);
    setError('');
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.age || formData.age < 1 || formData.age > 110) {
        setError('Please provide a valid citizen age.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (formData.annual_income === '' || formData.annual_income < 0) {
        setError('Please enter your annual family income.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError('');

    try {
      setUserProfile(formData);
      const res = await fetch('/api/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Evaluation service error');
      const data = await res.json();
      onResultsReady(data);
    } catch (err) {
      console.error(err);
      setError('Unable to evaluate schemes right now. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      
      {/* 1-Click Demo Scenario Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
            ⚡
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-950">
              Hackathon Evaluation Mode
            </h4>
            <p className="text-[11px] text-amber-800">
              Populate the judge scenario: <strong>20-Year-Old College Student (UP, ₹2.5L Income, Education Need)</strong>
            </p>
          </div>
        </div>
        <button
          onClick={handleQuickDemoPrefill}
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition shrink-0"
        >
          {t.demoFillBtn}
        </button>
      </div>

      {/* Main Wizard Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
        
        {/* Top Tricolor Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Official Eligibility Assessment
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-2">
                {t.wizardTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t.wizardSubtitle}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-slate-400">Step {currentStep} of 4</span>
              <div className="text-xs font-bold text-blue-900 mt-0.5">
                {currentStep === 1 && "Personal Info"}
                {currentStep === 2 && "Financial & Work"}
                {currentStep === 3 && "Welfare Needs"}
                {currentStep === 4 && "Review & Match"}
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-6">
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold text-slate-500">
              <span className={currentStep >= 1 ? 'text-blue-700' : ''}>1. Personal</span>
              <span className={currentStep >= 2 ? 'text-blue-700' : ''}>2. Financial</span>
              <span className={currentStep >= 3 ? 'text-blue-700' : ''}>3. Needs</span>
              <span className={currentStep >= 4 ? 'text-blue-700' : ''}>4. Review</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-blue-700 to-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mx-6 sm:mx-8 mt-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP CONTENT */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Citizen Age (Years) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    placeholder="e.g. 20"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Used to evaluate age limits for scholarships, youth, or senior citizen pensions.
                  </p>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Domicile State / UT *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gender *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleInputChange('gender', g)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          formData.gender === g
                            ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Residence Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Residence Area *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Urban', 'Rural'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleInputChange('residence', r)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          formData.residence === r
                            ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {r} Area
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Financial Information & Occupation */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Annual Family Income */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Total Annual Family Income (INR ₹) *
                  </label>
                  <span className="text-sm font-black text-blue-900">
                    ₹{Number(formData.annual_income || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1200000"
                  step="25000"
                  value={formData.annual_income}
                  onChange={(e) => handleInputChange('annual_income', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>₹0 (BPL)</span>
                  <span>₹2.5 Lakh (Scholarship / EWS)</span>
                  <span>₹6 Lakh (LIG)</span>
                  <span>₹12 Lakh+</span>
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    value={formData.annual_income}
                    onChange={(e) => handleInputChange('annual_income', Number(e.target.value) || 0)}
                    className="w-full sm:w-48 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                    placeholder="Enter exact income"
                  />
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Occupation *
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => {
                    const occ = e.target.value;
                    handleInputChange('occupation', occ);
                    if (occ === 'Student') handleInputChange('student_status', true);
                    if (occ === 'Farmer') handleInputChange('farmer_status', true);
                  }}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  {OCCUPATIONS.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* Category & Status Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Social Category / Caste *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    {['General', 'OBC', 'SC', 'ST', 'EWS'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-center space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.student_status}
                      onChange={(e) => handleInputChange('student_status', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Currently enrolled as a student</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.farmer_status}
                      onChange={(e) => handleInputChange('farmer_status', e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span>Agricultural landholder / Active farmer</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Specific Welfare Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-slate-500 mb-2">
                Select any targeted areas of assistance you are actively seeking right now:
              </p>

              {/* Education Requirement */}
              <div 
                onClick={() => handleInputChange('education_req', !formData.education_req)}
                className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                  formData.education_req 
                    ? 'border-indigo-600 bg-indigo-50/50' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className={`p-2 rounded-lg ${formData.education_req ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      Education & Scholarship Assistance
                    </h4>
                    <input
                      type="checkbox"
                      checked={formData.education_req}
                      onChange={() => {}} // handled by parent div
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fee reimbursement, post-matric stipends, technical course scholarships.
                  </p>
                </div>
              </div>

              {/* Healthcare Requirement */}
              <div 
                onClick={() => handleInputChange('healthcare_req', !formData.healthcare_req)}
                className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                  formData.healthcare_req 
                    ? 'border-rose-600 bg-rose-50/50' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className={`p-2 rounded-lg ${formData.healthcare_req ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      Healthcare & Hospitalization Cover
                    </h4>
                    <input
                      type="checkbox"
                      checked={formData.healthcare_req}
                      onChange={() => {}}
                      className="w-4 h-4 text-rose-600 rounded"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cashless medical cards, PM-JAY ₹5L cover, state health assurance.
                  </p>
                </div>
              </div>

              {/* Housing Requirement */}
              <div 
                onClick={() => handleInputChange('housing_req', !formData.housing_req)}
                className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                  formData.housing_req 
                    ? 'border-amber-600 bg-amber-50/50' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className={`p-2 rounded-lg ${formData.housing_req ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Home className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      Housing & Pucca Home Assistance
                    </h4>
                    <input
                      type="checkbox"
                      checked={formData.housing_req}
                      onChange={() => {}}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pradhan Mantri Awas Yojana subsidy, house construction grant.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review Summary */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Citizen Profile Summary for Evaluation:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Age:</span>
                    <span className="font-bold text-slate-800">{formData.age} Years</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">State:</span>
                    <span className="font-bold text-slate-800">{formData.state}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Annual Income:</span>
                    <span className="font-bold text-blue-800">₹{Number(formData.annual_income).toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Occupation:</span>
                    <span className="font-bold text-slate-800">{formData.occupation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Student Status:</span>
                    <span className="font-bold text-slate-800">{formData.student_status ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Area / Gender:</span>
                    <span className="font-bold text-slate-800">{formData.residence} • {formData.gender}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs">
                  <span className="text-slate-400 block mb-1">Requested Focus:</span>
                  <div className="flex gap-2 flex-wrap">
                    {formData.education_req && (
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                        Education & Scholarships
                      </span>
                    )}
                    {formData.healthcare_req && (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                        Healthcare & Hospitalization
                      </span>
                    )}
                    {formData.housing_req && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                        Housing & PMAY
                      </span>
                    )}
                    {formData.farmer_status && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        Agriculture / Farmer
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Ready to evaluate. The AI eligibility engine will match your criteria against all verified central and state welfare databases and compute non-binding <strong>Profile Match %</strong> scores.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.btnBack}
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                {t.btnNext}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating 10+ Schemes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{t.btnSubmit}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
