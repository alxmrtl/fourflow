//
//  TodayView.swift
//  FlowHabits
//
//  The daily flow interface - where presence meets practice
//

import SwiftUI
import SwiftData

struct TodayView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<Habit> { $0.isActive }, sort: \Habit.sortOrder)
    private var habits: [Habit]

    @State private var showingAddHabit = false
    @State private var selectedPillar: Pillar = .self_
    @State private var showingPillarSheet: Pillar?
    @State private var selectedHabitForInfo: Habit?
    // Always normalize selectedDate to start of day to ensure consistent comparisons
    @State private var selectedDate: Date = Calendar.current.startOfDay(for: Date())

    private var isToday: Bool {
        Calendar.current.isDateInToday(selectedDate)
    }

    private var completedCount: Int {
        habits.filter { $0.isCompletedOn(selectedDate) }.count
    }

    private var totalCount: Int {
        habits.count
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void - deep black canvas
                Color.canvas.ignoresSafeArea()

                // Sacred Geometry - the four elements mandala, barely visible
                FourElementsMandala(opacity: 0.025)
                    .ignoresSafeArea()

                // Spirit Glow - ambient presence emanating from below
                VStack {
                    Spacer()
                    RadialGradient.spiritGlow(at: .bottom)
                        .frame(height: 400)
                        .offset(y: 100)
                }
                .ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 20) {
                        // Flow Dashboard
                        FlowDashboard(
                            completedCount: completedCount,
                            totalCount: totalCount,
                            habits: habits,
                            selectedDate: selectedDate
                        )

                        // Pillar Sections
                        ForEach(Pillar.displayOrder) { pillar in
                            let pillarHabits = habits.filter { $0.pillar == pillar }
                            if !pillarHabits.isEmpty {
                                CompactPillarSection(
                                    pillar: pillar,
                                    habits: pillarHabits,
                                    selectedDate: selectedDate,
                                    onToggle: toggleHabit,
                                    onHeaderTap: { showingPillarSheet = pillar },
                                    onHabitInfoTap: { habit in selectedHabitForInfo = habit }
                                )
                            }
                        }

                        // Empty state
                        if habits.isEmpty {
                            EmptyHabitsView(
                                onAddTapped: { showingAddHabit = true },
                                onPillarTap: { pillar in showingPillarSheet = pillar }
                            )
                        }

                        Spacer(minLength: 100)
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 8)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    HStack(spacing: 16) {
                        // Previous day button
                        Button {
                            let calendar = Calendar.current
                            withAnimation(.spring(duration: 0.3)) {
                                if let newDate = calendar.date(byAdding: .day, value: -1, to: selectedDate) {
                                    selectedDate = calendar.startOfDay(for: newDate)
                                }
                            }
                            Haptics.light()
                        } label: {
                            Image(systemName: "chevron.left")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundStyle(.textSecondary)
                        }

                        // Date title - tap to return to today
                        Button {
                            if !isToday {
                                withAnimation(.spring(duration: 0.3)) {
                                    selectedDate = Calendar.current.startOfDay(for: Date())
                                }
                                Haptics.light()
                            }
                        } label: {
                            Text(formattedDate)
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(isToday ? .textPrimary : .spirit)
                                .frame(width: 140)
                        }

                        // Next day button - disabled if already at today
                        Button {
                            let calendar = Calendar.current
                            let today = calendar.startOfDay(for: Date())
                            withAnimation(.spring(duration: 0.3)) {
                                if let newDate = calendar.date(byAdding: .day, value: 1, to: selectedDate),
                                   calendar.startOfDay(for: newDate) <= today {
                                    selectedDate = calendar.startOfDay(for: newDate)
                                }
                            }
                            Haptics.light()
                        } label: {
                            Image(systemName: "chevron.right")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundStyle(isToday ? .textWhisper.opacity(0.3) : .textSecondary)
                        }
                        .disabled(isToday)
                    }
                }
            }
            .sheet(isPresented: $showingAddHabit) {
                PracticePickerView(mode: .compact, selectedPillar: selectedPillar)
            }
        }
        .preferredColorScheme(.dark)
        .sheet(item: $showingPillarSheet) { pillar in
            PillarDetailSheet(pillar: pillar, habits: habits)
                .presentationDetents([.medium, .large])
        }
        .sheet(item: $selectedHabitForInfo) { habit in
            ActiveHabitDetailSheet(
                habit: habit,
                onRemove: {
                    habit.isActive = false
                    Haptics.medium()
                }
            )
            .presentationDetents([.large])
        }
    }

    private var formattedDate: String {
        let calendar = Calendar.current
        if calendar.isDateInToday(selectedDate) {
            return "Today"
        } else if calendar.isDateInYesterday(selectedDate) {
            return "Yesterday"
        } else {
            let formatter = DateFormatter()
            formatter.dateFormat = "EEEE, MMM d"
            return formatter.string(from: selectedDate)
        }
    }

    private func toggleHabit(_ habit: Habit) {
        let calendar = Calendar.current
        // Always normalize to start of day for consistent comparison
        let normalizedDate = calendar.startOfDay(for: selectedDate)

        if habit.isCompletedOn(normalizedDate) {
            // Find and remove the completion for this day
            if let completion = habit.completions.first(where: {
                calendar.isDate($0.date, inSameDayAs: normalizedDate)
            }) {
                // Remove from habit's completions array (explicit sync)
                habit.completions.removeAll { $0.id == completion.id }
                modelContext.delete(completion)
                // Explicit save to ensure consistency
                try? modelContext.save()
                Haptics.soft()
            }
        } else {
            // Store all completions at start of day for consistent querying
            // This ensures date comparisons work reliably across all views
            let completion = HabitCompletion(date: normalizedDate, habit: habit)
            modelContext.insert(completion)
            // Explicitly add to habit's completions (fixes inverse relationship lag)
            habit.completions.append(completion)
            // Explicit save to ensure data is persisted immediately
            try? modelContext.save()
            Haptics.success()
        }
    }
}

