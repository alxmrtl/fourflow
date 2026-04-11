# Prompt: Phase 3 — Mechanic Atomization

Paste this at the start of a new conversation to begin Phase 3 of the Atomic Knowledge System.

---

## Context

We are implementing an atomic knowledge system for the FourFlow compendium.

**Phase 1** (Obsidian + Smart Connections) — ✅ complete
**Phase 2** (Key-level MOC refactor) — ✅ complete. All 12 key files are clean MOCs with named concepts in `_concepts/` subdirectories.
**Phase 3** (Mechanic atomization) — **this is what we're doing now.**

---

## What Phase 3 Is

Each mechanic file is currently a rich handbook: a definition, a "How It Enables Flow" section, and 3–7 named techniques written inline as `### Technique Name` subsections with full protocols.

Phase 3 extracts each named technique into its own atomic `_techniques/[slug].md` file, then rewrites the mechanic itself as a clean MOC that links to those technique files.

**Before**: One 150-line mechanic file containing everything inline.
**After**: A clean 40-50 line mechanic MOC + 3–7 individual technique files in `_techniques/`.

---

## The Two Templates

### Mechanic MOC format (`_templates/mechanic-moc.md`):

```markdown
---
title: "Mechanic Name"
pillars: [self]
flow_keys: [tuned-emotions]
keywords: [keyword1, keyword2]
definition: "One-line definition — what problem this mechanic solves."
tags:
  - type/mechanic
---

# Mechanic Name

> One-line definition — what problem this mechanic solves.

## Why It Enables Flow

2–3 sentences. The mechanism: how does this condition shape what's accessible in a flow state?
What breaks when this mechanic is absent?

## Techniques

- [[technique-slug]] — one-line: what this technique does
- [[technique-slug]] — one-line: what this technique does
...

## Key Concepts

- [[concept-slug]] — one-line: why this concept is relevant here (link to existing _concepts/ notes)

## Related Mechanics

- [[mechanic-slug]] — relationship description

## Sources

- [[book-slug]] / [[capture-slug]] — what it contributed

## Recall

**Hook**: [one-line recall anchor]
**Mechanism**: [the core WHY in one sentence]
**Anchor**: [memorable phrase or metaphor]
**See also**: [[technique-slug]], [[mechanic-slug]]
```

### Technique note format (`_templates/technique.md`):

```markdown
---
title: "Technique Name"
mechanic: "[[mechanic-slug]]"
pillars: [self]
flow_keys: [tuned-emotions]
keywords: [keyword1, keyword2]
tags:
  - type/technique
---

# Technique Name

> One line: what this technique IS and what it does for flow.

## Mechanism
Why it works — the underlying science or psychology in 2–3 sentences.

## Protocol
Step-by-step. Concrete enough to follow without reading the source.

1.
2.
3.

## When to Use
Context, timing, triggers. When does this technique shine? Any contraindications?

## Key Insight
> "Memorable compression of the technique's essential idea."

## Related
- [[mechanic-slug]] — parent mechanic
- [[technique-slug]] — related technique
```

---

## File Structure

Technique files live in a `_techniques/` folder inside the same key directory as the mechanic:

```
compendium/framework/[PILLAR]/[Key-Name]/
  [mechanic-name].md              ← becomes the MOC
  _techniques/
    [technique-slug].md           ← one file per named technique
    [technique-slug].md
    ...
  _concepts/
    [concept-slug].md             ← already exists from Phase 2
  _source/
    ...                           ← already exists, leave untouched
```

Example for `anxiety-suppression`:
```
SELF/Tuned-Emotions/
  anxiety-suppression.md          ← rewritten as MOC
  _techniques/
    disturbance-log.md
    consciousness-re-patterning.md
    anxiety-indicators-checklist.md
    inside-out-paradigm-shift.md
    aperture-widening.md
```

All paths are relative to:
`/Users/owner/Documents/FourFlowOS/compendium/framework/`

---

## How to Execute Each Mechanic

1. **Read the mechanic file** — identify every named technique (look for `### Heading` sections, named practices, named protocols, named exercises)
2. **Extract each technique** into its own `_techniques/[slug].md` using the technique template
3. **Rewrite the mechanic file** as a clean MOC using the mechanic-moc template — keep the existing `## Recall` section intact (it was written in a previous sprint)
4. **Preserve the `## Book Sources` and `## Capture Sources` tables** from the original — migrate them into the MOC's `## Sources` section

**Technique naming rule**: kebab-case slug that describes the technique, not the concept (e.g., `disturbance-log`, `box-breathing`, `peak-exit-ritual`). A technique is a *practice you do*, not an idea you understand.

