//
//  QuizModels.swift
//  FlowHabits
//
//  Models for the onboarding quiz system
//

import Foundation

// MARK: - Quiz Question

struct QuizQuestion: Identifiable, Codable {
    let id: String
    let text: String
    let subtitle: String?
    let questionType: QuestionType
    let answers: [QuizAnswer]

    enum QuestionType: String, Codable {
        case singleChoice
        case multiChoice
        case slider
    }

    enum CodingKeys: String, CodingKey {
        case id, text, subtitle
        case questionType = "type"
        case answers
    }
}

// MARK: - Quiz Answer

struct QuizAnswer: Identifiable, Codable {
    let id: String
    let text: String
    let emoji: String?  // Deprecated: kept for JSON backwards compatibility
    let iconName: String?  // SF Symbol name - preferred over emoji
    let pillarWeights: [String: Double]
    let flowKeyWeights: [String: Double]
    let habitCount: Int?  // For time-available question

    /// Get pillar weight for a specific pillar
    func weight(for pillar: Pillar) -> Double {
        pillarWeights[pillar.rawValue] ?? 0
    }

    /// Get flow key weight for a specific key
    func weight(for flowKey: FlowKey) -> Double {
        flowKeyWeights[flowKey.rawValue] ?? 0
    }
}

// MARK: - Quiz Response

struct QuizResponse: Codable {
    let questionId: String
    let answerId: String
    let timestamp: Date

    init(questionId: String, answerId: String) {
        self.questionId = questionId
        self.answerId = answerId
        self.timestamp = Date()
    }
}

// MARK: - Quiz Result

struct QuizResult: Codable {
    let completedAt: Date
    let responses: [QuizResponse]
    let recommendedHabitCount: Int
    let pillarScores: [String: Double]
    let flowKeyScores: [String: Double]
    let recommendedTemplateIds: [String]

    /// Get normalized pillar scores (0-1)
    var normalizedPillarScores: [Pillar: Double] {
        var result: [Pillar: Double] = [:]
        let maxScore = pillarScores.values.max() ?? 1

        for pillar in Pillar.allCases {
            let score = pillarScores[pillar.rawValue] ?? 0
            result[pillar] = maxScore > 0 ? score / maxScore : 0
        }

        return result
    }

    /// Get normalized flow key scores (0-1)
    var normalizedFlowKeyScores: [FlowKey: Double] {
        var result: [FlowKey: Double] = [:]
        let maxScore = flowKeyScores.values.max() ?? 1

        for key in FlowKey.allCases {
            let score = flowKeyScores[key.rawValue] ?? 0
            result[key] = maxScore > 0 ? score / maxScore : 0
        }

        return result
    }

    /// Get pillars ranked by score (highest first)
    var rankedPillars: [Pillar] {
        Pillar.allCases.sorted { pillar1, pillar2 in
            (pillarScores[pillar1.rawValue] ?? 0) > (pillarScores[pillar2.rawValue] ?? 0)
        }
    }

    /// Get flow keys ranked by score (highest first)
    var rankedFlowKeys: [FlowKey] {
        FlowKey.allCases.sorted { key1, key2 in
            (flowKeyScores[key1.rawValue] ?? 0) > (flowKeyScores[key2.rawValue] ?? 0)
        }
    }

    /// Get the top N flow keys
    func topFlowKeys(_ count: Int) -> [FlowKey] {
        Array(rankedFlowKeys.prefix(count))
    }

    /// Get the weakest pillar (needs most attention)
    var weakestPillar: Pillar? {
        rankedPillars.last
    }

    /// Get the strongest pillar
    var strongestPillar: Pillar? {
        rankedPillars.first
    }
}

// MARK: - Quiz Questions Container

struct QuizQuestionsContainer: Codable {
    let version: String
    let instruction: String?
    let questions: [QuizQuestion]
}

// MARK: - Quiz State

enum QuizState {
    case notStarted
    case inProgress(currentIndex: Int, responses: [QuizResponse])
    case completed(result: QuizResult)

    var isComplete: Bool {
        if case .completed = self { return true }
        return false
    }

    var currentIndex: Int {
        if case .inProgress(let index, _) = self { return index }
        return 0
    }

    var responses: [QuizResponse] {
        switch self {
        case .notStarted:
            return []
        case .inProgress(_, let responses):
            return responses
        case .completed(let result):
            return result.responses
        }
    }
}
