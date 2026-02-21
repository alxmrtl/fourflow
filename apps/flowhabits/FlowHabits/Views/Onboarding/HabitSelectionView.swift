//
//  HabitSelectionView.swift
//  FlowHabits
//
//  Post-quiz habit selection view
//

import SwiftUI

struct HabitSelectionView: View {
    let result: QuizResult
    let onComplete: ([FlowHabitTemplate]) -> Void

    @State private var selectedIds: Set<String> = []
    @State private var showAllHabits = false

    private var recommendedHabits: [FlowHabitTemplate] {
        result.recommendedTemplateIds.compactMap {
            CatalogService.shared.habit(withId: $0)
        }
    }

    private var selectedTemplates: [FlowHabitTemplate] {
        selectedIds.compactMap { CatalogService.shared.habit(withId: $0) }
    }

    var body: some View {
        ZStack {
            // The Void
            Color.canvas.ignoresSafeArea()

            // Spirit glow from bottom-right
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    RadialGradient(
                        colors: [Color.spirit.opacity(0.1), Color.clear],
                        center: .bottomTrailing,
                        startRadius: 0,
                        endRadius: 300
                    )
                    .frame(width: 350, height: 350)
                }
            }
            .ignoresSafeArea()

            VStack(spacing: 0) {
                ScrollView(showsIndicators: false) {
                    VStack(spacing: 24) {
                        // Results Header
                        resultsHeader

                        // Pillar Breakdown
                        pillarBreakdown

                        // Recommended Habits
                        recommendedSection

                        // Browse More
                        browseMoreSection

                        Spacer(minLength: 100)
                    }
                    .padding()
                }

                // Bottom Action Bar
                bottomBar
            }
        }
        .onAppear {
            // Pre-select recommended habits up to the recommended count
            let habitsToSelect = recommendedHabits.prefix(result.recommendedHabitCount)
            selectedIds = Set(habitsToSelect.map { $0.id })
        }
    }

    // MARK: - Results Header

    private var resultsHeader: some View {
        VStack(spacing: 16) {
            Text("Your Path Revealed")
                .font(.system(size: 28, weight: .bold, design: .rounded))
                .foregroundStyle(.ivory)

            Text(result.summaryDescription)
                .font(.system(size: 15, design: .rounded))
                .foregroundStyle(.textSecondary)
                .multilineTextAlignment(.center)

            HStack(spacing: 8) {
                Image(systemName: "sparkles")
                    .foregroundStyle(.spirit)
                Text("\(result.recommendedHabitCount) practices to begin your journey")
                    .font(.system(size: 14, weight: .medium, design: .rounded))
                    .foregroundStyle(.spirit)
            }
            .padding(.top, 8)
        }
        .padding(.top)
    }

    // MARK: - Pillar Breakdown

    private var pillarBreakdown: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("YOUR FOUR DIMENSIONS")
                .font(.system(size: 10, weight: .bold, design: .rounded))
                .foregroundStyle(.textWhisper)
                .tracking(1.2)

            HStack(spacing: 12) {
                ForEach(result.rankedPillars) { pillar in
                    PillarScoreBar(
                        pillar: pillar,
                        score: result.normalizedPillarScores[pillar] ?? 0
                    )
                }
            }

            Text("Taller bars show where practice can help most")
                .font(.system(size: 12, design: .rounded))
                .foregroundStyle(.textWhisper)
        }
        .padding(16)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
        )
    }

    // MARK: - Recommended Section

    private var recommendedSection: some View {
        VStack(alignment: .leading, spacing: 14) {
            VStack(alignment: .leading, spacing: 4) {
                Text("PRACTICES FOR YOU")
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .foregroundStyle(.textWhisper)
                    .tracking(1.2)

                Text("Aligned with your path")
                    .font(.system(size: 13, design: .rounded))
                    .foregroundStyle(.textSecondary)
            }

            ForEach(recommendedHabits) { template in
                SelectableHabitRow(
                    template: template,
                    isSelected: selectedIds.contains(template.id)
                ) {
                    toggleSelection(template.id)
                }
            }
        }
    }

    // MARK: - Browse More Section

    private var browseMoreSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Button {
                showAllHabits = true
            } label: {
                HStack {
                    Image(systemName: "sparkles")
                    Text("Explore All Practices")
                    Spacer()
                    Image(systemName: "chevron.right")
                }
                .font(.system(size: 14, weight: .medium, design: .rounded))
                .foregroundStyle(.spirit)
                .padding(14)
                .background(Color.spirit.opacity(0.1))
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .overlay(
                    RoundedRectangle(cornerRadius: 14)
                        .stroke(Color.spirit.opacity(0.2), lineWidth: 1)
                )
            }
        }
        .sheet(isPresented: $showAllHabits) {
            BrowseAllHabitsSheet(
                selectedIds: $selectedIds,
                recommendedIds: Set(result.recommendedTemplateIds)
            )
        }
    }

    // MARK: - Bottom Bar

    private var bottomBar: some View {
        VStack(spacing: 0) {
            Rectangle()
                .fill(Color.white.opacity(0.06))
                .frame(height: 1)

            VStack(spacing: 14) {
                HStack {
                    Text("\(selectedIds.count) practices chosen")
                        .font(.system(size: 13, design: .rounded))
                        .foregroundStyle(.textWhisper)

                    Spacer()

                    if selectedIds.count != result.recommendedHabitCount {
                        Button("Reset to \(result.recommendedHabitCount)") {
                            let habitsToSelect = recommendedHabits.prefix(result.recommendedHabitCount)
                            selectedIds = Set(habitsToSelect.map { $0.id })
                        }
                        .font(.system(size: 12, weight: .medium, design: .rounded))
                        .foregroundStyle(.spirit)
                    }
                }

                Button {
                    onComplete(selectedTemplates)
                } label: {
                    Text("Begin My Practice")
                        .font(.system(size: 16, weight: .semibold, design: .rounded))
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(LinearGradient.journey)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .shadow(color: .spirit.opacity(0.3), radius: 12, y: 4)
                }
                .disabled(selectedIds.isEmpty)
                .opacity(selectedIds.isEmpty ? 0.5 : 1.0)
            }
            .padding()
        }
        .background(Color.canvas)
    }

    // MARK: - Helpers

    private func toggleSelection(_ id: String) {
        Haptics.light()
        if selectedIds.contains(id) {
            selectedIds.remove(id)
        } else {
            selectedIds.insert(id)
        }
    }
}