// MARK: - Flow Dashboard

struct FlowDashboard: View {
    let completedCount: Int
    let totalCount: Int
    let habits: [Habit]
    var selectedDate: Date = Date()

    @State private var showCompletionCelebration = false

    private var isAllComplete: Bool {
        totalCount > 0 && completedCount == totalCount
    }

    var body: some View {
        HStack(spacing: 12) {
            // Left: Progress Ring with Pillar Dots
            VStack(spacing: 10) {
                CleanProgressRing(
                    completedCount: completedCount,
                    totalCount: totalCount
                )
                .frame(width: 90, height: 90)

                // Pillar Completion Dots
                PillarCompletionDots(habits: habits, selectedDate: selectedDate)
            }
            .frame(width: 100)

            // Right: Flow Calendar (7-day history)
            FlowCalendar(
                habits: habits,
                selectedDate: selectedDate,
                isCompleteToday: isAllComplete,
                showCelebration: $showCompletionCelebration
            )
        }
        .padding(14)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
        )
        .onChange(of: isAllComplete) { wasComplete, isNowComplete in
            if isNowComplete && !wasComplete {
                showCompletionCelebration = true
            }
        }
    }
}

// MARK: - Clean Progress Ring

struct CleanProgressRing: View {
    let completedCount: Int
    let totalCount: Int

    @State private var animatedPercentage: Double = 0
    @State private var breathScale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.0

    private var percentage: Double {
        guard totalCount > 0 else { return 0 }
        return Double(completedCount) / Double(totalCount)
    }

    private var isComplete: Bool {
        totalCount > 0 && completedCount == totalCount
    }

    var body: some View {
        ZStack {
            // Ambient glow behind ring
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            (isComplete ? Color.amber : Color.spirit).opacity(0.25),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 25,
                        endRadius: 55
                    )
                )
                .scaleEffect(breathScale * 1.2)
                .opacity(glowOpacity)

            // Background circle
            Circle()
                .stroke(Color.white.opacity(0.08), lineWidth: 6)

            // Progress arc - The Spectrum gradient
            Circle()
                .trim(from: 0, to: animatedPercentage)
                .stroke(
                    AngularGradient.progressRing,
                    style: StrokeStyle(lineWidth: 6, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .scaleEffect(breathScale)

            // Clean centered count
            Text("\(completedCount)")
                .font(.system(size: 32, weight: .bold, design: .rounded))
                .foregroundStyle(isComplete ? .amber : .ivory)
                .contentTransition(.numericText())
        }
        .onAppear {
            withAnimation(.spring(duration: 0.6)) {
                animatedPercentage = percentage
            }
            withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                breathScale = 1.02
                glowOpacity = 0.6
            }
        }
        .onChange(of: completedCount) { _, _ in
            withAnimation(.spring(duration: 0.4)) {
                animatedPercentage = percentage
            }
        }
        .onChange(of: totalCount) { _, _ in
            withAnimation(.spring(duration: 0.4)) {
                animatedPercentage = percentage
            }
        }
    }
}

