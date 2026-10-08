import React from 'react';
import { AmbulanceProvider, useAmbulance } from './context/AmbulanceContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InfoBanner } from './components/InfoBanner';

// Import View Page Components
import { DashboardOverview } from './views/DashboardOverview';
import { PatientManagement } from './views/PatientManagement';
import { VitalsMonitoring } from './views/VitalsMonitoring';
import { EcgMonitorView } from './views/EcgMonitorView';
import { TreatmentsProcedures } from './views/TreatmentsProcedures';
import { MedicationsView } from './views/MedicationsView';
import { AlertsCenter } from './views/AlertsCenter';
import { AmbulanceTracking } from './views/AmbulanceTracking';
import { ReportsAnalytics } from './views/ReportsAnalytics';
import { SettingsView } from './views/SettingsView';
import { LoginPage } from './views/LoginPage';

import { VoiceCallModal } from './components/VoiceCallModal';
import { MessageDrawer } from './components/MessageDrawer';
import { SosModal } from './components/SosModal';

const AppContent: React.FC = () => {
  const { activeTab, isAuthenticated } = useAmbulance();

  const renderActiveView = () => {
    // If not authenticated, open application via Login Page
    if (!isAuthenticated || activeTab === 'login') {
      return <LoginPage />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patient':
        return <PatientManagement />;
      case 'vitals':
        return <VitalsMonitoring />;
      case 'ecg':
        return <EcgMonitorView />;
      case 'treatments':
        return <TreatmentsProcedures />;
      case 'medications':
        return <MedicationsView />;
      case 'alerts':
        return <AlertsCenter />;
      case 'tracking':
        return <AmbulanceTracking />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090d19] text-slate-100 flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Software Description & Key Features Info Banner */}
        <InfoBanner />

        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Main View Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#090d19]">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Drawers */}
      <VoiceCallModal />
      <MessageDrawer />
      <SosModal />
    </div>
  );
};

export default function App() {
  return (
    <AmbulanceProvider>
      <AppContent />
    </AmbulanceProvider>
  );
}
