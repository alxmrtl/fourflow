//
//  StatsView.swift
//  FlowHabits
//
//  Rhythm and insights - where patterns reveal themselves
//

import SwiftUI
import SwiftData

struct StatsView: View {
    @Query(filter: #Predicate<Habit> { $0.isActive })
    private var habits: [Habit]

    @State private var showingAchievementSheet: AchievementInfo?
    @State private var showingStreakSheet: Habit?
    @State private var showingSectionInfo: SectionInfoType?
    @State private var flowRhythmViewMode: FlowRhythmViewMode = .grid

    enum SectionInfoType: Identifiable {
        case flowRhythm, streakLeaders
        var id: Self { self }

        var title: String {
            switch self {
            case .flowRhythm: return "Flow Rhythm"
            case .streakLeaders: return "Streak Leaders"
            }
        }

        var description: String {
            switch self {
            case .flowRhythm: return "Your practice history visualized by pillar. Each block shows your daily completions - brighter colors mean more practices done that day."
            case .streakLeaders: return "Your practices with the longest active streaks. Keep the flame burning!"
            }
        }
    }

    struct AchievementInfo: Identifiable {
        let id = UUID()
        let icon: String
        let title: String
        let description: String
        let unlocked: Bool
        let progress: String?
        let color: Color
    }

    // Simple all-time stats for achievements
    private var totalCompletions: Int {
        habits.reduce(0) { $0 + $1.completions.count }
    }

    private var bestStreak: Int {
        habits.map(\.longestStreak).max() ?? 0
    }

    private var activePillars: Int {
        Set(habits.map(\.pillar)).count
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void canvas
                Color.canvas.ignoresSafeArea()

                // Subtle Spirit glow from bottom-right
                VStack {
                    Spacer()
                    HStack {
                        Spacer()
                        RadialGradient(
                            colors: [Color.story.opacity(0.08), Color.clear],
                            center: .bottomTrailing,
                            startRadius: 0,
                            endRadius: 250
                        )
                        .frame(width: 300, height: 300)
                    }
                }
                .ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 16) {
                        // Flow Rhythm Visual
                        FlowRhythmCard(
                            habits: habits,
                            onInfoTap: { showingSectionInfo = .flowRhythm },
                            viewMode: $flowRhythmViewMode
                        )

                        // Streak Leaderboard
                        if !habits.isEmpty {
                            StreakLeaderboard(
                                habits: habits,
                                onHabitTap: { showingStreakSheet = $0 },
                                onInfoTap: { showingSectionInfo = .streakLeaders }
                            )
                        }

                        // Achievements
                        AchievementsCard(
                            totalCompletions: totalCompletions,
                            bestStreak: bestStreak,
                            activePillars: activePillars,
                            onAchievementTap: { showingAchievementSheet = $0 }
                        )

                        Spacer(minLength: 100)
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 8)
                }
            }
            .navigationTitle("Rhythm")
            .navigationBarTitleDisplayMode(.inline)
        }
        .preferredColorScheme(.dark)
        .sheet(item: $showingAchievementSheet) { achievement in
            AchievementDetailSheet(
                icon: achievement.icon,
                title: achievement.title,
                description: achievement.description,
                unlocked: achievement.unlocked,
                progress: achievement.progress,
                color: achievement.color
            )
            .presentationDetents([.medium])
        }
        .sheet(item: $showingStreakSheet) { habit in
            StreakDetailSheet(habit: habit)
                .presentationDetents([.medium])
        }
        .sheet(item: $showingSectionInfo) { info in
            SectionInfoSheet(title: info.title, description: info.description)
                .presentationDetents([.height(200)])
        }
    }
}

// MARK: - Section Info Sheet

struct SectionInfoSheet: View {
    let title: String
    let description: String

    var body: some View {
        VStack(spacing: 16) {
            Capsule()
                .fill(Color.textSecondary.opacity(0.3))
                .frame(width: 36, height: 4)
                .padding(.top, 8)

            VStack(spacing: 12) {
                Text(title)
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(.ivory)

                Text(description)
                    .font(.system(size: 15))
                    .foregroundStyle(.textSecondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 24)
            }

            Spacer()
        }
        .frame(maxWidth: .infinity)
        .background(Color.cardBackground)
    }
}

// MARK: - Rhythm Section Header with Info Button

