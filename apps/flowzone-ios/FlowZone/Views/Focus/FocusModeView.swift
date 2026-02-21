//
//  FocusModeView.swift
//  FlowZone
//
//  Transcendent focus experience - floating in the void
//  Observatory aesthetic: minimal, whisper-level UI
//

import SwiftUI
import SwiftData

struct FocusModeView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.modelContext) private var modelContext
    @StateObject private var timerVM = FocusTimerViewModel()
    @StateObject private var statsVM = StatsViewModel()

    @Query(filter: #Predicate<AppSettings> { $0.id == "app-settings" })
    private var settingsQuery: [AppSettings]
    private var settings: AppSettings? { settingsQuery.first }

    @State private var showCancelConfirm = false

    var body: some View {
        ZStack {
            // Void background - deepest dark, like floating in space
            Color.void
                .ignoresSafeArea()

            // Struggle phase overlay
            StrugglePhaseOverlay(
                isActive: timerVM.isInStrugglePhase,
                message: timerVM.struggleMessage
            )

            // Main content
            VStack(spacing: 0) {
                // Top bar
                topBar

                Spacer()

                // Timer circle
                FocusTimerCircle(
                    progress: timerVM.progress,
                    timeString: timerVM.formattedTime,
                    isPaused: timerVM.isPaused
                )

                Spacer()

                // Reps button
                FocusRepsButton(
                    reps: timerVM.reps,
                    action: timerVM.incrementReps
                )

                // Control buttons
                controlButtons
                    .padding(.top, 24)
                    .padding(.bottom, 48)
            }
            .padding()
        }
        .onAppear {
            timerVM.start(duration: appState.sessionDuration)
            startBinauralIfEnabled()
        }
        .onDisappear {
            stopBinaural()
        }
        .sheet(isPresented: $timerVM.showSessionComplete) {
            SessionCompleteView(
                reps: timerVM.reps,
                duration: timerVM.actualDuration,
                task: appState.currentTask
            ) { feltFlow, completeTask in
                saveSession(feltFlow: feltFlow, completeTask: completeTask)
            }
        }
        .confirmationDialog(
            "End session early?",
            isPresented: $showCancelConfirm,
            titleVisibility: .visible
        ) {
            Button("End & Save", role: .destructive) {
                stopBinaural()
                timerVM.complete()
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("Your progress will be saved.")
        }
    }

    // MARK: - Binaural Beats

    private func startBinauralIfEnabled() {
        guard settings?.sound == .binaural else { return }
        let engine = BinauralBeatEngine.shared
        engine.volume = Float(settings?.volume ?? 0.3)
        engine.start()
    }

    private func stopBinaural() {
        BinauralBeatEngine.shared.stop()
    }

    // MARK: - Top Bar (whisper-level UI)

    private var topBar: some View {
        HStack {
            // Cancel button - barely visible
            Button {
                showCancelConfirm = true
            } label: {
                Image(systemName: "xmark")
                    .font(.body.weight(.medium))
                    .foregroundColor(.textMuted)
                    .frame(width: 44, height: 44)
            }

            Spacer()

            // Task title - whisper level
            if let task = appState.currentTask {
                VStack(spacing: 2) {
                    if let goal = task.goal {
                        Text(goal.emoji)
                            .font(.caption)
                            .opacity(0.6)
                    }
                    Text(task.title)
                        .font(.subheadline.weight(.medium))
                        .foregroundColor(.textMuted)
                        .lineLimit(1)
                }
            }

            Spacer()

            // Placeholder for symmetry
            Color.clear
                .frame(width: 44, height: 44)
        }
    }

    // MARK: - Control Buttons (minimal, whisper-level)

    private var controlButtons: some View {
        HStack(spacing: 24) {
            // Pause/Resume - subtle
            Button {
                if timerVM.isPaused {
                    timerVM.resume()
                } else {
                    timerVM.pause()
                }
            } label: {
                Image(systemName: timerVM.isPaused ? "play.fill" : "pause.fill")
                    .font(.title2)
                    .foregroundColor(.textSecondary)
                    .frame(width: 64, height: 64)
                    .background(Color.white.opacity(0.05))
                    .clipShape(Circle())
            }
        }
    }

    // MARK: - Save Session

    private func saveSession(feltFlow: Bool, completeTask: Bool) {
        statsVM.recordSession(
            modelContext: modelContext,
            task: appState.currentTask,
            plannedDuration: appState.sessionDuration,
            actualDuration: timerVM.actualDuration,
            reps: timerVM.reps,
            feltFlow: feltFlow,
            completeTask: completeTask
        )

        // Check for post-flow breathwork
        appState.focusSessionComplete(showPostBreathwork: true)
    }
}

// MARK: - Focus Timer Circle (minimal, observatory aesthetic)

struct FocusTimerCircle: View {
    let progress: Double
    let timeString: String
    let isPaused: Bool

    private let strokeWidth: CGFloat = 3  // Thin, minimal stroke
    private let size: CGFloat = 280

    var body: some View {
        ZStack {
            // Background circle - barely visible
            Circle()
                .stroke(Color.white.opacity(0.08), lineWidth: strokeWidth)

            // Progress circle - subtle pillar color
            Circle()
                .trim(from: 0, to: progress)
                .stroke(
                    Color.selfPillar.opacity(0.5),
                    style: StrokeStyle(
                        lineWidth: strokeWidth,
                        lineCap: .round
                    )
                )
                .rotationEffect(.degrees(-90))
                .animation(.linear(duration: 1), value: progress)

            // Time display - whisper level, light weight
            VStack(spacing: 8) {
                Text(timeString)
                    .font(.system(size: 56, weight: .light, design: .rounded))
                    .foregroundColor(.textSecondary)
                    .monospacedDigit()

                if isPaused {
                    Text("PAUSED")
                        .font(.caption.weight(.medium))
                        .foregroundColor(.amber.opacity(0.7))
                }
            }
        }
        .frame(width: size, height: size)
    }
}

// MARK: - Focus Reps Button (minimal with breathing amber glow)

struct FocusRepsButton: View {
    let reps: Int
    let action: () -> Void

    @State private var isBreathing = false

    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                HStack(spacing: 6) {
                    Image(systemName: "plus")
                        .font(.title3.weight(.medium))

                    Text("Rep")
                        .font(.title3.weight(.medium))

                    Text("(\(reps))")
                        .font(.title3.weight(.semibold))
                        .foregroundColor(.amber.opacity(0.8))
                }
                .foregroundColor(.textSecondary)

                Text("Press when you resist distraction")
                    .font(.caption)
                    .foregroundColor(.textMuted)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 20)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.white.opacity(0.03))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .strokeBorder(Color.amber.opacity(isBreathing ? 0.25 : 0.15), lineWidth: 1)
                    )
            )
        }
        .onAppear {
            withAnimation(FourFlowAnimation.breathe) {
                isBreathing = true
            }
        }
    }
}

