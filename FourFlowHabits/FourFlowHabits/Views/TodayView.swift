//
//  TodayView.swift
//  FourFlowHabits
//
//  Main daily habits checklist view
//

import SwiftUI
import SwiftData

struct TodayView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<Habit> { $0.isActive }, sort: \Habit.sortOrder)
    private var habits: [Habit]

    @State private var showingAddHabit = false
    @State private var selectedPillar: Pillar = .spirit

    private var completedCount: Int {
        habits.filter { $0.isCompletedToday }.count
    }

    private var totalCount: Int {
        habits.count
    }

    private var completionPercentage: Double {
        guard totalCount > 0 else { return 0 }
        return Double(completedCount) / Double(totalCount)
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        // Daily Progress Ring
                        DailyProgressRing(
                            completed: completedCount,
                            total: totalCount,
                            percentage: completionPercentage
                        )
                        .padding(.top, 8)

                        // Habits by Pillar
                        ForEach(Pillar.allCases) { pillar in
                            let pillarHabits = habits.filter { $0.pillar == pillar }
                            if !pillarHabits.isEmpty {
                                PillarSection(
                                    pillar: pillar,
                                    habits: pillarHabits,
                                    onToggle: toggleHabit
                                )
                            }
                        }

                        // Empty state
                        if habits.isEmpty {
                            EmptyHabitsView(onAddTapped: { showingAddHabit = true })
                        }

                        Spacer(minLength: 80)
                    }
                    .padding(.horizontal, 20)
                }
            }
            .navigationTitle(formattedDate)
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showingAddHabit = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.title2)
                            .foregroundStyle(.ivory)
                    }
                }
            }
            .sheet(isPresented: $showingAddHabit) {
                AddHabitView(selectedPillar: selectedPillar)
            }
        }
        .preferredColorScheme(.dark)
    }

    private var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE, MMM d"
        return formatter.string(from: Date())
    }

    private func toggleHabit(_ habit: Habit) {
        if habit.isCompletedToday {
            // Remove today's completion
            let calendar = Calendar.current
            if let completion = habit.completions.first(where: { calendar.isDate($0.date, inSameDayAs: Date()) }) {
                modelContext.delete(completion)
                Haptics.soft()
            }
        } else {
            // Add completion
            let completion = HabitCompletion(habit: habit)
            modelContext.insert(completion)
            Haptics.success()
        }
    }
}

// MARK: - Daily Progress Ring

struct DailyProgressRing: View {
    let completed: Int
    let total: Int
    let percentage: Double

    @State private var animatedPercentage: Double = 0

    var body: some View {
        VStack(spacing: 12) {
            ZStack {
                // Background ring
                Circle()
                    .stroke(Color.cardBackground, lineWidth: 12)

                // Progress ring
                Circle()
                    .trim(from: 0, to: animatedPercentage)
                    .stroke(
                        progressGradient,
                        style: StrokeStyle(lineWidth: 12, lineCap: .round)
                    )
                    .rotationEffect(.degrees(-90))
                    .animation(.spring(duration: 0.6), value: animatedPercentage)

                // Center content
                VStack(spacing: 4) {
                    Text("\(completed)/\(total)")
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                        .foregroundStyle(.ivory)

                    Text("completed")
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                }
            }
            .frame(width: 120, height: 120)

            if percentage >= 1.0 {
                Label("All done!", systemImage: "sparkles")
                    .font(.subheadline.weight(.medium))
                    .foregroundStyle(.amber)
            }
        }
        .onAppear {
            animatedPercentage = percentage
        }
        .onChange(of: percentage) { _, newValue in
            animatedPercentage = newValue
        }
    }

    private var progressGradient: AngularGradient {
        AngularGradient(
            colors: [.spirit, .story, .space, .selfPillar, .spirit],
            center: .center,
            startAngle: .degrees(0),
            endAngle: .degrees(360)
        )
    }
}

// MARK: - Pillar Section

struct PillarSection: View {
    let pillar: Pillar
    let habits: [Habit]
    let onToggle: (Habit) -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack(spacing: 8) {
                Image(systemName: pillar.iconName)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(pillar.color)

                Text(pillar.displayName.uppercased())
                    .font(.caption.weight(.bold))
                    .foregroundStyle(pillar.color)
                    .tracking(1.2)

                Spacer()

                Text(pillar.tagline)
                    .font(.caption2)
                    .foregroundStyle(.textSecondary)
            }
            .padding(.horizontal, 4)

            // Habits
            VStack(spacing: 8) {
                ForEach(habits) { habit in
                    HabitRow(habit: habit, onToggle: { onToggle(habit) })
                }
            }
        }
    }
}

// MARK: - Habit Row

struct HabitRow: View {
    let habit: Habit
    let onToggle: () -> Void

    @State private var isPressed = false

    var body: some View {
        Button(action: onToggle) {
            HStack(spacing: 14) {
                // Checkbox
                ZStack {
                    Circle()
                        .stroke(habit.pillar.color.opacity(0.4), lineWidth: 2)
                        .frame(width: 28, height: 28)

                    if habit.isCompletedToday {
                        Circle()
                            .fill(habit.pillar.color)
                            .frame(width: 28, height: 28)

                        Image(systemName: "checkmark")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundStyle(.white)
                    }
                }
                .scaleEffect(isPressed ? 0.9 : 1.0)
                .animation(.spring(duration: 0.2), value: isPressed)

                // Emoji
                Text(habit.emoji)
                    .font(.title3)

                // Name
                Text(habit.name)
                    .font(.body)
                    .foregroundStyle(habit.isCompletedToday ? .textSecondary : .textPrimary)
                    .strikethrough(habit.isCompletedToday, color: .textSecondary)

                Spacer()

                // Streak badge
                if habit.currentStreak > 0 {
                    HStack(spacing: 4) {
                        Image(systemName: "flame.fill")
                            .font(.caption2)
                        Text("\(habit.currentStreak)")
                            .font(.caption.weight(.semibold))
                    }
                    .foregroundStyle(.amber)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.amber.opacity(0.15))
                    .clipShape(Capsule())
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(HabitButtonStyle())
    }
}

struct HabitButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.spring(duration: 0.15), value: configuration.isPressed)
    }
}

// MARK: - Empty State

struct EmptyHabitsView: View {
    let onAddTapped: () -> Void

    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "leaf.fill")
                .font(.system(size: 48))
                .foregroundStyle(.space)

            Text("Start Your Journey")
                .font(.title2.weight(.semibold))
                .foregroundStyle(.textPrimary)

            Text("Add habits across all four pillars\nto build your daily flow.")
                .font(.subheadline)
                .foregroundStyle(.textSecondary)
                .multilineTextAlignment(.center)

            Button(action: onAddTapped) {
                Label("Add Your First Habit", systemImage: "plus.circle.fill")
                    .font(.headline)
                    .foregroundStyle(.charcoal)
                    .padding(.horizontal, 24)
                    .padding(.vertical, 12)
                    .background(Color.ivory)
                    .clipShape(Capsule())
            }
            .padding(.top, 8)
        }
        .padding(40)
    }
}

#Preview {
    TodayView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
