'use client';

import { useState } from 'react';

interface BiosSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BiosSetup({ isOpen, onClose }: BiosSetupProps) {
  const [accent, setAccent] = useState<'pink' | 'chartreuse'>('pink');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [scanlines, setScanlines] = useState(true);

  if (!isOpen) return null;

  const toggleAccent = () => {
    const next = accent === 'pink' ? 'chartreuse' : 'pink';
    setAccent(next);
    document.documentElement.style.setProperty(
      '--color-accent',
      next === 'pink' ? '#FF1F8E' : '#B6FF00'
    );
  };

  const toggleMotion = () => {
    setReduceMotion(!reduceMotion);
    document.documentElement.classList.toggle('prefers-reduced-motion', !reduceMotion);
  };

  const toggleScanlines = () => {
    setScanlines(!scanlines);
    document.body.classList.toggle('scanlines', !scanlines);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-blue-950/90 font-mono text-light backdrop-blur-md"
    >
      <div className="w-full max-w-2xl bg-blue-900 border-4 border-light/60 p-6 shadow-2xl">
        {/* BIOS Header */}
        <div className="border-b border-light/40 pb-2 mb-6 flex justify-between items-center text-xs">
          <span>ARHAM BIOS UTILITY SETUP (REV 2026.10)</span>
          <span>PRESS [ESC] TO EXIT</span>
        </div>

        {/* Setting Toggles */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex justify-between items-center p-2 border border-light/20 bg-blue-950/50">
            <span>SYSTEM ACCENT COLOR:</span>
            <button
              type="button"
              onClick={toggleAccent}
              className="px-3 py-1 bg-light text-blue-950 font-bold uppercase"
            >
              [{accent.toUpperCase()}]
            </button>
          </div>

          <div className="flex justify-between items-center p-2 border border-light/20 bg-blue-950/50">
            <span>REDUCE MOTION OVERRIDE:</span>
            <button
              type="button"
              onClick={toggleMotion}
              className="px-3 py-1 bg-light text-blue-950 font-bold uppercase"
            >
              [{reduceMotion ? 'ENABLED' : 'DISABLED'}]
            </button>
          </div>

          <div className="flex justify-between items-center p-2 border border-light/20 bg-blue-950/50">
            <span>CRT SCANLINE EMULATION (4%):</span>
            <button
              type="button"
              onClick={toggleScanlines}
              className="px-3 py-1 bg-light text-blue-950 font-bold uppercase"
            >
              [{scanlines ? 'ENABLED' : 'DISABLED'}]
            </button>
          </div>
        </div>

        {/* BIOS Help Footer */}
        <div className="mt-8 border-t border-light/40 pt-3 text-[11px] text-light/70 flex justify-between">
          <span>F2 = TOGGLE SETUP</span>
          <button
            type="button"
            onClick={onClose}
            className="text-yellow-300 hover:underline"
          >
            [SAVE & REBOOT CHASSIS]
          </button>
        </div>
      </div>
    </div>
  );
}
