# Prompt: Atomize Remaining 11 Key Files + Mechanic Phase

Paste this at the start of a new conversation to continue Phase 2 + Phase 3 of the Atomic Knowledge System.

---

## Context

We are implementing an atomic knowledge system for the FourFlow compendium. The goal is to convert all key-level files from raw essay dumps into clean MOCs, extracting named concepts as atomic notes, then atomize mechanic files into technique-level atomic notes.

**Phase 1** (Obsidian + Smart Connections) — ✅ complete
**Phase 2** (Key-level MOC refactor) — 1/12 done. Need to complete the remaining 11.
**Phase 3** (Mechanic atomization via `/enrich --atomize`) — not started yet, begins after Phase 2 is done.

---

## What Was Done: The Tuned-Emotions Pattern

`Tuned-Emotions.md` was refactored as the proof of concept. The pattern to replicate:

**Before**: ~1,195 lines of raw research notes all in one file
**After**: Clean 47-line MOC + 5 atomic concept notes in `_concepts/`

### The MOC format (copy this structure exactly):

```markdown
---
dimension: [SELF|SPACE|STORY|SPIRIT]
key: [Key Name]
type: key-overview
---

# [Key Name]

> One-line function — what this key IS and what it does in the signal chain.

## Why It Enables Flow

[Paragraph 1: The mechanism — how this condition enables or blocks flow.]

[Paragraph 2: The failure mode — what breaks when this key is absent/miscalibrated.]

## The Mechanics

- [[mechanic-slug]] — one-line: what problem this mechanic solves
- [[mechanic-slug]] — one-line: what problem this mechanic solves
...

## Key Concepts

- [[concept-slug]] — one-line: what the concept is and why it matters here
- [[concept-slug]] — one-line: what the concept is and why it matters here
...

## Source Material

- [[_source/Comprehensive_Research_Document]]
- [[_source/Diagnostic_Measurement]]
- [[_source/Flow_Key_Explanation]]
- [[_source/Key_Concepts_Nuggets]]
```

### The concept note format (for `_concepts/` files):

```markdown
---
title: "Concept Name"
pillars: [self]        ← lowercase, can span multiple pillars
flow_keys: [tuned-emotions]
keywords: [keyword1, keyword2, keyword3]
tags:
  - type/concept
---

# Concept Name

> One line: what this concept IS and what it means for flow.

## What It Is
[2-3 paragraphs: the idea, its history/origin, its scope]

## [Mechanism / Why It Works / Link to Flow]
[The science or logic: why does this concept matter for accessing flow?]

## Application
[How to use this concept in practice — not a full protocol, but the key lever]

## Related
- [[mechanic-slug]] — relationship
- [[concept-slug]] — relationship
```

### Where concept files live:
```
compendium/framework/[PILLAR]/[Key-Name]/_concepts/[concept-slug].md
```

Example already created:
```
compendium/framework/SELF/Tuned-Emotions/_concepts/
  challenge-skills-balance.md
  flow-cycle-phases.md
  yerkes-dodson-law.md
  anxiety-excitement-reframe.md
  emotional-frequency-scale.md
```

---

## Key Rule: What to Strip vs Keep

Each key file currently has:
- **Top section** (mechanics list + source material links) — keep as foundation for the MOC
- **Body** (raw research notes, diagrams descriptions, exercises, essays) — extract concepts from this, then **strip it**. The raw content is already backed up in `_source/` for each key.

Do NOT move the raw content anywhere — it's already preserved in:
```
compendium/framework/[PILLAR]/[Key-Name]/_source/
  Comprehensive_Research_Document.md
  Diagnostic_Measurement.md
  Flow_Key_Explanation.md
  Key_Concepts_Nuggets.md
```

---

## The 11 Remaining Keys

Process in this order (largest/messiest first):

| Priority | Key | File | Lines | Mechanic count |
|----------|-----|------|-------|----------------|
| 1 | Open Mind | `SELF/Open-Mind/Open-Mind.md` | 873 | 7 |
| 2 | Focused Body | `SELF/Focused-Body/Focused-Body.md` | 497 | 6 |
| 3 | Generative Story | `STORY/Generative-Story/Generative-Story.md` | 521 | 5 |
| 4 | Feedback Systems | `SPACE/Feedback-Systems/Feedback-Systems.md` | 374 | 5 |
| 5 | Optimized Tools | `SPACE/Optimized-Tools/Optimized-Tools.md` | 387 | 5 |
| 6 | Intentional Space | `SPACE/Intentional-Space/Intentional-Space.md` | 223 | 5 |
| 7 | Ignited Curiosity | `SPIRIT/Ignited-Curiosity/Ignited-Curiosity.md` | 211 | 5 |
| 8 | Visualized Vision | `SPIRIT/Visualized-Vision/Visualized-Vision.md` | 211 | 4 |
| 9 | Grounding Values | `SPIRIT/Grounding-Values/Grounding-Values.md` | 170 | 4 |
| 10 | Empowered Role | `STORY/Empowered-Role/Empowered-Role.md` | 127 | 4 |
| 11 | Clear Mission | `STORY/Clear-Mission/Clear-Mission.md` | 123 | 4 |

