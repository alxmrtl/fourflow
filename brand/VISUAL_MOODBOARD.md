# FourFlow Visual Moodboard

*Reference points for the aesthetic we're building*

---

## The North Stars

These are the design sensibilities we're channeling—not copying, but learning from.

### 1. Dieter Rams / Braun

**What we take:**
- "Less, but better"
- Every element earns its place
- Functionality creates beauty
- Timelessness over trendiness
- The removal of everything unnecessary

**Applied to FourFlow:**
- UI elements that justify their existence
- Features that disappear until needed
- Design that works in 10 years, not 10 months

### 2. Apple (Jony Ive era)

**What we take:**
- "Design is not just what it looks like—it's how it works"
- The goal is for the design to disappear
- Care in the unseen details
- Products that feel inevitable, not designed
- Humanizing technology

**Applied to FourFlow:**
- Invisible complexity, obvious simplicity
- Details no one will consciously notice, but everyone feels
- Technology that serves presence, not demands attention

### 3. Japanese Wabi-Sabi

**What we take:**
- Beauty in imperfection
- Asymmetry, roughness, simplicity
- Natural materials and processes
- Age and wear as enhancement
- The incomplete over the polished

**Applied to FourFlow:**
- Texture over smoothness
- Slight organic variation in geometric patterns
- Not afraid of visual "breathing room" that feels empty
- Embrace of the human hand in the work

### 4. Monastic Spaces

**What we take:**
- Emptiness as presence
- Light as material
- Stone, wood, silence
- Spaces designed for contemplation
- The sacred in the simple

**Applied to FourFlow:**
- Dark backgrounds as sanctuary
- Light as accent, not flood
- Digital spaces that feel monastic
- Features that support contemplation

### 5. Observatory/Planetarium Aesthetics

**What we take:**
- Dark fields with points of light
- The cosmic scale
- Slow celestial movement
- Precision instruments
- Mystery and science unified

**Applied to FourFlow:**
- Dark UI with strategic color accents
- Slow, orbital animations
- The feeling of tracking something larger
- Scientific foundation with mystical resonance

---

## Mood Quadrants

### Quadrant 1: The Cave (Hermit Space)

**Feeling:** Solitude, depth, protected creativity

**Visual references:**
- A writer's cabin at night, single lamp lit
- Cave entrances with distant light
- Deep forest clearings
- Stone walls with firelight
- Recording studios, sound-proofed silence

**Color temperature:** Warm darks, amber accents

**Textures:** Rough stone, worn wood, wool, paper

**Photography notes:**
- Intimate, close-up shots
- Single light source (preferably warm)
- Evidence of work in progress
- No people, or just hands/partial figures
- Comfortable silence, not loneliness

### Quadrant 2: The Fire (Initiator Space)

**Feeling:** Courage, forward motion, aliveness

**Visual references:**
- First light of dawn (not sunset—beginning, not ending)
- A forge with molten metal
- Athletes in the moment before movement
- Hands about to strike a match
- The edge of diving boards

**Color temperature:** Coral, ember, sunrise gold

**Textures:** Heat shimmer, smooth metal, tension surfaces

**Photography notes:**
- Captured potential energy
- The moment before action
- Warm color tones
- Dynamic angles without chaos
- Human agency visible

### Quadrant 3: The Sanctuary (Space Pillar)

**Feeling:** Support, groundedness, curated environment

**Visual references:**
- Japanese tea rooms
- Organized workshops with quality tools
- Libraries with reading lamps
- Garden studios
- Carefully arranged desks

**Color temperature:** Sage, forest, cool neutrals

**Textures:** Wood grain, linen, ceramic, plant matter

**Photography notes:**
- Evidence of intentional arrangement
- Tools of craft, well-maintained
- Natural materials dominant
- Clean but lived-in
- Light through windows

### Quadrant 4: The Transmission (Spirit/Awakening)

**Feeling:** Mystery, connection, cosmic scale

**Visual references:**
- Star fields, nebulae
- Light through stained glass
- Mountain peaks above clouds
- Ancient geometries (but not cliché sacred geometry)
- Water reflecting sky

**Color temperature:** Amethyst, deep blue, silver

**Textures:** Light itself, atmosphere, depth

**Photography notes:**
- Scale that suggests something larger
- Vertical compositions (aspiration)
- Diffused, ethereal light
- Abstract patterns in nature
- Mystery without spookiness

---

## Specific Visual Elements

### Buttons

**Primary (CTA):**
```
Background: linear-gradient(135deg, #FF6F61, #7A4DA4)
Border-radius: 12px
Padding: 16px 32px
Text: white, 600 weight
Hover: scale(1.02), brightness increase
Active: scale(0.98)
```

**Secondary:**
```
Background: transparent
Border: 1px solid rgba(255,255,255,0.2)
Border-radius: 12px
Hover: background rgba(255,255,255,0.05)
```

