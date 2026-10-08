import React, { useState } from 'react';
import { MapPin, Gauge, Clock, ShieldCheck, Volume2, ZoomIn, ZoomOut, RotateCcw, Navigation, AlertTriangle } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';
import { kolhapurCityGraph, findNearestHospitalDynamic } from '../dijkstra';

export const AmbulanceTracking: React.FC = () => {
  const { ambulance } = useAmbulance();
  const [sirenActive, setSirenActive] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  const hospitalListNames = [
    "CPR_Hospital", "Sachin_Multispecialty", "Aster_Aadhar", "Surya_Hospital", 
    "Shrawastie_Hospital", "Sunshine_Multispecialty", "Diamond_Hospital", 
    "Tulip_Traumacare", "Athaayu_Hospital", "Apple_Saraswati", "Krishna_Hospital", 
    "Asian_Hospital", "OmHospital"
  ];

  const allNodes = Object.keys(kolhapurCityGraph);
  const accidentLocations = allNodes.filter(node => !hospitalListNames.includes(node));

  const [startLocation, setStartLocation] = useState<string>('Rankala');
  const [isJunctionBlocked, setIsJunctionBlocked] = useState<boolean>(false);

  // Fully dynamic calculation for any selected location
  const routingResult = findNearestHospitalDynamic(kolhapurCityGraph, startLocation, isJunctionBlocked);

  const calculatedEta = Math.round((routingResult.distance / 30) * 60) + 2;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(2.5, Number((prev + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.6, Number((prev - 0.25).toFixed(2))));
  const handleResetZoom = () => setZoomLevel(1.0);

  const vbWidth = 1000 / zoomLevel;
  const vbHeight = 600 / zoomLevel;
  const vbX = (1000 - vbWidth) / 2;
  const vbY = (600 - vbHeight) / 2;

  return (
    <div className="p-4 space-y-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#091322] shadow-2xl">
        
        {/* Zoom Controls */}
        <div className="absolute top-6 left-6 z-20 flex items-center space-x-1 bg-[#0b1328]/90 border border-slate-700/80 backdrop-blur-md p-1.5 rounded-xl shadow-xl text-slate-200 text-xs font-semibold">
          <button onClick={handleZoomIn} className="p-2 hover:bg-slate-800 text-slate-300 rounded-lg flex items-center gap-1 cursor-pointer">
            <ZoomIn className="w-4 h-4 text-blue-400" />
            <span>Zoom In</span>
          </button>
          <span className="px-2 font-mono text-slate-400 text-[11px]">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={handleZoomOut} className="p-2 hover:bg-slate-800 text-slate-300 rounded-lg flex items-center gap-1 cursor-pointer">
            <ZoomOut className="w-4 h-4 text-amber-400" />
            <span>Zoom Out</span>
          </button>
          <button onClick={handleResetZoom} className="p-2 hover:bg-slate-800 text-slate-400 rounded-lg border-l border-slate-700/80 ml-1 pl-2 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Dijkstra & Traffic Control Panel */}
        <div className="absolute top-20 left-6 z-20 bg-[#0b1328]/95 border border-slate-700/80 backdrop-blur-md p-3 rounded-xl shadow-xl text-slate-200 text-xs w-80 space-y-2.5">
          <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
            <Navigation className="w-3.5 h-3.5 text-red-400" />
            <span>Dijkstra Dynamic Pathfinder</span>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Select Accident Location / Area:</label>
            <select 
              value={startLocation} 
              onChange={(e) => {
                setStartLocation(e.target.value);
                setIsJunctionBlocked(false);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white cursor-pointer max-h-40 overflow-y-auto"
            >
              {accidentLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                </option>
              ))}
            </select>
          </div>

          {/* Traffic Congestion Toggle */}
          <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-lg space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Junction Traffic Simulation:
              </span>
              <button 
                onClick={() => setIsJunctionBlocked(!isJunctionBlocked)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${isJunctionBlocked ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 text-white'}`}
              >
                {isJunctionBlocked ? 'Congested' : 'Normal'}
              </button>
            </div>
            <p className="text-[9px] text-slate-400">
              {isJunctionBlocked ? 'Traffic heavy at primary junction! Algorithm switched to alternative path.' : 'All junctions clear. Shortest path active.'}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-lg space-y-1">
            <span className="text-[10px] text-slate-400 block">Auto-Selected Nearest Hospital:</span>
            <span className="text-emerald-400 font-bold font-mono text-xs block">
              🏥 {routingResult.hospital.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
            </span>
          </div>
        </div>

        {/* SVG Map */}
        <svg className="w-full h-full object-cover transition-all duration-300 ease-out" viewBox={`${vbX} ${vbY} ${vbWidth} ${vbHeight}`}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="#091322" />
          <rect width="1000" height="600" fill="url(#grid)" />

          <path d="M 0 200 Q 400 150 700 350 T 1000 300" fill="none" stroke="#1e293b" strokeWidth="40" />
          <path d="M 300 0 L 300 600 M 700 0 L 700 600" fill="none" stroke="#1e293b" strokeWidth="24" />

          <path d="M 150 480 Q 380 400 620 220 T 820 120" fill="none" stroke={isJunctionBlocked ? "#f59e0b" : "#ef4444"} strokeWidth="5" strokeDasharray="8 4" />

          {[{ x: 150, y: 480 }, { x: 280, y: 430 }, { x: 410, y: 350 }, { x: 520, y: 280 }, { x: 620, y: 220 }, { x: 740, y: 160 }, { x: 820, y: 120 }].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="5" fill={isJunctionBlocked ? "#f59e0b" : "#ef4444"} stroke="#ffffff" strokeWidth="1.5" />
          ))}

          <g transform="translate(410, 350)">
            <circle r="22" fill={isJunctionBlocked ? "#f59e0b" : "#ef4444"} fillOpacity="0.2" className="animate-ping" />
            <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#ffffff" stroke={isJunctionBlocked ? "#f59e0b" : "#ef4444"} strokeWidth="3" />
            <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isJunctionBlocked ? "#d97706" : "#ef4444"}>AMB</text>
          </g>

          <g transform="translate(820, 120)">
            <circle r="30" fill="#3b82f6" fillOpacity="0.15" />
            <path d="M 0 -20 C -8 -20 -14 -14 -14 -6 C -14 8 0 20 0 20 C 0 20 14 8 14 -6 C 14 -14 8 -20 0 -20 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="-3" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">+</text>
            <text x="0" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
              {routingResult.hospital.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
            </text>
          </g>
        </svg>

        {/* Telemetry Box */}
        <div className="absolute top-6 right-6 w-80 bg-[#0b1328]/90 border border-slate-700/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl text-slate-100 z-10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-wide">Ambulance Routing</h3>
              <div className="text-xs text-slate-400 font-mono">AMB-108 (Dijkstra Engine)</div>
            </div>
            <button onClick={() => setSirenActive(!sirenActive)} className={`p-2 rounded-lg transition-colors cursor-pointer ${sirenActive ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-slate-400'}`}>
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Green Corridor Active</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-blue-400" />
                <span>Speed</span>
              </span>
              <span className="text-white font-bold font-mono">45 km/h</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Est. Time (ETA)</span>
              </span>
              <span className="text-white font-bold font-mono">{calculatedEta} mins</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Total Distance</span>
              </span>
              <span className="text-white font-bold font-mono">
                {routingResult.distance !== null ? `${routingResult.distance} km` : '0 km'}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-300">
              <span className="text-slate-400 block mb-0.5">Calculated Shortest Path:</span>
              <span className="font-mono text-red-400 font-bold break-words">
                {routingResult.path.length > 0 
                  ? routingResult.path.map(n => n.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()).join(" → ") 
                  : "No path available"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Signals: Green</span>
            </span>
            <span className="font-mono">Auto-Reroute</span>
          </div>
        </div>
      </div>
    </div>
  );
};