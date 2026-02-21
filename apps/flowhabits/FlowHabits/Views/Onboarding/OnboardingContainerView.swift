//
//  OnboardingContainerView.swift
//  FlowHabits
//
//  Container for the onboarding quiz flow
//

import SwiftUI
import SwiftData

struct OnboardingContainerView: View {
    @Environment(\.modelContext) private var modelContext
    @StateObject private var quizManager = QuizManager()
    @AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false

    var body: some View {
        Group {
            switch quizManager.state {
            case .notStarted:
                WelcomeView(onStart: quizManager.startQuiz, onSkip: quizManager.skipOnboarding)

            case .inProgress:
                QuizFlowView()
                    .environmentObject(quizManager)

            case .completed(let result):
                HabitSelectionView(result: result) { selectedTemplates in
                    adoptHabits(selectedTemplates)
                }
            }
        }
        .animation(.easeInOut(duration: 0.3), value: quizManager.state.isComplete)
    }

    private func adoptHabits(_ templates: [FlowHabitTemplate]) {
        for (index, template) in templates.enumerated() {
            let habit = Habit(from: template, sortOrder: index)
            modelContext.insert(habit)
        }
        Haptics.success()
        // Set flag to open Practices tab after onboarding
        UserDefaults.standard.set(true, forKey: "shouldOpenPracticesTab")
        // Mark onboarding as complete after user selects habits
        hasCompletedOnboarding = true
    }
}

// MARK: - Welcome View

struct WelcomeView: View {
    let onStart: () -> Void
    let onSkip: () -> Void

    @State private var breathScale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.0

    var body: some View {
        ZStack {
            // The Void
            Color.canvas.ignoresSafeArea()

            // Sacred geometry - barely visible
            FourElementsMandala(opacity: 0.02)
                .ignoresSafeArea()

            // Spirit glow from center
            RadialGradient(
                colors: [Color.spirit.opacity(0.12), Color.clear],
                center: .center,
                startRadius: 0,
                endRadius: 350
            )
            .scaleEffect(breathScale)
            .opacity(glowOpacity)
            .ignoresSafeArea()

            VStack(spacing: 32) {
                Spacer()

                // Brand - breathing
                VStack(spacing: 16) {
                    Text("FlowHabits")
                        .font(.statement)
                        .foregroundStyle(.ivory)
                        .scaleEffect(breathScale)

                    Text("Practices for Self, Space, Story, and Spirit.")
                        .font(.flowBody)
                        .foregroundStyle(.textSecondary)
                        .multilineTextAlignment(.center)
                }

                // The Four Pillars - compact breathing rings
                HStack(spacing: 20) {
                    ForEach(Pillar.displayOrder) { pillar in
                        ZStack {
                            // Ambient glow
                            Circle()
                                .fill(
                                    RadialGradient(
                                        colors: [pillar.color.opacity(0.25), Color.clear],
                                        center: .center,
                                        startRadius: 0,
                                        endRadius: 28
                                    )
                                )
                                .frame(width: 48, height: 48)
                                .scaleEffect(breathScale)
                                .opacity(glowOpacity)

                            Circle()
                                .stroke(pillar.color.opacity(0.4), lineWidth: 1.5)
                                .frame(width: 44, height: 44)

                            Image(systemName: pillar.iconName)
                                .font(.title3)
                                .foregroundStyle(pillar.color)
                        }
                    }
                }

                Spacer()

                // Two equal action buttons
                VStack(spacing: 12) {
                    // Suggest for Me - Quiz path
                    Button {
                        Haptics.light()
                        onStart()
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "sparkles")
                                .font(.title3)
                            Text("Suggest for Me")
                                .font(.flowBodyBold)
                        }
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 18)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(LinearGradient.journey)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .strokeBorder(Color.white.opacity(0.1), lineWidth: 1)
                        )
                    }

                    // I'll Choose - Browse path
                    Button {
                        Haptics.light()
                        onSkip()
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "square.grid.2x2")
                                .font(.title3)
                            Text("I'll Choose")
                                .font(.flowBodyBold)
                        }
                        .foregroundStyle(.textPrimary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 18)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(Color.cardBackground)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .strokeBorder(Color.white.opacity(0.1), lineWidth: 1)
                        )
                    }
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 48)
            }
            .padding()
        }
        .onAppear {
            withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                breathScale = 1.03
                glowOpacity = 0.8
            }
        }
    }
}

// MARK: - Quiz Flow View

struct QuizFlowView: View {
    @EnvironmentObject var quizManager: QuizManager
    @State private var showInstruction = true

    var body: some View {
        ZStack {
            // The Void
            Color.canvas.ignoresSafeArea()

            // Subtle Spirit glow from bottom
            VStack {
                Spacer()
                RadialGradient(
                    colors: [Color.spirit.opacity(0.08), Color.clear],
                    center: .bottom,
                    startRadius: 0,
                    endRadius: 300
                )
                .frame(height: 350)
            }
            .ignoresSafeArea()

            VStack(spacing: 0) {
                // Progress Header
                quizHeader

                // Instruction (fades after first question)
                if showInstruction {
                    Text(quizManager.instruction)
                        .font(.quizInstruction)
                        .foregroundStyle(.textSecondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 32)
                        .padding(.bottom, 8)
                        .transition(.opacity)
                }

                // Question Content
                if let question = quizManager.currentQuestion {
                    RapidFireQuestionView(
                        question: question,
                        onAnswer: { answerId in
                            Haptics.light()
                            quizManager.answerCurrentQuestion(with: answerId)

                            // Fade instruction after first answer
                            if showInstruction {
                                withAnimation(.easeOut(duration: 0.3)) {
                                    showInstruction = false
                                }
                            }
                        }
                    )
                    .id(question.id)
                    .transition(.asymmetric(
                        insertion: .move(edge: .trailing).combined(with: .opacity),
                        removal: .move(edge: .leading).combined(with: .opacity)
                    ))
                }
            }
        }
        .animation(.easeInOut(duration: 0.25), value: quizManager.state.currentIndex)
    }

