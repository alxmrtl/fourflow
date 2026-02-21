//
//  QuizManager.swift
//  FlowHabits
//
//  Manages the onboarding quiz flow and result calculation
//

import Foundation
import SwiftUI

@MainActor
final class QuizManager: ObservableObject {
    // MARK: - Published Properties

    @Published var state: QuizState = .notStarted
    @Published var questions: [QuizQuestion] = []
    @Published var instruction: String = "Go with your gut. Don't think—just tap."

    // MARK: - App Storage

    @AppStorage("hasCompletedOnboarding") var hasCompletedOnboarding = false
    @AppStorage("quizResultData") private var quizResultData: Data?

    // MARK: - Computed Properties

    var quizResult: QuizResult? {
        guard let data = quizResultData else { return nil }
        return try? JSONDecoder().decode(QuizResult.self, from: data)
    }

    var currentQuestion: QuizQuestion? {
        guard case .inProgress(let index, _) = state,
              index < questions.count else { return nil }
        return questions[index]
    }

    var progress: Double {
        guard !questions.isEmpty else { return 0 }
        return Double(state.currentIndex) / Double(questions.count)
    }

    var isLastQuestion: Bool {
        state.currentIndex == questions.count - 1
    }

    // MARK: - Initialization

    init() {
        loadQuestions()
    }

    // MARK: - Public Methods

    func startQuiz() {
        state = .inProgress(currentIndex: 0, responses: [])
    }

    func answerCurrentQuestion(with answerId: String) {
        guard case .inProgress(let index, var responses) = state,
              index < questions.count else { return }

        let response = QuizResponse(
            questionId: questions[index].id,
            answerId: answerId
        )
        responses.append(response)

        if index + 1 >= questions.count {
            // Quiz complete - show results
            // Note: hasCompletedOnboarding is set after user selects habits in HabitSelectionView
            let result = calculateResults(responses: responses)
            saveResult(result)
            state = .completed(result: result)
        } else {
            // Next question
            state = .inProgress(currentIndex: index + 1, responses: responses)
        }
    }

    func goBack() {
        guard case .inProgress(let index, var responses) = state,
              index > 0 else { return }

        // Remove last response and go back
        if !responses.isEmpty {
            responses.removeLast()
        }
        state = .inProgress(currentIndex: index - 1, responses: responses)
    }

    func resetQuiz() {
        hasCompletedOnboarding = false
        quizResultData = nil
        state = .notStarted
    }

    func skipOnboarding() {
        hasCompletedOnboarding = true
        state = .notStarted
    }

    // MARK: - Private Methods

    private func loadQuestions() {
        guard let url = Bundle.main.url(forResource: "QuizQuestions", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let container = try? JSONDecoder().decode(QuizQuestionsContainer.self, from: data) else {
            print("Warning: Failed to load QuizQuestions.json")
            return
        }

        questions = container.questions
        if let inst = container.instruction {
            instruction = inst
        }
    }

    private func saveResult(_ result: QuizResult) {
        quizResultData = try? JSONEncoder().encode(result)
    }

    private func calculateResults(responses: [QuizResponse]) -> QuizResult {
        var pillarScores: [String: Double] = [:]
        var flowKeyScores: [String: Double] = [:]
        var timeAnswerId: String?

        // Process each response
        for response in responses {
            guard let question = questions.first(where: { $0.id == response.questionId }),
                  let answer = question.answers.first(where: { $0.id == response.answerId }) else {
                continue
            }

            // Track time answer separately
            if question.id == "time-available" {
                timeAnswerId = response.answerId
            }

            // Accumulate pillar weights
            for (pillar, weight) in answer.pillarWeights {
                pillarScores[pillar, default: 0] += weight
            }

            // Accumulate flow key weights
            for (key, weight) in answer.flowKeyWeights {
                flowKeyScores[key, default: 0] += weight
            }
        }

        // Calculate recommended habit count based on time answer
        let recommendedCount = calculateRecommendedHabitCount(timeAnswerId: timeAnswerId, responses: responses)

        // Get prioritized flow keys
        let rankedKeys = FlowKey.allCases.sorted { key1, key2 in
            (flowKeyScores[key1.rawValue] ?? 0) > (flowKeyScores[key2.rawValue] ?? 0)
        }

        // Convert string scores to typed dictionaries for the new algorithm
        var typedPillarScores: [Pillar: Double] = [:]
        for (key, value) in pillarScores {
            if let pillar = Pillar(rawValue: key) {
                typedPillarScores[pillar] = value
            }
        }

        var typedFlowKeyScores: [FlowKey: Double] = [:]
        for (key, value) in flowKeyScores {
            if let flowKey = FlowKey(rawValue: key) {
                typedFlowKeyScores[flowKey] = value
            }
        }

        // Get recommended habits with balanced cross-pillar coverage
        let recommendedHabits = CatalogService.shared.balancedRecommendedHabits(
            pillarScores: typedPillarScores,
            flowKeyScores: typedFlowKeyScores,
            totalCount: recommendedCount
        )

        return QuizResult(
            completedAt: Date(),
            responses: responses,
            recommendedHabitCount: recommendedCount,
            pillarScores: pillarScores,
            flowKeyScores: flowKeyScores,
            recommendedTemplateIds: recommendedHabits.map { $0.id }
        )
    }

    private func calculateRecommendedHabitCount(timeAnswerId: String?, responses: [QuizResponse]) -> Int {
        // First try to get habitCount from the answer directly
        if let timeQuestionId = timeAnswerId,
           let timeQuestion = questions.first(where: { $0.id == "time-available" }),
           let answer = timeQuestion.answers.first(where: { $0.id == timeQuestionId }),
           let count = answer.habitCount {
            return count
        }

        // Fallback to ID-based mapping for backwards compatibility
        switch timeAnswerId {
        case "micro", "5-10-min":
            return 3
        case "window", "15-30-min":
            return 5
        case "dedicated", "30-60-min":
            return 7
        case "open", "more-than-hour":
            return 9
        default:
            return 5
        }
    }
}

// MARK: - Quiz Summary Helpers

extension QuizResult {
    /// Generate a summary description of the quiz results
    var summaryDescription: String {
        guard let strongest = strongestPillar,
              let weakest = weakestPillar else {
            return "Complete the quiz to get personalized recommendations."
        }

        if strongest == weakest {
            return "Your pillars are balanced. Focus on the habits that resonate most."
        }

        return "Your \(strongest.displayName) is calling for practice. \(weakest.displayName) feels more aligned."
    }

    /// Get the top recommended Flow Keys as a readable string
    func topKeysDescription(count: Int = 3) -> String {
        let keys = topFlowKeys(count)
        return keys.map { $0.displayName }.joined(separator: ", ")
    }
}
