import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, X, Radio } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const VoiceCallModal: React.FC = () => {
  const { showVoiceCallModal, setShowVoiceCallModal } = useAmbulance();
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (showVoiceCallModal) {
      setSeconds(0);
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showVoiceCallModal]);

  if (!showVoiceCallModal) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-blue-500/40 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl relative">
        <button
          onClick={() => setShowVoiceCallModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pulse Ring Profile Avatar */}
        <div className="relative w-20 h-20 mx-auto my-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=200"
            alt="Paramedic Sarah"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 relative z-10"
          />
        </div>

        <h3 className="text-lg font-bold text-white">Ambulance Unit AMB-108</h3>
        <p className="text-xs text-emerald-400 font-semibold mt-0.5 flex items-center justify-center gap-1">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Voice Link Active • {formatTime(seconds)}</span>
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mt-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all cursor-pointer ${
              isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowVoiceCallModal(false)}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-900/50 transition-all transform hover:scale-105 cursor-pointer"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button className="bg-slate-800 text-slate-200 p-3.5 rounded-full hover:bg-slate-700 cursor-pointer">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
