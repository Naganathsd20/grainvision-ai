import React, { useState, useEffect } from 'react';
import { Server, CheckCircle2, XCircle, RefreshCw, Activity, Cpu } from 'lucide-react';

export default function BackendStatus() {
  const [status, setStatus] = useState('loading'); // 'loading', 'connected', 'error'
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latency, setLatency] = useState(null);

  const fetchBackendHealth = async () => {
    setStatus('loading');
    setErrorMsg(null);
    const startTime = performance.now();

    try {
      // Fetch health endpoint from Flask backend
      const response = await fetch('/api/health');
      const endTime = performance.now();
      
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const json = await response.json();
      setLatency(Math.round(endTime - startTime));
      setData(json);
      setStatus('connected');
    } catch (err) {
      console.error('Backend health check failed:', err);
      setErrorMsg(err.message || 'Failed to connect to Flask API server.');
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchBackendHealth();
  }, []);

  return (
    <div id="backend-status-card" className="glass-card rounded-2xl p-6 shadow-xl border border-slate-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              Architecture Connectivity
            </h3>
            <p className="text-sm text-slate-400">Verifying REST API handshake between React and Flask</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          {status === 'loading' && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-sm font-medium">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Connecting to Flask...</span>
            </div>
          )}

          {status === 'connected' && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-semibold">Backend Status: Connected</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-sm font-medium">
              <XCircle className="w-4 h-4" />
              <span>Backend Status: Offline</span>
            </div>
          )}

          <button
            onClick={fetchBackendHealth}
            disabled={status === 'loading'}
            title="Refresh status"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Response Details Body */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/60">
          <div className="text-xs uppercase font-mono text-slate-400 mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Endpoint
          </div>
          <div className="font-mono text-sm text-emerald-400 font-medium">GET /api/health</div>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/60">
          <div className="text-xs uppercase font-mono text-slate-400 mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Target Port
          </div>
          <div className="font-mono text-sm text-cyan-400 font-medium">
            http://localhost:5000 {latency !== null && `(${latency}ms)`}
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/60">
          <div className="text-xs uppercase font-mono text-slate-400 mb-1">Current State</div>
          <div className="text-sm font-medium text-slate-200">
            {data ? data.phase : 'Awaiting connection...'}
          </div>
        </div>
      </div>

      {/* Payload Display */}
      {data && (
        <div className="mt-4 bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
          <div className="text-slate-500 mb-2">// Response from Flask Backend (/api/health)</div>
          <pre className="text-emerald-400/90">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 text-xs text-rose-300">
          <p className="font-semibold mb-1">Connection Error:</p>
          <p>{errorMsg}</p>
          <p className="mt-2 text-slate-400">
            Make sure the Flask server is running on port 5000: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-200">python backend/app.py</code>
          </p>
        </div>
      )}
    </div>
  );
}
