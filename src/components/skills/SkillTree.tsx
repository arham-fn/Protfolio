'use client';

import { useState, useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SKILL_NODES } from '@/lib/skills';
import SkillSprites from './SkillSprites';
import SkillNode from './SkillNode';
import { EASE } from '@/lib/tokens';

export default function SkillTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Pre-calculate line connections
  const edges = useMemo(() => {
    const list: { from: string; to: string; x1: number; y1: number; x2: number; y2: number }[] = [];
    const nodeMap = new Map(SKILL_NODES.map((n) => [n.id, n]));

    SKILL_NODES.forEach((n) => {
      n.connections.forEach((connId) => {
        const target = nodeMap.get(connId);
        if (target) {
          list.push({
            from: n.id,
            to: connId,
            x1: n.x,
            y1: n.y,
            x2: target.x,
            y2: target.y,
          });
        }
      });
    });
    return list;
  }, []);

  // GSAP Batch Entrance
  useGSAP(
    () => {
      ScrollTrigger.batch('.skill-tree-node', {
        interval: 0.05,
        batchMax: 6,
        onEnter: (batch) => {
          gsap.from(batch, {
            scale: 0,
            opacity: 0,
            ease: EASE.bounce,
            stagger: 0.04,
            duration: 0.5,
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
      id="skills"
      ref={containerRef}
      className="relative min-h-[90vh] py-20 px-6 sm:px-12 lg:px-24 border-b border-light/5 overflow-hidden"
    >
      <SkillSprites />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-pink font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-pink inline-block" />
            TOPOLOGY // ARCHITECTURE // RUNTIMES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            SKILL TREE
          </h2>
        </div>
        <div className="text-xs font-mono text-light/50 max-w-sm">
          Interactive node diagram. Hover or focus any chip to trace data path and activate telemetry.
        </div>
      </div>

      {/* Main Node Graph Board */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[700px] border border-light/10 bg-jet/60 backdrop-blur-sm overflow-hidden">
        {/* Subtle Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(182, 255, 0, 0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Dynamic Connection Lines (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {edges.map((edge, idx) => {
            const isPathActive =
              activeHoverId === edge.from || activeHoverId === edge.to;
            return (
              <line
                key={idx}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke={isPathActive ? '#FF1F8E' : 'rgba(182, 255, 0, 0.2)'}
                strokeWidth={isPathActive ? '0.6' : '0.3'}
                strokeDasharray={isPathActive ? 'none' : '1 1'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {SKILL_NODES.map((node) => {
          const isHighlighted =
            activeHoverId !== null &&
            (activeHoverId === node.id ||
              node.connections.includes(activeHoverId) ||
              SKILL_NODES.find((n) => n.id === activeHoverId)?.connections.includes(node.id));

          return (
            <div key={node.id} className="skill-tree-node">
              <SkillNode
                node={node}
                isHighlighted={Boolean(isHighlighted)}
                onHover={setActiveHoverId}
              />
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-4 text-[10px] font-mono text-light/40 border border-light/10 px-3 py-1.5 bg-jet/80">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 border border-chartreuse inline-block" /> Core Hub
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-pink inline-block" /> Data Path
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-chartreuse/30 inline-block" /> Systems & AI
          </span>
        </div>
      </div>
    </section>
  );
}
