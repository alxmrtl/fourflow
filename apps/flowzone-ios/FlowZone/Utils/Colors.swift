//
//  Colors.swift
//  FlowZone
//
//  FourFlow brand color system - Observatory aesthetic with breathing animations
//

import SwiftUI

// MARK: - Brand Colors

extension Color {
    // Four Pillars
    static let selfPillar = Color(hex: "FF6F61")      // Coral - Action, tasks, primary CTA
    static let space = Color(hex: "6BA292")           // Sage Green - Environment, settings
    static let story = Color(hex: "5B84B1")           // Steel Blue - Goals, mission
    static let spirit = Color(hex: "7A4DA4")          // Amethyst - Values, vision

    // Pillar Dark Variants
    static let selfPillarDark = Color(hex: "E64A45")
    static let spaceDark = Color(hex: "517D63")
    static let storyDark = Color(hex: "3B4F71")
    static let spiritDark = Color(hex: "5E3570")

    // Observatory Backgrounds (brand standard)
    static let void = Color(hex: "050505")            // Deepest dark - focus mode, breathwork
    static let canvas = Color(hex: "0a0a0a")          // Standard dark - main screens
    static let lift = Color(hex: "111111")            // Subtle elevation
    static let surface = Color(hex: "1a1a1a")         // Card surfaces

    // Legacy Neutrals (kept for compatibility)
    static let charcoal = Color(hex: "1C1C1E")        // True dark (iOS dark mode)
    static let charcoalElevated = Color(hex: "2C2C2E") // Elevated surface
    static let charcoalSecondary = Color(hex: "3A3A3C") // Secondary surface
    static let ivory = Color(hex: "F5F5F7")           // Light text/backgrounds
    static let cardBackground = Color(hex: "2C2C2E")  // Card surfaces (elevated)

    // Text Hierarchy (on dark backgrounds)
    static let textPrimary = Color.white.opacity(0.9)
    static let textSecondary = Color.white.opacity(0.6)
    static let textMuted = Color.white.opacity(0.4)

    // Border Hierarchy
    static let borderSubtle = Color.white.opacity(0.10)
    static let borderHover = Color.white.opacity(0.15)

    // Accents
    static let amber = Color(hex: "E8A87C")           // Struggle phase, streaks

    // Light Section Backgrounds (kept for compatibility)
    static let spiritLight = Color(hex: "EDE7F3")     // Light purple for Vision
    static let storyLight = Color(hex: "E3EEF6")      // Light blue for Mission
    static let spaceLight = Color(hex: "E8F3F0")      // Light green for Setup
    static let selfLight = Color(hex: "FFF0EE")       // Light coral for Action/Today

    // Semantic
    static let success = Color.space
    static let streak = Color.amber

    // Glass tints (subtle pillar colors for backgrounds)
    static let spiritGlass = Color(hex: "7A4DA4").opacity(0.12)
    static let storyGlass = Color(hex: "5B84B1").opacity(0.12)
    static let spaceGlass = Color(hex: "6BA292").opacity(0.12)
    static let selfGlass = Color(hex: "FF6F61").opacity(0.12)
}

// MARK: - Gradient Definitions

