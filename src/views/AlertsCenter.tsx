import React, { useState } from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { Bell, AlertTriangle, Info, Volume2, VolumeX, ShieldAlert, CheckCircle, Plus, Trash2 } from 'lucide-react';
import type { AlertItem } from '../types';

export const AlertsCenter: React.FC = () => {
  const { alerts, triggerAudioBeep, isAudioMuted, setIsAudioMuted } = useAmbulance();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  // Interactive local alerts list state to allow acknowledging and adding alerts live
  const [localAlerts, setLocalAlerts] = useState<AlertItem[]>(alerts);
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState<'critical' | 'warning' | 'info'>('critical');

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAlert: AlertItem = {
      id: Date.now().toString(),
      type: newType,
      message: newMessage.trim(),
      time: timeStr,
      acknowledged: false,
    };
    setLocalAlerts([newAlert, ...localAlerts]);
    setNewMessage('');
    if (newType === 'critical') {
      triggerAudioBeep('sos');
    }
  };

  const handleAcknowledge = (id: string) => {
    setLocalAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const handleClearAcknowledged = () => {
    setLocalAlerts((prev) => prev.filter((a) => !a.acknowledged));
  };

  const filteredAlerts = localAlerts.filter((a) => (filter === 'all' ? true : a.type === filter));

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Active Emergency Alerts & Alarm Control Center
          </h1>
          <p className="text-xs text-slate-400">Real-time emergency alarm management, sound siren controls, and alert resolution log</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              isAudioMuted
                ? 'bg-red-500/20 text-red-400 border-red-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {isAudioMuted ? 'Alarms Muted' : 'Audio Alarms Active'}
          </button>

          <button
            onClick={() => triggerAudioBeep('sos')}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-lg shadow-red-900/40"
          >
            <ShieldAlert className="w-4 h-4" /> Test SOS Siren Sound
          </button>
        </div>
      </div>

      {/* Interactive Form to Trigger Live Alerts & Filter Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4">
        {/* New Alert Trigger Form */}
        <form onSubmit={handleAddAlert} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Trigger new emergency alert message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-lg w-72 focus:outline-none focus:border-blue-500"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as 'critical' | 'warning' | 'info')}
            className="bg-slate-950 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="critical">Critical Alarm</option>
            <option value="warning">Warning Level</option>
            <option value="info">Informational</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Trigger Alert
          </button>
        </form>

        {/* Clear Acknowledged Button */}
        <button
          onClick={handleClearAcknowledged}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" /> Clear Resolved Alerts
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 w-fit text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
            filter === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Active Alerts ({localAlerts.length})
        </button>
        <button
          onClick={() => setFilter('critical')}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
            filter === 'critical' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Critical ({localAlerts.filter((a) => a.type === 'critical').length})
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
            filter === 'warning' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Warnings ({localAlerts.filter((a) => a.type === 'warning').length})
        </button>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
            No active emergency alerts in this filter view.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.type === 'critical';
            const isWarning = alert.type === 'warning';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  alert.acknowledged
                    ? 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60'
                    : isCritical
                    ? 'bg-red-500/10 border-red-500/40 text-red-200 shadow-lg shadow-red-950/20'
                    : isWarning
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900/80 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-lg ${
                    isCritical ? 'bg-red-500/20 text-red-400' : isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {isCritical ? <ShieldAlert className="w-5 h-5" /> : isWarning ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <span>{alert.message}</span>
                      {alert.acknowledged && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">
                          Acknowledged
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-slate-400">Triggered at {alert.time} • Emergency Telemetry Alert</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-800">
                    {alert.type}
                  </span>
                  {!alert.acknowledged ? (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="text-xs bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Acknowledge
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
