'use client';

import { useState } from 'react';
import type { ExtendedSkillNode } from '@/lib/skills';

interface SkillNodeProps {
  node: ExtendedSkillNode;
  isHighlighted: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (node: ExtendedSkillNode) => void;
}

export default function SkillNode({
  node,
  isHighlighted,
  isSelected,
  onHover,
  onSelect,
}: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);
  const isCore = node.category === 'core';

  const handleTrigger = () => {
    onSelect(node);
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
      style={{ left: `${(node.x / 1000) * 100}%`, top: `${(node.y / 600) * 100}%` }}
      onPointerEnter={() => {
        setHovered(true);
        onHover(node.id);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
      }}
      tabIndex={0}
      role="button"
      aria-label={`${node.name} skill node. Click or press enter to view technical details.`}
      onClick={handleTrigger}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTrigger();
        }
      }}
      onFocus={() => {
        setHovered(true);
        onHover(node.id);
      }}
      onBlur={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      {/* Node Shape / Socket */}
      <div
        className={`relative flex items-center justify-center transition-all duration-200 select-none ${
          isCore
            ? 'w-12 h-12 md:w-14 md:h-14 border-2 bg-jet'
            : 'w-10 h-10 md:w-11 md:h-11 border bg-jet/90'
        } ${
          isSelected
            ? 'border-chartreuse bg-chartreuse/30 text-chartreuse scale-115 shadow-[0_0_20px_#B6FF00] z-40 ring-2 ring-chartreuse ring-offset-2 ring-offset-jet'
            : hovered
            ? 'border-pink bg-pink/25 text-pink scale-110 shadow-[0_0_16px_rgba(255,31,142,0.8)] z-30'
            : isHighlighted
            ? 'border-chartreuse bg-chartreuse/25 text-chartreuse scale-105 shadow-[0_0_12px_rgba(182,255,0,0.6)] z-20'
            : 'border-chartreuse/50 text-chartreuse/90 hover:border-pink hover:text-pink'
        }`}
      >
        {/* SVG Sprite Reference */}
        <svg
          className={`${isCore ? 'w-6 h-6 md:w-7 md:h-7' : 'w-5 h-5 md:w-5 md:h-5'} transition-colors duration-200 pointer-events-none`}
        >
          <use href={`#icon-${node.id}`} />
        </svg>

        {/* Corner circuit pin on core nodes */}
        {isCore && (
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-chartreuse shadow-[0_0_4px_#B6FF00]" />
        )}
      </div>

      {/* Strict Tooltip: Name ONLY on hover/focus */}
      <div
        role="tooltip"
        className={`absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 bg-jet border border-chartreuse text-chartreuse font-mono text-[11px] whitespace-nowrap pointer-events-none transition-all duration-150 shadow-[0_0_8px_rgba(182,255,0,0.3)] z-50 ${
          hovered || isSelected ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
        }`}
      >
        {node.name}
      </div>
    </div>
  );
}
