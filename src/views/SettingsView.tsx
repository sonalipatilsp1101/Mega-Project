import React, { useState } from 'react';
import { Settings, ShieldCheck, Server, Save, Radio } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [serverIp, setServerIp] = useState('192.168.10.45:8080');
  const [sampleRate, setSampleRate] = useState('500 Hz');
  const [autoSync, setAutoSync] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const hardwareDevices = [
    { name: '12-Lead Diagnostic ECG Lead', type: 'Bluetooth 5.2', status: 'Connected', battery: '94%' },
    { name: 'Continuous SpO2 Pulse Oximeter', type: 'Wireless Telemetry', status: 'Connected', battery: '88%' },
    { name: 'NIBP Automated Cuff Monitor', type: 'Bluetooth 5.0', status: 'Connected', battery: '91%' },
    { name: 'Vehicle 5G Satellite Telemetry Hub', type: '5G Dual SIM Gateway', status: 'Online', battery: '100% (Vehicle Powered)' },
  ];

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-400" /> System Settings & Hardware Telemetry Config
          </h1>
          <p className="text-xs text-slate-400">Manage wireless sensor connections, server API gateways, and audio alert preferences</p>
        </div>

        {isSaved && (
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Settings Saved Successfully
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Server & Telemetry Settings */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-5">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Server className="w-4 h-4 text-blue-400" /> Hospital Central Gateway & Telemetry Stream
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium block">Hospital Telemetry Server IP / Endpoint</label>
                <input
                  type="text"
                  value={serverIp}
                  onChange={(e) => setServerIp(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium block">ECG Telemetry Sample Frequency</label>
                <select
                  value={sampleRate}
                  onChange={(e) => setSampleRate(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="250 Hz">250 Hz (Standard Rate)</option>
                  <option value="500 Hz">500 Hz (High Resolution)</option>
                  <option value="1000 Hz">1000 Hz (Diagnostic HQ)</option>
                </select>
              </div>

              <div className="space-y-1.5 col-span-2">
                <label className="flex items-center space-x-3 text-slate-300 cursor-pointer bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                    className="accent-blue-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Enable Automatic Live Vitals Cloud Synchronization to ER Dashboard</span>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/40"
              >
                <Save className="w-4 h-4" /> Save Configuration
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Hardware Sensor Device Status */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Radio className="w-4 h-4 text-emerald-400" /> Connected Medical Sensors
            </h2>

            <div className="space-y-3">
              {hardwareDevices.map((dev, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-white">{dev.name}</strong>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      {dev.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{dev.type}</span>
                    <span>Battery: <strong className="text-slate-200">{dev.battery}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
