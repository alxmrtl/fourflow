//
//  Pillar.swift
//  FlowHabits
//
//  The four pillars of the FlowHabits framework
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
        case .self_: return "Body & Mind"
        case .space: return "Environment & Systems"
        case .story: return "Growth & Learning"
        case .spirit: return "Purpose & Meaning"
        }
    }

    var description: String {
        switch self {
        case .self_:
            return "Take care of your body and mind. Movement, rest, and calm create the foundation for everything else."
        case .space:
            return "Shape your surroundings for success. A clear space leads to a clear mind."
        case .story:
            return "Keep growing and building. Small daily progress adds up to big transformations."
        case .spirit:
            return "Connect with what matters most. Gratitude, reflection, and purpose fuel lasting motivation."
        }
    }

    var practiceTagline: String {
        switch self {
        case .self_:
            return "Fuel your body, sharpen your mind, steady your emotions"
        case .space:
            return "Shape your surroundings to support your focus"
        case .story:
            return "Grow through learning, creating, and building"
        case .spirit:
            return "Stay rooted in gratitude and purpose"
        }
    }

    var encompasses: String {
        switch self {
        case .self_:
            return "Exercise, sleep, nutrition, meditation, breathwork"
        case .space:
            return "Workspace, planning, organization, routines"
        case .story:
            return "Reading, learning, projects, skills, creativity"
        case .spirit:
            return "Gratitude, journaling, reflection, connection"
        }
    }

    /// SF Symbol name for the pillar - use iconName instead of emoji
    var symbolName: String {
        iconName
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

    /// Default SF Symbol for habits in this pillar
    var defaultIconName: String {
        switch self {
        case .spirit: return "sparkles"
        case .story: return "lightbulb.fill"
        case .space: return "square.grid.2x2"
        case .self_: return "figure.run"
        }
    }

    /// Curated SF Symbols for habit icons, organized by pillar
    var curatedIcons: [String] {
        switch self {
        case .self_:
            return [
                // Movement & Exercise
                "figure.run", "figure.walk", "figure.hiking", "figure.yoga",
                "figure.strengthtraining.traditional", "figure.cooldown", "figure.flexibility",
                "bicycle", "figure.pool.swim", "figure.dance",
                // Health & Body
                "heart.fill", "lungs.fill", "brain.head.profile", "face.smiling",
                "bed.double.fill", "cup.and.saucer.fill", "drop.fill",
                "pills.fill", "cross.case.fill", "leaf.fill",
                // Mind & Calm
                "wind", "waveform.path", "sparkle", "moon.stars.fill",
                "sun.max.fill", "cloud.sun.fill", "snowflake"
            ]
        case .space:
            return [
                // Environment
                "house.fill", "building.2.fill", "desktopcomputer", "laptopcomputer",
                "keyboard", "display", "externaldrive.fill",
                // Organization
                "folder.fill", "tray.full.fill", "archivebox.fill", "doc.text.fill",
                "list.bullet.clipboard.fill", "checklist", "calendar",
                // Systems & Tools
                "gearshape.fill", "wrench.and.screwdriver.fill", "hammer.fill",
                "slider.horizontal.3", "gauge.with.needle.fill", "clock.fill",
                "bell.fill", "envelope.fill", "trash.fill"
            ]
        case .story:
            return [
                // Learning
                "book.fill", "books.vertical.fill", "text.book.closed.fill",
                "graduationcap.fill", "studentdesk", "brain",
                // Creating
                "pencil", "paintbrush.fill", "paintpalette.fill", "camera.fill",
                "mic.fill", "guitars.fill", "pianokeys",
                // Building
                "lightbulb.fill", "puzzlepiece.fill", "cube.fill", "chart.line.uptrend.xyaxis",
                "target", "flag.fill", "rosette", "trophy.fill",
                // Communication
                "bubble.left.fill", "person.2.fill", "globe", "network"
            ]
        case .spirit:
            return [
                // Gratitude & Reflection
                "sparkles", "star.fill", "sun.max.fill", "hands.sparkles.fill",
                "heart.circle.fill", "hand.raised.fill", "eyes",
                // Nature & Connection
                "leaf.fill", "tree.fill", "mountain.2.fill", "water.waves",
                "flame.fill", "moon.fill", "cloud.fill",
                // Purpose & Meaning
                "lightbulb.max.fill", "scope", "compass.drawing", "infinity",
                "arrow.up.heart.fill", "person.fill.questionmark", "figure.wave",
                // Journaling & Wisdom
                "pencil.and.outline", "doc.richtext.fill", "quote.bubble.fill", "text.quote"
            ]
        }
    }

    /// Display order: SELF, SPACE, STORY, SPIRIT
    static var displayOrder: [Pillar] {
        [.self_, .space, .story, .spirit]
    }

    var suggestedHabits: [String] {
        habitSuggestions.map { $0.name }
    }

    var habitSuggestions: [HabitSuggestion] {
        switch self {
        case .self_:
            return [
                HabitSuggestion(name: "Exercise", emoji: "💪", iconName: "figure.strengthtraining.traditional"),
                HabitSuggestion(name: "Drink Water", emoji: "💧", iconName: "drop.fill"),
                HabitSuggestion(name: "Sleep 7+ Hours", emoji: "😴", iconName: "bed.double.fill"),
                HabitSuggestion(name: "Eat Healthy", emoji: "🥗", iconName: "leaf.fill"),
                HabitSuggestion(name: "Meditate", emoji: "🧘", iconName: "figure.yoga"),
                HabitSuggestion(name: "Stretch", emoji: "🤸", iconName: "figure.flexibility"),
                HabitSuggestion(name: "Walk 10K Steps", emoji: "🚶", iconName: "figure.walk"),
                HabitSuggestion(name: "No Alcohol", emoji: "🚫", iconName: "xmark.circle.fill"),
                HabitSuggestion(name: "Take Vitamins", emoji: "💊", iconName: "pills.fill"),
                HabitSuggestion(name: "Breathwork", emoji: "🌬️", iconName: "wind"),
                HabitSuggestion(name: "Cold Shower", emoji: "🚿", iconName: "snowflake"),
                HabitSuggestion(name: "Skincare", emoji: "✨", iconName: "sparkle")
            ]
        case .space:
            return [
                HabitSuggestion(name: "Make Bed", emoji: "🛏️", iconName: "bed.double.fill"),
                HabitSuggestion(name: "Tidy Desk", emoji: "🖥️", iconName: "desktopcomputer"),
                HabitSuggestion(name: "Plan Tomorrow", emoji: "📋", iconName: "list.bullet.clipboard.fill"),
                HabitSuggestion(name: "Inbox Zero", emoji: "📧", iconName: "envelope.fill"),
                HabitSuggestion(name: "No Phone in Bed", emoji: "📵", iconName: "iphone.slash"),
                HabitSuggestion(name: "Weekly Review", emoji: "📊", iconName: "calendar"),
                HabitSuggestion(name: "Declutter", emoji: "🧹", iconName: "archivebox.fill"),
                HabitSuggestion(name: "Budget Check", emoji: "💰", iconName: "chart.line.uptrend.xyaxis"),
                HabitSuggestion(name: "Digital Detox", emoji: "📴", iconName: "wifi.slash"),
                HabitSuggestion(name: "Meal Prep", emoji: "🍱", iconName: "fork.knife"),
                HabitSuggestion(name: "Screen Time Limit", emoji: "⏰", iconName: "clock.fill"),
                HabitSuggestion(name: "Morning Routine", emoji: "🌅", iconName: "sun.max.fill")
            ]
        case .story:
            return [
                HabitSuggestion(name: "Read 20 Pages", emoji: "📚", iconName: "books.vertical.fill"),
                HabitSuggestion(name: "Learn New Skill", emoji: "🎯", iconName: "target"),
                HabitSuggestion(name: "Work on Project", emoji: "💻", iconName: "laptopcomputer"),
                HabitSuggestion(name: "Practice Craft", emoji: "🎨", iconName: "paintpalette.fill"),
                HabitSuggestion(name: "Write", emoji: "✍️", iconName: "pencil"),
                HabitSuggestion(name: "Study Language", emoji: "🗣️", iconName: "globe"),
                HabitSuggestion(name: "Take Course", emoji: "🎓", iconName: "graduationcap.fill"),
                HabitSuggestion(name: "Code Practice", emoji: "👨‍💻", iconName: "chevron.left.forwardslash.chevron.right"),
                HabitSuggestion(name: "Network", emoji: "🤝", iconName: "person.2.fill"),
                HabitSuggestion(name: "Side Hustle", emoji: "🚀", iconName: "lightbulb.fill"),
                HabitSuggestion(name: "Listen to Podcast", emoji: "🎧", iconName: "headphones"),
                HabitSuggestion(name: "Deep Work Block", emoji: "🧠", iconName: "brain")
            ]
        case .spirit:
            return [
                HabitSuggestion(name: "Gratitude", emoji: "🙏", iconName: "hands.sparkles.fill"),
                HabitSuggestion(name: "Journal", emoji: "📝", iconName: "pencil.and.outline"),
                HabitSuggestion(name: "Reflect", emoji: "💭", iconName: "text.quote"),
                HabitSuggestion(name: "Connect with Loved One", emoji: "❤️", iconName: "heart.circle.fill"),
                HabitSuggestion(name: "Random Act of Kindness", emoji: "🌟", iconName: "star.fill"),
                HabitSuggestion(name: "Time in Nature", emoji: "🌳", iconName: "leaf.fill"),
                HabitSuggestion(name: "Prayer", emoji: "🙏", iconName: "hand.raised.fill"),
                HabitSuggestion(name: "Read Wisdom", emoji: "📖", iconName: "book.fill"),
                HabitSuggestion(name: "Affirmations", emoji: "💫", iconName: "sparkles"),
                HabitSuggestion(name: "No Complaining", emoji: "☀️", iconName: "sun.max.fill"),
                HabitSuggestion(name: "Forgive Someone", emoji: "🕊️", iconName: "heart.fill"),
                HabitSuggestion(name: "Digital Sabbath", emoji: "🌿", iconName: "tree.fill")
            ]
        }
    }

}

// MARK: - Habit Suggestion

struct HabitSuggestion: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let emoji: String
    let iconName: String

    init(name: String, emoji: String, iconName: String) {
        self.name = name
        self.emoji = emoji
        self.iconName = iconName
    }
}
