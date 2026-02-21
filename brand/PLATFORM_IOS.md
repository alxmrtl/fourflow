# FourFlow iOS Implementation Guide

*SwiftUI specifications for native apps*

---

## Color System

```swift
// FourFlowColors.swift

import SwiftUI

extension Color {
    // The Four Pillars
    static let selfCoral = Color(hex: "FF6F61")
    static let spaceGreen = Color(hex: "6BA292")
    static let storyBlue = Color(hex: "5B84B1")
    static let spiritPurple = Color(hex: "7A4DA4")

    // Dark variants
    static let selfDark = Color(hex: "E64A45")
    static let spaceDark = Color(hex: "517D63")
    static let storyDark = Color(hex: "3B4F71")
    static let spiritDark = Color(hex: "5E3570")

    // Grounds
    static let void = Color(hex: "050505")
    static let canvas = Color(hex: "0a0a0a")
    static let lift = Color(hex: "111111")
    static let surface = Color(hex: "1a1a1a")

    // Light mode
    static let ivory = Color(hex: "F5F5F5")
    static let charcoal = Color(hex: "333333")

    // Semantic
    static let textPrimary = Color.white.opacity(0.9)
    static let textSecondary = Color.white.opacity(0.6)
    static let textMuted = Color.white.opacity(0.4)
    static let border = Color.white.opacity(0.1)
    static let borderHover = Color.white.opacity(0.15)
}

// Hex initializer
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
```

---

## Gradients

```swift
// FourFlowGradients.swift

import SwiftUI

struct FourFlowGradients {
    // The full spectrum
    static let pillars = LinearGradient(
        colors: [.selfCoral, .spaceGreen, .storyBlue, .spiritPurple],
        startPoint: .leading,
        endPoint: .trailing
    )

    // Self to Spirit journey
    static let journey = LinearGradient(
        colors: [.selfCoral, .spiritPurple],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    // Spirit radial glow
    static let spiritGlow = RadialGradient(
        colors: [
            Color.spiritPurple.opacity(0.15),
            Color.clear
        ],
        center: .center,
        startRadius: 0,
        endRadius: 200
    )

    // Per-pillar gradients
    static func pillarGradient(_ pillar: Pillar) -> LinearGradient {
        let color = pillar.color
        return LinearGradient(
            colors: [color.opacity(0.8), color],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}
```

---

## Typography

```swift
// FourFlowTypography.swift

import SwiftUI

extension Font {
    // Hero - 40pt on mobile (96pt desktop equivalent scaled)
    static let hero = Font.system(size: 40, weight: .bold, design: .rounded)

    // H1 - 32pt
    static let heading1 = Font.system(size: 32, weight: .bold, design: .rounded)

    // H2 - 24pt
    static let heading2 = Font.system(size: 24, weight: .bold, design: .rounded)

    // H3 - 20pt
    static let heading3 = Font.system(size: 20, weight: .semibold, design: .rounded)

    // Body - 17pt (iOS default, feels right)
    static let bodyLarge = Font.system(size: 17, weight: .regular, design: .rounded)

    // Small - 15pt
    static let bodySmall = Font.system(size: 15, weight: .regular, design: .rounded)

    // Caption - 13pt
    static let caption = Font.system(size: 13, weight: .regular, design: .rounded)
}

// Usage note: We use SF Rounded (.rounded design) as the iOS equivalent
// of Inter's friendly-but-precise character.
```

---

## Animation Constants

```swift
// FourFlowAnimation.swift

import SwiftUI

struct FourFlowAnimation {
    // Standard timings
    static let fast: Animation = .easeOut(duration: 0.15)
    static let base: Animation = .easeInOut(duration: 0.25)
    static let slow: Animation = .easeInOut(duration: 0.4)

    // Breathing animation
    static let breathe: Animation = .easeInOut(duration: 7).repeatForever(autoreverses: true)
    static let breatheSlow: Animation = .easeInOut(duration: 12).repeatForever(autoreverses: true)
    static let breatheFocus: Animation = .easeInOut(duration: 15).repeatForever(autoreverses: true)

    // Springs (for interactive elements)
    static let spring: Animation = .spring(response: 0.35, dampingFraction: 0.7)
    static let springBouncy: Animation = .spring(response: 0.4, dampingFraction: 0.6)

    // Scale values for press states
    static let pressedScale: CGFloat = 0.97
    static let hoverScale: CGFloat = 1.02
}
```

