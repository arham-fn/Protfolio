'use client';

import React from 'react';
import { useOSStore } from '@/hooks/useOSStore';

interface OSHeaderProps {
  onOpenBios: () => void;
}

export default function OSHeader({ onOpenBios }: OSHeaderProps) {
  const { turbo, toggleTurbo, unlockedAchievements } = useOSStore();
  const unlockedCount = unlockedAchievements.size;

  return (
    <header id="os-header" className="sticky top-0 z-[100] h-10 bevel-raised bg-surface px-2 sm:px-4 flex items-center justify-between font-mono text-xs text-ink select-none border-b border-lo">
      {/* Left: Brand & Menu Items */}
      <div className="flex items-center gap-2 sm:gap-4 truncate">
        <div className="flex items-center gap-1.5 font-black text-accent text-sm tracking-wide">
          <span className="text-base">🖥️</span>
          <span>ARHAM-OS <span className="text-primary font-bold text-xs">[98]</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-3 text-xs text-ink/80 border-l border-lo pl-3">
          <a href="#hero" className="hover:text-accent font-semibold">Chassis</a>
          <a href="#projects" className="hover:text-accent font-semibold">Projects</a>
          <a href="#repair" className="hover:text-accent font-semibold">Repair Bay</a>
          <a href="#skills" className="hover:text-accent font-semibold">Skill Tree</a>
          <a href="#terminal" className="hover:text-accent font-semibold">ARHAM-DOS</a>
          <a href="#contact" className="hover:text-accent font-semibold">Contact</a>
        </nav>
      </div>

      {/* Right: Turbo Button, BIOS Shortcut & Achievement Tracker */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Turbo Button */}
        <button
          type="button"
          onClick={toggleTurbo}
          className={`bevel-btn px-2.5 py-1 text-[11px] font-bold min-h-[32px] gap-1 ${
            turbo ? 'bevel-btn-primary' : ''
          }`}
          title="Toggle Turbo Motion (also respects prefers-reduced-motion)"
        >
          <span>⚡ TURBO</span>
          <span>{turbo ? '66MHz' : '33MHz'}</span>
        </button>

        {/* Fake BIOS F2 Trigger */}
        <button
          type="button"
          onClick={onOpenBios}
          className="bevel-btn px-2 py-1 text-[11px] font-bold min-h-[32px] hidden sm:inline-flex"
          title="Press F2 or click for CMOS BIOS Setup"
        >
          BIOS [F2]
        </button>

        {/* Achievement Pill */}
        <div className="bevel-sunken px-2 py-1 bg-[#EDE8D6] text-[11px] font-bold text-accent flex items-center gap-1">
          <span>🏆</span>
          <span>{unlockedCount}/8</span>
        </div>
      </div>
    </header>
  );
}
