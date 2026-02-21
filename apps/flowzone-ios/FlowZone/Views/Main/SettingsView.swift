//
//  SettingsView.swift
//  FlowZone
//
//  Settings sanctuary - organized, precise, minimal
//  Observatory aesthetic with 4 toggle tabs
//

import SwiftUI
import SwiftData

// MARK: - Completed Tasks View Mode
enum CompletedViewMode: String, CaseIterable {
    case recent = "Recent"
    case allTime = "All Time"
}

struct SettingsView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.modelContext) private var modelContext
    @Query private var settingsQuery: [AppSettings]
    @Query private var profiles: [Profile]
    @Query(filter: #Predicate<Goal> { $0.statusRaw == "active" }, sort: \Goal.sortOrder)
    private var goals: [Goal]
    @Query(sort: \FlowTask.sortOrder)
    private var allTasks: [FlowTask]

    private var settings: AppSettings? { settingsQuery.first }
    private var profile: Profile? { profiles.first }

    @State private var selectedPanel: SettingsPanel = .settings
    @State private var showAddGoal = false
    @State private var editingGoal: Goal?
    @State private var isEditingVision = false
    @State private var editedVision = ""

    // ACT Panel State (Pipeline + Containers)
    @State private var quickAddText = ""
    @State private var quickAddGoal: Goal?
    @State private var selectedGoalFilter: Goal?  // nil = show all
    @State private var showAllGoals = true
    @State private var showPipelineSection = true
    @State private var showCompletedSection = true
    @State private var completedViewMode: CompletedViewMode = .recent
    @State private var editingTask: FlowTask?

    var body: some View {
        ZStack {
            // Observatory background with space glow
            ObservatoryBackground(glowColor: .space, glowPosition: .topLeading)

            VStack(spacing: 0) {
                // Header
                headerSection
                    .padding(.top, 8)
                    .padding(.horizontal, 16)

                // Panel Tabs
                panelTabs
                    .padding(.top, 12)
                    .padding(.horizontal, 16)

                // Dynamic Content
                ScrollView(showsIndicators: false) {
                    VStack(spacing: 16) {
                        switch selectedPanel {
                        case .act:
                            actPanel
                        case .settings:
                            settingsPanel
                        case .mission:
                            missionPanel
                        case .vision:
                            visionPanel
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 16)
                    .padding(.bottom, 32)
                }
            }
        }
        .onAppear {
            // Check if navigating from FlowView
            if let navigatePanel = appState.navigateToSettingsPanel {
                selectedPanel = navigatePanel
                appState.navigateToSettingsPanel = nil
            } else if let defaultPanel = settings?.defaultSettingsPanel {
                selectedPanel = defaultPanel
            }
        }
        .onChange(of: appState.navigateToSettingsPanel) { _, newPanel in
            if let panel = newPanel {
                selectedPanel = panel
                appState.navigateToSettingsPanel = nil
            }
        }
        .sheet(isPresented: $showAddGoal) {
            AddGoalView()
        }
        .sheet(item: $editingGoal) { goal in
            EditGoalView(goal: goal)
        }
        .sheet(item: $editingTask) { task in
            TaskEditSheet(task: task, defaultGoal: task.goal, defaultToToday: task.status == .container)
        }
    }

    // MARK: - Header

    private var headerSection: some View {
        HStack(alignment: .center) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Control")
                    .font(.largeTitle.weight(.bold))
                    .foregroundColor(.ivory)

                Text("Manage your flow")
                    .font(.subheadline)
                    .foregroundColor(.ivory.opacity(0.6))
            }

            Spacer()
        }
        .padding(.horizontal, 4)
    }

    // MARK: - Panel Tabs

    private var panelTabs: some View {
        HStack(spacing: 6) {
            ForEach(SettingsPanel.allCases) { panel in
                Button {
                    withAnimation(.spring(response: 0.3)) {
                        selectedPanel = panel
                    }
                    HapticFeedback.selection()
                } label: {
                    VStack(spacing: 4) {
                        Image(systemName: panel.iconName)
                            .font(.system(size: 14, weight: .semibold))
                        Text(panel.displayName)
                            .font(.system(size: 9, weight: .bold))
                    }
                    .foregroundColor(selectedPanel == panel ? .white : panel.color)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 10)
                    .background(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(selectedPanel == panel ? panel.color : panel.color.opacity(0.15))
                    )
                }
            }
        }
    }

    // MARK: - ACT Panel (Container Settings + Pipeline)

    // Computed properties for task filtering

    // Pipeline tasks (waiting to be pulled into containers)
    private var pipelineTasks: [FlowTask] {
        var tasks = allTasks.filter { $0.status == .pipeline }
            .sorted { $0.sortOrder < $1.sortOrder }

        // Apply goal filter if selected
        if let goal = selectedGoalFilter {
            tasks = tasks.filter { $0.goal?.id == goal.id }
        }

        return tasks
    }

    // Completed tasks with recent/all-time filtering
    private var completedTasks: [FlowTask] {
        let completed = allTasks.filter { $0.status == .completed }
            .sorted { ($0.completedAt ?? .distantPast) > ($1.completedAt ?? .distantPast) }

        if completedViewMode == .recent {
            let sevenDaysAgo = Calendar.current.date(byAdding: .day, value: -7, to: Date()) ?? Date()
            return completed.filter { ($0.completedAt ?? .distantPast) >= sevenDaysAgo }
        }

        return completed
    }

    // All completed count for stats
    private var allCompletedCount: Int {
        allTasks.filter { $0.status == .completed }.count
    }

    private var actPanel: some View {
        VStack(spacing: 12) {
            // Container Settings Card
            containerSettingsCard

            // Duration Settings Card
            durationSettingsCard

            // Breathwork & Sound Card
            breathworkSoundCard

            // Pipeline Section
            pipelineSectionCard

            // Completed Section
            completedSectionCard
        }
    }

    // MARK: - Container Settings Card

    private var containerSettingsCard: some View {
        VStack(spacing: 14) {
            // Header
            HStack(spacing: 8) {
                Image(systemName: "square.stack.3d.up.fill")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.selfPillar)

                Text("DAILY CONTAINERS")
                    .font(.caption.weight(.bold))
                    .foregroundColor(.selfPillar)

                Spacer()
            }

            // Container count selector
            HStack(spacing: 8) {
                ForEach(AppSettings.containerPresets, id: \.self) { count in
                    Button {
                        settings?.dailyContainerCount = count
                        try? modelContext.save()
                        HapticFeedback.selection()
                    } label: {
                        Text("\(count)")
                            .font(.title3.weight(.bold).monospacedDigit())
                            .foregroundColor(settings?.dailyContainerCount == count ? .white : .selfPillar)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(
                                RoundedRectangle(cornerRadius: 12, style: .continuous)
                                    .fill(settings?.dailyContainerCount == count ? Color.selfPillar : Color.selfPillar.opacity(0.12))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                                            .strokeBorder(Color.selfPillar.opacity(settings?.dailyContainerCount == count ? 0 : 0.3), lineWidth: 1)
                                    )
                            )
                    }
                }
            }

            // Description
            Text("\(settings?.dailyContainerCount ?? 3) focus sessions per day")
                .font(.caption)
                .foregroundColor(.ivory.opacity(0.5))
        }
        .padding(16)
        .glassCard(tint: .selfPillar, cornerRadius: 16)
    }

    // MARK: - Duration Settings Card

    private var durationSettingsCard: some View {
        VStack(spacing: 12) {
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "timer")
                        .font(.system(size: 12))
                        .foregroundColor(.selfPillar)

                    Text("Default Duration")
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.ivory)
                }
                Spacer()
            }

            HStack(spacing: 8) {
                ForEach(AppSettings.timerPresets, id: \.self) { duration in
                    Button {
                        settings?.timerDuration = duration
                        try? modelContext.save()
                        HapticFeedback.selection()
                    } label: {
                        VStack(spacing: 2) {
                            Text("\(duration)")
                                .font(.headline.weight(.bold).monospacedDigit())
                                .foregroundColor(settings?.timerDuration == duration ? .white : .selfPillar)
                            Text("min")
                                .font(.caption2)
                                .foregroundColor(settings?.timerDuration == duration ? .white.opacity(0.7) : .selfPillar.opacity(0.6))
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .fill(settings?.timerDuration == duration ? Color.selfPillar : Color.selfPillar.opacity(0.1))
                        )
                    }
                }
            }
        }
        .padding(14)
        .glassCard(cornerRadius: 16)
    }

    // MARK: - Breathwork & Sound Card (ACT Panel)

    private var breathworkSoundCard: some View {
        VStack(spacing: 12) {
            // Breathwork
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "wind")
                        .font(.system(size: 11))
                        .foregroundColor(.space)
                    Text("Breathwork")
                        .font(.caption.weight(.medium))
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
                            .font(.caption)
                            .tag(pattern)
                    }
                }
                .pickerStyle(.menu)
                .tint(.space)
            }

            Divider()
                .background(Color.white.opacity(0.1))

            // Binaural Beats
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "waveform.circle")
                        .font(.system(size: 11))
                        .foregroundColor(.spirit)
                    VStack(alignment: .leading, spacing: 1) {
                        Text("Binaural Beats")
                            .font(.caption.weight(.medium))
                            .foregroundColor(.ivory.opacity(0.8))
                        Text("10 Hz flow state audio")
                            .font(.caption2)
                            .foregroundColor(.ivory.opacity(0.4))
                    }
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
        }
        .padding(14)
        .glassCard(tint: .space, cornerRadius: 16)
    }

    // MARK: - Pipeline Section Card

    private var pipelineSectionCard: some View {
        VStack(spacing: 0) {
            // Header
            Button {
                withAnimation(.spring(response: 0.3)) {
                    showPipelineSection.toggle()
                }
                HapticFeedback.light()
            } label: {
                HStack {
                    HStack(spacing: 8) {
                        Image(systemName: showPipelineSection ? "chevron.down" : "chevron.right")
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundColor(.selfPillar.opacity(0.6))

                        Image(systemName: "arrow.right.circle.fill")
                            .font(.system(size: 14))
                            .foregroundColor(.selfPillar)

                        Text("PIPELINE")
                            .font(.caption.weight(.bold))
                            .foregroundColor(.selfPillar)

                        Text("(\(pipelineTasks.count))")
                            .font(.caption)
                            .foregroundColor(.selfPillar.opacity(0.6))
                    }

                    Spacer()

                    Text("Ready to flow")
                        .font(.caption2)
                        .foregroundColor(.ivory.opacity(0.4))
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)

            if showPipelineSection {
                // Goal filter pills
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        // ALL goals pill
                        Button {
                            showAllGoals = true
                            selectedGoalFilter = nil
                            HapticFeedback.selection()
                        } label: {
                            Text("🌀")
                                .font(.system(size: 16))
                                .frame(width: 32, height: 32)
                                .background(
                                    Circle()
                                        .fill(showAllGoals ? Color.story : Color.story.opacity(0.15))
                                )
                        }

                        ForEach(goals) { goal in
                            Button {
                                if selectedGoalFilter?.id == goal.id {
                                    showAllGoals = true
                                    selectedGoalFilter = nil
                                } else {
                                    showAllGoals = false
                                    selectedGoalFilter = goal
                                }
                                HapticFeedback.selection()
                            } label: {
                                Text(goal.emoji)
                                    .font(.system(size: 16))
                                    .frame(width: 32, height: 32)
                                    .background(
                                        Circle()
                                            .fill(!showAllGoals && selectedGoalFilter?.id == goal.id ? Color.story : Color.story.opacity(0.15))
                                    )
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                }
                .padding(.bottom, 10)

                if pipelineTasks.isEmpty {
                    VStack(spacing: 8) {
                        Text("Pipeline is empty")
                            .font(.subheadline)
                            .foregroundColor(.ivory.opacity(0.4))
                        Text("Add tasks below")
                            .font(.caption)
                            .foregroundColor(.ivory.opacity(0.3))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .transition(.opacity.combined(with: .move(edge: .top)))
                } else {
                    VStack(spacing: 6) {
                        ForEach(pipelineTasks) { task in
                            PipelineTaskRow(
                                task: task,
                                showGoal: showAllGoals,
                                onTap: {
                                    editingTask = task
                                    HapticFeedback.light()
                                },
                                onDelete: {
                                    modelContext.delete(task)
                                    try? modelContext.save()
                                    HapticFeedback.light()
                                }
                            )
                        }
                    }
                    .padding(.horizontal, 12)
                    .transition(.opacity.combined(with: .move(edge: .top)))
                }

                // Quick Add Bar
                pipelineQuickAddBar
                    .padding(.horizontal, 12)
                    .padding(.vertical, 12)
            }
        }
        .glassCard(tint: .selfPillar, cornerRadius: 20)
    }

    // MARK: - Pipeline Quick Add Bar

    private var pipelineQuickAddBar: some View {
        HStack(spacing: 10) {
            // Text Input
            HStack(spacing: 8) {
                Image(systemName: "plus")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(.selfPillar)

                TextField("Add to pipeline...", text: $quickAddText)
                    .font(.subheadline)
                    .foregroundColor(.ivory)
                    .submitLabel(.done)
                    .onSubmit {
                        submitQuickAdd()
                    }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(Color.white.opacity(0.05))
            .cornerRadius(10)

            // Goal Picker (compact)
            Menu {
                Button {
                    quickAddGoal = nil
                    HapticFeedback.selection()
                } label: {
                    HStack {
                        Text("🌀")
                        Text("No Mission")
                        if quickAddGoal == nil {
                            Image(systemName: "checkmark")
                        }
                    }
                }

                Divider()

                ForEach(goals) { goal in
                    Button {
                        quickAddGoal = goal
                        HapticFeedback.selection()
                    } label: {
                        HStack {
                            Text(goal.emoji)
                            Text(goal.title)
                            if quickAddGoal?.id == goal.id {
                                Image(systemName: "checkmark")
                            }
                        }
                    }
                }
            } label: {
                Text(quickAddGoal?.emoji ?? "🌀")
                    .font(.system(size: 16))
                    .frame(width: 36, height: 36)
                    .background(Color.white.opacity(0.05))
                    .cornerRadius(8)
            }

            // Submit Button
            Button {
                submitQuickAdd()
            } label: {
                Image(systemName: "arrow.up.circle.fill")
                    .font(.system(size: 28))
                    .foregroundColor(quickAddText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? .ivory.opacity(0.2) : .selfPillar)
            }
            .disabled(quickAddText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
    }

    private func submitQuickAdd() {
        let trimmed = quickAddText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }

        // Find the lowest sort order to add at end of pipeline
        let minSortOrder = allTasks.filter { $0.status == .pipeline }.map { $0.sortOrder }.min() ?? 0

        let task = FlowTask(
            title: trimmed,
            goal: quickAddGoal,
            duration: settings?.timerDuration ?? 25,
            status: .pipeline
        )
        task.sortOrder = minSortOrder - 1

        modelContext.insert(task)
        try? modelContext.save()

        quickAddText = ""
        HapticFeedback.success()
    }

    // MARK: - Completed Section Card

    private var completedSectionCard: some View {
        VStack(spacing: 0) {
            // Header with toggle
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

                        Text("COMPLETED")
                            .font(.caption.weight(.bold))
                            .foregroundColor(.space)

                        Text("(\(completedTasks.count))")
                            .font(.caption)
                            .foregroundColor(.space.opacity(0.6))
                    }

                    Spacer()

                    // Recent / All Time toggle
                    Menu {
                        Button {
                            completedViewMode = .recent
                            HapticFeedback.selection()
                        } label: {
                            HStack {
                                Text("Recent (7 days)")
                                if completedViewMode == .recent {
                                    Image(systemName: "checkmark")
                                }
                            }
                        }

                        Button {
                            completedViewMode = .allTime
                            HapticFeedback.selection()
                        } label: {
                            HStack {
                                Text("All Time")
                                if completedViewMode == .allTime {
                                    Image(systemName: "checkmark")
                                }
                            }
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Text(completedViewMode.rawValue)
                                .font(.caption2.weight(.medium))
                                .foregroundColor(.space)
                            Image(systemName: "chevron.down")
                                .font(.system(size: 8, weight: .bold))
                                .foregroundColor(.space.opacity(0.5))
                        }
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.space.opacity(0.15))
                        .cornerRadius(6)
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)

            if showCompletedSection {
                if completedTasks.isEmpty {
                    VStack(spacing: 8) {
                        Text("No completed tasks")
                            .font(.subheadline)
                            .foregroundColor(.ivory.opacity(0.4))
                        Text(completedViewMode == .recent ? "in the last 7 days" : "yet")
                            .font(.caption)
                            .foregroundColor(.ivory.opacity(0.3))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 20)
                    .transition(.opacity.combined(with: .move(edge: .top)))
                } else {
                    VStack(spacing: 6) {
                        ForEach(completedTasks) { task in
                            CompletedTaskRowSettings(task: task) {
                                task.reopen()
                                try? modelContext.save()
                                HapticFeedback.light()
                            }
                        }

                        // Clear completed button
                        if !completedTasks.isEmpty {
                            Button {
                                clearCompletedTasks()
                            } label: {
                                HStack(spacing: 6) {
                                    Image(systemName: "trash")
                                        .font(.system(size: 11))
                                    Text("Clear completed")
                                        .font(.caption.weight(.medium))
                                }
                                .foregroundColor(.red.opacity(0.7))
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 10)
                                .background(Color.red.opacity(0.08))
                                .cornerRadius(10)
                            }
                            .padding(.top, 6)
                        }
                    }
                    .padding(.horizontal, 12)
                    .padding(.bottom, 14)
                    .transition(.opacity.combined(with: .move(edge: .top)))
                }
            }
        }
        .glassCard(tint: .space, cornerRadius: 20)
    }

    private func clearCompletedTasks() {
        let tasksToDelete = completedTasks
        for task in tasksToDelete {
            modelContext.delete(task)
        }
        try? modelContext.save()
        HapticFeedback.success()
    }

    // MARK: - SETTINGS Panel

    private var settingsPanel: some View {
        VStack(spacing: 10) {
            // Focus Duration
            focusDurationCard

            // Breathwork
            breathworkCard

            // Binaural Beats
            binauralCard

            // Default Panel Setting
            defaultPanelCard

            // About
            aboutCard
        }
    }

    private var binauralCard: some View {
        VStack(spacing: 10) {
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "waveform.circle.fill")
                        .font(.system(size: 12))
                        .foregroundColor(.spirit)

                    Text("Binaural Beats")
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.ivory)
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
            .padding(.horizontal, 14)
            .padding(.top, 12)

            VStack(alignment: .leading, spacing: 8) {
                Text("Plays 10 Hz alpha waves during focus sessions to help induce flow state. Use headphones for best effect.")
                    .font(.caption)
                    .foregroundColor(.ivory.opacity(0.5))
                    .fixedSize(horizontal: false, vertical: true)

                if settings?.sound == .binaural {
                    // Volume slider
                    HStack {
                        Text("Volume")
                            .font(.caption2)
                            .foregroundColor(.ivory.opacity(0.5))
                        Spacer()
                        Text("\(Int((settings?.volume ?? 0.3) * 100))%")
                            .font(.caption2.monospacedDigit())
                            .foregroundColor(.spirit)
                    }

                    Slider(
                        value: Binding(
                            get: { settings?.volume ?? 0.3 },
                            set: { newValue in
                                settings?.volume = newValue
                                try? modelContext.save()
                            }
                        ),
                        in: 0.1...0.6
                    )
                    .tint(.spirit)
                }
            }
            .padding(.horizontal, 14)
            .padding(.bottom, 12)
        }
        .glassCard(tint: .spirit, cornerRadius: 16)
    }

    private var focusDurationCard: some View {
        VStack(spacing: 12) {
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "timer")
                        .font(.system(size: 12))
                        .foregroundColor(.space)

                    Text("Focus Duration")
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.ivory)
                }
                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.top, 12)

            HStack(spacing: 8) {
                ForEach(AppSettings.timerPresets, id: \.self) { duration in
                    TimerPresetButton(
                        duration: duration,
                        isSelected: settings?.timerDuration == duration,
                        accentColor: .space
                    ) {
                        settings?.timerDuration = duration
                        try? modelContext.save()
                        HapticFeedback.selection()
                    }
                }
            }
            .padding(.horizontal, 14)
            .padding(.bottom, 12)
        }
        .glassCard(tint: .space, cornerRadius: 16)
    }

    private var breathworkCard: some View {
        VStack(spacing: 10) {
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "wind")
                        .font(.system(size: 12))
                        .foregroundColor(.space)

                    Text("Breathwork")
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.ivory)
                }
                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.top, 12)

            VStack(spacing: 10) {
                // Before Focus
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Before Focus")
                            .font(.caption.weight(.medium))
                            .foregroundColor(.ivory)
                        Text("Calm your mind to prepare")
                            .font(.caption2)
                            .foregroundColor(.ivory.opacity(0.4))
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
                                .font(.caption)
                                .tag(pattern)
                        }
                    }
                    .pickerStyle(.menu)
                    .tint(.space)
                    .font(.caption)
                }
                .padding(.horizontal, 14)

                Rectangle()
                    .fill(Color.white.opacity(0.06))
                    .frame(height: 1)
                    .padding(.horizontal, 14)

                // After Focus
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("After Focus")
                            .font(.caption.weight(.medium))
                            .foregroundColor(.ivory)
                        Text("Reset and recover")
                            .font(.caption2)
                            .foregroundColor(.ivory.opacity(0.4))
                    }
                    Spacer()
                    Picker("After", selection: Binding(
                        get: { settings?.breathworkAfter ?? .none },
                        set: { newValue in
                            settings?.breathworkAfter = newValue
                            try? modelContext.save()
                        }
                    )) {
                        ForEach(BreathworkPattern.afterPatterns) { pattern in
                            Text(pattern.displayName)
                                .font(.caption)
                                .tag(pattern)
                        }
                    }
                    .pickerStyle(.menu)
                    .tint(.space)
                    .font(.caption)
                }
                .padding(.horizontal, 14)
            }
            .padding(.bottom, 12)
        }
        .glassCard(tint: .space, cornerRadius: 16)
    }

    private var defaultPanelCard: some View {
        VStack(spacing: 0) {
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "house.fill")
                        .font(.system(size: 12))
                        .foregroundColor(.space)

                    Text("Default Panel")
                        .font(.caption.weight(.medium))
                        .foregroundColor(.ivory.opacity(0.7))
                }
                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.top, 10)

            HStack(spacing: 6) {
                ForEach(SettingsPanel.allCases) { panel in
                    Button {
                        settings?.defaultSettingsPanel = panel
                        try? modelContext.save()
                        HapticFeedback.selection()
                    } label: {
                        VStack(spacing: 3) {
                            Image(systemName: panel.iconName)
                                .font(.system(size: 12))
                            Text(panel.displayName)
                                .font(.system(size: 8, weight: .medium))
                        }
                        .foregroundColor(settings?.defaultSettingsPanel == panel ? .white : panel.color)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 8)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill(settings?.defaultSettingsPanel == panel ? panel.color : panel.color.opacity(0.15))
                        )
                        .overlay(
                            settings?.defaultSettingsPanel == panel ?
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 10))
                                .foregroundColor(.white)
                                .offset(x: 16, y: -12) : nil
                        )
                    }
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
        }
        .glassCard(tint: .space, cornerRadius: 16)
    }

    private var aboutCard: some View {
        VStack(spacing: 0) {
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "info.circle")
                        .font(.system(size: 12))
                        .foregroundColor(.space)

                    Text("About")
                        .font(.caption.weight(.medium))
                        .foregroundColor(.ivory.opacity(0.7))
                }
                Spacer()
            }
            .padding(.horizontal, 14)
            .padding(.top, 10)

            VStack(spacing: 8) {
                HStack {
                    Text("Version")
                        .font(.caption)
                        .foregroundColor(.ivory.opacity(0.7))
                    Spacer()
                    Text("1.0.0")
                        .font(.caption.monospacedDigit())
                        .foregroundColor(.ivory.opacity(0.4))
                }
                .padding(.horizontal, 14)

                Link(destination: URL(string: "https://fourflowos.com")!) {
                    HStack {
                        Text("fourflowos.com")
                            .font(.caption)
                            .foregroundColor(.space)
                        Spacer()
                        Image(systemName: "arrow.up.right")
                            .font(.caption2)
                            .foregroundColor(.space.opacity(0.5))
                    }
                    .padding(.horizontal, 14)
                }

                Link(destination: URL(string: "https://fourflowos.com/privacy")!) {
                    HStack {
                        Text("Privacy Policy")
                            .font(.caption)
                            .foregroundColor(.space)
                        Spacer()
                        Image(systemName: "arrow.up.right")
                            .font(.caption2)
                            .foregroundColor(.space.opacity(0.5))
                    }
                    .padding(.horizontal, 14)
                }

                Link(destination: URL(string: "mailto:support@fourflowos.com")!) {
                    HStack {
                        Text("Contact Support")
                            .font(.caption)
                            .foregroundColor(.space)
                        Spacer()
                        Image(systemName: "envelope")
                            .font(.caption2)
                            .foregroundColor(.space.opacity(0.5))
                    }
                    .padding(.horizontal, 14)
                }
            }
            .padding(.vertical, 10)
        }
        .glassCard(tint: .space, cornerRadius: 16)
    }

    // MARK: - MISSION Panel (Goals)

    private var missionPanel: some View {
        VStack(spacing: 16) {
            // Goals List
            goalsListCard

            // Add Goal button
            if goals.count < 5 {
                Button {
                    showAddGoal = true
                    HapticFeedback.light()
                } label: {
                    HStack {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 18))
                        Text("Add New Goal")
                            .font(.subheadline.weight(.medium))
                    }
                    .foregroundColor(.story)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .strokeBorder(Color.story.opacity(0.3), style: StrokeStyle(lineWidth: 1.5, dash: [6]))
                    )
                }
            }
        }
    }

    private var goalsListCard: some View {
        VStack(spacing: 0) {
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "flag.fill")
                        .font(.system(size: 14))
                        .foregroundColor(.story)

                    Text("Your Goals")
                        .font(.headline.weight(.semibold))
                        .foregroundColor(.ivory)
                }

                Spacer()

                Text("\(goals.count)/5")
                    .font(.caption)
                    .foregroundColor(.ivory.opacity(0.4))
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)
            .padding(.bottom, 12)

            if goals.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "target")
                        .font(.title)
                        .foregroundColor(.ivory.opacity(0.3))

                    Text("No goals yet")
                        .font(.subheadline)
                        .foregroundColor(.ivory.opacity(0.5))
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 32)
            } else {
                VStack(spacing: 8) {
                    ForEach(goals) { goal in
                        EditableGoalRow(goal: goal) {
                            editingGoal = goal
                        }
                    }
                }
                .padding(.horizontal, 12)
                .padding(.bottom, 14)
            }
        }
        .glassCard(tint: .story, cornerRadius: 20)
    }

    // MARK: - VISION Panel

    private var visionPanel: some View {
        VStack(spacing: 16) {
            visionEditCard
        }
    }

    private var visionEditCard: some View {
        VStack(spacing: 0) {
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "sparkles")
                        .font(.system(size: 14))
                        .foregroundColor(.spirit)

                    Text("Your Vision")
                        .font(.headline.weight(.semibold))
                        .foregroundColor(.ivory)
                }

                Spacer()

                Button {
                    if isEditingVision {
                        saveVision()
                    } else {
                        editedVision = profile?.vision ?? ""
                        isEditingVision = true
                    }
                    HapticFeedback.light()
                } label: {
                    Text(isEditingVision ? "Save" : "Edit")
                        .font(.caption.weight(.semibold))
                        .foregroundColor(.spirit)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.spirit.opacity(0.15))
                        .clipShape(Capsule())
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)

            VStack(alignment: .leading, spacing: 12) {
                Text("Describe your ideal future")
                    .font(.caption)
                    .foregroundColor(.ivory.opacity(0.5))

                if isEditingVision {
                    TextEditor(text: $editedVision)
                        .font(.subheadline)
                        .foregroundColor(.ivory)
                        .scrollContentBackground(.hidden)
                        .background(Color.charcoal)
                        .frame(minHeight: 150)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.spirit.opacity(0.3), lineWidth: 1)
                        )
                } else {
                    Text(profile?.vision.isEmpty == false ? profile!.vision : "Tap Edit to write your vision...")
                        .font(.subheadline)
                        .foregroundColor(profile?.vision.isEmpty == false ? .ivory.opacity(0.8) : .ivory.opacity(0.4))
                        .italic(profile?.vision.isEmpty != false)
                        .frame(maxWidth: .infinity, minHeight: 100, alignment: .topLeading)
                        .padding(12)
                        .background(Color.charcoal)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.white.opacity(0.1), lineWidth: 1)
                        )
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
        .glassCard(tint: .spirit, cornerRadius: 20)
    }

    private func saveVision() {
        if let existingProfile = profile {
            existingProfile.update(vision: editedVision)
        } else {
            let newProfile = Profile(vision: editedVision)
            modelContext.insert(newProfile)
        }
        try? modelContext.save()
        isEditingVision = false
        HapticFeedback.success()
    }
}

