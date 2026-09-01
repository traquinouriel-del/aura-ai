/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '.theme-dark'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#252533',
          500: '#34343f',
        },
        aura: {
          // Elegant slate/zinc accent system
          slate: '#94a3b8',
          zinc: '#a1a1aa',
          steel: '#71717a',
          silver: '#cbd5e1',
        },
      },
      backgroundImage: {
        'aura-gradient': 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #475569 100%)',
        'aura-radial': 'radial-gradient(circle at 20% 20%, rgba(148,163,184,0.12), transparent 45%), radial-gradient(circle at 80% 0%, rgba(161,161,170,0.10), transparent 40%), radial-gradient(circle at 50% 100%, rgba(71,85,105,0.12), transparent 50%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-8px) scale(0.97)' },
        },
        'fade-out-backdrop': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 12px 0 rgba(148,163,184,0.25)' },
          '50%': { boxShadow: '0 0 24px 4px rgba(148,163,184,0.4)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-out': 'fade-out 0.25s ease-in forwards',
        'fade-out-backdrop': 'fade-out-backdrop 0.25s ease-in forwards',
        'pulse-soft': 'pulse-soft 1.8s ease-in-out infinite',
        'spin-slow': 'spin-slow 1.2s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
