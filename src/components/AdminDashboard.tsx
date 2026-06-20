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
  Check, 
  ArrowLeft, 
  TrendingUp, 
  UserCheck, 
  AlertTriangle, 
  Search,
  Sun,
  Moon
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateToLanding: () => void;
  threatLevel: 'low' | 'medium' | 'high';
  setThreatLevel: (level: 'low' | 'medium' | 'high') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
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
    driver: 'John Croft',
    security: 'Alexei Romanov',
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
    driver: 'Sarah Connor',
    security: 'Kane West',
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
  setThreatLevel,
  theme,
  setTheme
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fleet' | 'personnel' | 'settings'>('overview');
  const [vehicles, setVehicles] = useState<TelemetryVehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('mercedes-s-guard');
  const [logs, setLogs] = useState<{ id: string; time: string; message: string; type: 'info' | 'warning' | 'security' }[]>([
    { id: '1', time: '03:01:05', message: 'VANGUARD-1: Secure connection established with satellite grid.', type: 'info' },
    { id: '2', time: '03:01:01', message: 'VIP-SHIELD: Parked in Secure Garage Alpha. Systems nominal.', type: 'info' },
    { id: '3', time: '03:00:52', message: 'VANGUARD-2: Route detour initiated to avoid congested highway.', type: 'warning' },
    { id: '4', time: '03:00:45', message: 'Officer Kane West: Bio-metric verification checked & cleared.', type: 'security' },
  ]);
  const [personnelFilter, setPersonnelFilter] = useState<'all' | 'driver' | 'security'>('all');
  const [fleetSearch, setFleetSearch] = useState('');

  const logTemplates = [
    { message: 'VANGUARD-1: Speeds stabilized at 45 mph. Traffic clear.', type: 'info' as const },
    { message: 'VANGUARD-2: Exited Zone A. GPS tracking is at full signal.', type: 'info' as const },
    { message: 'Officer John Croft: Radio communications verification check nominal.', type: 'info' as const },
    { message: 'VIP-SHIELD: Commencing automated hybrid battery maintenance cycle.', type: 'info' as const },
    { message: 'VANGUARD-2: Approaching VIP drop-off zone. Perimeter security active.', type: 'security' as const },
    { message: 'SYSTEM: Telemetry integrity verified for all active routes.', type: 'info' as const },
    { message: 'VANGUARD-1: Heavy armor pressure sensor reporting 100% seal.', type: 'info' as const },
    { message: 'Officer Sarah Connor: Tactical check-in completed. No threats detected.', type: 'security' as const },
    { message: 'SYSTEM: Dual-frequency secure comms link backup established.', type: 'info' as const },
  ];

  // Coordinates jittering and logs update
  useEffect(() => {
    const timer = setInterval(() => {
      setVehicles(prev => prev.map(v => {
        if (v.status === 'In Transit' || v.status === 'Security Active') {
          const newX = Math.min(85, Math.max(15, v.x + (Math.random() - 0.5) * 1.5));
          const newY = Math.min(80, Math.max(20, v.y + (Math.random() - 0.5) * 1.5));
          
          const speedJitter = Math.floor((Math.random() - 0.5) * 4);
          const newSpeed = Math.max(20, v.speed + speedJitter);

          const newFuel = Math.max(10, v.fuel - (Math.random() > 0.85 ? 1 : 0));
          const newBattery = Math.max(40, v.battery - (Math.random() > 0.9 ? 1 : 0));

          return { ...v, x: newX, y: newY, speed: newSpeed, fuel: newFuel, battery: newBattery };
        }
        return v;
      }));

      if (Math.random() > 0.45) {
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
          ...prev.slice(0, 6)
        ]);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const getSelectedVehicle = () => {
    return vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
  };

  const getStatusBadge = (status: TelemetryVehicle['status']) => {
    switch (status) {
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-700 dark:text-brand-cyan uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse"></span>
            Transit
          </span>
        );
      case 'Security Active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-brand-gold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            Sec-Active
          </span>
        );
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-650 dark:bg-emerald-400"></span>
            Available
          </span>
        );
      case 'Maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-zinc-500/10 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-550 dark:bg-zinc-400"></span>
            Garage
          </span>
        );
    }
  };

  const activeVehiclesCount = vehicles.filter(v => v.status === 'In Transit' || v.status === 'Security Active').length;
  const utilizationRate = Math.round((activeVehiclesCount / vehicles.length) * 100);

  const staff = [
    { name: 'John Croft', role: 'Driver', credentials: 'Tactical Evacuation III', status: 'Active Duty', assignment: 'VANGUARD-1', bg: 'Ex-Military Police' },
    { name: 'Sarah Connor', role: 'Driver', credentials: 'High-Speed Intercept IV', status: 'Active Duty', assignment: 'VANGUARD-2', bg: 'Ex-Special Forces' },
    { name: 'Marcus Aurelius', role: 'Driver', credentials: 'VIP Protection Specialist', status: 'Standby', assignment: 'None (Garage)', bg: 'Ex-Secret Service' },
    { name: 'Alexei Romanov', role: 'Security Detail', credentials: 'Armed Close Protection V', status: 'Active Duty', assignment: 'VANGUARD-1', bg: 'Ex-Spetsnaz' },
    { name: 'Kane West', role: 'Security Detail', credentials: 'Tactical Combat Care IV', status: 'Active Duty', assignment: 'VANGUARD-2', bg: 'Ex-Navy SEAL' },
    { name: 'Chen Wei', role: 'Security Detail', credentials: 'Urban Close Defense III', status: 'Standby', assignment: 'None (Garage)', bg: 'Ex-Police SWAT' },
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
    <div className="min-h-screen bg-brand-obsidian text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* advisory Threat Warning Bar */}
      <div className={`py-2 px-4 transition-colors duration-500 border-b ${
        threatLevel === 'high' 
          ? 'bg-red-500/10 border-red-500/30 text-red-800 dark:text-red-300' 
          : threatLevel === 'medium'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
            : 'bg-zinc-100 dark:bg-brand-navy/60 border-zinc-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 ${threatLevel === 'high' ? 'text-red-600' : threatLevel === 'medium' ? 'text-amber-600' : 'text-sky-700 dark:text-brand-cyan'}`} />
            <span>GLOBAL ADVISORY THREAT LEVEL: <span className="font-bold uppercase tracking-wider">{threatLevel}</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>SECURE CHANNEL: <span className="text-emerald-700 dark:text-emerald-400 font-bold">ACTIVE [CH-9]</span></span>
            <span>GPS: <span className="text-emerald-700 dark:text-emerald-400 font-bold">NOMINAL</span></span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 border-b lg:border-r border-zinc-200/60 dark:border-white/5 bg-zinc-50/50 dark:bg-brand-navy/35 flex flex-col justify-between p-6">
          <div className="space-y-8">
            
            {/* Sidebar Top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5.5 w-5.5 text-brand-cyan" />
                <span className="font-heading text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-white">
                  Aegis<span className="text-brand-cyan">HQ</span>
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Theme Selector */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-white/5 text-slate-605 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  title="Toggle theme"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </button>
                
                <button 
                  onClick={onNavigateToLanding}
                  className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <ArrowLeft className="h-3 w-3" /> EXIT
                </button>
              </div>
            </div>

            {/* Sidebar Tabs */}
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-bold tracking-wider transition-all whitespace-nowrap border ${
                  activeTab === 'overview' 
                    ? 'bg-brand-cyan/15 border-brand-cyan/35 text-sky-700 dark:text-brand-cyan' 
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                <Map className="h-4 w-4" />
                LIVE MAP
              </button>
              <button
                onClick={() => setActiveTab('fleet')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-bold tracking-wider transition-all whitespace-nowrap border ${
                  activeTab === 'fleet' 
                    ? 'bg-brand-cyan/15 border-brand-cyan/35 text-sky-700 dark:text-brand-cyan' 
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                <Sliders className="h-4 w-4" />
                FLEET DETAILS
              </button>
              <button
                onClick={() => setActiveTab('personnel')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-bold tracking-wider transition-all whitespace-nowrap border ${
                  activeTab === 'personnel' 
                    ? 'bg-brand-cyan/15 border-brand-cyan/35 text-sky-700 dark:text-brand-cyan' 
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                <Users className="h-4 w-4" />
                TACTICAL CREW
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-bold tracking-wider transition-all whitespace-nowrap border ${
                  activeTab === 'settings' 
                    ? 'bg-brand-cyan/15 border-brand-cyan/35 text-sky-700 dark:text-brand-cyan' 
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                <Sliders className="h-4 w-4" />
                SYSTEM CONTROLS
              </button>
            </nav>
          </div>

          <div className="hidden lg:block pt-6 border-t border-zinc-200 dark:border-white/5 space-y-2 text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <span>OPERATOR ID:</span>
              <span className="text-slate-800 dark:text-white font-bold">#009-LITE</span>
            </div>
            <div className="flex justify-between">
              <span>SYSTEM STATE:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                <ShieldCheck className="h-3.5 w-3.5" /> NOMINAL
              </span>
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-6xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/5 pb-4">
            <div className="text-left">
              <span className="text-[10px] font-mono font-bold text-sky-700 dark:text-brand-cyan uppercase tracking-wider">SECURE CONSOLE</span>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">Active System Overview</h2>
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 text-left">
              Console time: <span className="text-slate-800 dark:text-white font-bold">{new Date().toTimeString().split(' ')[0]}</span>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KPI 1: Active Utilization */}
            <div className="glass-panel p-4 rounded-lg flex items-center justify-between bg-white dark:bg-brand-navy-light shadow-sm">
              <div className="text-left">
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-405 font-bold uppercase tracking-wider">Utilization</span>
                <h4 className="text-xl font-bold font-heading mt-0.5 text-slate-850 dark:text-white">{utilizationRate}%</h4>
                <p className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 flex items-center gap-0.5 font-mono">
                  <TrendingUp className="h-3 w-3" /> UP 8% THIS WK
                </p>
              </div>
              <div className="relative h-12 w-12">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="18" className="stroke-zinc-100 dark:stroke-white/5 fill-transparent" strokeWidth="3" />
                  <circle 
                    cx="24" 
                    cy="24" 
                    r="18" 
                    className="stroke-brand-cyan fill-transparent transition-all duration-1000" 
                    strokeWidth="3" 
                    strokeDasharray={`${2 * Math.PI * 18}`}
                    strokeDashoffset={`${2 * Math.PI * 18 * (1 - utilizationRate / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-sky-700 dark:text-brand-cyan">
                  {activeVehiclesCount}/{vehicles.length}
                </span>
              </div>
            </div>

            {/* KPI 2: Security Deployments */}
            <div className="glass-panel p-4 rounded-lg flex items-center justify-between bg-white dark:bg-brand-navy-light shadow-sm">
              <div className="text-left">
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-405 font-bold uppercase tracking-wider">Deployments</span>
                <h4 className="text-xl font-bold font-heading mt-0.5 text-slate-850 dark:text-white">18 / 24</h4>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 mt-0.5 font-mono">Active Guards</p>
              </div>
              <div className="w-16 h-8 flex flex-col justify-end gap-1.5">
                <div className="h-1.5 w-full bg-zinc-150 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-600 to-amber-600 rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-[9px] text-right font-mono text-slate-500 dark:text-slate-400">75% capacity</span>
              </div>
            </div>

            {/* KPI 3: Daily Revenue */}
            <div className="glass-panel p-4 rounded-lg flex items-center justify-between bg-white dark:bg-brand-navy-light shadow-sm">
              <div className="text-left">
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-405 font-bold uppercase tracking-wider">Mock Income</span>
                <h4 className="text-xl font-bold font-heading mt-0.5 text-slate-850 dark:text-white">$48,250</h4>
                <p className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 flex items-center gap-0.5 font-mono">
                  <TrendingUp className="h-3 w-3" /> +12% VS YTD
                </p>
              </div>
              <div className="w-12 h-6">
                <svg className="w-full h-full stroke-emerald-600 dark:stroke-emerald-450 fill-none" strokeWidth="1.5">
                  <path d="M 0 20 Q 8 15 12 18 T 24 10 T 36 12 T 48 2" />
                </svg>
              </div>
            </div>

            {/* KPI 4: Threat Level */}
            <div className="glass-panel p-4 rounded-lg flex items-center justify-between bg-white dark:bg-brand-navy-light shadow-sm">
              <div className="text-left">
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-405 font-bold uppercase tracking-wider">Threat Level</span>
                <h4 className={`text-base font-bold font-heading mt-0.5 uppercase ${
                  threatLevel === 'high' ? 'text-red-700 dark:text-red-400' : threatLevel === 'medium' ? 'text-brand-gold' : 'text-emerald-700 dark:text-emerald-400'
                }`}>
                  {threatLevel} Alert
                </h4>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 mt-0.5 font-mono">Active Protocols</p>
              </div>
              <div className={`p-2 rounded-full ${
                threatLevel === 'high' ? 'bg-red-500/10 text-red-600' : threatLevel === 'medium' ? 'bg-amber-500/10 text-brand-gold' : 'bg-emerald-500/10 text-emerald-650'
              }`}>
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* TAB 1: LIVE MAP */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Telemetry Tracking Map */}
              <div className="lg:col-span-8 space-y-4">
                <div className="glass-panel rounded-xl overflow-hidden border border-zinc-200/60 dark:border-white/5 bg-white/90 dark:bg-brand-navy-light shadow-sm">
                  
                  <div className="border-b border-zinc-200/60 dark:border-white/5 px-6 py-4 flex items-center justify-between bg-zinc-50/50 dark:bg-brand-navy/60">
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-sky-700 dark:text-brand-cyan" />
                      <span className="font-heading font-bold text-xs tracking-wider text-slate-800 dark:text-white">TRANSIT TRACKER MONITOR</span>
                    </div>
                  </div>

                  {/* SVG Map */}
                  <div className="relative aspect-[16/9] w-full bg-zinc-50 dark:bg-zinc-950/80 overflow-hidden select-none border-b border-zinc-200/60 dark:border-white/5">
                    
                    <svg className="absolute inset-0 h-full w-full stroke-zinc-250 dark:stroke-white/[0.03] fill-none" strokeWidth="1">
                      {[...Array(12)].map((_, i) => (
                        <line key={`x-${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" className="map-grid-stroke" />
                      ))}
                      {[...Array(8)].map((_, i) => (
                        <line key={`y-${i}`} x1="0" y1={`${i * 12.5}%`} x2="100%" y2={`${i * 12.5}%`} className="map-grid-stroke" />
                      ))}
                      
                      <path d="M 0 20 L 100 20 M 0 60 L 50 60 L 50 100 M 30 0 L 30 100 M 70 0 L 70 60 L 100 60" className="map-street-stroke" strokeWidth="4" />
                      <path d="M 0 20 L 100 20 M 0 60 L 50 60 L 50 100 M 30 0 L 30 100 M 70 0 L 70 60 L 100 60" className="stroke-sky-600/10 dark:stroke-brand-cyan/20" strokeWidth="1.5" />
                    </svg>

                    <div className="absolute top-[28%] left-[28%] text-[8px] font-mono text-slate-500 dark:text-brand-cyan/40 tracking-widest font-bold">
                      ZONE ALPHA [FBO TERMINAL]
                    </div>
                    <div className="absolute bottom-[40%] right-[22%] text-[8px] font-mono text-slate-550 dark:text-brand-gold/40 tracking-widest font-bold">
                      ZONE CHARLIE [FINANCIAL]
                    </div>
                    <div className="absolute top-[18%] left-[45%] text-[8px] font-mono text-slate-500 dark:text-slate-500/40 tracking-widest font-bold">
                      SECURE GARAGE ALPHA
                    </div>

                    {/* Vehicle nodes */}
                    {vehicles.map((v) => {
                      const isSelected = v.id === selectedVehicleId;
                      return (
                        <div 
                          key={v.id}
                          style={{ left: `${v.x}%`, top: `${v.y}%` }}
                          onClick={() => setSelectedVehicleId(v.id)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                        >
                          <span className={`absolute -inset-2 rounded-full border transition-all ${
                            isSelected 
                              ? 'border-sky-600 dark:border-brand-cyan scale-110 opacity-100' 
                              : 'border-transparent opacity-0 group-hover:opacity-40 scale-90'
                          }`}></span>

                          <div className={`h-2.5 w-2.5 rounded-full border border-white dark:border-zinc-950 shadow shadow-black ${
                            v.status === 'Security Active' 
                              ? 'bg-amber-500' 
                              : v.status === 'In Transit'
                                ? 'bg-sky-600 dark:bg-brand-cyan'
                                : v.status === 'Available'
                                  ? 'bg-emerald-500'
                                  : 'bg-zinc-400'
                          }`} />

                          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-white dark:bg-brand-navy border border-zinc-200 dark:border-white/10 rounded px-1.5 py-0.5 text-[8px] font-mono text-slate-700 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                            {v.code}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected vehicle details panel */}
                  {(() => {
                    const sel = getSelectedVehicle();
                    return (
                      <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-left text-xs bg-zinc-50/50 dark:bg-brand-navy/35">
                        <div className="space-y-1">
                          <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">VEHICLE DETAILS</p>
                          <p className="font-heading font-bold text-slate-800 dark:text-white text-sm">{sel.name}</p>
                          <span className="font-mono text-[9px] bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 px-1 py-0.5 rounded text-sky-700 dark:text-brand-cyan font-bold">{sel.code}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">CREW ASSIGNED</p>
                          <p className="text-slate-700 dark:text-slate-300">Driver: <span className="text-slate-800 dark:text-white font-bold">{sel.driver}</span></p>
                          <p className="text-slate-700 dark:text-slate-300">Security: <span className="text-slate-800 dark:text-white font-bold">{sel.security}</span></p>
                        </div>
                        <div className="space-y-1 font-mono">
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">TELEMETRY DATA</p>
                          <p className="text-slate-700 dark:text-slate-300">Speed: <span className="text-sky-700 dark:text-brand-cyan font-bold">{sel.speed} mph</span></p>
                          <p className="text-slate-700 dark:text-slate-300">Armoring: <span className="text-slate-800 dark:text-white font-bold">{sel.armoringIntegrity}% OK</span></p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">STATUS & DES</p>
                          <p className="text-slate-700 dark:text-slate-300 truncate font-medium">{sel.destination}</p>
                          <p className="mt-1">{getStatusBadge(sel.status)}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="lg:col-span-4 space-y-4 text-left">
                <div className="glass-panel rounded-xl overflow-hidden border border-zinc-200/60 dark:border-white/5 bg-white/90 dark:bg-brand-navy-light shadow-sm flex flex-col justify-between">
                  <div className="border-b border-zinc-200/60 dark:border-white/5 px-6 py-4 flex items-center justify-between bg-zinc-50/50 dark:bg-brand-navy/60">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-sky-700 dark:text-brand-cyan" />
                      <span className="font-heading font-bold text-xs tracking-wider text-slate-800 dark:text-white">TELEMETRY LOGS</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 font-mono flex-1 overflow-y-auto max-h-[300px] lg:max-h-[370px]">
                    {logs.map((log) => (
                      <div key={log.id} className="text-[10px] leading-relaxed flex items-start gap-2 border-b border-zinc-100 dark:border-white/[0.02] pb-2.5 last:border-b-0">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">{log.time}</span>
                        <div className="flex-1">
                          <span className={`px-1 rounded mr-1 text-[8px] font-bold uppercase ${
                            log.type === 'security' 
                              ? 'bg-amber-100 text-amber-900 dark:bg-brand-gold/10 dark:text-brand-gold'
                              : log.type === 'warning'
                                ? 'bg-red-100 text-red-900 dark:bg-red-500/10 dark:text-red-400'
                                : 'bg-sky-100 text-sky-900 dark:bg-brand-cyan/10 dark:text-brand-cyan'
                          }`}>
                            {log.type}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{log.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950/30 p-4 border-t border-zinc-200/60 dark:border-white/5 text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Telemetry Rate:</span>
                      <span className="text-slate-800 dark:text-slate-350 font-bold">Encrypted (5000ms)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLEET TRACKER TABLE */}
          {activeTab === 'fleet' && (
            <div className="glass-panel rounded-xl overflow-hidden border border-zinc-200/60 dark:border-white/5 bg-white/90 dark:bg-brand-navy-light shadow-sm text-left">
              
              <div className="p-6 border-b border-zinc-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-800 dark:text-white">Fleet Inventory</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Detailed list of active rentals, assigned crew, and current telemetry.</p>
                </div>
                
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search fleet..."
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-brand-cyan/50 text-slate-805 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-slate-650 dark:text-slate-300">
                  <thead className="bg-zinc-50 dark:bg-brand-navy/60 text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-zinc-200/60 dark:border-white/5">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-bold">VEHICLE</th>
                      <th className="px-6 py-3.5 text-left font-bold">CLIENT</th>
                      <th className="px-6 py-3.5 text-left font-bold">STATUS</th>
                      <th className="px-6 py-3.5 text-left font-bold">ASSIGNED CREW</th>
                      <th className="px-6 py-3.5 text-left font-bold">SPEED / FUEL</th>
                      <th className="px-6 py-3.5 text-left font-bold">DESTINATION</th>
                      <th className="px-6 py-3.5 text-right font-bold">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5 font-sans text-slate-700 dark:text-slate-300">
                    {filteredVehicles.map((v) => (
                      <tr 
                        key={v.id} 
                        className={`hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] cursor-pointer ${v.id === selectedVehicleId ? 'bg-sky-50/20 dark:bg-brand-cyan/5' : ''}`}
                        onClick={() => setSelectedVehicleId(v.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-heading font-bold text-slate-850 dark:text-white text-xs">{v.name}</div>
                          <div className="text-[10px] text-sky-700 dark:text-brand-cyan font-bold font-mono mt-0.5">{v.code}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-850 dark:text-slate-200 font-bold">
                          {v.client}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(v.status)}
                        </td>
                        <td className="px-6 py-4 text-[11px] text-slate-650 dark:text-slate-400 space-y-0.5 font-medium">
                          <div>Driver: <span className="text-slate-850 dark:text-white font-bold">{v.driver}</span></div>
                          <div>Guard: <span className="text-slate-850 dark:text-white font-bold">{v.security}</span></div>
                        </td>
                        <td className="px-6 py-4 font-mono text-[11px] text-slate-700 dark:text-slate-400">
                          <div>Speed: <span className="text-slate-850 dark:text-white font-bold">{v.speed} mph</span></div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>Fuel:</span>
                            <div className="w-10 h-1 bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-sky-600" style={{ width: `${v.fuel}%` }}></div>
                            </div>
                            <span>{v.fuel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-[150px] truncate font-medium">
                          {v.destination}
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => {
                              const now = new Date();
                              const timeStr = now.toTimeString().split(' ')[0];
                              setLogs(prev => [
                                {
                                  id: Date.now().toString(),
                                  time: timeStr,
                                  message: `DIAGNOSTIC: Telemetry response from ${v.code} OK. Integrity: ${v.armoringIntegrity}%.`,
                                  type: 'info'
                                },
                                ...prev
                              ]);
                            }}
                            className="bg-zinc-100 hover:bg-zinc-200 dark:bg-brand-navy dark:hover:bg-brand-navy-light text-slate-750 dark:text-brand-cyan border border-zinc-250 dark:border-brand-cyan/20 rounded px-2.5 py-1 text-[10px] font-bold transition-all shadow-xxs"
                          >
                            Ping Diagnostics
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TACTICAL CREW PERSONNEL LIST */}
          {activeTab === 'personnel' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-805 dark:text-white">Close Protection Detail & Drivers</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Vetted close protection staff rosters and active assignments.</p>
                </div>
                
                <div className="flex bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded p-1">
                  {['all', 'driver', 'security'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPersonnelFilter(type as 'all' | 'driver' | 'security')}
                      className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${
                        personnelFilter === type ? 'bg-brand-cyan text-slate-900 dark:text-black font-bold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {type === 'all' ? 'All' : type === 'driver' ? 'Drivers' : 'Security'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personnel Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStaff.map((s, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-lg border border-zinc-200 dark:border-white/5 flex flex-col justify-between gap-4 bg-white/90 dark:bg-brand-navy-light shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className={`h-11 w-11 rounded flex items-center justify-center border shrink-0 ${
                        s.role === 'Driver' 
                          ? 'bg-sky-600/10 border-sky-600/25 text-sky-700 dark:text-brand-cyan' 
                          : 'bg-amber-600/10 border-amber-600/25 text-amber-800 dark:text-brand-gold'
                      }`}>
                        <UserCheck className="h-5.5 w-5.5" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="font-heading font-bold text-slate-805 dark:text-white text-sm">{s.name}</div>
                        <p className={`text-[9px] font-mono uppercase font-bold tracking-wider ${
                          s.role === 'Driver' ? 'text-sky-700 dark:text-brand-cyan' : 'text-amber-800 dark:text-brand-gold'
                        }`}>
                          {s.role}
                        </p>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold">BG: {s.bg}</p>
                      </div>
                    </div>

                    <div className="border-t border-zinc-150 dark:border-white/5 pt-3 text-[10px] font-mono text-slate-550 dark:text-slate-400 space-y-1.5 font-bold">
                      <div className="flex justify-between">
                        <span>Credentials:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{s.credentials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assignment:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{s.assignment}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-150 dark:border-white/5 pt-3">
                      <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[9px] font-bold uppercase ${
                        s.status === 'Active Duty' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-zinc-500/15 text-slate-650 dark:text-zinc-400'
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${s.status === 'Active Duty' ? 'bg-emerald-650' : 'bg-slate-500'}`}></span>
                        {s.status}
                      </span>

                      <button 
                        onClick={() => {
                          const now = new Date();
                          const timeStr = now.toTimeString().split(' ')[0];
                          setLogs(prev => [
                            {
                              id: Date.now().toString(),
                              time: timeStr,
                              message: `STATUS: Roster status verified for ${s.name}. Status: Standby OK.`,
                              type: 'info'
                            },
                            ...prev
                          ]);
                        }}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        Verify Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl text-left space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">System Advisory Controls</h3>
                <p className="text-xs text-slate-650 dark:text-slate-400 font-semibold">Manage global simulation settings, including threat advisory levels.</p>
              </div>

              <div className="glass-panel rounded-xl border border-zinc-200/60 dark:border-white/5 p-6 bg-white/90 dark:bg-brand-navy-light shadow-sm space-y-6">
                
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                    GLOBAL THREAT ADVISORY LEVEL
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
                                message: `SYSTEM STATE: Threat level changed to ${lvl.toUpperCase()}. Roster updated.`,
                                type: lvl === 'high' ? 'security' : 'info'
                              },
                              ...prev
                            ]);
                          }}
                          className={`rounded border px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                            isActive
                              ? lvl === 'high' 
                                ? 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400 font-extrabold shadow-sm' 
                                : lvl === 'medium'
                                  ? 'bg-amber-500/10 border-brand-gold text-amber-800 dark:text-brand-gold font-extrabold shadow-sm'
                                  : 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-extrabold shadow-sm'
                              : 'bg-transparent border-zinc-250 dark:border-white/5 text-slate-500 hover:bg-zinc-50 dark:hover:bg-white/5'
                          }`}
                        >
                          <ShieldCheck className="h-4.5 w-4.5" />
                          {lvl} Level
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 border-t border-zinc-150 dark:border-white/5 pt-6">
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-1">Telemetry Overrides</p>
                  
                  <div className="flex items-center justify-between py-2 border-b border-zinc-150 dark:border-white/[0.02]">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">Active Satellite Encryption</p>
                      <p className="text-[10px] text-slate-650 dark:text-slate-400 font-semibold">Routes telemetry traffic via dual-link secure channels.</p>
                    </div>
                    <button className="bg-zinc-100 dark:bg-brand-navy border border-zinc-250 dark:border-brand-cyan/20 text-slate-705 dark:text-brand-cyan text-xxs font-mono font-bold px-2.5 py-1 rounded">
                      ENABLED
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">High-Speed Refresh Rate</p>
                      <p className="text-[10px] text-slate-650 dark:text-slate-400 font-semibold">Increase simulated coordinates jitter rate from 5s to 2s.</p>
                    </div>
                    <button className="bg-zinc-100 dark:bg-brand-navy border border-zinc-250 dark:border-brand-cyan/20 text-slate-600 dark:text-brand-cyan/70 hover:text-sky-700 dark:hover:text-brand-cyan text-xxs font-mono font-bold px-2.5 py-1 rounded">
                      ACTIVATE
                    </button>
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
