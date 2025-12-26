//
//  Habit.swift
//  FourFlowHabits
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
    var createdAt: Date
    var isActive: Bool
    var sortOrder: Int

    @Relationship(deleteRule: .cascade, inverse: \HabitCompletion.habit)
    var completions: [HabitCompletion]

    var pillar: Pillar {
        get { Pillar(rawValue: pillarRaw) ?? .self_ }
        set { pillarRaw = newValue.rawValue }
    }

    init(
        name: String,
        pillar: Pillar,
        emoji: String = "",
        sortOrder: Int = 0
    ) {
        self.id = UUID()
        self.name = name
        self.pillarRaw = pillar.rawValue
        self.emoji = emoji.isEmpty ? pillar.defaultEmoji : emoji
        self.createdAt = Date()
        self.isActive = true
        self.sortOrder = sortOrder
        self.completions = []
    }

    // MARK: - Completion Status

    func isCompletedOn(_ date: Date) -> Bool {
        let calendar = Calendar.current
        return completions.contains { completion in
            calendar.isDate(completion.date, inSameDayAs: date)
        }
    }

    var isCompletedToday: Bool {
        isCompletedOn(Date())
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
        let weekAgo = calendar.date(byAdding: .day, value: -7, to: Date())!
        return completions.filter { $0.date >= weekAgo }.count
    }

    func weeklyCompletionDates() -> [Date] {
        let calendar = Calendar.current
        let weekAgo = calendar.startOfDay(for: calendar.date(byAdding: .day, value: -6, to: Date())!)
        return completions
            .filter { $0.date >= weekAgo }
            .map { calendar.startOfDay(for: $0.date) }
    }
}

// MARK: - Pillar Extensions

extension Pillar {
    var defaultEmoji: String {
        switch self {
        case .spirit: return "✨"
        case .story: return "📖"
        case .space: return "🏠"
        case .self_: return "💪"
        }
    }
}
