# FlowHabits - Final Testing Checklist

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

### Today View
- [ ] App launches without crash
- [ ] Habits display organized by pillar
- [ ] Pillar sections show correct colors (SELF=Coral, SPACE=Green, STORY=Blue, SPIRIT=Purple)
- [ ] Tap to complete habit works
- [ ] Completion state persists after app restart
- [ ] Today's date displays correctly
- [ ] Empty state shows when no habits exist

### Add Habit
- [ ] Add habit button works
- [ ] Can enter habit name
- [ ] Can select pillar
- [ ] Can add emoji (optional)
- [ ] Save creates habit successfully
- [ ] Cancel discards changes
- [ ] Validation prevents empty name

### Edit/Delete Habit
- [ ] Can access edit mode
- [ ] Can modify habit name
- [ ] Can change pillar
- [ ] Can change emoji
- [ ] Delete habit works
- [ ] Confirmation before delete

### Streak Tracking
- [ ] Current streak displays correctly
- [ ] Streak increments on consecutive days
- [ ] Streak resets on missed day
- [ ] Personal best tracks correctly

### Stats View
- [ ] Completion rate calculates correctly
- [ ] History shows past completions
- [ ] Pillar balance visualization works
- [ ] Date navigation works
- [ ] Empty state displays properly

### Settings
- [ ] Settings screen loads
- [ ] Privacy policy link opens correctly
- [ ] Support email link works
- [ ] Any toggles work correctly
- [ ] Settings persist after app restart

---

## Edge Cases

- [ ] App handles no habits gracefully
- [ ] App handles all habits completed gracefully
- [ ] Day rollover at midnight works correctly
- [ ] App restores state after being killed
- [ ] Large number of habits (20+) performs well
- [ ] Dynamic Type accessibility
- [ ] VoiceOver accessibility

---

## Screenshots to Capture

Capture on iPhone 15 Pro Max (6.7") and iPhone 14 Pro (6.1"):

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Today View** | Main screen with habits from multiple pillars, some completed |
| 2 | **Add Habit** | Creating a new habit with pillar selector visible |
| 3 | **Pillar Colors** | Close-up showing the four pillar colors |
| 4 | **Stats View** | Statistics showing good completion rate and streaks |
| 5 | **All Complete** | Day complete state with celebration/checkmarks |

### Screenshot Tips
- Create sample habits that are relatable (Exercise, Meditate, Read, Journal)
- Show 2-3 habits per pillar for balance
- Mark some complete, leave some pending
- Capture stats with positive numbers

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
