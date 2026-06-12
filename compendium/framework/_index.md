# FourFlow Compendium

One source of encyclopedic truth for the FourFlow framework. Organized by Dimension → Key → Quality → Technique (canonical vocabulary: `compendium/foundations/lexicon.md`). New information enters via `_source/` folders and gets processed upward.

## Structure

```
compendium/
├── _index.md          ← this file
├── _templates/        ← templates for new qualities, techniques, books, concepts
├── _concepts/         ← cross-cutting concepts and book summaries
├── _source/           ← top-level raw input (book raws, etc.)
│
├── SELF/              ← Reception Layer (#FF6F61)
├── SPACE/             ← Transmission Layer (#6BA292)
├── STORY/             ← Temporal Direction (#5B84B1)
└── SPIRIT/            ← Timeless Direction (#7A4DA4)
```

Each Key folder contains:
- `Key-Name.md` — living encyclopedia entry (frontmatter + quality index + full content)
- `[quality].md` — the Key's 3 Quality files (Restore / Maintain / Concentrate)
- `_techniques/` — atomic technique protocols
- `_concepts/` — archived external-science references
- `_source/` — raw research, book extracts, external input (process → promote)

## The Four Dimensions

| Dimension | Function | Question |
|-----------|----------|---------|
| [[SELF/SELF]] | Reception Layer | Can I receive alignment signals? |
| [[SPACE/SPACE]] | Transmission Layer | Is my environment supporting signal flow? |
| [[STORY/STORY]] | Temporal Direction | Where am I in the arc? What am I aiming at? |
| [[SPIRIT/SPIRIT]] | Timeless Direction | What is always true for me? |

## The 12 Keys

### SELF
- [[SELF/Tuned-Emotions/Tuned-Emotions]] — emotional navigation, challenge-skills balance
- [[SELF/Focused-Body/Focused-Body]] — somatic readiness, physical coherence
- [[SELF/Open-Mind/Open-Mind]] — cognitive clarity, low-friction thinking

### SPACE
- [[SPACE/Feedback-Systems/Feedback-Systems]] — real-time feedback loops
- [[SPACE/Intentional-Space/Intentional-Space]] — physical and social field design
- [[SPACE/Optimized-Tools/Optimized-Tools]] — friction reduction, tool-task fit

### STORY
- [[STORY/Generative-Story/Generative-Story]] — narrative momentum, meaning coherence
- [[STORY/Clear-Mission/Clear-Mission]] — singular goals, clear targets
- [[STORY/Empowered-Role/Empowered-Role]] — ownership, identity alignment

### SPIRIT
- [[SPIRIT/Grounding-Values/Grounding-Values]] — values coherence, integrity
- [[SPIRIT/Ignited-Curiosity/Ignited-Curiosity]] — intrinsic drive, playfulness
- [[SPIRIT/Visualized-Vision/Visualized-Vision]] — long-horizon vision, symbolic meaning

## Processing Workflow

1. New input (book, article, X thread, research) → drop into the relevant Key's `_source/`
2. Process: enrich the relevant Quality file, or add a Technique to `_techniques/`
3. Synthesize: update the Key overview `.md` with new insight, add wikilinks
4. Cross-link related Qualities/Techniques across Keys where relevant
