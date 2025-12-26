//
//  Colors.swift
//  FourFlowHabits
//
//  FourFlow brand colors
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

    // MARK: - Neutral Colors

    /// Primary dark background
    static let charcoal = Color(hex: "333333")

    /// Light text and backgrounds
    static let ivory = Color(hex: "F5F5F5")

    /// Accent for struggle/growth phases
    static let amber = Color(hex: "E8A87C")

    // MARK: - Semantic Colors

    static let background = Color.charcoal
    static let cardBackground = Color(hex: "404040")
    static let textPrimary = Color.ivory
    static let textSecondary = Color.ivory.opacity(0.7)
    static let success = Color.space
    static let streak = Color.amber
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
