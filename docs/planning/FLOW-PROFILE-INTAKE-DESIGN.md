# Flow Profile Intake: The Hybrid Design

**Date**: February 17, 2026
**Status**: Design Draft
**Context**: Designing the onboarding experience that generates an initial Flow Profile — the entry point to the FourFlow ecosystem.

---

## Design Philosophy

The intake is not a quiz. It's a **synthesis experience**. Most people already have scattered self-knowledge — personality tests, astrology charts, years of therapy insights, gut feelings about what works and what doesn't. The FourFlow intake takes all of that and reflects it back through a single coherent lens: the 12 Flow Keys.

**The user's experience**: "I've never seen all of this connected before."

**What makes it different from every other personality assessment**:
- You don't answer 50 generic questions — you bring what you already know
- The agent synthesizes across systems, not within one
- The output isn't a label — it's a living map that evolves
- The conversation fills gaps that imports can't reach

---

## The Two Phases

### Phase A: "Bring What You Know"

The user imports existing self-knowledge. Any combination of:

**Structured Imports** (the agent knows how to read these):

| System | What It Reveals | Maps Primarily To |
|--------|----------------|-------------------|
| **MBTI / 16 Personalities** | Cognitive preferences, energy direction | Open Mind, Intentional Space, Empowered Role |
| **Enneagram** | Core motivation, stress/growth patterns | Tuned Emotions, Generative Story, Grounding Values |
| **Big Five (OCEAN)** | Trait spectrum across 5 dimensions | Broad signal across all pillars |
| **StrengthsFinder / CliftonStrengths** | Top talent themes | Empowered Role, Clear Mission, Optimized Tools |
| **DISC** | Behavioral style, communication patterns | Feedback Systems, Empowered Role |
| **Astrology (natal chart)** | Archetypal patterns, energy signatures, developmental themes | Spirit pillar (Values, Curiosity, Vision) + Tuned Emotions |
| **Human Design** | Energy type, strategy, authority, profile | Self pillar (how you receive and process) + Empowered Role |
| **Attachment Style** | Relational patterns, nervous system wiring | Tuned Emotions, Feedback Systems |
| **Values Assessments** | Stated priorities | Grounding Values, Clear Mission |
| **Therapy / Coaching Insights** | "Things I know about myself" | Varies — the richest input |

**Unstructured Import**: Free-text. "Here's what I know about myself." This is often the most valuable input — years of self-reflection distilled into the user's own words.

---

### Phase A.5: "The Signal Gatherer" (Built-In Mini-Assessments)

For users who arrive with nothing — no personality test results, no astrology chart, no prior self-knowledge framework — Phase A is empty. The Signal Gatherer fills that gap: a set of lightweight, FourFlow-native micro-assessments that collect the *same underlying data* these external systems capture, without naming the modalities. The user never sees "MBTI" or "Enneagram" — they just answer questions, and the agent gets usable signal.

This also complements imports. Someone who brings their MBTI but doesn't know their attachment style still gets that signal gathered invisibly through conversation.

**Design principle**: The modality is invisible. The questions feel like a natural getting-to-know-you conversation. The output is always in FourFlow language (the 12 keys), never in the source system's vocabulary.

#### Assessment: Each System Evaluated

**1. Cognitive Preferences (replaces MBTI / Jungian Functions)**

- **Proprietary?** The MBTI instrument is proprietary (Myers-Briggs Company). But the underlying Jungian cognitive functions (introversion/extraversion, intuition/sensing, thinking/feeling, judging/perceiving) are **public domain psychology** dating to the 1920s.
- **Can we build our own?** Yes, easily. We're not replicating the MBTI — we're asking about cognitive preferences.
- **Minimum viable signal**: 4-6 questions. One per dimension.
- **Difficulty**: Low. This is well-trodden territory.
- **Example questions** (FourFlow-native framing):
  - "When you're solving a problem, do you tend to think it through internally first, or talk it out with someone?" → Energy direction
  - "Do you trust what you can see and verify, or do you trust your gut read on what it means?" → Information processing
  - "When making a big decision, does logic or values win when they conflict?" → Decision-making
  - "Do you prefer having a plan before you start, or figuring it out as you go?" → Orientation to structure
- **Maps to**: Open Mind (N/S dimension), Intentional Space (J/P as structure preference), Empowered Role (E/I as agency style), Feedback Systems (T/F as feedback processing)

**2. Core Motivation & Fear (replaces Enneagram)**

