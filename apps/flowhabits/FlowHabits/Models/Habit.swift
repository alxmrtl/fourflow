//
//  Habit.swift
//  FlowHabits
//
//  Core habit model with SwiftData persistence
//

import Foundation
import SwiftData

@Model
final class Habit {
    var id: UUID
    var name: String
    var pillarRaw: String
    var emoji: String
    var iconName: String?  // SF Symbol name, nil falls back to emoji
    var createdAt: Date
    var isActive: Bool
    var sortOrder: Int

    // Repository linking properties
    var flowKeyRaw: String?
    var templateId: String?
    var isCustom: Bool

    @Relationship(deleteRule: .cascade, inverse: \HabitCompletion.habit)
    var completions: [HabitCompletion]

    var pillar: Pillar {
        get { Pillar(rawValue: pillarRaw) ?? .self_ }
        set { pillarRaw = newValue.rawValue }
    }

    var flowKey: FlowKey? {
        get { flowKeyRaw.flatMap { FlowKey(rawValue: $0) } }
        set { flowKeyRaw = newValue?.rawValue }
    }

    /// Initialize a custom habit (user-created)
    init(
        name: String,
        pillar: Pillar,
        emoji: String = "",
        iconName: String? = nil,
        sortOrder: Int = 0
    ) {
        self.id = UUID()
        self.name = name
        self.pillarRaw = pillar.rawValue
        self.emoji = emoji.isEmpty ? pillar.defaultEmoji : emoji
        self.iconName = iconName ?? pillar.defaultIconName
        self.createdAt = Date()
        self.isActive = true
        self.sortOrder = sortOrder
        self.flowKeyRaw = nil
        self.templateId = nil
        self.isCustom = true
        self.completions = []
    }

    /// Initialize from a Flow Habit template (repository habit)
    init(from template: FlowHabitTemplate, sortOrder: Int = 0) {
        self.id = UUID()
        self.name = template.name
        self.pillarRaw = template.pillar.rawValue
        self.emoji = template.emoji
        self.iconName = template.iconName ?? template.pillar.defaultIconName
        self.createdAt = Date()
        self.isActive = true
        self.sortOrder = sortOrder
        self.flowKeyRaw = template.flowKeyRaw
        self.templateId = template.id
        self.isCustom = false
        self.completions = []
    }

    // MARK: - Completion Status

    /// Check if habit was completed on the given date
    /// Uses isDate:inSameDayAs: for robust comparison that handles DST and timezone edge cases
    /// Works with both old data (stored at noon) and new data (stored at startOfDay)
    func isCompletedOn(_ date: Date) -> Bool {
        let calendar = Calendar.current
        return completions.contains { completion in
            calendar.isDate(completion.date, inSameDayAs: date)
        }
    }

    var isCompletedToday: Bool {
        isCompletedOn(Date())
    }

    /// Check if habit was active on a given date (for tracking purposes)
    /// A habit is considered active if:
    /// 1. It was created on or before that date, OR
    /// 2. It has a completion on that date (user backdated a completion)
    /// This ensures backdated completions are properly counted in visualizations
    func wasActiveOn(_ date: Date) -> Bool {
        let calendar = Calendar.current
        let normalizedDate = calendar.startOfDay(for: date)
        let habitCreatedDay = calendar.startOfDay(for: createdAt)

        // Active if created before/on this date
        if habitCreatedDay <= normalizedDate {
            return true
        }

        // Also active if has a completion on this date (backdated)
        return isCompletedOn(date)
    }

    // MARK: - Streak Calculation

    var currentStreak: Int {
        let calendar = Calendar.current
        let sortedCompletions = completions
            .map { calendar.startOfDay(for: $0.date) }
            .sorted(by: >)

        guard !sortedCompletions.isEmpty else { return 0 }

        let today = calendar.startOfDay(for: Date())
        let yesterday = calendar.date(byAdding: .day, value: -1, to: today)!

        // Streak must include today or yesterday to be "current"
        guard sortedCompletions.first == today || sortedCompletions.first == yesterday else {
            return 0
        }

        var streak = 0
        var checkDate = sortedCompletions.first!
        let uniqueDates = Set(sortedCompletions)

        while uniqueDates.contains(checkDate) {
            streak += 1
            guard let previousDay = calendar.date(byAdding: .day, value: -1, to: checkDate) else { break }
            checkDate = previousDay
        }

        return streak
    }

    var longestStreak: Int {
        let calendar = Calendar.current
        let sortedDates = Set(completions.map { calendar.startOfDay(for: $0.date) })
            .sorted()

        guard !sortedDates.isEmpty else { return 0 }

        var longest = 1
        var current = 1

        for i in 1..<sortedDates.count {
            let expected = calendar.date(byAdding: .day, value: 1, to: sortedDates[i-1])!
            if sortedDates[i] == expected {
                current += 1
                longest = max(longest, current)
            } else {
                current = 1
            }
        }

        return longest
    }

    // MARK: - Weekly Stats

    func completionsThisWeek() -> Int {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        let weekAgo = calendar.date(byAdding: .day, value: -6, to: today)!
        let habitCreatedDay = calendar.startOfDay(for: createdAt)
        let effectiveStart = max(habitCreatedDay, weekAgo)

        // Count unique days, only within valid tracking period
        let uniqueDays = Set(completions
            .map { calendar.startOfDay(for: $0.date) }
            .filter { $0 >= effectiveStart && $0 <= today })
        return uniqueDays.count
    }

    func weeklyCompletionDates() -> [Date] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        let weekAgo = calendar.date(byAdding: .day, value: -6, to: today)!
        return completions
            .map { calendar.startOfDay(for: $0.date) }
            .filter { $0 >= weekAgo && $0 <= today }
    }
}

// MARK: - Pillar Extensions

extension Pillar {
    var defaultEmoji: String {
        // Legacy property - returns iconName for backwards compatibility
        iconName
    }
}
