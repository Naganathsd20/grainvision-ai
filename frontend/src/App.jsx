import React, { useState } from 'react';
import Header from './components/Header';
import BackendStatus from './components/BackendStatus';
import ClassCard from './components/ClassCard';
import ArchitecturePreview from './components/ArchitecturePreview';
import { Upload, Sparkles, AlertCircle, Layers, FileCode2, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

const phases = [
  { num: '01', name: 'Project Foundation', status: 'active', current: true },
  { num: '02', name: 'Dataset Preparation', status: 'upcoming', current: false },
  { num: '03', name: 'Data Preprocessing', status: 'upcoming', current: false },
  { num: '04', name: 'Deep Learning Model', status: 'upcoming', current: false },
  { num: '05', name: 'Model Training', status: 'upcoming', current: false },
  { num: '06', name: 'Model Evaluation', status: 'upcoming', current: false },
  { num: '07', name: 'Backend & Prediction API', status: 'upcoming', current: false },
  { num: '08', name: 'Frontend Web Application', status: 'upcoming', current: false },
  { num: '09', name: 'Integration & Testing', status: 'upcoming', current: false },
  { num: '10', name: 'Deployment & Portfolio', status: 'upcoming', current: false },
];

export default function App() {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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
      const file = e.dataTransfer.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 shadow-2xl">
          {/* Subtle decorative background blur */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Deep Learning Portfolio Project • MobileNetV2
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-sans">
              GrainVision <span className="gradient-text">AI</span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 font-light leading-relaxed">
              Intelligent Rice Grain Classification Using Deep Learning
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              An intelligent computer vision system leveraging fine-tuned MobileNetV2 Convolutional Neural Networks (CNN) to automatically categorize 5 commercial rice varieties with confidence scoring.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#backend-status-card"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Check Architecture Status</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#rice-classes"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 flex items-center gap-2"
              >
                <span>Explore Rice Classes</span>
              </a>
            </div>
          </div>
        </section>

        {/* BACKEND CONNECTIVITY STATUS CARD */}
        <section id="backend-status-card">
          <BackendStatus />
        </section>

        {/* DEMO PREVIEW / UPLOAD DROPZONE FOUNDATION */}
        <section className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Classification Interface Preview
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  Phase 1 UI Shell
                </span>
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">
                Frontend image dropzone ready for MobileNetV2 prediction model connection
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dropzone container */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[260px] relative ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-500/5 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
              }`}
            >
              {previewImage ? (
                <div className="relative w-full h-48 flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="Rice sample preview"
                    className="max-h-full max-w-full rounded-xl object-contain border border-slate-800"
                  />
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-2 right-2 bg-slate-900/90 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg text-xs font-mono border border-slate-700"
                  >
                    Clear Image
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h4 className="font-semibold text-slate-200 text-base">
                    Drag and drop rice grain image here
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, or WEBP grain samples</p>
                  <label className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-semibold cursor-pointer border border-slate-700 transition-colors">
                    Browse Files
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </>
              )}
            </div>

            {/* Inference Status Box */}
            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Model Inference Engine
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Pending Phase 4
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-slate-200">Phase 1 Foundation Active</p>
                      <p className="text-slate-400 leading-relaxed">
                        Deep Learning model architecture and prediction endpoints will be integrated in <strong>Phase 4 (Model)</strong> and <strong>Phase 7 (Prediction API)</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 font-mono">Planned Output Schema:</div>
                    <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-slate-400">
                      {`{\n  "class": "Basmati",\n  "confidence": 0.9842,\n  "model": "MobileNetV2 Transfer Learning"\n}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400 font-mono flex items-center justify-between">
                <span>Target Framework: TensorFlow 2.x</span>
                <span className="text-emerald-400">MobileNetV2</span>
              </div>
            </div>
          </div>
        </section>

        {/* TARGET RICE CLASSES GRID */}
        <section id="rice-classes">
          <ClassCard />
        </section>

        {/* ARCHITECTURE PREVIEW PIPELINE */}
        <section>
          <ArchitecturePreview />
        </section>

        {/* PROJECT 10-PHASE ROADMAP TRACKER */}
        <section className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                10-Phase Project Roadmap
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">
                Structured development workflow strictly adhering to academic standards
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Phase 1 of 10 Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {phases.map((p) => (
              <div
                key={p.num}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  p.current
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${p.current ? 'text-emerald-400' : 'text-slate-400'}`}>
                    PHASE {p.num}
                  </span>
                  {p.current && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-semibold mt-1.5 truncate text-slate-200">
                  {p.name}
                </div>
                <div className="text-[10px] font-mono mt-1 text-slate-400">
                  {p.current ? 'Currently Working' : 'Upcoming'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">GrainVision AI</span>
            <span>•</span>
            <span>Intelligent Rice Grain Classification Using Deep Learning</span>
          </div>
          <div className="font-mono text-slate-400">
            Current Status: <span className="text-emerald-400 font-semibold">Phase 1 — Project Foundation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
