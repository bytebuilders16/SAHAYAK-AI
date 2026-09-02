import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Sparkles, 
  FileCheck2, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';

export default function ApplicationGuidePage({ scheme, onBack, onOpenBot }) {
  const { t } = useLanguage();
  const { userProfile } = useAuth();

  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [checkedDocs, setCheckedDocs] = useState({});
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);

  const schemeId = scheme?.scheme_id || scheme?.id || 'scheme-demo';
  const schemeName = scheme?.name || 'Central Welfare Scheme';
  const portalUrl = scheme?.official_url || 'https://india.gov.in';

  const defaultDocs = scheme?.required_documents || [
    "Aadhaar Card (Linked with active Mobile Number)",
    "Annual Income Certificate issued by competent Revenue Authority",
    "Active Bank Account Passbook (Aadhaar Seeded & DBT Enabled)",
    "Academic Bonafide / Enrollment Certificate / Land Records (as applicable)"
  ];

  const steps = [
    {
      num: 1,
      title: "Check Required Documents",
      summary: "Ensure you have all mandatory government identity and category proofs ready.",
      isDocsStep: true
    },
    {
      num: 2,
      title: "Verify Profile Information",
      summary: "Cross-check your state domicile, annual family income, and criteria with scheme guidelines."
    },
    {
      num: 3,
      title: "Prepare & Scan Documents",
      summary: "Digitize certificates in clear PDF or JPEG format (under 200 KB per file)."
    },
    {
      num: 4,
      title: "Fill Application on Portal",
      summary: `Register or login on the official portal (${portalUrl}) and fill personal & bank details.`
    },
    {
      num: 5,
      title: "Review & Final Verification",
      summary: "Preview your draft application, check bank account number & IFSC code before OTP submission."
    },
    {
      num: 6,
      title: "Visit Official Government Portal",
      summary: "Complete final submission and download your official Application Acknowledgment Slip."
    }
  ];

  const toggleDocCheck = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleStepComplete = (stepNum) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps(prev => [...prev, stepNum]);
    }
    if (stepNum < 6) {
      setActiveStep(stepNum + 1);
    } else {
      setShowSimulatedModal(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Header with Back */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scheme Details</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Progress: {completedSteps.length} of 6 Steps Done
          </span>
          <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${(completedSteps.length / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Guide Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
        
        {/* Tricolor Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Title Header */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                Guided Application Roadmap
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Simulated Walkthrough
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-display text-slate-900">
              {schemeName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Follow these 6 verified steps to complete an error-free submission.
            </p>
          </div>

          <a
            href={portalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-blue-400 text-slate-800 hover:text-blue-700 font-bold text-xs shadow-sm transition"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </a>
        </div>

        {/* Stepper Grid */}
        <div className="p-6 sm:p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: 6-Step Navigation List */}
            <div className="lg:col-span-5 space-y-2.5">
              {steps.map((s) => {
                const isCompleted = completedSteps.includes(s.num);
                const isCurrent = activeStep === s.num;

                return (
                  <div
                    key={s.num}
                    onClick={() => setActiveStep(s.num)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                      isCurrent
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : isCompleted
                        ? 'border-emerald-200 bg-emerald-50/30 hover:bg-slate-50'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                          {s.num}
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
                          {s.num}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-blue-900' : 'text-slate-800'}`}>
                        Step {s.num}: {s.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {s.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed View of the Active Step */}
            <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl border border-slate-200 p-6 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                    Step {activeStep} of 6
                  </span>
                  <h3 className="text-base font-bold font-display text-slate-900 mt-0.5">
                    {steps[activeStep - 1].title}
                  </h3>
                </div>

                {completedSteps.includes(activeStep) && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                )}
              </div>

              {/* Step 1 Content: Document Checklist with Checkboxes */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Tick each document as you locate or download it from DigiLocker:
                  </p>
                  <div className="space-y-2">
                    {defaultDocs.map((doc, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleDocCheck(idx)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                          checkedDocs[idx]
                            ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedDocs[idx]}
                          onChange={() => {}} // handled by parent div
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className={`text-xs font-semibold ${checkedDocs[idx] ? 'line-through text-slate-500' : ''}`}>
                          {doc}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Tip: You can fetch authentic digital copies directly via DigiLocker using your Aadhaar.</span>
                  </div>
                </div>
              )}

              {/* Step 2 Content: Profile Verification */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Review your details against the scheme's formal requirement:
                  </p>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Citizen Domicile:</span>
                      <span className="font-bold text-slate-800">{userProfile?.state || 'Uttar Pradesh'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Evaluated Age:</span>
                      <span className="font-bold text-slate-800">{userProfile?.age || 20} Years</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Family Income:</span>
                      <span className="font-bold text-blue-700">₹{Number(userProfile?.annual_income || 250000).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Category / Status:</span>
                      <span className="font-bold text-slate-800">{userProfile?.category || 'General'} • {userProfile?.occupation || 'Student'}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                    ✓ All your profile parameters conform to the basic ceiling for this scheme.
                  </div>
                </div>
              )}

              {/* Step 3 Content: Scanning & Formatting */}
              {activeStep === 3 && (
                <div className="space-y-3 text-xs text-slate-700">
                  <p className="font-semibold text-slate-800">
                    Scanning Guidelines for Government Portals:
                  </p>
                  <ul className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Scan certificates in color at 150–200 DPI resolution.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Ensure file size is strictly under <strong>200 KB</strong> (PDF or JPG).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Your passport photograph should be recent with a plain light background.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Step 4 Content: Application Steps */}
              {activeStep === 4 && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600">
                    Log in to the official portal and follow these systematic instructions:
                  </p>
                  <div className="space-y-2">
                    {(scheme?.application_steps || [
                      "Create citizen account using Aadhaar OTP verification.",
                      "Fill educational / family details and select scheme tier.",
                      "Upload self-attested documents.",
                      "Submit draft for institutional or district verification."
                    ]).map((instruction, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-slate-800 font-medium">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 Content: Review & Verification */}
              {activeStep === 5 && (
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                    <p className="font-bold mb-1">Pre-Submission Quality Check:</p>
                    <p>Verify that your bank account is Aadhaar seeded for Direct Benefit Transfer (DBT). Incorrect bank IFSC will stall disbursement.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                      <span>Name spelling exactly matches Aadhaar Card</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                      <span>Bank Passbook clearly displays Account No. and IFSC</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 6 Content: Final Portal Visit */}
              {activeStep === 6 && (
                <div className="space-y-4 text-xs text-slate-700">
                  <p>
                    You are 100% prepared! Proceed to the official portal to complete your authenticated submission:
                  </p>
                  <div className="p-5 bg-blue-900 text-white rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 uppercase text-[11px]">Official Destination</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-base font-bold font-display">{schemeName}</p>
                    <p className="text-blue-200 text-xs font-mono break-all">{portalUrl}</p>
                    <a
                      href={portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-950 font-bold rounded-lg text-xs shadow hover:bg-blue-50 transition"
                    >
                      <span>Open Official Portal in New Window</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Action Buttons for Step */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenBot}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Ask Sahayak Bot about this step
                </button>

                <button
                  type="button"
                  onClick={() => handleStepComplete(activeStep)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{activeStep === 6 ? "Finish Application Walkthrough" : "Complete & Next Step →"}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Simulated Completion Modal */}
      {showSimulatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Application Readiness Complete!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You have completed all 6 preparation steps for <strong>{schemeName}</strong>. Your documents are verified and formatted according to government guidelines.
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 text-left">
              <strong>Demo Notice:</strong> In this hackathon MVP, application guidance is simulated for privacy and safety. No actual data was transmitted to government servers.
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSimulatedModal(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Close Walkthrough
              </button>
              <a
                href={portalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center justify-center gap-1"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
