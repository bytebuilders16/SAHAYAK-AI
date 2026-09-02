import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoLoginModal from './components/DemoLoginModal';

// Pages
import LandingPage from './pages/LandingPage';
import EligibilityWizard from './pages/EligibilityWizard';
import ResultsPage from './pages/ResultsPage';
import SchemeDetailPage from './pages/SchemeDetailPage';
import ApplicationGuidePage from './pages/ApplicationGuidePage';
import ChatbotPage from './pages/ChatbotPage';
import SchemesDirectoryPage from './pages/SchemesDirectoryPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

// API Service
import { getSchemes } from './services/api';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load schemes from backend on initial mount
  useEffect(() => {
    async function loadInitialSchemes() {
      const data = await getSchemes();
      if (data && data.length > 0) {
        setSchemes(data);
      }
    }
    loadInitialSchemes();
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartWizard = () => {
    navigateTo('wizard');
  };

  const handleResultsReady = (data) => {
    setResultsData(data);
    navigateTo('results');
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    navigateTo('detail');
  };

  const handleStartGuidance = (scheme) => {
    setSelectedScheme(scheme);
    navigateTo('guide');
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    navigateTo('schemes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <LandingPage
            onStartWizard={handleStartWizard}
            onOpenBot={() => navigateTo('bot')}
            onSelectCategory={handleSelectCategory}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}

        {activePage === 'how-it-works' && (
          <AboutPage
            onStartWizard={handleStartWizard}
            onOpenBot={() => navigateTo('bot')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onStartWizard={handleStartWizard}
            onOpenBot={() => navigateTo('bot')}
          />
        )}

        {activePage === 'wizard' && (
          <EligibilityWizard
            onResultsReady={handleResultsReady}
          />
        )}

        {activePage === 'results' && (
          <ResultsPage
            resultsData={resultsData}
            onEditProfile={() => navigateTo('wizard')}
            onViewDetails={handleViewDetails}
            onStartGuidance={handleStartGuidance}
            onOpenBot={() => navigateTo('bot')}
          />
        )}

        {activePage === 'schemes' && (
          <SchemesDirectoryPage
            schemes={schemes}
            onViewDetails={handleViewDetails}
            onStartGuidance={handleStartGuidance}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activePage === 'detail' && (
          <SchemeDetailPage
            scheme={selectedScheme}
            onBack={() => navigateTo(resultsData ? 'results' : 'schemes')}
            onStartGuidance={handleStartGuidance}
          />
        )}

        {activePage === 'guide' && (
          <ApplicationGuidePage
            scheme={selectedScheme}
            onBack={() => navigateTo('detail')}
            onOpenBot={() => navigateTo('bot')}
          />
        )}

        {activePage === 'bot' && (
          <ChatbotPage
            onSelectScheme={handleViewDetails}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            allSchemes={schemes}
            onStartWizard={handleStartWizard}
            onOpenBot={() => navigateTo('bot')}
            onViewDetails={handleViewDetails}
            onStartGuidance={handleStartGuidance}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}
      </main>

      <Footer onNav={navigateTo} />

      {/* Simulated Login Modal */}
      <DemoLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          navigateTo('dashboard');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
