# FourFlowOS - Claude Code Guide

## Mission

FourFlowOS is a consciousness alignment protocol and personal development ecosystem. The core thesis: **when AI agents handle all execution, the only remaining bottleneck is the quality of human intention. FourFlow measures alignment.**

The framework aligns four dimensions: **Self, Space, Story, and Spirit** — each a layer in the signal chain between human consciousness and meaningful action.

See `docs/planning/THE-ARK-BLUEPRINT.md` for the full strategic vision.

---

## The Three Product Layers

### 1. Flow Profile (Entry Point + Data Moat)
Diagnostic across 12 Flow Keys and 4 pillars. Delivered in-person (workshops, coaching) or digitally (API-first self-serve assessment). Output: which layer is stuck, which keys are bottlenecks, the specific cascade that will unlock flow.

### 2. FourFlow Agent (Consciousness Companion)
An AI observer that knows the FourFlow framework and your Flow Profile. Watches patterns in conversation and behavior, infers your state across the 12 keys, and asks the right question at the right time — in plain language, no jargon. Adapts its presence (proactive when you need pushing, fades when you're flowing). The 12 keys are its internal map, not its vocabulary.

### 3. The Movement (Network Effect)
Certified FourFlow Practitioners. Shared language (the 12 Flow Keys become vocabulary). Community.

---

## The 12 Flow Keys

Twelve conditions that determine whether flow is accessible. The science behind each key lives in `docs/research/` — it informs how the FourFlow Agent observes, but stays backstage.

**SELF** (Reception): **Tuned Emotions** · **Focused Body** · **Open Mind**
**SPACE** (Transmission): **Intentional Space** · **Optimized Tools** · **Feedback Systems**
**STORY** (Temporal Direction): **Generative Story** · **Clear Mission** · **Empowered Role**
**SPIRIT** (Timeless Direction): **Grounding Values** · **Ignited Curiosity** · **Visualized Vision**

---

## The Four Pillars

| Pillar | Color | Hex | Function | Question |
|--------|-------|-----|----------|---------|
| SELF | Coral | #FF6F61 | Reception Layer | "Can I receive alignment signals?" |
| SPACE | Sage Green | #6BA292 | Transmission Layer | "Is my environment supporting signal flow?" |
| STORY | Steel Blue | #5B84B1 | Temporal Direction | "Where am I in the arc? What am I aiming at?" |
| SPIRIT | Amethyst | #7A4DA4 | Timeless Direction | "What is always true for me?" |
| — | Charcoal | #333333 | Neutral | — |
| — | Ivory | #F5F5F5 | Background | — |

---

## App Ecosystem

Apps are active products and community entry points. Each has an `APP.md` with current state, role, and technical reference.

| App | Tier | Role | Stack |
|-----|------|------|-------|
| **FlowZone Web** | 1 — ARK Hub | Primary digital surface; future home of Flow Profile + Agent | React + Vite + TailwindCSS + Zustand + IndexedDB |
| **FlowZone iOS** | 2 — Entry Point | Native focus timer; top-of-funnel mobile product | SwiftUI + SwiftData + AVFoundation |
| **FlowHabits** | 2 — Entry Point | Four Pillars habit tracker; daily embodiment of framework | SwiftUI + SwiftData |
| **FlowRead** | 3 — Standalone | Speed reading trainer; loosely connected to Open Mind | Vanilla JS PWA |
| **FlowRep** | 3 — Standalone | Daily rep tracker; loosely connected to Focused Body | iOS native (Swift) |

**FlowZone Web dev**:
```bash
cd apps/flowzone-web
npm install && npm run dev
```
**iOS Apps**: Open `.xcodeproj` in Xcode

---

## Repository Structure

```
FourFlowOS/
├── CLAUDE.md              # This file
├── README.md              # Public overview
│
├── apps/                  # All app codebases (each has APP.md)
│   ├── flowzone-web/      # Tier 1: React PWA - primary ARK surface
│   ├── flowzone-ios/      # Tier 2: iOS focus timer
│   ├── flowhabits/        # Tier 2: iOS habit tracker
│   ├── flowread/          # Tier 3: Speed reading (vanilla JS)
│   ├── flowrep/           # Tier 3: Rep tracker (iOS)
│   └── _archive/          # Deprecated apps
│
├── docs/
│   ├── planning/
│   │   ├── THE-ARK-BLUEPRINT.md  # Primary strategy document
│   │   ├── READY/                # 12 Flow Key articles (ready to publish)
│   │   ├── _archive/             # Pre-ARK planning docs
│   │   └── [templates + systems] # Content templates, EXECUTION-SYSTEM, etc.
│   ├── foundations/       # Philosophical/ontological underpinnings + presentations
│   ├── pillars/           # SELF, SPACE, STORY, SPIRIT deep dives
│   └── research/          # 12 Flow Keys research (12 folders)
│
├── brand/                 # Brand system (BRAND_BIBLE.md, logos, icons, mandalas, app-icons)
├── design/                # Design files (PSD, posters, templates, motion)
├── media/                 # Media assets (video, audio, podcast, AI-generated)
├── content/               # Original content (social-media, quotes)
├── website/               # Marketing site (Next.js + Sanity CMS)
├── flow-council/          # Flow Council: prototype FourFlow Agent
│   ├── flow-profile.md    # Living Flow Profile (patient zero)
│   └── sessions/          # Council session logs
├── astroadvisor/          # Consciousness guidance system (independent)
├── projects/              # WIP projects (compass, training-with-masters)
│
└── archive/
    ├── external-sources/  # Reference material by other authors (Dan Jones, etc.)
    └── old-versions/      # Deprecated code and old site versions
```

---

## Flow Council (Skill System)

The prototype FourFlow Agent, built as Claude skills for daily use.

**Consciousness layer**: `/align` — checks state across four pillars, one recommendation. Reads + writes `flow-council/flow-profile.md`.

**Execution layer** (sits below /align):
- `/architect` — product, technical, AI/agent architecture
- `/publisher` — content, visibility, narrative, brand
- `/strategist` — business model, revenue, positioning

**Independent**: `/astroadvisor` (cosmic timing), `/process-book` (book distillation)

---

## Key Concepts

**Focus Reps**: Core FlowZone innovation — pressing a button when distraction pulls, making the invisible work of maintaining focus visible.

**Struggle Phase**: First ~25% of any focus session. Apps provide ambient encouragement during this phase.

**Contrast as Interface**: Navigation = vibrant colors; Focus mode = minimalist zen. Transition trains the brain.

**Flow Keys**: The 12 conditions that determine whether flow is accessible. Each names a domain of human experience and its ideal state. Science behind each key is documented in `docs/research/`.

---

## Working in This Repo

- Each app's `APP.md` is the source of truth for that app's current state, role, and technical details
- `docs/planning/THE-ARK-BLUEPRINT.md` is the strategic north star
- `docs/planning/READY/` contains the 12 Flow Key articles (published content)
- `archive/external-sources/` contains reference material from other authors — clearly not original work
- Before adding files: search for existing versions (glob/grep), keep the higher quality version
- File naming: lowercase with hyphens (`flowzone-web`, `flowhabits`), descriptive names

---

## External Resources

- Hypnosis audio files: `~/Documents/FourFlowHypnosis/`
- Large media archive: Available separately (not in git)
