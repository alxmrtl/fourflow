# FourFlowOS - Claude Code Guide

## Read First (in order)

1. `planning/TRUE-NORTH.md` — the strategic source of truth (ratified June 11, 2026)
2. `compendium/foundations/lexicon.md` — canonical vocabulary; when any doc disagrees with it, the lexicon wins
3. `compendium/foundations/architecture.md` — the framework's five-level structure
4. `compendium/COMPENDIUM_INDEX.md` — flat retrieval map for all framework knowledge

When an older document conflicts with these, these win — flag the conflict, don't blend.

---

## Mission

**FourFlow makes flourishing trainable.**

The capacity for flow — full, undivided engagement with what matters — is native to every person and every team. What blocks it is always a condition, and conditions can be diagnosed and trained. **FourFlow** is the framework (four Dimensions, twelve Keys); **FourFlowOS** is the operating system built around it — the brand, the site, the tools, the practice.

Human flourishing first, instinct developed. AI is amplifier and urgency, not the center: as machines absorb execution, the trained human instinct — knowing what you're for, reading your own signal, moving from coherence — becomes the differentiating skill.

The four throughline convictions (every product, page, and offer must trace to these):
1. Flow isn't forced. It's cultivated.
2. The blocker is always a condition, never a character flaw.
3. Diagnosis precedes intervention.
4. Wholeness over fragment — flow emerges from all four dimensions, not one activity.

---

## The Business: Three Layers + Horizon

| Layer | What | Offers |
|-------|------|--------|
| **Teach** (the craft) | Framework training for individuals and teams | Workshops, cohorts, corporate training (systems-thinking curriculum) |
| **Diagnose** (the wedge) | Find the bottleneck condition | Flow Profile (individuals, via Flow Unlock intake or facilitated) · Team Conditions Audit (B2B, 90-min paid diagnostic) |
| **Equip** (the supplements) | Tools as prescriptions, not products | FlowSpark, FlowZone, FlowRead, FlowBreath, the Compendium — free, prescribed by name from profiles and training |
| **Horizon** (parked) | The FourFlow Agent — AI companion that knows your profile | Deliberately not now; everything above compounds toward it |

**Registers** — one framework, two voices (full rules in TRUE-NORTH.md):
- **Seeker register** (individuals, website, apps): flow front-stage, curiosity-driven, framework visible.
- **Buyer register** (B2B, audits, outreach): conditions/bottleneck language front-stage, framework backstage until trust exists. Never lead with "flow state," "consciousness," or untranslated "Spirit."
- Every artifact declares its register and stays in it.

---

## The Framework

Full structure: `compendium/foundations/architecture.md`. Vocabulary: `compendium/foundations/lexicon.md`.

```
SOUL                      — the light (Default Is Open)
  └── Dimension ×4        — the four faces the light shines through
        └── Key ×12       — each Key opens a gate (3 per Dimension)
              ├── Restore Quality      — clear what's jamming the gate
              ├── Maintain Quality     — keep its hinge moving (Loops Close Gaps)
              └── Concentrate Quality  — open it all the way (Compression)
                    └── Technique      — atomic protocol (the HOW)
```

**The metaphor chain**: Keys open gates → open gates widen the aperture → full aperture is flow.

### The 12 Keys

Twelve conditions that open flow. Each Key names the state it unlocks — the key you turn *and* the configuration that results.

**SELF** (inward — reception): **Tuned Emotions** · **Focused Body** · **Open Mind**
**SPACE** (outward — transmission): **Intentional Space** · **Optimized Tools** · **Feedback Systems**
**STORY** (temporal — direction in time): **Generative Story** · **Clear Mission** · **Empowered Role**
**SPIRIT** (eternal — direction beyond time): **Grounding Values** · **Ignited Curiosity** · **Visualized Vision**

- **Qualities** — exactly 3 per Key (Restore / Maintain / Concentrate). What gets diagnosed. (Formerly "mechanics" — deprecated.)
- **Techniques** — atomic, teachable protocols with numbered steps. Live in `[PILLAR]/[Key]/_techniques/`.
- **Concepts** — external science (archived layer; reference only, not synced). Live in `_concepts/` folders.
- Deprecated level names: ~~States~~ (→ Keys), ~~Mechanics~~ (→ Qualities), ~~Pillars~~ in prose (→ Dimensions; "pillar" survives only as a legacy identifier in code/DB/file paths).

### The Four Dimensions

| Dimension | Color | Hex | Orientation | Question |
|-----------|-------|-----|-------------|----------|
| SELF | Coral | #FF6F61 | Inward — reception | "Am I clear enough to take this in?" |
| SPACE | Sage Green | #6BA292 | Outward — transmission | "Is my context amplifying or degrading signal?" |
| STORY | Steel Blue | #5B84B1 | Temporal — direction in time | "What am I building toward?" |
| SPIRIT | Amethyst | #7A4DA4 | Eternal — direction beyond time | "What doesn't change regardless of conditions?" |
| — | Charcoal | #333333 | Neutral | — |
| — | Ivory | #F5F5F5 | Background | — |

