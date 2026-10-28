'use client';

import { useClassMode } from '@/hooks/useClassMode';
import type { ClassMode } from '@/types';

const MODES: { id: ClassMode; label: string; desc: string }[] = [
  { id: 'CLIENT', label: 'CLIENT', desc: 'Projects & Immediate Value' },
  { id: 'RECRUITER', label: 'RECRUITER', desc: 'Trajectory, Skills & Code' },
  { id: 'DEV', label: 'DEV', desc: 'Hardware, Architecture & Diagnostics' },
];

export default function ClassSelect() {
  const { mode, setMode } = useClassMode();

  return (
    <div
      role="radiogroup"
      aria-label="Profile View Mode"
      className="inline-flex items-center gap-1 p-1 bg-jet/90 border border-chartreuse/25 rounded-none backdrop-blur-md"
    >
      <span className="text-[10px] text-chartreuse/60 font-mono px-2 hidden sm:inline uppercase tracking-widest">
        CLASS:
      </span>
      {MODES.map((m) => {
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setMode(m.id)}
            className={`relative px-2.5 py-1 text-xs font-mono transition-all duration-300 ${
              isActive
                ? 'bg-pink text-white font-bold shadow-[0_0_12px_rgba(255,31,142,0.6)]'
                : 'text-light/70 hover:text-chartreuse hover:bg-white/5'
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
