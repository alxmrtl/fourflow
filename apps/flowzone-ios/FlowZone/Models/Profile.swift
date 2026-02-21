//
//  Profile.swift
//  FlowZone
//
//  User profile with values and vision (Spirit pillar)
//

import Foundation
import SwiftData

@Model
final class Profile {
    @Attribute(.unique) var id: String = "user-profile"
    var selectedValues: [String]
    var vision: String
    var createdAt: Date
    var updatedAt: Date

    // Curated values for selection (12 total, select 3-5)
    static let curatedValues: [(name: String, emoji: String, pair: String)] = [
        ("Focus", "🎯", "Inner Peace"),
        ("Love", "❤️", "Inner Peace"),
        ("Generosity", "🎁", "Dreams"),
        ("Freedom", "🦅", "Dreams"),
        ("Presence", "🧘", "Wonder"),
        ("Growth", "🌱", "Wonder"),
        ("Creativity", "🎨", "Impact"),
        ("Service", "🤝", "Impact"),
        ("Courage", "🦁", "Mastery"),
        ("Wisdom", "📚", "Mastery"),
        ("Joy", "✨", "Fulfillment"),
        ("Purpose", "🧭", "Fulfillment")
    ]

    init(
        selectedValues: [String] = [],
        vision: String = ""
    ) {
        self.selectedValues = selectedValues
        self.vision = vision
        self.createdAt = Date()
        self.updatedAt = Date()
    }

    func update(values: [String]? = nil, vision: String? = nil) {
        if let values = values {
            self.selectedValues = values
        }
        if let vision = vision {
            self.vision = vision
        }
        self.updatedAt = Date()
    }
}
