import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { predictRiceGrain } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import AboutRiceSection from './AboutRiceSection';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function Predictor() {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fileInputRef = useRef(null);

  const RICE_CLASSES_INFO = {
    Arborio: t('arborioDesc'),
    Basmati: t('basmatiDesc'),
    'HMT (Sona Masuri)': t('hmtDesc'),
    HMT: t('hmtDesc'),
    Ipsala: t('ipsalaDesc'),
    Jasmine: t('jasmineDesc'),
    Jhili: t('jhiliDesc'),
    Karacadag: t('karacadagDesc'),
    Massori: t('masuriDesc'),
    Masuri: t('masuriDesc'),
    SonaMasoori: t('hmtDesc')
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateAndSetFile = (file) => {
    setErrorMessage(null);
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setErrorMessage(t('errInvalidFormat'));
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(t('errFileSize'));
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPredictionResult(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage(t('errSelectImage'));
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await predictRiceGrain(selectedFile);
      setPredictionResult(response);
    } catch (err) {
      setErrorMessage(err.message || t('errServerConnect'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPredictionResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm space-y-8">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('analyzerTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t('analyzerSubtitle')}
          </p>
        </div>

        {selectedFile && (
          <button
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold border border-slate-300 transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-slate-600" />
            <span>{t('btnReset')}</span>
          </button>
        )}
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-900">{t('analysisNoticeTitle')}</p>
              <p className="text-xs sm:text-sm text-rose-700 mt-0.5 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 hover:text-rose-800 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN TWO-COLUMN WORKFLOW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* COLUMN 1: UPLOAD & PREVIEW AREA */}
        <div className="space-y-5">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all min-h-[340px] relative ${
              dragActive
                ? 'border-emerald-500 bg-emerald-50/80'
                : selectedFile
                ? 'border-slate-300 bg-slate-50/50'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/30'
            }`}
          >
            {previewUrl ? (
              <div className="w-full space-y-4">
                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center bg-slate-100 rounded-xl p-3 border border-slate-200 overflow-hidden shadow-inner">
                  <img
                    src={previewUrl}
                    alt="Rice grain sample preview"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-white hover:bg-slate-100 text-slate-700 p-2 rounded-lg text-xs font-mono border border-slate-300 shadow-sm transition-colors"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between px-4 py-3 bg-slate-100 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate font-semibold text-slate-800">{selectedFile.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-mono font-medium">
                      {t('imageReady')}
                    </span>
                  </div>
                  <span className="shrink-0 text-slate-500 font-mono text-xs">{formatFileSize(selectedFile.size)}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200/80">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl">
                  {t('uploadDropText')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-sm leading-relaxed">
                  {t('uploadOrText')}
                </p>

                <div className="mt-6 flex flex-col items-center gap-2.5">
                  <label className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors shadow-sm flex items-center gap-2">
                    <span>{t('btnChoosePhoto')}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    {t('supportedFormats')}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Predict Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-sm ${
              !selectedFile || loading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{t('analyzingText')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{t('btnIdentifyRice')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Educational Rice Info Section */}
          {predictionResult && (
            <AboutRiceSection predictedClass={predictionResult.prediction.class} />
          )}
        </div>

        {/* COLUMN 2: INFERENCE RESULTS & PROBABILITIES */}
        <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between space-y-6">
          {predictionResult ? (
            <div className="space-y-6">
              {/* Prediction Result Header Card */}
              <div className="p-6 rounded-xl bg-white border-2 border-emerald-500/70 shadow-sm relative overflow-hidden space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('identifiedVariety')}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {t('matchConfidence')}: {(predictionResult.prediction.confidence * 100).toFixed(2)}%
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {predictionResult.prediction.class}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {RICE_CLASSES_INFO[predictionResult.prediction.class] || 'Commercial rice grain variety.'}
                  </p>
                </div>
              </div>

              {/* Class Probabilities Bar Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    {t('matchBreakdownHeader')}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">{t('supportedCount')}</span>
                </div>

                <div className="space-y-2 pt-1">
                  {Object.entries(predictionResult.probabilities).map(([clsName, probValue]) => {
                    const isTop = clsName === predictionResult.prediction.class;
                    const pct = (probValue * 100).toFixed(2);

                    return (
                      <div
                        key={clsName}
                        className={`p-3 rounded-xl border transition-all ${
                          isTop
                            ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={isTop ? 'text-slate-900 font-bold' : 'text-slate-700'}>
                              {clsName}
                            </span>
                            {isTop && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                TOP MATCH
                              </span>
                            )}
                          </div>
                          <span className={`font-mono text-xs ${isTop ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                            {pct}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isTop
                                ? 'bg-emerald-600'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${Math.max(probValue * 100, 1)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reset Action */}
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors border border-slate-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                  <span>{t('btnReset')}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Idle Placeholder Box */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-slate-400 flex items-center justify-center border border-slate-200 shadow-sm">
                <Layers className="w-8 h-8 text-slate-400" />
              </div>

              <div className="max-w-xs space-y-1">
                <h4 className="font-bold text-slate-800 text-lg">
                  {t('awaitingTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t('awaitingSubtitle')}
                </p>
              </div>

              <div className="pt-4 w-full border-t border-slate-200 text-xs text-slate-500 space-y-2">
                <div className="flex justify-between items-center">
                  <span>{t('supportedVarietiesLabel')}</span>
                  <span className="text-emerald-700 font-semibold">{t('supportedVarietiesValue')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('analysisModeLabel')}</span>
                  <span className="text-slate-700 font-medium">{t('analysisModeValue')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Academic / Real-world Product Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed">
            {t('disclaimerText')}
          </div>
        </div>
      </div>
    </section>
  );
}
