'use client';

import { useState } from 'react';
import type { SkillNode as SkillNodeType } from '@/types';

interface SkillNodeProps {
  node: SkillNodeType;
  isHighlighted: boolean;
  onHover: (id: string | null) => void;
}

export default function SkillNode({ node, isHighlighted, onHover }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);
  const isCore = node.category === 'core';

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
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
      aria-label={node.name}
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
        className={`relative flex items-center justify-center rounded-none transition-all duration-300 ${
          isCore
            ? 'w-12 h-12 sm:w-14 sm:h-14 border-2'
            : 'w-10 h-10 sm:w-11 sm:h-11 border'
        } ${
          hovered
            ? 'border-pink bg-pink/20 text-pink scale-110 shadow-[0_0_16px_rgba(255,31,142,0.6)]'
            : isHighlighted
            ? 'border-chartreuse bg-chartreuse/20 text-chartreuse scale-105 shadow-[0_0_12px_rgba(182,255,0,0.4)]'
            : 'border-chartreuse/40 bg-jet/80 text-chartreuse/80 hover:border-pink hover:text-pink'
        }`}
      >
        {/* SVG Sprite Reference */}
        <svg
          className={`${isCore ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-5 sm:h-5'} transition-colors duration-200`}
        >
          <use href={`#icon-${node.id}`} />
        </svg>

        {/* Tiny corner circuit accents on core nodes */}
        {isCore && (
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-chartreuse" />
        )}
      </div>

      {/* Strict Tooltip: Name ONLY on hover/focus */}
      <div
        role="tooltip"
        className={`absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 bg-jet border border-chartreuse/60 text-chartreuse font-mono text-[11px] whitespace-nowrap pointer-events-none transition-all duration-200 z-50 ${
          hovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
        }`}
      >
        {node.name}
      </div>
    </div>
  );
}