- **Proprietary?** No. The Enneagram is **fully public domain**. Multiple schools, no trademark on the system itself. The specific typing instruments (like the Riso-Hudson RHETI) are proprietary, but the underlying model is open.
- **Can we build our own?** Yes, and this is one of the richest signals available. The Enneagram's real power is in revealing *why* someone does what they do, not just *what* they do.
- **Minimum viable signal**: 3-5 scenario questions about motivation and stress response.
- **Difficulty**: Medium. The nine types overlap in behavior — motivation is what differentiates them, which is harder to capture in a few questions. But we don't need to type someone precisely. We need signal about their core drive.
- **Example questions** (FourFlow-native framing):
  - "What's the thing you'd hate most for people to think about you?" → Core fear (maps directly to Enneagram type)
  - "When you're stressed, do you tend to withdraw, take control, or seek reassurance?" → Stress response triad
  - "What drives you more: being competent, being connected, or being secure?" → Center of intelligence (head/heart/gut)
- **Maps to**: Tuned Emotions (emotional patterns under stress), Generative Story (narrative around identity), Grounding Values (core motivations reveal true values), Empowered Role (how they relate to agency)

**3. Trait Spectrum (replaces Big Five / OCEAN)**

- **Proprietary?** No. The Big Five is **standard academic psychology**, fully public domain. Validated short-form instruments exist freely — the TIPI (Ten-Item Personality Inventory) is published and openly available.
- **Can we build our own?** Yes, trivially. This is the most scientifically validated personality model. We could literally use the TIPI (10 questions, freely published) or design our own using the same dimensions.
- **Minimum viable signal**: 5-10 questions. Two per dimension.
- **Difficulty**: Very low. Most straightforward system to implement.
- **The five dimensions and what they reveal**:
  - **Openness**: Curiosity, imagination, unconventionality → Ignited Curiosity, Open Mind
  - **Conscientiousness**: Organization, discipline, reliability → Optimized Tools, Feedback Systems, Clear Mission
  - **Extraversion**: Sociability, assertiveness, positive emotion → Empowered Role, Intentional Space
  - **Agreeableness**: Cooperation, trust, compliance → Feedback Systems, Tuned Emotions
  - **Neuroticism**: Anxiety, emotional volatility, vulnerability → Tuned Emotions (primary), Focused Body
- **Maps to**: Broad signal across all four pillars. This is the "wide net" — less depth per key, but touches everything.

**4. Natural Strengths (replaces StrengthsFinder / CliftonStrengths)**

- **Proprietary?** Yes. CliftonStrengths is **fully proprietary** (Gallup). The 34 theme names, definitions, and assessment instrument are all trademarked and copyrighted.
- **Can we build our own?** Yes, but we'd need to design around the concept rather than replicate themes. The underlying question is simple: "What energizes you? What comes naturally? What do you lose track of time doing?"
- **Minimum viable signal**: 3-4 open-ended questions about energy and natural talent.
- **Difficulty**: Low-medium. The questions are easy; the interpretation requires mapping "what energizes me" to the 12 keys.
- **Example questions** (FourFlow-native framing):
  - "What activities make you lose track of time?"
  - "What do people come to you for help with?"
  - "What feels effortless to you but seems hard for others?"
  - "When do you feel most like yourself?"
- **Maps to**: Empowered Role (are you in the right role?), Clear Mission (does your target match your strengths?), Ignited Curiosity (what naturally pulls you?), Optimized Tools (are your tools matched to your strengths?)

**5. Behavioral Style (replaces DISC)**

- **Proprietary?** The specific DISC instruments are proprietary, but the original model is **public domain** (William Marston, 1928). The four dimensions (Dominance, Influence, Steadiness, Conscientiousness) are freely usable.
- **Can we build our own?** Yes, easily. Behavioral style is observable and self-reportable.
- **Minimum viable signal**: 4 forced-choice questions.
- **Difficulty**: Very low.
- **Example questions** (FourFlow-native framing):
  - "In a group project, do you naturally take charge, rally people, keep things steady, or make sure it's done right?"
  - "When there's conflict, do you push through it, smooth it over, wait it out, or analyze it?"
- **Maps to**: Empowered Role (leadership/agency style), Feedback Systems (how you give/receive feedback), Tuned Emotions (conflict response patterns)

**6. Archetypal Patterns (replaces Astrology)**

