import React, { useState } from 'react';
import { Wheat, Menu, X, ArrowRight, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Header({ currentPath, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang, changeLanguage, t, languages } = useLanguage();

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAnalyzer'), path: '/analyzer' },
    { name: t('navHowItWorks'), path: '/how-it-works' },
    { name: t('navAbout'), path: '/about' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
        
        {/* Brand logo & title */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold transition-transform group-hover:scale-105 shrink-0">
            <Wheat className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                {t('brandTitle')} <span className="gradient-text">AI</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t('smartBadge')}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-medium">
              {t('brandSubtitle')}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm lg:text-base font-medium transition-colors relative py-1 ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-300 hover:text-emerald-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full animate-fade-in"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Language Switcher & CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                      lang === l.code
                        ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('/analyzer')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>{t('ctaAnalyze')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Quick Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase">{lang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                      lang === l.code ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 space-y-3.5 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`block w-full text-left text-base font-medium py-1.5 transition-colors ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-300 hover:text-emerald-400'
                }`}
              >
                {link.name}
              </button>
            );
          })}

          {/* Mobile Language Choices */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  lang === l.code
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {l.nativeName}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('/analyzer')}
            className="w-full mt-2 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
          >
            <span>{t('ctaAnalyze')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