---

## App Ecosystem

Apps are supplements to the practice (Equip layer) — prescribed from profiles, audits, and training. Each has an `APP.md` with current state and technical reference.

| App | Tier | Role | Stack |
|-----|------|------|-------|
| **FlowZone Web** | 1 — Hub | Primary digital surface; home of Flow Profile + tools | Next.js + TailwindCSS (live at `website/fourflowos-web/`) |
| **FlowZone iOS** | 2 — Entry Point | Native focus timer | SwiftUI + SwiftData + AVFoundation |
| **FlowHabits** | 2 — Entry Point | Four-Dimension habit tracker | SwiftUI + SwiftData |
| **FlowRead** | 3 — Standalone | Speed reading trainer (Open Mind) | Vanilla JS PWA |
| **FlowRep** | 3 — Standalone | Daily rep tracker (Focused Body) | iOS native (Swift) |
| **FlowStation** | 3 — Standalone | Always-on office monitor | Single HTML file (`apps/flowstation/`) |

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
│   ├── flowstation/       # Tier 3: Office monitor (single HTML)
│   └── _archive/          # Deprecated apps (incl. retired flowzone-web PWA)
│
├── website/               # Tier 1 Hub: Next.js + Sanity CMS (deployed to Vercel)
│   └── fourflowos-web/    # LIVE codebase — build here, not apps/_archive/flowzone-web
│
├── planning/              # Strategy + content planning
│   ├── TRUE-NORTH.md         # Strategic source of truth (ratified Jun 11, 2026)
│   ├── OFFER-team-conditions-audit.md  # The B2B offer (from Profitable Authority work)
│   ├── systems-thinking-training.md    # Corporate training curriculum
│   ├── READY/                # 12 Key articles (publishable content)
│   └── _archive/             # Superseded docs (ARK Blueprint, EXECUTION-SYSTEM, etc.)
│
├── compendium/            # The flow brain — all knowledge, techniques, captures
│   ├── COMPENDIUM_INDEX.md   # Flat retrieval map for agents
│   ├── foundations/          # lexicon.md, architecture.md, first-principles.md, …
│   ├── protocols/            # Multidimensional protocols (e.g., fourflow-fast.md)
│   └── framework/            # 4 Dimensions → 12 Keys → qualities/_techniques/_concepts
│       ├── [PILLAR]/[Key]/[quality].md         # 36 Quality files (3 per Key)
│       ├── [PILLAR]/[Key]/_techniques/*.md     # Technique protocols
│       └── [PILLAR]/[Key]/_concepts/*.md       # Archived concept references
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

**Coherence**: The mechanism in both registers — flow is the experience; coherence is the condition.

**Bottleneck**: The Key (seeker register) or condition (buyer register) currently most blocking flow. Every FourFlow diagnostic is the same move: name the condition, not the symptom.

---

## Training Platform

`/train` route (auth-gated, unlisted). Two views via "Reps | Explore" toggle:

- **Daily Reps**: SM-2 spaced repetition. Study phase (full card) → Recall phase (blank slots, reveal, rate).
- **Explore (Compendium Navigator)**: Signal Grid — 4-column visual map of all cards (Qualities + Techniques), mastery dots, click-to-expand accordion.

**Compendium sync**: `scripts/sync-compendium.js` reads `compendium/framework/`, upserts to Supabase `mechanics` table (table name is a legacy identifier — content is Qualities/Techniques). Run after enrichment sessions.
**Components**: `src/components/tools/training/` — TrainingApp, CardSession, MechanicCard, ProgressGrid, CompendiumNavigator, useTrainingStore
**API**: `/api/train/queue`, `/api/train/reviews`, `/api/train/progress`, `/api/train/mechanics`, `/api/train/sessions`

---

## Working in This Repo

- `planning/TRUE-NORTH.md` is the strategic north star; `compendium/foundations/lexicon.md` settles all naming questions
- Each app's `APP.md` is the source of truth for that app's current state, role, and technical details
- New planning docs declare their register (seeker/buyer) and their layer (Teach/Diagnose/Equip/Horizon) at the top
- `planning/READY/` contains the 12 Key articles (publishable content)
- `compendium/COMPENDIUM_INDEX.md` is the flat retrieval map for all framework knowledge
- LIVE website is `website/fourflowos-web/` — do not build features in the retired `apps/_archive/flowzone-web/`
- Before adding files: search for existing versions (glob/grep), keep the higher quality version
- File naming: lowercase with hyphens (`flowzone-web`, `flowhabits`), descriptive names

---

## External Resources

- Hypnosis audio files: `~/Documents/FourFlowHypnosis/`
- Large media archive: Available separately (not in git)
