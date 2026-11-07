'use client';

import React, { useEffect, useState } from 'react';
import BiosSetup from './BiosSetup';
import { useOSStore, ACHIEVEMENTS } from '@/hooks/useOSStore';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function EasterEggManager() {
  const [biosOpen, setBiosOpen] = useState(false);
  const [cheatToast, setCheatToast] = useState(false);

  const {
    latestUnlocked,
    clearLatestUnlocked,
    unlockAchievement,
  } = useOSStore();

  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // F2 -> Toggle BIOS setup
      if (e.key === 'F2') {
        e.preventDefault();
        setBiosOpen((prev) => {
          if (!prev) unlockAchievement('bios');
          return !prev;
        });
        return;
      }

      if (e.key === 'Escape' && biosOpen) {
        setBiosOpen(false);
        return;
      }

      // Konami code check
      if (e.key.toLowerCase() === KONAMI_CODE[index].toLowerCase()) {
        index++;
        if (index === KONAMI_CODE.length) {
          index = 0;
          document.documentElement.classList.toggle('cheat-active');
          unlockAchievement('konami');
          setCheatToast(true);
          setTimeout(() => setCheatToast(false), 4000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [biosOpen, unlockAchievement]);

  // Achievement unlock banner auto-dismiss
  useEffect(() => {
    if (latestUnlocked) {
      const timer = setTimeout(() => {
        clearLatestUnlocked();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [latestUnlocked, clearLatestUnlocked]);

  const latestMeta = latestUnlocked ? ACHIEVEMENTS[latestUnlocked] : null;

  return (
    <>
      {/* Toast Alert for Konami Code */}
      {cheatToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-12 right-4 z-[500] px-4 py-2.5 bevel-raised bg-accent text-[#EFEADB] font-mono text-xs font-bold shadow-window animate-bounce"
        >
          🎮 CHEAT CODE 1998 ENGAGED: PALETTE INVERSION ACTIVE!
        </div>
      )}

      {/* Achievement Unlocked Notification Banner */}
      {latestUnlocked && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-14 right-4 z-[500] max-w-sm bevel-raised bg-[#EDE8D6] text-ink p-3 shadow-window font-mono text-xs flex items-start gap-2.5 border-2 border-accent animate-in fade-in slide-in-from-right-4 duration-300"
        >
          <span className="text-xl">🏆</span>
          <div>
            <div className="font-bold text-accent text-[11px] uppercase tracking-wider">
              ACHIEVEMENT UNLOCKED!
            </div>
            <div className="font-extrabold text-xs text-ink mt-0.5">
              {latestUnlocked.toUpperCase().replace('_', ' ')}
            </div>
            <div className="text-[10px] text-ink/70">
              Check your Achievements window in the taskbar tray.
            </div>
          </div>
        </div>
      )}

      {/* BIOS Screen Modal */}
      <BiosSetup isOpen={biosOpen} onClose={() => setBiosOpen(false)} />
    </>
  );
}
