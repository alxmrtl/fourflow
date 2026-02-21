---
title: "FourFlow Reading Knowledge Base"
tags:
  - dashboard
---

# FourFlow Reading Knowledge Base

> 52 books to deepen the 12 Flow Keys across the year.

## Reading Progress

| Pillar | Flow Key | Books Target | Completed | Progress |
|--------|----------|--------------|-----------|----------|
| SELF | Tuned Emotions | 4 | 0 | ░░░░ |
| SELF | Open Mind | 4 | 0 | ░░░░ |
| SELF | Focused Body | 4 | 0 | ░░░░ |
| SPACE | Feedback Systems | 4 | 0 | ░░░░ |
| SPACE | Optimized Tools | 4 | 0 | ░░░░ |
| SPACE | Intentional Setting | 4 | 0 | ░░░░ |
| STORY | Generative Story | 4 | 0 | ░░░░ |
| STORY | Clear Mission | 4 | 0 | ░░░░ |
| STORY | Empowered Role | 4 | 0 | ░░░░ |
| SPIRIT | Visualized Vision | 4 | 0 | ░░░░ |
| SPIRIT | Grounding Values | 4 | 0 | ░░░░ |
| SPIRIT | Ignited Curiosity | 4 | 0 | ░░░░ |
| **Integration** | Systems/Meta | 4 | 0 | ░░░░ |
| **TOTAL** | | **52** | **0** | |

## Quick Links

### By Pillar
- [[#SELF]] - Body, Mind, Emotions
- [[#SPACE]] - Setting, Tools, Feedback
- [[#STORY]] - Mission, Role, Narrative
- [[#SPIRIT]] - Vision, Values, Curiosity

### Active Reading
```dataview
TABLE author, pillar, status
FROM "content/reading-knowledge/books"
WHERE status = "reading"
```

### Recently Completed
```dataview
TABLE author, pillar, date_completed
FROM "content/reading-knowledge/books"
WHERE status = "processed"
SORT date_completed DESC
LIMIT 5
```

---

## SELF

> "What am I doing now?" - Physical vitality, mental clarity, emotional resilience.

### Tuned Emotions
Regulates affect to keep attention stable under demand.
- [[Challenge-skill calibration]]
- [[Emotional neutrality]]
- [[Error tolerance]]
- [[Anxiety suppression]]
- [[Effort-reward coupling]]
- [[Psychological safety]]
- [[Outcome detachment]]
- [[Ego monitoring removal]]

**Books:**
<!-- Add book links as you read them -->

### Open Mind
Controls cognitive bandwidth and belief structures.
- [[Cognitive load reduction]]
- [[Growth orientation]]
- [[Overchoice elimination]]
- [[Ambiguity control]]
- [[Attention residue elimination]]
- [[Clarity over intensity]]
- [[Compression over expansion]]

**Books:**
<!-- Add book links as you read them -->

### Focused Body
Uses physiology to stabilize attention.
- [[Physiological regulation]]
- [[Energy sufficiency]]
- [[Mind-body coherence]]
- [[Sensory coherence]]
- [[Rhythm and pacing]]
- [[Action-awareness merging]]

**Books:**
<!-- Add book links as you read them -->

---

## SPACE

> "What supports your flow?" - Environment, tools, feedback systems.

### Feedback Systems
Provides external signals that guide correction.
- [[Immediate feedback]]
- [[Feedback density]]
- [[Progress visibility]]
- [[Agency loops]]
- [[Speed of consequence]]

**Books:**
<!-- Add book links as you read them -->

### Optimized Tools
Reduces interface friction between intent and action.
- [[Friction removal]]
- [[Tool-task alignment]]
- [[Subtraction beats addition]]
- [[Automation of non-creative steps]]
- [[Error cost minimization]]

**Books:**
<!-- Add book links as you read them -->

### Intentional Setting
Designs context to protect focus.
- [[Environmental simplicity]]
- [[Interruption control]]
- [[Constraint elegance]]
- [[Social field alignment]]
- [[Physical space priming]]

**Books:**
<!-- Add book links as you read them -->

---

## STORY

> "What are you building?" - Mission, role, narrative momentum.

### Generative Story
Creates narrative momentum that sustains effort.
- [[Narrative momentum]]
- [[Positive orientation]]
- [[Meaning coherence]]
- [[Identity immersion]]
- [[Tension-release dynamics]]

**Books:**
<!-- Add book links as you read them -->

### Clear Mission
Directs attention toward a single outcome vector.
- [[Clear goals]]
- [[Stakes definition]]
- [[Priority singularity]]
- [[Outcome horizon setting]]

**Books:**
<!-- Add book links as you read them -->

### Empowered Role
Establishes ownership without performance pressure.
- [[Role clarity]]
- [[Identity alignment]]
- [[Commitment escalation]]
- [[Responsibility without evaluation pressure]]

**Books:**
<!-- Add book links as you read them -->

---

## SPIRIT

> "What drives you?" - Vision, values, curiosity.

### Visualized Vision
Acts as a long-range attentional attractor.
- [[Vision priming]]
- [[Long-horizon coherence]]
- [[Inspirational compression]]
- [[Symbolic meaning]]

**Books:**
<!-- Add book links as you read them -->

### Grounding Values
Stabilizes action through internal consistency.
- [[Values integration]]
- [[Internal alignment]]
- [[Integrity loops]]
- [[Meaning stabilization]]

**Books:**
<!-- Add book links as you read them -->

### Ignited Curiosity
Supplies intrinsic energy for sustained focus.
- [[Intrinsic reward signaling]]
- [[Curiosity loops]]
- [[Strength activation]]
- [[Playfulness]]
- [[Exploration bias]]

**Books:**
<!-- Add book links as you read them -->

---

## Processing Workflow

1. **Dump**: Put raw notes in `raw/[book-title]-raw.md`
2. **Process**: Run `/process-book [book-title]` to extract and organize
3. **Review**: Check generated book note and mechanic updates
4. **Link**: Add any additional cross-references

---

## Stats

### Mechanics Coverage
```dataview
TABLE WITHOUT ID
  flow_keys[0] as "Flow Key",
  length(rows) as "Books Touching"
FROM "content/reading-knowledge/books"
WHERE status = "processed"
GROUP BY flow_keys[0]
```

### Concepts Discovered
```dataview
LIST
FROM "content/reading-knowledge/concepts"
SORT file.ctime DESC
```
