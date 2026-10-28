'use client';

import { useState, useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SKILL_NODES, SKILL_CATEGORIES } from '@/lib/skills';
import SkillSprites from './SkillSprites';
import SkillNode from './SkillNode';
import { EASE } from '@/lib/tokens';

export default function SkillTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Pre-calculate line connections with clean ortholine segments
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
            scale: 0.2,
            opacity: 0,
            ease: EASE.bounce,
            stagger: 0.04,
            duration: 0.45,
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
            <span className="w-2 h-2 bg-pink inline-block animate-ping" />
            TOPOLOGY // ARCHITECTURE // RUNTIMES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            SKILL TREE
          </h2>
        </div>
        <div className="text-xs font-mono text-light/50 max-w-sm">
          Node-graph topology with logo glyphs only. Hover any node to light connected data paths and reveal tooltips.
        </div>
      </div>

      {/* Main Interactive Circuit Graph */}
      <div className="relative w-full border border-light/10 bg-jet/80 backdrop-blur-sm overflow-hidden p-2 sm:p-4">
        {/* Aspect Ratio Canvas */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[420px] max-h-[640px]">
          {/* Subtle Circuit Grid */}
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
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {edges.map((edge, idx) => {
              const isPathActive =
                activeHoverId === edge.from || activeHoverId === edge.to;
              return (
                <g key={idx}>
                  {/* Glowing backlight on hover */}
                  {isPathActive && (
                    <line
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke="#FF1F8E"
                      strokeWidth="5"
                      strokeOpacity="0.4"
                    />
                  )}
                  {/* Primary Trace */}
                  <line
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke={isPathActive ? '#FF1F8E' : 'rgba(182, 255, 0, 0.25)'}
                    strokeWidth={isPathActive ? '2.5' : '1.2'}
                    strokeDasharray={isPathActive ? 'none' : '4 4'}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Logo Nodes */}
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
        </div>
      </div>

      {/* Structured Category Roster */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.category}
            className="p-3 border border-light/10 bg-jet/60 space-y-2 hover:border-pink transition-colors"
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-light/50">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: cat.color }}
              />
              {cat.label}
            </div>
            <div className="space-y-1 text-light/80 text-[11px]">
              {cat.skills.map((s, i) => (
                <div
                  key={i}
                  className="hover:text-chartreuse transition-colors cursor-default"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
