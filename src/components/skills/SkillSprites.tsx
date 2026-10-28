import React from 'react';

export default function SkillSprites() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="hidden" aria-hidden="true">
      <defs>
        {/* HTML5 */}
        <symbol id="icon-html" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3l1.5 15L12 21l6.5-3L20 3H4z" />
          <path d="M7 7h10M7 11h9.5L16 15.5 12 17l-4-1.5-.3-3" />
        </symbol>

        {/* CSS3 */}
        <symbol id="icon-css" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3l1.5 15L12 21l6.5-3L20 3H4z" />
          <path d="M16.5 7.5H7.5l.4 4.5h8.2l-.7 5-3.4 1-3.4-1-.2-2.5" />
        </symbol>

        {/* JavaScript */}
        <symbol id="icon-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 11v6a2 2 0 0 1-2 2H6" />
          <path d="M14 17c1.5 1 3 1 3-1 0-2-3-2-3-4 0-1.5 1-2 3-2" />
        </symbol>

        {/* TypeScript */}
        <symbol id="icon-ts" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 8h6M10 8v9" />
          <path d="M14 16c1.5 1 3 1 3-1 0-2-3-2-3-4 0-1.5 1-2 3-2" />
        </symbol>

        {/* React */}
        <symbol id="icon-react" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </symbol>

        {/* Next.js */}
        <symbol id="icon-next" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 8v8l8-9.5V16" />
        </symbol>

        {/* Tailwind CSS */}
        <symbol id="icon-tailwind" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 12c1-2 3-3 6-3 4 0 5 3 7 3s3-1 4-3c-1 2-3 3-6 3-4 0-5-3-7-3s-3 1-4 3z" />
          <path d="M3 16c1-2 3-3 6-3 4 0 5 3 7 3s3-1 4-3c-1 2-3 3-6 3-4 0-5-3-7-3s-3 1-4 3z" />
        </symbol>

        {/* React Native */}
        <symbol id="icon-react-native" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
          <ellipse cx="12" cy="10" rx="4" ry="1.5" />
          <ellipse cx="12" cy="10" rx="4" ry="1.5" transform="rotate(60 12 10)" />
          <ellipse cx="12" cy="10" rx="4" ry="1.5" transform="rotate(120 12 10)" />
        </symbol>

        {/* Node.js */}
        <symbol id="icon-node" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
          <path d="M12 12l9-5M12 12v10M12 12L3 7" />
        </symbol>

        {/* Express */}
        <symbol id="icon-express" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 8h10M7 12h7M7 16h9" />
          <circle cx="16" cy="16" r="1" fill="currentColor" />
        </symbol>

        {/* Supabase */}
        <symbol id="icon-supabase" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M13 2L3 14h8l-2 8 12-13h-8l2-7z" />
        </symbol>

        {/* Python */}
        <symbol id="icon-python" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3c-4 0-5 1-5 3v2h6v1H6c-2 0-3 1-3 4s1 4 3 4h1v-2c0-2 1-3 3-3h4v-1h-2V6c0-2-1-3-3-3z" />
          <path d="M12 21c4 0 5-1 5-3v-2h-6v-1h7c2 0 3-1 3-4s-1-4-3-4h-1v2c0 2-1 3-3 3h-4v1h2v2c0 2 1 3 3 3z" />
          <circle cx="9" cy="5.5" r=".7" fill="currentColor" />
          <circle cx="15" cy="18.5" r=".7" fill="currentColor" />
        </symbol>

        {/* C++ */}
        <symbol id="icon-cpp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="8" cy="12" r="5" />
          <path d="M14 12h4M16 10v4M18 12h4M20 10v4" />
        </symbol>

        {/* Custom Glyph: Assembly (CPU die with opcode texture) */}
        <symbol id="icon-assembly" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="5" width="14" height="14" rx="1" />
          {/* CPU pins */}
          <path d="M9 2v3M12 2v3M15 2v3" />
          <path d="M9 19v3M12 19v3M15 19v3" />
          <path d="M2 9h3M2 12h3M2 15h3" />
          <path d="M19 9h3M19 12h3M19 15h3" />
          {/* Opcode die lines */}
          <path d="M9 9h6M9 12h4M9 15h5" strokeDasharray="1 1" />
        </symbol>

        {/* Custom Glyph: Operating Systems (Kernel / Terminal window mark) */}
        <symbol id="icon-os" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <circle cx="6" cy="6.5" r=".75" fill="currentColor" />
          <circle cx="9" cy="6.5" r=".75" fill="currentColor" />
          {/* Shell prompt prompt symbol */}
          <path d="M6 13l2.5 2L6 17" />
          <path d="M11 17h4" />
        </symbol>

        {/* OpenAI / Claude API */}
        <symbol id="icon-ai-api" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1 3 3.8 4 4 0 0 1-1.8 3.5 4 4 0 0 1 1.8 3.5 4 4 0 0 1-4 3.8v1a4 4 0 0 1-7.8 1.2 4 4 0 0 1-3.2-3 4 4 0 0 1 1-5 4 4 0 0 1-1-5 4 4 0 0 1 3.2-3A4 4 0 0 1 12 2z" />
          <circle cx="12" cy="12" r="2" />
        </symbol>

        {/* OpenCV */}
        <symbol id="icon-opencv" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="7" r="3.5" />
          <circle cx="7" cy="16" r="3.5" />
          <circle cx="17" cy="16" r="3.5" />
          <path d="M12 10.5v2.5M9.5 14.5l2-1.5M14.5 14.5l-2-1.5" />
        </symbol>

        {/* MediaPipe */}
        <symbol id="icon-mediapipe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8 12 2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </symbol>
      </defs>
    </svg>
  );
}