// MARK: - Pipeline Task Row (for Pipeline with drag handle)

struct PipelineTaskRow: View {
    let task: FlowTask
    let showGoal: Bool
    let onTap: () -> Void
    let onDelete: () -> Void

    @State private var offset: CGFloat = 0
    @State private var isShowingActions = false

    var body: some View {
        ZStack(alignment: .trailing) {
            // Background delete action (revealed on swipe)
            HStack(spacing: 0) {
                Spacer()
                Button {
                    onDelete()
                    withAnimation { offset = 0 }
                } label: {
                    Image(systemName: "trash.fill")
                        .font(.system(size: 14))
                        .foregroundColor(.white)
                        .frame(width: 60, height: 46)
                        .background(Color.red.opacity(0.8))
                }
            }
            .cornerRadius(12)

            // Main content
            Button(action: onTap) {
                HStack(spacing: 10) {
                    // Drag handle (visual indicator)
                    Image(systemName: "line.3.horizontal")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(.ivory.opacity(0.2))
                        .frame(width: 16)

                    // Goal emoji
                    if showGoal {
                        Text(task.goal?.emoji ?? "🌀")
                            .font(.system(size: 14))
                            .opacity(task.goal == nil ? 0.4 : 1)
                    }

                    // Task title
                    Text(task.title)
                        .font(.subheadline)
                        .foregroundColor(.ivory.opacity(0.8))
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                        .frame(maxWidth: .infinity, alignment: .leading)

                    // Duration
                    Text("\(task.duration)m")
                        .font(.caption.monospacedDigit())
                        .foregroundColor(.ivory.opacity(0.35))
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(Color.white.opacity(0.03))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .strokeBorder(Color.white.opacity(0.06), lineWidth: 0.5)
                        )
                )
            }
            .buttonStyle(.plain)
            .offset(x: offset)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        if value.translation.width < 0 {
                            offset = max(value.translation.width, -70)
                        }
                    }
                    .onEnded { value in
                        withAnimation(.spring(response: 0.3)) {
                            if value.translation.width < -35 {
                                offset = -60
                                isShowingActions = true
                            } else {
                                offset = 0
                                isShowingActions = false
                            }
                        }
                    }
            )
            .onTapGesture {
                if isShowingActions {
                    withAnimation(.spring(response: 0.3)) {
                        offset = 0
                        isShowingActions = false
                    }
                } else {
                    onTap()
                }
            }
        }
    }
}