// MARK: - Pillar Completion Dots

struct PillarCompletionDots: View {
    let habits: [Habit]
    var selectedDate: Date = Date()

    private func isPillarComplete(_ pillar: Pillar) -> Bool {
        let pillarHabits = habits.filter { $0.pillar == pillar }
        guard !pillarHabits.isEmpty else { return false }
        return pillarHabits.allSatisfy { $0.isCompletedOn(selectedDate) }
    }

    private func hasPillarHabits(_ pillar: Pillar) -> Bool {
        habits.contains { $0.pillar == pillar }
    }

    var body: some View {
        HStack(spacing: 6) {
            ForEach(Pillar.displayOrder) { pillar in
                CompletionDot(
                    pillar: pillar,
                    isComplete: isPillarComplete(pillar),
                    hasHabits: hasPillarHabits(pillar)
                )
            }
        }
    }
}

struct CompletionDot: View {
    let pillar: Pillar
    let isComplete: Bool
    let hasHabits: Bool

    @State private var pulseScale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.0

    var body: some View {
        ZStack {
            // Glow behind completed dots
            if isComplete {
                Circle()
                    .fill(pillar.color.opacity(0.4))
                    .frame(width: 16, height: 16)
                    .scaleEffect(pulseScale * 1.3)
                    .opacity(glowOpacity)
            }

            // Main dot
            Circle()
                .fill(isComplete ? pillar.color : (hasHabits ? pillar.color.opacity(0.25) : Color.white.opacity(0.1)))
                .frame(width: 10, height: 10)
                .scaleEffect(isComplete ? pulseScale : 1.0)
        }
        .frame(width: 20, height: 20)
        .onChange(of: isComplete) { wasComplete, isNowComplete in
            if isNowComplete {
                // Celebration pulse
                withAnimation(.spring(duration: 0.3)) {
                    pulseScale = 1.3
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                        pulseScale = 1.1
                        glowOpacity = 0.8
                    }
                }
            } else {
                withAnimation(.easeOut(duration: 0.3)) {
                    pulseScale = 1.0
                    glowOpacity = 0.0
                }
            }
        }
        .onAppear {
            if isComplete {
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    pulseScale = 1.1
                    glowOpacity = 0.8
                }
            }
        }
    }
}

// MARK: - Flow Calendar (7-Day Streak Visualization)

struct FlowCalendar: View {
    let habits: [Habit]
    let selectedDate: Date
    let isCompleteToday: Bool
    @Binding var showCelebration: Bool

    @State private var newBlockScale: CGFloat = 0
    @State private var newBlockOpacity: Double = 0

    private let dayCount = 7

    private var calendarData: [DayCompletion] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        let normalizedSelectedDate = calendar.startOfDay(for: selectedDate)

