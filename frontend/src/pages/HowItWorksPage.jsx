import React from 'react';
import { Upload, Sliders, Eye, CheckCircle2, HelpCircle, ArrowRight, Sun, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function HowItWorksPage({ navigate }) {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('step1FullTitle'),
      description: t('step1FullDesc'),
      icon: Upload,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      num: '02',
      title: t('step2FullTitle'),
      description: t('step2FullDesc'),
      icon: Eye,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      num: '03',
      title: t('step3FullTitle'),
      description: t('step3FullDesc'),
      icon: CheckCircle2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
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
    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {t('howItWorksPageTitle')}
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {t('howItWorksPageSubtitle')}
        </p>
      </section>

      {/* 3 STEPS GRID */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('processTitle')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {t('processSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                      STEP {step.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl border ${step.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOR BETTER RESULTS */}
      <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 space-y-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Sun className="w-4 h-4" /> Guidance
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('forBetterResultsTitle')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {t('forBetterResultsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 text-slate-300 text-xs sm:text-sm font-medium flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* UNDERSTANDING CONFIDENCE */}
      <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> Explanation
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('confidenceMeaningTitle')}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('confidenceMeaningDesc')}
        </p>

        <div className="pt-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/analyzer')}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>{t('btnTryAnalyzer')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
