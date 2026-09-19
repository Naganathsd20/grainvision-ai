import React from 'react';
import { Sprout } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ClassCard() {
  const { t } = useLanguage();

  const riceClasses = [
    { name: 'Arborio', descKey: 'arborioDesc' },
    { name: 'Basmati', descKey: 'basmatiDesc' },
    { name: 'HMT (Sona Masuri)', descKey: 'hmtDesc' },
    { name: 'Ipsala', descKey: 'ipsalaDesc' },
    { name: 'Jasmine', descKey: 'jasmineDesc' },
    { name: 'Jhili', descKey: 'jhiliDesc' },
    { name: 'Karacadag', descKey: 'karacadagDesc' },
    { name: 'Masuri', descKey: 'masuriDesc' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {t('varietiesTitle')}
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold">
              {t('supportedCount')}
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('varietiesSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
        {riceClasses.map((rice) => (
          <div
            key={rice.name}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  Variety
                </span>
                <Sprout className="w-4 h-4 text-emerald-600" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {rice.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {t(rice.descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
