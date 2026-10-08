import React, { useState } from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { Stethoscope, Plus, CheckCircle2, Clock, ShieldAlert, UserCheck, ChevronRight } from 'lucide-react';

export const TreatmentsProcedures: React.FC = () => {
  const { treatments, addTreatment } = useAmbulance();
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    addTreatment(newDesc.trim());
    setNewDesc('');
  };

  const protocolChecklist = [
    { title: 'Airway & Breathing Assessment', category: 'Primary Survey', done: true },
    { title: 'High-Flow O2 via Non-Rebreather Mask', category: 'Respiratory', done: true },
    { title: '18G Peripheral IV Access (Left Arm)', category: 'Vascular Access', done: true },
    { title: 'Continuous 12-Lead ECG Telemetry', category: 'Cardiovascular', done: true },
    { title: 'Sublingual Nitroglycerin (0.4mg)', category: 'Medication', done: false },
    { title: 'Notify Hospital Cath Lab Protocol', category: 'Hospital Readiness', done: false },
  ];

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-purple-400" /> Emergency Treatments & Procedures Log
          </h1>
          <p className="text-xs text-slate-400">Timestamped paramedic interventions, physician orders, and emergency care protocols</p>
        </div>

        <form onSubmit={handleAdd} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Log new treatment or procedure..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-lg w-64 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timeline of Completed & Active Procedures */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Clock className="w-4 h-4 text-blue-400" /> Chronological Procedure Timeline
            </h2>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {treatments.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Dot */}
                  <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-slate-900 ${
                    item.completed ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'
                  }`} />

                  <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between hover:border-slate-600 transition-all">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                          {item.time}
                        </span>
                        <h3 className="text-sm font-semibold text-white">{item.description}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-slate-500" /> Administered by Lead Paramedic (A. Singh)
                      </p>
                    </div>

                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {item.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Standard Emergency Protocol Checklist */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> ACS Standard Operating Protocol
            </h2>

            <div className="space-y-2.5">
              {protocolChecklist.map((item, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 ${item.done ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <div>
                      <span className="text-xs font-medium text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
