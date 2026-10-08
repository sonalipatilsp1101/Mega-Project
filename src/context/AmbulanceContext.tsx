import React, { createContext, useContext, useState } from 'react';
import type {
  VitalMetric,
  PatientInfo,
  AmbulanceLocation,
  Treatment,
  Medication,
  AlertItem,
  DoctorUser,
  RtoUser,
  UserRole,
  ViewTab,
} from '../types';

interface AmbulanceContextType {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  vitals: VitalMetric[];
  patient: PatientInfo;
  ambulance: AmbulanceLocation;
  treatments: Treatment[];
  medications: Medication[];
  alerts: AlertItem[];
  doctorNotes: string;
  setDoctorNotes: (notes: string) => void;
  addTreatment: (desc: string) => void;
  addMedication: (name: string, dosage: string) => void;
  showVoiceCallModal: boolean;
  setShowVoiceCallModal: (show: boolean) => void;
  showMessageDrawer: boolean;
  setShowMessageDrawer: (show: boolean) => void;
  showSosModal: boolean;
  setShowSosModal: (show: boolean) => void;
  isAudioMuted: boolean;
  setIsAudioMuted: (muted: boolean) => void;
  showInfoBanner: boolean;
  setShowInfoBanner: (show: boolean) => void;
  triggerAudioBeep: (type?: 'ecg' | 'sos') => void;
  // Auth State
  isAuthenticated: boolean;
  userRole: UserRole | null;
  currentDoctor: DoctorUser | null;
  currentRto: RtoUser | null;
  loginDoctor: (email: string, pass: string) => void;
  loginRto: (emailOrBadge: string, pass: string, zone: string) => void;
  logout: () => void;
}

