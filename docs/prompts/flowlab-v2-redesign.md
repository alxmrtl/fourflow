# FlowLab v2 — /me Page Redesign

## What This Session Is

This is an implementation session. The /me page of `website/fourflowos-web/` is being redesigned based on user feedback on the current build. No planning needed — build directly.

---

## Background: What Currently Exists

`/me` renders `FlowLab` — a component with a mandatory breath ritual entry, then four animated frequency fields (CONSUME / CREATE / CATALYZE / CORE) as full-screen clickable blocks, then a tool renders inside the page.

**The problem**: Too much clicking. User can feel lost. Breath ritual as mandatory gate is too much friction. The frequency fields as primary UI don't show the user what's actually available to them.

The current components live at:
```
src/components/lab/
  FlowLab.tsx          ← root container (replace this)
  BreathEntry.tsx      ← keep, repurpose as a CATALYZE tool button
  FrequencyField.tsx   ← keep for potential decorative use (subtle section backgrounds)
  FieldView.tsx        ← replace with new layout
  MetaView.tsx         ← can be removed or deprioritized
  useLabState.ts       ← keep and extend
```

---

## The New Design

### Layout (based on user's hand-drawn mockup)

```
┌─────────────────────────────────────────────────────────┐
│  FourFlow    TOP NAV BAR    (nav links)    [user icon]  │
├──────────┬──────────┬──────────┬──────────────────────┤
│  CORE    │ CONSUME  │ CATALYZE │       CREATE          │
│          │          │          │                       │
│ [Flow    │ [Read  ] │ [Breath] │     [FlowZone]        │
│  Profile]│          │          │                       │
│ [Get     │ [Compend]│ [Spark ] │                       │
│  Profile]│          │          │                       │
├──────────┴──────────┴──────────┴──────────────────────┤
│                                                         │
│              ACTIVITY / APP AREA                        │
│         (active tool renders here, full width)          │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Key Principles

1. **No mandatory entry gate** — the breath ritual is gone as the forced first step. User lands directly in the layout.

2. **Sections are explanatory labels, not buttons** — CORE / CONSUME / CATALYZE / CREATE are column headers with a one-line description. The TOOL BUTTONS underneath them are what users click.

3. **Single activity window** — clicking any tool button renders that tool IN the activity area below. No page navigation. The user always sees the full selector bar at top and the active tool below.

4. **CORE is leftmost and is the starting point** — when user first arrives, CORE is pre-selected and shows the profile in the activity area.

5. **Modular tool buttons** — each section has 1–3 buttons. New tools slot in as new buttons under their section. Buttons are big, clear, with a one-line purpose description.

6. **Visual distinction** — subtle signal to differentiate profile/identity tools (CORE) vs. active flow tools (CONSUME, CATALYZE, CREATE). Could be a different button style, a thin top border color, or an icon.

---

## Section + Tool Definitions

### CORE (leftmost, identity layer)
Description: "Know yourself"

**Tool buttons:**
- **Flow Profile** — "Your consciousness alignment map" → shows profile view in activity area
  - If profile exists (`flow_profile_json` or `flow_profile_final`): renders profile summary (archetype name, tagline, key insights, link to full profile at `/profile/view/[token]`)
  - If no profile: renders a CTA ("Generate your Flow Profile") linking to `/profile/intake`
- That's it for now. Daily Reps is NOT here.

**Future additions (document but don't build):**
- Stats & insights
- Export to LLM context
- Flow blocks intake

### CONSUME (second from left)
Description: "Take something in"

**Tool buttons:**
- **FlowRead** — "Speed reading trainer" → renders `<FlowRead />` in activity area
- **Compendium** — "Browse 191 flow protocols" → renders `<CompendiumNavigator />` in activity area

### CATALYZE (third)
Description: "Break inertia"

**Tool buttons:**
- **Breathwork** — "Shift state — body first" → renders `<Breathwork />` in activity area (standalone, not modal)
- **FlowSpark** — "Map what pulls you" → renders `<CuriosityExplorer />` in activity area

**Future addition (document but don't build):**
- Flow Blocks intake (identify what's blocking flow — needs its own intake form, not built yet)

### CREATE (rightmost)
Description: "Enter deep work"

**Tool buttons:**
- **FlowZone** — "Focus timer + reps" → renders `<FlowZone />` in activity area

---

## Activity Area Default States

| State | What shows in activity area |
|-------|---------------------------|
| First visit, no profile | CORE selected, shows profile CTA + brief FourFlow intro |
| First visit, has profile | CORE selected, shows profile summary |
| Return visit | Last-used tool re-selected (from localStorage) |
| Tool selected | That tool renders full-width in the activity area |

---

## Top Nav

Restore the `LandingNav` component (or a simplified version of it) at the top. The current FlowLab removed it entirely, which is a problem — users lose the ability to navigate the site.

Use `LandingNav` from `src/components/landing/LandingNav.tsx` OR create a simpler `LabNav` with:
- FourFlow logo (links to `/`)
- Key nav links (Framework, Apps, Work Together, or equivalent)
- User icon (`TopBarUserButton` from `src/components/navigation/TopBarUserButton.tsx`)

The nav should be minimal, not dominant — the section bar and activity area are the focus.

---

## Visual Design Notes

- Background: `#0a0a0a` throughout
- Section headers: pillar colors (CORAL for CORE? or keep neutral — discuss in implementation)
  - Alternatively: all four section headers use the same neutral style, colored only by their tool buttons
