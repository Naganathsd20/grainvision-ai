import React from 'react';
import { BookOpen, Sparkles, Sprout, Utensils, Tag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getRiceInfo } from '../i18n/riceData';

export default function AboutRiceSection({ predictedClass }) {
  const { lang, t } = useLanguage();
  const info = getRiceInfo(predictedClass, lang);

  if (!info) return null;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-sm transition-all animate-fade-in">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {t('aboutThisRiceTitle')}: <span className="text-emerald-700">{predictedClass}</span>
          </h3>
        </div>
      </div>

      {/* OVERVIEW DESCRIPTION */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
        {info.about}
      </p>

      {/* CHARACTERISTICS CARDS */}
      {info.characteristics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('grainTypeLabel')}
            </span>
            <span className="text-xs font-semibold text-slate-800 mt-1 block">
              {info.characteristics.grainType}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('textureLabel')}
            </span>
            <span className="text-xs font-semibold text-slate-800 mt-1 block">
              {info.characteristics.texture}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('aromaLabel')}
            </span>
            <span className="text-xs font-semibold text-slate-800 mt-1 block">
              {info.characteristics.aroma}
            </span>
          </div>
        </div>
      )}

      {/* WHY IT'S SPECIAL */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
        <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          {t('whySpecialTitle')}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {info.whySpecial}
        </p>
      </div>

      {/* HOW IT'S COMMONLY GROWN */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
        <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider">
          <Sprout className="w-3.5 h-3.5 text-emerald-600" />
          {t('howGrownTitle')}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {info.growing}
        </p>
      </div>

      {/* COMMON USES & POPULAR DISHES */}
      <div className="space-y-3 pt-1">
        {info.commonUses && info.commonUses.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              {t('commonUsesTitle')}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {info.commonUses.map((use, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs border border-slate-200 font-medium"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}

        {info.popularDishes && info.popularDishes.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              {t('popularDishesTitle')}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {info.popularDishes.map((dish, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200/80 font-medium"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
