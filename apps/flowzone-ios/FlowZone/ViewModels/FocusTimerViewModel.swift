//
//  FocusTimerViewModel.swift
//  FlowZone
//
//  Focus timer state and logic with Focus Reps tracking
//

import SwiftUI
import Combine

@MainActor
class FocusTimerViewModel: ObservableObject {
    // MARK: - Timer State

    @Published var timeRemaining: TimeInterval = 0
    @Published var totalTime: TimeInterval = 0
    @Published var isRunning = false
    @Published var isPaused = false
    @Published var reps = 0
    @Published var showSessionComplete = false

    // MARK: - Struggle Phase

    @Published var isInStrugglePhase = true
    @Published var struggleMessage: String = ""

    // MARK: - Session Data

    private var startTime: Date?
    private var lastRepTime: Date?
    private var timer: Timer?

    // MARK: - Struggle Phase Messages

    private let struggleMessages = [
        "Building focus neurochemistry...",
        "Struggle phase = growth phase",
        "Your brain is warming up",
        "The breakthrough is coming",
        "This discomfort is temporary",
        "Every rep strengthens your focus muscle",
        "You're doing the hard work now",
        "Flow is on the other side",
        "Trust the process",
        "Stay with it..."
    ]

    // MARK: - Computed Properties

    var progress: Double {
        guard totalTime > 0 else { return 0 }
        return (totalTime - timeRemaining) / totalTime
    }

    var isComplete: Bool {
        timeRemaining <= 0 && isRunning
    }

    /// Struggle phase ends after 25% of session or 5 minutes
    private var strugglePhaseThreshold: TimeInterval {
        min(totalTime * 0.25, 5 * 60)
    }

    var formattedTime: String {
        let minutes = Int(timeRemaining) / 60
        let seconds = Int(timeRemaining) % 60
        return String(format: "%d:%02d", minutes, seconds)
    }

    var actualDuration: Int {
        guard let startTime else { return 0 }
        return Int(Date().timeIntervalSince(startTime) / 60)
    }

    // MARK: - Timer Control

    func start(duration: Int) {
        totalTime = TimeInterval(duration * 60)
        timeRemaining = totalTime
        isRunning = true
        isPaused = false
        reps = 0
        startTime = Date()
        isInStrugglePhase = true
        showSessionComplete = false

        // Set initial struggle message
        struggleMessage = struggleMessages.randomElement() ?? struggleMessages[0]

        startTimer()
        startMessageRotation()
    }

    func pause() {
        isPaused = true
        timer?.invalidate()
        HapticFeedback.light()
    }

    func resume() {
        isPaused = false
        startTimer()
        HapticFeedback.light()
    }

    func stop() {
        timer?.invalidate()
        isRunning = false
        isPaused = false
    }

    func incrementReps() {
        reps += 1
        lastRepTime = Date()
        HapticFeedback.medium()
    }

    func complete() {
        timer?.invalidate()
        isRunning = false
        showSessionComplete = true
        HapticFeedback.success()
    }

    // MARK: - Private Methods

    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.tick()
            }
        }
    }

    private func tick() {
        guard !isPaused else { return }

        timeRemaining -= 1

        // Check struggle phase exit conditions
        if isInStrugglePhase {
            let elapsed = totalTime - timeRemaining
            let timeSinceLastRep = lastRepTime.map { Date().timeIntervalSince($0) } ?? elapsed

            // Exit struggle phase after threshold or 5 min without reps
            if elapsed >= strugglePhaseThreshold || timeSinceLastRep >= 5 * 60 {
                withAnimation(.easeOut(duration: 30)) {
                    isInStrugglePhase = false
                }
            }
        }

        if timeRemaining <= 0 {
            complete()
        }
    }

    private func startMessageRotation() {
        // Rotate struggle messages every 8 seconds
        Timer.scheduledTimer(withTimeInterval: 8, repeats: true) { [weak self] timer in
            Task { @MainActor in
                guard let self, self.isInStrugglePhase else {
                    timer.invalidate()
                    return
                }
                withAnimation(.easeInOut(duration: 0.5)) {
                    self.struggleMessage = self.struggleMessages.randomElement() ?? self.struggleMessages[0]
                }
            }
        }
    }
}
