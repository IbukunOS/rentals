import { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  User, 
  AlertTriangle, 
  Loader2, 
  CheckCircle2, 
  Lock,
  Check
} from 'lucide-react';
import { CARS_DATA } from './LandingPage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string | null;
  selectedPackages: Record<string, { driver: boolean; security: boolean }>;
  onTogglePackage: (carId: string, pkgType: 'driver' | 'security') => void;
}

export function BookingModal({
  isOpen,
  onClose,
  carId,
  selectedPackages,
  onTogglePackage
}: BookingModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [pickupLoc, setPickupLoc] = useState('FBO Private Terminal (Executive)');
  const [startDate, setStartDate] = useState('2026-06-21');
  const [endDate, setEndDate] = useState('2026-06-23');
  const [threatAssessment, setThreatAssessment] = useState('Standard VIP');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const [bookingState, setBookingState] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [reservationId, setReservationId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setBookingState('form');
    }
  }, [isOpen]);

  if (!isOpen || !carId) return null;

  const car = CARS_DATA.find(c => c.id === carId);
  if (!car) return null;

  const hasDriver = selectedPackages[car.id]?.driver || false;
  const hasSecurity = selectedPackages[car.id]?.security || false;

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Calculate costs
  const baseCostPerDay = car.basePrice;
  const driverCostPerDay = hasDriver ? 250 : 0;
  const securityCostPerDay = hasSecurity ? 600 : 0;
  const totalPerDay = baseCostPerDay + driverCostPerDay + securityCostPerDay;
  const grandTotal = totalPerDay * diffDays;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Please fill out your name and email.');
      return;
    }
    
    setBookingState('processing');

    setTimeout(() => {
      const randNum = Math.floor(10000 + Math.random() * 90000);
      setReservationId(`AEGIS-${randNum}-SEC`);
      setBookingState('confirmed');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Card wrapper */}
      <div className="relative w-full max-w-4xl glass-panel rounded-xl border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-none overflow-hidden animate-fade-in-up my-8 text-left bg-white dark:bg-brand-navy-light text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="bg-zinc-50 dark:bg-brand-navy/60 border-b border-zinc-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-brand-cyan" />
            <span className="font-heading font-bold text-xs tracking-widest uppercase text-slate-800 dark:text-white">SECURE MOBILITY RESERVATION</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-white/5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* STATE 1: Booking Form */}
        {bookingState === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white">Client details</h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">TRANSMITTED OVER SECURED CHANNELS</p>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" /> Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senator Marcus Vance"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50 placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    Secure Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vance@senate.gov"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50 placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Route Info */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> Pickup / Destination Node
                </label>
                <select
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50"
                >
                  <option>FBO Private Terminal (Executive)</option>
                  <option>Ritz Carlton Hotel Lobby</option>
                  <option>Consular Office HQ</option>
                  <option>Metro Airport VIP lounge</option>
                  <option>Corporate Head Office</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50"
                  />
                </div>
              </div>

              {/* Threat Risk Assessment */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-brand-gold" /> Security Threat Advisory Level
                </label>
                <select
                  value={threatAssessment}
                  onChange={(e) => setThreatAssessment(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50"
                >
                  <option>Standard VIP (Non-threat executive mobility)</option>
                  <option>Elevated Protection (Public figure, high profile corporate meetings)</option>
                  <option>High Threat Escort Required (Diplomatic risk, armored convoy configuration)</option>
                </select>
              </div>

              {/* Special instructions */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Special Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Custom luggage size, escort specifications..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-cyan/50 placeholder-slate-400 dark:placeholder-slate-600 resize-none"
                />
              </div>

            </div>

            {/* Right Column: Invoice Summary */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-zinc-200 lg:dark:border-white/5 lg:pl-8">
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan font-bold">VEHICLE SELECTED</p>
                  <h4 className="font-heading text-base font-bold text-slate-800 dark:text-white leading-tight">{car.name}</h4>
                  <p className="text-xs text-slate-400">{car.category}</p>
                </div>

                <div className="aspect-[16/9] w-full overflow-hidden rounded bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/5">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>

                {/* Sub Package Toggles */}
                <div className="space-y-2 pt-2">
                  <p className="text-xxs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Adjust Packages</p>
                  
                  {/* Driver Toggle */}
                  <button
                    type="button"
                    onClick={() => onTogglePackage(car.id, 'driver')}
                    className={`w-full flex items-center justify-between rounded border px-3 py-2 text-xxs transition-all ${
                      hasDriver 
                        ? 'bg-brand-cyan/15 border-brand-cyan/40 text-slate-900 dark:text-white font-bold' 
                        : 'bg-transparent border-zinc-200 dark:border-white/5 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <span>Tactical Driver</span>
                    <span className="font-mono">+$250/day</span>
                  </button>

                  {/* Security Agent Toggle */}
                  <button
                    type="button"
                    onClick={() => onTogglePackage(car.id, 'security')}
                    className={`w-full flex items-center justify-between rounded border px-3 py-2 text-xxs transition-all ${
                      hasSecurity 
                        ? 'bg-brand-gold/15 border-brand-gold/40 text-slate-900 dark:text-white font-bold' 
                        : 'bg-transparent border-zinc-200 dark:border-white/5 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <span>Close Security Agent</span>
                    <span className="font-mono">+$600/day</span>
                  </button>
                </div>

                {/* Billing details */}
                <div className="space-y-2 border-t border-zinc-200 dark:border-white/5 pt-4 text-xs font-mono text-slate-500">
                  <div className="flex justify-between">
                    <span>Base Rate ({diffDays} day{diffDays > 1 ? 's' : ''}):</span>
                    <span className="text-slate-800 dark:text-white font-bold">${(baseCostPerDay * diffDays).toLocaleString()}</span>
                  </div>
                  {hasDriver && (
                    <div className="flex justify-between">
                      <span>Tactical Driver:</span>
                      <span className="text-brand-cyan font-bold">${(driverCostPerDay * diffDays).toLocaleString()}</span>
                    </div>
                  )}
                  {hasSecurity && (
                    <div className="flex justify-between">
                      <span>Close Security:</span>
                      <span className="text-brand-gold font-bold">${(securityCostPerDay * diffDays).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-zinc-200 dark:border-white/5 pt-2 text-xs font-bold text-slate-800 dark:text-white">
                    <span>Grand Total:</span>
                    <span className="text-brand-cyan font-mono text-sm">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-brand-cyan px-5 py-3 text-center text-xs font-bold tracking-wider text-slate-900 dark:text-black transition-all"
              >
                SUBMIT RESERVATION
              </button>
            </div>

          </form>
        )}

        {/* STATE 2: Loader */}
        {bookingState === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 text-brand-cyan animate-spin" />
            <p className="font-mono text-xs tracking-wider text-brand-cyan uppercase animate-pulse">
              PROCESSING SECURE SYSTEM RESERVATION...
            </p>
            <p className="text-slate-500 text-xxs max-w-sm text-center">
              Encrypting transaction details & vetting active driver dispatch grids.
            </p>
          </div>
        )}

        {/* STATE 3: Confirmation */}
        {bookingState === 'confirmed' && (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center space-y-6 max-w-xl mx-auto">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-extrabold text-slate-800 dark:text-white">Reservation Confirmed</h3>
              <p className="text-xs font-mono text-brand-cyan uppercase tracking-widest">TRANSACTION CLEARANCE ID: GRANTED</p>
            </div>

            <div className="w-full bg-zinc-50 dark:bg-brand-navy/60 border border-zinc-200 dark:border-white/5 rounded-lg p-5 font-mono text-xxs text-slate-600 dark:text-slate-300 space-y-3.5 text-left">
              <div className="flex justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
                <span>RESERVATION ID</span>
                <span className="text-slate-800 dark:text-white font-bold">{reservationId}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
                <span>VEHICLE CLASS</span>
                <span className="text-slate-800 dark:text-white font-bold">{car.name}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
                <span>COMMS KEY</span>
                <span className="text-brand-cyan font-bold">LINK-[{Math.floor(100+Math.random()*900)}]</span>
              </div>
              <div className="flex justify-between">
                <span>GRAND TOTAL</span>
                <span className="text-brand-cyan font-bold">${grandTotal.toLocaleString()} USD</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Our logistics coordinator will reach out via secure channels shortly to confirm flight terminal arrival details, driver contact numbers, and exfiltration protocols.
              </p>
              
              <button
                onClick={onClose}
                className="w-full rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-6 py-2.5 text-xs font-bold text-slate-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
              >
                Return to Showcase
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
