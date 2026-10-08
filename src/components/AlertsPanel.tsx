import React from 'react';
import { Bell, AlertOctagon, AlertTriangle, Info, Plus } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const AlertsPanel: React.FC = () => {
  const { alerts } = useAmbulance();

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase mb-3">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <span>Alerts</span>
        </div>
        <button className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Alerts Log List matching screenshot */}
      <div className="space-y-2.5 overflow-y-auto max-h-[160px] pr-1">
        {alerts.map((al) => (
          <div key={al.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 truncate">
              {al.type === 'critical' ? (
                <AlertOctagon className="w-4 h-4 text-red-500 shrink-0" />
              ) : al.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
              )}
              <span className="text-slate-200 font-medium truncate">{al.message}</span>
            </div>
            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">{al.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
