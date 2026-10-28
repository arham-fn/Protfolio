'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, Flip } from '@/lib/gsap';
import { PROJECTS } from '@/lib/projects';
import Cartridge from './Cartridge';
import type { Project } from '@/types';
import { useClassMode } from '@/hooks/useClassMode';

// Dynamic import for expanded case study dialog to preserve bundle size
const CaseStudy = dynamic(() => import('./CaseStudy'), {
  ssr: false,
});

export default function CartridgeGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { mode } = useClassMode();

  // Scroll batch entrance
  useGSAP(
    () => {
      ScrollTrigger.batch('.cartridge-item', {
        interval: 0.08,
        batchMax: 4,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.06,
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
      id="cartridges"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 border-b border-light/5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="text-chartreuse font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-chartreuse inline-block animate-pulse-dot" />
            ROM ARCHIVE // PRODUCTION DEPLOYMENTS // CASE STUDIES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            PROJECT CARTRIDGES
          </h2>
        </div>
        <div className="text-xs font-mono text-light/50 max-w-sm">
          Select any cartridge to insert into the chassis and review technical telemetry, architectures, and outcomes.
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="cartridge-item">
            <Cartridge project={proj} onSelect={setSelectedProject} />
          </div>
        ))}
      </div>

      {/* Modal Case Study */}
      {selectedProject && (
        <CaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
