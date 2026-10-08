import React, { useState } from 'react';
import { Pill, Plus, X } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const MedicationsPanel: React.FC = () => {
  const { medications, addMedication } = useAmbulance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMedication(name.trim(), dosage.trim() || '1 Dose');
    setName('');
    setDosage('');
    setShowAddModal(false);
  };

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase mb-3">
        <div className="flex items-center space-x-2">
          <Pill className="w-4 h-4 text-blue-400" />
          <span>Medications</span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors cursor-pointer"
          title="Add Medication"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Medications List matching screenshot */}
      <div className="space-y-2.5 overflow-y-auto max-h-[160px] pr-1">
        {medications.map((med) => (
          <div key={med.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-200 font-medium">{med.name}</span>
            </div>
            <span className="text-slate-400 font-mono font-semibold">{med.dosage}</span>
          </div>
        ))}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-20 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-100 uppercase">Add Medication</span>
            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleAdd} className="space-y-2.5 my-auto">
            <input
              type="text"
              placeholder="Medication Name (e.g. Aspirin)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded p-2 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 300 mg)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded p-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 rounded transition-colors"
            >
              Add Medication
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
