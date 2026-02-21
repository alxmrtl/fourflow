//
//  PracticePickerView.swift
//  FlowHabits
//
//  Unified practice selection - works everywhere with contextual variations
//

import SwiftUI
import SwiftData

// MARK: - Picker Mode

enum PracticePickerMode {
    case compact    // Sheet presentation from Now/Tune tabs
    case immersive  // Full-screen embedded in Discover tab
}

// MARK: - Practice Picker View

struct PracticePickerView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    let mode: PracticePickerMode
    @State var selectedPillar: Pillar

    @Query private var existingHabits: [Habit]
    @State private var searchText = ""
    @State private var showingCustomInput = false
    @State private var customHabitName = ""
    @State private var customIconName = ""
    @State private var showingIconPicker = false
    @State private var selectedTemplate: FlowHabitTemplate? = nil

    private var catalog: CatalogService { CatalogService.shared }

    private var adoptedTemplateIds: Set<String> {
        Set(existingHabits.filter { $0.isActive }.compactMap { $0.templateId })
    }

    private var nextSortOrder: Int {
        (existingHabits.map(\.sortOrder).max() ?? 0) + 1
    }

    // Filtered practices based on search and pillar
    private var filteredPractices: [FlowHabitTemplate] {
        var practices = catalog.habits(for: selectedPillar)

        if !searchText.isEmpty {
            practices = practices.filter { $0.matches(query: searchText) }
        }

        return practices
    }

    // Adopted practices for current pillar (shown at top)
    private var adoptedPractices: [FlowHabitTemplate] {
        filteredPractices.filter { adoptedTemplateIds.contains($0.id) }
    }

    // Non-adopted practices for current pillar (shown by tier)
    private var nonAdoptedPractices: [FlowHabitTemplate] {
        filteredPractices.filter { !adoptedTemplateIds.contains($0.id) }
    }

    // Practices grouped by tier (ordered: foundations, practices, mastery) - non-adopted only
    private var practicesByTier: [(tier: HabitTier, habits: [FlowHabitTemplate])] {
        let grouped = Dictionary(grouping: nonAdoptedPractices) { $0.tier }
        return HabitTier.allCases
            .compactMap { tier in
                guard let habits = grouped[tier], !habits.isEmpty else { return nil }
                return (tier: tier, habits: habits)
            }
    }

    // All practices for search (across all pillars)
    private var searchResults: [FlowHabitTemplate] {
        guard !searchText.isEmpty else { return [] }
        return catalog.search(query: searchText)
    }

    var body: some View {
        Group {
            switch mode {
            case .compact:
                compactLayout
            case .immersive:
                immersiveLayout
            }
        }
        .sheet(isPresented: $showingIconPicker) {
            IconPickerView(selectedIconName: $customIconName, pillar: selectedPillar)
        }
        .sheet(item: $selectedTemplate) { template in
            HabitDetailSheet(
                template: template,
                isAdopted: adoptedTemplateIds.contains(template.id)
            ) {
                adoptTemplateHabit(template)
            }
        }
    }

    // MARK: - Compact Layout (Sheet)

    private var compactLayout: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 20) {
                        // Pillar Selector
                        VStack(alignment: .leading, spacing: 10) {
                            Text("CATEGORY")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundStyle(.textWhisper)
                                .tracking(1)

                            PillarSelectorStrip(selectedPillar: $selectedPillar)
                        }

                        // Custom Habit Input (expandable)
                        customInputSection

                        // Practice Grid
                        if customHabitName.isEmpty {
                            practiceGridSection
                        }

                        Spacer(minLength: 40)
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Add Practice")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundStyle(.textSecondary)
                }

                ToolbarItem(placement: .confirmationAction) {
                    if !customHabitName.isEmpty {
                        Button("Add") {
                            addCustomHabit()
                        }
                        .font(.headline)
                        .foregroundStyle(selectedPillar.color)
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
    }

    // MARK: - Immersive Layout (Discover)

    private var immersiveLayout: some View {
        ZStack {
            // The Void canvas
            Color.canvas.ignoresSafeArea()

            // Subtle mandala background
            FourElementsMandala(opacity: 0.02)
                .ignoresSafeArea()

            // Pillar glow
            VStack {
                HStack {
                    RadialGradient(
                        colors: [selectedPillar.color.opacity(0.08), Color.clear],
                        center: .topLeading,
                        startRadius: 0,
                        endRadius: 250
                    )
                    .frame(width: 300, height: 300)
                    Spacer()
                }
                Spacer()
            }
            .ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    // Search Bar (prominent in immersive mode)
                    searchBar

                    // Pillar Selector
                    PillarSelectorStrip(selectedPillar: $selectedPillar)

                    // Custom Input (always visible but collapsed)
                    customInputSection

                    // Content based on search state
                    if searchText.isEmpty {
                        // Practice Grid for selected pillar
                        practiceGridSection
                    } else {
                        // Search Results
                        searchResultsSection
                    }

                    Spacer(minLength: 100)
                }
                .padding()
            }
        }
    }

    // MARK: - Search Bar

    private var searchBar: some View {
        HStack(spacing: 10) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 14))
                .foregroundStyle(.textWhisper)

            TextField("Search practices...", text: $searchText)
                .font(.system(size: 15))
                .foregroundStyle(.textPrimary)

            if !searchText.isEmpty {
                Button {
                    searchText = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(.textSecondary)
                }
            }
        }
        .padding(12)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
        )
    }

    // MARK: - Custom Input Section

    private var customInputSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            // Header with toggle
            Button {
                withAnimation(.spring(duration: 0.3)) {
                    showingCustomInput.toggle()
                }
                Haptics.light()
            } label: {
                HStack(spacing: 8) {
                    Image(systemName: "plus.circle.fill")
                        .font(.system(size: 14))
                        .foregroundStyle(selectedPillar.color)

                    Text("Create your own")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundStyle(.textPrimary)

                    Spacer()

                    Image(systemName: showingCustomInput ? "chevron.up" : "chevron.down")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundStyle(.textSecondary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .background(Color.cardBackground)
                .clipShape(RoundedRectangle(cornerRadius: 12))
            }
            .buttonStyle(.plain)

            // Expandable input
            if showingCustomInput {
                HStack(spacing: 10) {
                    // Icon button
                    Button {
                        showingIconPicker = true
                        Haptics.light()
                    } label: {
                        Image(systemName: customIconName.isEmpty ? selectedPillar.defaultIconName : customIconName)
                            .font(.system(size: 20))
                            .foregroundStyle(selectedPillar.color)
                            .frame(width: 44, height: 44)
                            .background(selectedPillar.color.opacity(0.15))
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }

                    // Name field
                    TextField("Type your habit...", text: $customHabitName)
                        .font(.system(size: 15))
                        .foregroundStyle(.textPrimary)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 12)
                        .background(Color.cardBackground)
                        .clipShape(RoundedRectangle(cornerRadius: 10))

                    // Add button (compact mode shows in toolbar)
                    if mode == .immersive && !customHabitName.isEmpty {
                        Button {
                            addCustomHabit()
                        } label: {
                            Image(systemName: "plus")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(.white)
                                .frame(width: 44, height: 44)
                                .background(selectedPillar.color)
                                .clipShape(RoundedRectangle(cornerRadius: 10))
                        }
                        .buttonStyle(ScaleFadeButtonStyle())
                    }
                }
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
    }

    // MARK: - Practice Grid Section

    private var practiceGridSection: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Section header
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text("\(selectedPillar.displayName) Practices")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(.textPrimary)

                    Spacer()

                    Text("\(filteredPractices.count) available")
                        .font(.system(size: 11))
                        .foregroundStyle(.textWhisper)
                }

                Text(selectedPillar.practiceTagline)
                    .font(.system(size: 12))
                    .foregroundStyle(selectedPillar.color)
            }

            // Selected Practices (shown at top)
            if !adoptedPractices.isEmpty {
                VStack(alignment: .leading, spacing: 10) {
                    // Section header
                    HStack(spacing: 6) {
                        Text("SELECTED")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundStyle(.space)
                            .tracking(1)

                        Rectangle()
                            .fill(Color.space.opacity(0.4))
                            .frame(height: 1)
                    }

                    // Grid for selected practices
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                        ForEach(adoptedPractices) { template in
                            PracticeCard(
                                template: template,
                                isAdopted: true,
                                pillarColor: selectedPillar.color,
                                onInfoTap: {
                                    selectedTemplate = template
                                },
                                onQuickRemove: {
                                    archiveHabitForTemplate(template)
                                }
                            )
                        }
                    }
                }
            }

            // Grouped by tier (non-adopted only)
            ForEach(practicesByTier, id: \.tier) { group in
                VStack(alignment: .leading, spacing: 10) {
                    // Tier header - minimal but distinct
                    HStack(spacing: 6) {
                        Text(group.tier.displayName.uppercased())
                            .font(.system(size: 10, weight: .bold))
                            .foregroundStyle(tierColor(group.tier))
                            .tracking(1)

                        Rectangle()
                            .fill(tierColor(group.tier).opacity(0.3))
                            .frame(height: 1)
                    }

                    // Grid for this tier
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                        ForEach(group.habits) { template in
                            PracticeCard(
                                template: template,
                                isAdopted: false,
                                pillarColor: selectedPillar.color,
                                onInfoTap: {
                                    selectedTemplate = template
                                },
                                onQuickAdd: {
                                    adoptTemplateHabit(template)
                                }
                            )
                        }
                    }
                }
            }
        }
    }

    // Subtle color accent for tier headers
    private func tierColor(_ tier: HabitTier) -> Color {
        switch tier {
        case .foundations: return .textSecondary
        case .practices: return .textWhisper
        case .mastery: return selectedPillar.color.opacity(0.7)
        }
    }

    // MARK: - Search Results Section

    private var searchResultsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Results")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.textPrimary)

                Spacer()

                Text("\(searchResults.count) found")
                    .font(.system(size: 11))
                    .foregroundStyle(.textWhisper)
            }

            if searchResults.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "magnifyingglass")
                        .font(.largeTitle)
                        .foregroundStyle(.textSecondary)

                    Text("No practices found")
                        .font(.headline)
                        .foregroundStyle(.textSecondary)

                    Text("Try a different search or create your own")
                        .font(.caption)
                        .foregroundStyle(.textWhisper)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
            } else {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                    ForEach(searchResults) { template in
                        let isAdopted = adoptedTemplateIds.contains(template.id)
                        PracticeCard(
                            template: template,
                            isAdopted: isAdopted,
                            pillarColor: template.pillar.color,
                            onInfoTap: {
                                selectedTemplate = template
                            },
                            onQuickAdd: isAdopted ? nil : {
                                adoptTemplateHabit(template)
                            },
                            onQuickRemove: isAdopted ? {
                                archiveHabitForTemplate(template)
                            } : nil
                        )
                    }
                }
            }
        }
    }

    // MARK: - Actions

    private func addCustomHabit() {
        guard !customHabitName.trimmingCharacters(in: .whitespaces).isEmpty else { return }

        let habit = Habit(
            name: customHabitName.trimmingCharacters(in: .whitespaces),
            pillar: selectedPillar,
            iconName: customIconName.isEmpty ? selectedPillar.defaultIconName : customIconName,
            sortOrder: nextSortOrder
        )

        modelContext.insert(habit)
        Haptics.success()

        // Reset and dismiss in compact mode
        customHabitName = ""
        customIconName = ""

        if mode == .compact {
            dismiss()
        } else {
            // Just close the input in immersive mode
            withAnimation(.spring(duration: 0.3)) {
                showingCustomInput = false
            }
        }
    }

    private func adoptTemplateHabit(_ template: FlowHabitTemplate) {
        let habit = Habit(from: template, sortOrder: nextSortOrder)
        modelContext.insert(habit)
        selectedTemplate = nil
        Haptics.success()

        if mode == .compact {
            dismiss()
        }
    }

    private func archiveHabitForTemplate(_ template: FlowHabitTemplate) {
        // Find the habit with this templateId and archive it
        if let habit = existingHabits.first(where: { $0.templateId == template.id && $0.isActive }) {
            habit.isActive = false
            Haptics.medium()
        }
    }
}

