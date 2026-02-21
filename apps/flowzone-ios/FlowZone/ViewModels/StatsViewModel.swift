//
//  StatsViewModel.swift
//  FlowZone
//
//  Statistics calculations for sessions, reps, and progress
//

import SwiftUI
import SwiftData

@MainActor
class StatsViewModel: ObservableObject {
    // MARK: - Published Stats

    @Published var todaySessions: [Session] = []
    @Published var weekSessions: [Session] = []

    // MARK: - Computed Stats

    var todaySessionCount: Int {
        todaySessions.count
    }

    var todayMinutes: Int {
        todaySessions.reduce(0) { $0 + $1.actualDuration }
    }

    var todayReps: Int {
        todaySessions.reduce(0) { $0 + $1.reps }
    }

    var weekSessionCount: Int {
        weekSessions.count
    }

    var weekMinutes: Int {
        weekSessions.reduce(0) { $0 + $1.actualDuration }
    }

    var weekReps: Int {
        weekSessions.reduce(0) { $0 + $1.reps }
    }

    var averageRepsPerSession: Double {
        guard weekSessionCount > 0 else { return 0 }
        return Double(weekReps) / Double(weekSessionCount)
    }

    var flowSessionCount: Int {
        todaySessions.filter { $0.feltFlow }.count
    }

    // MARK: - 7-Day Trend Data

    var weeklyTrend: [(day: String, reps: Int)] {
        var trend: [(day: String, reps: Int)] = []
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateFormat = "EEE"

        for daysAgo in (0..<7).reversed() {
            let date = calendar.date(byAdding: .day, value: -daysAgo, to: Date()) ?? Date()
            let dateString = Session.dateString(for: date)
            let dayReps = weekSessions
                .filter { $0.dateString == dateString }
                .reduce(0) { $0 + $1.reps }

            trend.append((
                day: formatter.string(from: date),
                reps: dayReps
            ))
        }

        return trend
    }

    var maxDailyReps: Int {
        weeklyTrend.map { $0.reps }.max() ?? 1
    }

    // MARK: - Motivational Message

    var motivationalMessage: String {
        if todayReps >= 20 {
            return "Exceptional focus today! Your mental strength is remarkable."
        } else if todayReps >= 10 {
            return "Strong session! Your focus muscle is getting stronger."
        } else if todayReps >= 5 {
            return "Every rep counts. You're building something powerful."
        } else if todayReps > 0 {
            return "You showed up and stayed. That's strength."
        } else if todaySessionCount > 0 {
            return "Great flow! Low reps can mean deep focus."
        } else {
            return "Ready to build your focus muscle?"
        }
    }

    // MARK: - Loading

    func loadStats(modelContext: ModelContext) {
        loadTodaySessions(modelContext: modelContext)
        loadWeekSessions(modelContext: modelContext)
    }

    private func loadTodaySessions(modelContext: ModelContext) {
        let today = Session.todayDateString()
        let descriptor = FetchDescriptor<Session>(
            predicate: #Predicate { $0.dateString == today },
            sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
        )

        todaySessions = (try? modelContext.fetch(descriptor)) ?? []
    }

    private func loadWeekSessions(modelContext: ModelContext) {
        let weekAgo = Session.dateString(daysAgo: 7)
        let descriptor = FetchDescriptor<Session>(
            predicate: #Predicate { $0.dateString >= weekAgo },
            sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
        )

        weekSessions = (try? modelContext.fetch(descriptor)) ?? []
    }

    // MARK: - Session Recording

    func recordSession(
        modelContext: ModelContext,
        task: FlowTask?,
        plannedDuration: Int,
        actualDuration: Int,
        reps: Int,
        feltFlow: Bool,
        completeTask: Bool
    ) {
        let session = Session(
            task: task,
            plannedDuration: plannedDuration,
            actualDuration: actualDuration,
            reps: reps,
            feltFlow: feltFlow
        )

        modelContext.insert(session)

        if completeTask, let task {
            task.complete()
        }

        try? modelContext.save()

        // Refresh stats
        loadStats(modelContext: modelContext)

        HapticFeedback.success()
    }
}
