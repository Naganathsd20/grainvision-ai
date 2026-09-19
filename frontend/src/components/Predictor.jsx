import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  FileImage,
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
    Masuri: t('masuriDesc'),
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

    // Validate file extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setErrorMessage(t('errInvalidFormat'));
      return;
    }

    // Validate file size (10 MB limit)
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
    <section className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-2xl space-y-8">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {t('analyzerTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1.5">
            {t('analyzerSubtitle')}
          </p>
        </div>

        {selectedFile && (
          <button
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('btnReset')}</span>
          </button>
        )}
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-300">{t('analysisNoticeTitle')}</p>
              <p className="text-xs sm:text-sm text-rose-400/90 mt-0.5 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-200 p-1"
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
            className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center transition-all min-h-[340px] relative ${
              dragActive
                ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
                : selectedFile
                ? 'border-slate-700 bg-slate-900/60'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
            }`}
          >
            {previewUrl ? (
              <div className="w-full space-y-4">
                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center bg-slate-950/80 rounded-2xl p-3 border border-slate-800/80 overflow-hidden shadow-inner">
                  <img
                    src={previewUrl}
                    alt="Rice grain sample preview"
                    className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-xl text-xs font-mono border border-slate-700 shadow-md transition-colors"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs sm:text-sm font-sans text-slate-400">
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate text-slate-200 font-semibold">{selectedFile.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      {t('imageReady')}
                    </span>
                  </div>
                  <span className="shrink-0 text-slate-400 font-mono text-xs">{formatFileSize(selectedFile.size)}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20 shadow-inner">
                  <Upload className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-slate-100 text-xl sm:text-2xl">
                  {t('uploadDropText')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
                  {t('uploadOrText')}
                </p>

                <div className="mt-6 flex flex-col items-center gap-2.5">
                  <label className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                    <span>{t('btnChoosePhoto')}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-slate-400 font-medium">
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
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-3 shadow-xl ${
              !selectedFile || loading
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700/50'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-[0.99]'
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
        <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6">
          {predictionResult ? (
            <div className="space-y-6">
              {/* Prediction Result Header Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-sans text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> {t('identifiedVariety')}
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      {t('matchConfidence')}: {(predictionResult.prediction.confidence * 100).toFixed(2)}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {predictionResult.prediction.class}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {RICE_CLASSES_INFO[predictionResult.prediction.class] || 'Commercial rice grain variety.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Class Probabilities Bar Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    {t('matchBreakdownHeader')}
                  </h4>
                  <span className="text-xs text-slate-400">{t('supportedCount')}</span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {Object.entries(predictionResult.probabilities).map(([clsName, probValue]) => {
                    const isTop = clsName === predictionResult.prediction.class;
                    const pct = (probValue * 100).toFixed(2);

                    return (
                      <div
                        key={clsName}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isTop
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-100 ring-1 ring-emerald-500/30'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
                          <div className="flex items-center gap-2">
                            <span className={isTop ? 'text-white font-bold' : 'text-slate-300'}>
                              {clsName}
                            </span>
                            {isTop && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                TOP MATCH
                              </span>
                            )}
                          </div>
                          <span className={`font-mono text-xs ${isTop ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                            {pct}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800/60">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isTop
                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-sm shadow-emerald-500/50'
                                : 'bg-slate-700'
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
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-colors border border-slate-700 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('btnReset')}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Idle Placeholder Box */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-slate-800/80 text-slate-400 flex items-center justify-center border border-slate-700/60 shadow-inner">
                <Layers className="w-10 h-10 text-slate-400" />
              </div>

              <div className="max-w-xs space-y-1.5">
                <h4 className="font-bold text-slate-200 text-lg sm:text-xl">
                  {t('awaitingTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {t('awaitingSubtitle')}
                </p>
              </div>

              <div className="pt-5 w-full border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
                <div className="flex justify-between items-center">
                  <span>{t('supportedVarietiesLabel')}</span>
                  <span className="text-emerald-400 font-medium">{t('supportedVarietiesValue')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('analysisModeLabel')}</span>
                  <span className="text-slate-300 font-medium">{t('analysisModeValue')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Academic / Real-world Product Disclaimer */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
            {t('disclaimerText')}
          </div>
        </div>
      </div>
    </section>
  );
}
