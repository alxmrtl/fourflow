# FlowSpace - Final Product Specification
## Flow-Inducing Productivity PWA

---

## PRODUCT VISION

A cross-platform PWA that trains your brain to sustain focus and cultivate flow states. Bridges long-term vision with daily action through simple, holistic design. Makes the invisible work of staying focused visible and celebrates it. Works seamlessly on phone (primary) and desktop (secondary).

**Core Promise:** Look forward to your focus sessions. See your progress. Build your flow muscle.

---

## DESIGN PHILOSOPHY

### Simplicity First
- 80/20 everything
- No guesswork
- Clean connections
- Optional depth, mandatory clarity
- Defer to simple, holistic over complex hierarchies

### Contrast as Interface
**Navigation Mode** (Vibrant brand colors)
- Planning, connecting to meaning, reviewing
- Rich color: Amethyst, Steel Blue, Sage Green, Coral
- Engaging and inspiring

**Focus Mode** (Minimalist zen)
- Timer running, work happening
- Monochrome or single muted tone
- Zero distraction
- Calm presence

### Flow Principles Woven In
- Not explicit how-to's
- Motivational language embedded
- Visual design reinforces flow science
- Experience teaches the principles

---

## CORE USER FLOWS

### Flow 1: First Time Setup (Optional, Skippable)
**Goal: Establish the four pillars quickly without overwhelm**

User can skip entirely and go straight to timer, but gentle UX invites completion.

**SPIRIT (~30 seconds)**
- "What drives you?"
- Select 3-5 values from curated list
- Optional: Add life vision (image or text, can do later)

**STORY (~1 minute)**
- "What are you building long-term?"
- Add 1-3 major goals (title + optional why)
- Explain: Tasks can connect to these for meaning

**SPACE (~30 seconds)**
- Default timer duration (25/50/custom min)
- Sound preference (silence/white noise/binaural)
- Enable breathwork before/after sessions? (yes/no)

**SELF (~30 seconds)**
- "This is where your daily work lives"
- Quick tour of PLAN → FOCUS → REVIEW
- Done. Go focus.

**Total time: ~3 minutes if completed, 0 if skipped**

Visual gaps in nav indicate incomplete sections (subtle, not nagging).

---

### Flow 2: Morning Planning (Open-Ended)
**Goal: Quick or deep task prep, user's choice**

User opens app → lands in **SELF: PLAN**

**Options:**
1. **Quick Start**: Tap "New Session" → enter task → go
2. **Structured Planning**:
   - Review task backlog
   - Add new tasks (one-off or goal-linked)
   - Optional: Schedule sessions for the day
   - Choose first task → start session

**Task Input:**
- Title (required)
- Link to long-term goal (optional, dropdown)
- Quick note (optional)
- That's it.

**Backlog:**
- Running list of tasks
- Can add anytime
- Pull from backlog when ready to focus
- Clean, simple list view

---

### Flow 3: Focus Session (The Core Experience)
**Goal: Enter flow, train focus muscle, track resistance reps**

#### Pre-Session (Optional)
**Breathwork Primer** (if enabled in settings)
- 1-minute guided breathing
- Visual animation (circle expanding/contracting)
- Pattern optimized for focus/alertness
- "Preparing your mind for deep work"
- Can skip anytime

#### Transition to Focus Mode
- Screen dims/simplifies
- Brand colors fade
- Interface reduces to essentials
- Smooth, settling animation (2-3 seconds)

#### Focus Mode Interface

**Visible Elements:**

1. **Task Display** (Top third, centered)
   - Task title (large, readable)
   - If linked to goal: "Building: [Goal Name]" (subtle, small)
   - If linked to value: Small icon or color accent

2. **Timer** (Center)
   - Circular or linear progress
   - Time remaining prominent
   - Clean, minimal typography

3. **[Focus] Button** (Prominent, accessible)
   - Large button, bottom third of screen
   - Label: "FOCUS" or "STAY" or "ONE MORE" (needs testing—not "Remain")
   - Single tap interaction
   - Subtle haptic + visual ripple feedback
   - Counter visible: "6 today" or "6 reps"
   - Purpose: Press when you feel distraction pull, choose to stay

