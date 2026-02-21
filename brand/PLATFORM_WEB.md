# FourFlow Web Implementation Guide

*React/Vite + TailwindCSS specifications*

---

## Tailwind Configuration

```javascript
// tailwind.config.js

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // We control dark mode, not system
  theme: {
    extend: {
      colors: {
        // The Four Pillars
        self: {
          DEFAULT: '#FF6F61',
          dark: '#E64A45',
          muted: 'rgba(255, 111, 97, 0.15)',
        },
        space: {
          DEFAULT: '#6BA292',
          dark: '#517D63',
          muted: 'rgba(107, 162, 146, 0.15)',
        },
        story: {
          DEFAULT: '#5B84B1',
          dark: '#3B4F71',
          muted: 'rgba(91, 132, 177, 0.15)',
        },
        spirit: {
          DEFAULT: '#7A4DA4',
          dark: '#5E3570',
          muted: 'rgba(122, 77, 164, 0.15)',
        },

        // Grounds
        void: '#050505',
        canvas: '#0a0a0a',
        lift: '#111111',
        surface: '#1a1a1a',

        // Light mode (secondary)
        ivory: '#F5F5F5',
        charcoal: '#333333',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        'hero': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['4rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['2rem', { lineHeight: '1.3' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },

      boxShadow: {
        'subtle': '0 1px 2px rgba(0,0,0,0.3)',
        'lift': '0 4px 6px rgba(0,0,0,0.2)',
        'elevated': '0 10px 15px rgba(0,0,0,0.15)',
        'glow-spirit': '0 0 30px rgba(122, 77, 164, 0.15)',
        'glow-self': '0 0 30px rgba(255, 111, 97, 0.15)',
      },

      animation: {
        'breathe': 'breathe 7s ease-in-out infinite',
        'breathe-slow': 'breathe 12s ease-in-out infinite',
        'float': 'float 25s ease-in-out infinite',
        'spin-slow': 'spin 45s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },

      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-10px) translateX(5px)' },
          '50%': { transform: 'translateY(-5px) translateX(-5px)' },
          '75%': { transform: 'translateY(-15px) translateX(3px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },

      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
        'breath': '7000ms',
      },

      backgroundImage: {
        'gradient-pillars': 'linear-gradient(90deg, #FF6F61, #6BA292, #5B84B1, #7A4DA4)',
        'gradient-journey': 'linear-gradient(135deg, #FF6F61, #7A4DA4)',
        'gradient-radial-spirit': 'radial-gradient(circle, rgba(122, 77, 164, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
```

---

## CSS Custom Properties

```css
/* src/index.css */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Colors */
  --color-self: #FF6F61;
  --color-space: #6BA292;
  --color-story: #5B84B1;
  --color-spirit: #7A4DA4;

  --color-void: #050505;
  --color-canvas: #0a0a0a;
  --color-lift: #111111;
  --color-surface: #1a1a1a;

  /* Timing */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --duration-breath: 7000ms;

  /* Easing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Spacing */
  --space-unit: 8px;
}

/* Base styles */
html {
  background-color: var(--color-canvas);
  color: rgba(255, 255, 255, 0.9);
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus states */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-spirit);
}

/* Selection */
::selection {
  background-color: var(--color-spirit);
  color: white;
}
```

---

## Component Patterns

### Button Component

```jsx
// src/components/Button.jsx

const variants = {
  primary: `
    bg-gradient-to-r from-self to-spirit
    text-white font-semibold
    hover:brightness-110 hover:scale-[1.02]
    active:scale-[0.98]
    transition-all duration-base
  `,
  secondary: `
    bg-transparent
    border border-white/20
    text-white/80
    hover:bg-white/5 hover:border-white/30 hover:text-white
    transition-all duration-base
  `,
  ghost: `
    bg-transparent
    text-white/60
    hover:text-white hover:bg-white/5
    transition-all duration-base
  `,
};

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`
        px-6 py-3 rounded-lg
        font-medium text-base
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Card Component

