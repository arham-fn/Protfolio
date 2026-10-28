'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { QUEST_MILESTONES } from '@/lib/timeline';

export default function QuestLog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Clean staggered entrance for timeline cards without breaking page flow
      ScrollTrigger.batch('.quest-card', {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
        once: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="quest-log"
      ref={containerRef}
      className="relative py-24 px-6 sm:px-12 lg:px-24 border-b border-light/5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="text-chartreuse font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-chartreuse inline-block" />
            CHRONOLOGY // EDUCATION // MILESTONES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            QUEST LOG
          </h2>
        </div>
        <div className="text-xs font-mono text-light/50 max-w-sm">
          Strictly personal milestones: GCUF Computer Science degree and self-directed building sprints.
        </div>
      </div>

      {/* Horizontal / Grid Scroll Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUEST_MILESTONES.map((m, idx) => (
          <div
            key={m.id}
            className="quest-card p-6 bg-jet border border-light/10 hover:border-chartreuse transition-colors relative font-mono flex flex-col justify-between"
          >
            <div>
              {/* Top Index & Date */}
              <div className="flex items-center justify-between mb-4 border-b border-light/10 pb-2">
                <span className="text-[10px] text-pink font-bold">
                  QUEST 0{idx + 1}
                </span>
                <span className="text-[11px] text-chartreuse">
                  {m.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg text-light mb-3">
                {m.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-light/70 leading-relaxed">
                {m.description}
              </p>
            </div>

            {/* Footer Tag */}
            <div className="mt-6 pt-3 border-t border-light/10 flex items-center justify-between text-[10px] text-light/40">
              <span>TYPE: {m.type.toUpperCase()}</span>
              <span className="text-chartreuse font-bold">COMPLETED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