// MARK: - Pillar Score Bar

struct PillarScoreBar: View {
    let pillar: Pillar
    let score: Double

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: pillar.iconName)
                .font(.title3)
                .foregroundStyle(pillar.color)

            GeometryReader { geometry in
                ZStack(alignment: .bottom) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.white.opacity(0.08))

                    RoundedRectangle(cornerRadius: 4)
                        .fill(pillar.color)
                        .frame(height: geometry.size.height * max(0.1, score))
                }
            }
            .frame(width: 24)

            Text(pillar.displayName)
                .font(.system(size: 9, weight: .medium, design: .rounded))
                .foregroundStyle(.textWhisper)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Selectable Habit Row

struct SelectableHabitRow: View {
    let template: FlowHabitTemplate
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                // Selection Indicator
                Image(systemName: isSelected ? "checkmark.circle.fill" : "circle")
                    .font(.title2)
                    .foregroundStyle(isSelected ? template.pillar.color : .textWhisper)

                // Habit Info
                TemplateIcon(template: template, size: 22)

                VStack(alignment: .leading, spacing: 3) {
                    Text(template.name)
                        .font(.system(size: 15, weight: .medium, design: .rounded))
                        .foregroundStyle(.textPrimary)

                    Text(template.shortDescription)
                        .font(.system(size: 12, design: .rounded))
                        .foregroundStyle(.textWhisper)
                        .lineLimit(1)
                }

