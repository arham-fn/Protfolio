'use client';

import React, { useState } from 'react';
import type { Project } from '@/types';

interface FloppyCartridgeProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function FloppyCartridge({ project, onSelect }: FloppyCartridgeProps) {
  const [inserting, setInserting] = useState(false);
  const isFlagship = Boolean(project.isFlagship);

  const handleClick = () => {
    setInserting(true);
    setTimeout(() => {
      setInserting(false);
      onSelect(project);
    }, 280);
  };

  const getStatusBevel = (status: Project['status']) => {
    switch (status) {
      case 'LIVE':
        return 'bg-primary text-ink border-lo font-black';
      case 'COMPLETED':
        return 'bg-accent text-[#EFEADB] font-bold';
      case 'BUILT':
        return 'bg-[#EDE8D6] text-ink font-semibold';
      case 'IN PROGRESS':
        return 'bg-[#F2A900] text-ink font-bold';
      case 'DEMO':
        return 'bg-[#8F8870] text-[#EFEADB] font-semibold';
      default:
        return 'bg-surface text-ink';
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Floppy disk cartridge: ${project.title}. Status: ${project.status}. Click or press enter to insert into drive.`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group relative p-3 sm:p-4 bevel-raised bg-[#BFB79E] cursor-pointer select-none transition-all duration-200 ${
        isFlagship ? 'border-2 border-primary md:col-span-2' : ''
      } ${inserting ? '-translate-y-2 opacity-80' : 'hover:-translate-y-1 hover:shadow-window'}`}
    >
      {/* 3.5" Floppy Top Edge: Metal Shutter */}
      <div className="relative mb-3 h-8 bevel-sunken bg-[#A09880] flex items-center justify-between px-3">
        {/* Shutter Slider Plate */}
        <div className="h-6 w-20 bevel-raised bg-[#D5CEB8] flex items-center justify-center text-[10px] text-ink/70 font-mono font-bold tracking-wider">
          2HD 1.44MB
        </div>
        {/* Read/Write Aperture Notch */}
        <div className="w-5 h-4 bg-[#2A241C] border border-lo rounded-xs" />
      </div>

      {/* Floppy Paper Label Area */}
      <div className="p-3 bg-[#EDE8D6] bevel-sunken border border-lo font-mono space-y-2">
        {/* Label Header */}
        <div className="flex items-center justify-between gap-2 border-b border-lo/60 pb-1.5 text-[10px]">
          <span className="font-bold text-accent truncate">
            VOL: {project.id.toUpperCase()}
          </span>
          <span
            className={`px-1.5 py-0.5 text-[9px] uppercase bevel-sunken ${getStatusBevel(
              project.status
            )}`}
          >
            {project.status === 'LIVE' && '● '}
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-base sm:text-lg text-ink group-hover:text-accent transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-[11px] text-ink/80 line-clamp-2">
          {project.tagline}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {project.stack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[9px] px-1.5 py-0.2 bg-surface bevel-raised text-ink font-semibold"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-[9px] px-1 py-0.2 text-ink/60">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Floppy Bottom: Write-Protect Slider & Drive Insertion Tab */}
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-ink/60 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bevel-sunken bg-black/50 inline-block" title="Write-Protect Notch" />
          <span>DRIVE A:</span>
        </div>

        <span className="font-bold text-accent group-hover:underline flex items-center gap-1">
          <span>[INSERT DISK]</span>
          <span>⏏</span>
        </span>
      </div>
    </div>
  );
}
