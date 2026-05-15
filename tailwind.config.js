/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    { pattern: /(bg|text|border|from|to|via)-cyber-(cyan|blue|purple|pink|red|green|yellow)(\/.+)?/ },
    { pattern: /glow-(cyan|purple|red|green|yellow)/ },
    { pattern: /status-dot/ },
    { pattern: /(green|yellow|red|gray)/ },
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#040814',
          dark: '#070d1c',
          panel: '#0b1426',
          border: '#1a2845',
          cyan: '#00f0ff',
          blue: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
          red: '#ff2d55',
          green: '#00ff9d',
          yellow: '#ffd60a',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'border-flow': 'borderFlow 4s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'beam': 'beam 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0,240,255,0.3), 0 0 20px rgba(0,240,255,0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0,240,255,0.7), 0 0 45px rgba(0,240,255,0.4)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
        borderFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        beam: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(rgba(0,240,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