struct RhythmSectionHeader: View {
    let title: String
    let onInfoTap: () -> Void

    var body: some View {
        HStack(spacing: 6) {
            Text(title)
                .font(.system(size: 10, weight: .bold))
                .foregroundStyle(.textWhisper)
                .tracking(1.2)

            Button(action: {
                Haptics.light()
                onInfoTap()
            }) {
                Image(systemName: "info.circle")
                    .font(.system(size: 11))
                    .foregroundStyle(.textSecondary)
            }
        }
    }
}

// MARK: - Flow Rhythm Card (Visual Only)

enum FlowRhythmViewMode: String, CaseIterable {
    case grid = "Grid"
    case stream = "Stream"
}

struct FlowRhythmCard: View {
    let habits: [Habit]
    let onInfoTap: () -> Void
    @Binding var viewMode: FlowRhythmViewMode

    var body: some View {
        VStack(spacing: 14) {
            // Header - clean, visual only
            HStack {
                RhythmSectionHeader(title: "FLOW RHYTHM", onInfoTap: onInfoTap)
                Spacer()
                FlowRhythmModePicker(selectedMode: $viewMode)
            }

            // Visual content based on mode
            if viewMode == .grid {
                FlowGridView(habits: habits)
            } else {
                FlowStreamView(habits: habits)
            }

            // Pillar legend
            HStack(spacing: 16) {
                ForEach(Pillar.displayOrder) { pillar in
                    HStack(spacing: 4) {
                        Circle()
                            .fill(pillar.color)
                            .frame(width: 6, height: 6)
                        Text(pillar.displayName)
                            .font(.system(size: 9))
                            .foregroundStyle(.textSecondary)
                    }
                }
            }
        }
        .padding(16)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
        )
    }
}

// MARK: - View Mode Picker

struct FlowRhythmModePicker: View {
    @Binding var selectedMode: FlowRhythmViewMode

    var body: some View {
        HStack(spacing: 2) {
            ForEach(FlowRhythmViewMode.allCases, id: \.self) { mode in
                Button(action: {
                    Haptics.light()
                    withAnimation(.easeInOut(duration: 0.2)) {
                        selectedMode = mode
                    }
                }) {
                    Image(systemName: mode == .grid ? "square.grid.3x3" : "chart.bar.fill")
                        .font(.system(size: 11))
                        .foregroundStyle(selectedMode == mode ? .ivory : .textSecondary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(
                            selectedMode == mode
                                ? Color.white.opacity(0.1)
                                : Color.clear
                        )
                        .clipShape(Capsule())
                }
            }
        }
        .background(Color.background.opacity(0.3))
        .clipShape(Capsule())
    }
}

// MARK: - Flow Grid View (4-Week Pillar Heatmap)

struct FlowGridView: View {
    let habits: [Habit]

    private let calendar = Calendar.current
    private let weeksToShow = 4

    private var today: Date {
        calendar.startOfDay(for: Date())
    }

    private var trackingStartDate: Date {
        let earliestCreation = habits.map { calendar.startOfDay(for: $0.createdAt) }.min()
        let earliestCompletion = habits.flatMap { $0.completions }.map { calendar.startOfDay(for: $0.date) }.min()
        let earliest = [earliestCreation, earliestCompletion].compactMap { $0 }.min()
        return earliest ?? today
    }

    private var gridDates: [[Date?]] {
        var weeks: [[Date?]] = []
        let todayWeekday = calendar.component(.weekday, from: today)
        let daysToSubtract = (weeksToShow - 1) * 7 + (todayWeekday - 1)
        guard let startDate = calendar.date(byAdding: .day, value: -daysToSubtract, to: today) else {
            return []
        }

        var currentDate = startDate
        for _ in 0..<weeksToShow {
            var week: [Date?] = []
            for _ in 0..<7 {
                if currentDate <= today && currentDate >= trackingStartDate {
                    week.append(currentDate)
                } else {
                    week.append(nil)
                }
                currentDate = calendar.date(byAdding: .day, value: 1, to: currentDate) ?? currentDate
            }
            weeks.append(week)
        }
        return weeks
    }

