'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function PCBTrace() {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        if (path) {
          path.style.strokeDashoffset = `${length * (1 - self.progress)}`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden opacity-30"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 50,0 
             L 50,150 
             L 85,220 
             L 85,380 
             L 15,450 
             L 15,620 
             L 80,700 
             L 80,850 
             L 50,920 
             L 50,1000"
          fill="none"
          stroke="#B6FF00"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
