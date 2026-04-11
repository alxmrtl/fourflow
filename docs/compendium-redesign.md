# FlowCompendium Redesign — Implementation Notes & Desktop Recommendations

## What Was Implemented (Mobile)

**File:** `website/fourflowos-web/src/components/tools/training/CompendiumNavigator.tsx`

### Layout

The mobile view (below `lg` / 1024px) replaces the previous single-column scroll with a **4-row filter hierarchy + content card** pattern. The desktop view (1024px+) is preserved unchanged.

```
Row 1  ·  4 Dimension pills   — SELF  SPACE  STORY  SPIRIT
Row 2  ·  3 State pills        — with brand logo PNG + name
Row 3  ·  3 Quality pills      — with restore/maintain/concentrate icon + name + type label
Row 4  ·  Description bar      — type icon + quality name · type label + quality definition text
         ───────────────────────────────────────────────────
         Content card (rounded-t-[28px], cream background)
           [Techniques] [Concepts]  toggle              1/N
           ‹  item title in pillar color + definition    ›
           ·  dot indicator navigation  ·
```

### Key Design Decisions

**Dimension pills** — full-width row of 4 capsules. Active: filled with pillar color + shadow. Inactive: very dark neutral, 25% white text. Font: Inter Black, ALL CAPS, wide tracking. No logo (too small at this width — logos live in the state row instead).

**State pills** — 3 equal vertical cards. Top: brand PNG logo (`mix-blend-mode: screen`, dims to 30% opacity when inactive, 95% when active). Bottom: state name in sentence case. Active: pillar color at 80% opacity.

**Quality pills** — 3 equal vertical cards. Top: FlowStation SVG icon (restore/maintain/concentrate). Middle: quality name in ALL CAPS. Bottom: type label in 7px uppercase. Always shown in Restore → Maintain → Concentrate order (index 0/1/2), matching the existing `CardDetailModal` labelling convention.

**Description bar** — full-width rounded tile in active pillar color at 80%. Left: type icon in small rounded square. Right: `{quality name} · {type}` in small caps + description text in 12px semibold white.

**Content card** — cream background `#F6F3EF`, `rounded-t-[28px]`. Takes `min-h-[48vh]` + flex growth to fill remaining space. TECHNIQUES / CONCEPTS toggle uses the dark-pill segmented control. ‹ › arrows positioned absolute left/right at 50% vertical. Dot indicators at bottom for position awareness (dots are tappable). "Read full entry" link opens the existing `CardDetailModal` for items that have `has_content === true`.

**Typography** — ALL CAPS on dimensions + quality names + quality type labels + tab labels + item type label. Sentence case on state names and item titles. No serifs anywhere in the mobile UI.

### Brand Assets Used

```
/assets/LOGOS/SELF - Section Logo.png       → state row (when SELF active)
/assets/LOGOS/SPACE - Section Logo.png      → state row (when SPACE active)
/assets/LOGOS/STORY - Section Logo.png      → state row (when STORY active)
/assets/LOGOS/SPIRIT - Section Logo.png     → state row (when SPIRIT active)
/assets/LOGOS/TUNED EMOTIONS.png            → state pill
/assets/LOGOS/FOCUSED BODY.png              → state pill
/assets/LOGOS/OPEN MIND.png                 → state pill
/assets/LOGOS/INTENTIONAL SPACE.png         → state pill
/assets/LOGOS/OPTIMIZED TOOLS.png           → state pill
/assets/LOGOS/FEEDBACK SYSTEMS.png          → state pill
/assets/LOGOS/GENERATIVE STORY.png          → state pill
/assets/LOGOS/CLEAR MISSION.png             → state pill
/assets/LOGOS/EMPOWERED ROLE.png            → state pill
/assets/LOGOS/GROUNDING VALUES.png          → state pill
/assets/LOGOS/IGNITED CURIOSITY.png         → state pill
/assets/LOGOS/VISUALIZED VISION.png         → state pill
```

All logos rendered with `mix-blend-mode: screen` — correct for white/colored PNGs on dark backgrounds.

### SVG Icons Added

Three new icons from FlowStation, added as React components:

| Component | Shape | Represents |
|-----------|-------|------------|
| `RestoreIcon` | Curved undo arrow | Restore quality |
| `MaintainIcon` | Dual cycling arrows | Maintain quality |
| `ConcentrateIcon` | Funnel pointing down | Concentrate quality |

