# FlowZone App Store Submission Checklist

## Completed Code Fixes

These issues were automatically fixed in this review session:

- [x] Added Privacy Policy link to Settings > About (`https://fourflowos.com/privacy`)
- [x] Added Contact Support email to Settings > About (`support@fourflowos.com`)
- [x] Implemented Binaural Beats feature with real-time audio synthesis
  - 10 Hz alpha wave binaural beats for flow state induction
  - Uses AVAudioEngine stereo output (left: 200 Hz, right: 210 Hz)
  - Smooth 2-second fade-in to prevent jarring start
  - Volume control (10-60% range, default 30%)
  - Toggle in Settings and Flow view control panel
- [x] Verified no "beta", "coming soon", or "Android" references in codebase
- [x] Verified no user accounts (local data only via SwiftData)
- [x] Verified no subscriptions or in-app purchases
- [x] Verified no LLM/AI features requiring content safeguards
- [x] Verified no copyrighted content or competitor mentions

---

## Manual To-Dos Before Submission

### Critical (Must Complete)

- [x] **Add App Icon (1024x1024)**
  - Added `AppIcon.png` (Space.png) to `FlowZone/Resources/Assets.xcassets/AppIcon.appiconset/`
  - Updated `Contents.json` to reference the filename

- [ ] **Create Privacy Policy Page**
  - Host at `https://fourflowos.com/privacy`
  - Must cover: data collection, data storage (local only), no sharing with third parties
  - Since app uses local storage only, policy can be simple

- [ ] **Set Up Support Email**
  - Create `support@fourflowos.com` mailbox
  - Or redirect to your preferred email address

- [ ] **Configure Development Team**
  - Open Xcode project and set `DEVELOPMENT_TEAM` in Build Settings
  - Or sign in with your Apple Developer account

- [ ] **Create App Store Screenshots**
  - Required sizes: iPhone 6.7" (1290x2796), iPhone 6.5" (1284x2778), iPad 12.9" (2048x2732)
  - Key screens to capture:
    1. Flow view (main screen with Vision/Mission/ACT)
    2. Focus timer in progress
    3. Breathwork animation
    4. Review/Stats view
    5. Settings/Control panel

### App Store Connect Setup

- [ ] **App Information**
  - App Name: FlowZone (or your preferred name)
  - Subtitle: (30 chars max) e.g., "Focus & Flow State Timer"
  - Bundle ID: `app.fourflow.FlowZone`
  - Primary Category: Productivity
  - Secondary Category: Health & Fitness (optional)

- [ ] **App Description** (max 4000 chars)
  ```
  FlowZone helps you achieve deep focus and flow state through structured
  work sessions, breathwork exercises, binaural beats, and the Four Pillars framework.

  FOUR PILLARS OF FLOW:
  - Spirit: Define your values and vision
  - Story: Set meaningful goals
  - Space: Optimize your environment
  - Self: Take focused action

  KEY FEATURES:
  - Focus Timer: Customizable sessions (25, 50, or 90 minutes)
  - Binaural Beats: 10 Hz alpha waves to induce flow state (headphones recommended)
  - Focus Reps: Track when you resist distractions
  - Breathwork: 7 different breathing patterns for before/after focus
  - Daily Containers: Plan 1-5 focus sessions per day
  - Task Pipeline: Organize your work across goals
  - Stats & Review: Track your focus sessions and flow experiences

  All data is stored locally on your device. No account required.
  ```

- [ ] **Keywords** (100 chars max)
  ```
  focus,flow,timer,pomodoro,productivity,breathwork,binaural,alpha waves,deep work
  ```

- [ ] **Support URL**: `https://fourflowos.com/support`
- [ ] **Privacy Policy URL**: `https://fourflowos.com/privacy`
- [ ] **Age Rating**: Complete questionnaire (likely 4+, no objectionable content)

### Before Building for Submission

- [ ] **Test on Multiple Devices**
  - iPhone SE (small screen)
  - iPhone 15 Pro Max (large screen)
  - iPad (if targeting iPad)
  - Verify all text is readable and buttons are tappable

- [ ] **Test All Features**
  - Complete onboarding flow (Spirit > Story > Space)
  - Create goals and tasks
  - Run a focus session with timer
  - Test binaural beats with headphones (toggle in Settings or Flow control panel)
  - Test breathwork animations
  - Verify session stats are recorded
  - Test task completion and pipeline management

- [ ] **Archive and Validate**
  - Product > Archive in Xcode
  - Validate app for App Store issues
  - Fix any validation errors

### Review Notes for Apple

If Apple requests additional information, provide:

- [ ] **Demo Instructions**
  ```
  1. Launch app and complete onboarding (select values, add a goal)
  2. Add a task from the Flow screen
  3. Enable Binaural Beats in Settings > SETTINGS panel (optional, requires headphones)
  4. Tap START to begin a focus session
  5. Use the Rep button during focus to track distraction resistance
  6. Complete session and view stats in Review tab
  ```

- [ ] **No Test Account Needed**
  - App uses local storage only, no account required

---

## Technical Details

| Setting | Value |
|---------|-------|
| Bundle ID | `app.fourflow.FlowZone` |
| Version | 1.0.0 |
| Build | 1 |
| Minimum iOS | 17.0 |
| Swift | 5.0 |
| Architecture | Universal (iPhone + iPad) |
| Frameworks | SwiftUI, SwiftData, AVFoundation |

---

## Post-Submission

- [ ] Monitor App Store Connect for review status
- [ ] Respond to any review team questions within 24 hours
- [ ] If rejected, read rejection reason carefully and address specific issues
- [ ] Common rejection reasons to avoid:
  - Crashes or bugs
  - Incomplete features
  - Placeholder content
  - Missing privacy policy
  - Misleading app description