// MARK: - Practice Card

struct PracticeCard: View {
    let template: FlowHabitTemplate
    let isAdopted: Bool
    let pillarColor: Color
    let onInfoTap: () -> Void
    var onQuickAdd: (() -> Void)? = nil
    var onQuickRemove: (() -> Void)? = nil

    @State private var showingRemoveConfirmation = false

    var body: some View {
        HStack(spacing: 0) {
            // Add/Remove button zone
            Button {
                if isAdopted {
                    showingRemoveConfirmation = true
                } else if let onQuickAdd = onQuickAdd {
                    Haptics.success()
                    onQuickAdd()
                }
            } label: {
                ZStack {
                    if isAdopted {
                        // Filled checkmark for selected
                        RoundedRectangle(cornerRadius: 5)
                            .fill(Color.space)
                            .frame(width: 20, height: 20)
                        Image(systemName: "checkmark")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundStyle(.void)
                    } else {
                        // Plus for unselected
                        RoundedRectangle(cornerRadius: 5)
                            .stroke(pillarColor.opacity(0.4), lineWidth: 1.5)
                            .frame(width: 20, height: 20)
                        Image(systemName: "plus")
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundStyle(pillarColor)
                    }
                }
                .padding(.leading, 12)
                .padding(.vertical, 12)
            }
            .buttonStyle(PracticeCardButtonStyle())

            // Info zone - tapping shows details
            Button {
                Haptics.light()
                onInfoTap()
            } label: {
                HStack(spacing: 10) {
                    // Icon
                    TemplateIcon(template: template, size: 18)

                    // Name - spans remaining width
                    Text(template.name)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundStyle(isAdopted ? .ivory : .textPrimary)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                        .truncationMode(.tail)
                        .minimumScaleFactor(0.85)
                        .fixedSize(horizontal: false, vertical: true)

                    Spacer(minLength: 4)
                }
                .padding(.leading, 8)
                .padding(.trailing, 12)
                .padding(.vertical, 12)
            }
            .buttonStyle(PracticeCardButtonStyle())
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(isAdopted ? Color.space.opacity(0.15) : pillarColor.opacity(0.04))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(
                    isAdopted ? Color.space.opacity(0.4) : pillarColor.opacity(0.1),
                    lineWidth: 1
                )
        )
        .confirmationDialog(
            "Remove \(template.name)?",
            isPresented: $showingRemoveConfirmation,
            titleVisibility: .visible
        ) {
            Button("Remove", role: .destructive) {
                onQuickRemove?()
                Haptics.medium()
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("This will archive the habit.")
        }
    }
}

// MARK: - Practice Card Button Style

struct PracticeCardButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .opacity(configuration.isPressed ? 0.9 : 1.0)
            .animation(.spring(duration: 0.2), value: configuration.isPressed)
    }
}

// MARK: - Previews
// Note: SectionHeader, Badge components (PillarBadge, DifficultyBadge, DurationBadge, FlowKeyBadge, QualityTag),
// PrimaryButtonStyle, and Pillar.defaultEmoji are defined in RepositoryComponents.swift and Habit.swift

#Preview("Compact Mode") {
    PracticePickerView(mode: .compact, selectedPillar: .self_)
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}

#Preview("Immersive Mode") {
    NavigationStack {
        PracticePickerView(mode: .immersive, selectedPillar: .self_)
    }
    .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