4. **Struggle Phase Indicator** (Ambient, subtle)
   - First ~25% of session (e.g., 6-7 min of 25 min timer)
   - Soft amber/warm glow around edges or behind timer
   - Tiny motivational text (rotates):
     - "Building focus neurochemistry..."
     - "Struggle phase = growth phase"
     - "Your brain is warming up"
     - "The breakthrough is coming"
   - Fades out after:
     - Time threshold OR
     - No distraction taps for 5+ min
   - No user input required—just encouragement

5. **Minimal Controls** (Tucked away)
   - Pause
   - End session
   - Emergency exit to nav

**During Session:**
- User works
- Feels distraction → taps button → continues
- Each tap = 1 rep counted
- Struggle indicator fades naturally
- Timer completes → gentle alert (sound + haptic)

#### Post-Session
**Breathwork Recovery** (if enabled)
- 1-minute guided breathing
- Visual animation
- Pattern optimized for recovery/parasympathetic
- "Integrating your work, releasing tension"
- Can skip

**Quick Review** (10 seconds)
- "Nice work. [X] reps today."
- Energy check: slider or 1-5 scale (optional)
- "Felt flow?" yes/no (optional, for data)
- Button: "Take break" or "Next session"

**Distraction Reflection** (Optional, appears sometimes)
- "Notice any patterns in what pulled your attention?"
- Quick tags: social media / email / anxiety / boredom / physical / other
- "This helps you see patterns over time"
- Easily dismissible, not required

---

### Flow 4: Review & Reflection
**Goal: Celebrate progress, spot patterns, maintain motivation**

User opens **SELF: REVIEW** (end of day or anytime)

**Displays:**

1. **Today's Stats**
   - Sessions completed
   - Total focus time
   - Reps counted (with celebration if high)
   - "Your focus muscle is getting stronger"

2. **Rep Trends**
   - Graph over time (daily/weekly reps)
   - Highlight: Sessions with fewer reps = stronger focus endurance
   - "You needed 8 reps today vs 15 last week. Progress."
   - Celebrate both: high reps (you stayed!) and low reps (endurance building)

3. **Goal Momentum** (if goals exist)
   - "3 tasks advanced Creative Mastery"
   - Visual progress per goal
   - Narrative thread visible

4. **Patterns** (if distraction tags used)
   - "You're often distracted around 2pm—schedule breaks then?"
   - Gentle insights, not judgmental

5. **Streaks & Milestones**
   - Days with at least one session
   - Total lifetime reps (100, 500, 1000 milestones)
   - Celebration on milestones (confetti, message)

6. **Reflection Prompts** (Optional)
   - "What worked today?"
   - "What drained your energy?"
   - "One win to celebrate?"
   - Freeform text, saved

---

## FOUR-PILLAR STRUCTURE

### 1. SPIRIT (⭐ Amethyst #7A4DA4)
**"Why does this matter?"**

**Elements:**
- **Values** (3-5 selected from curated list)
  - Display as cards or icons
  - Each shows its pair (Freedom + Generosity → Dreams)
  - Always accessible, subtly visible elsewhere in app

- **Vision** (Optional image or text)
  - "Future self" snapshot
  - Curiosity list: "What I'm genuinely drawn to explore"
  - Editable anytime

- **Narrative Thread**
  - Shows how today's work connects to values
  - "Your work today expressed: Focus, Love, Presence"

**UI:**
- Purple gradients
- Constellation/star aesthetic
- Peaceful, inspiring
- Not visited daily unless desired

---

### 2. STORY (📚 Steel Blue #5B84B1)
**"What am I building?"**

**Elements:**
- **Long-Term Goals** (1-5 major goals)
  - Title + why it matters
  - Optional: connection to specific value
  - Optional: timeline/milestones
  - Visual progress indicator (based on completed tasks)

- **Momentum Tasks**
  - Running list of tasks tagged to each goal
  - Quick-add from goal view
  - See all tasks for a goal in one place

- **Goal Visualization**
  - Simple tree/river showing vision → goals → tasks
  - Click task to see its goal context
  - Click goal to see all its tasks

**UI:**
- Blue waves/river imagery
- Journey/path aesthetic
- Forward momentum feeling
- Visited when adding tasks or reviewing progress

**Keep It Simple:**
- No yearly/quarterly/monthly breakdown
- Just: Long-term goal → tasks that build it
- System calculates "momentum" based on task completion

---

### 3. SPACE (📱 Sage Green #6BA292)
**"What supports my flow?"**

**Elements:**
- **Session Settings**
  - Default timer duration (25/50/custom)
  - Break duration
  - Long break settings

