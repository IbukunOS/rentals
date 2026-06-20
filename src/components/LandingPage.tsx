import { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Check,
  Sun,
  Moon,
  Users,
  Lock,
  Activity,
  Award
} from 'lucide-react';

interface Car {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  specs: {
    engine: string;
    power: string;
    armoring: string;
    seating: string;
  };
  features: string[];
}

export const CARS_DATA: Car[] = [
  {
    id: 'mercedes-s-guard',
    name: 'Mercedes-Benz S-Class Guard',
    category: 'Executive Armored Sedan',
    basePrice: 1200,
    image: '/luxury_armored_sedan.jpg',
    specs: {
      engine: '6.0L V12 Bi-Turbo',
      power: '612 HP',
      armoring: 'VR10 Ballistic Protection',
      seating: '4 Passengers'
    },
    features: [
      'Resists sniper armor-piercing rounds',
      'Under-body blast grenade protection',
      'Run-flat tyre system (50-mile range)',
      'Self-sealing fuel tank & oxygen system'
    ]
  },
  {
    id: 'cadillac-escalade',
    name: 'Cadillac Escalade ESV VIP',
    category: 'Tactical Armored SUV',
    basePrice: 1500,
    image: '/luxury_armored_suv.jpg',
    specs: {
      engine: '6.2L V8 Supercharged',
      power: '682 HP',
      armoring: 'BR7 Ballistic Protection',
      seating: '6 Passengers'
    },
    features: [
      'Heavy assault rifle resistance',
      'Armored firewall and steel bulkheads',
      'Smart TV & satellite secure comms',
      'External Siren, PA, & strobe systems'
    ]
  },
  {
    id: 'rolls-royce-phantom',
    name: 'Rolls-Royce Phantom EWB',
    category: 'Pinnacle Bespoke Luxury',
    basePrice: 2500,
    image: '/luxury_bespoke_sedan.jpg',
    specs: {
      engine: '6.75L V12 Twin-Turbo',
      power: '563 HP',
      armoring: 'Light Armoring (VR4 Handgun)',
      seating: '4 Passengers'
    },
    features: [
      'Starlight headliner & bespoke cabin',
      'Whisper-quiet acoustic soundproofing',
      'Discrete handgun protection glass',
      'Active air suspension & comfort ride'
    ]
  }
];

