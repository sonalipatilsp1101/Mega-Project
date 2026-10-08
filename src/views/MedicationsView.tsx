import React, { useState } from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { Pill, Plus, ShieldCheck, Check, Clock, Droplet } from 'lucide-react';

export const MedicationsView: React.FC = () => {
  const { medications, addMedication } = useAmbulance();
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim() || !dosage.trim()) return;
    addMedication(medName.trim(), dosage.trim());
    setMedName('');
    setDosage('');
  };

  const quickDrugCatalog = [
    { name: 'Aspirin (ASA)', defaultDosage: '325 mg', category: 'Antiplatelet', route: 'Oral Chewable' },
    { name: 'Nitroglycerin', defaultDosage: '0.4 mg', category: 'Vasodilator', route: 'Sublingual Spray' },
    { name: 'Morphine Sulfate', defaultDosage: '4 mg', category: 'Analgesic', route: 'IV Slow Push' },
    { name: 'Epinephrine', defaultDosage: '1 mg (1:10,000)', category: 'Sympathomimetic', route: 'IV Push' },
  ];

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-cyan-400" /> Medication Administration Record (MAR)
          </h1>
          <p className="text-xs text-slate-400">Real-time emergency drug administration, dosage controls, and allergy interaction check</p>
        </div>

        {/* Add Custom Med Form */}
        <form onSubmit={handleAddMed} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Medication name..."
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-lg w-40 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Dosage (e.g. 500 mg)..."
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-lg w-40 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Administer
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Administered Meds List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Check className="w-4 h-4 text-emerald-400" /> Administered Medications Log
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {medications.map((m) => (
                <div key={m.id} className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl space-y-2 hover:border-cyan-500/40 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">{m.name}</h3>
                      <span className="text-xs text-cyan-400 font-semibold">{m.dosage}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">
                      Administered
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" /> 10:20 AM</span>
                    <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-cyan-500" /> IV Bolus</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Emergency Catalog */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Quick Drug Protocol Actions
            </h2>

            <div className="space-y-2.5">
              {quickDrugCatalog.map((drug, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-xs text-white block">{drug.name}</strong>
                    <span className="text-[10px] text-slate-400">{drug.category} • {drug.route}</span>
                  </div>
                  <button
                    onClick={() => addMedication(drug.name, drug.defaultDosage)}
                    className="text-xs bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 px-3 py-1.5 rounded transition-all cursor-pointer font-medium"
                  >
                    + {drug.defaultDosage}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No recorded drug allergies for Rahul Verma (B+)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
