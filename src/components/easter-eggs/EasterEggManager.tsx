'use client';

import { useEffect, useState } from 'react';
import BiosSetup from './BiosSetup';

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
  const [cheatToast, setCheatToast] = useState(false);
  const [biosOpen, setBiosOpen] = useState(false);

  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // F2 → BIOS setup
      if (e.key === 'F2') {
        e.preventDefault();
        setBiosOpen((prev) => !prev);
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
          setCheatToast(true);
          setTimeout(() => setCheatToast(false), 3000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [biosOpen]);

  return (
    <>
      {/* Toast Alert */}
      {cheatToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-[500] px-4 py-2 border-2 border-chartreuse bg-jet text-chartreuse font-mono text-xs font-bold shadow-[0_0_20px_#B6FF00] animate-bounce"
        >
          CHEAT ACTIVATED // COLOR INVERSION ENGAGED
        </div>
      )}

      {/* BIOS Screen Overlay */}
      <BiosSetup isOpen={biosOpen} onClose={() => setBiosOpen(false)} />
    </>
  );
}
