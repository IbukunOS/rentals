import { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Map, 
  MapPin, 
  Users, 
  Sliders, 
  Bell, 
  Check, 
  ArrowLeft, 
  TrendingUp, 
  UserCheck, 
  AlertTriangle, 
  Search 
} from 'lucide-react';
import { CARS_DATA } from './LandingPage';

interface AdminDashboardProps {
  onNavigateToLanding: () => void;
  threatLevel: 'low' | 'medium' | 'high';
  setThreatLevel: (level: 'low' | 'medium' | 'high') => void;
}

interface TelemetryVehicle {
  id: string;
  name: string;
  code: string;
  client: string;
  driver: string;
  security: string;
  speed: number;
  fuel: number;
  battery: number;
  armoringIntegrity: number;
  destination: string;
  status: 'In Transit' | 'Available' | 'Security Active' | 'Maintenance';
  x: number; // SVG Map coordinate X percentage
  y: number; // SVG Map coordinate Y percentage
}

const INITIAL_VEHICLES: TelemetryVehicle[] = [
  {
    id: 'mercedes-s-guard',
    name: 'Mercedes S-Class Guard',
    code: 'VANGUARD-1',
    client: 'Consular Delegation',
    driver: 'Sanni Daniel',
    security: 'Ade Emmanuel',
    speed: 42,
    fuel: 78,
    battery: 92,
    armoringIntegrity: 100,
    destination: 'FBO Private Terminal',
    status: 'In Transit',
    x: 35,
    y: 40
  },
  {
    id: 'cadillac-escalade',
    name: 'Cadillac Escalade ESV',
    code: 'VANGUARD-2',
    client: 'Marcus Vance (CEO)',
    driver: 'Dayo Ibam',
    security: 'Cynthia Adams',
    speed: 55,
    fuel: 62,
    battery: 89,
    armoringIntegrity: 100,
    destination: 'Downtown Financial Center',
    status: 'Security Active',
    x: 65,
    y: 55
  },
  {
    id: 'rolls-royce-phantom',
    name: 'Rolls-Royce Phantom EWB',
    code: 'VIP-SHIELD',
    client: 'N/A',
    driver: 'None (Garage)',
    security: 'None (Garage)',
    speed: 0,
    fuel: 95,
    battery: 98,
    armoringIntegrity: 98,
    destination: 'Secure Garage Alpha',
    status: 'Available',
    x: 50,
    y: 25
  }
];

