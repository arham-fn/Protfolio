import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#D8D2BE',
        surface: '#C7BFA6',
        primary: '#F2541B',
        accent: '#1E3FA0',
        ink: '#1A1814',
        hi: '#EFEADB',
        lo: '#8F8870',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'bevel-raised': 'inset 2px 2px 0px #EFEADB, inset -2px -2px 0px #8F8870',
        'bevel-sunken': 'inset 2px 2px 0px #8F8870, inset -2px -2px 0px #EFEADB',
        'window': '3px 3px 0px rgba(26, 24, 20, 0.45)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;

