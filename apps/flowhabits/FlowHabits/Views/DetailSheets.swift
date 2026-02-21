//
//  DetailSheets.swift
//  FlowHabits
//
//  Portals into deeper understanding - where dimensions reveal themselves
//

import SwiftUI

// MARK: - Pillar Detail Sheet

struct PillarDetailSheet: View {
    let pillar: Pillar
    let habits: [Habit]

    @Environment(\.dismiss) private var dismiss
    @State private var iconBreathScale: CGFloat = 1.0

    private var pillarHabits: [Habit] {
        habits.filter { $0.pillar == pillar }
    }

    private var completedToday: Int {
        pillarHabits.filter { $0.isCompletedToday }.count
    }

    private var totalReps: Int {
        pillarHabits.reduce(0) { $0 + $1.completions.count }
    }

    private var pillarQuestion: String {
        switch pillar {
        case .self_: return "What am I doing now?"
        case .space: return "What supports my flow?"
        case .story: return "What am I building toward?"
        case .spirit: return "What drives me underneath?"
        }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void
                Color.canvas.ignoresSafeArea()

                // Pillar glow emanating from icon
                VStack {
                    RadialGradient(
                        colors: [pillar.color.opacity(0.15), Color.clear],
                        center: .top,
                        startRadius: 0,
                        endRadius: 250
                    )
                    .frame(height: 300)
                    Spacer()
                }
                .ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 28) {
                        // Header with breathing icon
                        VStack(spacing: 16) {
                            ZStack {
                                // Outer glow ring
                                Circle()
                                    .fill(pillar.color.opacity(0.1))
                                    .frame(width: 100, height: 100)
                                    .scaleEffect(iconBreathScale * 1.1)

                                Circle()
                                    .fill(pillar.color.opacity(0.15))
                                    .frame(width: 85, height: 85)

                                Image(systemName: pillar.iconName)
                                    .font(.system(size: 36, weight: .medium))
                                    .foregroundStyle(pillar.color)
                                    .scaleEffect(iconBreathScale)
                            }

                            VStack(spacing: 6) {
                                Text(pillar.displayName)
                                    .font(.system(size: 28, weight: .bold, design: .rounded))
                                    .foregroundStyle(.ivory)

                                Text(pillarQuestion)
                                    .font(.system(size: 15, weight: .medium))
                                    .foregroundStyle(pillar.color)
                                    .italic()
                            }
                        }
                        .padding(.top, 24)

                        // Description - poetic
                        Text(pillar.description)
                            .font(.system(size: 16))
                            .foregroundStyle(.textSecondary)
                            .multilineTextAlignment(.center)
                            .lineSpacing(4)
                            .padding(.horizontal, 28)

                        // Content sections
                        VStack(spacing: 14) {
                            FlowDetailSection(title: "Encompasses", pillar: pillar) {
                                Text(pillar.encompasses)
                                    .font(.system(size: 15))
                                    .foregroundStyle(.textSecondary)
                            }

                            // Your practices in this pillar
                            if !pillarHabits.isEmpty {
                                FlowDetailSection(title: "Your \(pillar.displayName) Practices", pillar: pillar) {
                                    VStack(spacing: 10) {
                                        ForEach(pillarHabits) { habit in
                                            HStack(spacing: 12) {
                                                HabitIcon(habit: habit, size: 18)

                                                Text(habit.name)
                                                    .font(.system(size: 15, weight: .medium))
                                                    .foregroundStyle(.textPrimary)

                                                Spacer()

                                                if habit.currentStreak > 0 {
                                                    HStack(spacing: 3) {
                                                        Image(systemName: "flame.fill")
                                                            .font(.system(size: 11))
                                                        Text("\(habit.currentStreak)")
                                                            .font(.system(size: 13, weight: .bold, design: .rounded))
                                                    }
                                                    .foregroundStyle(.amber)
                                                }

                                                Image(systemName: habit.isCompletedToday ? "checkmark.circle.fill" : "circle")
                                                    .font(.system(size: 18))
                                                    .foregroundStyle(habit.isCompletedToday ? pillar.color : .textWhisper)
                                            }
                                            .padding(.vertical, 4)
                                        }
                                    }
                                }

                                // Stats row
                                HStack(spacing: 14) {
                                    PillarStatBox(
                                        value: "\(completedToday)/\(pillarHabits.count)",
                                        label: "Today",
                                        color: pillar.color
                                    )
                                    PillarStatBox(
                                        value: "\(totalReps)",
                                        label: "Reps",
                                        color: pillar.color
                                    )
                                }
                            } else {
                                FlowDetailSection(title: "Begin Here", pillar: pillar) {
                                    VStack(alignment: .leading, spacing: 10) {
                                        Text("Suggested practices:")
                                            .font(.system(size: 13))
                                            .foregroundStyle(.textWhisper)

                                        ForEach(pillar.suggestedHabits.prefix(5), id: \.self) { suggestion in
                                            HStack(spacing: 10) {
                                                Circle()
                                                    .fill(pillar.color.opacity(0.6))
                                                    .frame(width: 5, height: 5)
                                                Text(suggestion)
                                                    .font(.system(size: 15))
                                                    .foregroundStyle(.textPrimary)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .padding(.horizontal, 16)

                        Spacer(minLength: 40)
                    }
                }
            }
            .navigationTitle(pillar.displayName)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(.system(size: 16, weight: .medium))
                        .foregroundStyle(.ivory)
                }
            }
            .onAppear {
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    iconBreathScale = 1.03
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Metric Detail Sheet

struct MetricDetailSheet: View {
    let title: String
    let value: String
    let description: String
    let breakdown: [(label: String, value: String)]?
    let color: Color

    @Environment(\.dismiss) private var dismiss
    @State private var valueScale: CGFloat = 0.8
    @State private var valueOpacity: Double = 0

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void
                Color.canvas.ignoresSafeArea()

                // Color glow from center
                RadialGradient(
                    colors: [color.opacity(0.12), Color.clear],
                    center: .center,
                    startRadius: 0,
                    endRadius: 200
                )
                .offset(y: -50)

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 28) {
                        // Value display - animated entrance
                        VStack(spacing: 10) {
                            Text(value)
                                .font(.system(size: 64, weight: .bold, design: .rounded))
                                .foregroundStyle(color)
                                .scaleEffect(valueScale)
                                .opacity(valueOpacity)

                            Text(title)
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(.textSecondary)
                        }
                        .padding(.top, 32)

                        // Description
                        Text(description)
                            .font(.system(size: 15))
                            .foregroundStyle(.textSecondary)
                            .multilineTextAlignment(.center)
                            .lineSpacing(4)
                            .padding(.horizontal, 28)

                        // Breakdown if provided
                        if let breakdown = breakdown, !breakdown.isEmpty {
                            VStack(spacing: 12) {
                                ForEach(breakdown, id: \.label) { item in
                                    HStack {
                                        Text(item.label)
                                            .font(.system(size: 15))
                                            .foregroundStyle(.textSecondary)
                                        Spacer()
                                        Text(item.value)
                                            .font(.system(size: 15, weight: .semibold, design: .rounded))
                                            .foregroundStyle(.textPrimary)
                                    }
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 12)
                                    .background(Color.cardBackground)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                                }
                            }
                            .padding(.horizontal, 16)
                        }

                        Spacer(minLength: 40)
                    }
                }
            }
            .navigationTitle(title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(.system(size: 16, weight: .medium))
                        .foregroundStyle(.ivory)
                }
            }
            .onAppear {
                withAnimation(.spring(duration: 0.5)) {
                    valueScale = 1.0
                    valueOpacity = 1.0
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Achievement Detail Sheet

struct AchievementDetailSheet: View {
    let icon: String
    let title: String
    let description: String
    let unlocked: Bool
    let progress: String?
    let color: Color

    @Environment(\.dismiss) private var dismiss
    @State private var badgeScale: CGFloat = 0.5
    @State private var badgeOpacity: Double = 0
    @State private var ringScale: CGFloat = 0.8

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void
                Color.canvas.ignoresSafeArea()

                // Achievement glow
                if unlocked {
                    RadialGradient(
                        colors: [color.opacity(0.15), Color.clear],
                        center: .center,
                        startRadius: 0,
                        endRadius: 180
                    )
                }

                VStack(spacing: 28) {
                    Spacer()

                    // Badge with entrance animation
                    ZStack {
                        // Expanding celebration ring (unlocked only)
                        if unlocked {
                            Circle()
                                .stroke(color.opacity(0.2), lineWidth: 2)
                                .frame(width: 140, height: 140)
                                .scaleEffect(ringScale)
                        }

                        Circle()
                            .fill(unlocked ? color.opacity(0.15) : Color.surface)
                            .frame(width: 120, height: 120)

                        Image(systemName: icon)
                            .font(.system(size: 48, weight: .medium))
                            .foregroundStyle(unlocked ? color : .textWhisper)
                    }
                    .scaleEffect(badgeScale)
                    .opacity(badgeOpacity)

                    // Title
                    Text(title)
                        .font(.system(size: 24, weight: .bold, design: .rounded))
                        .foregroundStyle(unlocked ? .ivory : .textSecondary)

                    // Description
                    Text(description)
                        .font(.system(size: 15))
                        .foregroundStyle(.textSecondary)
                        .multilineTextAlignment(.center)
                        .lineSpacing(4)
                        .padding(.horizontal, 32)

                    // Progress or unlocked status
                    if unlocked {
                        HStack(spacing: 8) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 16))
                            Text("Achieved")
                                .font(.system(size: 15, weight: .semibold))
                        }
                        .foregroundStyle(.space)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 10)
                        .background(Color.space.opacity(0.12))
                        .clipShape(Capsule())
                    } else if let progress = progress {
                        Text(progress)
                            .font(.system(size: 14, weight: .medium))
                            .foregroundStyle(.textSecondary)
                            .padding(.horizontal, 18)
                            .padding(.vertical, 10)
                            .background(Color.cardBackground)
                            .clipShape(Capsule())
                            .overlay(
                                Capsule()
                                    .stroke(Color.white.opacity(0.08), lineWidth: 1)
                            )
                    }

                    Spacer()
                    Spacer()
                }
            }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(.system(size: 16, weight: .medium))
                        .foregroundStyle(.ivory)
                }
            }
            .onAppear {
                withAnimation(.spring(duration: 0.5)) {
                    badgeScale = 1.0
                    badgeOpacity = 1.0
                }
                if unlocked {
                    withAnimation(.easeOut(duration: 1.0).delay(0.2)) {
                        ringScale = 1.3
                    }
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Streak Detail Sheet

struct StreakDetailSheet: View {
    let habit: Habit

    @Environment(\.dismiss) private var dismiss
    @State private var flameScale: CGFloat = 0.8
    @State private var flameOpacity: Double = 0
    @State private var flamePulse: CGFloat = 1.0

    private var streakIntensity: Double {
        min(1.0, Double(habit.currentStreak) / 30.0)
    }

    private var streakMessage: String {
        switch habit.currentStreak {
        case 0: return "Begin again. Each day is new."
        case 1: return "The journey of a thousand days begins with one."
        case 2...6: return "Momentum is building."
        case 7...13: return "One week of presence."
        case 14...20: return "Two weeks. A rhythm forms."
        case 21...29: return "A habit is taking root."
        case 30...59: return "One month of dedication."
        case 60...89: return "Two months. Transformation underway."
        case 90...364: return "A quarter year of practice."
        default: return "Mastery through persistence."
        }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void
                Color.canvas.ignoresSafeArea()

                // Warm amber glow
                RadialGradient(
                    colors: [Color.amber.opacity(0.12 + streakIntensity * 0.08), Color.clear],
                    center: .top,
                    startRadius: 0,
                    endRadius: 250
                )
                .offset(y: -50)

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 28) {
                        // Streak display with breathing flame
                        VStack(spacing: 12) {
                            HStack(spacing: 10) {
                                Image(systemName: "flame.fill")
                                    .font(.system(size: 44))
                                    .scaleEffect(flamePulse)
                                Text("\(habit.currentStreak)")
                                    .font(.system(size: 64, weight: .bold, design: .rounded))
                            }
                            .foregroundStyle(Color.amber.opacity(0.7 + streakIntensity * 0.3))
                            .scaleEffect(flameScale)
                            .opacity(flameOpacity)

                            Text("Day Streak")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(.textSecondary)

                            Text(streakMessage)
                                .font(.system(size: 14))
                                .foregroundStyle(.textWhisper)
                                .italic()
                        }
                        .padding(.top, 28)

                        // Habit info card
                        HStack(spacing: 14) {
                            HabitIcon(habit: habit, size: 28)

                            VStack(alignment: .leading, spacing: 4) {
                                Text(habit.name)
                                    .font(.system(size: 17, weight: .semibold))
                                    .foregroundStyle(.textPrimary)

                                Text(habit.pillar.displayName)
                                    .font(.system(size: 13))
                                    .foregroundStyle(habit.pillar.color)
                            }

                            Spacer()
                        }
                        .padding(16)
                        .background(Color.cardBackground)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .stroke(habit.pillar.color.opacity(0.15), lineWidth: 1)
                        )
                        .padding(.horizontal, 16)

                        // Stats and explanation
                        VStack(spacing: 14) {
                            FlowDetailSection(title: "The Practice of Returning", pillar: nil) {
                                Text("A streak counts consecutive days of practice. Miss a day and return to zero. But remember: returning is the skill. Every restart is a choice to begin again.")
                                    .font(.system(size: 15))
                                    .foregroundStyle(.textSecondary)
                                    .lineSpacing(4)
                            }

                            HStack(spacing: 14) {
                                VStack(spacing: 6) {
                                    Text("\(habit.longestStreak)")
                                        .font(.system(size: 28, weight: .bold, design: .rounded))
                                        .foregroundStyle(.amber)
                                    Text("Best")
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundStyle(.textWhisper)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 16)
                                .background(Color.cardBackground)
                                .clipShape(RoundedRectangle(cornerRadius: 12))

                                VStack(spacing: 6) {
                                    Text("\(habit.completions.count)")
                                        .font(.system(size: 28, weight: .bold, design: .rounded))
                                        .foregroundStyle(.spirit)
                                    Text("Total Reps")
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundStyle(.textWhisper)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 16)
                                .background(Color.cardBackground)
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                            }
                        }
                        .padding(.horizontal, 16)

                        Spacer(minLength: 40)
                    }
                }
            }
            .navigationTitle("Streak")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(.system(size: 16, weight: .medium))
                        .foregroundStyle(.ivory)
                }
            }
            .onAppear {
                withAnimation(.spring(duration: 0.5)) {
                    flameScale = 1.0
                    flameOpacity = 1.0
                }
                // Flame breathing
                withAnimation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true)) {
                    flamePulse = 1.05
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Helper Components

/// Flow-styled detail section with optional pillar accent
struct FlowDetailSection<Content: View>: View {
    let title: String
    var pillar: Pillar? = nil
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title.uppercased())
                .font(.system(size: 10, weight: .bold))
                .foregroundStyle(.textWhisper)
                .tracking(1.2)

            content
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(
                    pillar?.color.opacity(0.12) ?? Color.white.opacity(0.06),
                    lineWidth: 1
                )
        )
    }
}

