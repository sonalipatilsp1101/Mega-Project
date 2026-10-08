import React from 'react';
import {
  LayoutDashboard,
  User,
  Activity,
  HeartPulse,
  Stethoscope,
  Pill,
  Bell,
  Navigation,
  FileText,
  Settings,
  UserCheck,
} from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';
import type { ViewTab } from '../types';

interface NavItem {
  id: ViewTab;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patient', label: 'Patient', icon: User },
  { id: 'vitals', label: 'Vitals', icon: Activity },
  { id: 'ecg', label: 'ECG', icon: HeartPulse },
  { id: 'treatments', label: 'Treatments', icon: Stethoscope },
  { id: 'medications', label: 'Medications', icon: Pill },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'tracking', label: 'Ambulance Tracking', icon: Navigation },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'login', label: 'Doctor Login', icon: UserCheck },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useAmbulance();

  return (
    <aside className="w-56 bg-[#0b1328] border-r border-slate-800/80 flex flex-col justify-between select-none min-h-[calc(100vh-57px)]">
      <div className="py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        v2.4 Live Monitoring
      </div>
    </aside>
  );
};