// MARK: - Struggle Phase Overlay (subtle, not overwhelming)

struct StrugglePhaseOverlay: View {
    let isActive: Bool
    let message: String

    var body: some View {
        if isActive {
            ZStack {
                // Gentle amber glow at edges - whisper level
                RadialGradient(
                    colors: [
                        .clear,
                        .clear,
                        Color.amber.opacity(0.05),
                        Color.amber.opacity(0.08)
                    ],
                    center: .center,
                    startRadius: 100,
                    endRadius: UIScreen.main.bounds.height / 2
                )
                .ignoresSafeArea()

                // Message at bottom - subtle
                VStack {
                    Spacer()

                    Text(message)
                        .font(.subheadline)
                        .foregroundColor(.amber.opacity(0.6))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 48)
                        .padding(.bottom, 180)
                }
            }
            .transition(.opacity)
            .animation(.easeOut(duration: 30), value: isActive)
        }
    }
}

// MARK: - Session Complete View (observatory aesthetic)

struct SessionCompleteView: View {
    @Environment(\.dismiss) private var dismiss

    let reps: Int
    let duration: Int
    let task: FlowTask?

    let onSave: (Bool, Bool) -> Void

    @State private var feltFlow = false
    @State private var completeTask = false

    var body: some View {
        NavigationStack {
            ZStack {
                Color.canvas
                    .ignoresSafeArea()

                VStack(spacing: 32) {
                    // Celebration - subtle
                    VStack(spacing: 16) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 64))
                            .foregroundColor(.space.opacity(0.8))

                        Text("Session Complete")
                            .font(.title2.weight(.semibold))
                            .foregroundColor(.textPrimary)
                    }

                    // Stats - subtle card
                    HStack(spacing: 32) {
                        VStack(spacing: 4) {
                            Text("\(duration)")
                                .font(.title.weight(.semibold))
                                .foregroundColor(.selfPillar.opacity(0.8))
                            Text("minutes")
                                .font(.caption)
                                .foregroundColor(.textMuted)
                        }

                        VStack(spacing: 4) {
                            Text("\(reps)")
                                .font(.title.weight(.semibold))
                                .foregroundColor(.amber.opacity(0.8))
                            Text("reps")
                                .font(.caption)
                                .foregroundColor(.textMuted)
                        }
                    }
                    .padding()
                    .background(Color.white.opacity(0.03))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .strokeBorder(Color.borderSubtle, lineWidth: 1)
                    )
                    .cornerRadius(16)

                    // Options - subtle card
                    VStack(spacing: 16) {
                        Toggle(isOn: $feltFlow) {
                            HStack {
                                Image(systemName: "sparkles")
                                    .foregroundColor(.spirit.opacity(0.8))
                                Text("I experienced flow")
                                    .foregroundColor(.textPrimary)
                            }
                        }
                        .tint(.spirit)

                        if task != nil {
                            Toggle(isOn: $completeTask) {
                                HStack {
                                    Image(systemName: "checkmark.circle")
                                        .foregroundColor(.space.opacity(0.8))
                                    Text("Mark task complete")
                                        .foregroundColor(.textPrimary)
                                }
                            }
                            .tint(.space)
                        }
                    }
                    .padding()
                    .background(Color.white.opacity(0.03))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .strokeBorder(Color.borderSubtle, lineWidth: 1)
                    )
                    .cornerRadius(16)

                    Spacer()

                    // Done button - Journey gradient
                    Button {
                        onSave(feltFlow, completeTask)
                        dismiss()
                    } label: {
                        Text("Done")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 16)
                            .background(LinearGradient.journey)
                            .cornerRadius(16)
                    }
                }
                .padding()
            }
            .navigationBarTitleDisplayMode(.inline)
        }
        .presentationDetents([.medium])
    }
}

#Preview {
    FocusModeView()
        .environmentObject(AppState())
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
