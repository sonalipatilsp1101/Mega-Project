import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, Plus, X } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const TreatmentsPanel: React.FC = () => {
  const { treatments, addTreatment } = useAmbulance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    addTreatment(newDesc.trim());
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase mb-3">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-4 h-4 text-blue-400" />
          <span>Treatment / Procedures</span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors cursor-pointer"
          title="Add Procedure"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Treatments List matching screenshot */}
      <div className="space-y-2.5 overflow-y-auto max-h-[160px] pr-1">
        {treatments.map((tr) => (
          <div key={tr.id} className="flex items-center space-x-2.5 text-xs">
            {tr.completed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-blue-600/30 border-2 border-blue-500 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              </div>
            )}
            <span className="text-slate-400 font-mono shrink-0">{tr.time}</span>
            <span className="text-slate-200 font-medium truncate">{tr.description}</span>
          </div>
        ))}
      </div>

      {/* Add Procedure Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-20 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-100 uppercase">Add New Procedure</span>
            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleAdd} className="space-y-3 my-auto">
            <input
              type="text"
              placeholder="e.g. Administer Morphine 5mg"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded p-2 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 rounded transition-colors"
            >
              Add Procedure
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