        return (0..<dayCount).reversed().map { daysAgo in
            let date = calendar.date(byAdding: .day, value: -daysAgo, to: today)!
            let isSelected = calendar.isDate(date, inSameDayAs: normalizedSelectedDate)
            return DayCompletion(
                date: date,
                isToday: daysAgo == 0,
                isSelected: isSelected,
                pillarCompletions: Pillar.displayOrder.map { pillar in
                    // Include habits that were active on this date (created before OR has completion on date)
                    let pillarHabits = habits.filter { habit in
                        habit.pillar == pillar && habit.wasActiveOn(date)
                    }
                    guard !pillarHabits.isEmpty else { return PillarDayStatus(pillar: pillar, isComplete: false, hasHabits: false) }
                    let allComplete = pillarHabits.allSatisfy { $0.isCompletedOn(date) }
                    return PillarDayStatus(pillar: pillar, isComplete: allComplete, hasHabits: true)
                }
            )
        }
    }

    private var currentStreak: Int {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        var streak = 0

        for daysAgo in 0..<30 {
            let date = calendar.date(byAdding: .day, value: -daysAgo, to: today)!
            let dayHabits = habits.filter { !$0.completions.isEmpty || daysAgo == 0 }

            guard !dayHabits.isEmpty else { break }

            let allComplete = dayHabits.allSatisfy { habit in
                habit.isCompletedOn(date)
            }

            if allComplete && !habits.isEmpty {
                streak += 1
            } else if daysAgo > 0 {
                break
            }
        }

        return streak
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Calendar blocks - flexible width
            HStack(spacing: 3) {
                ForEach(Array(calendarData.enumerated()), id: \.offset) { index, day in
                    DayBlock(
                        day: day,
                        isNewest: day.isToday,
                        animateIn: day.isToday && showCelebration
                    )
                    .frame(maxWidth: .infinity)
                }
            }

            // Streak indicator
            HStack(spacing: 4) {
                if currentStreak > 0 {
                    Image(systemName: "flame.fill")
                        .font(.system(size: 10))
                        .foregroundStyle(.amber)
                    Text("\(currentStreak) day streak")
                        .font(.system(size: 11, weight: .medium, design: .rounded))
                        .foregroundStyle(.textSecondary)
                } else {
                    Text("Complete all to build streak")
                        .font(.system(size: 11, weight: .medium, design: .rounded))
                        .foregroundStyle(.textWhisper)
                }

                Spacer()

                Text("7 days")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundStyle(.textWhisper)
            }
        }
        .padding(10)
        .background(Color.white.opacity(0.03))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.white.opacity(0.06), lineWidth: 1)
        )
        .onChange(of: showCelebration) { _, celebrating in
            if celebrating {
                // Reset after animation
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                    showCelebration = false
                }
            }
        }
    }
}

struct DayCompletion: Identifiable {
    let id = UUID()
    let date: Date
    let isToday: Bool
    let isSelected: Bool
    let pillarCompletions: [PillarDayStatus]

    var isFullyComplete: Bool {
        let activePillars = pillarCompletions.filter { $0.hasHabits }
        guard !activePillars.isEmpty else { return false }
        return activePillars.allSatisfy { $0.isComplete }
    }

    var hasAnyCompletion: Bool {
        pillarCompletions.contains { $0.isComplete }
    }
}

struct PillarDayStatus {
    let pillar: Pillar
    let isComplete: Bool
    let hasHabits: Bool
}

struct DayBlock: View {
    let day: DayCompletion
    let isNewest: Bool
    let animateIn: Bool

    @State private var blockScale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.0

    var body: some View {
        VStack(spacing: 4) {
            // Selected day indicator - white dot on top
            Circle()
                .fill(Color.white)
                .frame(width: 5, height: 5)
                .opacity(day.isSelected ? 1.0 : 0.0)

            // Stacked pillar segments (Spirit on top, Self on bottom)
            VStack(spacing: 1) {
                ForEach(Array(day.pillarCompletions.reversed().enumerated()), id: \.offset) { _, status in
                    Rectangle()
                        .fill(segmentColor(for: status))
                        .frame(height: 7)
                }
            }
            .frame(height: 32)
            .clipShape(RoundedRectangle(cornerRadius: 4))
            .overlay(
                RoundedRectangle(cornerRadius: 4)
                    .stroke(day.isFullyComplete ? Color.amber.opacity(0.6) : Color.white.opacity(0.08), lineWidth: day.isFullyComplete ? 1.5 : 0.5)
            )
            .overlay {
                // Glow for fully complete days
                if day.isFullyComplete {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.amber.opacity(0.1))
                        .scaleEffect(1.1)
                        .opacity(glowOpacity)
                }
            }
            .scaleEffect(blockScale)
        }
        .onAppear {
            if day.isFullyComplete {
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    glowOpacity = 0.6
                }
            }
        }
        .onChange(of: animateIn) { _, shouldAnimate in
            if shouldAnimate {
                // Pop-in animation for new completion
                blockScale = 0.5
                withAnimation(.spring(duration: 0.5, bounce: 0.4)) {
                    blockScale = 1.0
                }
                Haptics.success()
            }
        }
    }

    private func segmentColor(for status: PillarDayStatus) -> Color {
        if status.isComplete {
            return status.pillar.color
        } else if status.hasHabits {
            return status.pillar.color.opacity(0.15)
        } else {
            return Color.white.opacity(0.05)
        }
    }
}

// MARK: - Scale Fade Button Style

struct ScaleFadeButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .opacity(configuration.isPressed ? 0.8 : 1.0)
            .animation(.spring(duration: 0.15), value: configuration.isPressed)
    }
}

// MARK: - Compact Pillar Section (Left Badge Layout)

