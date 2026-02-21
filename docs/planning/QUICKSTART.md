# FlowSpace App - Quick Start Guide

## 🎉 Your Flow App is Ready!

The FlowSpace app has been successfully created in the `flow-app/` directory.

## ▶️ Start the App

```bash
cd flow-app
npm run dev
```

The app will be available at **http://localhost:5174/** (or the next available port)

## 📂 Project Structure

```
flow-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   └── SelfNav.jsx
│   ├── pages/            # Main page components
│   │   ├── Spirit.jsx    # Values & vision
│   │   ├── Story.jsx     # Goals & narrative
│   │   ├── Space.jsx     # Settings & environment
│   │   ├── Self.jsx      # Main SELF container
│   │   ├── SelfPlan.jsx  # Task planning
│   │   ├── SelfFocus.jsx # Focus mode timer
│   │   └── SelfReview.jsx # Stats & review
│   ├── store/            # State management
│   │   └── useStore.js   # Zustand store
│   ├── lib/              # Utilities
│   │   └── db.js         # IndexedDB wrapper
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/
│   └── logos/            # FourFlow brand assets
├── tailwind.config.js    # TailwindCSS config
├── vite.config.js        # Vite + PWA config
└── package.json
```

## 🎨 Features Implemented

### ✅ SPIRIT (Amethyst)
- Values selection from curated list
- Vision and curiosity tracking
- Narrative thread showing value connections

### ✅ STORY (Steel Blue)
- Long-term goal creation and management
- Task-to-goal linking
- Progress visualization per goal
- Goal momentum tracking

### ✅ SPACE (Sage Green)
- Timer duration settings (25/50/90 min presets + custom)
- Break duration configuration
- Sound options (silence, white noise, rain, cafe, binaural)
- Volume control
- Breathwork before/after toggle

### ✅ SELF (Coral)
- **PLAN**: Task backlog with quick add, goal linking
- **FOCUS**: Minimalist timer with:
  - Circular progress indicator
  - FOCUS button for rep tracking
  - Struggle phase support (first 25% of session)
  - Motivational messages
  - Session feedback (energy, flow state)
- **REVIEW**:
  - Daily/weekly stats
  - Rep trends visualization
  - Goal momentum display
  - Session history

## 🎯 Key Features

### 1. Focus Reps System
When you feel distracted during a session, tap the **FOCUS** button. Each tap = 1 rep = choosing to stay focused. The app celebrates both:
- **High reps**: You showed resilience despite many pulls
- **Low reps**: Your focus endurance is building

### 2. Struggle Phase Indicator
During the first ~25% of each session, you'll see encouraging messages like:
- "Building focus neurochemistry..."
- "Struggle phase = growth phase"
- "Your brain is warming up"

This normalizes the difficulty of starting deep work.

### 3. Contrast as Interface
- **Navigation Mode**: Vibrant FourFlow brand colors
- **Focus Mode**: Minimalist, distraction-free design
- Smooth transition helps train your brain for focus states

## 🚀 Next Steps

### Immediate Usage
1. Open the app at http://localhost:5174
2. Navigate to **SPIRIT** to set your values (optional but recommended)
3. Go to **STORY** to add a long-term goal (optional)
4. Visit **SPACE** to configure your timer (25 min default works great)
5. Head to **SELF → PLAN** to add your first task
6. Click "Start Session" to enter focus mode!

### Build for Production
```bash
npm run build
npm run preview
```

This creates an optimized build in `dist/` that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

### PWA Installation
Once deployed, users can install the app on their devices:
- **Mobile**: "Add to Home Screen" prompt
- **Desktop**: Install icon in browser address bar

## 🎨 Brand Colors Reference

All FourFlow brand colors are integrated:
- **Self (Coral)**: `#FF6F61` - Action, present moment
- **Space (Sage Green)**: `#6BA292` - Environment, support
- **Story (Steel Blue)**: `#5B84B1` - Journey, narrative
- **Spirit (Amethyst)**: `#7A4DA4` - Purpose, values
- **Charcoal**: `#333333` - Text
- **Ivory**: `#F5F5F5` - Background

## 📊 Data Storage

All data is stored locally in IndexedDB:
- No backend required for MVP
- Privacy-first approach
- Works offline
- Fast performance

## 🔧 Configuration

### Timer Presets
Located in `src/pages/Space.jsx`:
- 25 min (Pomodoro)
- 50 min (Deep Work)
- 90 min (Ultradian)
- Custom duration

### Curated Values
Located in `src/pages/Spirit.jsx`:
- 12 core values with pairs and dreams
- Easily customizable

### Struggle Messages
Located in `src/pages/SelfFocus.jsx`:
- 5 motivational messages
- Rotate every 10 seconds during struggle phase

## 🐛 Known Limitations (MVP)

- No cloud sync (local-only storage)
- No breathwork animations (just enable/disable)
- No audio playback (sound settings UI only)
- No distraction pattern tracking yet
- No data export feature

These are planned for Phase 2!

## 📱 Mobile Optimization

The app is fully responsive and mobile-first:
- Bottom navigation on mobile
- Sidebar navigation on desktop
- Touch-friendly tap targets
- Optimized for portrait orientation

## 💡 Tips for Best Experience

1. **Start Small**: Don't feel pressure to fill everything out immediately
2. **Link Tasks to Goals**: This creates the narrative thread
3. **Press FOCUS**: Don't be shy - every rep counts!
4. **Review Daily**: Even 30 seconds of reflection builds awareness
5. **Experiment**: Try different timer durations to find your flow

## 🎯 Success Metric

You'll know it's working when you:
- Look forward to focus sessions (not dread them)
- Feel supported during the struggle phase
- Celebrate your reps (visible progress!)
- See the narrative thread (tasks → goals → values)
- Notice your focus endurance building

---

**Built with the FourFlow philosophy: Simple, holistic, flow-inducing** 🌊

Enjoy your journey to deeper focus and flow! 🚀