---

## Haptic Patterns

```swift
// FourFlowHaptics.swift

import UIKit

struct FourFlowHaptics {
    // Light tap - acknowledgment
    static func light() {
        let generator = UIImpactFeedbackGenerator(style: .light)
        generator.impactOccurred()
    }

    // Medium - completion, success
    static func medium() {
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred()
    }

    // Soft - subtle feedback
    static func soft() {
        let generator = UIImpactFeedbackGenerator(style: .soft)
        generator.impactOccurred()
    }

    // Focus Rep pressed
    static func focusRep() {
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred(intensity: 0.7)
    }

    // Session complete
    static func sessionComplete() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }

    // Error (gentle)
    static func error() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.warning)
    }

    // Selection changed
    static func selection() {
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }
}
```

---

## Component Patterns

### Primary Button

```swift
struct FourFlowButton: View {
    let title: String
    let action: () -> Void
    var style: ButtonStyle = .primary

    enum ButtonStyle {
        case primary
        case secondary
        case ghost
    }

    @State private var isPressed = false

    var body: some View {
        Button(action: {
            FourFlowHaptics.light()
            action()
        }) {
            Text(title)
                .font(.bodyLarge)
                .fontWeight(.semibold)
                .foregroundColor(foregroundColor)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 16)
                .padding(.horizontal, 24)
                .background(background)
                .cornerRadius(12)
                .overlay(border)
        }
        .scaleEffect(isPressed ? FourFlowAnimation.pressedScale : 1)
        .animation(FourFlowAnimation.spring, value: isPressed)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
    }

    @ViewBuilder
    private var background: some View {
        switch style {
        case .primary:
            FourFlowGradients.journey
        case .secondary:
            Color.clear
        case .ghost:
            Color.clear
        }
    }

    private var foregroundColor: Color {
        switch style {
        case .primary:
            return .white
        case .secondary:
            return .textPrimary
        case .ghost:
            return .textSecondary
        }
    }

    @ViewBuilder
    private var border: some View {
        switch style {
        case .secondary:
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(Color.border, lineWidth: 1)
        default:
            EmptyView()
        }
    }
}
```

### Card Component

```swift
struct FourFlowCard<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(20)
            .background(Color.white.opacity(0.03))
            .cornerRadius(16)
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .strokeBorder(Color.border, lineWidth: 1)
            )
    }
}
```

### Breathing Circle

```swift
struct BreathingCircle: View {
    var size: CGFloat = 100
    var color: Color = .spiritPurple
    var speed: BreathSpeed = .normal

    enum BreathSpeed {
        case normal  // 7s
        case slow    // 12s
        case focus   // 15s

        var animation: Animation {
            switch self {
            case .normal: return FourFlowAnimation.breathe
            case .slow: return FourFlowAnimation.breatheSlow
            case .focus: return FourFlowAnimation.breatheFocus
            }
        }
    }

    @State private var isBreathing = false

    var body: some View {
        Circle()
            .fill(
                RadialGradient(
                    colors: [color.opacity(0.4), Color.clear],
                    center: .center,
                    startRadius: 0,
                    endRadius: size / 2
                )
            )
            .frame(width: size, height: size)
            .scaleEffect(isBreathing ? 1.05 : 1.0)
            .opacity(isBreathing ? 1.0 : 0.8)
            .onAppear {
                withAnimation(speed.animation) {
                    isBreathing = true
                }
            }
    }
}
```

### Input Field

```swift
struct FourFlowTextField: View {
    let label: String
    @Binding var text: String
    var pillar: Pillar = .spirit
    var placeholder: String = ""

    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.caption)
                .foregroundColor(.textMuted)

            TextField(placeholder, text: $text)
                .font(.bodyLarge)
                .foregroundColor(.textPrimary)
                .padding(16)
                .background(Color.white.opacity(0.03))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .strokeBorder(
                            isFocused ? pillar.color : Color.border,
                            lineWidth: 1
                        )
                )
                .focused($isFocused)
                .animation(FourFlowAnimation.base, value: isFocused)
        }
    }
}
```

---

## Navigation Patterns

### Tab Bar