struct CompactPillarSection: View {
    let pillar: Pillar
    let habits: [Habit]
    var selectedDate: Date = Date()
    let onToggle: (Habit) -> Void
    var onHeaderTap: (() -> Void)? = nil
    var onHabitInfoTap: ((Habit) -> Void)? = nil

    private var completedCount: Int {
        habits.filter { $0.isCompletedOn(selectedDate) }.count
    }

    private var isComplete: Bool {
        completedCount == habits.count
    }

    var body: some View {
        ZStack(alignment: .topLeading) {
            // Subtle pillar glow at top-left corner
            RadialGradient(
                colors: [Color.pillarWhisper(pillar), Color.clear],
                center: .topLeading,
                startRadius: 0,
                endRadius: 120
            )
            .clipShape(RoundedRectangle(cornerRadius: 16))

            HStack(spacing: 0) {
                // Left Pillar Strip - tappable
                Button(action: { onHeaderTap?() }) {
                    Image(systemName: pillar.iconName)
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundStyle(isComplete ? .void : pillar.color)
                        .frame(width: 44)
                        .frame(maxHeight: .infinity)
                        .background(isComplete ? pillar.color : pillar.color.opacity(0.15))
                }
                .buttonStyle(ScaleFadeButtonStyle())

                // Habit List
                VStack(spacing: 1) {
                    ForEach(habits) { habit in
                        CompactHabitRow(
                            habit: habit,
                            pillarColor: pillar.color,
                            selectedDate: selectedDate,
                            onToggle: { onToggle(habit) },
                            onInfoTap: onHabitInfoTap != nil ? { onHabitInfoTap?(habit) } : nil
                        )
                    }
                }
                .padding(.leading, 1)
            }
        }
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .strokeBorder(pillar.color.opacity(0.12), lineWidth: 1)
        )
    }
}

// MARK: - Compact Habit Row

struct CompactHabitRow: View {
    let habit: Habit
    var pillarColor: Color? = nil
    var selectedDate: Date = Date()
    let onToggle: () -> Void
    var onInfoTap: (() -> Void)? = nil

    @State private var showCompletionRing = false

    private var color: Color {
        pillarColor ?? habit.pillar.color
    }

    private var isCompleted: Bool {
        habit.isCompletedOn(selectedDate)
    }

    var body: some View {
        HStack(spacing: 0) {
            // Primary action zone - completion toggle
            Button(action: {
                if !isCompleted {
                    showCompletionRing = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                        showCompletionRing = false
                    }
                }
                onToggle()
            }) {
                HStack(spacing: 12) {
                    // Checkbox with completion celebration
                    ZStack {
                        RoundedRectangle(cornerRadius: 6)
                            .stroke(color.opacity(isCompleted ? 1 : 0.3), lineWidth: 1.5)
                            .frame(width: 22, height: 22)

                        if isCompleted {
                            RoundedRectangle(cornerRadius: 6)
                                .fill(color)
                                .frame(width: 22, height: 22)

                            Image(systemName: "checkmark")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundStyle(.void)
                        }
                    }
                    .overlay {
                        // Expanding ring on completion - in overlay so it doesn't affect layout
                        if showCompletionRing {
                            Circle()
                                .stroke(color.opacity(0.4), lineWidth: 2)
                                .frame(width: 32, height: 32)
                                .scaleEffect(showCompletionRing ? 1.5 : 0.8)
                                .opacity(showCompletionRing ? 0 : 1)
                                .animation(.easeOut(duration: 0.5), value: showCompletionRing)
                        }
                    }

                    // Icon + Name
                    HabitIcon(habit: habit, size: 16)

                    Text(habit.name)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(isCompleted ? .textWhisper : .textPrimary)
                        .strikethrough(isCompleted, color: .textWhisper)
                        .lineLimit(1)
                        .truncationMode(.tail)
                        .minimumScaleFactor(0.9)
                        .layoutPriority(1)

                    Spacer()

                    // Streak (compact) with flame intensity
                    if habit.currentStreak > 0 {
                        HStack(spacing: 3) {
                            Image(systemName: "flame.fill")
                                .font(.system(size: 10))
                                .symbolEffect(.pulse, options: .repeating, value: habit.currentStreak > 7)
                            Text("\(habit.currentStreak)")
                                .font(.system(size: 11, weight: .bold, design: .rounded))
                        }
                        .foregroundStyle(habit.currentStreak > 7 ? .amber : .amber.opacity(0.7))
                    }
                }
                .padding(.leading, 12)
                .padding(.vertical, 12)
            }
            .buttonStyle(CompactHabitButtonStyle())

            // Info zone - details chevron
            if let onInfoTap = onInfoTap {
                // Subtle divider
                Rectangle()
                    .fill(color.opacity(0.1))
                    .frame(width: 1)
                    .padding(.vertical, 10)

                Button(action: {
                    Haptics.light()
                    onInfoTap()
                }) {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(color.opacity(0.4))
                        .frame(width: 44, height: 44)
                }
                .buttonStyle(ScaleFadeButtonStyle())
            }
        }
        .background(Color.surface)
    }
}

