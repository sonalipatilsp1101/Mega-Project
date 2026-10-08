import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Download, User } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAmbulance } from '../context/AmbulanceContext';

const historyData = [
  { time: '09:40', hr: 82, spo2: 98, bp: 120 },
  { time: '09:50', hr: 88, spo2: 97, bp: 122 },
  { time: '10:00', hr: 110, spo2: 96, bp: 128 },
  { time: '10:10', hr: 95, spo2: 95, bp: 125 },
  { time: '10:20', hr: 122, spo2: 94, bp: 132 },
  { time: '10:30', hr: 120, spo2: 94, bp: 130 },
];

export const PatientHistory: React.FC = () => {
  const { patient, treatments, medications, setActiveTab } = useAmbulance();
  const [activeSubTab, setActiveSubTab] = useState<'vitals' | 'treatments' | 'medications' | 'reports'>('vitals');

  return (
    <div className="p-4 space-y-4">
      {/* Top Navigation Bar matching Thumbnail 2 */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Patient History</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Patient Profile Card matching Thumbnail 2 */}
      <div className="dashboard-card p-4 flex items-center space-x-4">
        <img
          src={patient.photoUrl}
          alt={patient.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/50"
        />
        <div>
          <h3 className="text-lg font-bold text-white">{patient.name}</h3>
          <div className="text-xs text-slate-400 font-mono mt-0.5">
            ID: <span className="text-slate-200">{patient.id}</span> | Male | <span className="text-slate-200">28</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs matching Thumbnail 2 */}
      <div className="flex items-center space-x-4 border-b border-slate-800/80 text-xs font-semibold">
        {(['vitals', 'treatments', 'medications', 'reports'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`pb-2.5 capitalize transition-all cursor-pointer ${
              activeSubTab === tab
                ? 'text-blue-400 border-b-2 border-blue-500 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'vitals' ? 'Vitals History' : tab}
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'vitals' && (
        <div className="dashboard-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-100">Heart Rate (bpm)</h4>
            <span className="text-xs text-emerald-400 font-semibold font-mono">Normal: 60-100 bpm</span>
          </div>

          {/* Recharts Time Series Chart matching Thumbnail 2 */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 150]} stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="hr"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#22c55e', stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeSubTab === 'treatments' && (
        <div className="dashboard-card p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-100 uppercase">Treatment Log</h4>
          <div className="divide-y divide-slate-800">
            {treatments.map((tr) => (
              <div key={tr.id} className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-slate-300">{tr.description}</span>
                <span className="text-slate-400 font-mono">{tr.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'medications' && (
        <div className="dashboard-card p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-100 uppercase">Medications Administered</h4>
          <div className="divide-y divide-slate-800">
            {medications.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">{m.name}</span>
                <span className="text-emerald-400 font-mono font-bold">{m.dosage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'reports' && (
        <div className="dashboard-card p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-100 uppercase">Generated Medical Reports</h4>
          <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-semibold text-white">EHR_Summary_PAT12345.pdf</div>
                <div className="text-[11px] text-slate-400">Generated 10:25 AM • 2.4 MB</div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded flex items-center gap-1 font-semibold cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