interface LandingPageProps {
  onNavigateToAdmin: () => void;
  onOpenBookingModal: (carId: string) => void;
  selectedPackages: Record<string, { driver: boolean; security: boolean }>;
  setSelectedPackages: React.Dispatch<React.SetStateAction<Record<string, { driver: boolean; security: boolean }>>>;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function LandingPage({
  onNavigateToAdmin,
  onOpenBookingModal,
  selectedPackages,
  setSelectedPackages,
  theme,
  setTheme,
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Track which car details card is expanded
  const [expandedCarId, setExpandedCarId] = useState<string | null>(null);

  // Tabbed system for Security Core
  const [activeSecurityTab, setActiveSecurityTab] = useState<'drivers' | 'protection' | 'armoring'>('drivers');

  const testimonials = [
    {
      name: "Marcus Vance",
      title: "Chief Security Officer, NexaCorp Global",
      review: "Aegis Elite provides an unmatched standard of security and transportation. The VR10 S-Class Guard and their close-protection agents are exemplary. They handled our executive logistics flawlessly.",
      rating: 5,
      avatar: "M"
    },
    {
      name: "Elena Rostova",
      title: "Consular Representative, EU Delegation",
      review: "For VIP transport in high-risk zones, there is no other choice. The armored Escalade VIP was pristine, the tactical driver was incredibly skilled in defensive maneuvers, and the coordination was impeccable.",
      rating: 5,
      avatar: "E"
    },
    {
      name: "Sir David Attenbury",
      title: "Managing Partner, Attenbury & Co.",
      review: "The discretion, reliability, and level of professionalism displayed by the Aegis team is of the highest caliber. They don't just rent luxury cars; they deploy a seamless executive shield.",
      rating: 5,
      avatar: "D"
    }
  ];

  const togglePackage = (carId: string, pkgType: 'driver' | 'security') => {
    setSelectedPackages(prev => ({
      ...prev,
      [carId]: {
        ...prev[carId],
        [pkgType]: !prev[carId][pkgType]
      }
    }));
  };

  const calculateTotal = (carId: string) => {
    const car = CARS_DATA.find(c => c.id === carId);
    if (!car) return 0;
    let total = car.basePrice;
    if (selectedPackages[carId]?.driver) total += 250;
    if (selectedPackages[carId]?.security) total += 600;
    return total;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-brand-obsidian text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[8%] left-[-5%] w-80 h-80 rounded-full bg-sky-200/20 dark:bg-sky-900/6 blur-3xl animate-float-1" />
        <div className="absolute top-[35%] right-[-5%] w-[480px] h-[480px] rounded-full bg-amber-100/15 dark:bg-amber-900/4 blur-3xl animate-float-2" />
        <div className="absolute bottom-[20%] left-[8%] w-[380px] h-[380px] rounded-full bg-sky-100/15 dark:bg-sky-900/6 blur-3xl animate-float-3" />
      </div>

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-zinc-200/60 dark:border-white/5 bg-brand-obsidian/85 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Shield className="h-7 w-7 text-brand-cyan" />
              <span className="font-heading text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                Aegis<span className="text-brand-cyan">Elite</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('fleet')} 
                className="text-xs font-bold tracking-wider text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                THE FLEET
              </button>
              <button 
                onClick={() => scrollToSection('security-core')} 
                className="text-xs font-bold tracking-wider text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                SECURITY CORE
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-xs font-bold tracking-wider text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                TESTIMONIALS
              </button>
              <a 
                href="#admin" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToAdmin();
                }}
                className="text-xs font-bold tracking-wider text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors border-l border-zinc-200 dark:border-white/10 pl-6 flex items-center gap-1.5"
              >
                <Sliders className="h-4.5 w-4.5 text-brand-cyan/70" />
                ADMIN PANEL
              </a>
            </div>

            {/* Right actions: Theme Selector & Booking CTA */}
            <div className="hidden md:flex items-center gap-6">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'dark')}
                className="p-2.5 rounded-full hover:bg-zinc-155 dark:hover:bg-white/5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all"
                title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              </button>

              <button 
                onClick={() => scrollToSection('fleet')}
                className="rounded bg-brand-cyan px-5 py-2.5 text-xs font-bold tracking-wider text-slate-900 dark:text-black hover:bg-brand-cyan-dark transition-all duration-300"
              >
                BOOK NOW
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Theme Toggle (Mobile) */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-cyan transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-20 z-30 border-b border-zinc-200 dark:border-white/5 bg-brand-obsidian/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 animate-fade-in-up">
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-cyan border-b border-zinc-100 dark:border-white/5"
            >
              THE FLEET
            </button>
            <button 
              onClick={() => scrollToSection('security-core')} 
              className="text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-cyan border-b border-zinc-100 dark:border-white/5"
            >
              SECURITY CORE
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-cyan border-b border-zinc-100 dark:border-white/5"
            >
              TESTIMONIALS
            </button>
            <a 
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigateToAdmin();
              }}
              className="py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-cyan border-b border-zinc-100 dark:border-white/5 flex items-center gap-2"
            >
              <Sliders className="h-4.5 w-4.5 text-brand-cyan" />
              ADMIN DASHBOARD
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('fleet');
              }}
              className="mt-2 w-full rounded bg-brand-cyan py-3 text-center text-sm font-bold text-slate-900 dark:text-black"
            >
              BOOK SECURE TRANSIT
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-white/5">
      {/* Background Cyber Glow Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,240,255,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,175,55,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
        
        <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded bg-zinc-100 dark:bg-white/5 px-3 py-1 w-fit">
              <span className="text-[10px] font-extrabold tracking-widest text-slate-650 dark:text-slate-400 uppercase">
                EXECUTIVE MOBILITY
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Elite Security.<br/>
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                Refined Luxury.
              </span>
            </h1>

            <p className="text-base text-slate-650 dark:text-slate-400 max-w-lg leading-relaxed font-semibold">
              A bespoke armored fleet tailored for corporate officers, diplomats, and private VIP clients. Secure your transit with customized driver and defense detail configurations.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('fleet')}
                className="group flex items-center justify-center gap-2 rounded bg-brand-cyan hover:bg-brand-cyan-dark px-7 py-3.5 text-sm font-bold text-slate-900 dark:text-black transition-all"
              >
                Explore The Fleet
                <ArrowRight className="h-4.5 w-4.5 text-slate-900 dark:text-black transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => scrollToSection('security-core')}
                className="flex items-center justify-center gap-2 rounded border border-zinc-300 dark:border-white/10 bg-white/40 dark:bg-transparent hover:bg-zinc-50 dark:hover:bg-white/5 px-7 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-200 transition-all"
              >
                Security Standards
              </button>
            </div>
          </div>

          {/* Hero Graphic Card */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative glass-panel rounded-xl p-3 w-full max-w-lg overflow-hidden shadow-lg border border-zinc-200/80 dark:border-white/5 bg-white/70 dark:bg-brand-navy-light">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-950/80">
                <img 
                  src="/luxury_armored_suv.jpg" 
                  alt="Aegis Armored SUV" 
                  className="h-full w-full object-cover object-center opacity-95 dark:opacity-90"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-brand-navy/90 backdrop-blur-md rounded px-2.5 py-1 text-[9px] font-bold tracking-wider text-slate-800 dark:text-slate-200">
                  REF: ESCALADE TACTICAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase Grid */}
      <section id="fleet" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50/20 dark:bg-zinc-950/20">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-brand-cyan">
              THE AEGIS SHOWCASE
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Bespoke Armored Fleet
            </p>
            <p className="text-sm text-slate-650 dark:text-slate-400 font-semibold">
              Choose a base vehicle class, then click "Configure Options & Specs" to select protection packages and view technical certifications.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CARS_DATA.map((car) => {
              const isExpanded = expandedCarId === car.id;
              const hasDriver = selectedPackages[car.id]?.driver || false;
              const hasSecurity = selectedPackages[car.id]?.security || false;
              const currentTotal = calculateTotal(car.id);

              return (
                <div 
                  key={car.id} 
                  className="glass-panel rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 border border-zinc-200 dark:border-white/5 relative bg-white/90 dark:bg-brand-navy-light shadow-sm"
                >
                  {/* Car Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-brand-obsidian border-b border-zinc-100 dark:border-white/5">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Car Details Summary */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase">{car.category}</span>
                        <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white leading-snug">
                          {car.name}
                        </h3>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-baseline">
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Base Daily Rate</span>
                        <span className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                          ${car.basePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Configuration Toggle Trigger */}
                    <div className="pt-2 border-t border-zinc-150 dark:border-white/5">
                      <button
                        onClick={() => setExpandedCarId(isExpanded ? null : car.id)}
                        className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-cyan transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Options & Specs' : 'Configure Options & Specs'}</span>
                        {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                      </button>

                      {/* Expandable options Panel */}
                      {isExpanded && (
                        <div className="pt-4 pb-2 space-y-4 border-t border-zinc-150 dark:border-white/5 mt-2 animate-fade-in-up">
                          {/* Specs summary block */}
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-650 dark:text-slate-350 bg-zinc-100/50 dark:bg-white/2 p-2.5 rounded border border-zinc-150 dark:border-transparent">
                            <div>Eng: {car.specs.engine}</div>
                            <div>Pwr: {car.specs.power}</div>
                            <div>Seating: {car.specs.seating}</div>
                            <div className="text-brand-cyan font-bold truncate">Ballistics: {car.specs.armoring.split(' ')[0]}</div>
                          </div>

                          {/* Package selection checkboxes */}
                          <div className="space-y-2">
                            {/* Standard Rent */}
                            <div className="flex items-center justify-between rounded bg-zinc-100 dark:bg-white/5 px-2.5 py-2 text-xxs text-slate-700 dark:text-slate-300 border border-zinc-150 dark:border-transparent">
                              <span>Standard Vehicle Rental</span>
                              <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">Included</span>
                            </div>

                            {/* Driver Toggle */}
                            <button
                              onClick={() => togglePackage(car.id, 'driver')}
                              className={`w-full flex items-center justify-between rounded border px-2.5 py-2 text-xxs transition-all ${
                                hasDriver 
                                  ? 'bg-brand-cyan/15 border-brand-cyan/40 text-slate-900 dark:text-white font-bold shadow-sm' 
                                  : 'bg-transparent border-zinc-200 dark:border-white/5 text-slate-650 dark:text-slate-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                                  hasDriver ? 'bg-brand-cyan border-brand-cyan text-slate-900 dark:text-black' : 'border-slate-500 dark:border-slate-400'
                                }`}>
                                  {hasDriver && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                                <span className="font-semibold">Tactical Driver</span>
                              </div>
                              <span className="font-mono font-bold text-brand-cyan">+$250/day</span>
                            </button>

                            {/* Security Toggle */}
                            <button
                              onClick={() => togglePackage(car.id, 'security')}
                              className={`w-full flex items-center justify-between rounded border px-2.5 py-2 text-xxs transition-all ${
                                hasSecurity 
                                  ? 'bg-brand-gold/15 border-brand-gold/40 text-slate-900 dark:text-white font-bold shadow-sm' 
                                  : 'bg-transparent border-zinc-200 dark:border-white/5 text-slate-655 dark:text-slate-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                                  hasSecurity ? 'bg-brand-gold border-brand-gold text-slate-900 dark:text-black' : 'border-slate-500 dark:border-slate-400'
                                }`}>
                                  {hasSecurity && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                                <span className="font-semibold">Close Security Agent</span>
                              </div>
                              <span className="font-mono font-bold text-brand-gold">+$600/day</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Final Totals & Actions */}
                    <div className="pt-4 flex items-center justify-between border-t border-zinc-150 dark:border-white/5">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Total Rate</span>
                        <p className="text-xl font-bold font-heading text-slate-900 dark:text-white tracking-wide">
                          ${currentTotal.toLocaleString()}
                          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/day</span>
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => onOpenBookingModal(car.id)}
                        className="rounded bg-brand-cyan px-5 py-2.5 text-xs font-bold text-slate-900 dark:text-black hover:bg-brand-cyan-dark transition-all"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Core - Sleek Tabbed Panel */}
      <section id="security-core" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/60 dark:border-white/5">
        <div className="relative mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-brand-cyan">
              SECURITY CORE
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Aegis Security Operations
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
              We employ strict tactical screening protocols to maintain an elite standard of close-protection service.
            </p>
          </div>

          {/* Interactive tabs */}
          <div className="flex justify-center border-b border-zinc-200 dark:border-white/5 mb-8">
            <div className="flex gap-2 sm:gap-6">
              <button
                onClick={() => setActiveSecurityTab('drivers')}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeSecurityTab === 'drivers' 
                    ? 'border-brand-cyan text-brand-cyan' 
                    : 'border-transparent text-slate-550 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Tactical Drivers
              </button>
              <button
                onClick={() => setActiveSecurityTab('protection')}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeSecurityTab === 'protection' 
                    ? 'border-brand-cyan text-brand-cyan' 
                    : 'border-transparent text-slate-550 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Armed Protection
              </button>
              <button
                onClick={() => setActiveSecurityTab('armoring')}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeSecurityTab === 'armoring' 
                    ? 'border-brand-cyan text-brand-cyan' 
                    : 'border-transparent text-slate-550 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Armored Vehicles
              </button>
            </div>
          </div>

          {/* Tab content panel */}
          <div className="glass-panel p-8 rounded-xl border border-zinc-200 dark:border-white/5 text-left min-h-[220px] flex flex-col justify-center animate-fade-in-up bg-white/90 dark:bg-brand-navy-light shadow-sm">
            {activeSecurityTab === 'drivers' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white">Professional Tactical Chauffeurs</h3>
                </div>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                  All operators are certified defensive driving specialists, extensively trained in ambush evasion, high-speed vehicle control, and route analytics. Vetted continuously with comprehensive criminal background checks and drug screenings.
                </p>
                <div className="flex gap-4 text-xxs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-cyan" /> Defensive Certifications</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-cyan" /> Full NDA Vetted</span>
                </div>
              </div>
            )}

            {activeSecurityTab === 'protection' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white">Armed Close Protection Officers</h3>
                </div>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                  Our tactical close protection details are composed of veterans from municipal SWAT teams, military police, and elite units. Experienced in threat mitigation, tactical coordination, and medical trauma response protocols.
                </p>
                <div className="flex gap-4 text-xxs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-gold" /> Ex-Special Forces</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-gold" /> Combat Trauma Care</span>
                </div>
              </div>
            )}

            {activeSecurityTab === 'armoring' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white">Ballistic & Blast Certified Armoring</h3>
                </div>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                  Vehicles are armored to VR10 and BR7 ballistic standards. Outfitted with heavy passenger compartment plating, blast-resistant flooring, run-flat tires, reinforced suspension, and custom cabin air filtrations.
                </p>
                <div className="flex gap-4 text-xxs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-cyan" /> VR10/BR7 Verified</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-cyan" /> Expl. Blast Mitigation</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50/20 dark:bg-zinc-950/20">
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-brand-cyan">
              TRUSTED REVIEWS
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Testimonials
            </p>
          </div>

          <div className="relative glass-panel rounded-xl p-8 sm:p-10 border border-zinc-200 dark:border-white/5 overflow-hidden bg-white/95 dark:bg-brand-navy-light text-center sm:text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex gap-1 justify-center sm:justify-start">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              <blockquote className="text-lg font-bold leading-relaxed text-slate-800 dark:text-slate-200">
                "{testimonials[activeTestimonial].review}"
              </blockquote>

              <div className="flex items-center gap-4 justify-center sm:justify-start pt-4 border-t border-zinc-150 dark:border-white/5">
                <div className="h-10 w-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center font-heading text-sm font-bold text-brand-cyan">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-slate-800 dark:text-white text-sm">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-[10px] text-slate-650 dark:text-slate-400 font-bold uppercase tracking-wider">
                    {testimonials[activeTestimonial].title}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? 'w-6 bg-brand-cyan' : 'w-2 bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200/60 dark:border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-brand-obsidian">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-cyan" />
              <span className="font-heading text-base font-bold tracking-widest uppercase text-slate-800 dark:text-white">
                Aegis<span className="text-brand-cyan">Elite</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs font-semibold">
              Vetted executive protection & armored transport solutions. Securing transit for high-profile clients globally.
            </p>
            <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 pt-2">
              EST. 2018 | Aegis Security Group Ltd.
            </div>
          </div>

          {/* Links 1 */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">FLEET DETAILS</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-bold">
              <li><button onClick={() => scrollToSection('fleet')} className="hover:text-brand-cyan">Armored Sedans</button></li>
              <li><button onClick={() => scrollToSection('fleet')} className="hover:text-brand-cyan">Tactical SUVs</button></li>
              <li><button onClick={() => scrollToSection('fleet')} className="hover:text-brand-cyan">Bespoke Executive Class</button></li>
              <li><button onClick={() => scrollToSection('security-core')} className="hover:text-brand-cyan">Armoring Standards</button></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">STANDARDS & LEGAL</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-bold">
              <li><a href="#privacy" className="hover:text-brand-cyan">Privacy & NDA Assurances</a></li>
              <li><a href="#licensing" className="hover:text-brand-cyan">Armed Protection Licensing</a></li>
              <li><a href="#liability" className="hover:text-brand-cyan">Insurance & Liability Limits</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">SECURITY NEWS</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
              Subscribe to global corporate safety newsletters.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 pt-1 max-w-sm">
              <input
                type="email"
                placeholder="Secure email"
                required
                className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-cyan/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
              <button
                type="submit"
                className="rounded bg-brand-cyan px-4 py-2 text-xs font-bold text-slate-900 dark:text-black hover:bg-brand-cyan-dark transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
