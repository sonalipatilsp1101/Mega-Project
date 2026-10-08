import React, { useState } from 'react';
import { FileText, Save, Check } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const DoctorNotesPanel: React.FC = () => {
  const { doctorNotes, setDoctorNotes } = useAmbulance();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-200 uppercase mb-2">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Doctor Notes</span>
        </div>
        <button
          onClick={handleSave}
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
        >
          {saved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Saved</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>

      {/* Editable Notes Textarea */}
      <textarea
        value={doctorNotes}
        onChange={(e) => setDoctorNotes(e.target.value)}
        className="w-full bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 resize-none focus:outline-none focus:border-blue-500/60 leading-relaxed font-sans min-h-[75px]"
        placeholder="Type doctor's live remote guidance here..."
      />

      {/* Footer Timestamp & Doctor Signature matching screenshot */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
        <span className="font-mono">10:26 AM</span>
        <span className="font-semibold text-slate-300">Dr. Rahul Sharma</span>
      </div>
    </div>
  );
};
