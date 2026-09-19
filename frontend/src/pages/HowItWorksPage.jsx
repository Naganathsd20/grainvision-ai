import React from 'react';
import { Upload, Eye, CheckCircle2, HelpCircle, ArrowRight, Sun, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function HowItWorksPage({ navigate }) {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('step1FullTitle'),
      description: t('step1FullDesc'),
      icon: Upload,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80'
    },
    {
      num: '02',
      title: t('step2FullTitle'),
      description: t('step2FullDesc'),
      icon: Eye,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80'
    },
    {
      num: '03',
      title: t('step3FullTitle'),
      description: t('step3FullDesc'),
      icon: CheckCircle2,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80'
    }
  ];

  const tips = [
    t('tip1'),
    t('tip2'),
    t('tip3'),
    t('tip4'),
    t('tip5'),
    t('tip6')
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t('howItWorksPageTitle')}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {t('howItWorksPageSubtitle')}
        </p>
      </section>

      {/* 3 STEPS GRID */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('processTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('processSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                      STEP {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border ${step.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOR BETTER RESULTS */}
      <section className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Sun className="w-4 h-4 text-emerald-600" /> Guidance
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('forBetterResultsTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('forBetterResultsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* UNDERSTANDING CONFIDENCE */}
      <section className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600" /> Explanation
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('confidenceMeaningTitle')}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('confidenceMeaningDesc')}
        </p>

        <div className="pt-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/analyzer')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <span>{t('btnTryAnalyzer')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
