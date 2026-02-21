# FourFlowOS Brand Guidelines

## 1. Brand Overview

### Mission
Helping people discover flow, meaning, and purpose in their work and lives.

### Vision
A world where millions are awakened through flow, discovering their unique role in life's greater synchronicity.

### Core Transformation
Moving from **disengaged, overwhelmed, or stuck** → **fully engaged, excited, and aligned with meaningful purpose**.

### What We Are
- A focus muscle trainer
- A meaning-maker
- A struggle normalizer
- A flow companion

### What We Are NOT
- Another productivity grinder
- A guilt machine
- A complexity monster

---

## 2. Visual Identity

### Primary Logo
The FourFlowOS logo consists of four interlocking elements representing the Four Pillars: SELF (frequencies), SPACE (square), STORY (cross), and SPIRIT (circle).

**Usage:**
- Use the full-color logo on dark backgrounds
- Maintain clear space around the logo (minimum: logo height × 0.5)
- Never stretch, rotate, or alter the logo proportions

### The Four Pillars

| Pillar | Color Name | Hex Code | RGB | Usage |
|--------|------------|----------|-----|-------|
| **SELF** | Coral | #FF6F61 | 255, 111, 97 | Inner mastery, body, emotions |
| **SPACE** | Sage Green | #6BA292 | 107, 162, 146 | Environment, tools, systems |
| **STORY** | Steel Blue | #5B84B1 | 91, 132, 177 | Direction, mission, narrative |
| **SPIRIT** | Amethyst | #7A4DA4 | 122, 77, 164 | Values, vision, curiosity |

### Alternative Pillar Colors (Dark Variants)
- Self ALT (Dark Coral): #E64A45
- Space ALT (Deep Sage): #517D63
- Story ALT (Navy Blue): #3B4F71
- Spirit ALT (Plum): #5E3570

### Neutral Colors
| Name | Hex Code | Usage |
|------|----------|-------|
| Charcoal | #333333 | Primary text, headers |
| Ivory | #F5F5F5 | Light backgrounds |
| Dark | #0a0a0a | Primary dark backgrounds |
| Darker | #050505 | Deep dark accents |

### Gradients
- **Four Pillars**: `linear-gradient(90deg, #FF6F61, #6BA292, #5B84B1, #7A4DA4)`
- **Self to Spirit**: `linear-gradient(90deg, #FF6F61, #7A4DA4)` - Used for CTAs
- **Radial Glow**: `radial-gradient(circle, rgba(122, 77, 164, 0.15) 0%, transparent 70%)`

---

## 3. Typography

### Font Family
**Inter** - Clean, modern, and highly legible across all sizes.

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale
| Element | Size (Desktop) | Size (Mobile) | Weight |
|---------|----------------|---------------|--------|
| Hero | 6rem (96px) | 3rem (48px) | 700 |
| H1 | 4rem (64px) | 2.5rem (40px) | 700 |
| H2 | 3rem (48px) | 2rem (32px) | 700 |
| H3 | 2rem (32px) | 1.5rem (24px) | 600 |
| Body | 1.125rem (18px) | 1rem (16px) | 400 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 400 |

---

## 4. Voice & Tone

### Characteristics
- **Zen & meditative** — Calm, spacious, not rushed
- **Deep but approachable** — Spiritually meaningful without being alienating
- **Scientific yet warm** — Grounded in neuroscience, expressed with humanity
- **Empowering, not guilt-inducing** — Supportive, never shaming

### Writing Guidelines

**DO:**
- Speak to the reader's aspirations
- Acknowledge struggle as normal and valuable
- Use "flow" as a verb and state of being
- Include breathing room in copy (whitespace in writing)
- Reference the Four Pillars naturally

**DON'T:**
- Use hustle culture language ("grind," "crush it," "hack")
- Create anxiety or urgency
- Over-promise results
- Be preachy or condescending
- Use jargon without explanation