export function AdminDashboard({
  onNavigateToLanding,
  threatLevel,
  setThreatLevel
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fleet' | 'personnel' | 'settings'>('overview');
  const [vehicles, setVehicles] = useState<TelemetryVehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('mercedes-s-guard');
  const [logs, setLogs] = useState<{ id: string; time: string; message: string; type: 'info' | 'warning' | 'security' }[]>([
    { id: '1', time: '03:01:05', message: 'VANGUARD-1: Secure connection established with satellite grid.', type: 'info' },
    { id: '2', time: '03:01:01', message: 'VIP-SHIELD: Parked in Secure Garage Alpha. Systems nominal.', type: 'info' },
    { id: '3', time: '03:00:52', message: 'VANGUARD-2: Route detour initiated to avoid congested highway.', type: 'warning' },
    { id: '4', time: '03:00:45', message: 'Officer Cynthia Adams: Bio-metric verification checked & cleared.', type: 'security' },
  ]);
  const [personnelFilter, setPersonnelFilter] = useState<'all' | 'driver' | 'security'>('all');
  const [fleetSearch, setFleetSearch] = useState('');

  // Random activity log templates
  const logTemplates = [
    { message: 'VANGUARD-1: Speeds stabilized at 45 mph. Traffic clear.', type: 'info' as const },
    { message: 'VANGUARD-2: Exited Zone A. GPS tracking is at full signal.', type: 'info' as const },
    { message: 'Officer Sanni Daniel: Radio communications verification check nominal.', type: 'info' as const },
    { message: 'VIP-SHIELD: Commencing automated hybrid battery maintenance cycle.', type: 'info' as const },
    { message: 'VANGUARD-2: Approaching VIP drop-off zone. Perimeter security active.', type: 'security' as const },
    { message: 'SYSTEM: Telemetry integrity verified for all active routes.', type: 'info' as const },
    { message: 'VANGUARD-1: Heavy armor pressure sensor reporting 100% seal.', type: 'info' as const },
    { message: 'Officer Dayo Ibam: Tactical check-in completed. No threats detected.', type: 'security' as const },
    { message: 'SYSTEM: Dual-frequency secure comms link backup established.', type: 'info' as const },
  ];

  // Simulating movement and telemetry update intervals
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Move vehicles slightly on the map
      setVehicles(prev => prev.map(v => {
        if (v.status === 'In Transit' || v.status === 'Security Active') {
          // Add a small random jitter (+/- 1% coordinates)
          const newX = Math.min(85, Math.max(15, v.x + (Math.random() - 0.5) * 2));
          const newY = Math.min(80, Math.max(20, v.y + (Math.random() - 0.5) * 2));
          
          // Randomize speed slightly
          const speedJitter = Math.floor((Math.random() - 0.5) * 6);
          const newSpeed = Math.max(25, v.speed + speedJitter);

          // Drain fuel and battery slightly
          const newFuel = Math.max(10, v.fuel - (Math.random() > 0.7 ? 1 : 0));
          const newBattery = Math.max(40, v.battery - (Math.random() > 0.8 ? 1 : 0));

          return { ...v, x: newX, y: newY, speed: newSpeed, fuel: newFuel, battery: newBattery };
        }
        return v;
      }));

      // 2. Generate random telemetry log feed
      if (Math.random() > 0.4) {
        const randIndex = Math.floor(Math.random() * logTemplates.length);
        const template = logTemplates[randIndex];
        
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        
        setLogs(prev => [
          {
            id: Date.now().toString(),
            time: timeStr,
            message: template.message,
            type: template.type
          },
          ...prev.slice(0, 7) // keep last 8 logs
        ]);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const getSelectedVehicle = () => {
    return vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
  };

  const getStatusBadge = (status: TelemetryVehicle['status']) => {
    switch (status) {
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-brand-cyan uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
            In Transit
          </span>
        );
      case 'Security Active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-brand-gold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse"></span>
            Sec Active
          </span>
        );
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Available
          </span>
        );
      case 'Maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-2 py-0.5 text-[10px] font-bold text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
            Maintenance
          </span>
        );
    }
  };

  const activeVehiclesCount = vehicles.filter(v => v.status === 'In Transit' || v.status === 'Security Active').length;
  const utilizationRate = Math.round((activeVehiclesCount / vehicles.length) * 100);

  const staff = [
    { name: 'Sanni Daniel', role: 'Driver', credentials: 'Tactical Evacuation III', status: 'Active Duty', assignment: 'VANGUARD-1', bg: 'Ex-Military Police' },
    { name: 'Dayo Ibam', role: 'Driver', credentials: 'High-Speed Intercept IV', status: 'Active Duty', assignment: 'VANGUARD-2', bg: 'Ex-Special Forces' },
    { name: 'Deborah Adetunji', role: 'Driver', credentials: 'VIP Protection Specialist', status: 'Standby', assignment: 'None (Garage)', bg: 'Ex-Secret Service' },
    { name: 'Ade Emmanuel', role: 'Security Detail', credentials: 'Armed Close Protection V', status: 'Active Duty', assignment: 'VANGUARD-1', bg: 'Ex-Russian Spetsnaz' },
    { name: 'Cynthia Adams', role: 'Security Detail', credentials: 'Tactical Combat Care IV', status: 'Active Duty', assignment: 'VANGUARD-2', bg: 'Ex-Navy SEAL' },
    { name: 'Ibukun Odunsi', role: 'Security Detail', credentials: 'Urban Close Defense III', status: 'Standby', assignment: 'None (Garage)', bg: 'Ex-Police SWAT' },
  ];

  const filteredStaff = staff.filter(s => {
    if (personnelFilter === 'all') return true;
    if (personnelFilter === 'driver') return s.role === 'Driver';
    return s.role === 'Security Detail';
  });

  const filteredVehicles = vehicles.filter(v => 
    v.name.toLowerCase().includes(fleetSearch.toLowerCase()) ||
    v.code.toLowerCase().includes(fleetSearch.toLowerCase()) ||
    v.client.toLowerCase().includes(fleetSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-obsidian text-slate-100 flex flex-col">
      
      {/* Dashboard Sub-Header / Blinking Threat Level Warning Bar */}
      <div className={`py-2 px-4 transition-colors duration-500 border-b ${
        threatLevel === 'high' 
          ? 'bg-red-950/80 border-red-800 text-red-200 animate-pulse' 
          : threatLevel === 'medium'
            ? 'bg-amber-950/80 border-amber-800 text-amber-200'
            : 'bg-brand-navy/60 border-white/5 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 ${threatLevel === 'high' ? 'text-red-400' : threatLevel === 'medium' ? 'text-brand-gold' : 'text-brand-cyan'}`} />
            <span>GLOBAL ADVISORY THREAT ALERT LEVEL: <span className="font-bold uppercase tracking-wider">{threatLevel}</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>SEC-COMMS Link: <span className="text-emerald-400">ACTIVE [CH-9]</span></span>
            <span>GPS Constellation: <span className="text-emerald-400">9 SATELLITES</span></span>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 border-b lg:border-r border-white/5 bg-brand-navy/35 flex flex-col justify-between p-6">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-brand-cyan glow-cyan" />
                <span className="font-heading text-base font-bold tracking-widest uppercase text-white">
                  Aegis<span className="text-brand-cyan">HQ</span>
                </span>
              </div>
              <button 
                onClick={onNavigateToLanding}
                className="flex items-center gap-1 text-[10px] font-mono text-brand-slate hover:text-brand-cyan transition-colors"
              >
                <ArrowLeft className="h-3 w-3" /> EXIT
              </button>
            </div>

            {/* Sidebar navigation tabs */}
            <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeTab === 'overview' 
                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Map className="h-4 w-4" />
                TELEMETRY MAP
              </button>
              <button
                onClick={() => setActiveTab('fleet')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeTab === 'fleet' 
                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Sliders className="h-4 w-4" />
                FLEET TRACKER
              </button>
              <button
                onClick={() => setActiveTab('personnel')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeTab === 'personnel' 
                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Users className="h-4 w-4" />
                TACTICAL CREW
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeTab === 'settings' 
                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Sliders className="h-4 w-4" />
                OVERRIDE SYSTEM
              </button>
            </nav>
          </div>

          {/* Quick Stats sidebar footer */}
          <div className="hidden lg:block pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>ADMIN OPERATOR</span>
              <span className="font-mono text-white">#009-LITE</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>SYSTEM STATE</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> NOMINAL
              </span>
            </div>
          </div>
        </aside>

        {/* Dashboard Main Workspace Area */}
        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Dashboard Header Title & KPI Cards Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-brand-cyan tracking-widest uppercase">AEGIS COMMAND CENTER</p>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight">System Live Operations</h2>
            </div>
            <div className="text-sm font-mono text-slate-400">
              Log Time: <span className="text-white font-bold">{new Date().toTimeString().split(' ')[0]}</span>
            </div>
          </div>

          {/* KPI Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KPI 1: Utilization */}
            <div className="glass-panel p-5 rounded-lg border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xxs font-mono text-slate-500 uppercase tracking-widest">Active Utilization</p>
                <h4 className="text-2xl font-bold font-heading mt-1 text-white">{utilizationRate}%</h4>
                <p className="text-xxs text-emerald-400 font-bold flex items-center gap-1 mt-1 font-mono">
                  <TrendingUp className="h-3 w-3" /> UP 8% THIS WEEK
                </p>
              </div>
              <div className="relative h-14 w-14">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="22" className="stroke-white/5 fill-transparent" strokeWidth="4" />
                  <circle 
                    cx="28" 
                    cy="28" 
                    r="22" 
                    className="stroke-brand-cyan fill-transparent transition-all duration-1000" 
                    strokeWidth="4" 
                    strokeDasharray={`${2 * Math.PI * 22}`}
                    strokeDashoffset={`${2 * Math.PI * 22 * (1 - utilizationRate / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-brand-cyan">
                  {activeVehiclesCount}/{vehicles.length}
                </span>
              </div>
            </div>

            {/* KPI 2: Security Deployments */}
            <div className="glass-panel p-5 rounded-lg border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xxs font-mono text-slate-500 uppercase tracking-widest">Security Deployments</p>
                <h4 className="text-2xl font-bold font-heading mt-1 text-white">18 / 24</h4>
                <p className="text-xxs text-brand-cyan font-bold mt-1 font-mono">ACTIVE FIELD OFFICERS</p>
              </div>
              <div className="w-16 h-8 flex flex-col justify-end gap-1.5">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-cyan to-brand-gold rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-[10px] text-right font-mono text-slate-400">75% capacity</span>
              </div>
            </div>

            {/* KPI 3: Daily Revenue */}
            <div className="glass-panel p-5 rounded-lg border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xxs font-mono text-slate-500 uppercase tracking-widest">Daily Revenue</p>
                <h4 className="text-2xl font-bold font-heading mt-1 text-white">$48,250</h4>
                <p className="text-xxs text-emerald-400 font-bold flex items-center gap-1 mt-1 font-mono">
                  <TrendingUp className="h-3 w-3" /> +12.5% MOCK STAT
                </p>
              </div>
              <div className="w-16 h-10">
                {/* SVG sparkline chart */}
                <svg className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="2">
                  <path d="M 0 35 Q 10 25 15 30 T 30 15 T 45 20 T 60 5" />
                </svg>
              </div>
            </div>

            {/* KPI 4: Global Threat Level */}
            <div className="glass-panel p-5 rounded-lg border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xxs font-mono text-slate-500 uppercase tracking-widest">Advisory Threat Status</p>
                <h4 className={`text-xl font-bold font-heading mt-1.5 uppercase ${
                  threatLevel === 'high' ? 'text-red-500 glow-cyan' : threatLevel === 'medium' ? 'text-brand-gold' : 'text-emerald-400'
                }`}>
                  {threatLevel} Alert
                </h4>
                <p className="text-xxs text-slate-400 mt-1 font-mono">MITIGATION PROTOCOLS ON</p>
              </div>
              <div className={`p-2.5 rounded-full ${
                threatLevel === 'high' ? 'bg-red-500/10 text-red-400' : threatLevel === 'medium' ? 'bg-amber-500/10 text-brand-gold' : 'bg-emerald-500/10 text-emerald-400'
              }`}>
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & REAL-TIME MAP */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Telemetry Tracking Map Container (Left 8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
                  
                  {/* Map Header */}
                  <div className="bg-brand-navy/60 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-brand-cyan" />
                      <span className="font-heading font-bold text-sm tracking-wide">METROPOLITAN ACTIVE AREA GRID</span>
                    </div>
                    <div className="flex gap-2 text-xxs font-mono text-slate-400">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-cyan"></span> Transit</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-gold"></span> Security</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400"></span> Garage</span>
                    </div>
                  </div>

                  {/* SVG Stylized Cyber Map */}
                  <div className="relative aspect-[16/9] w-full bg-zinc-950/90 overflow-hidden select-none">
                    
                    {/* SVG City Grid lines */}
                    <svg className="absolute inset-0 h-full w-full stroke-white/[0.03] fill-none" strokeWidth="1">
                      {/* Grid Lines */}
                      {[...Array(12)].map((_, i) => (
                        <line key={`x-${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" />
                      ))}
                      {[...Array(8)].map((_, i) => (
                        <line key={`y-${i}`} x1="0" y1={`${i * 12.5}%`} x2="100%" y2={`${i * 12.5}%`} />
                      ))}
                      
                      {/* Stylized Street Layout representation */}
                      <path d="M 0 20 L 100 20 M 0 60 L 50 60 L 50 100 M 30 0 L 30 100 M 70 0 L 70 60 L 100 60" className="stroke-brand-navy/50" strokeWidth="4" />
                      <path d="M 0 20 L 100 20 M 0 60 L 50 60 L 50 100 M 30 0 L 30 100 M 70 0 L 70 60 L 100 60" className="stroke-brand-cyan/20" strokeWidth="1.5" />
                      
                      {/* Tactical Zones circles */}
                      <circle cx="35%" cy="35%" r="40" className="stroke-brand-cyan/15 fill-transparent" strokeDasharray="3,3" />
                      <circle cx="65%" cy="55%" r="50" className="stroke-brand-gold/15 fill-transparent" strokeDasharray="3,3" />
                      <circle cx="50%" cy="25%" r="30" className="stroke-white/5 fill-transparent" strokeDasharray="3,3" />
                    </svg>

                    {/* Zone labels */}
                    <div className="absolute top-[28%] left-[28%] text-[8px] font-mono text-brand-cyan/40 tracking-widest">
                      ZONE ALPHA [FBO TERMINAL]
                    </div>
                    <div className="absolute bottom-[40%] right-[22%] text-[8px] font-mono text-brand-gold/40 tracking-widest">
                      ZONE CHARLIE [FINANCIAL DISTRICT]
                    </div>
                    <div className="absolute top-[18%] left-[45%] text-[8px] font-mono text-slate-500/40 tracking-widest">
                      GARAGE SECURE-ALPHA
                    </div>

                    {/* Scanning radar line */}
                    <div className="absolute top-[35%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-brand-cyan/10 overflow-hidden pointer-events-none">
                      <div className="w-full h-full bg-[conic-gradient(from_0deg,rgba(0,240,255,0.1),transparent_50%)] animate-scan origin-center"></div>
                    </div>

                    {/* Pulsing Dots representing vehicles */}
                    {vehicles.map((v) => {
                      const isSelected = v.id === selectedVehicleId;
                      return (
                        <div 
                          key={v.id}
                          style={{ left: `${v.x}%`, top: `${v.y}%` }}
                          onClick={() => setSelectedVehicleId(v.id)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                        >
                          {/* Pulsing radar rings */}
                          {(v.status === 'In Transit' || v.status === 'Security Active') && (
                            <span className={`absolute -inset-4 rounded-full animate-radar pointer-events-none ${
                              v.status === 'Security Active' ? 'bg-brand-gold/20' : 'bg-brand-cyan/20'
                            }`}></span>
                          )}

                          {/* Outer glow selected border */}
                          <span className={`absolute -inset-1.5 rounded-full border transition-all ${
                            isSelected 
                              ? v.status === 'Security Active' 
                                ? 'border-brand-gold scale-110 opacity-100' 
                                : 'border-brand-cyan scale-110 opacity-100'
                              : 'border-transparent opacity-0 group-hover:opacity-50 scale-100'
                          }`}></span>

                          {/* Center Dot */}
                          <div className={`h-3 w-3 rounded-full border border-zinc-950 shadow shadow-black ${
                            v.status === 'Security Active' 
                              ? 'bg-brand-gold' 
                              : v.status === 'In Transit'
                                ? 'bg-brand-cyan'
                                : v.status === 'Available'
                                  ? 'bg-emerald-400'
                                  : 'bg-zinc-500'
                          }`} />

                          {/* Mini Hover Tooltip */}
                          <div className="absolute left-1/2 bottom-5 -translate-x-1/2 bg-brand-navy border border-white/10 rounded px-2 py-1 text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                            {v.code} ({v.speed}mph)
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Vehicle details footer bar */}
                  {(() => {
                    const sel = getSelectedVehicle();
                    return (
                      <div className="bg-brand-navy/35 border-t border-white/5 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                        <div className="space-y-1">
                          <p className="text-xxs font-mono text-slate-500 uppercase tracking-wider">SELECTED TRANSMITTER</p>
                          <p className="font-heading font-bold text-white text-base">{sel.name}</p>
                          <span className="font-mono text-xxs bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-brand-cyan">{sel.code}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xxs font-mono text-slate-500 uppercase tracking-wider">CREW ASSIGNMENT</p>
                          <p className="text-xs text-slate-300">Driver: <span className="text-white font-semibold">{sel.driver}</span></p>
                          <p className="text-xs text-slate-300">Security: <span className="text-white font-semibold">{sel.security}</span></p>
                        </div>
                        <div className="space-y-1 font-mono">
                          <p className="text-xxs text-slate-500 uppercase tracking-wider">TELEMETRY READING</p>
                          <p className="text-xs text-slate-300">Speed: <span className="text-brand-cyan font-bold">{sel.speed} mph</span></p>
                          <p className="text-xs text-slate-300">Armor: <span className="text-brand-cyan font-bold">{sel.armoringIntegrity}% INTEGRITY</span></p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xxs font-mono text-slate-500 uppercase tracking-wider">DESTINATION</p>
                          <p className="text-xs text-white font-medium truncate">{sel.destination}</p>
                          <p className="mt-1">{getStatusBadge(sel.status)}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Activity Stream Panel (Right 4 cols) */}
              <div className="lg:col-span-4 space-y-4 text-left">
                <div className="glass-panel rounded-xl overflow-hidden border border-white/5 h-full flex flex-col justify-between">
                  <div className="bg-brand-navy/60 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-brand-cyan" />
                      <span className="font-heading font-bold text-sm tracking-wide">SECURE TELEMETRY STREAM</span>
                    </div>
                  </div>

                  {/* Logs list */}
                  <div className="p-6 space-y-4 font-mono flex-1 overflow-y-auto max-h-[350px] lg:max-h-[420px]">
                    {logs.map((log) => (
                      <div key={log.id} className="text-xxs leading-normal flex items-start gap-2.5 border-b border-white/[0.02] pb-3 last:border-b-0">
                        <span className="text-brand-slate shrink-0">{log.time}</span>
                        <div className="flex-1">
                          <span className={`px-1 rounded mr-1.5 uppercase font-bold text-[8px] ${
                            log.type === 'security' 
                              ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                              : log.type === 'warning'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                          }`}>
                            {log.type}
                          </span>
                          <span className="text-slate-300">{log.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Diagnostic details footer */}
                  <div className="bg-zinc-950/30 p-5 border-t border-white/5 text-xxs font-mono text-slate-500 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Sat-Comms Bitrate:</span>
                      <span className="text-brand-cyan">256 kbps (AES-256)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sub-Orbit Ping:</span>
                      <span className="text-brand-cyan">18 ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLEET TRACKER TABLE */}
          {activeTab === 'fleet' && (
            <div className="glass-panel rounded-xl overflow-hidden border border-white/5 text-left">
              
              {/* Table search & title */}
              <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Active Fleet Inventory</h3>
                  <p className="text-xs text-slate-400">Detailed breakdown of active luxury rentals and protection staff.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by code, car, or client..."
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-brand-cyan/50 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono text-slate-300">
                  <thead className="bg-brand-navy/60 text-xxs uppercase tracking-wider text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-bold">TRANSMITTER</th>
                      <th className="px-6 py-3.5 text-left font-bold">CLIENT RENTAL</th>
                      <th className="px-6 py-3.5 text-left font-bold">STATUS</th>
                      <th className="px-6 py-3.5 text-left font-bold">CREW MEMBERS</th>
                      <th className="px-6 py-3.5 text-left font-bold">SPEED / FUEL</th>
                      <th className="px-6 py-3.5 text-left font-bold">DESTINATION</th>
                      <th className="px-6 py-3.5 text-right font-bold">COMMANDS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredVehicles.map((v) => (
                      <tr 
                        key={v.id} 
                        className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${v.id === selectedVehicleId ? 'bg-brand-cyan/5' : ''}`}
                        onClick={() => setSelectedVehicleId(v.id)}
                      >
                        {/* Vehicle code & name */}
                        <td className="px-6 py-4">
                          <div className="font-heading font-bold text-white font-sans">{v.name}</div>
                          <div className="text-[10px] text-brand-cyan font-bold mt-0.5">{v.code}</div>
                        </td>

                        {/* Client name */}
                        <td className="px-6 py-4 font-sans font-medium text-slate-200">
                          {v.client}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          {getStatusBadge(v.status)}
                        </td>

                        {/* Assigned Crew */}
                        <td className="px-6 py-4 text-xs text-slate-400 font-sans space-y-0.5">
                          <div>Dr: <span className="text-white font-medium">{v.driver}</span></div>
                          <div>Sc: <span className="text-brand-gold font-medium">{v.security}</span></div>
                        </td>

                        {/* Speed & Fuel telemetry */}
                        <td className="px-6 py-4 text-xs font-mono text-slate-300">
                          <div>Spd: <span className="text-white font-bold">{v.speed} mph</span></div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span>Fuel:</span>
                            <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden inline-block">
                              <div className={`h-full rounded-full ${v.fuel < 20 ? 'bg-red-500' : 'bg-brand-cyan'}`} style={{ width: `${v.fuel}%` }}></div>
                            </div>
                            <span>{v.fuel}%</span>
                          </div>
                        </td>

                        {/* Destination */}
                        <td className="px-6 py-4 font-sans text-xs text-slate-400 max-w-[150px] truncate">
                          {v.destination}
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => {
                              const now = new Date();
                              const timeStr = now.toTimeString().split(' ')[0];
                              setLogs(prev => [
                                {
                                  id: Date.now().toString(),
                                  time: timeStr,
                                  message: `COMMAND: Telemetry check requested for ${v.code}. Ping: 18ms. Integrity: ${v.armoringIntegrity}%.`,
                                  type: 'info'
                                },
                                ...prev
                              ]);
                            }}
                            className="bg-brand-navy hover:bg-brand-navy-light text-brand-cyan border border-brand-cyan/20 hover:border-brand-cyan/40 rounded px-2.5 py-1 text-xxs font-bold transition-all"
                          >
                            PING TELEMETRY
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredVehicles.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500 font-sans text-sm">
                          No active vehicles matching "{fleetSearch}" found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TACTICAL CREW PERSONNEL LIST */}
          {activeTab === 'personnel' && (
            <div className="space-y-6 text-left">
              {/* Personnel Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Vetted Close Protection Detail & Drivers</h3>
                  <p className="text-xs text-slate-400">Military-grade screening protocols and certification levels.</p>
                </div>
                
                {/* Filter buttons */}
                <div className="flex bg-white/5 border border-white/10 rounded p-1">
                  <button
                    onClick={() => setPersonnelFilter('all')}
                    className={`px-3 py-1 text-xxs font-bold uppercase rounded transition-colors ${
                      personnelFilter === 'all' ? 'bg-brand-cyan text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Crew
                  </button>
                  <button
                    onClick={() => setPersonnelFilter('driver')}
                    className={`px-3 py-1 text-xxs font-bold uppercase rounded transition-colors ${
                      personnelFilter === 'driver' ? 'bg-brand-cyan text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Drivers
                  </button>
                  <button
                    onClick={() => setPersonnelFilter('security')}
                    className={`px-3 py-1 text-xxs font-bold uppercase rounded transition-colors ${
                      personnelFilter === 'security' ? 'bg-brand-cyan text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Security
                  </button>
                </div>
              </div>

              {/* Grid of Personnel */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStaff.map((s, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-lg border border-white/5 flex flex-col justify-between gap-4 group">
                    <div className="flex items-start gap-4">
                      {/* Avatar Icon Placeholder */}
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center border shrink-0 ${
                        s.role === 'Driver' 
                          ? 'bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan' 
                          : 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'
                      }`}>
                        <UserCheck className="h-6 w-6" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="font-heading font-bold text-white text-base leading-none">{s.name}</div>
                        <p className={`text-xxs font-mono uppercase font-bold tracking-wider ${
                          s.role === 'Driver' ? 'text-brand-cyan' : 'text-brand-gold'
                        }`}>
                          {s.role}
                        </p>
                        <p className="text-xxs text-slate-500 font-mono">BG: {s.bg}</p>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 text-xxs font-mono text-slate-400 space-y-1.5">
                      <div className="flex justify-between">
                        <span>Credentials:</span>
                        <span className="text-white font-semibold">{s.credentials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assignment:</span>
                        <span className="text-white font-semibold">{s.assignment}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                        s.status === 'Active Duty' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${s.status === 'Active Duty' ? 'bg-emerald-400' : 'bg-zinc-400'}`}></span>
                        {s.status}
                      </span>

                      {/* Standby toggle command */}
                      <button 
                        onClick={() => {
                          const now = new Date();
                          const timeStr = now.toTimeString().split(' ')[0];
                          setLogs(prev => [
                            {
                              id: Date.now().toString(),
                              time: timeStr,
                              message: `COMMAND: Standby availability status verified for ${s.name}.`,
                              type: 'security'
                            },
                            ...prev
                          ]);
                        }}
                        className="text-[10px] font-mono text-brand-slate hover:text-brand-cyan transition-colors"
                      >
                        VERIFY STATUS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM CONTROLS & OVERRIDES */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl text-left space-y-8">
              
              {/* Settings Info */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-white">System Override Options</h3>
                <p className="text-xs text-slate-400">Manage simulated threat conditions, global communication overrides, and visual alert overrides.</p>
              </div>

              {/* Settings Card */}
              <div className="glass-panel rounded-xl border border-white/5 p-6 space-y-6">
                
                {/* 1. Threat Advisory Level Select */}
                <div className="space-y-3">
                  <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    GLOBAL THREAT ADVISORY LEVEL OVERRIDE
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((lvl) => {
                      const isActive = threatLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          onClick={() => {
                            setThreatLevel(lvl as 'low' | 'medium' | 'high');
                            const now = new Date();
                            const timeStr = now.toTimeString().split(' ')[0];
                            setLogs(prev => [
                              {
                                id: Date.now().toString(),
                                time: timeStr,
                                message: `SYSTEM ADVISORY: Threat status changed to ${lvl.toUpperCase()}. Deploying updated briefing logs to crew.`,
                                type: lvl === 'high' ? 'security' : 'info'
                              },
                              ...prev
                            ]);
                          }}
                          className={`rounded border px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                            isActive
                              ? lvl === 'high' 
                                ? 'bg-red-500/10 border-red-500 text-red-500 font-extrabold' 
                                : lvl === 'medium'
                                  ? 'bg-amber-500/10 border-brand-gold text-brand-gold font-extrabold'
                                  : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-extrabold'
                              : 'bg-transparent border-white/5 text-slate-500 hover:bg-white/5 hover:border-white/10'
                          }`}
                        >
                          <ShieldCheck className="h-4 w-4" />
                          {lvl} Level
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggle Swatches */}
                <div className="space-y-4 border-t border-white/5 pt-6">
                  <p className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">Simulated Override Toggles</p>
                  
                  {/* Toggle 1: GPS Ping Rate */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                    <div>
                      <p className="text-xs font-bold text-white">Hyper-Rate GPS Tracking</p>
                      <p className="text-xxs text-slate-500">Increases GPS telemetry coordinate refresh rate from 4s to 1s.</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <button className="bg-brand-navy border border-brand-cyan/40 text-brand-cyan text-xxs font-mono font-bold px-3 py-1.5 rounded uppercase">
                        ACTIVE
                      </button>
                    </div>
                  </div>

                  {/* Toggle 2: Satellite Link */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                    <div>
                      <p className="text-xs font-bold text-white">Military Encrypted Comms</p>
                      <p className="text-xxs text-slate-500">Enable dual-layer satellite routing with AES-512 level encryption.</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <button className="bg-brand-navy border border-brand-cyan/20 text-brand-cyan/70 text-xxs font-mono font-bold px-3 py-1.5 rounded uppercase hover:border-brand-cyan/40 hover:text-brand-cyan transition-all">
                        ENABLE
                      </button>
                    </div>
                  </div>

                  {/* Toggle 3: Panic Link */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-xs font-bold text-white">Silent Distress Signal Monitor</p>
                      <p className="text-xxs text-slate-500">Activate automatic threat exfiltration response upon driver panic button press.</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <button className="bg-brand-navy border border-brand-cyan/40 text-brand-cyan text-xxs font-mono font-bold px-3 py-1.5 rounded uppercase">
                        MONITORING
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}
