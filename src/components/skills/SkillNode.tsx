'use client';

import React, { useState } from 'react';
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
      aria-label={node.name}
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
      {/* Bevelled Tile Socket (Beige Box OS Style) */}
      <div
        className={`relative flex items-center justify-center transition-all duration-150 select-none ${
          isCore
            ? 'w-11 h-11 sm:w-13 sm:h-13'
            : 'w-9 h-9 sm:w-11 sm:h-11'
        } ${
          isSelected
            ? 'bevel-sunken bg-accent text-[#EFEADB] scale-110 shadow-window ring-2 ring-accent'
            : hovered
            ? 'bevel-raised bg-[#EDE8D6] text-accent scale-108 shadow-md'
            : isHighlighted
            ? 'bevel-raised bg-[#EDE8D6] text-accent border-accent scale-104 shadow-sm'
            : 'bevel-raised bg-surface text-ink/90 hover:text-accent'
        }`}
      >
        {/* SVG Sprite Reference (Logos only) */}
        <svg
          className={`${isCore ? 'w-6 h-6' : 'w-5 h-5'} pointer-events-none transition-colors duration-150`}
        >
          <use href={`#icon-${node.id}`} />
        </svg>

        {/* Core Bus Indicator Pin */}
        {isCore && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent bevel-raised" />
        )}
      </div>

      {/* Tooltip: Shown on hover / focus */}
      <div
        role="tooltip"
        className={`absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-0.5 bevel-raised bg-surface text-accent font-mono font-bold text-[10px] whitespace-nowrap pointer-events-none transition-opacity duration-150 shadow-sm z-50 ${
          hovered || isSelected ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {node.name}
      </div>
    </div>
  );
}
