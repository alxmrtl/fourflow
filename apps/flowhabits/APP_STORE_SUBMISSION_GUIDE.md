# FlowHabits - App Store Submission Guide

Complete step-by-step guide for submitting FlowHabits to the App Store.

---

## Pre-Submission Checklist

Before starting, ensure these are complete:

- [x] Privacy policy live at https://fourflowos.com/privacy
- [x] Support email configured: fourflowos@gmail.com
- [x] App icon added to Assets.xcassets
- [x] Bundle ID set: `app.fourflowos.FlowHabits`
- [x] Version: 1.0.0, Build: 1
- [x] `ITSAppUsesNonExemptEncryption` = false in Info.plist
- [ ] Test on multiple screen sizes
- [ ] Take screenshots for App Store

---

## Step 1: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in:

| Field | Value |
|-------|-------|
| Platform | iOS |
| Name | FlowHabits |
| Primary Language | English (U.S.) |
| Bundle ID | app.fourflowos.FlowHabits |
| SKU | flowhabits-ios-001 |
| User Access | Full Access |

---

## Step 2: App Information

Navigate to **App Store** → **App Information**

### Localizable Information

| Field | Value |
|-------|-------|
| Name | FlowHabits |
| Subtitle | Four Pillars Habit Tracker |
| Privacy Policy URL | https://fourflowos.com/privacy |

### General Information

| Field | Value |
|-------|-------|
| Bundle ID | app.fourflowos.FlowHabits |
| Content Rights | Does not contain third-party content |
| Age Rating | Click "Edit" and answer questionnaire (all "None") → Result: 4+ |

---

## Step 3: Pricing and Availability

Navigate to **App Store** → **Pricing and Availability**

| Field | Value |
|-------|-------|
| Price | Free |
| Availability | Available in all territories |
| Pre-Order | No |

---

## Step 4: Version Information

Navigate to **iOS App** → **1.0 Prepare for Submission**

### Screenshots Required

Capture these screens on each device size:

1. **Today View** - Main screen with habits organized by pillar
2. **Completing a Habit** - Tap animation/checkmark
3. **Stats View** - Streaks and completion data
4. **Add Habit** - Pillar selection screen
5. **Settings** - Habit management view

| Device | Resolution | Required |
|--------|------------|----------|
| iPhone 6.7" (15 Pro Max) | 1290 x 2796 | **Yes** |
| iPhone 6.5" (11 Pro Max) | 1284 x 2778 | **Yes** |
| iPhone 5.5" (8 Plus) | 1242 x 2208 | Optional |

**Taking Screenshots:**
- Run app in Simulator with appropriate device
- `Cmd + S` to save screenshot
- Or use `xcrun simctl io booted screenshot screenshot.png`

### Promotional Text (170 characters max)

```
Build balanced habits across the Four Pillars—SELF, SPACE, STORY, SPIRIT. Simple tracking without the guilt.
```

### Description (4000 characters max)

```
FlowHabits helps you build habits aligned with the four dimensions of flow: SELF (inner mastery), SPACE (environment design), STORY (direction setting), and SPIRIT (inner drive).

THE FOUR PILLARS

SELF (Coral)
Habits for your body, mind, and emotional wellbeing. Exercise, meditation, sleep, nutrition—the foundation of your energy.

SPACE (Sage Green)
Habits for your environment and systems. Workspace organization, tool maintenance, digital hygiene—the support structure for focus.

STORY (Steel Blue)
Habits for your direction and progress. Goal review, planning, learning—the meaningful pursuits that pull you forward.

SPIRIT (Amethyst)
Habits for your values and vision. Gratitude, reflection, connection to purpose—the why behind everything.

KEY FEATURES

• Pillar-Based Organization
Each habit belongs to a pillar, helping you see at a glance which areas of life are thriving and which need attention.

• Simple Completion
Tap to mark habits complete. No complicated tracking—just did you do it or not.

• Streak Tracking
Build momentum with streak counts. See your current streak and personal best for each habit.

• Balance Indicators
Visual feedback showing your progress across all four pillars.

• Gentle Accountability
No guilt, no shame for missed days. The app helps you understand patterns without judgment.

• Statistics
Track completion rates, view history, and understand your habit patterns over time.

DESIGN PHILOSOPHY

FlowHabits is intentionally simple. Habit tracking should take seconds, not minutes. The app stays out of your way so you can focus on actually doing the habits.

No gamification tricks. No push notification nagging. No social comparison. Just you and your practice.

PRIVACY FIRST

All data is stored locally on your device. No account required. No cloud sync. No data collection. Your habits are your business.

Built on the FourFlow framework for balanced growth and sustainable practice.
```

