//
//  FlowView.swift
//  FlowZone
//
//  Main planning and flow launch screen (Self pillar)
//  Observatory aesthetic with breathing ambient glow
//

import SwiftUI
import SwiftData

struct FlowView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.modelContext) private var modelContext

    @Query(filter: #Predicate<Profile> { $0.id == "user-profile" })
    private var profiles: [Profile]

    @Query(filter: #Predicate<Goal> { $0.statusRaw == "active" }, sort: \Goal.sortOrder)
    private var goals: [Goal]

    @Query(sort: \FlowTask.sortOrder)
    private var allTasks: [FlowTask]

    @Query(filter: #Predicate<AppSettings> { $0.id == "app-settings" })
    private var settingsQuery: [AppSettings]

    @State private var showAddGoal = false
    @State private var selectedGoal: Goal?
    @State private var showCompletedSection = true
    @State private var showControlPanel = false
    @State private var showAllMissions = true
    @State private var editingTask: FlowTask?
    @State private var showPipelinePicker = false
    @State private var fillingContainerIndex: Int = 0

    private var profile: Profile? { profiles.first }
    private var settings: AppSettings? { settingsQuery.first }

    // Daily container count from settings
    private var dailyContainerCount: Int {
        settings?.dailyContainerCount ?? 3
    }

    // Tasks in today's containers
    var containerTasks: [FlowTask] {
        allTasks.filter { $0.status == .container }.sorted { $0.sortOrder < $1.sortOrder }
    }

    // Pipeline tasks (optionally filtered by goal)
    var pipelineTasks: [FlowTask] {
        let tasks = allTasks.filter { $0.status == .pipeline }.sorted { $0.sortOrder < $1.sortOrder }
        if let goal = selectedGoal {
            return tasks.filter { $0.goal?.id == goal.id }
        }
        return tasks
    }

    // Current ACT task (first container)
    var actTask: FlowTask? {
        containerTasks.first
    }

    // Remaining container slots (filled tasks after the first)
    var remainingContainerTasks: [FlowTask] {
        Array(containerTasks.dropFirst())
    }

    // How many empty slots remain
    var emptySlotCount: Int {
        max(0, dailyContainerCount - containerTasks.count)
    }

    // Current container number (1-based)
    var currentContainerNumber: Int {
        min(containerTasks.count, dailyContainerCount)
    }

    var completedTodayTasks: [FlowTask] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        return allTasks.filter { task in
            guard task.status == .completed, let completedAt = task.completedAt else { return false }
            return calendar.startOfDay(for: completedAt) == today
        }
    }

    var body: some View {
        ZStack {
            // Observatory background with breathing spirit glow
            ObservatoryBackground(glowColor: .spirit, glowPosition: .topTrailing)

            ScrollView(showsIndicators: false) {
                VStack(spacing: 16) {
                    // Header with date
                    headerSection
                        .padding(.top, 8)

                    // Vision card
                    visionCard

                    // Mission card
                    missionCard

                    // ACT section (container slots)
                    actSection

                    // Remaining containers
                    if !remainingContainerTasks.isEmpty || emptySlotCount > 0 {
                        remainingContainersSection
                    }

                    // Completed card
                    if !completedTodayTasks.isEmpty {
                        completedCard
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 40)
            }
        }
        .sheet(item: $editingTask) { task in
            TaskEditSheet(task: task, defaultGoal: task.goal, defaultToToday: task.status == .container)
        }
        .sheet(isPresented: $showAddGoal) {
            AddGoalView()
        }
        .sheet(isPresented: $showPipelinePicker) {
            PipelinePickerSheet(
                goals: goals,
                pipelineTasks: allTasks.filter { $0.status == .pipeline }.sorted { $0.sortOrder < $1.sortOrder },
                selectedGoal: $selectedGoal,
                onSelect: { task in
                    pullToContainer(task)
                    showPipelinePicker = false
                },
                onCreateNew: { title, goal in
                    createAndPullTask(title: title, goal: goal)
                    showPipelinePicker = false
                }
            )
        }
    }

    // MARK: - Header Section (with date on right)

    private var headerSection: some View {
        HStack(alignment: .center) {
            // Flow title
            Text("Flow")
                .font(.largeTitle.weight(.bold))
                .foregroundColor(.ivory)

            Spacer()

            // Today's date (top right)
            Text(Date(), format: .dateTime.weekday(.abbreviated).month(.abbreviated).day())
                .font(.subheadline.weight(.medium))
                .foregroundColor(.ivory.opacity(0.6))
        }
        .padding(.horizontal, 4)
    }

    // MARK: - Vision Card (narrow box above Mission)

    private var visionCard: some View {
        Button {
            appState.navigateToSettingsPanel = .vision
            HapticFeedback.light()
        } label: {
            HStack(spacing: 12) {
                // Icon and label
                HStack(spacing: 8) {
                    Image(systemName: "sparkles")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(.spirit)

                    Text("VISION")
                        .font(.caption.weight(.bold))
                        .foregroundColor(.spirit)
                }

                // Vision text
                Text(profile?.vision ?? "Set your vision")
                    .font(.caption)
                    .foregroundColor(profile?.vision == nil ? .ivory.opacity(0.4) : .ivory.opacity(0.7))
                    .italic(profile?.vision == nil || (profile?.vision ?? "").isEmpty)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundColor(.spirit.opacity(0.4))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .buttonStyle(.plain)
        .glassCard(tint: .spirit, cornerRadius: 20)
    }

    // MARK: - Mission Card (blue/story pillar branding)

    private var missionCard: some View {
        VStack(spacing: 0) {
            // MISSION header with goal emoji pills
            HStack(spacing: 12) {
                // Clickable icon to navigate to mission settings
                Button {
                    appState.navigateToSettingsPanel = .mission
                    HapticFeedback.light()
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "flag.fill")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.story)

                        Text("MISSION")
                            .font(.caption.weight(.bold))
                            .foregroundColor(.story)
                    }
                }
                .buttonStyle(.plain)

                // Goal emoji pills with ALL option
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        // ALL missions pill (default, can't be deleted)
                        Button {
                            showAllMissions = true
                            selectedGoal = nil
                            HapticFeedback.selection()
                        } label: {
                            Text("🌀")
                                .font(.system(size: 18))
                                .frame(width: 36, height: 36)
                                .background(
                                    Circle()
                                        .fill(showAllMissions ? Color.story : Color.story.opacity(0.15))
                                )
                        }

                        ForEach(goals) { goal in
                            Button {
                                if selectedGoal?.id == goal.id {
                                    showAllMissions = true
                                    selectedGoal = nil
                                } else {
                                    showAllMissions = false
                                    selectedGoal = goal
                                }
                                HapticFeedback.selection()
                            } label: {
                                Text(goal.emoji)
                                    .font(.system(size: 18))
                                    .frame(width: 36, height: 36)
                                    .background(
                                        Circle()
                                            .fill(!showAllMissions && selectedGoal?.id == goal.id ? Color.story : Color.story.opacity(0.15))
                                    )
                            }
                        }

                        if goals.count < 5 {
                            Button {
                                showAddGoal = true
                                HapticFeedback.light()
                            } label: {
                                Image(systemName: "plus")
                                    .font(.caption.weight(.semibold))
                                    .foregroundColor(.story.opacity(0.6))
                                    .frame(width: 36, height: 36)
                                    .background(
                                        Circle()
                                            .strokeBorder(Color.story.opacity(0.3), style: StrokeStyle(lineWidth: 1.5, dash: [4]))
                                    )
                            }
                        }
                    }
                }

                Spacer(minLength: 0)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .glassCard(tint: .story, cornerRadius: 20)
    }

    // MARK: - ACT Section (Container with current task)

    private var actSection: some View {
        VStack(spacing: 0) {
            // ACT header with container count
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "bolt.fill")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(.selfPillar)

                    Text("ACT")
                        .font(.caption.weight(.bold))
                        .foregroundColor(.selfPillar)

                    // Container indicator
                    if containerTasks.count > 0 {
                        Text("Container \(currentContainerNumber) of \(dailyContainerCount)")
                            .font(.caption2)
                            .foregroundColor(.selfPillar.opacity(0.6))
                    }
                }

                Spacer()

                // Control panel button
                Button {
                    withAnimation(.spring(response: 0.3)) {
                        showControlPanel.toggle()
                    }
                    HapticFeedback.light()
                } label: {
                    Image(systemName: showControlPanel ? "xmark" : "gearshape")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(.space)
                        .frame(width: 26, height: 26)
                        .background(
                            Circle()
                                .fill(showControlPanel ? Color.space.opacity(0.2) : Color.space.opacity(0.1))
                        )
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 14)
            .padding(.bottom, 10)

            // Control panel (expandable)
            if showControlPanel {
                controlPanelContent
                    .padding(.horizontal, 12)
                    .padding(.bottom, 10)
                    .transition(.opacity.combined(with: .scale(scale: 0.95, anchor: .topTrailing)))
            }

            if let task = actTask {
                // Current ACT task - prominent display
                ActTaskView(
                    task: task,
                    onTap: {
                        editingTask = task
                        HapticFeedback.light()
                    },
                    onComplete: {
                        task.complete()
                        try? modelContext.save()
                        HapticFeedback.success()
                    },
                    onReturnToPipeline: {
                        task.returnToPipeline()
                        try? modelContext.save()
                        HapticFeedback.light()
                    },
                    onStart: {
                        startFlow()
                    }
                )
                .padding(.horizontal, 12)
                .padding(.bottom, 14)
            } else {
                // Empty state - prompt to fill container
                VStack(spacing: 12) {
                    VStack(spacing: 6) {
                        Image(systemName: "square.dashed")
                            .font(.title2)
                            .foregroundColor(.ivory.opacity(0.2))
                        Text("Container is empty")
                            .font(.subheadline)
                            .foregroundColor(.ivory.opacity(0.4))
                    }

                    Button {
                        showPipelinePicker = true
                        HapticFeedback.light()
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "arrow.right.circle.fill")
                                .font(.system(size: 14))
                            Text("Pull from Pipeline")
                                .font(.subheadline.weight(.medium))
                        }
                        .foregroundColor(.selfPillar)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .fill(Color.selfPillar.opacity(0.12))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10, style: .continuous)
                                        .strokeBorder(Color.selfPillar.opacity(0.3), lineWidth: 1)
                                )
                        )
                    }
                }
                .frame(maxWidth: .infinity)
                .padding(.horizontal, 16)
                .padding(.vertical, 20)
            }
        }
        .glassCard(tint: .selfPillar, cornerRadius: 20)
    }

    // MARK: - Control Panel Content

    private var controlPanelContent: some View {
        VStack(spacing: 8) {
            // Breathwork quick setting
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "wind")
                        .font(.system(size: 10))
                        .foregroundColor(.space)
                    Text("Breathwork")
                        .font(.caption2.weight(.medium))
                        .foregroundColor(.ivory.opacity(0.8))
                }

                Spacer()

                Picker("Before", selection: Binding(
                    get: { settings?.breathworkBefore ?? .none },
                    set: { newValue in
                        settings?.breathworkBefore = newValue
                        try? modelContext.save()
                    }
                )) {
                    ForEach(BreathworkPattern.beforePatterns) { pattern in
                        Text(pattern.displayName)
                            .font(.caption2)
                            .tag(pattern)
                    }
                }
                .pickerStyle(.menu)
                .tint(.space)
                .font(.caption2)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(Color.white.opacity(0.03))
            .cornerRadius(8)

            // Binaural beats toggle
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "waveform.circle")
                        .font(.system(size: 10))
                        .foregroundColor(.spirit)
                    Text("Binaural Beats")
                        .font(.caption2.weight(.medium))
                        .foregroundColor(.ivory.opacity(0.8))
                }

                Spacer()

                Toggle("", isOn: Binding(
                    get: { settings?.sound == .binaural },
                    set: { enabled in
                        settings?.sound = enabled ? .binaural : .none
                        try? modelContext.save()
                    }
                ))
                .toggleStyle(SwitchToggleStyle(tint: .spirit))
                .labelsHidden()
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(Color.white.opacity(0.03))
            .cornerRadius(8)
        }
    }

    // MARK: - Remaining Containers Section

    private var remainingContainersSection: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "square.stack")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(.ivory.opacity(0.5))

                    Text("REMAINING")
                        .font(.caption.weight(.bold))
                        .foregroundColor(.ivory.opacity(0.6))

                    let filledCount = remainingContainerTasks.count
                    let emptyCount = emptySlotCount
                    Text("(\(filledCount) filled, \(emptyCount) empty)")
                        .font(.caption)
                        .foregroundColor(.ivory.opacity(0.4))
                }

                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)

            VStack(spacing: 8) {
                // Filled container slots
                ForEach(remainingContainerTasks) { task in
                    FilledContainerSlot(task: task) {
                        // Promote to ACT (swap positions)
                        promoteToAct(task)
                    }
                }

                // Empty container slots
                ForEach(0..<emptySlotCount, id: \.self) { index in
                    EmptyContainerSlot {
                        showPipelinePicker = true
                        HapticFeedback.light()
                    }
                }
            }
            .padding(.horizontal, 12)
            .padding(.bottom, 14)
        }
        .glassCard(cornerRadius: 20)
    }

    // MARK: - Completed Card

    private var completedCard: some View {
        VStack(spacing: 0) {
            // Header
            Button {
                withAnimation(.spring(response: 0.3)) {
                    showCompletedSection.toggle()
                }
                HapticFeedback.light()
            } label: {
                HStack {
                    HStack(spacing: 8) {
                        Image(systemName: showCompletedSection ? "chevron.down" : "chevron.right")
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundColor(.space)

                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 14))
                            .foregroundColor(.space)

                        Text("Completed")
                            .font(.subheadline.weight(.medium))
                            .foregroundColor(.space)

                        Text("(\(completedTodayTasks.count))")
                            .font(.caption)
                            .foregroundColor(.space.opacity(0.6))
                    }

                    Spacer()

                    // Stars for completed
                    HStack(spacing: 3) {
                        ForEach(0..<min(completedTodayTasks.count, 5), id: \.self) { _ in
                            Image(systemName: "star.fill")
                                .font(.system(size: 8))
                                .foregroundColor(.amber)
                        }
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)

            if showCompletedSection {
                VStack(spacing: 6) {
                    ForEach(completedTodayTasks) { task in
                        CompletedTaskRow(task: task) {
                            task.reopen()
                            try? modelContext.save()
                            HapticFeedback.light()
                        }
                    }
                }
                .padding(.horizontal, 12)
                .padding(.bottom, 14)
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .glassCard(tint: .space, cornerRadius: 20)
    }

    // MARK: - Actions

    private func startFlow() {
        guard let task = actTask else { return }
        let duration = appState.settings?.timerDuration ?? 25
        appState.startFocusSession(task: task, duration: duration)
    }

    private func pullToContainer(_ task: FlowTask) {
        // Pull task from pipeline into container
        task.pullToContainer()

        // Give it the lowest sort order (so it goes to end of container list)
        let minSortOrder = containerTasks.map { $0.sortOrder }.min() ?? 0
        task.sortOrder = minSortOrder - 1

        try? modelContext.save()
        HapticFeedback.medium()
    }

    private func createAndPullTask(title: String, goal: Goal?) {
        let task = FlowTask(
            title: title,
            goal: goal,
            duration: settings?.timerDuration ?? 25,
            status: .container
        )

        // Give it the lowest sort order
        let minSortOrder = containerTasks.map { $0.sortOrder }.min() ?? 0
        task.sortOrder = minSortOrder - 1

        modelContext.insert(task)
        try? modelContext.save()
        HapticFeedback.success()
    }

    private func promoteToAct(_ task: FlowTask) {
        // If there's a current ACT task, swap sort orders
        if let currentAct = actTask {
            let currentActOrder = currentAct.sortOrder
            currentAct.sortOrder = task.sortOrder
            task.sortOrder = currentActOrder
        } else {
            // Just give it the highest sort order
            let maxSortOrder = containerTasks.map { $0.sortOrder }.max() ?? 0
            task.sortOrder = maxSortOrder + 1
        }

        try? modelContext.save()
        HapticFeedback.medium()
    }
}

// MARK: - ACT Task View (Prominent current task display)

struct ActTaskView: View {
    let task: FlowTask
    let onTap: () -> Void
    let onComplete: () -> Void
    let onReturnToPipeline: () -> Void
    let onStart: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            // Top row: emoji, title, and action buttons
            Button(action: onTap) {
                HStack(alignment: .top, spacing: 12) {
                    // Mission emoji
                    if let goal = task.goal {
                        Text(goal.emoji)
                            .font(.system(size: 24))
                    } else {
                        Text("🌀")
                            .font(.system(size: 24))
                            .opacity(0.4)
                    }

                    // Task title - full display, wrapping allowed
                    VStack(alignment: .leading, spacing: 4) {
                        Text(task.title)
                            .font(.headline.weight(.semibold))
                            .foregroundColor(.ivory)
                            .multilineTextAlignment(.leading)
                            .fixedSize(horizontal: false, vertical: true)

                        // Duration badge
                        Text("\(task.duration)m")
                            .font(.caption.monospacedDigit().weight(.medium))
                            .foregroundColor(.selfPillar.opacity(0.8))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(
                                Capsule()
                                    .fill(Color.selfPillar.opacity(0.15))
                            )
                    }

                    Spacer()

                    // Quick action buttons row
                    HStack(spacing: 8) {
                        // Complete button (checkmark)
                        Button(action: onComplete) {
                            Image(systemName: "checkmark")
                                .font(.system(size: 12, weight: .bold))
                                .foregroundColor(.space)
                                .frame(width: 32, height: 32)
                                .background(
                                    Circle()
                                        .fill(Color.space.opacity(0.15))
                                )
                        }
                        .buttonStyle(.plain)

                        // Return to pipeline button
                        Button(action: onReturnToPipeline) {
                            Image(systemName: "arrow.right.circle")
                                .font(.system(size: 14, weight: .medium))
                                .foregroundColor(.ivory.opacity(0.5))
                                .frame(width: 32, height: 32)
                                .background(
                                    Circle()
                                        .fill(Color.white.opacity(0.08))
                                )
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .buttonStyle(.plain)

            // START button - Journey gradient (Self → Spirit)
            Button(action: onStart) {
                HStack(spacing: 8) {
                    Image(systemName: "play.fill")
                        .font(.system(size: 14, weight: .semibold))
                    Text("START")
                        .font(.subheadline.weight(.bold))
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(LinearGradient.journey)
                        .shadow(color: .selfPillar.opacity(0.3), radius: 8, y: 4)
                )
            }
            .buttonStyle(.plain)
        }
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(Color.selfPillar.opacity(0.12))
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .strokeBorder(Color.selfPillar.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

// MARK: - Filled Container Slot (task in remaining containers)

struct FilledContainerSlot: View {
    let task: FlowTask
    let onPromote: () -> Void

    var body: some View {
        Button(action: onPromote) {
            HStack(spacing: 12) {
                // Goal emoji
                if let goal = task.goal {
                    Text(goal.emoji)
                        .font(.system(size: 16))
                } else {
                    Text("🌀")
                        .font(.system(size: 16))
                        .opacity(0.4)
                }

                // Task title - allow wrapping for full visibility
                Text(task.title)
                    .font(.subheadline)
                    .foregroundColor(.ivory.opacity(0.8))
                    .multilineTextAlignment(.leading)
                    .fixedSize(horizontal: false, vertical: true)

                Spacer()

                // Duration
                Text("\(task.duration)m")
                    .font(.caption.monospacedDigit())
                    .foregroundColor(.ivory.opacity(0.4))

                // Lightning bolt to promote to ACT
                Image(systemName: "bolt.fill")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.selfPillar.opacity(0.7))
                    .frame(width: 28, height: 28)
                    .background(
                        Circle()
                            .fill(Color.selfPillar.opacity(0.15))
                    )
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(Color.white.opacity(0.03))
                    .overlay(
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .strokeBorder(Color.white.opacity(0.08), lineWidth: 0.5)
                    )
            )
        }
    }
}

// MARK: - Empty Container Slot (dashed outline)

struct EmptyContainerSlot: View {
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 12) {
                // Empty square icon
                Image(systemName: "square.dashed")
                    .font(.system(size: 16))
                    .foregroundColor(.ivory.opacity(0.2))

                Text("Empty slot")
                    .font(.subheadline)
                    .foregroundColor(.ivory.opacity(0.3))

                Spacer()

                // Pull arrow
                Image(systemName: "arrow.right.circle")
                    .font(.system(size: 14))
                    .foregroundColor(.selfPillar.opacity(0.4))
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .strokeBorder(Color.ivory.opacity(0.1), style: StrokeStyle(lineWidth: 1.5, dash: [6, 4]))
            )
        }
    }
}

// MARK: - Pipeline Picker Sheet

struct PipelinePickerSheet: View {
    let goals: [Goal]
    let pipelineTasks: [FlowTask]
    let selectedGoal: Binding<Goal?>
    let onSelect: (FlowTask) -> Void
    let onCreateNew: (String, Goal?) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var newTaskTitle = ""
    @State private var filterGoal: Goal?
    @State private var showAllGoals = true

    private var filteredTasks: [FlowTask] {
        if showAllGoals {
            return pipelineTasks
        } else if let goal = filterGoal {
            return pipelineTasks.filter { $0.goal?.id == goal.id }
        }
        return pipelineTasks
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.charcoal
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Quick add bar
                    HStack(spacing: 10) {
                        TextField("Quick add task...", text: $newTaskTitle)
                            .font(.subheadline)
                            .foregroundColor(.ivory)
                            .padding(.horizontal, 14)
                            .padding(.vertical, 12)
                            .background(Color.cardBackground)
                            .cornerRadius(10)

                        Button {
                            guard !newTaskTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
                            onCreateNew(newTaskTitle.trimmingCharacters(in: .whitespacesAndNewlines), filterGoal)
                            newTaskTitle = ""
                        } label: {
                            Image(systemName: "plus.circle.fill")
                                .font(.system(size: 28))
                                .foregroundColor(newTaskTitle.isEmpty ? .selfPillar.opacity(0.3) : .selfPillar)
                        }
                        .disabled(newTaskTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)

                    // Goal filter pills
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            // All option
                            Button {
                                showAllGoals = true
                                filterGoal = nil
                                HapticFeedback.selection()
                            } label: {
                                HStack(spacing: 4) {
                                    Text("🌀")
                                    Text("All")
                                }
                                .font(.caption.weight(.medium))
                                .foregroundColor(showAllGoals ? .white : .ivory.opacity(0.7))
                                .padding(.horizontal, 12)
                                .padding(.vertical, 8)
                                .background(showAllGoals ? Color.story : Color.cardBackground)
                                .cornerRadius(16)
                            }

                            ForEach(goals) { goal in
                                Button {
                                    showAllGoals = false
                                    filterGoal = goal
                                    HapticFeedback.selection()
                                } label: {
                                    HStack(spacing: 4) {
                                        Text(goal.emoji)
                                        Text(goal.title)
                                            .lineLimit(1)
                                    }
                                    .font(.caption.weight(.medium))
                                    .foregroundColor(!showAllGoals && filterGoal?.id == goal.id ? .white : .ivory.opacity(0.7))
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 8)
                                    .background(!showAllGoals && filterGoal?.id == goal.id ? Color.story : Color.cardBackground)
                                    .cornerRadius(16)
                                }
                            }
                        }
                        .padding(.horizontal, 16)
                    }
                    .padding(.bottom, 12)

                    // Tasks list
                    if filteredTasks.isEmpty {
                        VStack(spacing: 12) {
                            Spacer()
                            Image(systemName: "tray")
                                .font(.largeTitle)
                                .foregroundColor(.ivory.opacity(0.2))
                            Text("Pipeline is empty")
                                .font(.subheadline)
                                .foregroundColor(.ivory.opacity(0.4))
                            Text("Add a task above or pull from missions")
                                .font(.caption)
                                .foregroundColor(.ivory.opacity(0.3))
                            Spacer()
                        }
                        .frame(maxWidth: .infinity)
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 8) {
                                ForEach(filteredTasks) { task in
                                    PipelineTaskButton(task: task) {
                                        onSelect(task)
                                    }
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.bottom, 20)
                        }
                    }
                }
            }
            .navigationTitle("Pipeline")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(.ivory.opacity(0.7))
                }
            }
        }
        .presentationDetents([.medium, .large])
    }
}

