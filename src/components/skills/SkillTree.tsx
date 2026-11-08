'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SKILL_NODES, type ExtendedSkillNode } from '@/lib/skills';
import SkillSprites from './SkillSprites';
import SkillNode from './SkillNode';
import OSWindow from '@/components/os/OSWindow';
import { useOSStore } from '@/hooks/useOSStore';
import { gsap } from '@/lib/gsap';

export default function SkillTree() {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<ExtendedSkillNode | null>(null);
  const { trackSkillClick } = useOSStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedNode && drawerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          drawerRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.4)' }
        );
      }, drawerRef);
      return () => ctx.revert();
    }
  }, [selectedNode]);

  const handleSelectNode = (node: ExtendedSkillNode) => {
    trackSkillClick(node.id);
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  };

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

  return (
    <OSWindow
      id="skills"
      title="C:\SYSTEM - SKILL TOPOLOGY &amp; RUNTIMES (18 NODES)"
      icon="⚡"
    >
      <div className="space-y-6 font-mono text-xs">
        <SkillSprites />

        {/* Header Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-lo">
          <div>
            <div className="text-[11px] text-accent font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>●</span>
              <span>CIRCUIT BUS ARCHITECTURE // LOGOS ONLY // ARIA-LABELED</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-accent">
              SKILL TREE
            </h2>
          </div>
          <p className="text-xs text-ink/70 max-w-sm">
            Interactive circuit topology. Click or tap any bevelled chip to view its real-world implementation telemetry.
          </p>
        </div>

        {/* Main Circuit Canvas */}
        <div className="p-3 sm:p-5 bevel-sunken bg-[#EDE8D6] relative overflow-hidden">
          {/* Subtle PCB dot matrix */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle, #1E3FA0 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Coordinate Canvas Box */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] max-h-[580px]">
            {/* SVG Connection Traces (Lit path in accent blue #1E3FA0) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              {edges.map((edge, idx) => {
                const isPathActive =
                  activeHoverId === edge.from ||
                  activeHoverId === edge.to ||
                  selectedNode?.id === edge.from ||
                  selectedNode?.id === edge.to;
                return (
                  <g key={idx}>
                    {/* Glowing backlight trace in Accent Blue */}
                    {isPathActive && (
                      <line
                        x1={edge.x1}
                        y1={edge.y1}
                        x2={edge.x2}
                        y2={edge.y2}
                        stroke="#1E3FA0"
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
                      stroke={isPathActive ? '#1E3FA0' : '#8F8870'}
                      strokeWidth={isPathActive ? '2.5' : '1.5'}
                      strokeDasharray={isPathActive ? 'none' : '4 4'}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Logo Nodes (Bevelled Tiles) */}
            {SKILL_NODES.map((node) => {
              const isHighlighted =
                (activeHoverId !== null &&
                  (activeHoverId === node.id ||
                    node.connections.includes(activeHoverId) ||
                    SKILL_NODES.find((n) => n.id === activeHoverId)?.connections.includes(node.id))) ||
                (selectedNode !== null &&
                  (selectedNode.id === node.id ||
                    node.connections.includes(selectedNode.id) ||
                    SKILL_NODES.find((n) => n.id === selectedNode.id)?.connections.includes(node.id)));

              return (
                <div key={node.id} className="skill-tree-node">
                  <SkillNode
                    node={node}
                    isHighlighted={Boolean(isHighlighted)}
                    isSelected={selectedNode?.id === node.id}
                    onHover={setActiveHoverId}
                    onSelect={handleSelectNode}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div
            ref={drawerRef}
            role="region"
            aria-live="polite"
            className="p-4 bevel-raised bg-surface space-y-2 border-2 border-accent"
          >
            <div className="flex items-center justify-between border-b border-lo pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-bold text-accent uppercase text-sm">
                  {selectedNode.name}
                </span>
                <span className="text-[10px] bevel-sunken px-2 py-0.2 bg-[#EDE8D6] uppercase text-ink/70">
                  [{selectedNode.category}]
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="win-btn hover:bg-primary"
                title="Close telemetry"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-ink/90 pt-1 leading-relaxed">
              <strong className="text-accent uppercase">WHAT I USE IT FOR:</strong> {selectedNode.usage}
            </p>

            <p className="text-xs text-ink/80">
              <strong className="text-primary uppercase">ACTIVE PROJECT:</strong> {selectedNode.project}
            </p>
          </div>
        )}
      </div>
    </OSWindow>
  );
}