    private func pillarCompletions(for date: Date) -> [PillarCompletion] {
        Pillar.displayOrder.map { pillar in
            let pillarHabits = habits.filter { $0.pillar == pillar && $0.wasActiveOn(date) }
            if pillarHabits.isEmpty {
                return PillarCompletion(pillar: pillar, hasHabits: false, completionRate: 0)
            }
            let completed = pillarHabits.filter { $0.isCompletedOn(date) }.count
            return PillarCompletion(pillar: pillar, hasHabits: true, completionRate: Double(completed) / Double(pillarHabits.count))
        }
    }

    var body: some View {
        VStack(spacing: 4) {
            // Day labels
            HStack(spacing: 4) {
                ForEach(["S", "M", "T", "W", "T", "F", "S"], id: \.self) { day in
                    Text(day)
                        .font(.system(size: 8, weight: .medium))
                        .foregroundStyle(.textWhisper)
                        .frame(maxWidth: .infinity)
                }
            }

            // Grid
            ForEach(Array(gridDates.enumerated()), id: \.offset) { _, week in
                HStack(spacing: 4) {
                    ForEach(Array(week.enumerated()), id: \.offset) { _, date in
                        FlowGridCell(
                            date: date,
                            pillarCompletions: date.map { pillarCompletions(for: $0) } ?? [],
                            isToday: date.map { calendar.isDateInToday($0) } ?? false
                        )
                    }
                }
            }
        }
    }
}

struct PillarCompletion {
    let pillar: Pillar
    let hasHabits: Bool
    let completionRate: Double
}

struct FlowGridCell: View {
    let date: Date?
    let pillarCompletions: [PillarCompletion]
    let isToday: Bool

    private var hasAnyHabits: Bool {
        pillarCompletions.contains { $0.hasHabits }
    }

    private var isFullyComplete: Bool {
        let active = pillarCompletions.filter { $0.hasHabits }
        return !active.isEmpty && active.allSatisfy { $0.completionRate == 1.0 }
    }

    var body: some View {
        Group {
            if date == nil {
                RoundedRectangle(cornerRadius: 3)
                    .fill(Color.background.opacity(0.15))
                    .frame(height: 28)
            } else if !hasAnyHabits {
                RoundedRectangle(cornerRadius: 3)
                    .fill(Color.background.opacity(0.3))
                    .frame(height: 28)
            } else {
                VStack(spacing: 1) {
                    ForEach(Array(pillarCompletions.reversed().enumerated()), id: \.offset) { _, completion in
                        Rectangle()
                            .fill(segmentColor(for: completion))
                            .frame(height: 6)
                    }
                }
                .frame(height: 28)
                .clipShape(RoundedRectangle(cornerRadius: 3))
            }
        }
        .frame(maxWidth: .infinity)
        .overlay(
            RoundedRectangle(cornerRadius: 3)
                .stroke(borderColor, lineWidth: borderWidth)
        )
    }

    private func segmentColor(for completion: PillarCompletion) -> Color {
        if !completion.hasHabits {
            return Color.clear
        }
        if completion.completionRate > 0 {
            return completion.pillar.color.opacity(0.4 + completion.completionRate * 0.6)
        } else {
            return completion.pillar.color.opacity(0.12)
        }
    }

    private var borderColor: Color {
        if isToday {
            return Color.ivory.opacity(0.5)
        } else if isFullyComplete {
            return Color.amber.opacity(0.4)
        } else {
            return Color.white.opacity(0.08)
        }
    }

    private var borderWidth: CGFloat {
        isToday ? 1.5 : (isFullyComplete ? 1 : 0.5)
    }
}

// MARK: - Flow Stream View (2-Week Timeline)

struct FlowStreamView: View {
    let habits: [Habit]

    private let calendar = Calendar.current
    private let daysToShow = 14

    private var today: Date {
        calendar.startOfDay(for: Date())
    }

    private var trackingStartDate: Date {
        let earliestCreation = habits.map { calendar.startOfDay(for: $0.createdAt) }.min()
        let earliestCompletion = habits.flatMap { $0.completions }.map { calendar.startOfDay(for: $0.date) }.min()
        let earliest = [earliestCreation, earliestCompletion].compactMap { $0 }.min()
        return earliest ?? today
    }

