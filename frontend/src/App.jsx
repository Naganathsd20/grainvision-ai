import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/analyzer':
        return <AnalyzerPage navigate={navigate} />;
      case '/how-it-works':
        return <HowItWorksPage navigate={navigate} />;
      case '/about':
        return <AboutPage navigate={navigate} />;
      case '/':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#f8faf7] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-800">
        {/* GLOBAL NAVBAR */}
        <Header currentPath={currentPath} navigate={navigate} />

        {/* MAIN PAGE CONTAINER */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {renderPage()}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer currentPath={currentPath} navigate={navigate} />
      </div>
    </LanguageProvider>
  );
}
