'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/lib/projects';
import FloppyCartridge from './FloppyCartridge';
import CaseStudy from './CaseStudy';
import OSWindow from '@/components/os/OSWindow';
import type { Project } from '@/types';
import { useOSStore } from '@/hooks/useOSStore';

export default function CartridgeGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { unlockAchievement } = useOSStore();

  const handleHiddenFloppyClick = () => {
    unlockAchievement('hidden_floppy');
    alert('🏆 EASTER EGG UNLOCKED!\nYou found the hidden 1.44MB floppy cartridge tucked behind the drive rack.');
  };

  return (
    <OSWindow
      id="projects"
      title="A:\PROJECTS - FLOPPY DISK ARCHIVE (1.44MB HD)"
      icon="💾"
    >
      <div className="space-y-6">
        {/* Section Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-lo">
          <div>
            <div className="text-[11px] font-mono text-accent font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>●</span>
              <span>READ-ONLY MEMORY CARTRIDGES // 7 SYSTEMS</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-accent">
              PROJECT ARCHIVE
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/70 max-w-sm">
            Select any 3.5&quot; floppy diskette to insert into the drive and examine system architectures and live deployments.
          </p>
        </div>

        {/* Grid of Floppy Cartridges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((proj) => (
            <div key={proj.id} id={proj.id} className="scroll-mt-20">
              <FloppyCartridge project={proj} onSelect={setSelectedProject} />
            </div>
          ))}

          {/* Hidden Easter Egg Floppy Diskette */}
          <div
            tabIndex={0}
            role="button"
            aria-label="Secret diagnostics floppy diskette. Click to inspect."
            onClick={handleHiddenFloppyClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleHiddenFloppyClick();
              }
            }}
            className="p-3 bevel-raised bg-[#A8A086] border border-dashed border-lo cursor-pointer hover:brightness-105 active:scale-98 transition-all flex flex-col justify-between"
          >
            <div className="h-6 bevel-sunken bg-[#8C846C] flex items-center justify-between px-2 text-[9px] font-bold text-ink/60">
              <span>2DD 720KB</span>
              <span className="text-primary font-bold">★ HIDDEN</span>
            </div>
            <div className="my-2 p-2 bg-[#DDD7C2] bevel-sunken text-[10px] space-y-1">
              <div className="font-bold text-accent">DIAG_RESTORE_DISK_v1.0</div>
              <div className="text-ink/60 italic text-[9px]">Emergency POST diagnostics utilities.</div>
            </div>
            <div className="text-[9px] text-accent font-bold text-right">
              [INSPECT DISK 🔍]
            </div>
          </div>
        </div>

        {/* Modal Case Study Window */}
        {selectedProject && (
          <CaseStudy
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </OSWindow>
  );
}
