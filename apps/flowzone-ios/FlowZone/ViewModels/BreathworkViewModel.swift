//
//  BreathworkViewModel.swift
//  FlowZone
//
//  Breathwork engine state and timing logic
//

import SwiftUI
import Combine

// MARK: - Phase Types

enum BreathPhaseType: String {
    case inhale
    case holdFull = "hold-full"
    case exhale
    case holdEmpty = "hold-empty"

    var label: String {
        switch self {
        case .inhale: return "Breathe In"
        case .holdFull: return "Hold"
        case .exhale: return "Breathe Out"
        case .holdEmpty: return "Pause"
        }
    }
}

// MARK: - Phase Definition

struct BreathPhase {
    let type: BreathPhaseType
    let duration: TimeInterval
    let label: String

    init(type: BreathPhaseType, duration: TimeInterval, label: String? = nil) {
        self.type = type
        self.duration = duration
        self.label = label ?? type.label
    }
}

// MARK: - Pattern Definition

struct BreathworkPatternDefinition {
    let key: String
    let name: String
    let description: String
    let phases: [BreathPhase]
    let cycles: Int
    let timing: String  // "before" or "after"

    var totalDuration: TimeInterval {
        let cycleDuration = phases.reduce(0) { $0 + $1.duration }
        return cycleDuration * Double(cycles)
    }
}

// MARK: - ViewModel

@MainActor
class BreathworkViewModel: ObservableObject {
    // MARK: - State

    @Published var isActive = false
    @Published var isComplete = false
    @Published var currentCycle = 0
    @Published var currentPhaseIndex = 0
    @Published var timeInPhase: TimeInterval = 0

    // MARK: - Preparation Sequence

    @Published var preparationPhase: PreparationPhase = .initial
    @Published var showContent = false
    @Published var introCountdown = 3

    enum PreparationPhase {
        case initial      // "Finding your center..."
        case ready        // "Breathing into flow..."
        case countdown    // 3, 2, 1
        case complete     // Breathing animation
    }

    // MARK: - Pattern

    var currentPattern: BreathworkPatternDefinition?

    var currentPhase: BreathPhase? {
        guard let pattern = currentPattern,
              currentPhaseIndex < pattern.phases.count else { return nil }
        return pattern.phases[currentPhaseIndex]
    }

    var progress: Double {
        guard let phase = currentPhase else { return 0 }
        return min(timeInPhase / phase.duration, 1.0)
    }

    var overallProgress: Double {
        guard let pattern = currentPattern else { return 0 }
        let totalPhases = Double(pattern.phases.count * pattern.cycles)
        let completedPhases = Double(currentCycle * pattern.phases.count + currentPhaseIndex)
        return (completedPhases + progress) / totalPhases
    }

    var currentColor: Color {
        // Cycle through pillar colors
        let pillars = Pillar.displayOrder
        let colorIndex = currentCycle % pillars.count
        return pillars[colorIndex].color
    }

    var cycleText: String {
        guard let pattern = currentPattern else { return "" }
        return "Cycle \(currentCycle + 1) of \(pattern.cycles)"
    }

    // MARK: - Private

    private var timer: Timer?
    private let audioEngine = BreathworkAudioEngine.shared

    // MARK: - Control

    func start(pattern: BreathworkPattern, autoStart: Bool = true) {
        guard let definition = Self.patternDefinitions[pattern] else { return }

        currentPattern = definition
        currentCycle = 0
        currentPhaseIndex = 0
        timeInPhase = 0
        isComplete = false
        isActive = false
        showContent = false
        preparationPhase = .initial

        if autoStart {
            runPreparationSequence()
        } else {
            preparationPhase = .complete
            beginBreathing()
        }
    }

    func stop() {
        timer?.invalidate()
        isActive = false
        audioEngine.stopCurrent()
    }

    func skip() {
        stop()
        isComplete = true
    }

    // MARK: - Preparation Sequence

    private func runPreparationSequence() {
        // Phase 1: "Finding your center..." (0.1s - 2.8s)
        preparationPhase = .initial
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            withAnimation(.easeIn(duration: 0.5)) {
                self.showContent = true
            }
        }

        // Phase 2: "Breathing into flow..." (2.8s - 5.7s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.8) {
            withAnimation(.easeOut(duration: 0.3)) {
                self.showContent = false
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 3.1) {
            self.preparationPhase = .ready
            withAnimation(.easeIn(duration: 0.5)) {
                self.showContent = true
            }
        }

