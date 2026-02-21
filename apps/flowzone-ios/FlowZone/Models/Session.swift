//
//  Session.swift
//  FlowZone
//
//  Focus session records with reps tracking
//

import Foundation
import SwiftData

@Model
final class Session {
    var id: UUID
    var plannedDuration: Int    // minutes
    var actualDuration: Int     // minutes
    var reps: Int               // Focus Reps - distraction resistance count
    var feltFlow: Bool          // Did user experience flow state?
    var timestamp: Date
    var dateString: String      // "YYYY-MM-DD" for efficient filtering

    var task: FlowTask?

    // MARK: - Computed Properties

    var date: Date {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.date(from: dateString) ?? timestamp
    }

    var formattedTime: String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: timestamp)
    }

    var durationText: String {
        "\(actualDuration) min"
    }

    // MARK: - Initialization

    init(
        task: FlowTask?,
        plannedDuration: Int,
        actualDuration: Int,
        reps: Int = 0,
        feltFlow: Bool = false
    ) {
        self.id = UUID()
        self.task = task
        self.plannedDuration = plannedDuration
        self.actualDuration = actualDuration
        self.reps = reps
        self.feltFlow = feltFlow
        self.timestamp = Date()

        // Store date string for efficient queries
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        self.dateString = formatter.string(from: Date())
    }

    // MARK: - Static Helpers

    static func todayDateString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: Date())
    }

    static func dateString(for date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }

    static func dateString(daysAgo: Int) -> String {
        let date = Calendar.current.date(byAdding: .day, value: -daysAgo, to: Date()) ?? Date()
        return dateString(for: date)
    }
}