- **Environment**
  - Sound: Silence / White noise (rain, cafe, etc.) / Binaural beats
  - Volume control
  - Breathwork: Enable before/after sessions

- **Integrations** (Future)
  - Do Not Disturb auto-enable
  - Calendar sync
  - Lighting suggestions

- **Feedback Dashboard**
  - Session stats
  - Rep tracking over time
  - Flow state frequency
  - Energy correlations

**UI:**
- Green natural gradients
- Organic, breathing shapes
- Clean toggles and sliders
- Calming, supportive

---

### 4. SELF (✓ Coral #FF6F61)
**"What am I doing now?"**

**Three Phases:**

#### PLAN
- Task backlog (running list)
- Add new tasks (quick entry)
- Optional: link to goals
- Schedule or freeform approach
- Start session button

#### FOCUS (The timer zone - see Flow 3 above)
- Minimalist interface
- Task + timer + focus button
- Struggle phase support
- Zero distraction

#### REVIEW
- Session stats
- Rep celebration
- Pattern insights
- Reflection prompts
- Momentum visibility

**UI:**
- Warm coral tones
- Circular/cyclic imagery
- Present-moment energy
- Action-oriented

---

## KEY FEATURES DETAILED

### The Focus Button (Needs Better Name)
**Purpose:** Make distraction resistance training conscious and gamified

**Mechanics:**
- You feel pull to switch tasks/check phone/get up
- You notice it (awareness)
- You tap the button (choice)
- You continue working (rep complete)
- Counter increments, subtle celebration

**Psychology:**
- Reframes distraction as opportunity
- Makes neuroplasticity visible
- Builds agency
- Positive feedback loop
- Tracks invisible work

**Naming Options to Test:**
- FOCUS
- STAY
- ONE MORE
- COMMIT
- ANCHOR
- RETURN
- ROOT
- PRESENT

**Display:**
- Daily counter: "6 reps"
- Weekly total
- All-time total
- Milestones celebrated

**Celebration Logic:**
- High reps = "You showed up and stayed. That's strength."
- Low reps = "Your endurance is building. Fewer pulls today."
- Declining reps over time = "Your focus muscle is growing."
- Both are wins.

---

### Struggle Phase Support
**Purpose:** Normalize the hard beginning, provide encouragement

**Implementation:**
- Triggered at session start
- Lasts ~25% of session timer OR until pattern suggests flow entry
- Pattern: No button taps for 5+ consecutive minutes
- Visual: Soft amber/warm glow (edge or background)
- Text (small, rotational, motivational):
  - "Building focus neurochemistry..."
  - "Struggle = growth. Stay with it."
  - "The breakthrough is near."
  - "Your brain is warming up."
  - "This discomfort is temporary."

**Fade Out:**
- Gentle gradient transition
- No announcement
- Just dissolves into neutral/flow aesthetic

**No User Action Required:**
- Purely ambient support
- Reinforces that struggle is normal and productive

---

### Breathwork Integration
**Purpose:** Prime nervous system for focus (before) and recovery (after)

**Settings:**
- Enable/disable for before sessions
- Enable/disable for after sessions
- Independent toggles

**Before Session (1 minute):**
- Visual: Circle or shape expanding/contracting
- Pattern: Box breathing or energizing ratio (e.g., 4-4-4-4 or 4-2-6-2)
- Text: "Preparing your mind for deep work"
- Skippable anytime

**After Session (1 minute):**
- Visual: Same, different color/pace
- Pattern: Calming ratio (e.g., 4-7-8 or extended exhale)
- Text: "Integrating your work, releasing tension"
- Skippable anytime

**Design:**
- Clean, minimal
- No timer countdown (defeats purpose)
- Just breath, visual, presence
- Smooth transition in/out

---

### Narrative Thread Visualization
**Purpose:** Show how daily tasks connect to long-term meaning

**Simple Implementation:**
- In STORY view: Tree or river graphic
  - Roots/source = Values (SPIRIT)
  - Trunk/flow = Long-term goals
  - Branches/tributaries = Tasks

- Tap any element to navigate:
  - Tap value → see goals that express it
  - Tap goal → see tasks that build it
  - Tap task → see goal + value context

**In FOCUS Mode:**
- Task shows with small subtitle:
  - "Building: Creative Mastery"
  - Small icon for related value

**In REVIEW:**
- "Today you advanced: [Goal A, Goal B]"
- "Your work expressed: [Value X, Value Y]"
- Visual momentum meter per goal