// MARK: - Completed Task Row (for Settings ACT panel)

struct CompletedTaskRowSettings: View {
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

            // Goal emoji
            Text(task.goal?.emoji ?? "🌀")
                .font(.system(size: 14))
                .opacity(task.goal == nil ? 0.3 : 0.6)

            // Task title
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

// MARK: - Editable Goal Row

struct EditableGoalRow: View {
    let goal: Goal
    let onEdit: () -> Void

    var body: some View {
        Button(action: onEdit) {
            HStack(spacing: 12) {
                Text(goal.emoji)
                    .font(.title2)

                VStack(alignment: .leading, spacing: 2) {
                    Text(goal.title)
                        .font(.subheadline.weight(.medium))
                        .foregroundColor(.ivory)
                        .lineLimit(1)

                    if !goal.why.isEmpty {
                        Text(goal.why)
                            .font(.caption)
                            .foregroundColor(.ivory.opacity(0.4))
                            .lineLimit(1)
                    }
                }

                Spacer()

                // Task count
                HStack(spacing: 4) {
                    Text("\(goal.tasks.count)")
                        .font(.caption.weight(.medium))
                        .foregroundColor(.story.opacity(0.7))
                    Image(systemName: "list.bullet")
                        .font(.system(size: 10))
                        .foregroundColor(.story.opacity(0.5))
                }

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.ivory.opacity(0.3))
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(Color.story.opacity(0.1))
            )
        }
    }
}

