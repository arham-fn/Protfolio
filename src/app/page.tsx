'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import BootSequence from '@/components/boot/BootSequence';
import GlitchTransition from '@/components/shared/GlitchTransition';
import HUDShell from '@/components/hud/HUDShell';
import Hero from '@/components/hero/Hero';
import SkillTree from '@/components/skills/SkillTree';
import CartridgeGrid from '@/components/cartridges/CartridgeGrid';
import RepairBay from '@/components/repair/RepairBay';
import QuestLog from '@/components/quest/QuestLog';
import Contact from '@/components/contact/Contact';
import PCBTrace from '@/components/shared/PCBTrace';
import EasterEggManager from '@/components/easter-eggs/EasterEggManager';
import { useClassMode, hydrateClassMode } from '@/hooks/useClassMode';
import { useLenis } from '@/hooks/useLenis';
import type { BootPhase } from '@/types';

export default function Home() {
  const [phase, setPhase] = useState<BootPhase>('loading');
  const { mode } = useClassMode();

  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    hydrateClassMode();

    // Check if already booted in this session
    try {
      if (sessionStorage.getItem('arham-booted') === 'true') {
        setPhase('main');
        return;
      }
    } catch {
      setPhase('main');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markBooted();
      setPhase('main');
      return;
    }

    setPhase('boot');
  }, []);

  const markBooted = useCallback(() => {
    try {
      sessionStorage.setItem('arham-booted', 'true');
    } catch {
      // Ignored
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    markBooted();
    setPhase('glitch');
  }, [markBooted]);

  const handleGlitchComplete = useCallback(() => {
    setPhase('main');
  }, []);

  // Section ordering dynamically tuned to ClassMode
  // CLIENT = Cartridges + Contact first
  // RECRUITER = Quest log + Skills + Contact first
  // DEV = Skill tree + Repair Bay + Cartridges first
  const sections = useMemo(() => {
    const list = [
      { id: 'hero', comp: <Hero key="hero" /> },
      { id: 'skills', comp: <SkillTree key="skills" /> },
      { id: 'cartridges', comp: <CartridgeGrid key="cartridges" /> },
      { id: 'repair', comp: <RepairBay key="repair" /> },
      { id: 'quest', comp: <QuestLog key="quest" /> },
      { id: 'contact', comp: <Contact key="contact" /> },
    ];

    if (mode === 'CLIENT') {
      return [
        list[0], // hero
        list[2], // cartridges
        list[5], // contact
        list[3], // repair
        list[1], // skills
        list[4], // quest
      ];
    } else if (mode === 'RECRUITER') {
      return [
        list[0], // hero
        list[4], // quest
        list[1], // skills
        list[2], // cartridges
        list[5], // contact
        list[3], // repair
      ];
    }

    // Default / DEV mode
    return list;
  }, [mode]);

  return (
    <>
      {phase === 'loading' && (
        <div className="fixed inset-0 bg-jet z-[500]" aria-hidden="true" />
      )}

      {phase === 'boot' && <BootSequence onComplete={handleBootComplete} />}

      {phase === 'glitch' && (
        <GlitchTransition onComplete={handleGlitchComplete} />
      )}

      {phase === 'main' && (
        <div className="scanlines">
          <HUDShell>
            <div className="relative">
              {/* Glowing PCB Trace SVG line drawing through sections */}
              <PCBTrace />

              {/* Dynamic Sections */}
              <main>{sections.map((s) => s.comp)}</main>
            </div>
          </HUDShell>
          <EasterEggManager />
        </div>
      )}
    </>
  );
}