    private var displayDates: [Date] {
        var dates: [Date] = []
        for i in 0..<daysToShow {
            if let date = calendar.date(byAdding: .day, value: -(daysToShow - 1 - i), to: today) {
                if date >= trackingStartDate {
                    dates.append(date)
                }
            }
        }
        return dates
    }

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            ScrollViewReader { proxy in
                HStack(spacing: 6) {
                    ForEach(displayDates, id: \.self) { date in
                        FlowStreamColumn(
                            date: date,
                            habits: habits,
                            isToday: calendar.isDateInToday(date)
                        )
                        .id(date)
                    }
                }
                .padding(.horizontal, 2)
                .onAppear {
                    proxy.scrollTo(today, anchor: .trailing)
                }
            }
        }
        .frame(height: min(CGFloat(habits.count) * 12 + 30, 120))
    }
}

struct FlowStreamColumn: View {
    let date: Date
    let habits: [Habit]
    let isToday: Bool

    private var dayLabel: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEE"
        return String(formatter.string(from: date).prefix(1)).uppercased()
    }

    private var dateNumber: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "d"
        return formatter.string(from: date)
    }

    private var sortedHabits: [Habit] {
        let order = Pillar.displayOrder
        return habits.sorted { habit1, habit2 in
            let index1 = order.firstIndex(of: habit1.pillar) ?? 0
            let index2 = order.firstIndex(of: habit2.pillar) ?? 0
            return index1 < index2
        }
    }

    var body: some View {
        VStack(spacing: 4) {
            // Day header
            VStack(spacing: 1) {
                Text(dayLabel)
                    .font(.system(size: 8, weight: .medium))
                    .foregroundStyle(.textWhisper)
                Text(dateNumber)
                    .font(.system(size: 10, weight: isToday ? .bold : .regular))
                    .foregroundStyle(isToday ? .ivory : .textSecondary)
            }

            // Habit blocks
            VStack(spacing: 2) {
                ForEach(sortedHabits) { habit in
                    FlowStreamBlock(habit: habit, date: date)
                }
            }
        }
        .frame(width: 28)
        .padding(.vertical, 4)
        .background(isToday ? Color.ivory.opacity(0.05) : Color.clear)
        .clipShape(RoundedRectangle(cornerRadius: 6))
        .overlay(
            Group {
                if isToday {
                    RoundedRectangle(cornerRadius: 6)
                        .stroke(Color.ivory.opacity(0.2), lineWidth: 1)
                }
            }
        )
    }
}

struct FlowStreamBlock: View {
    let habit: Habit
    let date: Date

    private var isActive: Bool {
        habit.wasActiveOn(date)
    }

    var body: some View {
        RoundedRectangle(cornerRadius: 2)
            .fill(blockColor)
            .frame(height: 8)
    }

    private var blockColor: Color {
        guard isActive else { return Color.clear }
        if habit.isCompletedOn(date) {
            return habit.pillar.color
        }
        return Color.background.opacity(0.5)
    }
}

// MARK: - Streak Leaderboard

struct StreakLeaderboard: View {
    let habits: [Habit]
    let onHabitTap: (Habit) -> Void
    let onInfoTap: () -> Void

    private var rankedHabits: [Habit] {
        habits
            .filter { $0.currentStreak > 0 }
            .sorted { $0.currentStreak > $1.currentStreak }
            .prefix(5)
            .map { $0 }
    }

    var body: some View {
        if !rankedHabits.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                RhythmSectionHeader(title: "STREAK LEADERS", onInfoTap: onInfoTap)

                VStack(spacing: 8) {
                    ForEach(Array(rankedHabits.enumerated()), id: \.element.id) { index, habit in
                        StreakRow(rank: index + 1, habit: habit, onTap: { onHabitTap(habit) })
                    }
                }
            }
            .padding(16)
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(Color.amber.opacity(0.1), lineWidth: 1)
            )
        }
    }
}

struct StreakRow: View {
    let rank: Int
    let habit: Habit
    let onTap: () -> Void

    private var rankColor: Color {
        switch rank {
        case 1: return .amber
        case 2: return .ivory.opacity(0.7)
        case 3: return .selfPillar.opacity(0.6)
        default: return .textSecondary
        }
    }

    private var streakIntensity: Double {
        min(1.0, Double(habit.currentStreak) / 30.0)
    }

