import React, { useState } from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { User, ShieldAlert, Phone, FileSpreadsheet, Activity, Edit3, CheckCircle2, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const PatientManagement: React.FC = () => {
  const { patient, doctorNotes, setDoctorNotes } = useAmbulance();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(doctorNotes);

  const vitalsTrendData = [
    { time: '09:40', hr: 112, spo2: 97, bp: 124 },
    { time: '09:50', hr: 118, spo2: 96, bp: 126 },
    { time: '10:00', hr: 115, spo2: 95, bp: 128 },
    { time: '10:10', hr: 122, spo2: 94, bp: 130 },
    { time: '10:20', hr: 120, spo2: 94, bp: 130 },
    { time: '10:30', hr: 120, spo2: 94, bp: 130 },
  ];

  const handleSaveNotes = () => {
    setDoctorNotes(tempNotes);
    setIsEditingNotes(false);
  };

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={patient.photoUrl}
            alt={patient.name}
            className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover shadow-lg"
          />
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-white">{patient.name}</h1>
              <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Level 1 - Immediate Triage
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
              <span>Patient ID: <strong className="text-slate-200">{patient.id}</strong></span>
              <span>•</span>
              <span>Age: <strong className="text-slate-200">{patient.age} yrs</strong> ({patient.gender})</span>
              <span>•</span>
              <span>Blood Group: <strong className="text-emerald-400">{patient.bloodGroup}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700/50 text-right">
            <div className="text-[11px] text-slate-400">Primary Diagnosis</div>
            <div className="text-xs font-semibold text-amber-400">Acute Coronary Syndrome (ACS)</div>
          </div>
          <div className="bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700/50 text-right">
            <div className="text-[11px] text-slate-400">Emergency Contact</div>
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
              <Phone className="w-3 h-3 text-blue-400" /> +91 98765 43210 (Wife)
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Demographics & Medical Profile */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-blue-400" /> Patient Demographics
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Full Name</span>
                <span className="text-white font-medium">{patient.name}</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Date of Birth</span>
                <span className="text-white font-medium">14 Mar 1996</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Weight / Height</span>
                <span className="text-white font-medium">74 kg / 175 cm</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Insurance Policy ID</span>
                <span className="text-white font-medium">INS-8849201</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 col-span-2">
                <span className="text-slate-400 block text-[11px]">Known Allergies</span>
                <span className="text-emerald-400 font-medium">None Recorded</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Past Medical History
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-800/30 p-2 rounded border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Hypertension (Stage 1)</strong>
                  <span className="text-slate-400 text-[11px]">Diagnosed 2 years ago, on Amlodipine 5mg</span>
                </div>
              </li>
              <li className="flex items-start gap-2 bg-slate-800/30 p-2 rounded border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Family History of CAD</strong>
                  <span className="text-slate-400 text-[11px]">Paternal history of myocardial infarction</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Column: Interactive Vitals Trend Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" /> 1-Hour Telemetry Trend (Heart Rate vs SpO2)
              </h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Updated 1 min ago
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[50, 160]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '11px' }}
                  />
                  <Line type="monotone" dataKey="hr" name="Heart Rate (bpm)" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="spo2" name="SpO2 (%)" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Doctor Clinical Notes Editor */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" /> Attending Cardiologist Clinical Notes
              </h2>
              {!isEditingNotes ? (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1 rounded transition-all cursor-pointer"
                >
                  Edit Notes
                </button>
              ) : (
                <button
                  onClick={handleSaveNotes}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-all cursor-pointer"
                >
                  Save Notes
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <textarea
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                className="w-full h-24 bg-slate-950 text-slate-200 border border-slate-700 rounded-lg p-3 text-xs focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 italic">
                "{doctorNotes}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
