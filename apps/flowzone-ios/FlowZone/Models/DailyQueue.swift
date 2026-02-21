//
//  DailyQueue.swift
//  FlowZone
//
//  Daily task queue - today's focus tasks
//

import Foundation
import SwiftData

@Model
final class DailyQueue {
    @Attribute(.unique) var id: String = "today-queue"
    var dateString: String  // "YYYY-MM-DD"
    var taskIds: [UUID]     // Ordered task IDs for today's queue

    // MARK: - Computed Properties

    var date: Date {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.date(from: dateString) ?? Date()
    }

    var isToday: Bool {
        dateString == DailyQueue.todayDateString()
    }

    var slotCount: Int {
        taskIds.count
    }

    // MARK: - Initialization

    init() {
        self.dateString = DailyQueue.todayDateString()
        self.taskIds = []
    }

    // MARK: - Actions

    /// Reset queue if it's a new day
    func resetIfNewDay() {
        let today = DailyQueue.todayDateString()
        if dateString != today {
            dateString = today
            taskIds = []
        }
    }

    /// Add a task to the queue
    func addTask(_ taskId: UUID) {
        if !taskIds.contains(taskId) {
            taskIds.append(taskId)
        }
    }

    /// Remove a task from the queue
    func removeTask(_ taskId: UUID) {
        taskIds.removeAll { $0 == taskId }
    }

    /// Reorder tasks
    func moveTask(from source: IndexSet, to destination: Int) {
        taskIds.move(fromOffsets: source, toOffset: destination)
    }

    /// Check if queue contains a task
    func contains(_ taskId: UUID) -> Bool {
        taskIds.contains(taskId)
    }

    // MARK: - Static Helpers

    static func todayDateString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: Date())
    }
}
