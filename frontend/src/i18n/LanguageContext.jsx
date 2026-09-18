import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from './translations';

const STORAGE_KEY = 'grainvision_language';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'kn')) {
        return saved;
      }
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return 'en';
  });

  const changeLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'hi' || newLang === 'kn') {
      setLang(newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch (e) {
        console.warn('localStorage write error:', e);
      }
    }
  };

  const t = (key) => {
    const currentDict = translations[lang] || translations.en;
    return currentDict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
