# FlowZone - Final Testing Checklist

## Pre-Submission Testing

Complete all items before submitting to App Store.

---

## Device Testing Matrix

| Device | Screen Size | Test Status |
|--------|-------------|-------------|
| iPhone SE (3rd gen) | 4.7" | [ ] |
| iPhone 14 | 6.1" | [ ] |
| iPhone 15 Pro Max | 6.7" | [ ] |

---

## Core Features Testing

### Onboarding & Setup
- [ ] App launches without crash
- [ ] Spirit setup (values selection) works correctly
- [ ] Story setup (goal creation) works correctly
- [ ] Space setup (environment) works correctly
- [ ] Can skip/complete onboarding flow
- [ ] Settings persist after app restart

### Flow View (Main Screen)
- [ ] Vision/Mission/ACT cards display correctly
- [ ] Task list loads and scrolls properly
- [ ] Add task button works
- [ ] Edit/delete tasks works
- [ ] Goal filtering works

### Focus Timer
- [ ] Timer starts correctly
- [ ] Timer counts down accurately
- [ ] Focus Rep button registers taps
- [ ] Timer can be paused/resumed
- [ ] Timer completion triggers correctly
- [ ] Session is saved to history

### Binaural Beats
- [ ] Toggle enables/disables audio
- [ ] Audio plays correctly with headphones
- [ ] Volume control works
- [ ] Audio stops when timer stops
- [ ] Fade-in is smooth (no jarring start)

### Breathwork
- [ ] All 7 breathwork patterns work
- [ ] Animation displays correctly
- [ ] Audio cues sync with animation
- [ ] Can exit breathwork mid-session
- [ ] Transitions smoothly to focus timer

### Stats & Review
- [ ] Session history displays correctly
- [ ] Stats calculate accurately
- [ ] Date filtering works
- [ ] Empty state displays properly

### Settings
- [ ] All toggles work correctly
- [ ] Timer duration selection works
- [ ] Privacy policy link opens correctly
- [ ] Support email link works
- [ ] Settings persist after app restart

---

## Edge Cases

- [ ] App handles no goals gracefully
- [ ] App handles no tasks gracefully
- [ ] App handles no sessions gracefully
- [ ] Timer works correctly in background
- [ ] App restores state after being killed
- [ ] Rotation handling (if supported)
- [ ] Dynamic Type accessibility
- [ ] VoiceOver accessibility

---

## Screenshots to Capture

Capture on iPhone 15 Pro Max (6.7") and iPhone 14 Pro (6.1"):

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Flow View** | Main screen with Vision/Mission visible, tasks listed |
| 2 | **Focus Timer** | Timer in progress (halfway), Rep button visible |
| 3 | **Focus Rep Tap** | Show the Rep counter incrementing |
| 4 | **Breathwork** | Beautiful breathing animation mid-cycle |
| 5 | **Stats View** | Session history with good data showing progress |
| 6 | **Setup Spirit** | Values selection screen |

### Screenshot Tips
- Use sample data that looks realistic
- Show good streak/progress numbers
- Capture during "golden hour" content (positive stats)
- Ensure no personal information visible

---

## Final Verification

- [ ] No "beta", "test", or "coming soon" text in app
- [ ] No placeholder images or Lorem ipsum
- [ ] No debug logging visible
- [ ] App Store screenshots captured
- [ ] App description reviewed
- [ ] Keywords optimized
- [ ] Privacy policy accessible at fourflowos.com/privacy
- [ ] Support page accessible at fourflowos.com/support

---

## Build & Submit

- [ ] Product > Archive in Xcode
- [ ] Validate archive (no errors)
- [ ] Upload to App Store Connect
- [ ] Fill in all App Store Connect fields
- [ ] Submit for review

---

**Sign-off:**
- Tester: _______________
- Date: _______________
