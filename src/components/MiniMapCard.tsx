import React from 'react';
import { Navigation, MapPin, Gauge, Clock } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const MiniMapCard: React.FC = () => {
  const { ambulance, setActiveTab } = useAmbulance();

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase mb-2">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-blue-400" />
          <span>Ambulance Location</span>
        </div>
        <button
          onClick={() => setActiveTab('tracking')}
          className="text-[11px] text-blue-400 hover:text-blue-300 underline font-normal cursor-pointer"
        >
          View Full Map
        </button>
      </div>

      {/* Map View Frame */}
      <div
        onClick={() => setActiveTab('tracking')}
        className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-900 cursor-pointer group"
      >
        {/* Vector SVG Simulated Map Tiles & Route */}
        <svg className="w-full h-full object-cover" viewBox="0 0 300 120">
          {/* Map Grid Roads */}
          <path d="M 0 40 Q 100 20 200 60 T 300 40" fill="none" stroke="#1e293b" strokeWidth="18" />
          <path d="M 50 0 L 50 120 M 180 0 L 180 120" fill="none" stroke="#1e293b" strokeWidth="12" />
          
          {/* Red Route Line matching screenshot */}
          <path
            d="M 40 85 Q 120 70 190 35 T 260 20"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.5"
            strokeDasharray="4 2"
          />

          {/* Ambulance Icon Pin */}
          <g transform="translate(100, 72)">
            <circle r="9" fill="#ef4444" fillOpacity="0.25" className="animate-ping" />
            <circle r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Hospital Red Marker Pin matching screenshot */}
          <g transform="translate(260, 20)">
            <path
              d="M 0 -10 C -4 -10 -7 -7 -7 -3 C -7 4 0 10 0 10 C 0 10 7 4 7 -3 C 7 -7 4 -10 0 -10 Z"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <circle r="2.5" fill="#ffffff" />
          </g>
        </svg>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-slate-950/80 text-white text-[11px] px-2.5 py-1 rounded-full border border-blue-500/40">
            Click to Track Live GPS
          </span>
        </div>
      </div>

      {/* Telemetry Metrics Row matching screenshot */}
      <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-1 text-center">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Distance to Hosp</span>
          </div>
          <div className="text-sm font-bold text-white mt-0.5">{ambulance.distanceKm} km</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>ETA</span>
          </div>
          <div className="text-sm font-bold text-white mt-0.5">{ambulance.etaMins} mins</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
            <Gauge className="w-3 h-3 text-slate-400" />
            <span>Speed</span>
          </div>
          <div className="text-sm font-bold text-white mt-0.5">{ambulance.speedKmh} km/h</div>
        </div>
      </div>
    </div>
  );
};
