# Training Platform — Sprint 2 Handoff

_Context for a new session. Read this fully before touching any code._

---

## Where Sprint 1 Left Off

The `/train` route is live and deployed. Auth-gated, noindex. SRS loop works end-to-end: queue loads, cards flip, SM-2 updates fire to Supabase. TypeScript clean, build passes.

**To activate (if not done yet — one-time setup):**
1. Run `website/fourflowos-web/scripts/training_tables.sql` in Supabase SQL Editor
2. Run `node website/fourflowos-web/scripts/sync-compendium.js` from the website directory

**What's in Supabase after sync:** 62 mechanics with title, pillar, flow_key, definition, content_md, enrichment_score.

**Key file locations:**
- `/train` page: `website/fourflowos-web/src/app/train/page.tsx`
- Card UI: `website/fourflowos-web/src/components/tools/training/MechanicCard.tsx`
- Sync script: `website/fourflowos-web/scripts/sync-compendium.js`
- Mechanic files: `compendium/framework/[PILLAR]/[Flow-Key]/[mechanic].md`
- Supabase migration: `website/fourflowos-web/scripts/training_tables.sql`

---

## The Core Feedback

> "The compendium, in its current format, is not really made for quick recall for each mechanism. For it to really hit, we need a distilled version of every card — otherwise it's hard to know 'what' to recall. The content itself needs more of an overhaul or better organization for it to really hit."

**The problem precisely:** When you flip a card and see the full mechanic handbook, you get a wall of text: multiple technique sections, neuroscience citations, book sources, related mechanics. That's a great reference document. It's a terrible flashcard answer. You don't know whether to recall the definition, the technique names, the underlying mechanism, or the practical steps. Without a clear target, the rating ("Missed / Got it / Nailed it") is meaningless.

A good flashcard has a **crisp, bounded answer** — the thing you're trying to hold in memory. Everything else is commentary.

---

## The Solution: A `## Recall` Section in Each Mechanic File

Add a new `## Recall` section to every mechanic file. This is the canonical "what to know" — the distilled card back, written for recall not reference.

**Structure (3–5 lines max):**
```markdown
## Recall

**Hook:** One memorable sentence — the core insight that makes this mechanic click.
**Mechanism:** Why it enables flow, in one sentence.
**Anchor:** [Technique Name] — what it is in one line.
**Links:** mechanic-a · mechanic-b
```

Example for `anxiety-suppression`:
```markdown
## Recall

**Hook:** Anxiety closes the heart — the inside-out shift reopens it.
**Mechanism:** Pattern transformation (not suppression) returns the nervous system to the open, trusting state flow requires.
**Anchor:** Disturbance Log → note what takes you out of calm; use as material for re-patterning sessions.
**Links:** psychological-safety · ego-monitoring-removal · physiological-regulation
```

**Why this approach:**
- Small addition to existing file structure — doesn't break anything
- Fast to write: 10–15 min per mechanic once you know the content
- Sync script extracts it into a `recall_md` column in the `mechanics` table
- Card back shows `recall_md` by default → crisp, focused
- "Show full handbook" expand reveals the existing rich content for deep study
- Mechanics without a `## Recall` section gracefully fall back to definition only

---

## What Needs to Be Built

### Part A — Content (compendium side)

Write `## Recall` sections for the 18 richest mechanics first (score 4–5 in `compendium/COMPENDIUM_HEALTH.md`). These are the ones with enough content to distill.

**Score 5 (6 mechanics — start here):**
- `SELF/Tuned-Emotions/anxiety-suppression.md`
- `SELF/Tuned-Emotions/effort-reward-coupling.md`
- `SELF/Tuned-Emotions/ego-monitoring-removal.md`
- `SELF/Tuned-Emotions/emotional-neutrality.md`
- `SELF/Tuned-Emotions/psychological-safety.md`
- `SELF/Focused-Body/energy-sufficiency.md`
- `SELF/Focused-Body/physiological-regulation.md`