- **Proprietary?** No. Astrology is **completely open** — thousands of years old, no ownership. Natal chart calculation is pure math. Free APIs exist (e.g., Swiss Ephemeris). Interpretation frameworks are published and public.
- **Can we build our own?** We don't need to — we just need three data points: **birth date, birth time, birth place**. From that, the entire natal chart can be generated programmatically.
- **Minimum viable signal**: 3 fields. Date, time, location. That's it.
- **Difficulty**: Very low to collect. Medium to interpret well (requires astrological mapping knowledge, which already exists in the `/astroadvisor` system).
- **The unique advantage**: This is the ONLY system where the user provides almost nothing but gets a massive amount of signal. Three fields → Sun, Moon, Rising, all planetary placements, houses, aspects. It's the highest signal-to-input ratio of any system.
- **The design challenge**: Divisive. Believers love it; skeptics dismiss the whole thing. **Solution: never surface it as "astrology."** Just ask for birth details as part of the intake. The agent uses the chart as one signal among many, weighted by confidence. The user sees insights in FourFlow language, never "your Mars in Scorpio suggests..."
- **Maps to**: Tuned Emotions (Moon sign, water placements), Grounding Values (Saturn, fixed signs), Ignited Curiosity (Jupiter, Mercury, air placements), Visualized Vision (Neptune, North Node), Empowered Role (Sun, Mars, 10th house), Generative Story (Nodal axis as life arc)

**7. Energy Type & Decision Authority (replaces Human Design)**

- **Proprietary?** The system was created by Ra Uru Hu (1987). The name "Human Design" isn't trademarked in a restrictive way, and the chart calculation is based on the same astronomical data as astrology plus the I Ching gate system. The knowledge is **effectively open** — widely published and taught.
- **Can we build our own?** Same as astrology — **birth date, time, and location** generates the full chart. We already have the data if we collect it for astrology.
- **Minimum viable signal**: Same 3 fields as astrology (already collected). Zero additional input.
- **Difficulty**: Medium. The system is more niche, and the interpretation framework is less widely understood than astrology. But the core insights (energy type, authority, profile) are well-documented.
- **The key insight for FourFlow**: Human Design's "authority" concept (how you're designed to make decisions — emotional, sacral, splenic, etc.) maps beautifully to the SELF pillar. It's essentially: "What is your body's natural decision-making channel?" That's Focused Body + Tuned Emotions + Open Mind in one concept.
- **Maps to**: Focused Body (sacral/splenic authority = body-based decision-making), Tuned Emotions (emotional authority = wait for clarity), Open Mind (mental authority types must be cautious of over-thinking), Empowered Role (energy type = Generator, Projector, Manifestor, Reflector → fundamentally different strategies for engaging with work)

**8. Relational Wiring (replaces Attachment Style)**

- **Proprietary?** No. Attachment theory is **standard academic psychology** (Bowlby, Ainsworth, 1960s-80s). Validated self-report measures exist in published literature. The ECR-R (Experiences in Close Relationships - Revised) is freely available.
- **Can we build our own?** Yes, very easily. Attachment style can be assessed with 4-6 well-designed questions.
- **Minimum viable signal**: 4 scenario questions about relationship patterns.
- **Difficulty**: Low. The four styles (secure, anxious, avoidant, disorganized) are well-defined and self-reportable.
- **Example questions** (FourFlow-native framing):
  - "When someone important to you pulls away, what's your first instinct — pursue them, give them space, or feel nothing?"
  - "Do you find it easy to ask for help, or does it feel vulnerable in a way you'd rather avoid?"
  - "In close relationships, do you tend to worry you care more than they do, or worry they want more closeness than you're comfortable with?"
- **Maps to**: Tuned Emotions (attachment style IS emotional regulation strategy), Feedback Systems (how you process relational feedback), Grounding Values (secure attachment → values feel stable; insecure → values feel conditional)

**9. Values Hierarchy (replaces formal Values Assessments)**

- **Proprietary?** No. The Schwartz Values Survey is academic/open. Multiple values frameworks exist in published literature.
- **Can we build our own?** Trivially. Values elicitation is one of the simplest assessments to design.
- **Minimum viable signal**: 1-2 questions.
- **Difficulty**: Very low.
- **Example questions** (FourFlow-native framing):
  - "If you could only keep three principles to guide every decision for the rest of your life, what would they be?"
  - "What's something you'd never compromise on, even if it cost you?"
- **Maps to**: Grounding Values (directly), Clear Mission (values inform mission), Visualized Vision (values anchor the vision)

---

#### Summary: The Build-It-Ourselves Scorecard

