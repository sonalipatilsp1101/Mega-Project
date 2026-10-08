import React from 'react';
import { User } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

export const PatientInfoCard: React.FC = () => {
  const { patient } = useAmbulance();

  return (
    <div className="dashboard-card p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase mb-3">
        <User className="w-4 h-4 text-blue-400" />
        <span>Patient Information</span>
      </div>

      {/* Profile Info Row */}
      <div className="flex items-center space-x-3.5 mb-3">
        <img
          src={patient.photoUrl}
          alt={patient.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40 shadow-md shrink-0"
        />
        <div className="space-y-0.5">
          <h4 className="text-base font-bold text-white tracking-wide">{patient.name}</h4>
          <div className="text-xs text-slate-400 font-medium">
            Age: <span className="text-slate-200">{patient.age}</span> | Gender: <span className="text-slate-200">{patient.gender}</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            ID: <span className="text-slate-200 font-mono">{patient.id}</span>
          </div>
        </div>
      </div>

      {/* Details Table Grid */}
      <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-slate-400 font-medium">Blood Group:</span>{' '}
          <span className="text-emerald-400 font-bold">{patient.bloodGroup}</span>
        </div>
        <div>
          <span className="text-slate-400 font-medium">Allergies:</span>{' '}
          <span className="text-slate-200 font-semibold">{patient.allergies}</span>
        </div>
      </div>
    </div>
  );
};
