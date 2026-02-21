//
//  Pillar.swift
//  FlowZone
//
//  The Four Pillars framework enum
//

import SwiftUI

enum Pillar: String, CaseIterable, Codable, Identifiable {
    case spirit
    case story
    case space
    case selfPillar = "self"

    var id: String { rawValue }

    // MARK: - Display Properties

    var displayName: String {
        switch self {
        case .spirit: return "Spirit"
        case .story: return "Story"
        case .space: return "Space"
        case .selfPillar: return "Self"
        }
    }

    var tagline: String {
        switch self {
        case .spirit: return "Values & Vision"
        case .story: return "Mission & Growth"
        case .space: return "Environment & Tools"
        case .selfPillar: return "Body & Mind"
        }
    }

    var question: String {
        switch self {
        case .spirit: return "What drives you?"
        case .story: return "What are you building?"
        case .space: return "What supports your flow?"
        case .selfPillar: return "What am I doing now?"
        }
    }

    var description: String {
        switch self {
        case .spirit:
            return "Connect with your core values, visualize your vision, and ignite your curiosity. Spirit is the foundation that gives meaning to everything else."
        case .story:
            return "Craft your narrative, define your mission, and embrace your role. Story transforms daily tasks into meaningful progress toward something greater."
        case .space:
            return "Design your environment, optimize your tools, and create feedback systems. Space eliminates friction and supports your natural flow."
        case .selfPillar:
            return "Focus your body, tune your emotions, and open your mind. Self is where action happens - the present moment of doing."
        }
    }

    // MARK: - Visual Properties

    var color: Color {
        switch self {
        case .spirit: return .spirit
        case .story: return .story
        case .space: return .space
        case .selfPillar: return .selfPillar
        }
    }

    var darkColor: Color {
        switch self {
        case .spirit: return .spiritDark
        case .story: return .storyDark
        case .space: return .spaceDark
        case .selfPillar: return .selfPillarDark
        }
    }

    var iconName: String {
        switch self {
        case .spirit: return "sparkles"
        case .story: return "book.fill"
        case .space: return "square.grid.2x2.fill"
        case .selfPillar: return "figure.mind.and.body"
        }
    }

    var emoji: String {
        switch self {
        case .spirit: return "✨"
        case .story: return "📖"
        case .space: return "🏠"
        case .selfPillar: return "🧘"
        }
    }

    // MARK: - Display Order

    /// Order for displaying pillars in the UI (Self first for action-focus)
    static var displayOrder: [Pillar] {
        [.selfPillar, .space, .story, .spirit]
    }

    // MARK: - Habit Suggestions

    var habitSuggestions: [(emoji: String, name: String)] {
        switch self {
        case .selfPillar:
            return [
                ("🏃", "Exercise"),
                ("🥗", "Healthy eating"),
                ("😴", "8 hours sleep"),
                ("🌬️", "Breathwork"),
                ("🧘", "Meditation"),
                ("💧", "Drink water"),
                ("📵", "Digital detox"),
                ("🚶", "Morning walk"),
                ("💪", "Strength training"),
                ("🧘‍♀️", "Yoga"),
                ("🌅", "Wake early"),
                ("📝", "Journal")
            ]
        case .space:
            return [
                ("🧹", "Clean workspace"),
                ("📱", "Organize apps"),
                ("📋", "Weekly planning"),
                ("🌿", "Tend plants"),
                ("📦", "Declutter"),
                ("🔇", "Quiet time"),
                ("🎧", "Focus music"),
                ("💡", "Good lighting"),
                ("🪑", "Ergonomic check"),
                ("📴", "Notification audit"),
                ("🗂️", "File organization"),
                ("⏰", "Time blocking")
            ]
        case .story:
            return [
                ("📚", "Read 30 min"),
                ("✍️", "Write daily"),
                ("🎯", "Review goals"),
                ("📈", "Track progress"),
                ("🎨", "Creative project"),
                ("💻", "Learn coding"),
                ("🗣️", "Practice speaking"),
                ("🌐", "Learn language"),
                ("🎸", "Practice instrument"),
                ("📊", "Skill building"),
                ("🤝", "Networking"),
                ("💡", "Ideation time")
            ]
        case .spirit:
            return [
                ("🙏", "Gratitude practice"),
                ("🌟", "Affirmations"),
                ("📖", "Wisdom reading"),
                ("🤔", "Self-reflection"),
                ("🎁", "Acts of kindness"),
                ("🌳", "Nature time"),
                ("🧭", "Values check-in"),
                ("✨", "Visualization"),
                ("💭", "Dream journaling"),
                ("🕯️", "Mindful moment"),
                ("💝", "Connect with loved ones"),
                ("🌅", "Sunset reflection")
            ]
        }
    }
}