- Tool buttons: large rounded cards with:
  - Tool name (bold, small)
  - One-line purpose (muted)
  - Hover: subtle border glow in the section's pillar color
  - Active state: filled with pillar color (dim) + white text
- CORE buttons: slightly different treatment to signal "identity/profile" vs "tool" — e.g., a small person/profile icon, or a slightly different border style

**Pillar colors** (from `src/styles/brand-colors.ts`):
```typescript
CORAL    = '#E84535'  // SELF → CORE
SAGE     = '#4E8C73'  // SPACE → CREATE
STEEL    = '#3E6FA3'  // STORY → CONSUME
AMETHYST = '#6330A0'  // SPIRIT → CATALYZE
```

- FrequencyField animations (from the current build) can optionally appear as very subtle background texture in each section header — small, low opacity, decorative. Not required for v2.

---

## Files to Read Before Building

These are the critical files to understand:

```
src/app/me/page.tsx                                    ← entry point (minimal changes needed)
src/components/lab/useLabState.ts                      ← extend for active tool tracking
src/components/lab/FlowLab.tsx                         ← replace the main component
src/components/lab/FrequencyField.tsx                  ← may reuse for decorative backgrounds
src/components/lab/BreathEntry.tsx                     ← repurpose: render in activity area
src/components/tools/flowzone/FlowZone.tsx             ← CREATE tool
src/components/tools/flowzone/Breathwork.tsx           ← CATALYZE tool (needs onDone/onSkip)
src/components/tools/flowread/FlowRead.tsx             ← CONSUME tool
src/components/tools/training/CompendiumNavigator.tsx  ← CONSUME tool
src/components/tools/CuriosityExplorer.tsx             ← CATALYZE tool
src/components/landing/LandingNav.tsx                  ← nav to restore
src/components/navigation/TopBarUserButton.tsx         ← user icon for nav
src/styles/brand-colors.ts                             ← all colors
```

For profile data, use the same Supabase pattern as current FlowLab (query `assessments` table, check for `flow_profile_json` or `flow_profile_final`).

---

## What to Build

**Refactor (not rewrite from scratch):**

1. **`useLabState.ts`** — extend to track `activeTool: ToolId | null` and `lastTool` from localStorage. Remove `phase` and `breath` related state.

2. **New `FlowLab.tsx`** — the main layout component:
   - Top nav
   - Section bar (4 columns)
   - Activity area
   - Auth gate (same pattern: `if (!user) return <AuthModal />`)

3. **New `SectionBar.tsx`** — the 4-column selector:
   - Section header (label + description)
   - Tool buttons
   - Active state on the currently selected tool
   - Renders in a fixed-height row (not full screen)

4. **New `ToolButton.tsx`** — reusable tool button component:
   - Props: `label`, `description`, `color`, `isActive`, `isLocked` (future), `onClick`
   - Clean, minimal, big enough to be clear

5. **New `ActivityArea.tsx`** — renders the active tool:
   - Takes `activeTool: ToolId | null`
   - Routes to the right component
   - Default (no tool selected) shows CORE/profile state

6. **Profile view within CORE** — inline component that:
   - Fetches assessment from Supabase
   - Shows archetype + tagline + key summary if profile exists
   - Shows CTA to `/profile/intake` if no profile

**Keep as-is (no changes):**
- `BreathEntry.tsx` (render it in ActivityArea when `activeTool === 'breathwork'`)
- `FrequencyField.tsx` (may use decoratively)
- `src/app/me/page.tsx` (already imports FlowLab, just keep Suspense wrapper)

---

## Auth Pattern

Same as current:
```tsx
const { user, loading } = useAuth()
if (loading) return <Spinner />
if (!user) return <AuthModal />  // no onClose = required
```

All tools already handle their own auth requirements internally. The FlowLab auth gate covers the outer shell.

---

## Breathwork in Activity Area

`Breathwork.tsx` currently expects `onDone` and `onSkip` callbacks (it's a modal pattern). When rendered in the activity area, both callbacks should return to the default CORE view (or just deselect the tool):
```tsx
<Breathwork onDone={() => setActiveTool(null)} onSkip={() => setActiveTool(null)} label="FlowLab" />
```

This can be wrapped in a centered container within the activity area since Breathwork renders its own internal layout.

---

## Explicitly NOT Building

- Flow Blocks intake (CATALYZE future feature) — placeholder button with "Coming soon" state is fine if desired, but not required
- Stats/insights in CORE — future feature, not built
- LLM export in CORE — future feature, not built
- Free vs. paid gating — future feature, not built
- Daily Reps — no longer in this page (accessible at `/train` directly)
- Breath ritual as mandatory entry gate — removed

---

## Verification Checklist

1. Visit `/me` logged in → lands directly in layout (no breath gate)
2. CORE section selected by default → profile or intake CTA in activity area
3. Click FlowRead button → FlowRead renders in activity area, FlowRead button shows active state
4. Click FlowZone → FlowZone renders in activity area
5. Click Breathwork → breath exercise renders in activity area, onDone returns to neutral
6. Click FlowSpark → CuriosityExplorer renders
7. Click Compendium → CompendiumNavigator renders
8. Return visit → last-used tool pre-selected (localStorage)
9. Top nav visible throughout — can navigate to /framework, etc.
10. Logged out → AuthModal appears
11. No profile → CORE shows intake CTA
12. Has profile → CORE shows archetype + summary
