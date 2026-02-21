# FlowZone Web - APP.md

**Status**: Active development | Last updated: 2026-02-17

---

## What It Is

A cross-platform Progressive Web App (PWA) that trains focus through the Four Pillars framework. Core mechanic: **Focus Reps** — pressing a button each time you resist distraction, making the invisible work of focus visible and measurable.

---

## Role in the FourFlow Ecosystem

**Tier 1 — ARK Integration Hub** (Primary)

This is the primary digital surface for FourFlow. It already has the four-pillar setup (values, goals, environment, focus session) which is the natural foundation for the Flow Profile assessment. As the ARK evolves, this is where the digital layer lives — the self-serve Flow Profile, eventual FourFlow Agent interface, and longitudinal alignment tracking.

---

## Current State

- Four-pillar onboarding: Spirit (values), Story (goals), Space (timer/environment), Self (focus)
- Focus timer with 25/50/90 min presets
- Focus Reps tracking (button press = rep when resisting distraction)
- Struggle Phase support: ambient encouragement in first 25% of session
- Contrast UI: vibrant nav mode → minimalist focus mode transition
- Breathwork integration
- Stats and session history
- Local-first data (IndexedDB), no account required
- PWA: installable, offline-capable

---

## ARK Integration (Future)

- **Flow Profile Assessment**: Add 12-key diagnostic layer on top of existing pillar setup
- **FourFlow Agent Interface**: Conversation layer that reads session data and surfaces alignment insights
- **Longitudinal Tracking**: Pattern history across sessions maps to FourFlow Mechanism states (Steady Range, Mission Lock, etc.)

---

## Active Focus

Actively being worked on. Check recent commits for current priorities.

---

## Technical Reference (for Claude)

- **Framework**: React 18 + Vite + TailwindCSS
- **State**: Zustand
- **Database**: IndexedDB via `idb` library
- **PWA**: vite-plugin-pwa + Workbox
- **Dev**: `npm run dev` (from `apps/flowzone-web/`)
- **Build**: `npm run build`
- **Entry**: `src/main.jsx` → `src/App.jsx`
- **Pages**: `src/pages/` (Spirit, Story, Space, Self, Flow, Stats, etc.)
- **Store**: `src/store/useStore.js` (Zustand)
- **DB layer**: `src/lib/db.js`
- **Brand colors**: Self #FF6F61 | Space #6BA292 | Story #5B84B1 | Spirit #7A4DA4
