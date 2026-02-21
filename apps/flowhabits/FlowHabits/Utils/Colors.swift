//
//  Colors.swift
//  FlowHabits
//
//  FourFlow brand colors - channeling flow consciousness
//

import SwiftUI

extension Color {
    // MARK: - Pillar Colors (Primary)

    /// Spirit - Amethyst purple for values, vision, and purpose
    static let spirit = Color(hex: "7A4DA4")
    static let spiritDark = Color(hex: "5E3570")

    /// Story - Steel blue for mission, role, and growth
    static let story = Color(hex: "5B84B1")
    static let storyDark = Color(hex: "3B4F71")

    /// Space - Sage green for environment, tools, and systems
    static let space = Color(hex: "6BA292")
    static let spaceDark = Color(hex: "517D63")

    /// Self - Coral for body, mind, and emotions
    static let selfPillar = Color(hex: "FF6F61")
    static let selfDark = Color(hex: "E64A45")

    // MARK: - The Void (Background System)

    /// The deepest black - where focus lives
    static let void = Color(hex: "050505")

    /// Primary canvas - the space between stars
    static let canvas = Color(hex: "0a0a0a")

    /// Subtle elevation - lifted surfaces
    static let lift = Color(hex: "111111")

    /// Card surfaces - glass layer
    static let surface = Color(hex: "1a1a1a")

    // MARK: - Legacy Neutrals (for compatibility)

    /// Legacy charcoal - use canvas instead
    static let charcoal = Color(hex: "333333")

    /// Light text and backgrounds
    static let ivory = Color(hex: "F5F5F5")

    /// Accent for streak/flame
    static let amber = Color(hex: "E8A87C")

    // MARK: - Semantic Colors

    /// Primary background - the void canvas
    static let background = Color.canvas

    /// Card background - translucent glass layer
    static let cardBackground = Color.white.opacity(0.05)

    /// Elevated card - slightly more visible
    static let cardElevated = Color.white.opacity(0.08)

    /// Text hierarchy
    static let textPrimary = Color.ivory
    static let textSecondary = Color.ivory.opacity(0.6)
    static let textWhisper = Color.ivory.opacity(0.4)

    /// Semantic
    static let success = Color.space
    static let streak = Color.amber

    // MARK: - Glow System

    /// Spirit glow for ambient presence
    static let spiritGlow = Color.spirit.opacity(0.12)

    /// Pillar glow at standard intensity
    static func pillarGlow(_ pillar: Pillar) -> Color {
        pillar.color.opacity(0.15)
    }

    /// Pillar whisper - barely visible
    static func pillarWhisper(_ pillar: Pillar) -> Color {
        pillar.color.opacity(0.06)
    }
}

// MARK: - Brand Gradients

extension LinearGradient {
    /// The Spectrum - all four pillars flowing (wholeness)
    static let spectrum = LinearGradient(
        colors: [.selfPillar, .space, .story, .spirit],
        startPoint: .leading,
        endPoint: .trailing
    )

    /// The Journey - transformation from Self to Spirit
    static let journey = LinearGradient(
        colors: [.selfPillar, .spirit],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    /// Subtle fade to void
    static let fadeToVoid = LinearGradient(
        colors: [.clear, .canvas],
        startPoint: .top,
        endPoint: .bottom
    )
}

extension RadialGradient {
    /// Spirit radial glow - ambient presence
    static func spiritGlow(at center: UnitPoint = .bottom) -> RadialGradient {
        RadialGradient(
            colors: [Color.spirit.opacity(0.15), Color.clear],
            center: center,
            startRadius: 0,
            endRadius: 300
        )
    }

    /// Pillar glow emanating from a point
    static func pillarGlow(_ pillar: Pillar, at center: UnitPoint = .center, radius: CGFloat = 150) -> RadialGradient {
        RadialGradient(
            colors: [pillar.color.opacity(0.12), Color.clear],
            center: center,
            startRadius: 0,
            endRadius: radius
        )
    }
}

extension AngularGradient {
    /// Progress ring gradient - the spectrum rotating
    static let progressRing = AngularGradient(
        colors: [.selfPillar, .space, .story, .spirit, .selfPillar],
        center: .center,
        startAngle: .degrees(-90),
        endAngle: .degrees(270)
    )
}

// MARK: - ShapeStyle Extensions for foregroundStyle()

extension ShapeStyle where Self == Color {
    // Text hierarchy
    static var textPrimary: Color { .textPrimary }
    static var textSecondary: Color { .textSecondary }
    static var textWhisper: Color { .textWhisper }

    // Background system
    static var ivory: Color { .ivory }
    static var charcoal: Color { .charcoal }
    static var canvas: Color { .canvas }
    static var void: Color { .void }
    static var surface: Color { .surface }
    static var background: Color { .background }
    static var cardBackground: Color { .cardBackground }

    // Accent
    static var amber: Color { .amber }

    // Pillars
    static var space: Color { .space }
    static var spirit: Color { .spirit }
    static var story: Color { .story }
    static var selfPillar: Color { .selfPillar }
}

// MARK: - Animation Tokens (Breath Rhythm)

struct FlowAnimation {
    // Breath rhythm - the fundamental cycle
    static let breathIn: Double = 3.0
    static let breathOut: Double = 3.0
    static let fullBreath: Double = 6.0

    // Ambient motion - background elements
    static let floatDuration: Double = 20.0
    static let gradientShift: Double = 25.0
    static let slowRotation: Double = 45.0

    // Micro-interactions - user responses
    static let micro: Double = 0.2
    static let quick: Double = 0.3
    static let smooth: Double = 0.4
    static let pageTransition: Double = 0.5

    // SwiftUI Animations
    static let breathe = Animation.easeInOut(duration: fullBreath).repeatForever(autoreverses: true)
    static let microSpring = Animation.spring(duration: micro)
    static let smoothSpring = Animation.spring(duration: smooth)
}

// MARK: - Hex Color Initializer

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
