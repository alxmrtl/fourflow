# FlowStation Brand System

> Reference for applying the FlowStation design language to Breath and Timer views (and any future screens).

---

## Core Identity

FlowStation is an **always-on office monitor**. The aesthetic is: dark, minimal, focused — a command center that recedes when you're in flow and surfaces cleanly when you need it. Think mission control, not consumer app.

**Design principles:**
- High contrast without being harsh — dark background, luminous text
- Pillar colors are the primary signal language — never decorative
- Filled surfaces beat outlines — bold cards, not hairline borders
- Opacity hierarchy communicates focus state, not color changes
- Motion is subtle: 0.18–0.28s transitions, cubic-bezier feel

---

## Color System

### Pillar Colors
| Pillar  | Name          | Hex       | Usage                            |
|---------|---------------|-----------|----------------------------------|
| SELF    | Coral         | `#FF6F61` | Focus / energy / reception       |
| SPACE   | Sage Green    | `#6BA292` | Environment / transmission       |
| STORY   | Steel Blue    | `#5B84B1` | Direction / narrative            |
| SPIRIT  | Amethyst      | `#7A4DA4` | Values / timeless direction      |

These are the **only accent colors** in the system. Never introduce new colors — always key to a pillar.

### Neutrals
| Token      | Value                      | Usage                        |
|------------|----------------------------|------------------------------|
| `--bg`     | `#0a0a0a`                  | Page background              |
| `--text`   | `#f0f0f0`                  | Primary text                 |
| `--muted`  | `rgba(255,255,255,0.38)`   | Secondary / supporting text  |
| `--dim`    | `rgba(255,255,255,0.12)`   | Tertiary / hints             |
| `--border` | `rgba(255,255,255,0.08)`   | Dividers and hairlines       |

### Surface Hierarchy
1. **Background** — `#0a0a0a` (screen base)
2. **Panel** — `rgba(255,255,255,0.04)` + `border-radius: 20px` (column containers, section panels)
3. **Card unfocused** — pillar color at `16–20% opacity` (e.g. `hexToRgba(color, 0.16)`)
4. **Card focused** — pillar color at `82% opacity` (e.g. `hexToRgba(color, 0.82)`)
5. **List item hover** — `rgba(255,255,255,0.07–0.10)`
6. **Recall/info blocks** — `rgba(255,255,255,0.045)` + 1px border

---

## Typography

**Font**: Inter (Google Fonts, weights: 200, 300, 400, 500, 600, 700, 800)

| Role                  | Size               | Weight | Letter-spacing | Transform  |
|-----------------------|--------------------|--------|----------------|------------|
| Pillar header         | 12px               | 800    | 0.22em         | uppercase  |
| State card label      | 13px               | 800    | 0.10em         | uppercase  |
| Section label / badge | 10–11px            | 800    | 0.16em         | uppercase  |
| List item title       | 14–15px            | 600–800| 0.03em         | —          |
| Card title            | clamp(36px,4.5vw,52px) | 800 | —            | —          |
| Body paragraph        | 16px               | 400    | —              | —          |
| Quote / callout       | 17px               | 400    | —              | italic ok  |
| Protocol step text    | 15px               | 400    | —              | —          |
| Muted / hint          | 10px               | 500–700| 0.08–0.12em    | uppercase  |
| Timer display         | clamp(140px,16vw,196px) | 200 | -0.04em      | —          |

---

## Component Patterns

### Pillar Column (Grid View)
```
background: rgba(255,255,255,0.04)
border-radius: 20px
padding: 18px 14px
opacity: 0.30 (unfocused) → 1.0 (focused)
```
Header: pillar color, 12px/800wt/uppercase, bottom border in pillar color.

### State Card (Grid View) — Sticker Board style
```
border-radius: 20px
min-height: 130px
padding: 16px 12px 14px
display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center
background: hexToRgba(pillarColor, 0.18)  // unfocused
background: hexToRgba(pillarColor, 0.68)  // focused
transform: translateY(-3px) scale(1.02)   // focused
box-shadow: 0 12px 36px rgba(0,0,0,0.55)  // focused
::after inner highlight: linear-gradient top 40%, rgba(255,255,255,0.10) → transparent
```
Icon: `<img>` 68px, `drop-shadow(0 3px 10px rgba(0,0,0,0.50))`. Scales 1.10 on focus.
Label: 11px/800wt/uppercase/0.12em. Counts: 10px, `rgba(255,255,255,0.55)` → 0.80 on focus.

### Pillar Column (Grid View)
```
background: rgba(255,255,255,0.025) unfocused → hexToRgba(pillarColor, 0.09) focused
border-radius: 24px
padding: 20px 14px 16px
opacity: 0.18 (unfocused) → 1.0 (focused)  ← stark dimming is intentional
```
Header: pillar section logo (28px, mix-blend-mode: screen) + pillar name + card count.

### Accent Stripe (Card View)
```
width: 14px
border-radius: 7px
background: pillar color (solid)
margin: 10px 36px 10px 0
align-self: stretch
```

