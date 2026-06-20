import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { LandingPage } from '#/components/LandingPage';
import { AdminDashboard } from '#/components/AdminDashboard';
import { BookingModal } from '#/components/BookingModal';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  const [preloaderState, setPreloaderState] = useState<'loading' | 'fading' | 'done'>('loading');
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');
  const [bookingModalCarId, setBookingModalCarId] = useState<string | null>(null);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high'>('low');

  // Shared state for fleet card package selections (driver, security detail)
  const [selectedPackages, setSelectedPackages] = useState<Record<string, { driver: boolean; security: boolean }>>({
    'mercedes-s-guard': { driver: true, security: false },
    'cadillac-escalade': { driver: true, security: true },
    'rolls-royce-phantom': { driver: true, security: false },
  });

  // 1. Asset Preloader lifecycle hook
  useEffect(() => {
    // Preload critical fleet images
    const imagesToPreload = [
      '/luxury_armored_sedan.jpg',
      '/luxury_armored_suv.jpg',
      '/luxury_bespoke_sedan.jpg'
    ];

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === imagesToPreload.length) {
        // Core assets loaded, trigger fading transition
        triggerFade();
      }
    };

    // Trigger backup timer in case image preloading takes too long or fails
    const backupTimer = setTimeout(() => {
      triggerFade();
    }, 1500);

    // Preload execution
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = handleLoad;
      img.onerror = handleLoad;
    });

    function triggerFade() {
      clearTimeout(backupTimer);
      setPreloaderState('fading');
      // Wait for the fade-out CSS animation/transition to finish (500ms)
      const unmountTimer = setTimeout(() => {
        setPreloaderState('done');
      }, 500);
      return () => clearTimeout(unmountTimer);
    }

    return () => clearTimeout(backupTimer);
  }, []);

  // 2. Hash-based client routing to swap between landing & admin seamlessly
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('landing');
      }
    };

    // Check current hash on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const navigateToLanding = () => {
    window.location.hash = '#';
    setCurrentView('landing');
  };

  const handleTogglePackage = (carId: string, pkgType: 'driver' | 'security') => {
    setSelectedPackages(prev => ({
      ...prev,
      [carId]: {
        ...prev[carId],
        [pkgType]: !prev[carId][pkgType]
      }
    }));
  };

  return (
    <>
      {/* 1. Global Preloader Overlay (display only while assets are loading) */}
      {preloaderState !== 'done' && (
        <div
          id="preloader"
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-obsidian transition-opacity duration-500 flex-wrap ${
            preloaderState === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center max-w-sm px-6">
            <div className="relative">
              {/* Radar pulse rings inside preloader */}
              <span className="absolute -inset-6 rounded-full bg-brand-cyan/15 animate-radar pointer-events-none"></span>
              <Shield className="h-12 w-12 text-brand-cyan glow-cyan animate-pulse relative z-10" />
            </div>

            <div className="space-y-1.5 mt-4">
              <h2 className="font-heading text-lg font-bold tracking-widest text-white uppercase">
                Aegis Elite Systems
              </h2>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-3 w-3 text-brand-cyan animate-spin" />
                <span className="font-mono text-[9px] text-brand-cyan tracking-wider uppercase animate-pulse">
                  Preloading Secure Assets...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Page Content: Mounted and entrance animations triggered ONLY after preloader is completely un-rendered */}
      {preloaderState === 'done' && (
        <div className="animate-fade-in-up">
          {currentView === 'landing' ? (
            <LandingPage
              onNavigateToAdmin={navigateToAdmin}
              onOpenBookingModal={setBookingModalCarId}
              selectedPackages={selectedPackages}
              setSelectedPackages={setSelectedPackages}
            />
          ) : (
            <AdminDashboard
              onNavigateToLanding={navigateToLanding}
              threatLevel={threatLevel}
              setThreatLevel={setThreatLevel}
            />
          )}

          {/* Secure Booking Modal Overlay */}
          <BookingModal
            isOpen={bookingModalCarId !== null}
            onClose={() => setBookingModalCarId(null)}
            carId={bookingModalCarId}
            selectedPackages={selectedPackages}
            onTogglePackage={handleTogglePackage}
          />
        </div>
      )}
    </>
  );
}
