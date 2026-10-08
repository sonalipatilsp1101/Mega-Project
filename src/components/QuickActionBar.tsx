import React from 'react';
import { Mic, MessageSquare, AlertTriangle } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const QuickActionBar: React.FC = () => {
  const {
    setShowVoiceCallModal,
    setShowMessageDrawer,
    setShowSosModal,
  } = useAmbulance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
      {/* 1. Start Voice Call (Blue) */}
      <button
        onClick={() => setShowVoiceCallModal(true)}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2.5 shadow-lg shadow-blue-950/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
      >
        <Mic className="w-4 h-4 fill-white/20" />
        <span className="tracking-wide">Start Voice Call (Intercom)</span>
      </button>

      {/* 2. Send Message (Purple) */}
      <button
        onClick={() => setShowMessageDrawer(true)}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2.5 shadow-lg shadow-purple-950/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 fill-white/20" />
        <span className="tracking-wide">Send Message</span>
      </button>

      {/* 3. S.O.S Alert (Red Pulsing) */}
      <button
        onClick={() => setShowSosModal(true)}
        className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2.5 shadow-lg shadow-red-950/40 transition-all transform hover:-translate-y-0.5 sos-btn-pulse cursor-pointer"
      >
        <AlertTriangle className="w-4 h-4 fill-white/20" />
        <span className="tracking-wide uppercase">S.O.S Alert</span>
      </button>
    </div>
  );
};