All paths are relative to: `/Users/owner/Documents/FourFlowOS/compendium/framework/`

### Mechanics per key (for writing the MOC links):

**Open Mind** (SELF): ambiguity-control, attention-residue-elimination, clarity-over-intensity, cognitive-load-reduction, compression-over-expansion, growth-orientation, overchoice-elimination

**Focused Body** (SELF): action-awareness-merging, energy-sufficiency, mind-body-coherence, physiological-regulation, rhythm-and-pacing, sensory-coherence

**Generative Story** (STORY): identity-immersion, meaning-coherence, narrative-momentum, positive-orientation, tension-release-dynamics

**Feedback Systems** (SPACE): agency-loops, feedback-density, immediate-feedback, progress-visibility, speed-of-consequence

**Optimized Tools** (SPACE): automation-of-non-creative-steps, error-cost-minimization, friction-removal, subtraction-beats-addition, tool-task-alignment

**Intentional Space** (SPACE): constraint-elegance, environmental-simplicity, interruption-control, physical-space-priming, social-field-alignment

**Ignited Curiosity** (SPIRIT): curiosity-loops, exploration-bias, intrinsic-reward-signaling, playfulness, strength-activation

**Visualized Vision** (SPIRIT): inspirational-compression, long-horizon-coherence, symbolic-meaning, vision-priming

**Grounding Values** (SPIRIT): integrity-loops, internal-alignment, meaning-stabilization, values-integration

**Empowered Role** (STORY): commitment-escalation, identity-alignment, responsibility-without-evaluation-pressure, role-clarity

**Clear Mission** (STORY): clear-goals, outcome-horizon-setting, priority-singularity, stakes-definition

---

## How to Execute Each Key

For each key:

1. **Read the key file** — scan for named concepts, frameworks, models, laws, or named phenomena buried in the raw content
2. **Identify 3–6 atomic concepts** — things with names that reappear across flow literature (e.g., "transient hypofrontality", "attention residue", "default mode network")
3. **Write the clean MOC** — use the format above, ~40–60 lines max
4. **Write each concept note** — one file per concept in `_concepts/`, use format above
5. **Overwrite the key file** with the clean MOC (raw content is already in `_source/`, no need to preserve it)

**Concept naming rule**: use kebab-case slug that could be a standalone Obsidian note and make sense to any reader (e.g., `attentional-blink`, `default-mode-network`, `narrative-identity`).

**Cross-pillar concepts**: if a concept clearly applies to multiple keys (e.g., `transient-hypofrontality` matters to both Focused Body and Tuned Emotions), still create it in the primary key's `_concepts/` folder. Link to it from both key MOCs. Don't duplicate the file.

---

## After Phase 2: Mechanic Atomization (Phase 3)

Once all 12 key MOCs are clean, run `/enrich --atomize` on each mechanic to extract inline technique sections into atomic `_techniques/` files.

**Command pattern**:
```
/enrich --atomize=anxiety-suppression
/enrich --atomize-key=Tuned-Emotions    ← does all 8 mechanics in one key
```

**Priority order for atomization** (richest mechanics first — most techniques to extract):
1. `SELF/Tuned-Emotions/` — 8 mechanics, most already enriched (score 4–5)
2. `SELF/Focused-Body/` — 6 mechanics
3. `SELF/Open-Mind/` — 7 mechanics
4. Then SPACE, STORY, SPIRIT keys

The `/enrich --atomize` skill knows the full protocol (reads mechanic, extracts each `### Technique` heading into a separate `_techniques/[slug].md` file using the `technique.md` template, rewrites the mechanic as a MOC with links).

**Template locations**:
```
compendium/framework/_templates/technique.md      ← atomic technique note
compendium/framework/_templates/mechanic-moc.md   ← mechanic-as-MOC
compendium/framework/_templates/mechanic.md       ← original handbook (reference)
```

---

## Reference: Completed Tuned-Emotions MOC

For reference, the finished `Tuned-Emotions.md` is at:
`compendium/framework/SELF/Tuned-Emotions/Tuned-Emotions.md`

Read it before starting — it's the quality bar and format reference for all 11 keys.
