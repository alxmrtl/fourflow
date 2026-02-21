//
//  FlowHabitCatalog.swift
//  FlowHabits
//
//  Models for the curated Flow Habit repository
//

import Foundation

// MARK: - Habit Template

/// A curated habit from the Flow Habit repository
struct FlowHabitTemplate: Identifiable, Codable, Hashable {
    let id: String
    let name: String
    let emoji: String
    let iconName: String?  // SF Symbol name, nil falls back to pillar default
    let flowKeyRaw: String
    let tier: HabitTier
    let shortDescription: String
    let fullDescription: String
    let flowBenefit: String
    let qualitiesImproved: [String]
    let suggestedDuration: Int?
    let suggestedFrequency: HabitFrequency
    let difficulty: HabitDifficulty
    let tags: [String]
    let variations: [HabitVariation]?

    // Future-proofing for premium features
    let isPremium: Bool
    let hasTimer: Bool
    let hasVisualGuide: Bool
    let hasAudioGuide: Bool

    // MARK: - Computed Properties

    var flowKey: FlowKey? {
        FlowKey(rawValue: flowKeyRaw)
    }

    var pillar: Pillar {
        flowKey?.pillar ?? .self_
    }

    // MARK: - Codable Keys

    enum CodingKeys: String, CodingKey {
        case id, name, emoji, iconName
        case flowKeyRaw = "flowKey"
        case tier
        case shortDescription, fullDescription, flowBenefit
        case qualitiesImproved, suggestedDuration, suggestedFrequency
        case difficulty, tags, variations
        case isPremium, hasTimer, hasVisualGuide, hasAudioGuide
    }
}

// MARK: - Habit Variation

/// A specific technique or variation of a habit
struct HabitVariation: Identifiable, Codable, Hashable {
    let id: String
    let name: String
    let description: String
    let duration: Int?
}

// MARK: - Enums

enum HabitFrequency: String, Codable, CaseIterable {
    case multiple = "multiple"
    case daily = "daily"
    case weekly = "weekly"
    case asNeeded = "as_needed"

    var displayName: String {
        switch self {
        case .multiple: return "Multiple times daily"
        case .daily: return "Daily"
        case .weekly: return "Weekly"
        case .asNeeded: return "As needed"
        }
    }
}

enum HabitDifficulty: String, Codable, CaseIterable {
    case beginner
    case intermediate
    case advanced

    var displayName: String {
        switch self {
        case .beginner: return "Beginner"
        case .intermediate: return "Intermediate"
        case .advanced: return "Advanced"
        }
    }

    var sortOrder: Int {
        switch self {
        case .beginner: return 0
        case .intermediate: return 1
        case .advanced: return 2
        }
    }
}

enum HabitTier: String, Codable, CaseIterable {
    case foundations
    case practices
    case mastery

    var displayName: String {
        switch self {
        case .foundations: return "Foundations"
        case .practices: return "Practices"
        case .mastery: return "Mastery"
        }
    }

    var description: String {
        switch self {
        case .foundations: return "Essential habits for building your flow foundation"
        case .practices: return "Intermediate habits that deepen your practice"
        case .mastery: return "Advanced habits for those seeking deeper mastery"
        }
    }

    var sortOrder: Int {
        switch self {
        case .foundations: return 0
        case .practices: return 1
        case .mastery: return 2
        }
    }
}

// MARK: - Catalog Container

/// The root container for the habit catalog JSON
struct FlowHabitCatalog: Codable {
    let version: String
    let habits: [FlowHabitTemplate]
}

// MARK: - Template Extensions

extension FlowHabitTemplate {
    /// Duration display string
    var durationText: String? {
        guard let duration = suggestedDuration else { return nil }
        if duration < 60 {
            return "\(duration) min"
        } else {
            let hours = duration / 60
            let mins = duration % 60
            if mins == 0 {
                return "\(hours) hr"
            }
            return "\(hours) hr \(mins) min"
        }
    }

    /// Check if habit matches search query
    func matches(query: String) -> Bool {
        let lowercased = query.lowercased()
        return name.lowercased().contains(lowercased)
            || shortDescription.lowercased().contains(lowercased)
            || tags.contains { $0.lowercased().contains(lowercased) }
            || qualitiesImproved.contains { $0.lowercased().contains(lowercased) }
    }

    /// Check if habit has any of the specified tags
    func hasAnyTag(_ searchTags: [String]) -> Bool {
        let lowerTags = tags.map { $0.lowercased() }
        return searchTags.contains { lowerTags.contains($0.lowercased()) }
    }
}