_(Note: COMPENDIUM_HEALTH.md may be slightly stale — several score-1 mechanics have been enriched since. Check the actual file content before writing recall sections. `outcome-detachment.md` is a known example — it's rich but listed as score 1.)_

**Score 4 (check actual file content for real richness):**
- `SELF/Tuned-Emotions/challenge-skill-calibration.md`
- `SELF/Tuned-Emotions/error-tolerance.md`
- `SELF/Focused-Body/action-awareness-merging.md`
- `SELF/Open-Mind/cognitive-load-reduction.md`
- `SPACE/Intentional-Space/environmental-simplicity.md`
- `SPIRIT/Grounding-Values/integrity-loops.md`
- `SPIRIT/Visualized-Vision/vision-priming.md`
- `STORY/Clear-Mission/clear-goals.md`
- `STORY/Generative-Story/meaning-coherence.md`
- `STORY/Generative-Story/narrative-momentum.md`
- `SPIRIT/Ignited-Curiosity/intrinsic-reward-signaling.md`

For stub mechanics (score 1, definition only): do NOT invent `## Recall` sections. Leave them without one. The card will show the definition and a note: "Recall section coming — this mechanic is awaiting enrichment."

### Part B — Sync Script Update

Add `recall_md` column extraction to `sync-compendium.js`:

```javascript
function extractRecall(body) {
  const section = body.match(/## Recall\n\n?([\s\S]*?)(?=\n##|$)/);
  if (!section) return null;
  return section[1].trim() || null;
}
```

Add `recall_md text` column to the `mechanics` table (new SQL to run in Supabase):
```sql
alter table mechanics add column if not exists recall_md text;
```

Update the upsert in `sync-compendium.js` to include `recall_md: extractRecall(body)`.

### Part C — Card UI Update (`MechanicCard.tsx`)

Redesign the card back to show `recall_md` as the primary content:

**Card back layout:**
1. Pillar badge + key + title (same as front — anchors the card)
2. `recall_md` rendered (if present) — styled clearly, generous whitespace, each line a distinct block
3. If no `recall_md`: just the definition, styled as a blockquote, with "Recall section coming" note
4. Subtle divider: "─── Full handbook ───"
5. Expand button: "Read full content ↓" — toggle that reveals `content_md` (the existing rich render)
6. Rating buttons (Missed / Got it / Nailed it)

**Recall section rendering:** The `## Recall` content uses `**Hook:**`, `**Mechanism:**`, `**Anchor:**`, `**Links:**` bold labels. Render each as its own visual block — label in muted color, content prominent. NOT a wall of prose.

```
[ Hook ]          ← most prominent, largest
[ Mechanism ]     ← second
[ Anchor ]        ← practical handle
[ Links ]         ← small chips linking to related mechanics
```

### Part D — Database Column

Run in Supabase SQL Editor (before re-running the sync script):
```sql
alter table mechanics add column if not exists recall_md text;
```

---

## Recall Section Format — Reference

Write for a person who already knows the mechanic name and is testing whether they can reconstruct the insight. The goal is not to explain — it's to give them the cleanest possible "yes, that's it" moment when they flip the card.

**Hook:** Should be surprising or precise enough to be memorable. Not a restatement of the definition. The "aha" sentence.

**Mechanism:** The causal chain — what physiologically/psychologically happens when this mechanic is active. One sentence. Links to neuroscience if present in the content.

**Anchor:** The one technique or practice they should be able to name and roughly describe. If there are 4+ techniques, pick the most universal / highest-leverage one.

**Links:** 2–3 mechanic slugs that are direct prerequisites or companions. Keep them as slugs (lowercase-with-hyphens), space-separated with `·` between.

---

## What Done Looks Like

- [ ] `recall_md` column added to Supabase `mechanics` table
- [ ] `## Recall` sections written for 18+ richest mechanics
- [ ] Sync script updated to extract `recall_md`
- [ ] Sync script re-run → `recall_md` populated in DB for enriched mechanics
- [ ] `MechanicCard.tsx` redesigned: recall section prominent on card back, full content collapsible
- [ ] Card back renders `recall_md` line-by-line (not prose blob), with visual hierarchy
- [ ] Fallback for mechanics without `recall_md`: definition only + "content coming" note
- [ ] Rate a card, verify SM-2 still works (no regressions)

---

## Open Question

Should the `/train` route also surface a link to the full mechanic page once they exist? No decision needed yet — hold for Horizon 3 (public compendium surface). Don't build it now.

---

## Files to Read Before Starting

1. `compendium/COMPENDIUM_HEALTH.md` — current enrichment status (may be slightly stale)
2. `compendium/framework/SELF/Tuned-Emotions/anxiety-suppression.md` — example of a rich mechanic
3. `compendium/framework/SELF/Open-Mind/attention-residue-elimination.md` — example of a stub
4. `website/fourflowos-web/src/components/tools/training/MechanicCard.tsx` — card UI to redesign
5. `website/fourflowos-web/scripts/sync-compendium.js` — sync script to update
6. `website/fourflowos-web/scripts/training_tables.sql` — for reference on existing schema