extension LinearGradient {
    // The Journey - Self to Spirit (primary CTA gradient)
    static let journey = LinearGradient(
        colors: [Color.selfPillar, Color.spirit],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    // Legacy ambient background (kept for compatibility)
    static let flowBackground = LinearGradient(
        colors: [
            Color.canvas,
            Color.canvas.opacity(0.98),
            Color.spirit.opacity(0.05),
            Color.story.opacity(0.03),
            Color.selfPillar.opacity(0.04),
            Color.canvas
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    // Subtle section indicator gradients
    static let spiritAccent = LinearGradient(
        colors: [Color.spirit.opacity(0.2), Color.spirit.opacity(0.05)],
        startPoint: .leading,
        endPoint: .trailing
    )

    static let storyAccent = LinearGradient(
        colors: [Color.story.opacity(0.2), Color.story.opacity(0.05)],
        startPoint: .leading,
        endPoint: .trailing
    )

    static let spaceAccent = LinearGradient(
        colors: [Color.space.opacity(0.2), Color.space.opacity(0.05)],
        startPoint: .leading,
        endPoint: .trailing
    )

    static let selfAccent = LinearGradient(
        colors: [Color.selfPillar.opacity(0.2), Color.selfPillar.opacity(0.05)],
        startPoint: .leading,
        endPoint: .trailing
    )
}

// MARK: - Hex Initializer

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
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

// MARK: - ShapeStyle Conformance

extension ShapeStyle where Self == Color {
    static var selfPillar: Color { Color.selfPillar }
    static var space: Color { Color.space }
    static var story: Color { Color.story }
    static var spirit: Color { Color.spirit }

    // Observatory backgrounds
    static var void: Color { Color.void }
    static var canvas: Color { Color.canvas }
    static var lift: Color { Color.lift }
    static var surface: Color { Color.surface }

    // Text hierarchy
    static var textPrimary: Color { Color.textPrimary }
    static var textSecondary: Color { Color.textSecondary }
    static var textMuted: Color { Color.textMuted }

    // Borders
    static var borderSubtle: Color { Color.borderSubtle }
    static var borderHover: Color { Color.borderHover }

    // Legacy
    static var charcoal: Color { Color.charcoal }
    static var charcoalElevated: Color { Color.charcoalElevated }
    static var charcoalSecondary: Color { Color.charcoalSecondary }
    static var ivory: Color { Color.ivory }
    static var amber: Color { Color.amber }
    static var cardBackground: Color { Color.cardBackground }
    static var spiritLight: Color { Color.spiritLight }
    static var storyLight: Color { Color.storyLight }
    static var spaceLight: Color { Color.spaceLight }
    static var selfLight: Color { Color.selfLight }
}

// MARK: - FourFlow Animation Constants

struct FourFlowAnimation {
    /// Breathing animation - like meditation, barely noticeable but atmosphere-creating
    static let breathe: Animation = .easeInOut(duration: 7).repeatForever(autoreverses: true)

    /// Slow celestial spin for ambient elements
    static let slowSpin: Animation = .linear(duration: 45).repeatForever(autoreverses: false)

    /// Fast micro-interaction
    static let fast: Animation = .easeOut(duration: 0.15)

    /// Standard transition
    static let base: Animation = .easeInOut(duration: 0.25)

    /// Slow, deliberate transition
    static let slow: Animation = .easeInOut(duration: 0.4)
}

// MARK: - Subtle Card Modifier (Observatory aesthetic - no glassmorphism)

struct GlassCard: ViewModifier {
    var tint: Color = .clear
    var cornerRadius: CGFloat = 20

    func body(content: Content) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .fill(Color.white.opacity(0.03))
                    .overlay(
                        RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                            .fill(tint.opacity(0.05))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                            .strokeBorder(Color.borderSubtle, lineWidth: 1)
                    )
            )
    }
}

extension View {
    func glassCard(tint: Color = .clear, cornerRadius: CGFloat = 20) -> some View {
        modifier(GlassCard(tint: tint, cornerRadius: cornerRadius))
    }

    /// Subtle card with pillar tint - observatory aesthetic
    func subtleCard(tint: Color = .clear, cornerRadius: CGFloat = 16) -> some View {
        modifier(GlassCard(tint: tint, cornerRadius: cornerRadius))
    }
}

// MARK: - Subtle Section Modifier

struct SubtleSection: ViewModifier {
    var accent: Color

    func body(content: Content) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.charcoalElevated)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(
                                LinearGradient(
                                    colors: [accent.opacity(0.15), accent.opacity(0.02)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .strokeBorder(accent.opacity(0.2), lineWidth: 0.5)
                    )
            )
    }
}

extension View {
    func subtleSection(accent: Color) -> some View {
        modifier(SubtleSection(accent: accent))
    }
}

// MARK: - Breathing Background (Ambient glow that pulses like meditation)

struct BreathingBackground: View {
    let color: Color
    var intensity: Double = 0.15
    var radius: CGFloat = 200

    @State private var isBreathing = false

    var body: some View {
        Circle()
            .fill(
                RadialGradient(
                    colors: [
                        color.opacity(intensity),
                        color.opacity(intensity * 0.5),
                        .clear
                    ],
                    center: .center,
                    startRadius: 0,
                    endRadius: radius
                )
            )
            .scaleEffect(isBreathing ? 1.05 : 1.0)
            .opacity(isBreathing ? 1.0 : 0.8)
            .blur(radius: 60)
            .onAppear {
                withAnimation(FourFlowAnimation.breathe) {
                    isBreathing = true
                }
            }
    }
}

// MARK: - Observatory Background (Full-screen with breathing glow)

struct ObservatoryBackground: View {
    var glowColor: Color = .spirit
    var glowPosition: UnitPoint = .topTrailing
    var isVoid: Bool = false

    var body: some View {
        ZStack {
            // Base background
            (isVoid ? Color.void : Color.canvas)
                .ignoresSafeArea()

            // Ambient breathing glow
            GeometryReader { geo in
                BreathingBackground(
                    color: glowColor,
                    intensity: 0.12,
                    radius: 300
                )
                .frame(width: 400, height: 400)
                .position(
                    x: glowPosition.x * geo.size.width,
                    y: glowPosition.y * geo.size.height
                )
            }
            .allowsHitTesting(false)
        }
    }
}
