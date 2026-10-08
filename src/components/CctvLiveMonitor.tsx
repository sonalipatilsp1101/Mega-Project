import React, { useState, useEffect } from 'react';
import { Camera, Mic, MicOff, Volume2, VolumeX, Radio, Eye, ShieldCheck } from 'lucide-react';

export const CctvLiveMonitor: React.FC = () => {
  const [activeCam, setActiveCam] = useState<'cam1' | 'cam2' | 'cam3'>('cam1');
  const [isNightVision, setIsNightVision] = useState(false);
  
  // 2-Way Voice Intercom States
  const [isDoctorMicActive, setIsDoctorMicActive] = useState(false); // Speak out to paramedics
  const [isSpeakerActive, setIsSpeakerActive] = useState(true);      // Hear paramedic voice
  const [speakerVolume, setSpeakerVolume] = useState(80);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cameras = [
    { id: 'cam1', name: 'Cam 1: Patient Bed Bay', angle: 'Interior Patient Bay (Wide HD)' },
    { id: 'cam2', name: 'Cam 2: Paramedic Station', angle: 'Medical Equipment & Paramedics' },
    { id: 'cam3', name: 'Cam 3: Vehicle Cabin', angle: 'Front Road & Driver View' },
  ];

  return (
    <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-2xl flex flex-col h-full select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Live Ambulance CCTV & 2-Way Audio Intercom
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>REC 1080p</span>
          </span>

          <button
            onClick={() => setIsNightVision(!isNightVision)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
              isNightVision
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Night Vision</span>
          </button>
        </div>
      </div>

      {/* Main CCTV Camera Viewport */}
      <div className={`relative rounded-xl overflow-hidden border border-slate-800 aspect-video flex flex-col justify-between p-4 transition-all ${
        isNightVision ? 'bg-[#021f10] text-emerald-300' : 'bg-slate-950 text-slate-100'
      }`}>
        {/* Top Info Bar */}
        <div className="flex justify-between items-start z-10 text-xs font-mono">
          <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-3 py-1 rounded-lg space-y-0.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>{cameras.find((c) => c.id === activeCam)?.name}</span>
            </div>
            <div className="text-[10px] text-slate-400">{cameras.find((c) => c.id === activeCam)?.angle}</div>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-3 py-1 rounded-lg text-right">
            <div className="text-white font-bold">{timeStr || 'LIVE'}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">AMB-108 CCTV-STREAM</div>
          </div>
        </div>

        {/* Center Simulated Camera Stream Visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-48 h-48 border border-slate-700/60 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 border border-slate-700/80 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </div>

        {/* Camera Selector Tabs Overlay */}
        <div className="z-10 flex flex-wrap justify-between items-end gap-2 pt-12">
          <div className="flex space-x-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800 backdrop-blur-sm">
            {cameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setActiveCam(cam.id as 'cam1' | 'cam2' | 'cam3')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeCam === cam.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cam.id.toUpperCase()}
              </button>
            ))}
          </div>

          <span className="text-[11px] bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 text-slate-400 flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Encrypted 5G Stream</span>
          </span>
        </div>
      </div>

      {/* 2-Way Voice Intercom Controls ("Speak and Hear Voice") */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-cyan-400" /> 2-Way Voice Intercom (Doctor & Paramedic)
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
            isDoctorMicActive ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400'
          }`}>
            {isDoctorMicActive ? '🎙️ Broadcasting Doctor Voice' : '🔊 Intercom Ready'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* 1. Doctor Speak Button (Push-to-Talk Microphone) */}
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px] block font-medium">Doctor Voice Out (Speak):</span>
            <button
              onClick={() => setIsDoctorMicActive(!isDoctorMicActive)}
              className={`w-full py-2.5 px-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                isDoctorMicActive
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/40'
              }`}
            >
              {isDoctorMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>{isDoctorMicActive ? 'Microphone Active (Speaking...)' : 'Push to Speak (Doctor Mic)'}</span>
            </button>
          </div>

          {/* 2. Paramedic Hear Voice Toggle (Speaker Listen & Volume) */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400 font-medium">Paramedic Audio (Hear Voice):</span>
              <span className="text-cyan-400 font-mono font-bold">{isSpeakerActive ? `${speakerVolume}%` : 'Muted'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSpeakerActive(!isSpeakerActive)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isSpeakerActive
                    ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/40'
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
                title="Toggle Listening to Paramedic Voice"
              >
                {isSpeakerActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                disabled={!isSpeakerActive}
                value={speakerVolume}
                onChange={(e) => setSpeakerVolume(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer disabled:opacity-40"
              />
            </div>
          </div>
        </div>

        {/* Live Audio Equalizer Waveform Bars when Listening */}
        {isSpeakerActive && (
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Incoming Paramedic Audio Stream</span>
            </span>
            <div className="flex items-end space-x-1 h-3">
              <span className="w-1 bg-cyan-400 h-2 animate-bounce"></span>
              <span className="w-1 bg-cyan-400 h-3 animate-bounce delay-75"></span>
              <span className="w-1 bg-cyan-400 h-1.5 animate-bounce delay-150"></span>
              <span className="w-1 bg-cyan-400 h-2.5 animate-bounce delay-100"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
