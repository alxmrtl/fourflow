//
//  Goal.swift
//  FlowZone
//
//  Long-term goals (Story pillar)
//

import Foundation
import SwiftData

enum GoalStatus: String, Codable {
    case active
    case archived
    case completed
}

@Model
final class Goal {
    var id: UUID
    var title: String
    var emoji: String
    var why: String
    var pillarRaw: String
    var dailyActionCount: Int
    var statusRaw: String
    var createdAt: Date
    var sortOrder: Int

    @Relationship(deleteRule: .cascade, inverse: \FlowTask.goal)
    var tasks: [FlowTask] = []

    // MARK: - Computed Properties

    var pillar: Pillar {
        get { Pillar(rawValue: pillarRaw) ?? .story }
        set { pillarRaw = newValue.rawValue }
    }

    var status: GoalStatus {
        get { GoalStatus(rawValue: statusRaw) ?? .active }
        set { statusRaw = newValue.rawValue }
    }

    var isActive: Bool {
        status == .active
    }

    var completedTasksCount: Int {
        tasks.filter { $0.status == .completed }.count
    }

    var totalTasksCount: Int {
        tasks.count
    }

    var progressPercentage: Double {
        guard totalTasksCount > 0 else { return 0 }
        return Double(completedTasksCount) / Double(totalTasksCount)
    }

    var containerTasks: [FlowTask] {
        tasks.filter { $0.status == .container }
    }

    var pipelineTasks: [FlowTask] {
        tasks.filter { $0.status == .pipeline }
    }

    // Legacy aliases for backwards compatibility
    var todayTasks: [FlowTask] { containerTasks }
    var backlogTasks: [FlowTask] { pipelineTasks }

    // MARK: - Initialization

    init(
        title: String,
        emoji: String = "🎯",
        why: String = "",
        pillar: Pillar = .story
    ) {
        self.id = UUID()
        self.title = title
        self.emoji = emoji
        self.why = why
        self.pillarRaw = pillar.rawValue
        self.dailyActionCount = 3  // Kept for data compatibility
        self.statusRaw = GoalStatus.active.rawValue
        self.createdAt = Date()
        self.sortOrder = 0
    }
}
