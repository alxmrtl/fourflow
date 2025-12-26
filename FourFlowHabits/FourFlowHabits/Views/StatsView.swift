//
//  StatsView.swift
//  FourFlowHabits
//
//  Progress and statistics view
//

import SwiftUI
import SwiftData

struct StatsView: View {
    @Query(filter: #Predicate<Habit> { $0.isActive })
    private var habits: [Habit]

    private var totalStreakDays: Int {
        habits.map(\.currentStreak).max() ?? 0
    }

    private var weeklyCompletions: Int {
        habits.reduce(0) { $0 + $1.completionsThisWeek() }
    }

    private var totalCompletions: Int {
        habits.reduce(0) { $0 + $1.completions.count }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        // Weekly Overview
                        WeeklyOverviewCard(habits: habits)

                        // Stats Grid
                        StatsGrid(
                            totalStreak: totalStreakDays,
                            weeklyCompletions: weeklyCompletions,
                            totalCompletions: totalCompletions,
                            habitCount: habits.count
                        )

                        // Habit Streaks
                        if !habits.isEmpty {
                            HabitStreaksCard(habits: habits)
                        }

                        // Pillar Balance
                        PillarBalanceCard(habits: habits)

                        Spacer(minLength: 80)
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 8)
                }
            }
            .navigationTitle("Progress")
            .navigationBarTitleDisplayMode(.large)
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Weekly Overview Card

struct WeeklyOverviewCard: View {
    let habits: [Habit]

    private var weekDays: [Date] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        return (0..<7).compactMap { calendar.date(byAdding: .day, value: -6 + $0, to: today) }
    }

    private func completionsFor(_ date: Date) -> Int {
        habits.filter { $0.isCompletedOn(date) }.count
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("THIS WEEK")
                .font(.caption.weight(.bold))
                .foregroundStyle(.textSecondary)
                .tracking(1)

            HStack(spacing: 8) {
                ForEach(weekDays, id: \.self) { date in
                    WeekDayColumn(
                        date: date,
                        completions: completionsFor(date),
                        total: habits.count,
                        isToday: Calendar.current.isDateInToday(date)
                    )
                }
            }
        }
        .padding(20)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}

struct WeekDayColumn: View {
    let date: Date
    let completions: Int
    let total: Int
    let isToday: Bool

    private var percentage: CGFloat {
        guard total > 0 else { return 0 }
        return CGFloat(completions) / CGFloat(total)
    }

    private var dayLetter: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEEE"
        return formatter.string(from: date)
    }

    var body: some View {
        VStack(spacing: 8) {
            // Bar
            ZStack(alignment: .bottom) {
                RoundedRectangle(cornerRadius: 4)
                    .fill(Color.background)
                    .frame(height: 60)

                RoundedRectangle(cornerRadius: 4)
                    .fill(barGradient)
                    .frame(height: 60 * percentage)
            }
            .frame(maxWidth: .infinity)

            // Day
            Text(dayLetter)
                .font(.caption2.weight(isToday ? .bold : .regular))
                .foregroundStyle(isToday ? .ivory : .textSecondary)
        }
    }

    private var barGradient: LinearGradient {
        LinearGradient(
            colors: [.spirit, .story, .space, .selfPillar],
            startPoint: .bottom,
            endPoint: .top
        )
    }
}

// MARK: - Stats Grid

struct StatsGrid: View {
    let totalStreak: Int
    let weeklyCompletions: Int
    let totalCompletions: Int
    let habitCount: Int

    var body: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
            StatCard(
                title: "Best Streak",
                value: "\(totalStreak)",
                unit: "days",
                icon: "flame.fill",
                color: .amber
            )

            StatCard(
                title: "This Week",
                value: "\(weeklyCompletions)",
                unit: "completed",
                icon: "calendar",
                color: .story
            )

            StatCard(
                title: "Total",
                value: "\(totalCompletions)",
                unit: "all time",
                icon: "checkmark.circle.fill",
                color: .space
            )

            StatCard(
                title: "Habits",
                value: "\(habitCount)",
                unit: "active",
                icon: "leaf.fill",
                color: .spirit
            )
        }
    }
}

struct StatCard: View {
    let title: String
    let value: String
    let unit: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(color)

            VStack(alignment: .leading, spacing: 2) {
                Text(value)
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                    .foregroundStyle(.textPrimary)

                Text(unit)
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }

            Text(title)
                .font(.caption.weight(.medium))
                .foregroundStyle(.textSecondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Habit Streaks Card

struct HabitStreaksCard: View {
    let habits: [Habit]

    private var sortedHabits: [Habit] {
        habits.sorted { $0.currentStreak > $1.currentStreak }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("HABIT STREAKS")
                .font(.caption.weight(.bold))
                .foregroundStyle(.textSecondary)
                .tracking(1)

            VStack(spacing: 12) {
                ForEach(sortedHabits.prefix(5)) { habit in
                    HStack(spacing: 12) {
                        Text(habit.emoji)
                            .font(.title3)

                        Text(habit.name)
                            .font(.subheadline)
                            .foregroundStyle(.textPrimary)
                            .lineLimit(1)

                        Spacer()

                        HStack(spacing: 4) {
                            Image(systemName: "flame.fill")
                                .font(.caption)
                            Text("\(habit.currentStreak)")
                                .font(.subheadline.weight(.semibold))
                        }
                        .foregroundStyle(habit.currentStreak > 0 ? .amber : .textSecondary)
                    }
                }
            }
        }
        .padding(20)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}

// MARK: - Pillar Balance Card

struct PillarBalanceCard: View {
    let habits: [Habit]

    private func habitsFor(_ pillar: Pillar) -> Int {
        habits.filter { $0.pillar == pillar }.count
    }

    private func completionsFor(_ pillar: Pillar) -> Int {
        habits.filter { $0.pillar == pillar }.reduce(0) { $0 + $1.completionsThisWeek() }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("PILLAR BALANCE")
                .font(.caption.weight(.bold))
                .foregroundStyle(.textSecondary)
                .tracking(1)

            HStack(spacing: 12) {
                ForEach(Pillar.allCases) { pillar in
                    VStack(spacing: 8) {
                        Image(systemName: pillar.iconName)
                            .font(.title2)
                            .foregroundStyle(pillar.color)

                        Text("\(habitsFor(pillar))")
                            .font(.headline)
                            .foregroundStyle(.textPrimary)

                        Text(pillar.displayName)
                            .font(.caption2)
                            .foregroundStyle(.textSecondary)
                    }
                    .frame(maxWidth: .infinity)
                }
            }
        }
        .padding(20)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}

#Preview {
    StatsView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