/// Legacy section style - redirects to FlowDetailSection
struct BasicDetailSection<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    var body: some View {
        FlowDetailSection(title: title, pillar: nil, content: { content })
    }
}

struct PillarStatBox: View {
    let value: String
    let label: String
    var color: Color = .ivory

    var body: some View {
        VStack(spacing: 6) {
            Text(value)
                .font(.system(size: 24, weight: .bold, design: .rounded))
                .foregroundStyle(color)

            Text(label)
                .font(.system(size: 11, weight: .medium))
                .foregroundStyle(.textWhisper)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(color.opacity(0.1), lineWidth: 1)
        )
    }
}

// MARK: - Active Habit Detail Sheet

/// Shows details for an active habit from TodayView
/// Uses template info if available, otherwise shows basic custom habit info
struct ActiveHabitDetailSheet: View {
    let habit: Habit
    let onRemove: () -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var showingRemoveConfirmation = false

    // Look up the template if this habit was created from one
    private var template: FlowHabitTemplate? {
        guard let templateId = habit.templateId else { return nil }
        return CatalogService.shared.habit(withId: templateId)
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Single unified card containing all content
                VStack(spacing: 0) {
                    // Header: Icon + Name + Pillar
                    headerSection

                    // Compact stats row
                    compactStatsSection

                    // Content divider
                    sectionDivider

                    // Template or custom content
                    if let template = template {
                        templateContent(template)
                    } else {
                        customContent
                    }
                }
                .background(Color.cardBackground)
                .clipShape(RoundedRectangle(cornerRadius: 16))
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(habit.pillar.color.opacity(0.15), lineWidth: 1)
                )
                .padding(.horizontal, 16)
                .padding(.top, 8)

