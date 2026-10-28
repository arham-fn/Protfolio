'use client';

import { ReactNode } from 'react';
import XPBar from './XPBar';
import ClassSelect from './ClassSelect';
import CustomCursor from './CustomCursor';
import { Z } from '@/lib/tokens';

interface HUDShellProps {
  children: ReactNode;
}

export default function HUDShell({ children }: HUDShellProps) {
  return (
    <div className="relative min-h-screen bg-jet text-light selection:bg-pink/30 selection:text-white">
      {/* Dynamic Cursor */}
      <CustomCursor />

      {/* Retro HUD Corner Brackets */}
      <div className="hud-bracket hud-bracket--tl" aria-hidden="true" />
      <div className="hud-bracket hud-bracket--tr" aria-hidden="true" />
      <div className="hud-bracket hud-bracket--bl" aria-hidden="true" />
      <div className="hud-bracket hud-bracket--br" aria-hidden="true" />

      {/* Top Persistent HUD Bar */}
      <header
        className="fixed top-0 left-0 right-0 h-14 border-b border-light/10 bg-jet/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between"
        style={{ zIndex: Z.hud }}
      >
        {/* Left: Identity & Status */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-chartreuse animate-pulse-dot shadow-[0_0_8px_#B6FF00]" />
          <a
            href="#hero"
            className="font-display font-black text-sm tracking-widest text-light hover:text-chartreuse transition-colors focus-visible:outline-chartreuse"
          >
            ARHAM<span className="text-pink">.OS</span>
          </a>
          <span className="text-[10px] text-light/40 hidden md:inline font-mono border-l border-light/10 pl-3">
            v2026.10 // FAISALABAD, PK
          </span>
        </div>

        {/* Center: Class Switcher */}
        <div className="hidden sm:block">
          <ClassSelect />
        </div>

        {/* Right: XP / Progression Telemetry */}
        <div className="flex items-center gap-4">
          <XPBar />
          <a
            href="#contact"
            className="hidden md:inline-flex px-3 py-1 text-xs font-mono font-bold border border-pink text-pink hover:bg-pink hover:text-white transition-all shadow-[0_0_8px_rgba(255,31,142,0.3)]"
          >
            PING
          </a>
        </div>
      </header>

      {/* Mobile-only secondary class bar */}
      <div
        className="sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[110]"
      >
        <ClassSelect />
      </div>

      {/* Main Content Viewport */}
      <div className="pt-14 relative z-10">{children}</div>
    </div>
  );
}
