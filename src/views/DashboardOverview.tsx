import React from 'react';
import { useAmbulance } from '../context/AmbulanceContext';
import { VitalsCard } from '../components/VitalsCard';
import { EcgCanvas } from '../components/EcgCanvas';
import { CctvLiveMonitor } from '../components/CctvLiveMonitor';
import { PatientInfoCard } from '../components/PatientInfoCard';
import { MiniMapCard } from '../components/MiniMapCard';
import { TreatmentsPanel } from '../components/TreatmentsPanel';
import { MedicationsPanel } from '../components/MedicationsPanel';
import { AlertsPanel } from '../components/AlertsPanel';
import { DoctorNotesPanel } from '../components/DoctorNotesPanel';
import { QuickActionBar } from '../components/QuickActionBar';

export const DashboardOverview: React.FC = () => {
  const { vitals } = useAmbulance();

  return (
    <div className="space-y-4 p-4 select-none">
      {/* 1. Top Vitals Strip (5 Cards) matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {vitals.map((vital) => (
          <VitalsCard key={vital.id} vital={vital} />
        ))}
      </div>

      {/* 2. Middle Grid Row: ECG Monitor (Left 6 Cols) + Live CCTV & 2-Way Voice (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: ECG Diagnostic Waveform Monitor */}
        <div className="lg:col-span-6 h-full min-h-[280px]">
          <EcgCanvas />
        </div>

        {/* Right: Live CCTV Camera Monitoring & 2-Way Intercom */}
        <div className="lg:col-span-6 h-full min-h-[280px]">
          <CctvLiveMonitor />
        </div>
      </div>

      {/* 3. Patient Info & Ambulance Map Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <PatientInfoCard />
        <MiniMapCard />
      </div>

      {/* 4. Bottom Panels: Treatments, Medications, Alerts, Doctor Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
        <TreatmentsPanel />
        <MedicationsPanel />
        <AlertsPanel />
        <DoctorNotesPanel />
      </div>

      {/* 5. Action Toolbar (Video Call Removed) */}
      <QuickActionBar />
    </div>
  );
};
