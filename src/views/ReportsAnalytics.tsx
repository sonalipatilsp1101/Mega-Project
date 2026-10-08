import React from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { FileText, Download, Printer, Activity } from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const { patient, treatments, medications } = useAmbulance();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Electronic Patient Care Record (ePCR) & Analytics
          </h1>
          <p className="text-xs text-slate-400">Official medical incident summary report for hospital ER admission and records</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={handlePrint}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <Printer className="w-4 h-4 text-blue-400" /> Print Document
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/30">
            <Download className="w-4 h-4" /> Export ePCR (PDF)
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-8 space-y-6 shadow-2xl text-slate-200">
        {/* Hospital & Incident Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm">
                ER
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide">
                Smart Emergency Ambulance Telemetry Report
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">Hospital Emergency Transport Services • Incident #INC-2026-8894</p>
          </div>

          <div className="text-right text-xs space-y-1">
            <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
            <div><strong>Time Initiated:</strong> 10:12 AM</div>
            <div><strong>Unit ID:</strong> AMB-108 (ICU Unit)</div>
          </div>
        </div>

        {/* Patient Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Patient Name</span>
            <strong className="text-white text-sm">{patient.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Patient ID / Age</span>
            <strong className="text-white text-sm">{patient.id} / {patient.age} yrs</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Blood Group</span>
            <strong className="text-emerald-400 text-sm">{patient.bloodGroup}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Triage Level</span>
            <strong className="text-red-400 text-sm">Level 1 (Immediate)</strong>
          </div>
        </div>

        {/* Section 1: Initial Vitals Snapshot */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Initial Vitals Baseline at Pick-up
          </h3>
          <div className="grid grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Heart Rate</span>
              <span className="text-emerald-400 font-bold text-base">120 bpm</span>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">SpO2 Level</span>
              <span className="text-cyan-400 font-bold text-base">94 %</span>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Blood Pressure</span>
              <span className="text-amber-400 font-bold text-base">130/85 mmHg</span>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Resp. Rate</span>
              <span className="text-purple-400 font-bold text-base">24 rpm</span>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Body Temp</span>
              <span className="text-red-400 font-bold text-base">37.2 °C</span>
            </div>
          </div>
        </div>

        {/* Section 2: Rendered Treatments & Medications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Treatments Rendered</h3>
            <ul className="space-y-2 text-xs">
              {treatments.map((t) => (
                <li key={t.id} className="bg-slate-950/40 p-2.5 rounded border border-slate-800 flex justify-between">
                  <span>{t.description}</span>
                  <span className="text-slate-400">{t.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Medications Administered</h3>
            <ul className="space-y-2 text-xs">
              {medications.map((m) => (
                <li key={m.id} className="bg-slate-950/40 p-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="font-semibold text-white">{m.name}</span>
                  <span className="text-cyan-400">{m.dosage}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Attending Physician Authorization */}
        <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xs text-slate-400">
          <div>
            <span className="block font-semibold text-slate-200">Attending Physician:</span>
            <span>Dr. Rahul Sharma (Cardiologist - General Hospital ER)</span>
          </div>
          <div className="text-right">
            <span className="block font-semibold text-emerald-400">Digitally Verified & Signed</span>
            <span>Ref ID: SIG-88392-CARD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
