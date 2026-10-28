'use client';

import { useRef, useState } from 'react';
import type { Project } from '@/types';

interface CartridgeProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function Cartridge({ project, onSelect }: CartridgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const isFlagship = Boolean(project.isFlagship);

  // 3D Tilt calculation (Transforms only)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handlePointerLeave = () => {
    setTransformStyle('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'LIVE':
        return 'border-chartreuse text-chartreuse shadow-[0_0_8px_#B6FF00]';
      case 'COMPLETED':
        return 'border-pink text-pink';
      case 'BUILT':
        return 'border-light/40 text-light/80';
      case 'IN PROGRESS':
        return 'border-yellow-400 text-yellow-400';
      case 'PLANNED':
        return 'border-light/20 text-light/40';
      case 'DEMO':
        return 'border-cyan-400 text-cyan-400';
      default:
        return 'border-light/20 text-light/40';
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`Inspect cartridge: ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={`group relative p-5 bg-jet border transition-all duration-300 cursor-pointer select-none will-change-transform ${
        isFlagship
          ? 'border-chartreuse shadow-[0_0_24px_rgba(182,255,0,0.2)] md:col-span-2'
          : 'border-light/10 hover:border-pink hover:shadow-[0_0_20px_rgba(255,31,142,0.2)]'
      }`}
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Retro Cartridge Pin Notch Top */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
        <span className="w-2 h-1.5 bg-jet border border-light/20 inline-block" />
        <span className="w-2 h-1.5 bg-jet border border-light/20 inline-block" />
        <span className="w-2 h-1.5 bg-jet border border-light/20 inline-block" />
      </div>

      {/* Top Header & Status */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <span className="text-[10px] font-mono text-light/40 uppercase tracking-widest">
          {project.id}
        </span>
        <span
          className={`text-[9px] font-mono uppercase px-2 py-0.5 border font-bold ${getStatusColor(
            project.status
          )}`}
        >
          {project.status === 'LIVE' && '● '}
          {project.status}
        </span>
      </div>

      {/* Cartridge Title & Tagline */}
      <h3 className="font-display font-black text-xl sm:text-2xl text-light group-hover:text-pink transition-colors mb-2">
        {project.title}
      </h3>
      <p className="text-light/60 text-xs font-mono line-clamp-2 mb-6">
        {project.tagline}
      </p>

      {/* Stack Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.stack.slice(0, 4).map((tech, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-1.5 py-0.5 bg-white/5 border border-light/10 text-light/70"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 text-light/40">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      {/* Slot Insertion Action CTA */}
      <div className="pt-3 border-t border-light/10 flex items-center justify-between text-xs font-mono">
        <span className="text-chartreuse group-hover:text-pink transition-colors">
          [INSERT CARTRIDGE]
        </span>
        <span className="text-light/40 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </div>
  );
}
