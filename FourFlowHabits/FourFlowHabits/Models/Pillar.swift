//
//  Pillar.swift
//  FourFlowHabits
//
//  The four pillars of the FourFlow framework
//

import SwiftUI

enum Pillar: String, CaseIterable, Codable, Identifiable {
    case spirit
    case story
    case space
    case self_

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .spirit: return "Spirit"
        case .story: return "Story"
        case .space: return "Space"
        case .self_: return "Self"
        }
    }

    var tagline: String {
        switch self {
        case .spirit: return "Values & Vision"
        case .story: return "Mission & Growth"
        case .space: return "Environment & Tools"
        case .self_: return "Body & Mind"
        }
    }

    var color: Color {
        switch self {
        case .spirit: return Color.spirit
        case .story: return Color.story
        case .space: return Color.space
        case .self_: return Color.selfPillar
        }
    }

    var iconName: String {
        switch self {
        case .spirit: return "sparkles"
        case .story: return "book.fill"
        case .space: return "square.grid.2x2.fill"
        case .self_: return "figure.mind.and.body"
        }
    }

    var suggestedHabits: [String] {
        switch self {
        case .spirit:
            return ["Morning gratitude", "Meditation", "Journaling", "Reading wisdom"]
        case .story:
            return ["Learn something new", "Work on goals", "Creative time", "Skill practice"]
        case .space:
            return ["Tidy workspace", "Digital declutter", "Plan tomorrow", "Review systems"]
        case .self_:
            return ["Exercise", "Hydration", "Quality sleep", "Healthy eating", "Breathwork"]
        }
    }
}
