//
//  BreathworkContainerView.swift
//  FlowZone
//
//  Meditation portal - void background with hypnotic breathing
//

import SwiftUI

struct BreathworkContainerView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var viewModel = BreathworkViewModel()

    var pattern: BreathworkPattern {
        switch appState.breathworkPhase {
        case .before:
            return appState.settings?.breathworkBefore ?? .boxBreathing
        case .after:
            return appState.settings?.breathworkAfter ?? .coherentBreathing
        }
    }

    var body: some View {
        ZStack {
            // Void background - deepest dark for meditation
            Color.void
                .ignoresSafeArea()

            VStack(spacing: 0) {
                // Skip button - nearly invisible
                HStack {
                    Spacer()

                    Button {
                        viewModel.skip()
                        appState.breathworkComplete()
                    } label: {
                        Text("Skip")
                            .font(.subheadline)
                            .foregroundColor(.textMuted)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                    }
                }
                .padding(.top, 8)
                .padding(.horizontal)

                Spacer()

                // Main content based on phase
                if viewModel.preparationPhase != .complete {
                    preparationContent
                } else {
                    breathworkContent
                }

                Spacer()

                // Progress indicator - subtle
                if viewModel.isActive {
                    VStack(spacing: 8) {
                        // Progress bar - whisper level
                        GeometryReader { geometry in
                            ZStack(alignment: .leading) {
                                Rectangle()
                                    .fill(Color.white.opacity(0.05))

                                Rectangle()
                                    .fill(viewModel.currentColor.opacity(0.6))
                                    .frame(width: geometry.size.width * viewModel.overallProgress)
                            }
                        }
                        .frame(height: 3)
                        .cornerRadius(1.5)

                        // Cycle info
                        Text(viewModel.cycleText)
                            .font(.caption)
                            .foregroundColor(.textMuted)
                    }
                    .padding(.horizontal, 48)
                    .padding(.bottom, 48)
                }
            }
        }
        .onAppear {
            viewModel.start(pattern: pattern)
        }
        .onChange(of: viewModel.isComplete) { _, isComplete in
            if isComplete {
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                    appState.breathworkComplete()
                }
            }
        }
    }

    // MARK: - Preparation Content

    private var preparationContent: some View {
        VStack(spacing: 24) {
            if viewModel.showContent {
                switch viewModel.preparationPhase {
                case .initial:
                    Text("Finding your center...")
                        .font(.title2.weight(.medium))
                        .foregroundColor(.textSecondary)
                        .transition(.opacity)

                case .ready:
                    Text("Breathing into flow...")
                        .font(.title2.weight(.medium))
                        .foregroundColor(.textSecondary)
                        .transition(.opacity)

                case .countdown:
                    Text("\(viewModel.introCountdown)")
                        .font(.system(size: 72, weight: .light, design: .rounded))
                        .foregroundColor(.textSecondary)
                        .transition(.scale.combined(with: .opacity))

                case .complete:
                    EmptyView()
                }
            }
        }
        .animation(.easeInOut(duration: 0.3), value: viewModel.showContent)
        .animation(.easeInOut(duration: 0.3), value: viewModel.preparationPhase)
        .animation(.easeInOut(duration: 0.2), value: viewModel.introCountdown)
    }

    // MARK: - Breathwork Content

    private var breathworkContent: some View {
        VStack(spacing: 32) {
            // Animation
            BreathworkAnimationView(
                phase: viewModel.currentPhase,
                progress: viewModel.progress,
                color: viewModel.currentColor
            )
            .frame(width: 280, height: 280)

            // Phase label - whisper level
            if let phase = viewModel.currentPhase {
                VStack(spacing: 8) {
                    Text(phase.label)
                        .font(.title3.weight(.medium))
                        .foregroundColor(.textSecondary)

                    // Time remaining in phase
                    let remaining = phase.duration - viewModel.timeInPhase
                    Text(String(format: "%.0f", max(remaining, 0)))
                        .font(.title.weight(.semibold).monospacedDigit())
                        .foregroundColor(viewModel.currentColor.opacity(0.8))
                }
            }
        }
        .opacity(viewModel.showContent ? 1 : 0)
        .animation(.easeIn(duration: 0.5), value: viewModel.showContent)
    }
}

#Preview {
    BreathworkContainerView()
        .environmentObject(AppState())
}
