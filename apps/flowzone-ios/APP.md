# FlowZone iOS - APP.md

**Status**: App Store ready (v1.0.0) | Last updated: 2026-02-17

---

## What It Is

Native iOS focus timer built on the FourFlow framework. Pairs breathwork, binaural beats (10 Hz alpha), and the Four Pillars with structured focus sessions. Mobile companion to FlowZone Web.

---

## Role in the FourFlow Ecosystem

**Tier 2 — Community Entry Point** (Secondary)

Brings people into the FourFlow ecosystem through a native mobile experience. The iOS app is a top-of-funnel product — users discover FourFlow through the focus timer, and the deeper ARK work (Flow Profile, Agent) is where they grow into. Not currently the primary ARK integration surface (that's FlowZone Web).

---

## Current State

- Focus timer: 25, 50, 90 min sessions
- Focus Reps tracking
- Binaural beats: 10 Hz alpha waves (AVFoundation, requires headphones)
- 7 breathwork patterns (Box, 4-7-8, Coherent, Energizing, etc.)
- Four Pillars onboarding: values, goals, tasks
- Daily container planning (1-5 sessions/day)
- Stats and session history
- Local-first data (SwiftData), no account required
- Bundle ID: app.fourflowos.FlowZone

---

## ARK Integration (Future)

- Could serve as mobile interface for Flow Profile check-ins
- Push notification layer for Signal Rhythm (calibrated check-in timing)
- Potential widget for daily alignment state at a glance

---

## Technical Reference (for Claude)

- **Framework**: SwiftUI + SwiftData + AVFoundation
- **Min iOS**: 17.0
- **Xcode project**: `apps/flowzone-ios/` — open `.xcodeproj` in Xcode
- **Data**: SwiftData, local only, no network requests
- **Key docs**: `APP_STORE_INFO.md`, `APP_STORE_SUBMISSION_CHECKLIST.md`, `FINAL_TESTING_CHECKLIST.md`
- **Brand colors**: Self #FF6F61 | Space #6BA292 | Story #5B84B1 | Spirit #7A4DA4