| System | Proprietary? | Can We Build? | Min. Input | Difficulty | Signal Richness | Priority |
|--------|-------------|---------------|------------|------------|----------------|----------|
| Cognitive Preferences (MBTI) | Instrument yes, concepts no | Yes | 4-6 questions | Low | Medium | High |
| Core Motivation (Enneagram) | No | Yes | 3-5 scenarios | Medium | Very High | High |
| Trait Spectrum (Big Five) | No | Yes (TIPI exists free) | 5-10 questions | Very Low | Medium-broad | Medium |
| Natural Strengths (CliftonStrengths) | Yes | Yes (concept only) | 3-4 open questions | Low-Medium | Medium | Medium |
| Behavioral Style (DISC) | Instrument yes, model no | Yes | 4 forced-choice | Very Low | Low-Medium | Low |
| Archetypal Patterns (Astro) | No | Yes (3 fields → full chart) | Date/time/place | Low input, Med interpretation | Very High | High |
| Energy Type (Human Design) | Effectively no | Yes (same 3 fields) | Already collected | Med interpretation | High | Medium |
| Relational Wiring (Attachment) | No | Yes | 4 scenarios | Low | High | High |
| Values Hierarchy | No | Yes | 1-2 questions | Very Low | Medium | High |

**Recommended Phase A.5 build order** (highest signal for lowest effort):

1. **Birth details** (3 fields) → Unlocks both astrology AND Human Design. Massive signal, near-zero friction.
2. **Values Hierarchy** (1-2 questions) → Direct hit on Grounding Values, the Spirit anchor.
3. **Relational Wiring** (4 scenarios) → Unlocks Tuned Emotions depth that nothing else captures.
4. **Core Motivation** (3-5 scenarios) → The deepest "why" signal. Maps across multiple keys.
5. **Cognitive Preferences** (4-6 questions) → Fills SPACE and SELF gaps imports often miss.
6. **Trait Spectrum** (5-10 questions) → Broad net, good for cross-validation.
7. **Natural Strengths** (3-4 open questions) → Empowered Role and mission clarity.
8. **Behavioral Style** (4 forced-choice) → Lowest priority; other systems cover this territory.

**Total minimum questions for the full Signal Gatherer**: ~25-35 questions + 3 birth detail fields. Could be delivered in 8-12 minutes. But the design allows partial completion — even birth details + values + one other block gives the agent enough to begin.

#### The Invisible Modality Principle

The user never sees: "This section assesses your Enneagram type."
The user sees: "A few quick questions so I can understand how you're wired."

The output never says: "Based on your anxious attachment style..."
The output says: "You seem to have a strong radar for emotional distance — when someone pulls away, your system activates fast. That's actually useful information about how your Tuned Emotions key works."

The modalities are the agent's *internal mapping tools*. The user's experience is purely FourFlow. This is what makes it feel proprietary even though it draws on public knowledge — the synthesis is the innovation, not the inputs.

**How import works technically**:
- User pastes text, uploads results, or describes from memory
- Agent reads each input and generates **hypotheses** — preliminary observations mapped to the 12 keys
- These are explicitly framed as hypotheses, not conclusions
- Multiple inputs that converge on the same key = stronger signal
- Contradictions between systems = interesting data points for Phase B

**Example mapping flow**:

> User imports: "I'm an INFJ, Enneagram 4w5, Pisces Sun / Virgo Moon / Scorpio Rising"
>
> Agent hypotheses:
> - **Tuned Emotions**: Deep emotional sensitivity (INFJ Fe + Enneagram 4 + Pisces Sun). Likely wide range but possible overwhelm patterns. Scorpio Rising suggests intensity that needs conscious regulation.
> - **Open Mind**: Ni-dominant (INFJ) can create strong conviction that resists new information. Virgo Moon may over-analyze. Hypothesis: selectively open — deeply intuitive but can become rigid about own insights.
> - **Grounding Values**: Enneagram 4 = authenticity as core value. Strong signal. But the 4w5 wing may intellectualize values rather than embody them. Worth checking the gap.
> - **Ignited Curiosity**: 5 wing = knowledge-seeking. Pisces = drawn to mystery. Strong curiosity signal but may be diffuse rather than focused.

### Phase B: "Let's Check"

A 15-25 minute conversation. Not a question-and-answer session — a dialogue where the agent shares what it sees from the imports and the user responds naturally.

**The conversation has three movements:**

#### Movement 1: Reflection (5-8 min)
*"Here's what I see in what you brought me."*