```jsx
// src/components/Card.jsx

export function Card({
  children,
  className = '',
  hoverable = true,
  ...props
}) {
  return (
    <div
      className={`
        bg-white/[0.03]
        border border-white/[0.08]
        rounded-xl p-6
        ${hoverable ? `
          hover:bg-white/[0.06]
          hover:border-white/[0.12]
          transition-all duration-base
        ` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Input Component

```jsx
// src/components/Input.jsx

import { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  pillar = 'spirit', // which pillar color on focus
  className = '',
  ...props
}, ref) => {
  const focusColors = {
    self: 'focus:border-self focus:ring-self/20',
    space: 'focus:border-space focus:ring-space/20',
    story: 'focus:border-story focus:ring-story/20',
    spirit: 'focus:border-spirit focus:ring-spirit/20',
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-white/60">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-3
          bg-white/[0.03]
          border border-white/10
          rounded-lg
          text-white placeholder:text-white/30
          focus:outline-none focus:ring-2
          transition-all duration-base
          ${focusColors[pillar]}
          ${error ? 'border-self' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-self">{error}</p>
      )}
    </div>
  );
});
```

### Breathing Animation Component

```jsx
// src/components/Breathing.jsx

export function Breathing({
  size = 100,
  color = 'spirit',
  speed = 'normal', // 'normal' | 'slow' | 'focus'
  className = '',
}) {
  const colors = {
    self: '#FF6F61',
    space: '#6BA292',
    story: '#5B84B1',
    spirit: '#7A4DA4',
    white: 'rgba(255,255,255,0.3)',
  };

  const speeds = {
    normal: 'animate-breathe',
    slow: 'animate-breathe-slow',
    focus: 'animate-[breathe_15s_ease-in-out_infinite]',
  };

  return (
    <div
      className={`rounded-full ${speeds[speed]} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]}40 0%, transparent 70%)`,
      }}
    />
  );
}
```

---

## Page Layout Patterns

### Standard Page

```jsx
export function StandardPage({ children }) {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial-spirit opacity-50 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

### Focus Mode Page

```jsx
export function FocusPage({ children }) {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      {/* Minimal ambient */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <Breathing size={400} color="white" speed="focus" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center">
        {children}
      </div>
    </div>
  );
}
```

---

## Navigation Patterns

### Desktop Navigation

```jsx
export function DesktopNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo className="h-8" />

        <div className="flex items-center gap-8">
          <NavLink href="/flow">Flow</NavLink>
          <NavLink href="/stats">Stats</NavLink>
          <NavLink href="/setup">Setup</NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  const isActive = /* determine from router */;

  return (
    <a
      href={href}
      className={`
        text-sm font-medium transition-colors duration-base
        ${isActive
          ? 'text-white'
          : 'text-white/50 hover:text-white/80'
        }
      `}
    >
      {children}
    </a>
  );
}
```

### Mobile Bottom Navigation

```jsx
export function MobileNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-canvas/80 backdrop-blur-lg border-t border-white/5">
      <div className="flex justify-around py-2">
        <MobileNavItem icon={FlowIcon} label="Flow" href="/flow" />
        <MobileNavItem icon={StatsIcon} label="Stats" href="/stats" />
        <MobileNavItem icon={SetupIcon} label="Setup" href="/setup" />
      </div>
    </nav>
  );
}

function MobileNavItem({ icon: Icon, label, href }) {
  const isActive = /* determine from router */;

  return (
    <a
      href={href}
      className={`
        flex flex-col items-center gap-1 px-6 py-2 rounded-xl
        transition-all duration-base
        ${isActive
          ? 'bg-gradient-journey text-white'
          : 'text-white/40'
        }
      `}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs">{label}</span>
    </a>
  );
}
```

---

## Animation Utilities

```jsx
// src/utils/motion.js

// For use with framer-motion or CSS

export const transitions = {
  fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  base: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  spring: { type: 'spring', damping: 20, stiffness: 300 },
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.base,
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: transitions.base,
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: transitions.spring,
  },
};
```

---

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible (our `focus-visible` ring)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] `prefers-reduced-motion` is respected
- [ ] Screen reader labels on icon-only buttons
- [ ] Semantic HTML structure
- [ ] Skip-to-content link on all pages
- [ ] Form inputs have associated labels
- [ ] Error states are announced to screen readers

---

*Build with intention. Every pixel serves the frequency.*