### List Item — Quality Header
```
background: rgba(255,255,255,0.06)
border-radius: 10px
border-left: 4px solid transparent  → pillar color (focused)
padding: 14px 16px
title: 14px/800wt
```

### List Item — Child (Technique/Concept)
```
padding-left: 30px
::before pseudo — 2px vertical line, pillar color at 15% → 55% focused
background: transparent → rgba(255,255,255,0.07) (focused)
```

### Preview Pane
```
background: rgba(255,255,255,0.025)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 14px
padding: 22px 24px
```

### Recall Block
```
background: rgba(255,255,255,0.045)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 12px
padding: 18px 20px
label: 9px/800wt/uppercase, pillar color
```

### Navigation Tabs (Top Bar)
```
Inactive: padding 9px 24px, border-radius 10px, border 2px rgba(255,255,255,0.10), color rgba(255,255,255,0.28)
Active:   background #f0f0f0, color #0a0a0a, border #f0f0f0
```

### Bottom Bar Hints
```
height: 52px, gradient fade from bg
hint-key: monospace, rgba(255,255,255,0.60), border rgba(255,255,255,0.18)
text: 11px, rgba(255,255,255,0.28)
```

---

## Motion & Transitions

| Interaction         | Duration | Easing                        |
|---------------------|----------|-------------------------------|
| Screen slide        | 0.45s    | cubic-bezier(0.4, 0, 0.2, 1)  |
| View crossfade      | 0.28s    | ease                          |
| Card/item focus     | 0.16–0.18s | ease                        |
| Opacity shifts      | 0.22s    | —                             |
| Scroll inner        | 0.18–0.22s | ease                        |
| Scale (card focus)  | 0.18s    | ease                          |
| Rep number pop      | 0.08s    | —                             |

---

## Navigation Patterns

FlowStation uses **gamepad + keyboard** navigation. No mouse/touch required.

```
L / R shoulder  →  switch screens
↑ / ↓          →  navigate rows / scroll
← / →          →  navigate columns / switch cards / scroll preview
A              →  enter / confirm / log rep
B              →  back one level
Start          →  timer toggle
```

Focus state is always exactly ONE item. Never multi-select. Navigation wraps at boundaries by clamping (no wrap-around).

Debounce: 180ms between repeat fires.

---

## Applying to Breath Screen

The Breath screen uses `--space` (sage green) as its accent throughout. Pattern buttons follow the **list item** pattern with a left accent bar (`.bp-accent`). The active circle uses radial gradient mixing `--space` and `--spirit`.

**To make consistent with new design language:**
- Pattern buttons: apply the panel surface (`rgba(255,255,255,0.04)` bg, `border-radius: 16px`) when unfocused; use `hexToRgba(accent, 0.82)` fill when focused
- Phase label (inhale/exhale): keep large, weight 700
- Circle rings: keep current subtle ring treatment — it already matches the aesthetic

---

## Applying to Timer Screen

The Timer uses a cycling `pillarCycle` ambient gradient animation. The large time display is `font-weight: 200` — this intentional contrast (thin vs bold elsewhere) is a deliberate design choice, keep it.

**To make consistent:**
- Duration options: apply `border-radius: 24px`, selected state uses `rgba(255,255,255,0.06)` bg — already close
- Rep number: keep `font-weight: 800`, large — consistent with bold data display pattern
- Struggle bar: keep `--self` coral — maps to SELF pillar (body/focus)
- Timer state label: keep 10px/800wt/uppercase/muted — matches section label pattern

---

## Brand Logo Assets

All logos live in `brand/logos/`. Reference from FlowStation via `../../brand/logos/`.

### Pillar section logos (for column headers)
```
SELF - Section Logo.png
SPACE - Section Logo.png
STORY - Section Logo.png
SPIRIT - Section Logo.png
```
Use `mix-blend-mode: screen` on dark backgrounds to hide the white bg.

### Flow Key (State) logos
```
tuned-emotions    → TUNED EMOTIONS.png
focused-body      → FOCUSED BODY.png
open-mind         → OPEN MIND.png
intentional-space → INTENTIONAL SPACE.png
optimized-tools   → OPTIMIZED TOOLS.png
feedback-systems  → FEEDBACK SYSTEMS.png
generative-story  → GENERATIVE STORY.png
clear-mission     → WORTHY MISSION.png  (old name, same icon)
empowered-role    → EMPOWERED ROLE.png
grounding-values  → GROUNDING VALUES.png
ignited-curiosity → IGNITED CURIOSITY.png
visualized-vision → VISUALIZED VISION.png
```
Icon style: sticker (white outline border, pillar-colored fill). 68px in cards, 44px in state view title.
Apply `filter: drop-shadow(0 3px 10px rgba(0,0,0,0.50))` for depth on dark backgrounds.

---

## JS Helper

The `hexToRgba(hex, alpha)` function is available in `index.html` for computing dynamic pillar color fills:

```js
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
```

Use `COLORS[pillar]` (e.g. `COLORS.self`) to get the hex, then pass to `hexToRgba`.
