# FourFlowOS Compendium — Phase 3 Cleanup Prompt

## Context

A major architectural refactor was completed in the previous session. The compendium has been physically reorganized but several files still carry stale vocabulary. This prompt provides everything needed to complete the 6 remaining cleanup tasks.

---

## Architecture Summary (read before starting)

The FourFlowOS compendium uses a 5-level hierarchy. Each level is governed by one First Principle:

```
SOUL                          — Default Is Open
  └── Dimension ×4            — Direction Precedes Force
        └── State ×12         — Coherence Is the Mechanism
              ├── Restore Quality ×12    — Default Is Open (echo)
              ├── Maintain Quality ×12   — Loops Close Gaps
              └── Concentrate Quality ×12 — Compression Concentrates Signal
                    ├── Technique  (the HOW — atomic protocol)
                    └── Concept    (the WHY — external science/philosophy)
```

**Vocabulary that changed:**
- "Flow Key" → **State**
- "Mechanic" → **Quality**
- "Pillar" → **Dimension** (in documentation; directory names SELF/SPACE/STORY/SPIRIT unchanged)

**The 36 Qualities (all renamed from old mechanic slugs):**

| State | Restore | Maintain | Concentrate |
|-------|---------|----------|-------------|
| Tuned Emotions | quiet | fueled | calibrated |
| Focused Body | grounded | attuned | unified |
| Open Mind | spacious | provisional | undivided |
| Intentional Space | simplified | protected | cued |
| Optimized Tools | lean | matched | frictionless |
| Feedback Systems | honest | immediate | visible |
| Generative Story | expansive | continuous | true |
| Clear Mission | consequential | bounded | singular |
| Empowered Role | aligned | defined | owned |
| Grounding Values | congruent | constant | generative |
| Ignited Curiosity | exploratory | compounding | alive |
| Visualized Vision | compelling | proximate | clear |

**Old mechanic slug → New quality slug (full mapping):**

SELF/Tuned-Emotions:
- `anxiety-suppression` → `quiet` (Restore)
- `effort-reward-coupling` → `fueled` (Maintain)
- `challenge-skill-calibration` → `calibrated` (Concentrate)

SELF/Focused-Body:
- `physiological-regulation` → `grounded` (Restore)
- `sensory-coherence` → `attuned` (Maintain)
- `mind-body-coherence` → `unified` (Concentrate)

SELF/Open-Mind:
- `cognitive-load-reduction` → `spacious` (Restore)
- `growth-orientation` → `provisional` (Maintain)
- `attention-residue-elimination` → `undivided` (Concentrate)

SPACE/Feedback-Systems:
- `agency-loops` → `honest` (Restore)
- `immediate-feedback` → `immediate` (Maintain)
- `progress-visibility` → `visible` (Concentrate)

SPACE/Intentional-Space:
- `environmental-simplicity` → `simplified` (Restore)
- `interruption-control` → `protected` (Maintain)
- `physical-space-priming` → `cued` (Concentrate)

SPACE/Optimized-Tools:
- `subtraction-beats-addition` → `lean` (Restore)
- `tool-task-alignment` → `matched` (Maintain)
- `friction-removal` → `frictionless` (Concentrate)

STORY/Generative-Story:
- `positive-orientation` → `expansive` (Restore)
- `narrative-momentum` → `continuous` (Maintain)
- `identity-immersion` → `true` (Concentrate)

STORY/Clear-Mission:
- `stakes-definition` → `consequential` (Restore)
- `outcome-horizon-setting` → `bounded` (Maintain)
- `priority-singularity` → `singular` (Concentrate)

STORY/Empowered-Role:
- `identity-alignment` → `aligned` (Restore)
- `role-clarity` → `defined` (Maintain)
- `commitment-escalation` → `owned` (Concentrate)

SPIRIT/Grounding-Values:
- `internal-alignment` → `congruent` (Restore)
- `values-integration` → `constant` (Maintain)
- `meaning-stabilization` → `generative` (Concentrate)

SPIRIT/Ignited-Curiosity:
- `exploration-bias` → `exploratory` (Restore)
- `curiosity-loops` → `compounding` (Maintain)
- `intrinsic-reward-signaling` → `alive` (Concentrate)

