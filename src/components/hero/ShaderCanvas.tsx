'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface ShaderCanvasProps {
  className?: string;
}

const vertexShader = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simplex-style noise approximation
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 mouseNorm = uMouse / uResolution.xy;
    float distToMouse = distance(st, mouseNorm);

    // Multi-octave field
    float n = snoise(st * 2.2 + vec2(uTime * 0.06, uTime * 0.04));
    n += 0.5 * snoise(st * 4.5 - vec2(uTime * 0.08, uTime * 0.02));
    
    // Mouse warp field
    n += 0.25 * smoothstep(0.6, 0.0, distToMouse);

    // Strict palette: Jet (#0A0A0A), Hot Pink (#FF1F8E), Chartreuse (#B6FF00)
    vec3 jet = vec3(0.039, 0.039, 0.039);
    vec3 pink = vec3(1.0, 0.121, 0.556);
    vec3 chartreuse = vec3(0.713, 1.0, 0.0);

    // Dynamic tone mapping
    vec3 col = jet;
    float pinkMask = smoothstep(0.2, 0.7, n);
    float chartMask = smoothstep(0.65, 0.95, n);

    col = mix(col, pink * 0.35, pinkMask);
    col = mix(col, chartreuse * 0.45, chartMask);

    // Ambient radial vignette to blend cleanly into jet black
    float vignette = 1.0 - smoothstep(0.2, 1.2, length(vUv - 0.5) * 1.5);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderCanvas({ className = '' }: ShaderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion or small screens
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 1.5),
        alpha: true,
        powerPreference: 'low-power'
      });
    } catch {
      return; // WebGL not available
    }

    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [gl.canvas.width, gl.canvas.height] },
      uMouse: { value: [gl.canvas.width * 0.5, gl.canvas.height * 0.5] }
    };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [width * renderer.dpr, height * renderer.dpr];
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) * renderer.dpr;
      const y = (rect.height - (e.clientY - rect.top)) * renderer.dpr;
      uniforms.uMouse.value = [x, y];
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Render loop throttled to 30fps cap
    let animId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30fps
    let isVisible = true;

    // Intersection observer pauses render when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const update = (time: number) => {
      animId = requestAnimationFrame(update);
      if (!isVisible) return;

      const elapsed = time - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = time - (elapsed % fpsInterval);
        uniforms.uTime.value = time * 0.001;
        renderer.render({ scene: mesh });
      }
    };
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (gl.canvas && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Mobile/Low-Power Static Fallback */}
      <div className="md:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,31,142,0.18),_rgba(182,255,0,0.08),_transparent_70%)]" />
    </div>
  );
}