### Keywords (100 characters max)

```
habits,tracker,streak,self-improvement,wellness,productivity,balance,routine,daily habits,goals
```

### Support URL

```
https://fourflowos.com
```

### Marketing URL (optional)

```
https://fourflowos.com/apps/flowhabits
```

### What's New in This Version

```
Initial release of FlowHabits.

• Four Pillars habit organization (SELF, SPACE, STORY, SPIRIT)
• Simple tap-to-complete tracking
• Streak counts and personal bests
• Balance indicators across pillars
• Completion statistics and history
• Beautiful, minimal design
```

---

## Step 5: App Review Information

### Contact Information

| Field | Value |
|-------|-------|
| First Name | [Your first name] |
| Last Name | [Your last name] |
| Phone | [Your phone number] |
| Email | fourflowos@gmail.com |

### Demo Account

Select: **Sign-in required: No**

(The app uses local storage only, no accounts)

### Notes for Review Team

```
This is a simple habit tracking app organized around four life dimensions (Self, Space, Story, Spirit).

Key points:
• Habits are marked complete with a single tap
• Streaks track consecutive days of completion
• All data is stored locally using SwiftData
• No user accounts or authentication required
• No in-app purchases or subscriptions
• No network requests - fully offline capable
```

### Attachments

None required.

---

## Step 6: Build Upload

### Archive in Xcode

1. Select **Any iOS Device (arm64)** as destination
2. Product → Archive
3. When complete, Organizer window opens
4. Click **Distribute App**
5. Select **App Store Connect**
6. Click **Upload**

### In App Store Connect

1. Wait for build processing (usually 10-30 minutes)
2. Go to **iOS App** → **1.0 Prepare for Submission**
3. Scroll to **Build** section
4. Click **+** and select your uploaded build
5. Answer export compliance question: **No** (uses no encryption)

---

## Step 7: Submit for Review

1. Ensure all required fields show green checkmarks
2. Click **Add for Review**
3. Click **Submit to App Review**

---

## After Submission

### Timeline
- Initial review: typically 24-48 hours
- You'll receive email notifications about status changes

### If Rejected
1. Read rejection reason carefully in Resolution Center
2. Fix the issue
3. Upload new build
4. Reply in Resolution Center
5. Resubmit

### Common Rejection Reasons to Avoid
- Missing privacy policy (✅ already set up)
- Placeholder content or "beta" text (✅ already removed)
- Crashes or bugs (test thoroughly before submitting)
- Misleading metadata or screenshots

---

## Quick Reference

| Item | Value |
|------|-------|
| App Name | FlowHabits |
| Subtitle | Four Pillars Habit Tracker |
| Bundle ID | app.fourflowos.FlowHabits |
| SKU | flowhabits-ios-001 |
| Version | 1.0.0 |
| Category | Health & Fitness |
| Secondary Category | Productivity |
| Age Rating | 4+ |
| Price | Free |
| Privacy Policy | https://fourflowos.com/privacy |
| Support Email | fourflowos@gmail.com |
| Support URL | https://fourflowos.com |

---

## Copyright Notice

```
© 2025 FourFlowOS. All rights reserved.
```
