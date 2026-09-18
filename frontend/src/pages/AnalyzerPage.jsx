import React from 'react';
import Predictor from '../components/Predictor';
import { useLanguage } from '../i18n/LanguageContext';

export default function AnalyzerPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {t('analyzerTitle')}
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {t('analyzerSubtitle')}
        </p>
      </div>

      {/* COMPLETE WORKING PREDICTOR EXPERIENCE */}
      <Predictor />
    </div>
  );
}
