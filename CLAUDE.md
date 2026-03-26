# FourFlowOS - Claude Code Guide

## Mission

FourFlowOS is a consciousness alignment protocol and personal development ecosystem. The core thesis: **when AI agents handle all execution, the only remaining bottleneck is the quality of human intention. FourFlow measures alignment.**

The framework aligns four dimensions: **Self, Space, Story, and Spirit** — each a layer in the signal chain between human consciousness and meaningful action.

See `planning/THE-ARK-BLUEPRINT.md` for the full strategic vision.

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

Twelve conditions that determine whether flow is accessible. The science behind each key lives in `compendium/framework/[PILLAR]/[Key]/_source/` — it informs how the FourFlow Agent observes, but stays backstage.

**SELF** (Reception): **Tuned Emotions** · **Focused Body** · **Open Mind**
**SPACE** (Transmission): **Intentional Space** · **Optimized Tools** · **Feedback Systems**
**STORY** (Temporal Direction): **Generative Story** · **Clear Mission** · **Empowered Role**
**SPIRIT** (Timeless Direction): **Grounding Values** · **Ignited Curiosity** · **Visualized Vision**

## Compendium Knowledge Hierarchy

```
SOUL  (Default Is Open — the light source)
  └── Dimension ×4  (Direction Precedes Force — the four orientations)
        └── State ×12  (Coherence Is the Mechanism — named coherent configurations)
              ├── Restore Quality  (Default Is Open echo — return to natural state)
              ├── Maintain Quality (Loops Close Gaps — keep feedback running)
              └── Concentrate Quality (Compression — maximize signal density)
                    ├── Technique  — atomic actionable protocols (the HOW)
                    └── Concept    — external scientific/philosophical frameworks (the WHY)
```

- **States** are FourFlow's proprietary vocabulary — the 12 named coherent configurations (e.g., "Tuned Emotions", "Focused Body"). Each Dimension has 3 States.
- **Qualities** compose each State — always exactly 3 per State, each expressing one principle (Restore / Maintain / Concentrate). These are what the FourFlow Agent diagnoses.
- **Techniques** are atomic, teachable protocols. Numbered steps. Concrete enough to follow without reading the source.
- **Concepts** are external science and philosophy imported from outside FourFlowOS (e.g., `Window of Tolerance`, `Transient Hypofrontality`, `Challenge-Skill Ratio`). They explain WHY a Quality matters. Cross-cutting — one Concept can ground multiple Qualities. Lives in `[State]/_concepts/` or `framework/_concepts/` (cross-pillar).

**Full architecture reference**: `compendium/foundations/architecture.md`

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
| **FlowZone Web** | 1 — ARK Hub | Primary digital surface; home of Flow Profile + Agent | Next.js + TailwindCSS (live at `website/fourflowos-web/`) |
| **FlowZone iOS** | 2 — Entry Point | Native focus timer; top-of-funnel mobile product | SwiftUI + SwiftData + AVFoundation |
| **FlowHabits** | 2 — Entry Point | Four Pillars habit tracker; daily embodiment of framework | SwiftUI + SwiftData |
| **FlowRead** | 3 — Standalone | Speed reading trainer; loosely connected to Open Mind | Vanilla JS PWA |
| **FlowRep** | 3 — Standalone | Daily rep tracker; loosely connected to Focused Body | iOS native (Swift) |

