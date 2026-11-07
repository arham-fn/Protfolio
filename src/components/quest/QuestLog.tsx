'use client';

import React from 'react';
import { QUEST_MILESTONES } from '@/lib/timeline';
import OSWindow from '@/components/os/OSWindow';

export default function QuestLog() {
  return (
    <OSWindow
      id="quest"
      title="C:\LOGS - QUEST MILESTONES &amp; EDUCATION CHRONOLOGY"
      icon="📜"
    >
      <div className="space-y-6 font-mono text-xs sm:text-sm">
        {/* Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-lo">
          <div>
            <div className="text-[11px] text-accent font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>●</span>
              <span>GCUF DEGREE // INDEPENDENT CURRICULUM // HARDWARE ROOTS</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-accent">
              QUEST LOG
            </h2>
          </div>
          <div className="text-xs text-ink/70 max-w-sm">
            Strictly personal milestones: GCUF Computer Science degree and self-directed software &amp; hardware sprints.
          </div>
        </div>

        {/* Quest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUEST_MILESTONES.map((m, idx) => (
            <div
              key={m.id}
              className="p-4 bevel-raised bg-[#EDE8D6] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-lo/60 text-[10px]">
                  <span className="font-bold text-accent">
                    QUEST 0{idx + 1}
                  </span>
                  <span className="bevel-sunken px-1.5 py-0.2 bg-surface text-ink font-semibold">
                    {m.date}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-base text-accent mb-1.5">
                  {m.title}
                </h3>

                <p className="text-xs text-ink/80 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="pt-2 border-t border-lo flex items-center justify-between text-[10px] text-ink/60">
                <span>SECTOR: {m.type.toUpperCase()}</span>
                <span className="text-accent font-bold">● COMPLETED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OSWindow>
  );
}
