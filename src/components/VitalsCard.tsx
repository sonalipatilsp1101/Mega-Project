import React from 'react';
import { Heart, Droplets, Gauge, Wind, Thermometer } from 'lucide-react';
import type { VitalMetric } from '../types';

interface Props {
  vital: VitalMetric;
}

const getIcon = (id: string) => {
  switch (id) {
    case 'hr':
      return Heart;
    case 'spo2':
      return Droplets;
    case 'bp':
      return Gauge;
    case 'rr':
      return Wind;
    case 'temp':
      return Thermometer;
    default:
      return Heart;
  }
};

export const VitalsCard: React.FC<Props> = ({ vital }) => {
  const Icon = getIcon(vital.id);

  // SVG sparkline path creation
  const points = vital.history;
  const min = Math.min(...points) - 2;
  const max = Math.max(...points) + 2;
  const svgWidth = 140;
  const svgHeight = 24;

  const pathD = points
    .map((val, i) => {
      const x = (i / (points.length - 1)) * svgWidth;
      const y = svgHeight - ((val - min) / (max - min || 1)) * svgHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="dashboard-card p-3.5 flex flex-col justify-between relative overflow-hidden group">
      {/* Title Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4" style={{ color: vital.color }} />
          <span className="text-slate-200">{vital.name}</span>
        </div>
      </div>

      {/* Metric Display */}
      <div className="my-2 flex items-baseline justify-start space-x-1.5">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
          {vital.value}
        </span>
        <span className="text-xs font-medium text-slate-400">{vital.unit}</span>
      </div>

      {/* Live Sparkline Graph Wave */}
      <div className="w-full my-1.5 h-6 overflow-hidden flex items-center">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-6 overflow-visible">
          <path
            d={pathD}
            fill="none"
            stroke={vital.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Normal Range Legend */}
      <div className="text-[11px] text-slate-400 font-medium">
        Normal: <span className="text-slate-300">{vital.normalRange}</span>
      </div>
    </div>
  );
};