### Example Phrases
✓ "Stop forcing focus. Start aligning the four dimensions that create it naturally."
✓ "The struggle is part of the process—not a sign you're doing it wrong."
✓ "Flow is not something you force. It's something you prepare for."

✗ "Hack your focus in 5 minutes!"
✗ "Stop being lazy and get focused!"
✗ "Unlock your hidden potential now!"

---

## 5. Animation Guidelines

### Philosophy
Animations should feel like **breathing**—slow, natural, and calming. Never jarring or attention-grabbing.

### Timing
| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Breathing pulse | 6-8s | ease-in-out |
| Slow spin | 30s+ | linear |
| Floating movement | 22-28s | ease-in-out |
| Gradient shift | 25-30s | linear |
| Micro-interactions | 200-300ms | ease-out |

### Patterns
- **Breathing**: Scale 1 → 1.05 → 1 with opacity shift
- **Floating orbs**: Gentle x/y movement + scale breathing
- **Background gradients**: Slow color position shifts
- **Logo ring**: Very slow rotation (30s per revolution)

---

## 6. UI Patterns

### Contrast as Interface
A key principle: **Navigation mode is vibrant and energetic; Focus mode is minimal and zen.**

| Mode | Background | Colors | Animation |
|------|------------|--------|-----------|
| Navigation | Dark (#0a0a0a) | Full pillar colors | Active, responsive |
| Focus | Minimal | Muted, monochrome | Minimal, breathing |

### Cards
- Subtle border: `border-white/10`
- Hover state: `bg-white/10`
- Rounded corners: `rounded-2xl` (16px)
- Subtle shadow on hover

### Buttons
- Primary: Gradient from Self to Spirit (`from-[#FF6F61] to-[#7A4DA4]`)
- Secondary: Border with hover fill
- Ghost: Transparent with subtle hover

### Dark Mode First
All FourFlowOS interfaces default to dark mode. Light mode is secondary and should maintain the same zen aesthetic with inverted contrast.

---

## 7. Iconography

### Section Logos
Each pillar has a dedicated section logo:
- SELF - Section Logo.png
- SPACE - Section Logo.png
- STORY - Section Logo.png
- SPIRIT - Section Logo.png

### Flow Keys (12 total)
Each of the 12 Flow Keys has an associated icon:

**SELF:**
- Tuned Emotions
- Open Mind
- Focused Body

**SPACE:**
- Intentional Space
- Optimized Tools
- Feedback Systems

**STORY:**
- Generative Story
- Clear Mission
- Empowered Role

**SPIRIT:**
- Grounding Values
- Visualized Vision
- Ignited Curiosity

### Mandala Patterns
Three styles available for decorative use:
- Simple (clean geometric)
- Heartbeat (organic, flowing)
- Mystery (complex, intricate)

Each available in: Black Outline, White Outline, W&B Outline

---

## 8. Photography & Imagery

### Style
- Calm, focused imagery
- Natural settings (zen gardens, forests, water)
- Abstract flowing patterns
- Soft, diffused lighting
- Minimal clutter

### Avoid
- Busy, chaotic compositions
- Harsh lighting or high contrast
- Generic stock photos
- Overly posed corporate imagery

---

## 9. Asset Locations

```
/brand/
├── BRAND_GUIDELINES.md (this document)
├── FourFlowOS - Banner.png
├── FOURFLOWiosICON.jpg
├── logos/
│   ├── FOURFLOW - MAIN LOGO.png
│   ├── [Pillar Section Logos]
│   ├── [12 Flow Key Icons]
│   └── MAIN LOGO - ELEMENTS/
├── mandalas/
│   ├── Black Outline/
│   ├── White Outline/
│   └── W&B Outline/
└── icons/
    └── [Numbered Flow Icons]
```

---

## 10. Contact

For brand questions or asset requests:
**support@fourflow.app**

---

*Last updated: January 2, 2025*
