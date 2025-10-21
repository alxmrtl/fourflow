# FlowSpace - Flow-Inducing Productivity PWA

A cross-platform Progressive Web App designed to train your focus muscle and cultivate flow states. Bridges long-term vision with daily action through simple, holistic design.

## 🎯 Core Features

### The Four Pillars

1. **SPIRIT** (Amethyst #7A4DA4) - "What drives you?"
   - Values selection (3-5 core values)
   - Vision setting
   - Curiosity tracking
   - Narrative thread visualization

2. **STORY** (Steel Blue #5B84B1) - "What are you building?"
   - Long-term goal management
   - Goal-to-task linking
   - Progress visualization
   - Momentum tracking

3. **SPACE** (Sage Green #6BA292) - "What supports your flow?"
   - Timer duration settings (25/50/90 min presets)
   - Background sound options
   - Breathwork integration
   - Environment optimization

4. **SELF** (Coral #FF6F61) - "What am I doing now?"
   - **PLAN**: Task backlog and session planning
   - **FOCUS**: Minimalist timer with focus rep tracking
   - **REVIEW**: Stats, trends, and celebration

## ✨ Key Innovations

### Focus Reps
- Press the FOCUS button when you feel distraction pull
- Each choice to stay = 1 rep counted
- Makes the invisible work of maintaining focus visible
- Celebrates both high reps (resilience) and low reps (endurance building)

### Struggle Phase Support
- First ~25% of each session shows ambient encouragement
- Normalizes the difficulty of starting deep work
- Fades naturally as you settle into flow
- Science-backed motivational messaging

### Contrast as Interface
- **Navigation Mode**: Vibrant brand colors, rich and engaging
- **Focus Mode**: Minimalist zen, zero distraction
- Smooth 2-3 second transition trains your brain for focus

## 🚀 Getting Started

### Installation

```bash
cd flow-app
npm install
```

### Development

```bash
npm run dev
```

App will be available at http://localhost:5173 (or next available port)

### Build for Production

```bash
npm run build
npm run preview
```

### PWA Features

- Installable on mobile and desktop
- Offline-capable
- Local-first data storage
- Fast, responsive performance

## 🏗️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS with custom FourFlow theme
- **State Management**: Zustand
- **Database**: IndexedDB (via idb)
- **PWA**: vite-plugin-pwa with Workbox

## 📱 Usage

### First Time Setup (Optional, Skippable)
1. Select 3-5 core values in SPIRIT
2. Add 1-3 long-term goals in STORY
3. Configure timer and environment in SPACE
4. Start focusing in SELF

### Daily Flow
1. **Morning**: Open SELF → PLAN, add tasks, link to goals
2. **During Work**: Start session → Focus mode → Press FOCUS button when distracted
3. **Evening**: SELF → REVIEW to see progress and celebrate reps

## 🎨 Brand Colors

- **Self (Coral)**: #FF6F61
- **Space (Sage Green)**: #6BA292
- **Story (Steel Blue)**: #5B84B1
- **Spirit (Amethyst)**: #7A4DA4
- **Charcoal**: #333333
- **Ivory**: #F5F5F5

## 📊 Data Storage

All data is stored locally in IndexedDB:
- Profile & values
- Goals & tasks
- Sessions & reps
- Settings & preferences

Privacy-first: Your data never leaves your device (in MVP).

## 🔮 Roadmap

### Phase 1 (MVP) ✅
- Core four-pillar structure
- Focus mode with rep tracking
- Struggle phase support
- Basic stats and review
- PWA functionality

### Phase 2 (Planned)
- Cloud sync for multi-device
- Animated breathwork visuals
- Advanced narrative visualization
- Distraction pattern insights
- Data export

### Phase 3 (Future)
- Calendar integrations
- Team focus sessions
- Biometric flow detection
- Advanced theming

## 🙏 Philosophy

This app is **not**:
- Another productivity grinder
- A guilt machine
- A complexity monster

This app **is**:
- A focus muscle trainer
- A meaning-maker
- A struggle normalizer
- A flow companion

## 📄 License

MIT License - Built with ❤️ for flow seekers everywhere

---

**Success looks like:** A user finishing a focus session, glancing at their rep count, smiling, and thinking: "I'm getting stronger. I can feel it."
