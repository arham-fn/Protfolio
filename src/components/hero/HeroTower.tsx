'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOSStore } from '@/hooks/useOSStore';

interface HeroTowerProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroTower({ onScrollToSection }: HeroTowerProps) {
  const { pcFixed, setPcFixed, turbo, toggleTurbo, unlockAchievement } = useOSStore();

  const [powerOn, setPowerOn] = useState(true);
  const [ramSeated, setRamSeated] = useState(pcFixed);
  const [crtOn, setCrtOn] = useState(pcFixed);
  const [isBlinking, setIsBlinking] = useState(!pcFixed);
  const [ramDragging, setRamDragging] = useState(false);
  const [ramPos, setRamPos] = useState({ x: 0, y: 0 });
  const [slotHovered, setSlotHovered] = useState(false);
  const [statusMessage, setStatusMessage] = useState('PRESS POWER OR SEAT RAM');

  const slotRef = useRef<HTMLDivElement>(null);
  const ramRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play after 6 seconds of idle if not fixed
  useEffect(() => {
    if (pcFixed || ramSeated) return;

    idleTimerRef.current = setTimeout(() => {
      handleSeatRam();
    }, 6000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [pcFixed, ramSeated]);

  const handleSeatRam = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setRamSeated(true);
    setIsBlinking(false);
    setStatusMessage('MEMORY INITIALIZED: 16MB SDRAM OK');

    // Trigger CRT turn-on expansion
    setTimeout(() => {
      setCrtOn(true);
      setPcFixed(true);
      unlockAchievement('fix_pc');
    }, 400);
  };

  const handlePowerClick = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (!powerOn) {
      setPowerOn(true);
      if (!ramSeated) {
        setIsBlinking(true);
        setStatusMessage('POST ERROR 0x3B: NO MEMORY DETECTED');
      }
    } else {
      if (!ramSeated) {
        setIsBlinking(true);
        setStatusMessage('POST ERROR 0x3B: NO MEMORY DETECTED');
      } else {
        setStatusMessage('SYSTEM RUNNING: ARHAM 98 OS');
      }
    }
  };