// MARK: - Edit Goal View

struct EditGoalView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    let goal: Goal

    @State private var title: String
    @State private var why: String
    @State private var emoji: String
    @State private var showEmojiPicker = false
    @State private var showDeleteConfirm = false

    init(goal: Goal) {
        self.goal = goal
        _title = State(initialValue: goal.title)
        _why = State(initialValue: goal.why)
        _emoji = State(initialValue: goal.emoji)
    }

    private var isValid: Bool {
        !title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.charcoal
                    .ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        // Emoji & Title
                        VStack(spacing: 16) {
                            Button {
                                showEmojiPicker = true
                            } label: {
                                Text(emoji)
                                    .font(.system(size: 48))
                                    .frame(width: 80, height: 80)
                                    .background(Color.cardBackground)
                                    .cornerRadius(20)
                            }

                            TextField("Goal title", text: $title)
                                .font(.title3.weight(.medium))
                                .foregroundColor(.ivory)
                                .multilineTextAlignment(.center)
                                .padding()
                                .background(Color.cardBackground)
                                .cornerRadius(12)
                        }
                        .padding(.top, 16)

                        // Why
                        VStack(alignment: .leading, spacing: 8) {
                            Text("WHY")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.story.opacity(0.8))

                            TextField("Why is this important to you?", text: $why, axis: .vertical)
                                .font(.subheadline)
                                .foregroundColor(.ivory)
                                .lineLimit(3...6)
                                .padding()
                                .background(Color.cardBackground)
                                .cornerRadius(12)
                        }

                        // Delete button
                        Button(role: .destructive) {
                            showDeleteConfirm = true
                        } label: {
                            HStack {
                                Image(systemName: "trash")
                                Text("Delete Goal")
                            }
                            .font(.subheadline.weight(.medium))
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.red.opacity(0.1))
                            .cornerRadius(12)
                        }
                        .padding(.top, 8)
                    }
                    .padding()
                }
            }
            .navigationTitle("Edit Goal")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(.ivory.opacity(0.7))
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveChanges()
                    }
                    .foregroundColor(isValid ? .story : .ivory.opacity(0.3))
                    .disabled(!isValid)
                }
            }
            .sheet(isPresented: $showEmojiPicker) {
                EmojiPickerView(selectedEmoji: $emoji)
            }
            .alert("Delete Goal?", isPresented: $showDeleteConfirm) {
                Button("Cancel", role: .cancel) { }
                Button("Delete", role: .destructive) {
                    deleteGoal()
                }
            } message: {
                Text("This will also delete all tasks associated with this goal.")
            }
        }
    }

    private func saveChanges() {
        goal.title = title.trimmingCharacters(in: .whitespacesAndNewlines)
        goal.emoji = emoji
        goal.why = why.trimmingCharacters(in: .whitespacesAndNewlines)

        try? modelContext.save()
        HapticFeedback.success()
        dismiss()
    }

    private func deleteGoal() {
        modelContext.delete(goal)
        try? modelContext.save()
        HapticFeedback.success()
        dismiss()
    }
}

// MARK: - Supporting Views

struct TimerPresetButton: View {
    let duration: Int
    let isSelected: Bool
    var accentColor: Color = .selfPillar
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 2) {
                Text("\(duration)")
                    .font(.headline.weight(.bold).monospacedDigit())
                    .foregroundColor(isSelected ? .white : accentColor)

                Text("min")
                    .font(.caption2)
                    .foregroundColor(isSelected ? .white.opacity(0.7) : accentColor.opacity(0.6))
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .fill(isSelected ? accentColor : accentColor.opacity(0.1))
                    .overlay(
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .strokeBorder(accentColor.opacity(isSelected ? 0 : 0.3), lineWidth: 0.5)
                    )
            )
        }
    }
}

#Preview {
    SettingsView()
        .environmentObject(AppState())
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
