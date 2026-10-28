'use client';

import { useState } from 'react';
import type { Project } from '@/types';

interface CaseStudyProps {
  project: Project;
  onClose: () => void;
}

export default function CaseStudy({ project, onClose }: CaseStudyProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-jet/90 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-jet border-2 border-chartreuse p-6 sm:p-8 font-mono text-light shadow-[0_0_30px_rgba(182,255,0,0.25)]">
        {/* Top Bar / Close */}
        <div className="flex items-center justify-between border-b border-chartreuse/30 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-chartreuse">
            <span className="w-2 h-2 bg-chartreuse animate-pulse-dot" />
            <span>CARTRIDGE DATA REPO // {project.id.toUpperCase()}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border border-pink text-pink text-xs font-bold hover:bg-pink hover:text-white transition-colors"
          >
            [ESC / EJECT]
          </button>
        </div>

        {/* Title & Tagline */}
        <h2 id="case-study-title" className="font-display font-black text-2xl sm:text-4xl text-light mb-2">
          {project.title}
        </h2>
        <p className="text-pink text-sm sm:text-base font-semibold mb-6">
          &quot;{project.tagline}&quot;
        </p>

        {/* Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((item, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 border border-light/20 bg-white/5 text-xs text-chartreuse font-mono"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Interactive Iframe or Click-to-load for Flagship */}
        {project.isFlagship && project.liveUrl && (
          <div className="mb-8 border border-chartreuse/40 bg-black/60 p-4">
            <div className="flex items-center justify-between mb-3 text-xs text-light/60">
              <span>SANDBOX ENGINE PREVIEW: {project.liveUrl}</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-pink hover:underline"
              >
                OPEN EXTERNAL ↗
              </a>
            </div>

            {!iframeLoaded ? (
              <div className="aspect-video bg-jet/90 border border-light/10 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <span className="text-xs text-chartreuse">CLICK-TO-LOAD LIVE IFRAME</span>
                <button
                  type="button"
                  onClick={() => setIframeLoaded(true)}
                  className="px-4 py-2 bg-chartreuse text-jet font-bold text-xs uppercase hover:bg-white transition-all shadow-[0_0_12px_#B6FF00]"
                >
                  INITIALIZE LIVE DEMO
                </button>
                <span className="text-[10px] text-light/40">
                  Loads personal-tech-journey-tracker.vercel.app dynamically
                </span>
              </div>
            ) : (
              <div className="aspect-video w-full border border-light/20 bg-black">
                <iframe
                  src={project.liveUrl}
                  title="Tech Atlas Live Preview"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            )}
          </div>
        )}

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs sm:text-sm">
          {project.problem && (
            <div className="p-4 border border-light/10 bg-white/[0.02]">
              <span className="text-pink font-bold block uppercase tracking-wider mb-2">
                01 // PROBLEM STATEMENT
              </span>
              <p className="text-light/80 leading-relaxed">{project.problem}</p>
            </div>
          )}

          {project.result && (
            <div className="p-4 border border-chartreuse/20 bg-chartreuse/[0.02]">
              <span className="text-chartreuse font-bold block uppercase tracking-wider mb-2">
                02 // WHAT I BUILT & RESULT
              </span>
              <p className="text-light/80 leading-relaxed">{project.result}</p>
            </div>
          )}
        </div>

        {/* Feature Rundown */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <span className="text-chartreuse font-bold block uppercase tracking-wider mb-3 text-xs">
              SYSTEM ARCHITECTURE & FEATURES:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="p-2 border border-light/10 flex items-start gap-2 bg-white/[0.02]"
                >
                  <span className="text-pink">▶</span>
                  <span className="text-light/90">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links Footer */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-light/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-chartreuse text-jet font-bold text-xs uppercase hover:bg-white transition-colors"
            >
              LAUNCH LIVE INSTANCE ↗
            </a>
          )}
          {project.githubUrl && (
            <span className="text-xs font-mono text-light/50 border border-light/20 px-3 py-2">
              CODE: {project.githubUrl}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