SPIRIT/Visualized-Vision:
- `vision-priming` → `compelling` (Restore)
- `long-horizon-coherence` → `proximate` (Maintain)
- `inspirational-compression` → `clear` (Concentrate)

**Moved to `_techniques/` (26 files):**
Tuned Emotions: `ego-monitoring-removal`, `emotional-neutrality`, `error-tolerance`, `outcome-detachment`
Focused Body: `energy-sufficiency`, `rhythm-and-pacing`, `action-awareness-merging`
Open Mind: `compression-over-expansion`, `overchoice-elimination`, `clarity-over-intensity`, `ambiguity-control`
Feedback Systems: `speed-of-consequence`, `feedback-density`
Intentional Space: `constraint-elegance`, `social-field-alignment`
Optimized Tools: `automation-of-non-creative-steps`, `error-cost-minimization`
Generative Story: `tension-release-dynamics`, `meaning-coherence`
Clear Mission: `clear-goals`
Empowered Role: `responsibility-without-evaluation-pressure`
Grounding Values: `integrity-loops`
Ignited Curiosity: `playfulness`, `strength-activation`
Visualized Vision: `symbolic-meaning`

**Moved to `_concepts/` (1 file):**
Tuned Emotions: `psychological-safety` (Edmondson's external research framework)

---

## Task 1: Quality File Frontmatter (36 files)

**Problem:** All 36 quality files still have OLD frontmatter from their previous mechanic identity.

**Current state (example — `quiet.md`):**
```yaml
---
title: "Anxiety Suppression"
pillars:
  - self
flow_keys:
  - tuned-emotions
keywords:
  - arousal
  - threat
  ...
definition: "..."
tags:
  - type/mechanic
---
```

**Target state:**
```yaml
---
title: "Quiet"
dimension: self
state: tuned-emotions
quality_type: restore
keywords:
  - arousal
  - threat
  ...
definition: "..."
tags:
  - type/quality
---
```

**Rules:**
- `title`: use the new quality name (capitalized single word, e.g. "Quiet", "Fueled", "Calibrated")
- `dimension`: lowercase dimension name (`self`, `space`, `story`, `spirit`)
- `state`: lowercase hyphenated state name (`tuned-emotions`, `focused-body`, etc.)
- `quality_type`: one of `restore`, `maintain`, or `concentrate` (see mapping table above)
- `keywords`: PRESERVE the existing keywords array — do not change keyword content
- `definition`: PRESERVE the existing definition — do not change it (the old mechanic definition remains valid as the quality definition)
- `tags`: change `type/mechanic` → `type/quality`
- Remove `pillars` field (replaced by `dimension`)
- Remove `flow_keys` field (replaced by `state`)

**Files:** `compendium/framework/[DIMENSION]/[State-Name]/[quality-slug].md` for all 36 quality files.

---

## Task 2: Skill Files Vocabulary (3 files)

**Problem:** Three skill files still use "mechanic" vocabulary throughout where the new term is "quality" (or "state" for what was "flow key").

**Files to update:**
- `.claude/skills/enrich/SKILL.md`
- `.claude/skills/process-capture/SKILL.md`
- `.claude/skills/process-book/SKILL.md`

**Vocabulary replacements (apply throughout each file):**
- "mechanic" → "quality" (when referring to the 36 named items, e.g. "mechanic file" → "quality file", "target mechanic" → "target quality")
- "flow key" / "flow_key" → "state" (when referring to the 12 states)
- "flow_keys:" → "state:" (in frontmatter examples)
- "type/mechanic" → "type/quality" (in tag examples)
- "pillars:" → "dimension:" (in frontmatter examples)
- "## Related Mechanics" → "## Related Qualities" (in template sections within skill docs)
- "mechanic-slug" → "quality-slug" (in example paths/invocations)
- Keep "mechanics table" when referring to the Supabase DB table name (that's a database implementation detail, not vocabulary)

**Do NOT change:** References to the Supabase `mechanics` table name (it's a DB implementation detail). Only change the conceptual vocabulary.

**Specific invocation patterns to update in enrich/SKILL.md:**
```
# OLD:
/enrich --mechanic=effort-reward-coupling
/enrich --key=Feedback-Systems
/enrich --atomize=anxiety-suppression
/enrich --atomize-key=Tuned-Emotions

# NEW:
/enrich --quality=fueled
/enrich --state=Feedback-Systems
/enrich --atomize=quiet
/enrich --atomize-key=Tuned-Emotions
```

Also update the health doc references in enrich — `COMPENDIUM_HEALTH.md` likely uses "mechanic" terminology too, but only update the skill file's references to it, not the health doc itself (that's out of scope here).

---

## Task 3: State Overview Files (12 files)

**Problem:** State overview files still list old mechanic slug links.

**Files:**
- `compendium/framework/SELF/Tuned-Emotions/Tuned-Emotions.md`
- `compendium/framework/SELF/Focused-Body/Focused-Body.md`
- `compendium/framework/SELF/Open-Mind/Open-Mind.md`
- `compendium/framework/SPACE/Feedback-Systems/Feedback-Systems.md`
- `compendium/framework/SPACE/Intentional-Space/Intentional-Space.md`
- `compendium/framework/SPACE/Optimized-Tools/Optimized-Tools.md`
- `compendium/framework/STORY/Generative-Story/Generative-Story.md`
- `compendium/framework/STORY/Clear-Mission/Clear-Mission.md`
- `compendium/framework/STORY/Empowered-Role/Empowered-Role.md`
- `compendium/framework/SPIRIT/Grounding-Values/Grounding-Values.md`
- `compendium/framework/SPIRIT/Ignited-Curiosity/Ignited-Curiosity.md`
- `compendium/framework/SPIRIT/Visualized-Vision/Visualized-Vision.md`

**Current state (example — `Tuned-Emotions.md`):**
```markdown
## The Mechanics

- [[anxiety-suppression]] — regulate arousal when challenge tips past the flow channel
- [[challenge-skill-calibration]] — actively adjust task difficulty...
- [[effort-reward-coupling]] — keep the emotional return on investment felt...
...8 entries total with old slugs...
```

**Target state:**
```markdown
## Qualities

| Quality | Type | Core idea |
|---------|------|-----------|
| [[quiet]] | Restore | Nervous system noise removed — anxiety, ego-monitoring, emotional turbulence cleared |
| [[fueled]] | Maintain | Effort-reward loop is running — motivation compounds because the gap stays closed |
| [[calibrated]] | Concentrate | Challenge-skill ratio compressed to the flow sweet spot — neither bored nor overwhelmed |

## Techniques

- [[ego-monitoring-removal]]
- [[emotional-neutrality]]
- [[error-tolerance]]
- [[outcome-detachment]]
```

**Rules:**
- Replace "## The Mechanics" section with "## Qualities" table (3 rows, using the Restore/Maintain/Concentrate data from the architecture table)
- Add "## Techniques" section listing the technique files that live in `_techniques/` for that state
- Update frontmatter: change `key: Tuned Emotions` → `state: Tuned Emotions`, `type: key-overview` → `type: state-overview`
- Also update "## Key Concepts" → "## Concepts" if present
- Preserve the "## Why It Enables Flow" section content exactly as written
- Use Core idea text from `compendium/COMPENDIUM_INDEX.md` — it already has the right descriptions for each quality

**Technique lists per state** (from the reorganization):
- Tuned Emotions: `ego-monitoring-removal`, `emotional-neutrality`, `error-tolerance`, `outcome-detachment`
- Focused Body: `energy-sufficiency`, `rhythm-and-pacing`, `action-awareness-merging`
- Open Mind: `compression-over-expansion`, `overchoice-elimination`, `clarity-over-intensity`, `ambiguity-control`
- Feedback Systems: `speed-of-consequence`, `feedback-density`
- Intentional Space: `constraint-elegance`, `social-field-alignment`
- Optimized Tools: `automation-of-non-creative-steps`, `error-cost-minimization`
- Generative Story: `tension-release-dynamics`, `meaning-coherence`
- Clear Mission: `clear-goals`
- Empowered Role: `responsibility-without-evaluation-pressure`
- Grounding Values: `integrity-loops`
- Ignited Curiosity: `playfulness`, `strength-activation`
- Visualized Vision: `symbolic-meaning`

---

## Task 4: Technique File Frontmatter (26 files in `_techniques/`)

**Problem:** Technique files have frontmatter pointing to old mechanic slugs.

**Current state (example — `ego-monitoring-removal.md`):**
```yaml
---
title: "Ego Monitoring Removal"
pillars:
  - self
flow_keys:
  - tuned-emotions
keywords:
  - self-consciousness
  - evaluation
  ...
tags:
  - type/technique
---
```
Some technique files may also have a `mechanic: "[[anxiety-suppression]]"` field.

**Target state:**
```yaml
---
title: "Ego Monitoring Removal"
dimension: self
state: tuned-emotions
quality: "[[quiet]]"
keywords:
  - self-consciousness
  - evaluation
  ...
tags:
  - type/technique
---
```

**Rules:**
- `dimension`: lowercase (`self`, `space`, `story`, `spirit`)
- `state`: lowercase hyphenated state name
- `quality`: wikilink to the parent quality slug (use the mapping table above to find which quality "owns" each technique — techniques belong to the quality they were moved out from)
- Remove `pillars` field
- Remove `flow_keys` field
- If `mechanic:` field exists, rename to `quality:` and update the slug to the new quality slug
- Preserve `title`, `keywords`, `tags` exactly

**Quality ownership** (which quality each technique belongs to — for the `quality:` field):
- ego-monitoring-removal → `[[quiet]]` (was inside anxiety-suppression)
- emotional-neutrality → `[[quiet]]`
- error-tolerance → `[[quiet]]`
- outcome-detachment → `[[fueled]]`
- energy-sufficiency → `[[grounded]]`
- rhythm-and-pacing → `[[attuned]]`
- action-awareness-merging → `[[unified]]`
- compression-over-expansion → `[[spacious]]`
- overchoice-elimination → `[[spacious]]`
- clarity-over-intensity → `[[provisional]]`
- ambiguity-control → `[[provisional]]`
- speed-of-consequence → `[[immediate]]`
- feedback-density → `[[visible]]`
- constraint-elegance → `[[simplified]]`
- social-field-alignment → `[[protected]]`
- automation-of-non-creative-steps → `[[frictionless]]`
- error-cost-minimization → `[[lean]]`
- tension-release-dynamics → `[[expansive]]`
- meaning-coherence → `[[continuous]]`
- clear-goals → `[[singular]]`
- responsibility-without-evaluation-pressure → `[[owned]]`
- integrity-loops → `[[congruent]]`
- playfulness → `[[exploratory]]`
- strength-activation → `[[alive]]`
- symbolic-meaning → `[[compelling]]`

---

## Task 5: Problem Space Index (`_index/problem-space.md`)

**File:** `compendium/framework/_index/problem-space.md`

**Problem:** All mechanic references use old slugs. Every `[[old-mechanic-slug]]` needs to be updated to the new quality slug using the mapping table above.

**Example:**
```markdown
# OLD:
- [[anxiety-suppression]] — the primary mechanic; re-patterning transforms...
- [[challenge-skill-calibration]] — sometimes the anxiety is accurate...

# NEW:
- [[quiet]] — the primary quality; re-patterning transforms...
- [[calibrated]] — sometimes the anxiety is accurate...
```

**Rules:**
- Update every wikilink `[[old-slug]]` → `[[new-slug]]` using the full mapping table above
- Update inline text that refers to old mechanic names (e.g., "the anxiety-suppression mechanic" → "the quiet quality")
- The `[[fear-as-excitement-reframe]]` and `[[challenge-skills-balance]]` and `[[distraction-log]]` references are techniques or concepts — check if they still exist in `_techniques/` or `_concepts/` subdirectories; if not, note them for removal
- Preserve all explanatory text and section structure — only update the slugs and any mechanic name references in running text

---

## Task 6: Training Platform Sync Script

**File:** `website/fourflowos-web/scripts/sync-compendium.js`

**Problem:** The sync script identifies card types by tags. It currently reads `type/mechanic` → cardType `'mechanic'`. Now quality files are tagged `type/quality`. Several field names in frontmatter have also changed.

**Changes needed:**

**1. Card type recognition** (in `processMarkdownFile` function):
```javascript
// OLD:
const isMechanic = tags.includes('type/mechanic');
const cardType = isMechanic ? 'mechanic' : isTechnique ? 'technique' : 'concept';

// NEW:
const isMechanic = tags.includes('type/mechanic') || tags.includes('type/quality');
const isQuality = tags.includes('type/quality');
const cardType = isQuality ? 'quality' : isMechanic ? 'mechanic' : isTechnique ? 'technique' : 'concept';
```
Note: support both `type/mechanic` and `type/quality` during transition, but prefer `type/quality`.

**2. Flow key / state field reading** (in `processMarkdownFile` function):
The `flow_key` DB column is populated from frontmatter. Old files had `flow_keys: [tuned-emotions]`. New quality files have `state: tuned-emotions`. The script currently derives `flowKey` from the directory name (`keyDir.toLowerCase()`), which still works correctly — this doesn't need changing. But verify the `flow_key` field in the returned row still uses the directory-derived value (it does, via the parameter).

**3. Parent quality link for techniques** (in `extractParentMechanic` function):
```javascript
// OLD:
function extractParentMechanic(frontmatter) {
  const raw = frontmatter.mechanic;
  ...
}

// RENAME to extractParentQuality and update:
function extractParentQuality(frontmatter) {
  const raw = frontmatter.quality || frontmatter.mechanic; // support both during transition
  if (!raw) return null;
  const match = String(raw).match(/\[\[([^\]]+)\]\]/);
  return match ? match[1] : null;
}
```

Update call site:
```javascript
// OLD:
parent_mechanic_id: isTechnique ? extractParentMechanic(frontmatter) : null,

// NEW:
parent_mechanic_id: isTechnique ? extractParentQuality(frontmatter) : null,
```

**4. Log message update** (cosmetic):
```javascript
// OLD:
console.log(`Found ${mechanics.length} mechanics\n`);
console.log(`  ${mechanicRows.length} mechanics, ...`);

// NEW:
console.log(`Found ${mechanics.length} cards\n`);
console.log(`  ${mechanicRows.length} qualities, ...`);
```

**5. Variable name cleanup** (optional but clean):
The variable `mechanics` (the array of all cards) is a historical name — can rename to `cards` or leave as-is. The Supabase table is still called `mechanics` — do not rename that.

---

## Verification Steps

After completing all 6 tasks:

1. **Quick frontmatter check**: Read one quality file (e.g., `quiet.md`) — confirm it has `title: "Quiet"`, `dimension: self`, `state: tuned-emotions`, `quality_type: restore`, `tags: [type/quality]`

2. **State overview check**: Read `Tuned-Emotions.md` — confirm it has a Qualities table (3 rows) and a Techniques list, not a Mechanics list

3. **Technique frontmatter check**: Read `ego-monitoring-removal.md` — confirm it has `quality: "[[quiet]]"`, no `mechanic:` field, no `flow_keys:` or `pillars:` fields

4. **Problem space check**: Search `problem-space.md` for `[[anxiety-suppression]]` — should return no matches

5. **Sync script check**: Confirm `processMarkdownFile` handles `type/quality` tag and `extractParentQuality` reads from `quality:` field

---

## Files to NOT Touch

- `compendium/foundations/architecture.md` — already correct (written this session)
- `compendium/foundations/first-principles.md` — already correct (updated this session)
- `compendium/COMPENDIUM_INDEX.md` — already correct (updated this session)
- `CLAUDE.md` — already correct (updated this session)
- Quality file BODY CONTENT — do not rewrite the actual content of quality files; only update frontmatter
- Technique file BODY CONTENT — do not rewrite; only update frontmatter
- `COMPENDIUM_HEALTH.md` — out of scope for this session; mechanic vocabulary in the health doc is acceptable for now
- `compendium/framework/_concepts/soul.md` — cross-pillar concept, not affected
- `compendium/framework/_templates/` — template files; update vocabulary if they contain "mechanic" in labels, but these are low priority