The agent presents its synthesis — the top 3-4 strongest signals and 1-2 interesting tensions. Framed as observations, not diagnoses. The user reacts: "Yes, that's exactly it" or "No, that's not quite right" or "It used to be that way but..."

The reactions themselves are data. How someone corrects you tells you more than their original answer.

**Example**:
> Agent: "Everything you've shared points to someone with deep emotional range — you feel things intensely and that's actually a creative asset. But I notice a pattern: the Enneagram 4, the Pisces, the INFJ... these all suggest someone who can get *pulled under* by that depth. Does that land, or is that an old version of you?"
>
> User: "It used to be true. I've done a lot of work on that. Now I can feel deeply without drowning."
>
> Agent: [Updates Tuned Emotions from "Narrow" hypothesis to "Wide" — and notes the growth arc, which is itself a signal for Generative Story]

#### Movement 2: The Gaps (5-10 min)
*"There are a few things I can't see from what you've shared."*

The imports leave gaps. The conversation fills them — but through stories, not scales. The agent asks about specific life situations that reveal the keys it can't infer from imports.

**Key-specific gap-filling approaches:**

| Key | What imports usually miss | How the conversation fills it |
|-----|--------------------------|-------------------------------|
| **Focused Body** | No personality test measures embodiment | "When you're stuck on something, what do you do? Walk? Think harder? Check your phone?" |
| **Intentional Space** | Personality tests don't capture environment | "Describe where you do your best thinking. Now describe where you actually spend most of your time." |
| **Optimized Tools** | No system captures tool relationship | "What's your relationship with your tools? Do they disappear when you're working, or do you fight them?" |
| **Feedback Systems** | Rarely captured in personality frameworks | "Do you tend to check metrics obsessively, or avoid looking at numbers entirely?" |
| **Clear Mission** | Tests capture values and traits, not current target | "What are you actually building right now? Not the dream — the thing you're working on this month." |
| **Empowered Role** | DISC/MBTI hint at it, but don't capture agency | "Did you choose your current role, or did you end up here? What would you change about it if you could?" |

The questions feel like a good conversation, not an intake form. The agent follows the thread — if someone lights up talking about their space, go deeper there. If they get vague about mission, that's the signal.

#### Movement 3: The Mirror (3-5 min)
*"Here's your Flow Profile as I see it right now."*

The agent presents the initial profile — all 12 keys, with a brief observation for each and a placement on the three-level spectrum. Plus:
- **The primary pattern**: Which pillar is strongest, which is the bottleneck
- **The cascade**: What would unlock if the bottleneck key shifted
- **One question to sit with**: Not an action item — a question that the agent will return to

**Example output**:

> **Your Flow Profile — Initial Read**
>
> SELF (Reception): Strong emotional range, body is the gap
> - Tuned Emotions: Wide — you've done the work here
> - Focused Body: Disconnected → Aware — this is your unlock
> - Open Mind: Fluid in growth areas, selective in expertise
>
> SPACE (Transmission): Functional but unexamined
> - Intentional Space: Partially Designed — default setups dominate
> - Optimized Tools: Invisible — tools are extensions of thought
> - Feedback Systems: Optimal — natural review rhythms
>
> [... etc.]
>
> **Primary pattern**: Your SPIRIT pillar is your engine — values, curiosity, and vision are all strong. But the signal gets lost at the SELF layer because your body isn't in the conversation. You think your way through everything, and it works 80% of the time. The other 20% is where the body would have told you something your mind couldn't.
>
> **The cascade**: If Focused Body moves from Disconnected to Aware, your Tuned Emotions (already wide) get a new input channel. That opens the whole reception layer. Everything downstream sharpens.
>
> **Question to sit with**: "What does my body know right now that my mind hasn't caught up to?"

---

## What the Agent Needs to Do This Well

### Framework Knowledge (System Prompt)

The agent needs compressed but deep understanding of:

1. **The 12 keys**: What each one means, what it looks like at each level, how they interact. Source: `docs/research/*/Flow_Key_Explanation.md` + the diagnostic levels in the ARK Blueprint.

2. **Cross-key cascades**: How keys influence each other. Source: The Interaction Web in the ARK Blueprint. This is critical — the agent's unique value is seeing *connections* between keys, not just individual scores.

3. **The mapping logic**: How external personality systems correspond to the 12 keys (the table above, expanded with actual mapping rules).