**Ghost:**
```
Background: transparent
Border: none
Hover: background rgba(255,255,255,0.03)
```

### Cards

```
Background: rgba(255,255,255,0.03)
Border: 1px solid rgba(255,255,255,0.08)
Border-radius: 16px
Padding: 24px
Hover: background rgba(255,255,255,0.06),
       border rgba(255,255,255,0.12)
Transition: 250ms ease-in-out
```

### Input Fields

```
Background: rgba(255,255,255,0.03)
Border: 1px solid rgba(255,255,255,0.1)
Border-radius: 12px
Padding: 16px
Focus: border-color transitions to pillar color
       subtle glow: 0 0 0 3px rgba(pillar, 0.15)
Placeholder: rgba(255,255,255,0.3)
```

### Navigation

**Desktop:**
- Fixed position, minimal footprint
- Logo left, nav right
- Text links, no underlines until hover
- Subtle pillar color on active state

**Mobile:**
- Bottom navigation (thumb-friendly)
- Icons with labels
- Active state: pillar gradient background at 10%

### Progress Indicators

**Linear progress:**
```
Track: rgba(255,255,255,0.1)
Fill: pillar gradient or single pillar color
Height: 4px (subtle) or 8px (emphasized)
Border-radius: full
Animation: smooth width transition
```

**Circular progress:**
```
Track: rgba(255,255,255,0.1)
Fill: conic-gradient from pillar colors
Stroke-width: 8px
Center content: percentage or icon
Animation: smooth conic transition
```

**Focus mode timer:**
```
Minimal ring on dark
Breathing animation when active
No numbers unless requested
Completion: gentle pulse, not celebration
```

---

## Photography Selection Criteria

### What Makes a Photo "FourFlow"

**Score each image 1-5:**

| Criterion | What We're Looking For |
|-----------|------------------------|
| **Texture** | Does it have tactile quality, not AI-smooth? |
| **Quietude** | Does it feel calm, not manic? |
| **Intimacy** | Close-up, personal, not distant/stock? |
| **Intention** | Does it feel composed, not random? |
| **Warmth** | Even in cool tones, is there humanity? |
| **Mystery** | Does it suggest more than it shows? |

**Minimum threshold:** Average of 3.5 to use

### Image Treatment

**Standard adjustments:**
- Desaturation: 10-20% from full color
- Contrast: Slightly reduced (not flat, but not punchy)
- Highlights: Pulled down
- Shadows: Slightly lifted (detail in darks)
- Temperature: Slight warm shift (+5-10)
- Grain: Optional subtle film grain (3-5%)

**Color grading:**
- Shadows: Slight blue/purple tint
- Midtones: Neutral
- Highlights: Slight warm tint

---

## Illustration Style (If Used)

We generally prefer photography, but if illustration is needed:

**Characteristics:**
- Line-based, not filled shapes
- Single stroke weight (1.5-2px)
- White or pillar color on dark
- Geometric but organic (slight imperfection)
- Abstract/conceptual, not representational
- Breathes with the surrounding space

**Never:**
- Cartoon-style characters
- Corporate/tech illustration style (the Notion/Linear aesthetic)
- Isometric scenes
- Filled gradients in illustration
- Busy, decorative complexity

---

## Icon Style

**Approach:** Outlined, not filled

```
Stroke width: 1.5px
Corner radius: 2px (slight softening)
Size: 24px base (scale proportionally)
Color: white at 80% opacity, 100% on hover
```

**Principles:**
- Recognizable at 16px
- Single-concept per icon
- Consistent visual weight across set
- No unnecessary detail
- Geometric foundation, organic execution

---

## The Ultimate Visual Test

Before using any visual element, ask:

1. **The Hermit Test:** Would this feel at home in a contemplative space?
2. **The Glass Lands Test:** Could an AI easily generate this? (If yes, reconsider)
3. **The Texture Test:** Does this have soul, or is it smooth corporate nothing?
4. **The Timelessness Test:** Will this look dated in 18 months?
5. **The Frequency Test:** Does this carry the FourFlow frequency, or dilute it?

---

## Reference Practitioners

Designers/studios whose work aligns with FourFlow sensibility:

- **Kenya Hara** (MUJI) — reduction, texture, white
- **John Pawson** — monastic minimalism
- **Naoto Fukasawa** — invisible design, felt quality
- **Material Design (early)** — meaningful motion, depth without gimmick
- **Linear App** — dark-first, purposeful UI
- **Calm App** — but less literal, more abstract
- **Arc Browser** — personality in software
- **Things 3** — precision without coldness

---

*Every pixel should feel inevitable, not chosen.*
*Every image should transmit, not just illustrate.*
*The design serves the frequency. Nothing else.*
