'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function XPBar() {
  const progress = useScrollProgress();
  const xpValue = Math.round(progress * 1000);

  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <div className="hidden sm:flex items-center gap-1.5 text-chartreuse">
        <span className="text-[10px] uppercase tracking-widest text-chartreuse/70">XP:</span>
        <span className="font-bold tabular-nums min-w-[4ch]">{xpValue}</span>
        <span className="text-[10px] text-light/40">/1000</span>
      </div>
      <div
        className="w-24 sm:w-36 h-2 bg-jet border border-chartreuse/30 relative overflow-hidden"
        role="progressbar"
        aria-valuenow={xpValue}
        aria-valuemin={0}
        aria-valuemax={1000}
        aria-label="Scroll progression XP"
      >
        <div
          className="h-full bg-chartreuse transition-transform duration-75 origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
