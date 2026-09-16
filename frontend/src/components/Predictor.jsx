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

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const RICE_CLASSES_INFO = {
  Arborio: 'Short, plump Italian rice variety commonly used in risotto.',
  Basmati: 'Long, slender aromatic rice originating from the Indian subcontinent.',
  Ipsala: 'Medium-to-long grain rice grown extensively in Thrace, Turkey.',
  Jasmine: 'Long-grain aromatic variety native to Thailand.',
  Karacadag: 'Medium-grain local Turkish rice known for high water absorption.',
};

export default function Predictor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fileInputRef = useRef(null);

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
      setErrorMessage(`Please upload a valid image file (${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}).`);
      return;
    }

    // Validate file size (10 MB limit)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`Image size exceeds the ${MAX_FILE_SIZE_MB} MB limit (${formatFileSize(file.size)}).`);
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
      setErrorMessage('Please select a rice grain image first.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await predictRiceGrain(selectedFile);
      setPredictionResult(response);
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during analysis.');
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
    <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-2xl space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Phase 8 — Live Prediction Interface
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rice Grain Quality Analyzer
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Upload a digital rice sample image to classify grain variety and view deep learning confidence probabilities.
          </p>
        </div>

        {selectedFile && (
          <button
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2 shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Upload</span>
          </button>
        )}
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-300">Analysis Error</p>
              <p className="text-xs text-rose-400/90 mt-0.5 leading-relaxed">{errorMessage}</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* COLUMN 1: UPLOAD & PREVIEW AREA */}
        <div className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all min-h-[320px] relative ${
              dragActive
                ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
                : selectedFile
                ? 'border-slate-700 bg-slate-900/60'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
            }`}
          >
            {previewUrl ? (
              <div className="w-full space-y-4">
                <div className="relative h-64 w-full flex items-center justify-center bg-slate-950/80 rounded-xl p-2 border border-slate-800/80 overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Rice sample grain preview"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-xl text-xs font-mono border border-slate-700 shadow-md transition-colors"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between px-3 py-2 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileImage className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate text-slate-200 font-sans font-medium">{selectedFile.name}</span>
                  </div>
                  <span className="shrink-0 text-slate-400">{formatFileSize(selectedFile.size)}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 shadow-inner">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-100 text-lg sm:text-xl">
                  Drag & Drop Rice Grain Image
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
                  Upload a clear digital image of a single or macro rice grain sample for CNN classification.
                </p>

                <div className="mt-6 flex flex-col items-center gap-2">
                  <label className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                    <span>Browse Image File</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Supported: JPG, PNG, WEBP (Max {MAX_FILE_SIZE_MB} MB)
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Predict Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-xl ${
              !selectedFile || loading
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700/50'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Analyzing Grain Sample...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Grain</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* COLUMN 2: INFERENCE RESULTS & PROBABILITIES */}
        <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-6">
          {predictionResult ? (
            <div className="space-y-6">
              {/* Prediction Result Header Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Primary Classification
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      Confidence: {(predictionResult.prediction.confidence * 100).toFixed(2)}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {predictionResult.prediction.class}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {RICE_CLASSES_INFO[predictionResult.prediction.class] || 'Commercial rice grain variety.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Class Probabilities Bar Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Probability Distribution (5 Classes)
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">Softmax Output</span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {Object.entries(predictionResult.probabilities).map(([clsName, probValue]) => {
                    const isTop = clsName === predictionResult.prediction.class;
                    const pct = (probValue * 100).toFixed(2);

                    return (
                      <div
                        key={clsName}
                        className={`p-3 rounded-xl border transition-all ${
                          isTop
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-100 ring-1 ring-emerald-500/30'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={isTop ? 'text-white font-bold' : 'text-slate-300'}>
                              {clsName}
                            </span>
                            {isTop && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                TOP
                              </span>
                            )}
                          </div>
                          <span className={`font-mono ${isTop ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                            {pct}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800/60">
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
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Analyze Another Image</span>
                </button>
              </div>
            </div>
          ) : (
            /* Idle Placeholder Box */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center border border-slate-700/60">
                <Layers className="w-8 h-8 text-slate-400" />
              </div>

              <div className="max-w-xs space-y-1">
                <h4 className="font-bold text-slate-200 text-base">
                  Awaiting Image Analysis
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select a rice grain sample image on the left and click <strong>Analyze Grain</strong> to view predictions.
                </p>
              </div>

              <div className="pt-4 w-full border-t border-slate-800/60 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="text-emerald-400 font-semibold">MobileNetV2 Transfer Learning</span>
                </div>
                <div className="flex justify-between">
                  <span>API Endpoint:</span>
                  <span className="text-cyan-400 font-semibold">POST /api/predict</span>
                </div>
              </div>
            </div>
          )}

          {/* Academic Project Note */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
            Prediction generated by the GrainVision AI MobileNetV2 deep learning model.
          </div>
        </div>
      </div>
    </section>
  );
}