                Spacer(minLength: 0)
            }
            .background(Color.canvas)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .foregroundStyle(.spirit)
                }
            }
            .safeAreaInset(edge: .bottom) {
                removeButton
            }
        }
        .presentationDragIndicator(.visible)
        .preferredColorScheme(.dark)
    }

    // MARK: - Header Section (Compact)

    private var headerSection: some View {
        VStack(spacing: 10) {
            // Icon - reduced size
            HabitIcon(habit: habit, size: 32)
                .frame(width: 56, height: 56)
                .background(habit.pillar.color.opacity(0.15))
                .clipShape(RoundedRectangle(cornerRadius: 14))

            // Name
            Text(habit.name)
                .font(.system(size: 20, weight: .bold))
                .foregroundStyle(.textPrimary)
                .multilineTextAlignment(.center)
                .lineLimit(2)

            // Pillar + Streak inline
            HStack(spacing: 12) {
                // Pillar badge
                HStack(spacing: 4) {
                    Image(systemName: habit.pillar.iconName)
                        .font(.system(size: 10, weight: .semibold))
                    Text(habit.pillar.displayName)
                        .font(.system(size: 11, weight: .semibold))
                }
                .foregroundStyle(habit.pillar.color)
                .padding(.horizontal, 10)
                .padding(.vertical, 5)
                .background(habit.pillar.color.opacity(0.15))
                .clipShape(Capsule())

                // Current streak badge (if active)
                if habit.currentStreak > 0 {
                    HStack(spacing: 3) {
                        Image(systemName: "flame.fill")
                            .font(.system(size: 10))
                        Text("\(habit.currentStreak) day streak")
                            .font(.system(size: 11, weight: .semibold))
                    }
                    .foregroundStyle(.amber)
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.top, 20)
        .padding(.bottom, 14)
    }

    // MARK: - Compact Stats Section

    private var compactStatsSection: some View {
        HStack(spacing: 0) {
            compactStat(value: "\(habit.currentStreak)", label: "Streak", color: .amber)

            Rectangle()
                .fill(Color.white.opacity(0.06))
                .frame(width: 1, height: 32)

            compactStat(value: "\(habit.longestStreak)", label: "Best", color: habit.pillar.color)

            Rectangle()
                .fill(Color.white.opacity(0.06))
                .frame(width: 1, height: 32)

            compactStat(value: "\(habit.completions.count)", label: "Reps", color: .ivory)
        }
        .padding(.vertical, 12)
        .background(Color.surface)
    }

    private func compactStat(value: String, label: String, color: Color) -> some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: 20, weight: .bold, design: .rounded))
                .foregroundStyle(color)
            Text(label)
                .font(.system(size: 10, weight: .medium))
                .foregroundStyle(.textWhisper)
        }
        .frame(maxWidth: .infinity)
    }

    private var sectionDivider: some View {
        Rectangle()
            .fill(Color.white.opacity(0.06))
            .frame(height: 1)
    }

    // MARK: - Template Content (Unified)

    private func templateContent(_ template: FlowHabitTemplate) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            // Flow Benefit
            VStack(alignment: .leading, spacing: 6) {
                Text("WHY THIS HELPS")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(.textWhisper)
                    .tracking(0.8)

                Text(template.flowBenefit)
                    .font(.system(size: 14))
                    .foregroundStyle(.textSecondary)
                    .lineSpacing(2)
            }
            .padding(.horizontal, 16)
            .padding(.top, 14)
            .padding(.bottom, 12)

            sectionDivider
                .padding(.horizontal, 16)

            // How to Practice
            VStack(alignment: .leading, spacing: 6) {
                Text("HOW TO PRACTICE")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(.textWhisper)
                    .tracking(0.8)

                Text(template.fullDescription)
                    .font(.system(size: 14))
                    .foregroundStyle(.textSecondary)
                    .lineSpacing(2)
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)
            .padding(.bottom, 12)

            // Qualities - inline tags
            if !template.qualitiesImproved.isEmpty {
                sectionDivider
                    .padding(.horizontal, 16)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 6) {
                        ForEach(template.qualitiesImproved, id: \.self) { quality in
                            Text(quality)
                                .font(.system(size: 11, weight: .medium))
                                .foregroundStyle(habit.pillar.color)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 5)
                                .background(habit.pillar.color.opacity(0.12))
                                .clipShape(Capsule())
                        }
                    }
                    .padding(.horizontal, 16)
                }
                .padding(.vertical, 12)
            }
        }
    }

    // MARK: - Custom Habit Content

    private var customContent: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("YOUR PRACTICE")
                .font(.system(size: 10, weight: .bold))
                .foregroundStyle(.textWhisper)
                .tracking(0.8)

            Text("This is a custom habit you created. Keep building your streak and make it part of your flow.")
                .font(.system(size: 14))
                .foregroundStyle(.textSecondary)
                .lineSpacing(2)
        }
        .padding(16)
    }

    // MARK: - Remove Button

    private var removeButton: some View {
        VStack(spacing: 0) {
            Button {
                showingRemoveConfirmation = true
            } label: {
                HStack(spacing: 6) {
                    Image(systemName: "minus.circle.fill")
                        .font(.system(size: 14))
                    Text("Remove from Habits")
                        .font(.system(size: 15, weight: .semibold))
                }
                .foregroundStyle(.white.opacity(0.9))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(Color.selfPillar.opacity(0.7))
                .clipShape(RoundedRectangle(cornerRadius: 12))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .confirmationDialog(
                "Remove \(habit.name)?",
                isPresented: $showingRemoveConfirmation,
                titleVisibility: .visible
            ) {
                Button("Remove", role: .destructive) {
                    onRemove()
                    dismiss()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("This will archive the habit. You can restore it later from Settings.")
            }
        }
        .background(Color.canvas)
    }
}

// MARK: - Previews

#Preview("Pillar") {
    PillarDetailSheet(pillar: .self_, habits: [])
}

#Preview("Achievement Unlocked") {
    AchievementDetailSheet(
        icon: "flame.fill",
        title: "Week Warrior",
        description: "Maintain a 7-day streak on any habit",
        unlocked: true,
        progress: nil,
        color: .amber
    )
}

#Preview("Achievement Locked") {
    AchievementDetailSheet(
        icon: "flame.circle.fill",
        title: "Month Master",
        description: "Maintain a 30-day streak on any habit",
        unlocked: false,
        progress: "12/30 days",
        color: .selfPillar
    )
}