// MARK: - Pipeline Task Button (for picker sheet)

struct PipelineTaskButton: View {
    let task: FlowTask
    let onSelect: () -> Void

    var body: some View {
        Button(action: onSelect) {
            HStack(spacing: 12) {
                // Goal emoji
                if let goal = task.goal {
                    Text(goal.emoji)
                        .font(.system(size: 18))
                } else {
                    Text("🌀")
                        .font(.system(size: 18))
                        .opacity(0.4)
                }

                // Task title
                VStack(alignment: .leading, spacing: 2) {
                    Text(task.title)
                        .font(.subheadline.weight(.medium))
                        .foregroundColor(.ivory)
                        .multilineTextAlignment(.leading)

                    if let goal = task.goal {
                        Text(goal.title)
                            .font(.caption)
                            .foregroundColor(.story.opacity(0.6))
                    }
                }

                Spacer()

                // Duration
                Text("\(task.duration)m")
                    .font(.caption.monospacedDigit())
                    .foregroundColor(.ivory.opacity(0.5))

                // Pull indicator
                Image(systemName: "arrow.right.circle.fill")
                    .font(.system(size: 20))
                    .foregroundColor(.selfPillar)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(Color.cardBackground)
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Completed Task Row

struct CompletedTaskRow: View {
    let task: FlowTask
    let onReopen: () -> Void

    @State private var showCheckAnimation = false

    var body: some View {
        HStack(spacing: 12) {
            // Checkmark
            ZStack {
                Circle()
                    .fill(Color.space)
                    .frame(width: 22, height: 22)

                Image(systemName: "checkmark")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.white)
                    .scaleEffect(showCheckAnimation ? 1.0 : 0.5)
                    .opacity(showCheckAnimation ? 1.0 : 0.5)
            }
            .onAppear {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                    showCheckAnimation = true
                }
            }

            // Mission emoji
            if let goal = task.goal {
                Text(goal.emoji)
                    .font(.system(size: 14))
                    .opacity(0.6)
            } else {
                Text("🌀")
                    .font(.system(size: 14))
                    .opacity(0.3)
            }

            // Task info - full title display
            Text(task.title)
                .font(.subheadline)
                .foregroundColor(.ivory.opacity(0.5))
                .strikethrough(true, color: .ivory.opacity(0.3))
                .multilineTextAlignment(.leading)
                .fixedSize(horizontal: false, vertical: true)

            Spacer()

            // Reps badge
            if task.totalReps > 0 {
                HStack(spacing: 3) {
                    Text("\(task.totalReps)")
                        .font(.caption.weight(.semibold))
                        .foregroundColor(.amber)
                    Image(systemName: "bolt.fill")
                        .font(.system(size: 8))
                        .foregroundColor(.amber.opacity(0.7))
                }
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(
                    Capsule()
                        .fill(Color.amber.opacity(0.15))
                )
            }

            // Time spent
            if task.totalSessionTime > 0 {
                Text("\(task.totalSessionTime)m")
                    .font(.caption.monospacedDigit())
                    .foregroundColor(.space.opacity(0.6))
            }

            // Reopen button
            Button(action: onReopen) {
                Image(systemName: "arrow.uturn.backward")
                    .font(.system(size: 10))
                    .foregroundColor(.ivory.opacity(0.3))
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .fill(Color.space.opacity(0.08))
        )
    }
}

#Preview {
    FlowView()
        .environmentObject(AppState())
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
