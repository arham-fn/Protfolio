'use client';

import React, { useState, useEffect, useRef } from 'react';
import OSHeader from '@/components/os/OSHeader';
import Taskbar from '@/components/os/Taskbar';
import HeroTower from '@/components/hero/HeroTower';
import CartridgeGrid from '@/components/cartridges/CartridgeGrid';
import RepairBay from '@/components/repair/RepairBay';
import SkillTree from '@/components/skills/SkillTree';
import TerminalBar from '@/components/terminal/TerminalBar';
import QuestLog from '@/components/quest/QuestLog';
import Contact from '@/components/contact/Contact';
import EasterEggManager from '@/components/easter-eggs/EasterEggManager';
import BiosSetup from '@/components/easter-eggs/BiosSetup';
import { useLenis } from '@/hooks/useLenis';
import { useOSStore } from '@/hooks/useOSStore';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [biosOpen, setBiosOpen] = useState(false);
  const { unlockAchievement } = useOSStore();
  const footerRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  const lenisRef = useLenis();

  useEffect(() => {
    setMounted(true);

    // Footer observer to unlock footer achievement
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlockAchievement('footer');
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [unlockAchievement]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id) || document.getElementById(`window-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-mono pb-14 selection:bg-accent selection:text-[#EFEADB] overflow-x-clip">
      {/* SSR Static Render Viewport for immediate paint without JS */}
      {!mounted && (
        <noscript>
          <div className="p-6 bg-surface border-4 border-hi text-ink font-mono">
            <h1 className="text-3xl font-black text-accent mb-2">ARHAM — BEIGE BOX OS</h1>
            <p className="text-base text-ink mb-4 font-bold">
              I build AI-powered apps, and I can fix the laptop you run them on.
            </p>
            <p className="text-xs text-ink/80">
              Personal portfolio of Arham (20, Faisalabad, PK, BS CS at GCUF). Flagship: Tech Atlas 2026. 8 Machines Fixed ($0 Invoiced).
            </p>
          </div>
        </noscript>
      )}

      {/* Top OS System Menu Bar */}
      <OSHeader onOpenBios={() => setBiosOpen(true)} />

      {/* Main OS Desktop / Document Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 space-y-8">
        {/* Hero Section: Beige Tower PC + CRT Monitor */}
        <section id="hero" className="scroll-mt-14">
          <HeroTower onScrollToSection={handleScrollTo} />
        </section>

        {/* Section 1: Projects Floppy Archive */}
        <section id="projects" className="scroll-mt-14">
          <CartridgeGrid />
        </section>

        {/* Section 2: Repair Bay Diagnostics */}
        <section id="repair" className="scroll-mt-14">
          <RepairBay />
        </section>

        {/* Section 3: Skill Tree Topology */}
        <section id="skills" className="scroll-mt-14">
          <SkillTree />
        </section>

        {/* Section 4: ARHAM-DOS Terminal Console */}
        <section id="terminal" className="scroll-mt-14">
          <TerminalBar />
        </section>

        {/* Section 5: Quest Milestones Log */}
        <section id="quest" className="scroll-mt-14">
          <QuestLog />
        </section>

        {/* Section 6: Serial Communication / Contact */}
        <section id="contact" className="scroll-mt-14">
          <Contact />
        </section>

        {/* Footer Intersection Sentinel (Unlocks achievement 8) */}
        <div
          ref={footerRef}
          className="text-center py-6 text-xs text-ink/60 font-mono border-t border-lo/60 space-y-1"
        >
          <div>
            ARHAM OS // FAISALABAD, PAKISTAN // 31.4504° N, 73.1350° E
          </div>
          <div className="text-[11px] text-ink/40">
            Award Modular BIOS v4.51PG · All sectors read OK · Pro bono hardware fixes.
          </div>
        </div>
      </main>

      {/* Late-90s Bottom Taskbar & System Tray */}
      <Taskbar onOpenBios={() => setBiosOpen(true)} />

      {/* Easter Egg & BIOS Modals */}
      <EasterEggManager />
      <BiosSetup isOpen={biosOpen} onClose={() => setBiosOpen(false)} />
    </div>
  );
}