    var body: some View {
        Button(action: {
            Haptics.light()
            onTap()
        }) {
            HStack(spacing: 10) {
                Text("\(rank)")
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .foregroundStyle(rankColor)
                    .frame(width: 14)

                Circle()
                    .fill(habit.pillar.color)
                    .frame(width: 6, height: 6)

                HabitIcon(habit: habit, size: 14)

                Text(habit.name)
                    .font(.system(size: 13))
                    .foregroundStyle(.textPrimary)
                    .lineLimit(1)

                Spacer()

                HStack(spacing: 3) {
                    Image(systemName: "flame.fill")
                        .font(.system(size: 10))
                    Text("\(habit.currentStreak)")
                        .font(.system(size: 13, weight: .bold, design: .rounded))
                }
                .foregroundStyle(Color.amber.opacity(0.5 + streakIntensity * 0.5))
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(Color.background.opacity(0.3))
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .buttonStyle(StreakButtonStyle())
    }
}

struct StreakButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .opacity(configuration.isPressed ? 0.8 : 1.0)
            .animation(.spring(duration: 0.15), value: configuration.isPressed)
    }
}

// MARK: - Achievements Card

struct AchievementsCard: View {
    let totalCompletions: Int
    let bestStreak: Int
    let activePillars: Int
    let onAchievementTap: (StatsView.AchievementInfo) -> Void

    private var achievements: [(icon: String, title: String, description: String, unlocked: Bool, progress: String?, color: Color)] {
        [
            ("1.circle.fill", "First Check", "Complete your first practice", totalCompletions >= 1, totalCompletions >= 1 ? nil : "\(totalCompletions)/1", .space),
            ("10.circle.fill", "Decade", "Reach 10 total completions", totalCompletions >= 10, totalCompletions >= 10 ? nil : "\(totalCompletions)/10", .story),
            ("50.circle.fill", "Half Century", "Reach 50 total completions", totalCompletions >= 50, totalCompletions >= 50 ? nil : "\(totalCompletions)/50", .spirit),
            ("flame.fill", "Week Warrior", "Maintain a 7-day streak", bestStreak >= 7, bestStreak >= 7 ? nil : "\(bestStreak)/7 days", .amber),
            ("flame.circle.fill", "Month Master", "Maintain a 30-day streak", bestStreak >= 30, bestStreak >= 30 ? nil : "\(bestStreak)/30 days", .selfPillar),
            ("square.grid.2x2.fill", "Balanced", "Active practices in all 4 pillars", activePillars >= 4, activePillars >= 4 ? nil : "\(activePillars)/4 pillars", .space),
        ]
    }

    private var unlockedCount: Int {
        achievements.filter(\.unlocked).count
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("ACHIEVEMENTS")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(.textWhisper)
                    .tracking(1.2)

                Spacer()

                Text("\(unlockedCount)/\(achievements.count)")
                    .font(.system(size: 12, weight: .semibold, design: .rounded))
                    .foregroundStyle(.textSecondary)
            }

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                ForEach(achievements, id: \.title) { achievement in
                    AchievementBadge(
                        icon: achievement.icon,
                        title: achievement.title,
                        unlocked: achievement.unlocked,
                        color: achievement.color,
                        onTap: {
                            let info = StatsView.AchievementInfo(
                                icon: achievement.icon,
                                title: achievement.title,
                                description: achievement.description,
                                unlocked: achievement.unlocked,
                                progress: achievement.progress,
                                color: achievement.color
                            )
                            onAchievementTap(info)
                        }
                    )
                }
            }
        }
        .padding(16)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
        )
    }
}

struct AchievementBadge: View {
    let icon: String
    let title: String
    let unlocked: Bool
    let color: Color
    let onTap: () -> Void

    var body: some View {
        Button(action: {
            Haptics.light()
            onTap()
        }) {
            VStack(spacing: 6) {
                ZStack {
                    Circle()
                        .fill(unlocked ? color.opacity(0.2) : Color.background.opacity(0.3))
                        .frame(width: 36, height: 36)

                    Image(systemName: icon)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(unlocked ? color : .textSecondary.opacity(0.3))
                }

                Text(title)
                    .font(.system(size: 9, weight: .medium))
                    .foregroundStyle(unlocked ? .textPrimary : .textSecondary.opacity(0.5))
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
        }
        .buttonStyle(StreakButtonStyle())
    }
}

#Preview {
    StatsView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
