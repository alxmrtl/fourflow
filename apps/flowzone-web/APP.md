# FlowZone Web - APP.md

**Status**: Active development | Last updated: 2026-02-23

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
- Supabase auth (email/magic link) — optional, enables agent sync
- Focus sessions sync to `focus_sessions` table when authenticated
- PWA: installable, offline-capable

---

## ARK Integration — Agent Data Infrastructure

FlowZone Web is **Phase 2** of the bidirectional agent data loop. Focus session data (session length, Focus Reps, time of day, completion) feeds the FourFlow Agent's model of SELF and SPACE patterns over time.

**Direction (Feb 2026):**
- Add Supabase JS client + user authentication (Supabase Auth — email/magic link)
- Focus sessions write to `focus_sessions` table (existing Supabase instance)
- `/align` reads session history → infers SELF/SPACE state → updates Flow Profile
- Phase 2: agent surfaces session insights and SPACE recommendations directly in the UI
- **Flow Profile Assessment**: Add 12-key diagnostic layer on top of existing pillar setup
- **FourFlow Agent Interface**: Conversation layer that reads session data and surfaces alignment insights using the 12 Flow Keys

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
