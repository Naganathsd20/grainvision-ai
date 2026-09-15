/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grain: {
          50: '#fbf8f1',
          100: '#f5eee0',
          200: '#ead9be',
          300: '#ddbd94',
          400: '#d19e69',
          500: '#c58247',
          600: '#b76c3c',
          700: '#985233',
          800: '#7a422e',
          900: '#643828',
          950: '#361b13',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        slate: {
          850: '#131c2e',
          900: '#0f172a',
          950: '#080d1a',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
