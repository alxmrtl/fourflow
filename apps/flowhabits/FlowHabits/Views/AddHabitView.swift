//
//  AddHabitView.swift
//  FlowHabits
//
//  DEPRECATED: Use PracticePickerView instead.
//  This file is kept for backwards compatibility but should not be used for new code.
//  See Views/Practice/PracticePickerView.swift for the unified practice selection experience.
//

import SwiftUI
import SwiftData

@available(*, deprecated, message: "Use PracticePickerView instead")
struct AddHabitView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State var selectedPillar: Pillar
    @State private var habitName: String = ""
    @State private var selectedIconName: String = ""
    @State private var showingIconPicker = false
    @State private var showingPillarBrowser = false
    @State private var selectedTemplate: FlowHabitTemplate? = nil

    @Query private var existingHabits: [Habit]

    private var catalog: CatalogService { CatalogService.shared }

    private var adoptedTemplateIds: Set<String> {
        Set(existingHabits.filter { $0.isActive }.compactMap { $0.templateId })
    }

    private var nextSortOrder: Int {
        (existingHabits.map(\.sortOrder).max() ?? 0) + 1
    }

    private var suggestedTemplates: [FlowHabitTemplate] {
        catalog.habits(for: selectedPillar)
            .filter { $0.difficulty == .beginner }
            .prefix(6)
            .map { $0 }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 28) {
                        // Pillar Selector
                        pillarSelector

                        // Habit Name Input (for custom habits)
                        habitNameInput

                        // Quick Add - catalog suggestions
                        if habitName.isEmpty {
                            quickAddSection
                        }

                        Spacer(minLength: 40)
                    }
                    .padding(20)
                }
            }
            .navigationTitle("New Habit")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundStyle(.textSecondary)
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Add") {
                        addCustomHabit()
                    }
                    .font(.headline)
                    .foregroundStyle(habitName.isEmpty ? .textSecondary : selectedPillar.color)
                    .disabled(habitName.isEmpty)
                }
            }
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
        .sheet(isPresented: $showingIconPicker) {
            IconPickerView(selectedIconName: $selectedIconName, pillar: selectedPillar)
        }
        .sheet(isPresented: $showingPillarBrowser) {
            PillarHabitsView(
                pillar: selectedPillar,
                adoptedIds: adoptedTemplateIds
            ) { template in
                showingPillarBrowser = false
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                    selectedTemplate = template
                }
            }
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

    // MARK: - Pillar Selector

    private var pillarSelector: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("CATEGORY")
                .font(.caption.weight(.bold))
                .foregroundStyle(.textSecondary)
                .tracking(1)

            HStack(spacing: 12) {
                ForEach(Pillar.displayOrder) { pillar in
                    PillarButton(
                        pillar: pillar,
                        isSelected: selectedPillar == pillar
                    ) {
                        selectedPillar = pillar
                        selectedIconName = ""
                        Haptics.selection()
                    }
                }
            }
        }
    }

    // MARK: - Habit Name Input

    private var habitNameInput: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("CUSTOM HABIT")
                .font(.caption.weight(.bold))
                .foregroundStyle(.textSecondary)
                .tracking(1)

            HStack(spacing: 12) {
                // Icon button
                Button {
                    showingIconPicker = true
                    Haptics.light()
                } label: {
                    Image(systemName: selectedIconName.isEmpty ? selectedPillar.defaultIconName : selectedIconName)
                        .font(.title2)
                        .foregroundStyle(selectedPillar.color)
                        .frame(width: 48, height: 48)
                        .background(Color.cardBackground)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                }

                TextField("Type your own habit...", text: $habitName)
                    .font(.body)
                    .foregroundStyle(.textPrimary)
                    .padding()
                    .background(Color.cardBackground)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            }
        }
    }

    // MARK: - Quick Add Section

    private var quickAddSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("QUICK ADD")
                    .font(.caption.weight(.bold))
                    .foregroundStyle(.textSecondary)
                    .tracking(1)

                Spacer()

                Button {
                    showingPillarBrowser = true
                    Haptics.light()
                } label: {
                    HStack(spacing: 4) {
                        Text("Browse All")
                            .font(.caption.weight(.medium))
                        Image(systemName: "chevron.right")
                            .font(.system(size: 9, weight: .semibold))
                    }
                    .foregroundStyle(selectedPillar.color)
                }
            }

            // 2x3 Grid of catalog suggestions
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
                ForEach(suggestedTemplates) { template in
                    TemplateSuggestionCard(
                        template: template,
                        isAdopted: adoptedTemplateIds.contains(template.id),
                        pillarColor: selectedPillar.color
                    ) {
                        selectedTemplate = template
                        Haptics.light()
                    }
                }
            }
        }
    }

    // MARK: - Actions

    private func addCustomHabit() {
        guard !habitName.trimmingCharacters(in: .whitespaces).isEmpty else { return }

        let habit = Habit(
            name: habitName.trimmingCharacters(in: .whitespaces),
            pillar: selectedPillar,
            iconName: selectedIconName.isEmpty ? selectedPillar.defaultIconName : selectedIconName,
            sortOrder: nextSortOrder
        )

        modelContext.insert(habit)
        Haptics.success()
        dismiss()
    }

    private func adoptTemplateHabit(_ template: FlowHabitTemplate) {
        let habit = Habit(from: template, sortOrder: nextSortOrder)
        modelContext.insert(habit)
        selectedTemplate = nil
        Haptics.success()
        dismiss()
    }
}

// MARK: - Template Suggestion Card

struct TemplateSuggestionCard: View {
    let template: FlowHabitTemplate
    let isAdopted: Bool
    let pillarColor: Color
    let onSelect: () -> Void

    var body: some View {
        Button(action: onSelect) {
            HStack(spacing: 8) {
                TemplateIcon(template: template, size: 18)

                Text(template.name)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(.textPrimary)
                    .lineLimit(2)

                Spacer()

                if isAdopted {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.caption)
                        .foregroundStyle(.space)
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(pillarColor.opacity(0.12))
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(
                        isAdopted ? Color.space.opacity(0.4) : pillarColor.opacity(0.25),
                        lineWidth: 1
                    )
            )
        }
        .buttonStyle(ScaleFadeButtonStyle())
    }
}

// MARK: - Pillar Button

struct PillarButton: View {
    let pillar: Pillar
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                Image(systemName: pillar.iconName)
                    .font(.title3)
                    .foregroundStyle(isSelected ? .white : pillar.color)

                Text(pillar.displayName)
                    .font(.caption2.weight(.medium))
                    .foregroundStyle(isSelected ? .white : .textSecondary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
            .background(isSelected ? pillar.color : Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
    }
}

// Note: EmojiPickerView has been removed - use IconPickerView from RepositoryComponents.swift
// Preview removed - this view is deprecated. Use PracticePickerView instead.
