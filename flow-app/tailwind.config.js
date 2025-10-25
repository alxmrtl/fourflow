/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FourFlow Brand Colors
        'self': {
          DEFAULT: '#FF6F61',
          dark: '#E64A45',
        },
        'space': {
          DEFAULT: '#6BA292',
          dark: '#517D63',
        },
        'story': {
          DEFAULT: '#5B84B1',
          dark: '#3B4F71',
        },
        'spirit': {
          DEFAULT: '#7A4DA4',
          dark: '#5E3570',
        },
        'charcoal': '#333333',
        'ivory': '#F5F5F5',
        'amber-struggle': '#E8A87C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'settle': 'settle 2.5s ease-out',
        'ripple': 'ripple 0.6s ease-out',
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flow-line': 'flowLine 1.5s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        settle: {
          '0%': { opacity: '1', filter: 'saturate(1.5)' },
          '100%': { opacity: '1', filter: 'saturate(0.7)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 111, 97, 0.3), 0 0 40px rgba(255, 111, 97, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 111, 97, 0.5), 0 0 60px rgba(255, 111, 97, 0.2)',
          },
        },
        flowLine: {
          '0%': {
            strokeDashoffset: '0',
            opacity: '0.4',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            strokeDashoffset: '12',
            opacity: '0.4',
          },
        },
        gradientFlow: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
