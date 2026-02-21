//
//  FlowTask.swift
//  FlowZone
//
//  Actions/tasks linked to goals (Self pillar)
//  Named FlowTask to avoid conflict with Swift's Task
//

import Foundation
import SwiftData

enum TaskStatus: String, Codable {
    case pipeline    // In the pipeline, waiting to be pulled into a container
    case container   // Pulled into today's containers, ready to execute
    case completed   // Done

    // Migration support from old values
    init(fromLegacy raw: String) {
        switch raw {
        case "backlog": self = .pipeline
        case "today": self = .container
        case "completed": self = .completed
        default: self = .pipeline
        }
    }
}

@Model
final class FlowTask {
    var id: UUID
    var title: String
    var statusRaw: String
    var duration: Int  // in minutes
    var sortOrder: Int
    var createdAt: Date
    var completedAt: Date?

    var goal: Goal?

    @Relationship(deleteRule: .cascade, inverse: \Session.task)
    var sessions: [Session] = []

    // MARK: - Computed Properties

    var status: TaskStatus {
        get {
            // Try new values first, then fall back to legacy migration
            if let status = TaskStatus(rawValue: statusRaw) {
                return status
            }
            return TaskStatus(fromLegacy: statusRaw)
        }
        set { statusRaw = newValue.rawValue }
    }

    var isCompleted: Bool {
        status == .completed
    }

    var isInContainer: Bool {
        status == .container
    }

    var isInPipeline: Bool {
        status == .pipeline
    }

    var totalSessionTime: Int {
        sessions.reduce(0) { $0 + $1.actualDuration }
    }

    var totalReps: Int {
        sessions.reduce(0) { $0 + $1.reps }
    }

    var sessionCount: Int {
        sessions.count
    }

    // MARK: - Initialization

    init(
        title: String,
        goal: Goal? = nil,
        duration: Int = 25,
        status: TaskStatus = .pipeline
    ) {
        self.id = UUID()
        self.title = title
        self.goal = goal
        self.duration = duration
        self.statusRaw = status.rawValue
        self.sortOrder = 0
        self.createdAt = Date()
    }

    // MARK: - Actions

    /// Pull task from pipeline into today's containers
    func pullToContainer() {
        status = .container
    }

    /// Return task to pipeline (from container or reopening completed)
    func returnToPipeline() {
        status = .pipeline
    }

    /// Mark task as completed
    func complete() {
        status = .completed
        completedAt = Date()
    }

    /// Reopen a completed task back to pipeline
    func reopen() {
        status = .pipeline
        completedAt = nil
    }

    // MARK: - Legacy Support (for existing code during migration)

    func moveToToday() {
        pullToContainer()
    }

    func moveToBacklog() {
        returnToPipeline()
    }
}
