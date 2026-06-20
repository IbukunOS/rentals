import { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Award, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  Globe, 
  Lock, 
  ChevronRight, 
  Users, 
  Key, 
  Activity, 
  Sliders, 
  DollarSign, 
  Check 
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
}

export function LandingPage({
  onNavigateToAdmin,
  onOpenBookingModal,
  selectedPackages,
  setSelectedPackages,
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
    <div className="relative min-h-screen bg-brand-obsidian text-slate-100 selection:bg-brand-cyan/30 selection:text-brand-cyan">
      
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-brand-obsidian/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Shield className="h-8 w-8 text-brand-cyan glow-cyan" />
              <span className="font-heading text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-white via-slate-200 to-brand-cyan bg-clip-text text-transparent">
                Aegis<span className="text-brand-cyan">Elite</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('fleet')} 
                className="text-sm font-medium tracking-wide text-slate-400 hover:text-brand-cyan transition-colors"
              >
                THE FLEET
              </button>
              <button 
                onClick={() => scrollToSection('security-core')} 
                className="text-sm font-medium tracking-wide text-slate-400 hover:text-brand-cyan transition-colors"
              >
                SECURITY CORE
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-sm font-medium tracking-wide text-slate-400 hover:text-brand-cyan transition-colors"
              >
                TRUST & TESTIMONIALS
              </button>
              <a 
                href="#admin" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToAdmin();
                }}
                className="text-sm font-medium tracking-wide text-slate-400 hover:text-brand-cyan transition-colors border-l border-white/10 pl-6 flex items-center gap-1.5"
              >
                <Sliders className="h-4 w-4 text-brand-cyan/70" />
                ADMIN PANEL
              </a>
            </div>

            {/* Book Now CTA */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => scrollToSection('fleet')}
                className="relative overflow-hidden rounded-md bg-gradient-to-r from-brand-cyan-dark to-brand-cyan px-5 py-2.5 text-sm font-semibold tracking-wider text-black shadow-lg shadow-brand-cyan/15 hover:shadow-brand-cyan/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                BOOK SECURE TRANSIT
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={onNavigateToAdmin}
                className="p-2 text-slate-400 hover:text-brand-cyan transition-colors"
                title="Admin Dashboard"
              >
                <Sliders className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-brand-cyan transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-20 z-30 border-b border-white/5 bg-brand-obsidian/95 backdrop-blur-xl px-4 py-6 flex flex-col gap-5 animate-fade-in-up">
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="text-left py-2 font-medium tracking-wide text-slate-300 hover:text-brand-cyan transition-colors border-b border-white/5"
            >
              THE FLEET
            </button>
            <button 
              onClick={() => scrollToSection('security-core')} 
              className="text-left py-2 font-medium tracking-wide text-slate-300 hover:text-brand-cyan transition-colors border-b border-white/5"
            >
              SECURITY CORE
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-left py-2 font-medium tracking-wide text-slate-300 hover:text-brand-cyan transition-colors border-b border-white/5"
            >
              TRUST & TESTIMONIALS
            </button>
            <a 
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigateToAdmin();
              }}
              className="py-2 font-medium tracking-wide text-slate-300 hover:text-brand-cyan transition-colors border-b border-white/5 flex items-center gap-2"
            >
              <Sliders className="h-5 w-5 text-brand-cyan" />
              ADMIN DASHBOARD
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('fleet');
              }}
              className="mt-2 w-full rounded bg-gradient-to-r from-brand-cyan-dark to-brand-cyan py-3 text-center font-bold tracking-wider text-black shadow-lg shadow-brand-cyan/20"
            >
              BOOK SECURE TRANSIT
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        {/* Background Cyber Glow Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,240,255,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,175,55,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero text content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 px-4 py-1.5 w-fit">
              <ShieldCheck className="h-4 w-4 text-brand-cyan" />
              <span className="text-xs font-semibold tracking-widest text-brand-cyan uppercase">
                TACTICAL EXECUTIVE MOBILITY
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Elite Security.<br/>
              <span className="bg-gradient-to-r from-brand-cyan via-white to-brand-gold bg-clip-text text-transparent">
                Uncompromising Luxury.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              The pinnacle of armored transport. Secure your transit with customized protective detail packages including military-grade vehicles, professional tactical drivers, and close protection agents.
            </p>

            {/* Specs Badges */}
            <div className="grid grid-cols-3 gap-4 py-2 border-y border-white/5 max-w-md">
              <div>
                <p className="text-2xl font-bold font-heading text-brand-cyan">VR10</p>
                <p className="text-xxs text-slate-500 uppercase tracking-widest mt-0.5">Max Ballistics</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-brand-gold">100%</p>
                <p className="text-xxs text-slate-500 uppercase tracking-widest mt-0.5">Vetted Officers</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-white">24/7</p>
                <p className="text-xxs text-slate-500 uppercase tracking-widest mt-0.5">GPS Telemetry</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('fleet')}
                className="group flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand-cyan-dark to-brand-cyan px-8 py-4 text-base font-bold text-black shadow-lg shadow-brand-cyan/15 hover:shadow-brand-cyan/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                SELECT VEHICLE
                <ArrowRight className="h-5 w-5 text-black transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => scrollToSection('security-core')}
                className="flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                LEARN PROTOCOLS
              </button>
            </div>
          </div>

          {/* Hero Hero Showcase Image Card */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Decorative background radar lines */}
            <div className="absolute w-[110%] h-[110%] rounded-full border border-brand-cyan/10 animate-pulse pointer-events-none" />
            <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 pointer-events-none" />
            
            {/* The main card */}
            <div className="relative glass-panel rounded-2xl p-4 sm:p-6 w-full max-w-lg border border-white/10 glow-cyan-box/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/10 to-transparent opacity-30 pointer-events-none" />
              
              {/* Fleet preview image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-950/80">
                <img 
                  src="/luxury_armored_suv.jpg" 
                  alt="Aegis Elite Armored SUV Fleet" 
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                
                {/* HUD overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-brand-obsidian/85 backdrop-blur-md border border-brand-cyan/30 rounded px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-brand-cyan flex items-center gap-1.5 uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                  </span>
                  LOCKED & ARMORED
                </div>
                
                <div className="absolute bottom-4 right-4 bg-brand-navy/90 backdrop-blur-md border border-white/10 rounded px-3 py-1.5 text-xxs font-mono text-slate-300">
                  REF ID: <span className="text-white font-bold">BR7-CADILLAC</span>
                </div>
              </div>

              {/* Card specs */}
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="font-heading text-xl font-bold tracking-wide text-white">Escalade ESV Tactical</h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                    <Shield className="h-4 w-4 text-brand-cyan" /> Heavy Armoring + Private Security Escort Available
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xxs uppercase tracking-wider text-slate-500 font-bold">Standard Base</p>
                  <p className="text-2xl font-bold font-heading text-brand-cyan">$1,500<span className="text-xs font-normal text-slate-400">/day</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet & Packages Showcase Section */}
      <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,22,38,0.3),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan glow-cyan">
              EXECUTIVE TRANSPORT FLEET
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Select Your Class & Security Protocols
            </p>
            <div className="w-12 h-1 bg-brand-cyan mx-auto rounded" />
            <p className="text-slate-400">
              Customize your protection package per vehicle. Standard rental rates can be augmented with certified tactical drivers and close protection agents. Price updates in real time.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CARS_DATA.map((car) => {
              const hasDriver = selectedPackages[car.id]?.driver || false;
              const hasSecurity = selectedPackages[car.id]?.security || false;
              const currentTotal = calculateTotal(car.id);

              return (
                <div 
                  key={car.id} 
                  className="glass-panel glass-panel-hover rounded-xl flex flex-col justify-between overflow-hidden group border border-white/5 relative"
                >
                  {/* Decorative corner tag for armoring status */}
                  <div className="absolute top-4 left-4 z-10 bg-brand-obsidian/90 backdrop-blur-md border border-white/10 rounded px-2.5 py-1 text-xxs font-mono font-bold tracking-wider text-slate-300">
                    {car.specs.armoring.split(' ')[0]} Protection
                  </div>

                  {/* Car Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-obsidian">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                  </div>

                  {/* Car Details */}
                  <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Type */}
                      <div className="space-y-1">
                        <p className="text-xs font-semibold tracking-wider text-brand-cyan uppercase">{car.category}</p>
                        <h3 className="font-heading text-xl font-bold tracking-wide text-white group-hover:text-brand-cyan transition-colors">
                          {car.name}
                        </h3>
                      </div>

                      {/* Specs List */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-4 border-b border-white/5 text-xxs font-mono text-slate-400 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Sliders className="h-3 w-3 text-slate-500" />
                          <span>Eng: {car.specs.engine}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-slate-500" />
                          <span>Pwr: {car.specs.power}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Shield className="h-3 w-3 text-slate-500" />
                          <span>Arm: {car.specs.armoring.replace(' Protection', '')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3 w-3 text-slate-500" />
                          <span>Cap: {car.specs.seating}</span>
                        </div>
                      </div>

                      {/* Armoring Features Bullet Points */}
                      <ul className="mt-4 space-y-2 text-xs text-slate-400">
                        {car.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-cyan mt-1">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium Add-on Packages */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <p className="text-xxs uppercase tracking-widest text-slate-400 font-bold">Customize Packages</p>
                      
                      {/* Base Pack (Standard) - always active */}
                      <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2 text-xs">
                        <span className="text-slate-300 font-medium">Standard Vehicle Rental</span>
                        <span className="font-mono text-slate-500">Included</span>
                      </div>

                      {/* Driver Pack Toggle */}
                      <button
                        onClick={() => togglePackage(car.id, 'driver')}
                        className={`w-full flex items-center justify-between rounded border px-3 py-2 text-xs transition-all ${
                          hasDriver 
                            ? 'bg-brand-cyan/10 border-brand-cyan/40 text-white' 
                            : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                            hasDriver ? 'bg-brand-cyan border-brand-cyan text-black' : 'border-slate-600'
                          }`}>
                            {hasDriver && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span className="font-medium text-left">Professional Tactical Driver</span>
                        </div>
                        <span className={`font-mono text-[10px] ${hasDriver ? 'text-brand-cyan font-bold' : 'text-slate-500'}`}>+$250/day</span>
                      </button>

                      {/* Security Detail Toggle */}
                      <button
                        onClick={() => togglePackage(car.id, 'security')}
                        className={`w-full flex items-center justify-between rounded border px-3 py-2 text-xs transition-all ${
                          hasSecurity 
                            ? 'bg-brand-gold/10 border-brand-gold/40 text-white' 
                            : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                            hasSecurity ? 'bg-brand-gold border-brand-gold text-black' : 'border-slate-600'
                          }`}>
                            {hasSecurity && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span className="font-medium text-left">Executive Security Agent</span>
                        </div>
                        <span className={`font-mono text-[10px] ${hasSecurity ? 'text-brand-gold font-bold' : 'text-slate-500'}`}>+$600/day</span>
                      </button>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="pt-4 flex items-center justify-between border-t border-white/5">
                      <div>
                        <p className="text-xxs uppercase tracking-wider text-slate-500 font-bold">Total Est. Rate</p>
                        <p className="text-2xl font-bold font-heading text-brand-cyan tracking-wide">
                          ${currentTotal.toLocaleString()}
                          <span className="text-xs font-normal text-slate-400">/day</span>
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => onOpenBookingModal(car.id)}
                        className="rounded bg-gradient-to-r from-brand-cyan-dark to-brand-cyan hover:glow-cyan-box px-4 py-2.5 text-xs font-bold tracking-wider text-black transition-all hover:shadow-lg hover:shadow-brand-cyan/20"
                      >
                        RESERVE NOW
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Security & Trust Core Section */}
      <section id="security-core" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,240,255,0.03),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan glow-cyan">
              SAFETY & SECURE PROTOCOLS
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              The Aegis Protection Guarantee
            </p>
            <div className="w-12 h-1 bg-brand-cyan mx-auto rounded" />
            <p className="text-slate-400">
              Security is not an add-on; it is our foundation. All security operations are overseen by military and intelligence sector veterans.
            </p>
          </div>

          {/* Grid detailing elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Drivers */}
            <div className="glass-panel p-8 rounded-xl border border-white/5 text-left space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="h-12 w-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center">
                <Users className="h-6 w-6 text-brand-cyan" />
              </div>
              <h3 className="font-heading text-xl font-bold tracking-wide text-white">Professional Tactical Drivers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our drivers are not chauffeurs; they are mobility specialists. All drivers undergo rigorous federal background checks, drug screenings, VIP customer service training, and extensive courses in evasive driving maneuvers.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-cyan" />
                  <span>Certified Defensive Driving Level III</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-cyan" />
                  <span>Non-Disclosure Agreement Vetted</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Tactical Security */}
            <div className="glass-panel p-8 rounded-xl border border-white/5 text-left space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="h-12 w-12 rounded-lg bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center">
                <Shield className="h-6 w-6 text-brand-gold" />
              </div>
              <h3 className="font-heading text-xl font-bold tracking-wide text-white">Executive Close Protection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Close protection personnel are drawn exclusively from elite military units, special forces, and municipal tactical policing teams. They are fully trained in threat mitigation, weapon systems, first aid trauma care, and exfiltration protocols.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-gold" />
                  <span>Ex-Special Forces Personnel</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-gold" />
                  <span>Active Armed License & Trauma Certified</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Armoring */}
            <div className="glass-panel p-8 rounded-xl border border-white/5 text-left space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="h-12 w-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center">
                <Lock className="h-6 w-6 text-brand-cyan" />
              </div>
              <h3 className="font-heading text-xl font-bold tracking-wide text-white">State-Of-The-Art Armoring</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our vehicles are engineered to survive extreme scenarios. Built with multi-layered ballistic glass, reinforced armor plating (composites and steel bulkheads), blast-resistant floor paneling, and military-grade run-flat tires.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-cyan" />
                  <span>VR10 / BR7 Armoring Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-cyan" />
                  <span>Explosive & Blast Overpressure Certified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Social Proof */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/40 relative">
        <div className="relative mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan glow-cyan">
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-3xl font-extrabold tracking-tight">
              Trusted by Dignitaries & Corporations
            </p>
            <div className="w-12 h-1 bg-brand-cyan mx-auto rounded" />
          </div>

          {/* Testimonial slider layout */}
          <div className="relative glass-panel rounded-2xl p-8 sm:p-12 border border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-serif text-8xl text-brand-cyan/5 font-extrabold leading-none select-none pointer-events-none">
              “
            </div>

            <div className="space-y-6">
              {/* Stars */}
              <div className="flex gap-1 justify-center sm:justify-start">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold glow-gold" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-200">
                "{testimonials[activeTestimonial].review}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4 justify-center sm:justify-start pt-4 border-t border-white/5">
                <div className="h-12 w-12 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center font-heading text-lg font-bold text-brand-cyan">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-white text-base">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-xs text-brand-slate tracking-wide">
                    {testimonials[activeTestimonial].title}
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2.5 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? 'w-8 bg-brand-cyan' : 'w-2.5 bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-obsidian border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-brand-cyan" />
              <span className="font-heading text-lg font-bold tracking-widest uppercase text-white">
                Aegis<span className="text-brand-cyan">Elite</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Vetted executive protection & armored transport solutions. Securing transit for high-profile clients, diplomats, and corporate officers globally.
            </p>
            <div className="text-[10px] font-mono text-slate-500 pt-2">
              EST. 2018 | Aegis Security Group Ltd.
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">FLEET DETAILS</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => scrollToSection('fleet')} className="hover:text-brand-cyan transition-colors">Armored Sedans</button></li>
              <li><button onClick={() => scrollToSection('fleet')} className="hover:text-brand-cyan transition-colors">Tactical SUVs</button></li>
              <li><button onClick={() => scrollToSection('fleet')} className="hover:text-brand-cyan transition-colors">Bespoke Executive Class</button></li>
              <li><button onClick={() => scrollToSection('security-core')} className="hover:text-brand-cyan transition-colors">Armoring Standards</button></li>
            </ul>
          </div>

          {/* Legal / Protection Standards */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">STANDARDS & LEGAL</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#privacy" className="hover:text-brand-cyan transition-colors">Privacy & NDA Assurances</a></li>
              <li><a href="#licensing" className="hover:text-brand-cyan transition-colors">Armed Protection Licensing</a></li>
              <li><a href="#liability" className="hover:text-brand-cyan transition-colors">Insurance & Liability Limits</a></li>
              <li><a href="#carrier" className="hover:text-brand-cyan transition-colors">Air Carrier Terminal Access</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">SECURITY ALERTS SIGNUP</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to global corporate safety newsletters and fleet availability logs.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 pt-1 max-w-sm">
              <input
                type="email"
                placeholder="Secure email"
                required
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-cyan/50 text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="rounded bg-brand-cyan px-4 py-2 text-xs font-bold text-black hover:bg-brand-cyan/90 transition-colors"
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
