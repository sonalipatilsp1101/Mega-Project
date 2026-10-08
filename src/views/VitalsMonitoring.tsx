import React from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { Activity, RefreshCw, ShieldCheck, Heart, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const VitalsMonitoring: React.FC = () => {
  const { vitals } = useAmbulance();

  const detailedTelemetryData = [
    { time: '10:00:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
    { time: '10:05:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
    { time: '10:10:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
    { time: '10:15:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
    { time: '10:20:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
    { time: '10:25:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
    { time: '10:30:00', hr: 0, spo2: 0, bpSys: 0, bpDia: 0, rr: 0, temp: 0 },
  ];

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" /> Dedicated Telemetry & Vitals Monitor
          </h1>
          <p className="text-xs text-slate-400">Continuous multi-parameter wireless telemetry stream from Ambulance AMB-108</p>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Telemetry Signal: 98% (5G Low Latency)
          </span>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> Force Calibration
          </button>
        </div>
      </div>

      {/* Grid of Vitals Live Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {vitals.map((v) => (
          <div
            key={v.id}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2 relative overflow-hidden"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">{v.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{v.normalRange}</span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black text-white">{v.value}</span>
              <span className="text-xs font-semibold text-slate-400">{v.unit}</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: typeof v.value === 'number' && v.value > 0 ? '75%' : '0%', backgroundColor: v.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Full-Width Telemetry Charts (Alerts Panel Removed as requested) */}
      <div className="space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Heart className="w-4 h-4 text-emerald-400" /> Heart Rate & Blood Pressure Live Telemetry Waveform
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={detailedTelemetryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 160]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="hr" name="Heart Rate (bpm)" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="bpSys" name="Systolic BP (mmHg)" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bpDia" name="Diastolic BP (mmHg)" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Wind className="w-4 h-4 text-cyan-400" /> Oxygen Saturation (SpO2 %) & Respiratory Rate
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={detailedTelemetryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="spo2" name="SpO2 (%)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="rr" name="Respiratory Rate (rpm)" stroke="#ec4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
