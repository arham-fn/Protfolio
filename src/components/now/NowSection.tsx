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
    tag: 'FLAGSHIP',
    role: 'Full-Stack Developer',
    entity: 'Tech Atlas 2026',
    description: 'Engineering personal tech-journey tracker to map progress, 12-week milestones, curriculum roadmaps, and software deployments.',
    status: 'ACTIVE'
  },
  {
    tag: 'PRODUCTION',
    role: 'Freelance AI-Integrated Builder',
    entity: 'Independent Practice',
    description: 'Architecting full-stack web and mobile applications with AI integration, deterministic state pipelines, and low-latency backends.',
    status: 'ACTIVE'
  },
  {
    tag: 'ACADEMICS',
    role: 'BS Computer Science',
    entity: 'GCUF (Faisalabad)',
    description: 'Core curriculum covering operating systems, computer architecture, systems programming, and algorithmic complexity.',
    status: 'IN PROGRESS'
  },
  {
    tag: 'HARDWARE',
    role: 'Hardware Diagnostics Specialist',
    entity: 'Workbench (Unpaid)',
    description: 'Diagnosing cold-boot and POST failures on laptops and PCs: DDR pin oxidation, +12V PSU drops, and powercfg standby overrides.',
    status: 'ACTIVE'
  }
];

export default function NowSection() {
  return (
    <section
      id="now"
      className="relative py-20 px-6 sm:px-12 lg:px-24 border-b border-light/5 font-mono"
    >
      {/* Headline + One Line Subhead Rule */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-pink text-xs uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-pink inline-block animate-ping" />
            LIVE TELEMETRY // CURRENT RUNTIME
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            WHAT I&apos;M DOING NOW
          </h2>
        </div>
        <p className="text-xs text-light/60 max-w-sm">
          Active ventures, production AI engineering roles, degree milestones, and automation tracks.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {NOW_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-jet border border-light/10 hover:border-chartreuse transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Tag & Status */}
            <div className="flex items-center justify-between mb-3 border-b border-light/10 pb-2.5">
              <span className="text-[10px] text-light/50 font-bold uppercase tracking-wider">
                [{item.tag}]
              </span>
              <span className="text-[10px] text-chartreuse font-bold flex items-center gap-1.5 px-2 py-0.5 border border-chartreuse/30 bg-chartreuse/5">
                <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse-dot" />
                {item.status}
              </span>
            </div>

            {/* Role & Entity */}
            <h3 className="font-display font-bold text-lg sm:text-xl text-light group-hover:text-chartreuse transition-colors mb-1">
              {item.role}
            </h3>
            <div className="text-xs text-pink font-semibold tracking-wide mb-2">
              @ {item.entity}
            </div>

            {/* Description */}
            <p className="text-xs text-light/70 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