struct CompactHabitButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .opacity(configuration.isPressed ? 0.9 : 1.0)
            .animation(.spring(duration: 0.12), value: configuration.isPressed)
    }
}

// MARK: - Empty State

struct EmptyHabitsView: View {
    let onAddTapped: () -> Void
    var onPillarTap: ((Pillar) -> Void)? = nil

    var body: some View {
        VStack(spacing: 28) {
            // Poetic header
            VStack(spacing: 8) {
                Text("Where will you begin?")
                    .font(.system(size: 22, weight: .semibold, design: .rounded))
                    .foregroundStyle(.textPrimary)

                Text("Flow emerges from practice.\nNot perfection. Practice.")
                    .font(.system(size: 14))
                    .foregroundStyle(.textSecondary)
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
            }

            // Four Pillars - tappable with taglines
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 14) {
                ForEach(Pillar.displayOrder) { pillar in
                    Button(action: { onPillarTap?(pillar) }) {
                        VStack(spacing: 8) {
                            ZStack {
                                // Subtle glow behind icon
                                Circle()
                                    .fill(
                                        RadialGradient(
                                            colors: [pillar.color.opacity(0.2), Color.clear],
                                            center: .center,
                                            startRadius: 0,
                                            endRadius: 30
                                        )
                                    )
                                    .frame(width: 50, height: 50)

                                Circle()
                                    .fill(pillar.color.opacity(0.15))
                                    .frame(width: 44, height: 44)

                                Image(systemName: pillar.iconName)
                                    .font(.system(size: 18, weight: .medium))
                                    .foregroundStyle(pillar.color)
                            }

                            VStack(spacing: 3) {
                                Text(pillar.displayName)
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundStyle(.textPrimary)

                                Text(pillar.tagline)
                                    .font(.system(size: 10))
                                    .foregroundStyle(.textWhisper)
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(Color.cardBackground)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .stroke(pillar.color.opacity(0.1), lineWidth: 1)
                        )
                    }
                    .buttonStyle(ScaleFadeButtonStyle())
                }
            }

            Text("Four dimensions. Which calls to you?")
                .font(.system(size: 12))
                .foregroundStyle(.textWhisper)

            // Subtle monochrome button
            Button(action: onAddTapped) {
                HStack(spacing: 8) {
                    Image(systemName: "plus")
                        .font(.system(size: 14, weight: .semibold))
                    Text("Add Practice")
                        .font(.system(size: 15, weight: .semibold))
                }
                .foregroundStyle(.white.opacity(0.9))
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .background(Color.white.opacity(0.12))
                .clipShape(Capsule())
                .overlay(
                    Capsule()
                        .stroke(Color.white.opacity(0.15), lineWidth: 1)
                )
            }
        }
        .padding(28)
    }
}

// MARK: - Add Practice Button (Subtle Monochrome)

struct AddPracticeButton: View {
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 8) {
                Image(systemName: "plus")
                    .font(.system(size: 15, weight: .semibold))
                Text("Add Practice")
                    .font(.system(size: 15, weight: .semibold))
            }
            .foregroundStyle(.white.opacity(0.9))
            .padding(.horizontal, 20)
            .padding(.vertical, 14)
            .frame(maxWidth: .infinity)
            .background(Color.white.opacity(0.12))
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(Color.white.opacity(0.15), lineWidth: 1)
            )
        }
        .buttonStyle(ScaleFadeButtonStyle())
    }
}

// MARK: - Legacy Add Habit Button (keeping for compatibility)

struct AddHabitButton: View {
    let onTap: () -> Void

    var body: some View {
        AddPracticeButton(onTap: onTap)
    }
}

#Preview {
    TodayView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
