import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    portalName: "SahayakAI",
    portalSubtitle: "Government Scheme Assistant",
    govInitiative: "National Digital Citizen Empowerment Initiative",
    home: "Home",
    howItWorks: "How It Works",
    schemes: "Schemes",
    about: "About",
    dashboard: "Dashboard",
    askBot: "Ask Sahayak Bot",
    checkEligibility: "Check My Eligibility",
    getStarted: "Get Started",
    login: "Demo Citizen Login",
    logout: "Sign Out",
    welcome: "Welcome",
    
    // Hero
    heroBadge: "AI-Powered Citizen Welfare Discovery",
    heroHeadline: "Find Government Schemes Made For You.",
    heroSubtitle: "Your AI-powered assistant for discovering government benefits, checking eligibility, and getting step-by-step application guidance.",
    heroBtnPrimary: "Check My Eligibility",
    heroBtnSecondary: "Ask SahayakAI",
    heroTrustBanner: "Trusted by Indian citizens • Verified against 10+ major central schemes • 100% Free & Transparent",
    
    // How It Works
    howHeadline: "How SahayakAI Works",
    howSubheadline: "3 Simple steps to access the government benefits you are entitled to",
    step1Title: "1. Share Basic Profile",
    step1Desc: "Provide simple non-sensitive details such as age, state, and occupation in under 2 minutes.",
    step2Title: "2. AI Match Engine",
    step2Desc: "Our verified scheme engine checks criteria across central and state welfare databases.",
    step3Title: "3. Guided Application",
    step3Desc: "Get document checklists, plain-language benefit breakdowns, and official portal links.",

    // Features
    featuresTitle: "Why Indian Citizens Trust SahayakAI",
    feat1Title: "Zero Jargon Explanations",
    feat1Desc: "Complicated government gazettes translated into crisp, actionable points.",
    feat2Title: "Bilingual AI Chatbot",
    feat2Desc: "Chat naturally in English, हिंदी, or Hinglish with our grounded RAG assistant.",
    feat3Title: "Document Readiness Checklist",
    feat3Desc: "Know exactly what papers you need before visiting any portal or CSC centre.",
    feat4Title: "Privacy First & Safe",
    feat4Desc: "No Aadhaar numbers or OTPs stored. We never ask for sensitive credentials.",

    // Categories
    categoriesTitle: "Explore Schemes by Sector",
    catEducation: "Education & Scholarships",
    catHealthcare: "Healthcare & Insurance",
    catHousing: "Housing & Shelter",
    catAgriculture: "Agriculture & Farmers",
    catSocialSecurity: "Social Security & Pension",

    // Eligibility Wizard
    wizardTitle: "Citizen Eligibility Assessment",
    wizardSubtitle: "Answer a few questions to discover tailored schemes you qualify for",
    demoFillBtn: "⚡ Load Hackathon Demo Profile (Student, 20y, UP, ₹2.5L)",
    stepPersonal: "1. Personal Information",
    stepFinancial: "2. Financial & Occupation",
    stepNeeds: "3. Specific Needs",
    stepReview: "4. Verification",
    
    btnNext: "Continue",
    btnBack: "Previous Step",
    btnSubmit: "Find My Schemes",
    
    // Results
    resultsTitle: "🎯 Schemes You May Be Eligible For",
    resultsSubtitle: "Based on your citizen profile assessment",
    matchScore: "Profile Match",
    statusEligible: "Eligible",
    statusPossible: "Possibly Eligible",
    statusNotEligible: "Not Eligible",
    viewDetails: "View Details & Checklist",
    startGuidance: "Start Application Guidance",
    officialPortal: "Visit Official Portal",
    
    // Application Guidance
    guideTitle: "Application Guidance Roadmap",
    guideSubtitle: "Follow these 6 verified steps to submit an error-free application",
    markCompleted: "Mark Step Done",
    stepDone: "Completed",
    
    // Disclaimer
    disclaimerText: "SahayakAI provides informational guidance. Final eligibility and sanction are strictly determined by the respective government department or nodal authority.",
    demoNotice: "Demo Authentication – No real credentials or Aadhaar numbers are required."
  },
  hi: {
    portalName: "सहायकAI",
    portalSubtitle: "सरकारी योजना सहायक",
    govInitiative: "राष्ट्रीय डिजिटल नागरिक सशक्तिकरण पहल",
    home: "होम",
    howItWorks: "यह कैसे काम करता है",
    schemes: "सरकारी योजनाएं",
    about: "हमारे बारे में",
    dashboard: "डैशबोर्ड",
    askBot: "सहायक बॉट से पूछें",
    checkEligibility: "पात्रता जांचें",
    getStarted: "शुरू करें",
    login: "डेमो नागरिक लॉगिन",
    logout: "लॉगआउट",
    welcome: "स्वागत है",
    
    // Hero
    heroBadge: "एआई-संचालित नागरिक कल्याण खोज प्रणाली",
    heroHeadline: "आपके लिए बनाई गई सरकारी योजनाएं खोजें।",
    heroSubtitle: "सरकारी लाभों की खोज, पात्रता जांचने और चरण-दर-चरण आवेदन मार्गदर्शन के लिए आपका एआई-संचालित सहायक।",
    heroBtnPrimary: "मेरी पात्रता जांचें",
    heroBtnSecondary: "सहायकAI से पूछें",
    heroTrustBanner: "भारतीय नागरिकों द्वारा विश्वसनीय • प्रमुख केंद्रीय योजनाओं द्वारा सत्यापित • 100% निःशुल्क",
    
    // How It Works
    howHeadline: "सहायकAI कैसे काम करता है",
    howSubheadline: "उन सरकारी लाभों तक पहुँचने के लिए 3 सरल कदम जिनके आप हकदार हैं",
    step1Title: "1. बुनियादी जानकारी दें",
    step1Desc: "आयु, राज्य और व्यवसाय जैसे सरल गैर-संवेदनशील विवरण 2 मिनट में भरें।",
    step2Title: "2. एआई मिलान इंजन",
    step2Desc: "हमारा सत्यापित योजना इंजन केंद्रीय और राज्य कल्याणकारी डेटाबेस में पात्रता जांचता है।",
    step3Title: "3. निर्देशित आवेदन",
    step3Desc: "दस्तावेज़ चेकलिस्ट, सरल भाषा में लाभ और आधिकारिक पोर्टल लिंक प्राप्त करें।",

    // Features
    featuresTitle: "नागरिक सहायकAI पर भरोसा क्यों करते हैं",
    feat1Title: "सरल भाषा में व्याख्या",
    feat1Desc: "कठिन सरकारी नियमों को समझने योग्य सरल बिंदुओं में प्रस्तुत किया जाता है।",
    feat2Title: "द्विभाषी एआई चैटबॉट",
    feat2Desc: "हमारे सहायक बॉट से हिंदी, English या Hinglish में स्वाभाविक रूप से बात करें।",
    feat3Title: "दस्तावेज़ तैयारी चेकलिस्ट",
    feat3Desc: "पोर्टल या सीएससी केंद्र जाने से पहले ठीक से जानें कि कौन से दस्तावेज चाहिए।",
    feat4Title: "सुरक्षित और गोपनीय",
    feat4Desc: "कोई आधार नंबर या ओटीपी संग्रहीत नहीं होता है। हम कभी गोपनीय जानकारी नहीं मांगते।",

    // Categories
    categoriesTitle: "श्रेणी अनुसार योजनाएं देखें",
    catEducation: "शिक्षा और छात्रवृत्ति",
    catHealthcare: "स्वास्थ्य और बीमा",
    catHousing: "आवास और आश्रय",
    catAgriculture: "कृषि और किसान",
    catSocialSecurity: "सामाजिक सुरक्षा व पेंशन",

    // Eligibility Wizard
    wizardTitle: "नागरिक पात्रता मूल्यांकन",
    wizardSubtitle: "कुछ आसान सवालों के जवाब देकर जानें कि आप किन योजनाओं के पात्र हैं",
    demoFillBtn: "⚡ हैकाथॉन डेमो प्रोफ़ाइल भरें (छात्र, 20 वर्ष, उप्र, ₹2.5 लाख)",
    stepPersonal: "1. व्यक्तिगत जानकारी",
    stepFinancial: "2. वित्तीय व व्यवसाय",
    stepNeeds: "3. विशिष्ट आवश्यकताएं",
    stepReview: "4. सत्यापन",
    
    btnNext: "आगे बढ़ें",
    btnBack: "पिछला चरण",
    btnSubmit: "मेरी योजनाएं खोजें",
    
    // Results
    resultsTitle: "🎯 वे योजनाएं जिनके लिए आप पात्र हो सकते हैं",
    resultsSubtitle: "आपके नागरिक प्रोफ़ाइल मूल्यांकन के आधार पर",
    matchScore: "प्रोफ़ाइल मैच",
    statusEligible: "पात्र (Eligible)",
    statusPossible: "संभावित पात्र (More Info)",
    statusNotEligible: "अपात्र (Not Eligible)",
    viewDetails: "विवरण और दस्तावेज देखें",
    startGuidance: "आवेदन मार्गदर्शन शुरू करें",
    officialPortal: "आधिकारिक पोर्टल पर जाएं",
    
    // Application Guidance
    guideTitle: "आवेदन मार्गदर्शन रोडमैप",
    guideSubtitle: "त्रुटिहीन आवेदन जमा करने के लिए इन 6 चरणों का पालन करें",
    markCompleted: "चरण पूर्ण चिह्नित करें",
    stepDone: "पूर्ण",
    
    // Disclaimer
    disclaimerText: "सहायकAI केवल सूचनात्मक मार्गदर्शन प्रदान करता है। अंतिम पात्रता और मंजूरी संबंधित सरकारी विभाग या प्राधिकरण द्वारा निर्धारित की जाती है।",
    demoNotice: "डेमो प्रमाणीकरण – किसी वास्तविक क्रेडेंशियल या आधार नंबर की आवश्यकता नहीं है।"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