**Keep Simple:**
- No complex hierarchies
- Just: Value → Goal → Task
- Clean, obvious connections

---

## TECHNICAL SPECIFICATIONS

### Platform: PWA (Progressive Web App)
**Why PWA:**
- Cross-platform (phone + desktop)
- Single codebase
- Installable (home screen icon)
- Offline-capable
- No app store barriers

**Framework Recommendation:**
- React or Svelte (lightweight, fast)
- TailwindCSS for styling (utility-first, easy theming)
- Local-first architecture (IndexedDB or similar)
- Optional: Supabase or Firebase for cloud sync

---

### Data Architecture

**Local-First:**
- All data stored on device by default
- Instant performance
- Privacy-first
- Works offline (critical for focus sessions)

**Cloud Sync (Optional):**
- User opts in
- Enables cross-device use (phone ↔ desktop)
- Encrypted
- User owns/can export data anytime

**Data Models:**

**User Profile**
- Values (array)
- Vision (text/image URL)
- Settings (timer defaults, sounds, breathwork prefs)

**Goals**
- ID
- Title
- Description/why
- Linked value (optional)
- Created date
- Status (active/archived)

**Tasks**
- ID
- Title
- Notes (optional)
- Linked goal ID (optional)
- Status (backlog/completed)
- Completed date
- Created date

**Sessions**
- ID
- Task ID
- Duration (planned)
- Actual duration
- Reps (button tap count)
- Distraction tags (array, optional)
- Energy level (1-5, optional)
- Felt flow (boolean, optional)
- Breathwork used (boolean)
- Timestamp

**Reflections** (optional, for REVIEW)
- Date
- Freeform text
- Linked session IDs

---

### Performance Requirements

**Critical:**
- App load: <2 seconds
- Transition to focus mode: <500ms
- Button tap response: <100ms (instant feel)
- Timer accuracy: ±1 second over 25 min
- 60fps animations
- Minimal battery drain (sessions can run 2+ hours)
- Offline functionality for timer

**Optimization:**
- Lazy load non-essential sections
- Preload focus mode assets
- Efficient timer implementation (Web Workers?)
- Compress audio files
- Minimize re-renders during session

---

### Audio System

**Requirements:**
- Background audio during focus session
- Multiple tracks: white noise, rain, cafe, binaural beats
- Volume control
- Fade in/out on session start/end
- Works offline (preloaded)
- Doesn't interrupt user's music if they prefer silence

**Sources:**
- Host audio files or use royalty-free libraries
- Compress for web (MP3/OGG)
- Option for "system sounds" integration (future)

---

### Notifications

**Minimal, Optional:**
- End of focus session (gentle alert)
- End of break (if timer running)
- Daily reminder (opt-in, gentle: "Ready for flow?")
- Milestone celebration (1000 reps, etc.)

**Never:**
- Guilt-inducing
- Manipulative engagement
- Streak-loss warnings
- Comparison to others

---

### Cross-Device Sync Strategy

**Challenge:** User wants to use phone at desk and desktop elsewhere

**Solution:**
- Local-first always
- Optional cloud sync (account creation)
- Sync triggers:
  - On app open (pull latest)
  - On session complete (push update)
  - On task add/edit (push update)
  - Periodic background sync (if installed as PWA)

**Conflict Resolution:**
- Last-write-wins for settings/goals/tasks
- Sessions append-only (no conflicts)
- Merge, don't overwrite

**Implementation:**
- Use Firebase Firestore, Supabase, or custom backend
- Authenticated but simple (email/password or magic link)
- Clearly communicate sync status in UI

---

## USER INTERFACE SPECIFICATIONS

### Color System

**Navigation (Vibrant Brand Colors):**
- **Spirit:** Amethyst #7A4DA4
- **Story:** Steel Blue #5B84B1
- **Space:** Sage Green #6BA292
- **Self:** Coral #FF6F61
- **Neutrals:** Charcoal #333333, Ivory #F5F5F5

