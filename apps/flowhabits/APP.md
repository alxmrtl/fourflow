# FlowHabits - APP.md

**Status**: App Store ready (v1.0.0) | Last updated: 2026-02-17

---

## What It Is

Native iOS habit tracker organized by the Four Pillars (Self, Space, Story, Spirit). Simple tap-to-complete tracking with streak counts, balance indicators across pillars, and gentle accountability — no guilt, no gamification.

---

## Role in the FourFlow Ecosystem

**Tier 2 — Community Entry Point** (Secondary)

Brings people into the FourFlow ecosystem through daily habit practice. The habit layer is how people first embody the Four Pillars in daily life — each pillar gets tracked separately, creating natural awareness of which areas are thriving and which need attention. Users graduate from habits into the deeper ARK work.

---

## Current State

- Habits organized by Four Pillars (SELF, SPACE, STORY, SPIRIT)
- Tap-to-complete tracking (simple, no friction)
- Streak counts + personal bests per habit
- Balance indicators showing progress across all four pillars
- Completion statistics and history
- No guilt/shame framing — intentional design philosophy
- Local-first data (SwiftData), no account required
- Bundle ID: app.fourflowos.FlowHabits

---

## ARK Integration — Agent Data Infrastructure

FlowHabits is **Phase 1** of the bidirectional agent data loop. Habit completion data feeds the FourFlow Agent's longitudinal model of the user — which pillars are being exercised vs. neglected, intention vs. execution gaps, streaks and drops over time.

**Direction (Feb 2026):**
- Add Supabase sync: habit completions write to `habit_completions` table (existing Supabase instance)
- Add user authentication (Supabase Auth — Apple Sign In or email)
- `/align` reads habit data via Supabase REST API → infers pillar state → updates Flow Profile
- Phase 2: agent writes recommendations back to `agent_recommendations` table → app surfaces them

**Why first:** Cleanest data model (pillar labels already built in), lowest iOS complexity, fastest path to a working data loop.

**Natural on-ramp**: habit practice → Flow Profile → FourFlow Agent

---

## Technical Reference (for Claude)

- **Framework**: SwiftUI + SwiftData
- **Min iOS**: 17.0
- **Xcode project**: `apps/flowhabits/` — open `.xcodeproj` in Xcode
- **Data**: SwiftData, local only, no network requests
- **Key docs**: `APP_STORE_INFO.md`, `APP_STORE_SUBMISSION_GUIDE.md`, `DESIGN_TRANSFORMATION.md`, `FINAL_TESTING_CHECKLIST.md`
- **Brand colors**: Self #FF6F61 | Space #6BA292 | Story #5B84B1 | Spirit #7A4DA4
