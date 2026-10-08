import React, { useEffect } from 'react';
import { ShieldAlert, HeartPulse, Stethoscope, X } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const SosModal: React.FC = () => {
  const { showSosModal, setShowSosModal, triggerAudioBeep } = useAmbulance();

  useEffect(() => {
    if (showSosModal) {
      triggerAudioBeep('sos');
    }
  }, [showSosModal, triggerAudioBeep]);

  if (!showSosModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0f172a] border-2 border-red-500/80 rounded-2xl p-6 w-full max-w-md shadow-2xl relative text-center">
        <button
          onClick={() => setShowSosModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pulsing Icon */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-500 sos-btn-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-black text-white uppercase tracking-wider text-red-500">
          EMERGENCY S.O.S ALERT DISPATCH
        </h2>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Critical emergency alert initiated for <span className="font-bold text-white">Rahul Verma</span>. High-priority transit clearance and response teams standing by.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={() => {
              alert('SOS alert dispatch initiated with high priority clearance!');
              setShowSosModal(false);
            }}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-red-950/50 cursor-pointer uppercase tracking-wider"
          >
            <HeartPulse className="w-4 h-4" />
            <span>SOS ALERT DISPATCH</span>
          </button>

          <button
            onClick={() => {
              alert('Trauma ER Bay Reserved.');
              setShowSosModal(false);
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 border border-slate-700 cursor-pointer"
          >
            <Stethoscope className="w-4 h-4 text-blue-400" />
            <span>RESERVE ICU / ER BAY #3</span>
          </button>

          <button
            onClick={() => setShowSosModal(false)}
            className="w-full bg-transparent hover:bg-slate-800/60 text-slate-400 font-medium text-xs py-2 rounded-xl border border-transparent cursor-pointer"
          >
            Dismiss Alert
          </button>
        </div>
      </div>
    </div>
  );
};
