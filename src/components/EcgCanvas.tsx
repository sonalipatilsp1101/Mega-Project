import React, { useEffect, useRef, useState } from 'react';
import { Activity, Play, Pause } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

interface EcgCanvasProps {
  height?: number;
  color?: string;
  speed?: number;
}

export const EcgCanvas: React.FC<EcgCanvasProps> = ({ height: customHeight, color: customColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLead, setSelectedLead] = useState('II');
  const [speed, setSpeed] = useState('25 mm/s');
  const [scale, setScale] = useState('10 mm/mV');
  const [isEcgActive, setIsEcgActive] = useState<boolean>(false); // Start with clear flat baseline wave
  const { triggerAudioBeep } = useAmbulance();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let x = 0;
    const points: number[] = [];
    const height = canvas.height;
    const width = canvas.width;
    const centerY = height / 2;

    const getPqstValue = (phase: number) => {
      // If ECG is cleared/deactivated, return 0 (Flat baseline line)
      if (!isEcgActive) return 0;

      if (phase > 0.15 && phase < 0.22) {
        return Math.sin((phase - 0.15) * (Math.PI / 0.07)) * 12;
      } else if (phase > 0.35 && phase < 0.38) {
        return -8;
      } else if (phase >= 0.38 && phase < 0.44) {
        if (Math.abs(phase - 0.41) < 0.01) {
          triggerAudioBeep('ecg');
        }
        const rRatio = (phase - 0.38) / 0.06;
        return (1 - Math.abs(rRatio - 0.5) * 2) * -75;
      } else if (phase >= 0.44 && phase < 0.48) {
        return 16;
      } else if (phase > 0.60 && phase < 0.75) {
        return Math.sin((phase - 0.60) * (Math.PI / 0.15)) * 18;
      }
      return 0;
    };

    let phaseCounter = 0;
    const speedMult = speed === '50 mm/s' ? 3 : 2;

    const render = () => {
      phaseCounter += 0.015;
      if (phaseCounter > 1) phaseCounter = 0;

      const yVal = centerY + getPqstValue(phaseCounter);
      points[x] = yVal;

      const wipeWidth = 20;
      ctx.fillStyle = '#091322';
      ctx.fillRect(x, 0, wipeWidth, height);

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)';
      ctx.lineWidth = 1;
      for (let gx = x; gx < x + wipeWidth; gx += 25) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      if (x > 1) {
        ctx.beginPath();
        ctx.strokeStyle = customColor || '#22c55e';
        ctx.lineWidth = 2.2;
        ctx.shadowColor = customColor || '#22c55e';
        ctx.shadowBlur = isEcgActive ? 6 : 0;
        ctx.moveTo(x - speedMult, points[x - speedMult] || centerY);
        ctx.lineTo(x, yVal);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      x += speedMult;
      if (x >= width) {
        x = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, scale, selectedLead, isEcgActive, triggerAudioBeep, customColor]);

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between relative overflow-hidden h-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 z-10">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
            ECG Diagnostic Waveform
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          {/* Signal Activation / Clear Baseline Toggle */}
          <button
            onClick={() => setIsEcgActive(!isEcgActive)}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              isEcgActive
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Toggle between Zero Baseline and Live ECG Wave Sweep"
          >
            {isEcgActive ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-blue-400" />}
            <span>{isEcgActive ? 'Live Sweep Active' : 'Zero Baseline (Cleared)'}</span>
          </button>

          <div className="flex items-center space-x-1">
            <span className="text-slate-500">Leads:</span>
            <select
              value={selectedLead}
              onChange={(e) => setSelectedLead(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-1.5 py-0.5 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="V1">V1</option>
              <option value="V5">V5</option>
            </select>
          </div>

          <button
            onClick={() => setSpeed(speed === '25 mm/s' ? '50 mm/s' : '25 mm/s')}
            className="hover:text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 cursor-pointer"
          >
            {speed}
          </button>

          <button
            onClick={() => setScale(scale === '10 mm/mV' ? '20 mm/mV' : '10 mm/mV')}
            className="hover:text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 cursor-pointer"
          >
            {scale}
          </button>
        </div>
      </div>

      <div className="relative w-full flex-1 min-h-[160px] rounded-lg overflow-hidden ecg-grid-bg border border-emerald-950/40">
        <canvas
          ref={canvasRef}
          width={650}
          height={customHeight || 180}
          className="w-full h-full object-cover block"
        />

        <div className="absolute bottom-2.5 right-3 flex items-center space-x-1.5 bg-slate-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400 backdrop-blur-sm">
          <span className={`w-2 h-2 rounded-full ${isEcgActive ? 'bg-emerald-500 live-pulse-dot' : 'bg-slate-500'}`}></span>
          <span>{isEcgActive ? 'Live Telemetry' : 'Zero Signal (Cleared)'}</span>
        </div>
      </div>
    </div>
  );
};
