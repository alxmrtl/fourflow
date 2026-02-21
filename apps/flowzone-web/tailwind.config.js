/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FourFlow Brand Colors - The Four Pillars
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
        // Neutrals - Dark Mode First
        'dark': '#0a0a0a',
        'darker': '#050505',
        'charcoal': '#333333',
        'ivory': '#F5F5F5',
        'amber-struggle': '#E8A87C',
        // Glass surfaces
        'glass': 'rgba(255, 255, 255, 0.03)',
        'glass-light': 'rgba(255, 255, 255, 0.06)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'glass-border-light': 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      letterSpacing: {
        'tight-brand': '-0.02em',
      },
      lineHeight: {
        'relaxed-brand': '1.6',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'settle': 'settle 2.5s ease-out',
        'ripple': 'ripple 0.6s ease-out',
        // Zen-paced animations (brand timing)
        'breathe': 'breathe 7s ease-in-out infinite',
        'breathe-zen': 'breatheZen 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 6s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 25s ease infinite',
        'spin-slow': 'spin 30s linear infinite',
        'float': 'floatAmbient 24s ease-in-out infinite',
        'float-delayed': 'floatAmbient 24s ease-in-out 8s infinite',
        'glow-pulse': 'glowPulse 8s ease-in-out infinite',
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
        // Zen breathing - scale + opacity
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        breatheZen: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Floating ambient orb movement
        floatAmbient: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, -15px) scale(1.02)' },
          '50%': { transform: 'translate(-5px, 10px) scale(0.98)' },
          '75%': { transform: 'translate(-10px, -5px) scale(1.01)' },
        },
        // Glow pulse for ambient effects
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      backgroundImage: {
        // Brand gradients
        'gradient-journey': 'linear-gradient(135deg, #FF6F61, #7A4DA4)',
        'gradient-pillars': 'linear-gradient(90deg, #FF6F61, #6BA292, #5B84B1, #7A4DA4)',
        'gradient-pillars-soft': 'linear-gradient(90deg, rgba(255,111,97,0.8), rgba(107,162,146,0.8), rgba(91,132,177,0.8), rgba(122,77,164,0.8))',
        // Ambient glows
        'glow-spirit': 'radial-gradient(circle, rgba(122, 77, 164, 0.15) 0%, transparent 70%)',
        'glow-self': 'radial-gradient(circle, rgba(255, 111, 97, 0.12) 0%, transparent 70%)',
        'glow-space': 'radial-gradient(circle, rgba(107, 162, 146, 0.12) 0%, transparent 70%)',
        'glow-story': 'radial-gradient(circle, rgba(91, 132, 177, 0.12) 0%, transparent 70%)',
        // Observatory background
        'observatory': `
          radial-gradient(ellipse at 50% 0%, rgba(122, 77, 164, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(255, 111, 97, 0.06) 0%, transparent 40%),
          radial-gradient(ellipse at 20% 50%, rgba(91, 132, 177, 0.04) 0%, transparent 40%),
          radial-gradient(ellipse at 80% 50%, rgba(107, 162, 146, 0.04) 0%, transparent 40%)
        `,
      },
    },
  },
  plugins: [],
}
