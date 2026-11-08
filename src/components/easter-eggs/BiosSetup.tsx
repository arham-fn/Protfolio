'use client';

import React, { useRef, useEffect } from 'react';
import { useOSStore } from '@/hooks/useOSStore';
import { gsap } from '@/lib/gsap';

interface BiosSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BiosSetup({ isOpen, onClose }: BiosSetupProps) {
  const { turbo, toggleTurbo, unlockAchievement } = useOSStore();
  const biosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !biosRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        biosRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }, biosRef);
    return () => ctx.revert();
  }, [isOpen]);

  const handleAnimatedClose = () => {
    if (!biosRef.current) {
      unlockAchievement('bios');
      onClose();
      return;
    }
    gsap.to(biosRef.current, {
      scale: 0.94,
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: () => {
        unlockAchievement('bios');
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[600] flex items-center justify-center p-3 sm:p-6 bg-black/80 font-mono text-white backdrop-blur-xs select-none"
    >
      <div ref={biosRef} className="w-full max-w-3xl bg-[#0000AA] border-4 border-[#AAAAAA] p-4 sm:p-6 shadow-2xl text-xs sm:text-sm">
        {/* BIOS Top Header */}
        <div className="border-b-2 border-white pb-2 mb-4 flex justify-between items-center text-[#FFFF55] font-bold text-xs sm:text-sm">
          <span>ROM PCI/ISA BIOS (2A69KG0B)</span>
          <span>CMOS SETUP UTILITY — AWARD SOFTWARE, INC.</span>
        </div>

        {/* BIOS Grid Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white">
          <div className="p-3 border border-white/40 bg-[#000088] space-y-2">
            <span className="text-[#55FFFF] font-bold block">STANDARD CMOS SETUP</span>
            <p className="text-[11px] text-white/80">
              Primary Master: 1.44MB Floppy (A:)<br />
              System RAM: 16MB SDRAM 100MHz<br />
              POST Diagnostic: 8/8 Machines Fixed
            </p>
          </div>

          <div className="p-3 border border-white/40 bg-[#000088] space-y-2">
            <span className="text-[#55FFFF] font-bold block">ADVANCED CHIPSET FEATURES</span>
            <div className="flex items-center justify-between text-xs pt-1">
              <span>TURBO CPU CLOCK:</span>
              <button
                type="button"
                onClick={toggleTurbo}
                className="px-2 py-0.5 bg-[#FFFF55] text-[#0000AA] font-bold text-xs"
              >
                [{turbo ? '66 MHz (ENABLED)' : '33 MHz (DISABLED)'}]
              </button>
            </div>
            <p className="text-[10px] text-white/70">
              Affects animation speed and transition multiplier.
            </p>
          </div>

          <div className="p-3 border border-white/40 bg-[#000088] space-y-2">
            <span className="text-[#55FFFF] font-bold block">INTEGRATED PERIPHERALS</span>
            <p className="text-[11px] text-white/80">
              COM1: Serial Packet Dispatch (Active)<br />
              IDE-0: Tech Atlas 2026 (Flagship Master)<br />
              IDE-1: DisasterShield Capstone
            </p>
          </div>

          <div className="p-3 border border-white/40 bg-[#000088] space-y-2">
            <span className="text-[#55FFFF] font-bold block">SECURITY &amp; SYSTEM HEALTH</span>
            <p className="text-[11px] text-white/80">
              Core CPU Temp: 34°C (Normal)<br />
              +12V Rail: 12.08V (Stable)<br />
              POST Code: 0x00 (Normal Boot)
            </p>
          </div>
        </div>

        {/* Instructions Footer */}
        <div className="mt-6 border-t-2 border-white pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#FFFF55]">
          <span>ESC : Quit Setup</span>
          <span>F2 : Toggle Screen</span>
          <button
            type="button"
            onClick={handleAnimatedClose}
            className="px-3 py-1 bg-[#FFFF55] text-[#0000AA] font-black uppercase hover:bg-white transition-colors"
          >
            [SAVE &amp; EXIT SETUP (REBOOT)]
          </button>
        </div>
      </div>
    </div>
  );
}