                Spacer()
            }
            .padding(14)
            .background(isSelected ? template.pillar.color.opacity(0.1) : Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .strokeBorder(
                        isSelected ? template.pillar.color.opacity(0.4) : Color.white.opacity(0.06),
                        lineWidth: 1
                    )
            )
        }
        .buttonStyle(ScaleFadeButtonStyle())
    }
}

// MARK: - Browse All Habits Sheet

struct BrowseAllHabitsSheet: View {
    @Binding var selectedIds: Set<String>
    let recommendedIds: Set<String>

    @Environment(\.dismiss) private var dismiss
    @State private var searchText = ""

    private var allHabits: [FlowHabitTemplate] {
        if searchText.isEmpty {
            return CatalogService.shared.habits
        }
        return CatalogService.shared.search(query: searchText)
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void
                Color.canvas.ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 16) {
                        // Search
                        HStack(spacing: 12) {
                            Image(systemName: "magnifyingglass")
                                .foregroundStyle(.textWhisper)

                            TextField("Search practices...", text: $searchText)
                                .font(.system(size: 15, design: .rounded))
                                .foregroundStyle(.textPrimary)
                        }
                        .padding(14)
                        .background(Color.cardBackground)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                        )

                        // Habits List
                        ForEach(Pillar.displayOrder) { pillar in
                            let pillarHabits = allHabits.filter { $0.pillar == pillar }
                            if !pillarHabits.isEmpty {
                                pillarSection(pillar, habits: pillarHabits)
                            }
                        }

                        Spacer(minLength: 40)
                    }
                    .padding()
                }
            }
            .navigationTitle("All Practices")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .font(.system(size: 15, weight: .medium, design: .rounded))
                    .foregroundStyle(.spirit)
                }
            }
        }
    }

    private func pillarSection(_ pillar: Pillar, habits: [FlowHabitTemplate]) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                Image(systemName: pillar.iconName)
                    .foregroundStyle(pillar.color)
                Text(pillar.displayName)
                    .font(.system(size: 14, weight: .semibold, design: .rounded))
                    .foregroundStyle(pillar.color)
            }
            .padding(.top, 8)

            ForEach(habits) { template in
                CompactSelectableRow(
                    template: template,
                    isSelected: selectedIds.contains(template.id),
                    isRecommended: recommendedIds.contains(template.id)
                ) {
                    Haptics.light()
                    if selectedIds.contains(template.id) {
                        selectedIds.remove(template.id)
                    } else {
                        selectedIds.insert(template.id)
                    }
                }
            }
        }
    }
}

// MARK: - Compact Selectable Row

struct CompactSelectableRow: View {
    let template: FlowHabitTemplate
    let isSelected: Bool
    let isRecommended: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: isSelected ? "checkmark.circle.fill" : "circle")
                    .foregroundStyle(isSelected ? template.pillar.color : .textWhisper)

                TemplateIcon(template: template, size: 16)

                Text(template.name)
                    .font(.system(size: 14, weight: .medium, design: .rounded))
                    .foregroundStyle(.textPrimary)

                if isRecommended {
                    Text("For You")
                        .font(.system(size: 9, weight: .semibold, design: .rounded))
                        .foregroundStyle(.spirit)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(Color.spirit.opacity(0.15))
                        .clipShape(Capsule())
                }

                Spacer()
            }
            .padding(.vertical, 10)
            .padding(.horizontal, 12)
            .background(isSelected ? template.pillar.color.opacity(0.1) : Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(isSelected ? template.pillar.color.opacity(0.3) : Color.clear, lineWidth: 1)
            )
        }
        .buttonStyle(ScaleFadeButtonStyle())
    }
}

// MARK: - Preview

#Preview {
    HabitSelectionView(
        result: QuizResult(
            completedAt: Date(),
            responses: [],
            recommendedHabitCount: 5,
            pillarScores: ["self_": 0.8, "space": 0.5, "story": 0.3, "spirit": 0.6],
            flowKeyScores: [:],
            recommendedTemplateIds: Array(CatalogService.shared.habits.prefix(5).map { $0.id })
        )
    ) { _ in }
}