4. **Conversational observation**: How to read what someone says (and doesn't say) as signals. The diagnostic questions in each key's `Diagnostic_Measurement.md` inform this, but the agent should NEVER ask them directly. They're the map it uses to interpret natural conversation.

### What it does NOT need:

- The full research documents (too much volume, and it shouldn't cite science at the user)
- Prescriptive protocols (the intake generates the profile, not a treatment plan)
- Perfect accuracy (the profile is explicitly "initial read" — it evolves)

---

## Technical Shape

### Where it lives:
- **First implementation**: A Claude skill (`/profile-intake` or integrated into `/align` as an onboarding flow)
- **Product implementation**: FlowZone Web — the primary digital surface
- **API-first**: The intake conversation and resulting profile are structured data, not just text

### Profile data structure:

```
FlowProfile:
  created: timestamp
  last_updated: timestamp
  sources: [list of imports used]

  pillars:
    self:
      tuned_emotions:
        level: "narrow" | "moderate" | "wide"
        observation: string  # What the agent sees
        evidence: string[]   # What this is based on
        pattern: string      # Longitudinal note
        confidence: "low" | "medium" | "high"

      focused_body:
        level: "disconnected" | "aware" | "integrated"
        ...

      open_mind:
        level: "rigid" | "selective" | "fluid"
        ...

    space:
      intentional_space:
        level: "accidental" | "partially_designed" | "crafted"
        ...
      optimized_tools:
        level: "fighting" | "functional" | "invisible"
        ...
      feedback_systems:
        level: "too_much" | "too_little" | "optimal"
        ...

    story:
      generative_story:
        level: "contaminated" | "mixed" | "redemptive"
        ...
      clear_mission:
        level: "vague" | "partial" | "locked"
        ...
      empowered_role:
        level: "passive" | "reactive" | "proactive"
        ...

    spirit:
      grounding_values:
        level: "wide_gap" | "aware" | "closed"
        ...
      ignited_curiosity:
        level: "closed" | "sporadic" | "optimal"
        ...
      visualized_vision:
        level: "abstract" | "thin" | "real"
        ...

  patterns:
    primary_bottleneck: string     # Which key/pillar is the stuck point
    primary_strength: string       # Where energy naturally flows
    active_cascade: string         # The unlock path
    sitting_question: string       # The question the agent returns to

  development_arc: Entry[]         # Timestamped observations over time
```

### Confidence system:
- **High**: Multiple imports converge + conversation confirms
- **Medium**: One import suggests + conversation doesn't contradict
- **Low**: Inferred from conversation alone, or imports contradict each other

The confidence level determines how assertively the agent speaks about a key and how quickly it updates when new evidence appears.

---

## What Makes This Top-of-Funnel

### The shareable moment:
The Mirror output (Movement 3) is designed to be screenshot-worthy. Not a generic personality label — a specific, insightful read that feels personal. "Here's what's blocking your flow, and here's what would open it."

### The hook:
The initial profile is valuable on its own. But the real value is longitudinal — the agent watching how the profile shifts over time. The intake creates the baseline; the subscription keeps it alive.

### The upgrade path:
1. **Free**: Take the intake, get your initial Flow Profile
2. **Agent**: Subscribe for the FourFlow Agent — it watches, updates, asks questions over time
3. **Coaching**: Work with a certified practitioner who can see your profile and guide deeper work
4. **Organizational**: Map your team's profiles, find the collective bottleneck

---

## Open Design Questions

1. **How much import is too much?** If someone dumps MBTI + Enneagram + Astrology + Human Design + Big Five + DISC + attachment style... does the synthesis get noisy? Should there be a suggested "bring 2-3 that resonate most"?

2. **The astrology question**: Astro is rich and deeply personal but divisive. Some people will love that it's included; others will dismiss the whole system. Should it be a visible import option, or tucked behind "other self-knowledge"?

3. **Conversation length**: 15-25 minutes is a design target. But some people will want to go deep (45 min), and some will want the quick version (5 min). Does the experience scale gracefully?

4. **First profile vs. evolving profile**: The intake generates v1. But the ongoing agent updates are the real product. How explicit should the intake be about "this is your starting point, not your final answer"?

5. **Standalone vs. in-context**: Should the intake be a dedicated experience (go to the website, take the profile), or embedded in a first conversation with the agent (just start talking, it builds the profile as you go)?

6. **The mapping layer depth**: How formally should external systems map to keys? A loose heuristic ("Enneagram 4 suggests strong values orientation") vs. a detailed mapping table that the agent follows precisely?

---

*This design is the seed for tomorrow's work. React to it, challenge it, refine it.*
