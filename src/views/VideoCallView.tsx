import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, Monitor, Layout, Radio, Heart, Droplets } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const VideoCallView: React.FC = () => {
  const { vitals, setActiveTab } = useAmbulance();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // WebRTC camera access attempt
  useEffect(() => {
    if (isCameraOn && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera permission denied or device absent: fallback to mock video poster
        });
    } else if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isCameraOn]);

  const hrVital = vitals.find((v) => v.id === 'hr');
  const spo2Vital = vitals.find((v) => v.id === 'spo2');

  const formatCallTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 space-y-4 h-[calc(100vh-80px)] flex flex-col">
      {/* Video Call Screen Frame matching Thumbnail 4 */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
        {/* Main Camera Feed (Paramedic / Ambulance Team) */}
        {isCameraOn ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Fallback image if video stream is unattached */}
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200"
              alt="Paramedic Feed"
              className="absolute inset-0 w-full h-full object-cover -z-10"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 text-slate-500">
            <CameraOff className="w-16 h-16" />
            <span className="text-sm font-semibold">Camera is Turned Off</span>
          </div>
        )}

        {/* Top Header HUD Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3 bg-slate-950/70 border border-slate-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tele-ICU HD Call</span>
            </span>
            <span className="text-slate-400 font-mono">| {formatCallTime(seconds)}</span>
          </div>

          {/* Overlay Vitals Header */}
          <div className="flex items-center space-x-4 bg-slate-950/80 border border-slate-800 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg">
            <div className="flex items-center space-x-1.5">
              <Heart className="w-4 h-4 text-emerald-400" />
              <span>HR: <span className="text-emerald-400 font-mono">{hrVital?.value || 120}</span> bpm</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>SpO2: <span className="text-cyan-400 font-mono">{spo2Vital?.value || 94}</span>%</span>
            </div>
          </div>
        </div>

        {/* Picture-In-Picture Doctor Stream matching Thumbnail 4 */}
        <div className="absolute top-4 right-4 sm:top-16 w-32 sm:w-44 h-24 sm:h-32 rounded-xl overflow-hidden border-2 border-blue-500 shadow-2xl z-20 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300"
            alt="Dr. Rahul Sharma"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 left-1 bg-slate-950/80 text-[10px] text-white px-2 py-0.5 rounded font-semibold backdrop-blur-sm">
            Dr. Rahul
          </div>
        </div>

        {/* Bottom Floating Call Controls Bar matching Thumbnail 4 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-950/80 border border-slate-800 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-5 shadow-2xl z-20">
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`p-3 rounded-full transition-colors cursor-pointer ${
              isCameraOn ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-red-500/20 text-red-400 border border-red-500'
            }`}
            title="Toggle Camera"
          >
            {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-3 rounded-full transition-colors cursor-pointer ${
              isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-red-500/20 text-red-400 border border-red-500'
            }`}
            title="Toggle Microphone"
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="bg-red-600 hover:bg-red-700 text-white p-3.5 rounded-full shadow-lg shadow-red-900/50 transition-all transform hover:scale-105 cursor-pointer"
            title="End Video Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer" title="Share Screen">
            <Monitor className="w-5 h-5" />
          </button>

          <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer" title="Layout Options">
            <Layout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