// Initial Baseline Vitals converted into ZERO
const initialVitals: VitalMetric[] = [
  {
    id: 'hr',
    name: 'Heart Rate',
    value: 0,
    unit: 'bpm',
    normalRange: '60-100 bpm',
    status: 'normal',
    color: '#22c55e',
    bgLight: 'rgba(34, 197, 94, 0.1)',
    history: [0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'spo2',
    name: 'SpO2',
    value: 0,
    unit: '%',
    normalRange: '95-100%',
    status: 'normal',
    color: '#38bdf8',
    bgLight: 'rgba(56, 189, 248, 0.1)',
    history: [0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'bp',
    name: 'Blood Pressure',
    value: '0/0',
    unit: 'mmHg',
    normalRange: '90/60 - 120/80',
    status: 'normal',
    color: '#f97316',
    bgLight: 'rgba(249, 115, 22, 0.1)',
    history: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'rr',
    name: 'Respiratory Rate',
    value: 0,
    unit: 'rpm',
    normalRange: '12-20 rpm',
    status: 'normal',
    color: '#a855f7',
    bgLight: 'rgba(168, 85, 247, 0.1)',
    history: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 'temp',
    name: 'Temperature',
    value: '0.0',
    unit: '°C',
    normalRange: '36.1-37.2°C',
    status: 'normal',
    color: '#ef4444',
    bgLight: 'rgba(239, 68, 68, 0.1)',
    history: [0, 0, 0, 0, 0, 0],
  },
];

const initialPatient: PatientInfo = {
  name: 'Rahul Verma',
  age: 28,
  gender: 'Male',
  id: 'PAT12345',
  bloodGroup: 'B+',
  allergies: 'None',
  photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
};

const initialAmbulance: AmbulanceLocation = {
  ambulanceId: 'AMB-108',
  status: 'Standby / Telemetry Ready',
  distanceKm: 0.0,
  etaMins: 0,
  speedKmh: 0,
  lat: 28.6139,
  lng: 77.209,
  hospitalLat: 28.6289,
  hospitalLng: 77.229,
};

const initialTreatments: Treatment[] = [
  { id: '1', time: '10:15 AM', description: 'Oxygen Therapy Started', completed: true },
  { id: '2', time: '10:18 AM', description: 'IV Fluid Administered', completed: true },
];

const initialMedications: Medication[] = [
  { id: 'm1', name: 'Paracetamol', dosage: '500 mg' },
];

const initialAlerts: AlertItem[] = [
  { id: 'a1', type: 'info', message: 'Telemetry System Standby (Initial Zero State)', time: '10:00 AM' },
];

const AmbulanceContext = createContext<AmbulanceContextType | undefined>(undefined);

export const AmbulanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('login');
  const [vitals] = useState<VitalMetric[]>(initialVitals);
  const [patient] = useState<PatientInfo>(initialPatient);
  const [ambulance] = useState<AmbulanceLocation>(initialAmbulance);
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [alerts] = useState<AlertItem[]>(initialAlerts);
  const [doctorNotes, setDoctorNotes] = useState<string>(
    'Awaiting continuous telemetry sync. Baseline vitals initialized.'
  );

  // App opens via Login Page initially (isAuthenticated = false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentDoctor, setCurrentDoctor] = useState<DoctorUser | null>(null);
  const [currentRto, setCurrentRto] = useState<RtoUser | null>(null);

  const [showVoiceCallModal, setShowVoiceCallModal] = useState(false);
  const [showMessageDrawer, setShowMessageDrawer] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  const loginDoctor = (email: string, _pass: string) => {
    setCurrentDoctor({
      id: 'DOC-' + Math.floor(10000 + Math.random() * 90000),
      name: email.includes('@') ? email.split('@')[0].replace('.', ' ').toUpperCase().padStart(4, 'Dr. ') : 'Dr. Rahul Sharma',
      title: 'Senior Cardiologist & ER Specialist',
      email: email,
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
      hospitalName: 'St. Jude General Hospital ER',
    });
    setCurrentRto(null);
    setUserRole('doctor');
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const loginRto = (emailOrBadge: string, _pass: string, zone: string) => {
    setCurrentRto({
      id: 'RTO-' + Math.floor(10000 + Math.random() * 90000),
      name: emailOrBadge.includes('Verma') || emailOrBadge.includes('verma') ? 'Inspector V. K. Verma' : 'Officer S. Patel',
      badgeNumber: 'RTO-BADGE-8849',
      zone: zone || 'North District Highway Emergency Corridor',
      email: emailOrBadge,
      clearanceLevel: 'Level 1 High-Priority Emergency Transit Clearance',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    });
    setCurrentDoctor(null);
    setUserRole('rto');
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentDoctor(null);
    setCurrentRto(null);
    setActiveTab('login');
  };

  const triggerAudioBeep = (type: 'ecg' | 'sos' = 'ecg') => {
    if (isAudioMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'sos') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // Audio context safety catch
    }
  };

  const addTreatment = (description: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newTr: Treatment = {
      id: Date.now().toString(),
      time: timeStr,
      description,
      completed: true,
    };
    setTreatments((prev) => [newTr, ...prev]);
  };

  const addMedication = (name: string, dosage: string) => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name,
      dosage,
    };
    setMedications((prev) => [...prev, newMed]);
  };

  return (
    <AmbulanceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        vitals,
        patient,
        ambulance,
        treatments,
        medications,
        alerts,
        doctorNotes,
        setDoctorNotes,
        addTreatment,
        addMedication,
        showVoiceCallModal,
        setShowVoiceCallModal,
        showMessageDrawer,
        setShowMessageDrawer,
        showSosModal,
        setShowSosModal,
        isAudioMuted,
        setIsAudioMuted,
        showInfoBanner,
        setShowInfoBanner,
        triggerAudioBeep,
        isAuthenticated,
        userRole,
        currentDoctor,
        currentRto,
        loginDoctor,
        loginRto,
        logout,
      }}
    >
      {children}
    </AmbulanceContext.Provider>
  );
};

export const useAmbulance = () => {
  const context = useContext(AmbulanceContext);
  if (!context) {
    throw new Error('useAmbulance must be used within an AmbulanceProvider');
  }
  return context;
};