**FlowZone Web dev**:
```bash
cd website/fourflowos-web
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
│   ├── flowzone-ios/      # Tier 2: iOS focus timer
│   ├── flowhabits/        # Tier 2: iOS habit tracker
│   ├── flowread/          # Tier 3: Speed reading (vanilla JS)
│   ├── flowrep/           # Tier 3: Rep tracker (iOS)
│   └── _archive/          # Deprecated apps
│
├── website/               # Tier 1 ARK Hub: Next.js + Sanity CMS (deployed to Vercel)
│   └── fourflowos-web/    # LIVE codebase — build here, not apps/flowzone-web
│
├── planning/              # Strategy + content planning
│   ├── THE-ARK-BLUEPRINT.md  # Primary strategy document
│   ├── READY/                # 12 Flow Key articles (ready to publish)
│   ├── _archive/             # Pre-ARK planning docs
│   └── [templates + systems] # Content templates, EXECUTION-SYSTEM, etc.
│
├── compendium/            # The flow brain — all knowledge, techniques, captures
│   ├── COMPENDIUM_INDEX.md   # Flat retrieval map for agents
│   ├── foundations/          # What FourFlow is and why it exists
│   └── framework/            # 4 pillars → 12 keys → mechanics/techniques/concepts
│       ├── [PILLAR]/[Key]/[mechanic].md        # 62 mechanics
│       ├── [PILLAR]/[Key]/_techniques/*.md     # 85 techniques
│       └── [PILLAR]/[Key]/_concepts/*.md       # 44 concepts
│
├── agents/                # AI agent systems
│   ├── flow-council/      # Prototype FourFlow Agent
│   │   ├── flow-profile.md   # Living Flow Profile (patient zero)
│   │   └── sessions/         # Council session logs
│   └── astroadvisor/      # Consciousness guidance system
│
├── brand/                 # Brand system (BRAND_BIBLE.md, logos, icons, mandalas, app-icons)
├── design/                # Design files (PSD, posters, templates, motion)
├── media/                 # Media assets (video, audio, podcast, AI-generated)
│
└── archive/               # Deprecated code and old versions
```

---

## Flow Council (Skill System)

The prototype FourFlow Agent, built as Claude skills for daily use.

**Consciousness layer**: `/align` — daily check-in + alignment. Reads + writes `agents/flow-council/flow-profile.md`. Follows the user across all work, not just FourFlowOS.

**Execution layer** (sits below /align):
- `/architect` — product, technical, AI/agent architecture
- `/publisher` — content, visibility, narrative, brand
- `/strategist` — business model, revenue, positioning

**Independent**: `/astroadvisor` (cosmic timing), `/process-book` (book distillation), `/process-capture` (single captures → compendium)

---

## Key Concepts

**Focus Reps**: Core FlowZone innovation — pressing a button when distraction pulls, making the invisible work of maintaining focus visible.

**Struggle Phase**: First ~25% of any focus session. Apps provide ambient encouragement during this phase.

**Contrast as Interface**: Navigation = vibrant colors; Focus mode = minimalist zen. Transition trains the brain.

**Flow Keys**: The 12 conditions that determine whether flow is accessible. Each names a domain of human experience and its ideal state. Science + techniques documented in `compendium/framework/`.

---

## Training Platform

`/train` route (auth-gated, unlisted). Two views via "Reps | Explore" toggle:

- **Daily Reps**: SM-2 spaced repetition. Study phase (full card) → Recall phase (blank slots, reveal, rate). 10 cards/session.
- **Explore (Compendium Navigator)**: Signal Grid — 4-column visual map of all 191 cards (62 mechanics + 85 techniques + 44 concepts). Bars show mastery dots, enrichment intensity, click-to-expand accordion.

**Compendium sync**: `scripts/sync-compendium.js` reads `compendium/framework/`, upserts to Supabase `mechanics` table. Run after enrichment sessions.
**Components**: `src/components/tools/training/` — TrainingApp, CardSession, MechanicCard, ProgressGrid, CompendiumNavigator, useTrainingStore
**API**: `/api/train/queue`, `/api/train/reviews`, `/api/train/progress`, `/api/train/mechanics`, `/api/train/sessions`

---

## Working in This Repo

- Each app's `APP.md` is the source of truth for that app's current state, role, and technical details
- `planning/THE-ARK-BLUEPRINT.md` is the strategic north star
- `planning/READY/` contains the 12 Flow Key articles (published content)
- `compendium/COMPENDIUM_INDEX.md` is the flat retrieval map for all framework knowledge
- LIVE website is `website/fourflowos-web/` — do not build features in `apps/flowzone-web/` (retired)
- Before adding files: search for existing versions (glob/grep), keep the higher quality version
- File naming: lowercase with hyphens (`flowzone-web`, `flowhabits`), descriptive names

---

## External Resources

- Hypnosis audio files: `~/Documents/FourFlowHypnosis/`
- Large media archive: Available separately (not in git)