        // Phase 3: Countdown 3, 2, 1 (5.7s - 8.8s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 5.7) {
            withAnimation(.easeOut(duration: 0.3)) {
                self.showContent = false
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 6.0) {
            self.preparationPhase = .countdown
            self.introCountdown = 3
            withAnimation(.easeIn(duration: 0.2)) {
                self.showContent = true
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 7.0) {
            self.introCountdown = 2
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 8.0) {
            self.introCountdown = 1
        }

        // Begin breathing (9.3s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 9.0) {
            withAnimation(.easeOut(duration: 0.3)) {
                self.showContent = false
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 9.3) {
            self.preparationPhase = .complete
            self.beginBreathing()
        }
    }

    // MARK: - Breathing Logic

    private func beginBreathing() {
        isActive = true
        showContent = true
        playCurrentPhase()
        startTimer()
    }

    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.tick()
            }
        }
    }

    private func tick() {
        guard currentPattern != nil,
              let phase = currentPhase else { return }

        timeInPhase += 0.1

        if timeInPhase >= phase.duration {
            advancePhase()
        }
    }

    private func advancePhase() {
        guard let pattern = currentPattern else { return }

        currentPhaseIndex += 1
        timeInPhase = 0

        if currentPhaseIndex >= pattern.phases.count {
            currentPhaseIndex = 0
            currentCycle += 1

            if currentCycle >= pattern.cycles {
                complete()
                return
            }
        }

        playCurrentPhase()
    }

    private func playCurrentPhase() {
        guard let phase = currentPhase else { return }
        audioEngine.playPhase(phase)
        HapticFeedback.light()
    }

    private func complete() {
        timer?.invalidate()
        isActive = false
        isComplete = true
        audioEngine.playComplete()
        HapticFeedback.success()
    }

    // MARK: - Pattern Definitions

    static let patternDefinitions: [BreathworkPattern: BreathworkPatternDefinition] = [
        .boxBreathing: BreathworkPatternDefinition(
            key: "box-breathing",
            name: "Box Breathing",
            description: "Equal breathing for calm focus",
            phases: [
                BreathPhase(type: .inhale, duration: 4),
                BreathPhase(type: .holdFull, duration: 4),
                BreathPhase(type: .exhale, duration: 4),
                BreathPhase(type: .holdEmpty, duration: 4)
            ],
            cycles: 3,
            timing: "before"
        ),
        .energizingBreath: BreathworkPatternDefinition(
            key: "energizing-breath",
            name: "Energizing Breath",
            description: "Quick breathing for high alert",
            phases: [
                BreathPhase(type: .inhale, duration: 2),
                BreathPhase(type: .exhale, duration: 2)
            ],
            cycles: 6,
            timing: "before"
        ),
        .powerBreath: BreathworkPatternDefinition(
            key: "power-breath",
            name: "Power Breath",
            description: "Build confidence and readiness",
            phases: [
                BreathPhase(type: .inhale, duration: 4),
                BreathPhase(type: .holdFull, duration: 4),
                BreathPhase(type: .exhale, duration: 6),
                BreathPhase(type: .holdEmpty, duration: 2)
            ],
            cycles: 3,
            timing: "before"
        ),
        .relaxation478: BreathworkPatternDefinition(
            key: "relaxation-478",
            name: "4-7-8 Relaxation",
            description: "Deep relaxation and recovery",
            phases: [
                BreathPhase(type: .inhale, duration: 4),
                BreathPhase(type: .holdFull, duration: 7),
                BreathPhase(type: .exhale, duration: 8)
            ],
            cycles: 3,
            timing: "after"
        ),
        .coherentBreathing: BreathworkPatternDefinition(
            key: "coherent-breathing",
            name: "Coherent Breathing",
            description: "Balance your nervous system",
            phases: [
                BreathPhase(type: .inhale, duration: 5),
                BreathPhase(type: .exhale, duration: 5)
            ],
            cycles: 4,
            timing: "after"
        ),
        .groundingBreath: BreathworkPatternDefinition(
            key: "grounding-breath",
            name: "Grounding Breath",
            description: "Integration and centering",
            phases: [
                BreathPhase(type: .inhale, duration: 4),
                BreathPhase(type: .holdFull, duration: 2),
                BreathPhase(type: .exhale, duration: 6),
                BreathPhase(type: .holdEmpty, duration: 2)
            ],
            cycles: 4,
            timing: "after"
        ),
        .fourLayer: BreathworkPatternDefinition(
            key: "four-layer",
            name: "Four Layer Breath",
            description: "Align with all four pillars",
            phases: [
                BreathPhase(type: .inhale, duration: 8, label: "Breathe In (Self → Space → Story → Spirit)"),
                BreathPhase(type: .holdFull, duration: 4, label: "Hold (All Pillars)"),
                BreathPhase(type: .exhale, duration: 8, label: "Breathe Out (Spirit → Story → Space → Self)")
            ],
            cycles: 4,
            timing: "either"
        )
    ]
}