```swift
struct FourFlowTabBar: View {
    @Binding var selectedTab: Tab

    enum Tab: CaseIterable {
        case flow, stats, setup

        var icon: String {
            switch self {
            case .flow: return "circle.circle"
            case .stats: return "chart.bar"
            case .setup: return "slider.horizontal.3"
            }
        }

        var title: String {
            switch self {
            case .flow: return "Flow"
            case .stats: return "Stats"
            case .setup: return "Setup"
            }
        }
    }

    var body: some View {
        HStack {
            ForEach(Tab.allCases, id: \.self) { tab in
                TabBarItem(
                    tab: tab,
                    isSelected: selectedTab == tab
                ) {
                    FourFlowHaptics.selection()
                    selectedTab = tab
                }
            }
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 8)
        .background(.ultraThinMaterial)
        .background(Color.canvas.opacity(0.8))
    }
}

struct TabBarItem: View {
    let tab: FourFlowTabBar.Tab
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: tab.icon)
                    .font(.system(size: 22))

                Text(tab.title)
                    .font(.caption)
            }
            .foregroundColor(isSelected ? .white : .textMuted)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .background(
                isSelected ?
                    FourFlowGradients.journey.opacity(0.2) :
                    Color.clear
            )
            .cornerRadius(12)
        }
    }
}
```

---

## Screen Patterns

### Standard Screen

```swift
struct StandardScreen<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        ZStack {
            // Background
            Color.canvas.ignoresSafeArea()

            // Ambient glow
            BreathingCircle(size: 400, color: .spiritPurple, speed: .slow)
                .position(x: UIScreen.main.bounds.width * 0.3, y: 200)
                .opacity(0.5)
                .blur(radius: 60)

            // Content
            content
        }
        .preferredColorScheme(.dark)
    }
}
```

### Focus Mode Screen

```swift
struct FocusScreen<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        ZStack {
            // Deep void
            Color.void.ignoresSafeArea()

            // Very subtle breathing
            BreathingCircle(size: 300, color: .white, speed: .focus)
                .opacity(0.1)

            // Centered content
            content
        }
        .preferredColorScheme(.dark)
    }
}
```

---

## Focus Rep Button (Signature Component)

```swift
struct FocusRepButton: View {
    let onPress: () -> Void

    @State private var isPressed = false
    @State private var repCount = 0

    var body: some View {
        Button(action: {
            FourFlowHaptics.focusRep()
            repCount += 1
            onPress()
        }) {
            ZStack {
                // Outer glow
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                Color.selfCoral.opacity(0.2),
                                Color.clear
                            ],
                            center: .center,
                            startRadius: 40,
                            endRadius: 80
                        )
                    )
                    .frame(width: 160, height: 160)
                    .scaleEffect(isPressed ? 1.2 : 1.0)

                // Main button
                Circle()
                    .fill(FourFlowGradients.journey)
                    .frame(width: 80, height: 80)
                    .overlay(
                        Text("\(repCount)")
                            .font(.heading2)
                            .foregroundColor(.white)
                    )
                    .scaleEffect(isPressed ? 0.95 : 1.0)
            }
        }
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in
                    withAnimation(FourFlowAnimation.spring) {
                        isPressed = true
                    }
                }
                .onEnded { _ in
                    withAnimation(FourFlowAnimation.spring) {
                        isPressed = false
                    }
                }
        )
    }
}
```

---

## Accessibility

```swift
// Always include accessibility modifiers

// Example: Focus Rep Button with accessibility
FocusRepButton(onPress: recordRep)
    .accessibilityLabel("Focus Rep")
    .accessibilityHint("Tap when you notice and return from distraction")
    .accessibilityValue("\(repCount) reps")

// Example: Breathing animation with reduced motion support
@Environment(\.accessibilityReduceMotion) var reduceMotion

BreathingCircle(
    speed: reduceMotion ? .focus : .normal  // Slower if reduce motion
)
.opacity(reduceMotion ? 0.3 : 1.0)  // Less prominent
```

---

## Checklist

- [ ] All colors from `FourFlowColors`
- [ ] All animations from `FourFlowAnimation`
- [ ] Haptics on all interactive elements
- [ ] Dark mode only (`.preferredColorScheme(.dark)`)
- [ ] SF Rounded for typography
- [ ] Breathing animations where ambient motion is needed
- [ ] Accessibility labels on all interactive elements
- [ ] Reduced motion respected
- [ ] Dynamic Type supported

---

*Native feels native. Don't fight the platform—work with it.*
