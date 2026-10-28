'use client';

export interface NowItem {
  tag: string;
  role: string;
  entity: string;
  description: string;
  status: 'ACTIVE' | 'IN PROGRESS' | 'ENROLLED' | 'SCALING';
}

export const NOW_ITEMS: NowItem[] = [
  {
    tag: 'VENTURE',
    role: 'Co-Founder',
    entity: 'National Tech Forge',
    description: 'Forging high-impact tech infrastructure, hardware-software integration, and scalable digital systems for builders and enterprises.',
    status: 'SCALING'
  },
  {
    tag: 'PRODUCTION',
    role: 'AI Automation Developer',
    entity: 'Invitrex',
    description: 'Architecting intelligent autonomous agents, multi-step LLM pipelines, and automated business workflows to replace manual operational friction.',
    status: 'ACTIVE'
  },
  {
    tag: 'ACADEMICS',
    role: 'BS Computer Science (5th Semester)',
    entity: 'Government College University Faisalabad (GCUF)',
    description: 'Diving deep into operating systems, computer architecture, automata theory, database design, and algorithmic performance.',
    status: 'IN PROGRESS'
  },
  {
    tag: 'UPSKILLING',
    role: 'Google Automation Certifications',
    entity: 'Google & Professional Track',
    description: 'Mastering cloud-native workflow automations, enterprise API bridges, Python system scripting, and predictive trigger services.',
    status: 'ENROLLED'
  }
];

export default function NowSection() {
  return (
    <section
      id="now"
      className="relative py-20 px-6 sm:px-12 lg:px-24 border-b border-light/5 font-mono"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="text-pink text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-pink inline-block animate-ping" />
            LIVE TELEMETRY // CURRENT RUNTIME // ACTIVE CYCLES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            WHAT I&apos;M DOING NOW
          </h2>
        </div>
        <div className="text-xs text-light/50 max-w-sm">
          Real-time snapshot of active ventures, production engineering roles, degree progression, and active study.
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NOW_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-jet border border-light/10 hover:border-chartreuse transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Tag & Status */}
            <div className="flex items-center justify-between mb-4 border-b border-light/10 pb-3">
              <span className="text-[10px] text-light/50 font-bold uppercase tracking-wider">
                [{item.tag}]
              </span>
              <span className="text-[10px] text-chartreuse font-bold flex items-center gap-1.5 px-2 py-0.5 border border-chartreuse/30 bg-chartreuse/5">
                <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse-dot" />
                {item.status}
              </span>
            </div>

            {/* Role & Entity */}
            <h3 className="font-display font-bold text-xl text-light group-hover:text-chartreuse transition-colors mb-1">
              {item.role}
            </h3>
            <div className="text-xs text-pink font-semibold tracking-wide mb-3">
              @ {item.entity}
            </div>

            {/* Description */}
            <p className="text-xs text-light/70 leading-relaxed">
              {item.description}
            </p>

            {/* Bottom Accent Line */}
            <div className="mt-4 pt-3 border-t border-light/10 flex items-center justify-between text-[10px] text-light/40">
              <span>FREQUENCY: CONTINUOUS</span>
              <span className="text-chartreuse font-mono">2026 CYCLE</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