**What stays in the MOC vs. what moves to a technique file**:
- Stays in MOC: definition, Why It Enables Flow (2-3 sentences), mechanic-level concepts, related mechanics, sources, recall
- Moves to technique file: any named practice, protocol, exercise, or method that has steps or a clear how-to

**Cross-pillar techniques**: if a technique is genuinely reusable across mechanics (e.g., box breathing appears in both `anxiety-suppression` and `physiological-regulation`), create it once in the primary mechanic's `_techniques/` and link to it from the secondary. Don't duplicate.

---

## Reference: Existing Mechanic Quality Bar

The richest mechanic file to use as a quality reference is:
`compendium/framework/SELF/Tuned-Emotions/anxiety-suppression.md`

Read it before starting — it shows the level of technique depth that exists and needs to be preserved (not summarized) when extracting to technique files.

---

## Priority Order

Process keys in this order (richest mechanics first — most technique content to extract):

| Priority | Key | Path | Mechanic Count |
|----------|-----|------|----------------|
| 1 | Tuned Emotions | `SELF/Tuned-Emotions/` | 8 |
| 2 | Focused Body | `SELF/Focused-Body/` | 6 |
| 3 | Open Mind | `SELF/Open-Mind/` | 7 |
| 4 | Feedback Systems | `SPACE/Feedback-Systems/` | 5 |
| 5 | Optimized Tools | `SPACE/Optimized-Tools/` | 5 |
| 6 | Intentional Space | `SPACE/Intentional-Space/` | 5 |
| 7 | Ignited Curiosity | `SPIRIT/Ignited-Curiosity/` | 5 |
| 8 | Visualized Vision | `SPIRIT/Visualized-Vision/` | 4 |
| 9 | Grounding Values | `SPIRIT/Grounding-Values/` | 4 |
| 10 | Empowered Role | `STORY/Empowered-Role/` | 4 |
| 11 | Generative Story | `STORY/Generative-Story/` | 5 |
| 12 | Clear Mission | `STORY/Clear-Mission/` | 4 |

### Mechanics per key (for reference):

**Tuned Emotions** (SELF): anxiety-suppression, challenge-skill-calibration, effort-reward-coupling, ego-monitoring-removal, emotional-neutrality, error-tolerance, outcome-detachment, psychological-safety

**Focused Body** (SELF): action-awareness-merging, energy-sufficiency, mind-body-coherence, physiological-regulation, rhythm-and-pacing, sensory-coherence

**Open Mind** (SELF): ambiguity-control, attention-residue-elimination, clarity-over-intensity, cognitive-load-reduction, compression-over-expansion, growth-orientation, overchoice-elimination

**Feedback Systems** (SPACE): agency-loops, feedback-density, immediate-feedback, progress-visibility, speed-of-consequence

**Optimized Tools** (SPACE): automation-of-non-creative-steps, error-cost-minimization, friction-removal, subtraction-beats-addition, tool-task-alignment

**Intentional Space** (SPACE): constraint-elegance, environmental-simplicity, interruption-control, physical-space-priming, social-field-alignment

**Ignited Curiosity** (SPIRIT): curiosity-loops, exploration-bias, intrinsic-reward-signaling, playfulness, strength-activation

**Visualized Vision** (SPIRIT): inspirational-compression, long-horizon-coherence, symbolic-meaning, vision-priming

**Grounding Values** (SPIRIT): integrity-loops, internal-alignment, meaning-stabilization, values-integration

**Empowered Role** (STORY): commitment-escalation, identity-alignment, responsibility-without-evaluation-pressure, role-clarity

**Generative Story** (STORY): identity-immersion, meaning-coherence, narrative-momentum, positive-orientation, tension-release-dynamics

**Clear Mission** (STORY): clear-goals, outcome-horizon-setting, priority-singularity, stakes-definition

---

## Important: Mechanics with Sparse Content

Some mechanic files may be thin — only a definition and a few bullet points, no full technique protocols. For these:
- Do NOT fabricate technique content
- Write the mechanic as a MOC with placeholder technique links using the format `- [[technique-slug]] — *needs content*`
- Keep whatever content exists in the Why It Enables Flow section

The goal is structural completeness (correct MOC format + technique file stubs) even for thin mechanics, not invented depth.

---

## After Phase 3: Phase 4 (Future)

Once mechanics are atomized, the next phase is running `/enrich` on each mechanic to fill out thin technique files from book and capture sources in the compendium.

Priority for enrichment: mechanics with the lowest existing technique count, in the SELF pillar first.

---

## Start Here

Read `anxiety-suppression.md` first for the quality reference. Then start with the full Tuned Emotions key — all 8 mechanics in sequence. Confirm the `_techniques/` directory structure after the first mechanic before proceeding.
