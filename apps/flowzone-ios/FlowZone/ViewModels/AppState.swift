//
//  AppState.swift
//  FlowZone
//
//  Global app state and navigation management
//

import SwiftUI
import SwiftData

@MainActor
class AppState: ObservableObject {
    // MARK: - Navigation State

    @Published var isInFocusMode = false
    @Published var showBreathwork = false
    @Published var breathworkPhase: BreathworkPhase = .before
    @Published var hasCompletedOnboarding = false

    // MARK: - Current Session State

    @Published var currentTask: FlowTask?
    @Published var sessionDuration: Int = 25

    // MARK: - Selected Goal Filter

    @Published var selectedGoalId: UUID?

    // MARK: - Navigation to Settings

    @Published var navigateToSettingsPanel: SettingsPanel?

    // MARK: - Settings Cache

    @Published var settings: AppSettings?

    // MARK: - Model Context

    private var modelContext: ModelContext?

    // MARK: - Enums

    enum BreathworkPhase {
        case before
        case after
    }

    // MARK: - Initialization

    func initialize(modelContext: ModelContext) {
        self.modelContext = modelContext
        loadSettings()
        checkOnboardingStatus()
    }

    // MARK: - Settings

    private func loadSettings() {
        guard let modelContext else { return }

        let descriptor = FetchDescriptor<AppSettings>()
        if let existingSettings = try? modelContext.fetch(descriptor).first {
            self.settings = existingSettings
        } else {
            let newSettings = AppSettings()
            modelContext.insert(newSettings)
            try? modelContext.save()
            self.settings = newSettings
        }
    }

    // MARK: - Onboarding

    private func checkOnboardingStatus() {
        guard let modelContext else { return }

        let descriptor = FetchDescriptor<Profile>()
        if let profile = try? modelContext.fetch(descriptor).first {
            // User has completed onboarding if they have at least one value selected
            hasCompletedOnboarding = !profile.selectedValues.isEmpty
        } else {
            hasCompletedOnboarding = false
        }
    }

    func completeOnboarding() {
        hasCompletedOnboarding = true
    }

    // MARK: - Focus Session

    func startFocusSession(task: FlowTask?, duration: Int) {
        currentTask = task
        sessionDuration = duration

        // Check if we should show pre-flow breathwork
        if let settings, settings.breathworkBefore != .none {
            breathworkPhase = .before
            showBreathwork = true
        } else {
            isInFocusMode = true
        }
    }

    func breathworkComplete() {
        showBreathwork = false

        switch breathworkPhase {
        case .before:
            // After pre-flow breathwork, start focus mode
            isInFocusMode = true
        case .after:
            // After post-flow breathwork, return to main screen
            currentTask = nil
        }
    }

    func focusSessionComplete(showPostBreathwork: Bool) {
        isInFocusMode = false

        if showPostBreathwork, let settings, settings.breathworkAfter != .none {
            breathworkPhase = .after
            showBreathwork = true
        } else {
            currentTask = nil
        }
    }

    func cancelFocusSession() {
        isInFocusMode = false
        showBreathwork = false
        currentTask = nil
    }

    // MARK: - Breathwork

    func showPreFlowBreathwork() {
        breathworkPhase = .before
        showBreathwork = true
    }

    func showPostFlowBreathwork() {
        breathworkPhase = .after
        showBreathwork = true
    }

    func dismissBreathwork() {
        showBreathwork = false
    }

    // MARK: - Goal Selection

    func selectGoal(_ goalId: UUID?) {
        selectedGoalId = goalId
    }
}
