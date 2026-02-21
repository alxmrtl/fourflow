//
//  SetupContainerView.swift
//  FlowZone
//
//  Sacred onboarding - void background with breathing pillar glows
//

import SwiftUI

struct SetupContainerView: View {
    @EnvironmentObject var appState: AppState
    @State private var currentStep = 0

    private let steps = ["Spirit", "Story", "Space", "Ready"]

    // Current pillar color for breathing glow
    private var currentPillarColor: Color {
        switch currentStep {
        case 0: return .spirit
        case 1: return .story
        case 2: return .space
        default: return .selfPillar
        }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // Void background with breathing pillar glow
                Color.void
                    .ignoresSafeArea()

                // Ambient breathing glow - changes with pillar
                BreathingBackground(color: currentPillarColor, intensity: 0.15, radius: 350)
                    .offset(y: -100)
                    .allowsHitTesting(false)

                VStack(spacing: 0) {
                    // Progress indicator
                    progressIndicator
                        .padding(.top, 16)

                    // Content
                    TabView(selection: $currentStep) {
                        SetupSpiritView(onComplete: { currentStep = 1 })
                            .tag(0)

                        SetupStoryView(onComplete: { currentStep = 2 })
                            .tag(1)

                        SetupSpaceView(onComplete: { currentStep = 3 })
                            .tag(2)

                        setupCompleteView
                            .tag(3)
                    }
                    .tabViewStyle(.page(indexDisplayMode: .never))
                    .animation(.easeInOut, value: currentStep)
                }
            }
            .navigationBarHidden(true)
        }
    }

    // MARK: - Progress Indicator

    private var progressIndicator: some View {
        HStack(spacing: 8) {
            ForEach(0..<steps.count, id: \.self) { index in
                VStack(spacing: 4) {
                    Circle()
                        .fill(stepColor(for: index))
                        .frame(width: 8, height: 8)

                    Text(steps[index])
                        .font(.caption2)
                        .foregroundColor(index <= currentStep ? .textSecondary : .textMuted)
                }
            }
        }
        .padding(.horizontal)
    }

    private func stepColor(for index: Int) -> Color {
        if index < currentStep {
            return .space.opacity(0.8) // Completed
        } else if index == currentStep {
            return pillarColor(for: index)
        } else {
            return .white.opacity(0.15) // Future
        }
    }

    private func pillarColor(for index: Int) -> Color {
        switch index {
        case 0: return .spirit
        case 1: return .story
        case 2: return .space
        default: return .selfPillar
        }
    }

    // MARK: - Setup Complete

    private var setupCompleteView: some View {
        VStack(spacing: 32) {
            Spacer()

            // Celebration - subtle
            VStack(spacing: 16) {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 72))
                    .foregroundColor(.space.opacity(0.8))

                Text("You're Ready")
                    .font(.title.weight(.semibold))
                    .foregroundColor(.textPrimary)

                Text("Your flow foundation is set.\nTime to build your focus muscle.")
                    .font(.subheadline)
                    .foregroundColor(.textSecondary)
                    .multilineTextAlignment(.center)
            }

            Spacer()

            // Four Pillars summary - subtle cards
            VStack(spacing: 12) {
                ForEach(Pillar.displayOrder) { pillar in
                    HStack(spacing: 12) {
                        Circle()
                            .fill(pillar.color.opacity(0.8))
                            .frame(width: 8, height: 8)

                        Text(pillar.displayName)
                            .font(.subheadline.weight(.medium))
                            .foregroundColor(.textPrimary)

                        Spacer()

                        Image(systemName: "checkmark")
                            .font(.caption)
                            .foregroundColor(.space.opacity(0.8))
                    }
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(Color.white.opacity(0.03))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .strokeBorder(Color.borderSubtle, lineWidth: 1)
                    )
                    .cornerRadius(12)
                }
            }
            .padding(.horizontal)

            Spacer()

            // Start button - Journey gradient
            Button {
                appState.completeOnboarding()
            } label: {
                Text("Start Flowing")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(LinearGradient.journey)
                    .cornerRadius(16)
            }
            .padding(.horizontal)
            .padding(.bottom, 32)
        }
    }
}

#Preview {
    SetupContainerView()
        .environmentObject(AppState())
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
