import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        jet: '#0A0A0A',
        pink: {
          DEFAULT: '#FF1F8E',
        },
        chartreuse: {
          DEFAULT: '#B6FF00',
        },
        light: '#F2F2F2',
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.7', filter: 'brightness(1.3)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