`QualityTypeIcon` wraps all three behind a `type` prop. Also used inside `QualityBar` on desktop (small, at 40% opacity beside the expand button) — this adds type context to the desktop view without disrupting it.

### Responsive Split

```tsx
<div className="lg:hidden -mx-4">   {/* Mobile UI */}
<div className="hidden lg:block">   {/* Desktop UI */}
```

The `-mx-4` on mobile breaks out of TrainingApp's `px-4` container padding, giving the filter rows and content card full viewport width.

---

## Desktop Recommendations

The desktop view (`hidden lg:block`) is preserved as-is but has one fix already applied: **dimension labels now use `font-sans font-black`** instead of `font-display` (the serif heading font). This brings them in line with the mobile design.

The following changes are recommended to fully align desktop aesthetics with the new mobile direction.

### 1. Add quality type icons to the desktop quality bars

Already partially done — `QualityTypeIcon` is now rendered at 40% opacity beside the expand button in `QualityBar`. Consider making it slightly more prominent:

```tsx
// Current (40% opacity, small)
<QualityTypeIcon type={qualType} className="w-3 h-3 opacity-40" />

// Recommended: add type label below the bar title
<span className="text-[8px] uppercase tracking-widest opacity-30 flex items-center gap-1">
  <QualityTypeIcon type={qualType} className="w-2.5 h-2.5" />
  {qualType}
</span>
```

### 2. Restore → Maintain → Concentrate order guarantee

Currently qualities within a flow key are sorted by `enrichment_score` descending. This works as long as the sync process consistently assigns scores such that restore > maintain > concentrate. A more robust approach:

**Option A (recommended):** Add a `quality_position` column (INT, 0/1/2) to the `mechanics` table in Supabase. Populate during sync. Sort by `quality_position` in the progress API query.

**Option B (quick fix):** In `scripts/sync-compendium.js`, ensure qualities are inserted/updated with enrichment scores seeded as 3/2/1 for restore/maintain/concentrate respectively if not yet enriched, so the sort order is stable.

### 3. State section headers — add type strip to desktop

The desktop state header (state logo + label + expand arrow) could benefit from a small quality-type indicator strip, mirroring the bottom quality bar from FlowStation's grid cards:

```tsx
// Below the existing state label button, before the quality bars:
<div className="flex gap-2 mb-3 ml-1">
  {mechanics.slice(0, 3).map((m, i) => (
    <span key={i} className="flex items-center gap-1 opacity-30">
      <QualityTypeIcon type={QUALITY_TYPES[i]} className="w-2.5 h-2.5" />
      <span className="text-[8px] uppercase tracking-widest">{QUALITY_TYPES[i]}</span>
    </span>
  ))}
</div>
```

### 4. Pillar header — keep sans-serif, add logo opacity fix

The pillar logo images on desktop render with `className="rounded-sm opacity-90"` — no `mix-blend-mode`. Since the desktop background is dark (`#0a0a0a` / near-black), white PNGs render fine without blend mode. No change needed.

However if the background ever becomes light, add `mix-blend-mode: multiply` for light backgrounds or `screen` for dark.

### 5. Content card cream background — extend to desktop

Currently the desktop view shows a flat dark background with the quality bars. Consider wrapping each pillar column's quality list in a subtle surface:

```tsx
<div className="rounded-2xl bg-neutral-dark/40 p-3 space-y-2">
  {mechanics.map(...)}
</div>
```

This creates visual grouping and echoes the cream card from mobile.

### 6. Typography consistency across breakpoints

| Element | Mobile | Desktop (current) | Desktop (recommended) |
|---------|--------|-------------------|-----------------------|
| Dimension label | `font-sans font-black uppercase` | `font-sans font-black uppercase` ✓ | — |
| State label | `font-semibold uppercase tracking-wider` | `font-semibold uppercase tracking-wider` ✓ | — |
| Quality name | `font-medium` | `font-medium` | Consider `font-semibold` to match mobile emphasis |
| Quality type | `text-[7px] uppercase tracking-widest` | not shown | Add as recommended above |

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/tools/training/CompendiumNavigator.tsx` | Full mobile UI added; desktop preserved with sans-serif dimension labels + quality type icons |

## Files Unchanged

| File | Notes |
|------|-------|
| `src/components/tools/training/CardDetailModal.tsx` | Reused as-is for mobile "Read full entry" |
| `src/components/tools/training/TrainingApp.tsx` | No changes needed |
| `src/app/train/page.tsx` | No changes needed |
| `src/app/api/train/progress/route.ts` | No changes needed |
