import React from 'react';
import { CheckCircle2, Shield, Activity, Radio, Cpu, Star, X } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

const keyFeatures = [
  'Real-time Vital Monitoring',
  'Live ECG & Health Parameters',
  'GPS Tracking & Route Monitoring',
  'Treatment & Procedure Updates',
  'Voice / Video Communication',
  'Alerts & Notifications',
  'Patient History & Reports',
  'Secure Data Transmission',
];

export const InfoBanner: React.FC = () => {
  const { showInfoBanner, setShowInfoBanner } = useAmbulance();

  if (!showInfoBanner) return null;

  return (
    <div className="w-80 bg-[#0f172a] border-r border-slate-800 p-5 flex flex-col justify-between overflow-y-auto shrink-0 shadow-xl relative">
      <button
        onClick={() => setShowInfoBanner(false)}
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 p-1 rounded-md"
        title="Hide Overview Banner"
      >
        <X className="w-4 h-4" />
      </button>

      <div>
        {/* Title & Badge */}
        <div className="mb-6">
          <div className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>Smart Emergency</span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-100 uppercase tracking-tight leading-tight">
            Ambulance System
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-Time Patient Monitoring & Remote Assistance System
          </p>
        </div>

        {/* Software Description */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Radio className="w-4 h-4" />
            <span>SOFTWARE DESCRIPTION</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            The Smart Emergency Ambulance System is a real-time patient monitoring and remote assistance platform that connects the ambulance with the hospital.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            It collects live patient vitals, location, and treatment data from the ambulance and transmits it securely to the hospital dashboard.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Doctors can monitor the patient's condition in real-time, provide instructions, and prepare for further treatment in advance.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Star className="w-4 h-4" />
            <span>KEY FEATURES</span>
          </div>
          <ul className="space-y-2.5">
            {keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-center space-x-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Security Badge */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-1.5 text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Encrypted Telemetry</span>
        </div>
        <div className="flex items-center space-x-1 text-blue-400 font-medium">
          <Activity className="w-3.5 h-3.5" />
          <span>Live 5G Feed</span>
        </div>
      </div>
    </div>
  );
};
