'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect capabilities
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let spacing = isCoarse ? 44 : 28;
    let cols = 0;
    let rows = 0;
    let count = 0;

    // Typed arrays for particle data: [baseX, baseY, curX, curY, vx, vy]
    let particles: Float32Array = new Float32Array(0);

    // Mouse coordinates (smoothed)
    let mouseX = -9999;
    let mouseY = -9999;
    let smoothX = -9999;
    let smoothY = -9999;
    let isMouseOver = false;

    // Tap ripples for touch
    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }> = [];

    // Frame timing for density adaptation (budget governor)
    const frameTimes: number[] = [];
    let lastFrame = performance.now();
    let densityHalved = false;

    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      count = cols * rows;

      particles = new Float32Array(count * 6);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 6;
          const x = c * spacing;
          const y = r * spacing;
          particles[idx] = x;     // baseX
          particles[idx + 1] = y; // baseY
          particles[idx + 2] = x; // curX
          particles[idx + 3] = y; // curY
          particles[idx + 4] = 0; // vx
          particles[idx + 5] = 0; // vy
        }
      }
    };

    initGrid();

    // Debounced resize
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        initGrid();
        if (isReduced) {
          drawStatic();
        }
      }, 150);
    };

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      if (isCoarse) return;
      isMouseOver = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (smoothX < -1000) {
        smoothX = mouseX;
        smoothY = mouseY;
      }
    };

    const handlePointerLeave = () => {
      isMouseOver = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    // Tap ripple for coarse touch screens
    const handleTouchStart = (e: TouchEvent) => {
      if (!isCoarse || e.touches.length === 0) return;
      const touch = e.touches[0];
      ripples.push({
        x: touch.clientX,
        y: touch.clientY,
        radius: 4,
        maxRadius: 180,
        alpha: 0.8,
      });
    };

    // Static draw for reduced motion
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(143, 136, 112, 0.25)';
      for (let i = 0; i < count; i++) {
        const idx = i * 6;
        ctx.beginPath();
        ctx.arc(particles[idx], particles[idx + 1], 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (isReduced) {
      drawStatic();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Animation Loop
    let animId = 0;
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        lastFrame = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now: number) => {
      if (isPaused) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Performance Budget Governor: check average frame time
      const delta = now - lastFrame;
      lastFrame = now;
      frameTimes.push(delta);
      if (frameTimes.length > 30) {
        frameTimes.shift();
        const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        if (avg > 20 && !densityHalved) {
          densityHalved = true;
          spacing = Math.floor(spacing * 1.5);
          initGrid();
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      if (isMouseOver) {
        smoothX += (mouseX - smoothX) * 0.15;
        smoothY += (mouseY - smoothY) * 0.15;
      } else {
        smoothX += (-9999 - smoothX) * 0.1;
        smoothY += (-9999 - smoothY) * 0.1;
      }

      const activeRadius = 160;
      const radiusSq = activeRadius * activeRadius;

      // Update tap ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 4;
        rip.alpha *= 0.94;
        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Bounding box for cursor influence to avoid full-screen iteration
      const minCol = isMouseOver
        ? Math.max(0, Math.floor((smoothX - activeRadius) / spacing))
        : 0;
      const maxCol = isMouseOver
        ? Math.min(cols - 1, Math.ceil((smoothX + activeRadius) / spacing))
        : -1;
      const minRow = isMouseOver
        ? Math.max(0, Math.floor((smoothY - activeRadius) / spacing))
        : 0;
      const maxRow = isMouseOver
        ? Math.min(rows - 1, Math.ceil((smoothY + activeRadius) / spacing))
        : -1;

      // Pass 1: physics & displacement
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 6;
          const bx = particles[idx];
          const by = particles[idx + 1];
          let cx = particles[idx + 2];
          let cy = particles[idx + 3];
          let vx = particles[idx + 4];
          let vy = particles[idx + 5];

          // Cursor push
          if (c >= minCol && c <= maxCol && r >= minRow && r <= maxRow) {
            const dx = cx - smoothX;
            const dy = cy - smoothY;
            const distSq = dx * dx + dy * dy;
            if (distSq < radiusSq && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / activeRadius) * 14;
              vx += (dx / dist) * force * 0.3;
              vy += (dy / dist) * force * 0.3;
            }
          }

          // Tap ripples for touch
          if (isCoarse && ripples.length > 0) {
            for (let k = 0; k < ripples.length; k++) {
              const rip = ripples[k];
              const dx = cx - rip.x;
              const dy = cy - rip.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (Math.abs(dist - rip.radius) < 24) {
                const force = rip.alpha * 6;
                vx += (dx / (dist || 1)) * force * 0.2;
                vy += (dy / (dist || 1)) * force * 0.2;
              }
            }
          }

          // Ambient idle drift for touch
          if (isCoarse) {
            vx += Math.sin(now * 0.0015 + r * 0.3 + c * 0.2) * 0.04;
            vy += Math.cos(now * 0.0015 + r * 0.2 + c * 0.3) * 0.04;
          }

          // Spring back to base position
          vx += (bx - cx) * 0.12;
          vy += (by - cy) * 0.12;
          vx *= 0.76; // Damping
          vy *= 0.76;

          cx += vx;
          cy += vy;

          particles[idx + 2] = cx;
          particles[idx + 3] = cy;
          particles[idx + 4] = vx;
          particles[idx + 5] = vy;
        }
      }

      // Pass 2: draw thin PCB traces in --accent between influenced neighbor dots
      if (isMouseOver && minCol <= maxCol) {
        ctx.lineWidth = 0.8;
        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            const idx = (r * cols + c) * 6;
            const cx = particles[idx + 2];
            const cy = particles[idx + 3];

            const dx = cx - smoothX;
            const dy = cy - smoothY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < activeRadius) {
              const alpha = (1 - dist / activeRadius) * 0.45;
              ctx.strokeStyle = `rgba(30, 63, 160, ${alpha.toFixed(3)})`;

              // Connect to right neighbor
              if (c + 1 < cols) {
                const rIdx = (r * cols + (c + 1)) * 6;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(particles[rIdx + 2], particles[rIdx + 3]);
                ctx.stroke();
              }

              // Connect to bottom neighbor
              if (r + 1 < rows) {
                const bIdx = ((r + 1) * cols + c) * 6;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(particles[bIdx + 2], particles[bIdx + 3]);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Pass 3: render dots
      for (let i = 0; i < count; i++) {
        const idx = i * 6;
        const cx = particles[idx + 2];
        const cy = particles[idx + 3];

        let color = 'rgba(143, 136, 112, 0.25)'; // --lo at 25%

        if (isMouseOver) {
          const dx = cx - smoothX;
          const dy = cy - smoothY;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const t = 1 - Math.sqrt(distSq) / activeRadius;
            // Tint toward --primary (#F2541B / 242, 84, 27)
            const r = Math.round(143 + (242 - 143) * t);
            const g = Math.round(136 + (84 - 136) * t);
            const b = Math.round(112 + (27 - 112) * t);
            const a = 0.25 + t * 0.65;
            color = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
          }
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      if (resizeTimer) clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 block"
    />
  );
}