  const handleSkip = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setRamSeated(true);
    setIsBlinking(false);
    setCrtOn(true);
    setPcFixed(true);
    unlockAchievement('fix_pc');
    onScrollToSection('projects');
  };

  // Pointer drag for RAM stick
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ramSeated) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setRamDragging(true);

    const startX = e.clientX - ramPos.x;
    const startY = e.clientY - ramPos.y;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const curX = moveEvent.clientX - startX;
      const curY = moveEvent.clientY - startY;
      setRamPos({ x: curX, y: curY });

      // Check collision with slot
      if (slotRef.current) {
        const slotRect = slotRef.current.getBoundingClientRect();
        const ramRect = ramRef.current?.getBoundingClientRect();
        if (ramRect) {
          const overlaps = !(
            ramRect.right < slotRect.left ||
            ramRect.left > slotRect.right ||
            ramRect.bottom < slotRect.top ||
            ramRect.top > slotRect.bottom
          );
          setSlotHovered(overlaps);
        }
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      setRamDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      // Check drop in slot
      if (slotRef.current) {
        const slotRect = slotRef.current.getBoundingClientRect();
        const ramRect = ramRef.current?.getBoundingClientRect();
        if (ramRect) {
          const overlaps = !(
            ramRect.right < slotRect.left ||
            ramRect.left > slotRect.right ||
            ramRect.bottom < slotRect.top ||
            ramRect.top > slotRect.bottom
          );
          if (overlaps) {
            handleSeatRam();
            return;
          }
        }
      }
      // Reset position if missed
      setRamPos({ x: 0, y: 0 });
      setSlotHovered(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div className="relative w-full overflow-x-clip py-4 sm:py-8">
      {/* Top Banner & Quick Skip */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs">
        <div className="bevel-sunken px-3 py-1.5 bg-[#EDE8D6] text-ink font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span>ARHAM TOWER WORKBENCH // FAISALABAD, PK // 20 Y/O // GCUF BS CS</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="bevel-btn font-bold text-xs px-3 py-1.5 hover:bg-accent hover:text-[#EFEADB] transition-colors"
        >
          [SKIP INTRO ⏩ JUMP TO OS]
        </button>
      </div>

      {/* Main Dual Setup: Late-90s CRT Monitor + Beige Tower Chassis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: CRT Monitor (7 Cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* CRT Monitor Outer Bezel */}
          <div className="bevel-raised p-4 sm:p-6 shadow-window bg-surface">
            {/* Monitor Top Brand */}
            <div className="flex items-center justify-between pb-3 text-[11px] font-mono text-ink/70">
              <span className="font-bold tracking-widest">MULTISYNC 17&quot; CRT</span>
              <span className="bevel-sunken px-2 py-0.5 text-[10px] bg-[#EDE8D6]">
                {turbo ? 'HIGH DENSITY 66MHz' : 'STANDARD 33MHz'}
              </span>
            </div>

            {/* CRT Glass Screen Recess */}
            <div className="bevel-sunken p-2 bg-[#0A0D0A] rounded-sm">
              <div
                className={`crt-screen aspect-[4/3] w-full p-4 sm:p-6 text-xs sm:text-sm font-mono overflow-hidden transition-all duration-500 relative flex flex-col justify-between ${
                  crtOn ? 'opacity-100' : 'opacity-90'
                }`}
                style={{
                  clipPath: crtOn
                    ? 'inset(0% 0%)'
                    : 'inset(49.6% 0% 49.6% 0%)',
                  transition: 'clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* CRT Content */}
                {!crtOn ? (
                  <div className="space-y-2 text-[#FF5555]">
                    <div className="border-b border-[#FF5555]/40 pb-2 flex justify-between items-center text-[11px]">
                      <span>AWARD MODULAR BIOS v4.51PG</span>
                      <span className="animate-pulse">POST HALTED</span>
                    </div>
                    <div className="pt-2 text-sm font-black">
                      ERROR: NO MEMORY DETECTED (POST CODE 0x3B)
                    </div>
                    <p className="text-xs text-[#EFEADB]">
                      The CPU cannot execute bootloader code without memory handshake.
                    </p>
                    <div className="p-2 border border-[#FF5555] bg-[#FF5555]/10 text-xs">
                      👉 <strong>ACTION REQUIRED:</strong> Drag the SDRAM module from the chassis into DIMM Slot 0 (or click &quot;Seat Module&quot;).
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-[#55FF55] flex-1 flex flex-col justify-between">
                    <div>
                      <div className="border-b border-[#55FF55]/40 pb-1.5 flex justify-between items-center text-[11px] text-[#A9FF55]">
                        <span>ARHAM OS BOOTLOADER v1998</span>
                        <span>POST OK: 8/8 REPAIRS</span>
                      </div>

                      <div className="pt-3 space-y-1 text-xs">
                        <div>Memory Testing: 16384K OK</div>
                        <div>Primary Master: TECH-ATLAS-2026 (LIVE FLAGSHIP)</div>
                        <div>Secondary Master: DISASTER-SHIELD (CAPSTONE)</div>
                        <div className="text-[#FFFF55]">
                          System: Arham // 20 // Faisalabad, PK // Freelance AI &amp; Full-Stack
                        </div>
                      </div>

                      <div className="mt-4 p-2.5 border border-[#55FF55]/40 bg-[#55FF55]/10 text-xs leading-relaxed text-[#EFEADB]">
                        <span className="text-[#FFFF55] font-bold block mb-1">
                          &quot;I build AI-powered apps, and I can fix the laptop you run them on.&quot;
                        </span>
                        Use the three drive bays on the tower or click any cartridge below to launch project telemetry.
                      </div>
                    </div>

                    {/* Quick CRT Action Links */}
                    <div className="pt-3 border-t border-[#55FF55]/30 flex flex-wrap gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => onScrollToSection('projects')}
                        className="px-2 py-1 bg-[#55FF55] text-ink font-bold hover:brightness-110 active:brightness-90"
                      >
                        [FLOPPY A: PROJECTS]
                      </button>
                      <button
                        type="button"
                        onClick={() => onScrollToSection('repair')}
                        className="px-2 py-1 border border-[#55FF55] text-[#55FF55] hover:bg-[#55FF55]/20"
                      >
                        [BENCH: REPAIR BAY]
                      </button>
                      <button
                        type="button"
                        onClick={() => onScrollToSection('skills')}
                        className="px-2 py-1 border border-[#55FF55] text-[#55FF55] hover:bg-[#55FF55]/20"
                      >
                        [SYSTEM: SKILL TREE]
                      </button>
                    </div>
                  </div>
                )}

                {/* CRT Scanline Status */}
                <div className="pt-2 border-t border-[#55FF55]/20 flex justify-between text-[10px] text-ink/40">
                  <span>RES: 800x600 @ 75Hz</span>
                  <span>STATUS: {statusMessage}</span>
                </div>
              </div>
            </div>

            {/* Monitor Base Pedestal */}
            <div className="mt-4 flex justify-between items-center px-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full border border-lo bg-surface" />
                <span className="w-3 h-3 rounded-full border border-lo bg-surface" />
                <span className="w-3 h-3 rounded-full border border-lo bg-surface" />
              </div>

              {/* CRT Power LED */}
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-ink/60">DISPLAY:</span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    crtOn
                      ? 'bg-[#55FF55] shadow-[0_0_8px_#55FF55]'
                      : 'bg-primary animate-pulse'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Beige Tower Chassis (5 Cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bevel-raised p-4 sm:p-5 shadow-window bg-surface">
            {/* Chassis Header */}
            <div className="flex items-center justify-between pb-3 border-b border-lo text-[11px] font-mono text-ink/70">
              <span className="font-bold">ARHAM-ATX MINI-TOWER</span>
              <span>REV 1998</span>
            </div>

            {/* Drive Bays as Navigation Links */}
            <div className="mt-4 space-y-3 font-mono">
              <span className="text-[10px] text-ink/60 font-bold block uppercase tracking-wider">
                DRIVE BAYS // QUICK SYSTEM NAV:
              </span>

              {/* Drive Bay 1: CD-ROM 5.25" -> Projects */}
              <button
                type="button"
                onClick={() => onScrollToSection('projects')}
                className="w-full text-left p-2.5 bevel-raised hover:bg-[#EDE8D6] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary inline-block" />
                  <div>
                    <div className="font-bold text-accent text-xs group-hover:underline">
                      BAY 1: PROJECTS ARCHIVE
                    </div>
                    <div className="text-[10px] text-ink/70">
                      Tech Atlas Flagship + 6 Active Systems
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-accent">OPEN ↗</span>
              </button>

              {/* Drive Bay 2: 3.5" Floppy -> Repair Bay */}
              <button
                type="button"
                onClick={() => onScrollToSection('repair')}
                className="w-full text-left p-2.5 bevel-raised hover:bg-[#EDE8D6] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent inline-block" />
                  <div>
                    <div className="font-bold text-accent text-xs group-hover:underline">
                      BAY 2: REPAIR BAY BENCH
                    </div>
                    <div className="text-[10px] text-ink/70">
                      8 Fixed Machines · $0 Invoiced · POST Diagnosis
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-accent">OPEN ↗</span>
              </button>

              {/* Drive Bay 3: Tape Drive -> Contact */}
              <button
                type="button"
                onClick={() => onScrollToSection('contact')}
                className="w-full text-left p-2.5 bevel-raised hover:bg-[#EDE8D6] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#8F8870] inline-block" />
                  <div>
                    <div className="font-bold text-accent text-xs group-hover:underline">
                      BAY 3: SERIAL CONTACT DISPATCH
                    </div>
                    <div className="text-[10px] text-ink/70">
                      COM1 Packet Transmission &amp; Verification
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-accent">OPEN ↗</span>
              </button>
            </div>

            {/* Control Panel: Power Button, Orange LED, Turbo Button */}
            <div className="mt-5 p-3.5 bevel-sunken bg-[#EDE8D6] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-ink">CHASSIS CONTROLS</span>
                <span className="text-[10px] text-ink/60">PUSH BUTTONS</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Power Push Button */}
                <button
                  type="button"
                  onClick={handlePowerClick}
                  className="bevel-btn px-3 py-1.5 min-h-[44px] flex items-center gap-2 active:translate-y-0.5"
                >
                  <span className="text-base">⏻</span>
                  <span className="text-xs font-bold">POWER</span>
                </button>

                {/* Orange Power LED: blinks if no RAM, solid if seated */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`w-3.5 h-3.5 rounded-full border border-lo transition-colors ${
                      isBlinking
                        ? 'bg-primary animate-ping shadow-[0_0_10px_#F2541B]'
                        : ramSeated
                        ? 'bg-primary shadow-[0_0_10px_#F2541B]'
                        : 'bg-[#553311]'
                    }`}
                  />
                  <div className="text-[10px] leading-tight">
                    <span className="font-bold block">POWER LED</span>
                    <span className="text-ink/60">
                      {isBlinking ? 'POST FAULT (BLINKING)' : ramSeated ? 'SOLID (NORMAL)' : 'OFF'}
                    </span>
                  </div>
                </div>

                {/* Turbo Button */}
                <button
                  type="button"
                  onClick={toggleTurbo}
                  className={`bevel-btn px-3 py-1.5 min-h-[44px] flex items-center gap-1.5 text-xs font-bold ${
                    turbo ? 'bevel-btn-primary' : ''
                  }`}
                  title="Toggle Turbo CPU speed / motion"
                >
                  <span>TURBO</span>
                  <span>{turbo ? '[ON]' : '[OFF]'}</span>
                </button>
              </div>
            </div>

            {/* Open Side Panel: DIMM RAM Slot & Interactive Draggable RAM Stick */}
            <div className="mt-5 p-3.5 bevel-sunken bg-[#1C1814] text-[#EFEADB] font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#8F8870]/40 text-[11px]">
                <span className="text-primary font-bold">SIDE PANEL // DIMM SLOT 0</span>
                <span>{ramSeated ? 'MODULE LOCKED' : 'UNSEATED'}</span>
              </div>

              {/* Slot Target */}
              <div
                ref={slotRef}
                className={`p-3 border-2 transition-all duration-200 flex items-center justify-between gap-2 ${
                  ramSeated
                    ? 'border-[#55FF55] bg-[#55FF55]/10'
                    : slotHovered
                    ? 'border-primary bg-primary/20 scale-102'
                    : 'border-dashed border-lo/80 bg-black/40'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base">{ramSeated ? '🔒' : '🔲'}</span>
                  <span className="text-[11px] truncate">
                    {ramSeated
                      ? 'DIMM 0: 16MB PC-100 SDRAM SEATED'
                      : 'DROP RAM MODULE HERE'}
                  </span>
                </div>

                {!ramSeated && (
                  <button
                    type="button"
                    onClick={handleSeatRam}
                    className="bevel-btn-primary bevel-btn text-[10px] px-2.5 py-1 min-h-[36px] font-bold shrink-0"
                  >
                    CLICK TO SEAT
                  </button>
                )}
              </div>

              {/* Unseated RAM Stick (Draggable) */}
              {!ramSeated && (
                <div className="mt-3">
                  <div
                    ref={ramRef}
                    onPointerDown={handlePointerDown}
                    style={{
                      transform: `translate3d(${ramPos.x}px, ${ramPos.y}px, 0)`,
                      touchAction: 'none',
                    }}
                    className={`cursor-grab active:cursor-grabbing p-2.5 border-2 border-primary bg-[#2D2A24] text-[#EFEADB] flex items-center justify-between select-none transition-shadow ${
                      ramDragging ? 'shadow-2xl z-50 ring-2 ring-primary' : 'shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">▮▮▮</span>
                      <div>
                        <div className="font-bold text-xs text-primary">
                          16MB SDRAM 100MHz (GOLD PINS)
                        </div>
                        <div className="text-[10px] text-ink/40">
                          {ramDragging ? 'DRAGGING TO SLOT...' : 'DRAG OR TAP TO SEAT'}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs">⇕</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chassis Ventilation Slots SVG */}
            <div className="mt-4 flex justify-between px-2 py-1 opacity-40">
              <span className="h-1 w-8 bg-lo" />
              <span className="h-1 w-8 bg-lo" />
              <span className="h-1 w-8 bg-lo" />
              <span className="h-1 w-8 bg-lo" />
              <span className="h-1 w-8 bg-lo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
