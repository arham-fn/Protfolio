'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '@/types';
import { gsap } from '@/lib/gsap';

interface CaseStudyProps {
  project: Project;
  onClose: () => void;
}

export default function CaseStudy({ project, onClose }: CaseStudyProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }, modalRef);
    return () => ctx.revert();
  }, []);

  const handleAnimatedClose = () => {
    if (!modalRef.current) {
      onClose();
      return;
    }
    gsap.to(modalRef.current, {
      scale: 0.94,
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bevel-raised bg-surface font-mono text-ink shadow-window flex flex-col"
      >
        {/* OS Window Titlebar */}
        <div className="window-titlebar shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span>💾</span>
            <span className="truncate">
              A:\PROJECTS\{project.id.toUpperCase()}.EXE
            </span>
          </div>
          <button
            type="button"
            onClick={handleAnimatedClose}
            aria-label="Close Case Study"
            className="win-btn hover:bg-primary hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          {/* Header Banner */}
          <div className="border-b border-lo pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="bevel-sunken px-2 py-0.5 text-[10px] bg-[#EDE8D6] font-bold text-accent">
                STATUS: {project.status}
              </span>
              <span className="text-[11px] text-ink/70">
                DRIVE SECTOR: CYLINDER 0 / HEAD 1
              </span>
            </div>

            <h2 id="case-study-title" className="font-display font-black text-2xl sm:text-4xl text-accent mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-ink/90 italic">
              &quot;{project.tagline}&quot;
            </p>
          </div>

          {/* Stack Chips */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold text-ink/70 self-center pr-1 uppercase">
              STACK:
            </span>
            {project.stack.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bevel-sunken bg-[#EDE8D6] text-xs font-semibold text-ink"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Interactive Iframe or Click-to-load for Flagship */}
          {project.isFlagship && project.liveUrl && (
            <div className="p-4 bevel-sunken bg-[#EDE8D6] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-accent">
                <span>SANDBOX ENGINE PREVIEW: {project.liveUrl}</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bevel-btn text-[11px] px-2 py-1 gap-1"
                >
                  OPEN IN NEW BROWSER TAB ↗
                </a>
              </div>

              {!iframeLoaded ? (
                <div className="aspect-video w-full bevel-sunken bg-[#D5CEB8] flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <span className="text-xs font-bold text-accent">
                    CLICK TO INITIALIZE LIVE SANDBOX IFRAME
                  </span>
                  <button
                    type="button"
                    onClick={() => setIframeLoaded(true)}
                    className="bevel-btn bevel-btn-primary px-4 py-2 font-bold text-xs"
                  >
                    INITIALIZE LIVE DEMO
                  </button>
                  <span className="text-[10px] text-ink/70">
                    Loads personal-tech-journey-tracker.vercel.app dynamically with zero upfront layout shift.
                  </span>
                </div>
              ) : (
                <div className="aspect-video w-full bevel-sunken bg-white border border-lo">
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

          {/* Problem & Outcome Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.problem && (
              <div className="p-4 bevel-sunken bg-[#EDE8D6]">
                <span className="font-bold text-accent block uppercase text-[11px] tracking-wider mb-2">
                  01 // PROBLEM STATEMENT
                </span>
                <p className="text-ink/90 leading-relaxed">{project.problem}</p>
              </div>
            )}

            {project.result && (
              <div className="p-4 bevel-sunken bg-[#EDE8D6]">
                <span className="font-bold text-accent block uppercase text-[11px] tracking-wider mb-2">
                  02 // ENGINEERING OUTCOME
                </span>
                <p className="text-ink/90 leading-relaxed">{project.result}</p>
              </div>
            )}
          </div>

          {/* Architecture Features */}
          {project.features && project.features.length > 0 && (
            <div className="p-4 bevel-sunken bg-[#EDE8D6]">
              <span className="font-bold text-accent block uppercase text-[11px] tracking-wider mb-3">
                SYSTEM ARCHITECTURE &amp; ATTRIBUTES:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="p-2 bevel-raised bg-surface flex items-start gap-2"
                  >
                    <span className="text-accent font-bold">▶</span>
                    <span className="text-ink/90">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Navigation Bar */}
          <div className="pt-4 border-t border-lo flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bevel-btn bevel-btn-primary px-3 py-1.5 font-bold text-xs"
                >
                  VISIT LIVE SYSTEM ↗
                </a>
              )}
              {project.githubUrl && (
                <span className="text-[11px] bevel-sunken px-2.5 py-1 bg-[#EDE8D6] text-ink/70">
                  CODE: {project.githubUrl}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAnimatedClose}
              className="bevel-btn px-4 py-1.5 text-xs font-bold"
            >
              [EJECT DISK / CLOSE]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
