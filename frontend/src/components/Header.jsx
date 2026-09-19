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
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand logo & title */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <Wheat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                {t('brandTitle')}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-medium">
              {t('brandSubtitle')}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-semibold border border-emerald-200/60'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Language Switcher & CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 animate-fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                      lang === l.code
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('/analyzer')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
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
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-700 text-xs font-semibold flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase">{lang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-between ${
                      lang === l.code ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'
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
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-md animate-fade-in">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`block w-full text-left text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-semibold border border-emerald-200/60'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </button>
            );
          })}

          {/* Mobile Language Choices */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-around">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  lang === l.code
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {l.nativeName}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('/analyzer')}
            className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{t('ctaAnalyze')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