    private var quizHeader: some View {
        VStack(spacing: 12) {
            HStack {
                if quizManager.state.currentIndex > 0 {
                    Button {
                        Haptics.light()
                        quizManager.goBack()
                    } label: {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundStyle(.textSecondary)
                    }
                } else {
                    Spacer()
                        .frame(width: 24)
                }

                Spacer()

                Text("\(quizManager.state.currentIndex + 1)/\(quizManager.questions.count)")
                    .font(.whisper)
                    .foregroundStyle(.textWhisper)

                Spacer()

                Spacer().frame(width: 24)
            }

            // Progress Bar - The Spectrum gradient
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Rectangle()
                        .fill(Color.white.opacity(0.08))
                        .frame(height: 3)

                    Rectangle()
                        .fill(LinearGradient.spectrum)
                        .frame(width: geometry.size.width * quizManager.progress, height: 3)
                        .animation(.easeInOut(duration: 0.25), value: quizManager.progress)
                }
                .clipShape(Capsule())
            }
            .frame(height: 3)
        }
        .padding(.horizontal)
        .padding(.top, 8)
        .padding(.bottom, 16)
    }
}

// MARK: - Rapid Fire Question View (2x2 Grid)

struct RapidFireQuestionView: View {
    let question: QuizQuestion
    let onAnswer: (String) -> Void

    @State private var selectedAnswer: String? = nil

    private let columns = [
        GridItem(.flexible(), spacing: 12),
        GridItem(.flexible(), spacing: 12)
    ]

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            // Question Text - Short and punchy
            Text(question.text)
                .font(.quizQuestion)
                .foregroundStyle(.ivory)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 24)

            Spacer()

            // 2x2 Answer Grid
            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(question.answers) { answer in
                    RapidFireAnswerCard(
                        answer: answer,
                        isSelected: selectedAnswer == answer.id
                    ) {
                        selectedAnswer = answer.id
                        // Immediate progression - no delay
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                            onAnswer(answer.id)
                        }
                    }
                }
            }
            .padding(.horizontal, 20)

            Spacer()
            Spacer()
        }
    }
}

// MARK: - Rapid Fire Answer Card

struct RapidFireAnswerCard: View {
    let answer: QuizAnswer
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 10) {
                // SF Symbol Icon
                if let iconName = answer.iconName {
                    Image(systemName: iconName)
                        .font(.system(size: 28, weight: .medium))
                        .foregroundStyle(isSelected ? .white : .spirit)
                }

                // Short Answer Text
                Text(answer.text)
                    .font(.quizAnswer)
                    .foregroundStyle(isSelected ? .white : .textPrimary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
                    .minimumScaleFactor(0.8)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 100)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(isSelected ? Color.spirit : Color.cardBackground)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .strokeBorder(
                        isSelected ? Color.spirit : Color.white.opacity(0.08),
                        lineWidth: 1
                    )
            )
            .scaleEffect(isSelected ? 0.97 : 1.0)
        }
        .buttonStyle(ScaleFadeButtonStyle())
        .animation(.spring(duration: 0.2), value: isSelected)
    }
}

// MARK: - Legacy Quiz Question View (kept for backwards compatibility)

struct QuizQuestionView: View {
    let question: QuizQuestion
    let onAnswer: (String) -> Void

    @State private var selectedAnswer: String? = nil

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 28) {
                // Question Text
                VStack(spacing: 10) {
                    Text(question.text)
                        .font(.flowSubheading)
                        .foregroundStyle(.ivory)
                        .multilineTextAlignment(.center)

                    if let subtitle = question.subtitle {
                        Text(subtitle)
                            .font(.whisper)
                            .foregroundStyle(.textWhisper)
                    }
                }
                .padding(.top, 32)

                // Answer Options
                VStack(spacing: 12) {
                    ForEach(question.answers) { answer in
                        AnswerButton(
                            answer: answer,
                            isSelected: selectedAnswer == answer.id
                        ) {
                            selectedAnswer = answer.id
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                onAnswer(answer.id)
                            }
                        }
                    }
                }
                .padding(.horizontal)

                Spacer(minLength: 40)
            }
        }
    }
}

// MARK: - Answer Button (Legacy list-style)

struct AnswerButton: View {
    let answer: QuizAnswer
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                if let iconName = answer.iconName {
                    Image(systemName: iconName)
                        .font(.title2)
                        .foregroundStyle(.spirit)
                }

                Text(answer.text)
                    .font(.flowBody)
                    .foregroundStyle(isSelected ? .white : .textPrimary)
                    .multilineTextAlignment(.leading)

                Spacer()

                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(.white)
                }
            }
            .padding(16)
            .frame(maxWidth: .infinity)
            .background(isSelected ? Color.spirit : Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .strokeBorder(
                        isSelected ? Color.spirit : Color.white.opacity(0.08),
                        lineWidth: 1
                    )
            )
        }
        .buttonStyle(ScaleFadeButtonStyle())
        .animation(.easeInOut(duration: 0.2), value: isSelected)
    }
}

// MARK: - Preview

#Preview("Welcome") {
    WelcomeView(onStart: {}, onSkip: {})
}

#Preview("Quiz") {
    OnboardingContainerView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