**Focus Mode (Minimalist):**
- Background: Soft off-white (#F9F9F9) or charcoal (#2A2A2A) depending on theme
- Text: High contrast black/white
- Timer: Neutral gray or single muted accent
- Button: Subtle color (muted coral or blue)
- Struggle indicator: Warm amber (#E8A87C)

**Transitions:**
- Smooth fade from vibrant to minimalist (2-3 sec)
- Color desaturation animation
- Breathing/settling effect

---

### Typography

**Fonts:**
- **Primary:** Clean sans-serif (Inter, DM Sans, or similar)
- **Display:** Optional serif for headers (Fraunces, Lora) for warmth
- Minimum 16px base size (accessibility)
- High contrast ratios

**Hierarchy:**
- Clear differentiation between levels
- Not too many weights
- Spacious, readable, calm

**Focus Mode:**
- Large task title (24-32px)
- Large timer (48-64px)
- Small context text (12-14px)
- Button label (16-18px)

---

### Layout & Navigation

**Mobile-First Design:**
- Single-column layouts
- Thumb-friendly tap targets (min 44px)
- Bottom navigation or tab bar
- Swipe gestures (optional, not required)

**Desktop Adaptation:**
- Centered max-width (800px content area)
- Sidebar navigation (optional)
- Keyboard shortcuts for power users
- Larger type, more breathing room

**Navigation Structure:**
- Bottom tab bar (mobile) or sidebar (desktop):
  - SPIRIT
  - STORY
  - SPACE
  - SELF (default home)
- SELF has sub-tabs: PLAN / FOCUS / REVIEW
- Focus mode: Navigation hidden, emergency exit accessible

---

### Animations & Motion

**Purpose:** Reinforce flow, not distract

**Principles:**
- Smooth (ease-in-out)
- Purposeful (guide attention)
- Subtle (not flashy)
- Calming (breathing pace)

**Key Animations:**
- **Focus mode entry:** Fade, blur, settle (2-3 sec)
- **Button tap:** Ripple + haptic (instant)
- **Struggle indicator fade:** Gradual (30 sec)
- **Timer progress:** Smooth, continuous
- **Breathwork:** Expanding/contracting (breath pace)
- **Milestone celebration:** Brief confetti or glow (2 sec)

**Performance:**
- CSS transforms (GPU-accelerated)
- Avoid layout thrashing
- 60fps minimum

---

### Accessibility

**Must-Haves:**
- WCAG AA contrast ratios minimum
- Keyboard navigation (desktop)
- Screen reader support (ARIA labels)
- Focus indicators (keyboard nav)
- Text scaling support
- Colorblind-friendly palette
- High-contrast mode option
- Reduced motion option (respects system pref)

**Testing:**
- axe DevTools
- Lighthouse audit
- Manual screen reader testing (VoiceOver, NVDA)

---

## CONTENT & MICROCOPY

### Voice & Tone
- **Warm, supportive, grounded**
- Encouraging without being pushy
- Clear without being clinical
- Confident without being arrogant
- Celebrates effort, not just outcomes
- Acknowledges difficulty
- Emphasizes agency and choice

### Example Microcopy

**Onboarding:**
- "This app trains your focus muscle. Let's set up your why."
- "What values drive you?" (not "Select your values")
- "What are you building long-term?" (not "Enter your goals")
- "You can skip this and start focusing right now. But connecting tasks to meaning helps."

**During Focus:**
- "Building: Creative Mastery" (context subtitle)
- "6 reps" (counter, simple)
- "Struggle phase = growth phase" (encouragement)
- "Your brain is warming up" (normalization)

**After Session:**
- "Nice work. 8 reps today—you chose to stay."
- "Your focus muscle is getting stronger."
- "You needed fewer reps today than last week. That's progress."

**Review:**
- "3 tasks advanced Creative Mastery today."
- "Your work expressed: Focus, Love, Presence."
- "Sessions with fewer reps mean your endurance is building."
- "You often get distracted around 2pm—try scheduling a break then?"

**Milestones:**
- "100 reps! Every time you stay, you're rewiring your brain."
- "7-day streak. Flow is becoming a habit."

---

## METRICS & ANALYTICS

### What We Track (For User)
1. **Rep count** (daily, weekly, all-time)
2. **Focus time** (actual minutes in sessions)
3. **Session completion rate** (started vs. finished)
4. **Goal momentum** (tasks completed per goal)
5. **Streak** (consecutive days with ≥1 session)
6. **Rep trends** (declining = endurance building)
7. **Distraction patterns** (optional tags over time)
8. **Energy correlations** (if user inputs energy levels)
9. **Flow frequency** ("Felt flow?" yes/no tracking)

### What We Don't Track
- No guilt metrics (overdue tasks, missed days with shame)
- No social comparison
- No manipulative engagement metrics
- No time spent "in app" (irrelevant)

### How We Display
- **Simple visualizations:** Line graphs, bar charts, progress circles
- **Narrative insights:** "You're getting distracted less often"
- **Celebrate both directions:**
  - High reps = resilience
  - Low reps = endurance
- **Weekly review format:** Digestible chunks
- **Long-term trends:** Months/years for motivation

### App Health Metrics (Internal)
- Daily active users
- Retention (7, 30, 90 days)
- Average sessions per user per week
- Average session duration
- Feature usage (4 pillars balanced?)
- Sync adoption rate
- NPS/feedback sentiment

### North Star Metric
**"Total focus time per user per week"**
- Measures actual value delivered
- Aligns with user goals
- Indicates habit formation

---

## MVP SCOPE (Phase 1)

### Absolutely Essential

**SPIRIT (Minimal):**
- Select 3-5 values (from list)
- Optional vision text/image
- Display in nav

**STORY (Minimal):**
- Add 1-5 long-term goals (title + why)
- Link tasks to goals (optional)
- Simple progress display

**SPACE (Minimal):**
- Timer duration setting (25 min default)
- Sound preference (silence/white noise options)
- Breathwork enable/disable

**SELF (Full):**
- Task backlog + quick add
- Focus mode with:
  - Timer
  - Focus button + rep counter
  - Struggle phase indicator
  - Minimal controls
- Session review (basic stats)
- Daily review (rep count, time, basic insights)

**Core UX:**
- Focus mode contrast (vibrant → minimalist)
- Smooth transitions
- Rep tracking and celebration
- Offline functionality
- Mobile + desktop responsive

**MVP Omissions (Phase 2):**
- Cloud sync (local-only MVP)
- Breathwork animations (just timer setting)
- Advanced visualizations (tree/river graphics)
- Distraction pattern insights
- Calendar integrations
- Advanced goal milestones
- Community features
- Biometric integrations

---

## PHASE 2 & FUTURE

### Phase 2 (Post-MVP)
- Cloud sync + multi-device
- Breathwork visual animations
- Narrative thread visualization (tree/river)
- Distraction pattern analysis
- Advanced stats dashboard
- Goal milestone tracking
- Export data feature
- Keyboard shortcuts (desktop)

### Phase 3 (Future)
- Calendar/task manager integrations
- Do Not Disturb auto-enable
- Biometric flow detection (heart rate)
- Team/shared focus sessions
- Flow coach access (human, not AI)
- Smart insights (AI-powered, thoughtful)
- Customizable sound uploads
- Advanced theming

---

## SUCCESS CRITERIA

### The app succeeds if users:
1. **Look forward to focus sessions** (not dread them)
2. **Feel supported during struggle** (not alone)
3. **Celebrate resistance reps** (invisible work made visible)
4. **See meaning in daily tasks** (narrative connection)
5. **Build focus endurance** (declining reps over time)
6. **Experience flow more frequently** (self-reported)
7. **Integrate seamlessly** (not another burden)
8. **Return consistently** (30+ day retention)

### Quantitative Goals (First 90 Days Post-Launch)
- 30-day retention: >40%
- Avg sessions per active user per week: >3
- Session completion rate: >70%
- Rep tracking engagement: >60% of sessions
- "Felt flow" yes rate: >50% of sessions
- NPS: >50

---

## OPEN QUESTIONS & DECISIONS NEEDED

### 1. Focus Button Name
**Test these with users:**
- FOCUS
- STAY
- ONE MORE
- COMMIT
- ANCHOR

**Criteria:**
- One word, clear, empowering
- Not preachy or guilt-inducing
- Immediate meaning without explanation

---

### 2. Struggle Phase Duration
**Options:**
- Fixed: 25% of session (6-7 min for 25 min)
- Adaptive: Fades after 5 min of no button taps
- Hybrid: Both (whichever comes first)

**Recommendation:** Hybrid

---

### 3. Breathwork MVP Scope
**Question:** Include animated visuals in MVP or just timer countdown?

**Options:**
- MVP: Simple timer countdown + "Breathe in... hold... out..."
- Phase 2: Full animated circle/visual

**Recommendation:** MVP = simple, Phase 2 = animated

---

### 4. Task Backlog UI
**Question:** How prominent? Separate view or integrated into PLAN?

**Options:**
- Dedicated backlog tab/view
- Integrated into PLAN with "Scheduled Today" vs "Backlog" sections
- Simple list with drag-to-schedule

**Recommendation:** Integrated with sections, simple

---

### 5. Goal Progress Calculation
**Question:** How to calculate "momentum"?

**Options:**
- Simple: Task count (3 tasks completed → 3 momentum)
- Weighted: User assigns weight/importance to tasks
- Time-based: Focus time on goal-linked tasks

**Recommendation:** Start simple (task count), add weighting in Phase 2

---

### 6. Sync Strategy
**Question:** Require account for MVP or launch local-only?

**Options:**
- MVP: Local-only, add sync Phase 2
- MVP: Optional account, sync if desired
- MVP: Required account (simplifies multi-device)

**Recommendation:** Local-only MVP, sync Phase 2 (reduces complexity, faster launch)

---

### 7. Monetization
**Question:** How does this app sustain itself?

**Options:**
- Free with optional premium (sync, advanced stats, sounds)
- One-time purchase
- Low-cost subscription ($3-5/month)
- Freemium: Core free, advanced features paid
- Donation/pay-what-you-want

**Recommendation:** TBD based on values and user feedback
**Alignment:** Whatever doesn't compromise core experience or feel extractive

---

## DEVELOPMENT ROADMAP

### Phase 1: MVP (8-12 weeks)

**Week 1-2: Foundation**
- Tech stack setup (React/Svelte + TailwindCSS)
- Design system (colors, typography, components)
- Data models + local storage (IndexedDB)
- Basic navigation shell

**Week 3-4: SPIRIT & STORY**
- Values selection UI
- Vision input
- Goal creation + management
- Simple goal → task linking

**Week 5-6: SPACE & Settings**
- Timer settings
- Sound selection + integration
- Basic settings panel

**Week 7-9: SELF (Core)**
- Task backlog + add flow
- Focus mode interface
- Timer implementation
- Focus button + rep counter
- Struggle phase indicator
- Session review

**Week 10-11: Polish & Testing**
- Transitions (vibrant → minimalist)
- Animations
- Responsive design (mobile + desktop)
- Accessibility audit
- Performance optimization
- Bug fixes

**Week 12: Launch Prep**
- User testing (5-10 people)
- Feedback iteration
- Documentation
- Landing page
- Soft launch

### Phase 2: Sync & Enhancement (4-8 weeks)
- Cloud sync implementation
- Breathwork animations
- Advanced visualizations
- Distraction insights
- Export data

### Phase 3: Integrations & Scale (Ongoing)
- Calendar/tool integrations
- Community features
- Biometric support
- Continuous iteration based on user feedback

---

## GUIDING PRINCIPLES FOR DEVELOPMENT

### 1. Simplicity Over Cleverness
- Obvious beats clever
- Fewer features, better execution
- When in doubt, simplify

### 2. User Agency Always
- Never force, always invite
- Make everything optional (but encourage best practices)
- User owns their data

### 3. Performance Is UX
- Fast = respectful
- Smooth = calming
- Instant = empowering

### 4. Flow First
- Every decision: "Does this support or hinder flow?"
- Respect deep work time
- Celebrate the invisible work

### 5. Meaning Matters
- Connect tasks to purpose
- Make progress visible
- Narrative over metrics

### 6. Biology as Ally
- Work with natural rhythms
- Normalize struggle
- Celebrate resistance training

### 7. Design as Teacher
- UI reinforces flow principles
- Experience > explanation
- Subtle, woven, holistic

---

## FINAL THOUGHTS

This app is **not**:
- Another productivity grinder
- A guilt machine
- A complexity monster
- A distraction disguised as focus

This app **is**:
- A focus muscle trainer
- A meaning-maker
- A struggle normalizer
- A flow companion
- A resistance rep counter

**The magic is in:**
1. Making distraction resistance visible (the button)
2. Connecting daily tasks to long-term meaning (narrative thread)
3. Normalizing the struggle phase (ambient support)
4. Celebrating both types of progress (high reps = resilience, low reps = endurance)
5. Creating clear mental modes through design (contrast)
6. Keeping it simple, holistic, and joyful

**Success looks like:**
A user finishing a focus session, glancing at their rep count, smiling, and thinking: "I'm getting stronger. I can feel it."

---

*Document Version: 2.0 - Final Specification*
*Ready for Development*
*Next Step: Technical architecture + design mockups*
