import React, { useState } from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { Stethoscope, Shield, Lock, Mail, ShieldCheck, ArrowRight, UserCheck, Navigation } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginDoctor, loginRto } = useAmbulance();

  // Mode: 'doctor' or 'rto'
  const [activeTabMode, setActiveTabMode] = useState<'doctor' | 'rto'>('doctor');

  // Doctor Form Fields (Department module removed as requested)
  const [doctorEmail, setDoctorEmail] = useState('dr.rahul.sharma@hospital.org');
  const [doctorPassword, setDoctorPassword] = useState('••••••••••••');

  // RTO Form Fields
  const [rtoBadge, setRtoBadge] = useState('RTO-BADGE-8849');
  const [rtoPassword, setRtoPassword] = useState('••••••••••••');
  const [rtoZone, setRtoZone] = useState('North District Highway Emergency Corridor');

  const [rememberMe, setRememberMe] = useState(true);

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorEmail) return;
    loginDoctor(doctorEmail, doctorPassword);
  };

  const handleRtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rtoBadge) return;
    loginRto(rtoBadge, rtoPassword, rtoZone);
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#090d19] flex items-center justify-center p-6 select-none relative overflow-hidden">
      {/* Glow background effects */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-2xl p-8 shadow-2xl space-y-6 backdrop-blur-xl relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-1">
            {activeTabMode === 'doctor' ? <Stethoscope className="w-7 h-7" /> : <Shield className="w-7 h-7 text-amber-400" />}
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Smart Ambulance Telemetry Portal</h1>
          <p className="text-xs text-slate-400">Select authorized login portal to access live monitoring</p>
        </div>

        {/* Dual Option Switcher: Doctor Login vs RTO Login */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTabMode('doctor')}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTabMode === 'doctor'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Doctor Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabMode('rto')}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTabMode === 'rto'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>RTO Login</span>
          </button>
        </div>

        {/* Form 1: Doctor Login */}
        {activeTabMode === 'doctor' && (
          <form onSubmit={handleDoctorSubmit} className="space-y-4 text-xs">
            {/* Doctor Email / ID Input */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Doctor Email / Hospital ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  placeholder="dr.name@hospital.org"
                  className="w-full bg-slate-950/80 text-slate-100 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 text-slate-100 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-500 w-3.5 h-3.5 rounded cursor-pointer"
                />
                <span>Remember Doctor Credentials</span>
              </label>
            </div>

            {/* Doctor Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/40 cursor-pointer mt-2"
            >
              <span>Doctor Sign In & Launch Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Presets for Doctor */}
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold block text-center">Quick Physician Login Presets:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginDoctor('dr.rahul.sharma@hospital.org', 'demo123')}
                  className="bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 p-2 rounded-lg text-[11px] font-medium flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dr. Rahul Sharma</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginDoctor('dr.ananya.sen@hospital.org', 'demo123')}
                  className="bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 p-2 rounded-lg text-[11px] font-medium flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dr. Ananya Sen</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Form 2: RTO Login */}
        {activeTabMode === 'rto' && (
          <form onSubmit={handleRtoSubmit} className="space-y-4 text-xs">
            {/* RTO Officer Badge / Email Input */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">RTO Officer Badge ID / Email</label>
              <div className="relative">
                <Shield className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={rtoBadge}
                  onChange={(e) => setRtoBadge(e.target.value)}
                  placeholder="RTO-BADGE-8849"
                  className="w-full bg-slate-950/80 text-slate-100 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">RTO Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={rtoPassword}
                  onChange={(e) => setRtoPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 text-slate-100 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Regional Traffic Zone Select */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">RTO Regional Traffic Emergency Zone</label>
              <select
                value={rtoZone}
                onChange={(e) => setRtoZone(e.target.value)}
                className="w-full bg-slate-950/80 text-slate-100 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
              >
                <option value="North District Highway Emergency Corridor">North District Highway Emergency Corridor</option>
                <option value="Central Metro Traffic Control Zone">Central Metro Traffic Control Zone</option>
                <option value="South Corridor Rapid Transit Clearance">South Corridor Rapid Transit Clearance</option>
              </select>
            </div>

            {/* RTO Sign In Button */}
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-900/40 cursor-pointer mt-2"
            >
              <span>RTO Officer Sign In & Access Transit Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Presets for RTO */}
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold block text-center">Quick RTO Officer Presets:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginRto('Inspector V. K. Verma', 'demo123', 'North Highway Corridor')}
                  className="bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 p-2 rounded-lg text-[11px] font-medium flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Insp. V. K. Verma</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginRto('Officer S. Patel', 'demo123', 'Central Metro Zone')}
                  className="bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 p-2 rounded-lg text-[11px] font-medium flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-400" />
                  <span>Officer S. Patel</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted Emergency Telemetry & Transit Gateway</span>
        </div>
      </div>
    </div>
  );
};
