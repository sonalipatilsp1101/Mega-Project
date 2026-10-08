import React, { useState } from 'react';
import { EcgCanvas } from '../components/EcgCanvas';
import { HeartPulse, AlertCircle, Play, Pause, Volume2 } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const EcgMonitorView: React.FC = () => {
  const { triggerAudioBeep } = useAmbulance();
  const [selectedLead, setSelectedLead] = useState<string>('Lead II');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const leadsList = ['Lead I', 'Lead II', 'Lead III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Title & Diagnostic Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-400" /> 12-Lead Diagnostic ECG Monitor
          </h1>
          <p className="text-xs text-slate-400">High-fidelity electro-cardiogram rhythm analysis stream & ST-segment telemetry</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              isPaused
                ? 'bg-amber-600/20 text-amber-400 border-amber-500/40'
                : 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            {isPaused ? 'Resume Sweep' : 'Freeze Waveform'}
          </button>

          <button
            onClick={() => triggerAudioBeep('ecg')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" /> Test Beep Sound
          </button>
        </div>
      </div>

      {/* Main Waveform Display */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Top Control Settings Bar */}
        <div className="flex flex-wrap justify-between items-center bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-medium">Active Lead:</span>
            <div className="flex flex-wrap gap-1">
              {leadsList.map((lead) => (
                <button
                  key={lead}
                  onClick={() => setSelectedLead(lead)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedLead === lead
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {lead}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Sweep Speed:</span>
              <span className="text-emerald-400 font-bold bg-slate-800 px-2 py-0.5 rounded">25 mm/s</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-medium">Gain:</span>
              <span className="text-purple-400 font-bold bg-slate-800 px-2 py-0.5 rounded">10 mm/mV</span>
            </div>
          </div>
        </div>

        {/* Live Canvas Monitor */}
        <div className="relative">
          <EcgCanvas height={280} color="#22c55e" speed={1.5} />
          {isPaused && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full font-bold text-xs shadow-lg uppercase tracking-wider">
                Waveform Frozen for Inspection
              </span>
            </div>
          )}
        </div>

        {/* Bottom Diagnostics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-2">
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Heart Rate (PR):</span>
            <span className="text-emerald-400 font-bold text-base">0 bpm</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">QRS Interval:</span>
            <span className="text-slate-200 font-bold">0 ms</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">QTc Interval:</span>
            <span className="text-slate-200 font-bold">0 ms</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center gap-2 text-slate-400">
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-semibold text-[11px]">Telemetry Baseline Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
