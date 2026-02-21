//
//  FlowKeyDetailView.swift
//  FlowHabits
//
//  View for browsing habits within a specific Flow Key
//

import SwiftUI

struct FlowKeyDetailView: View {
    let flowKey: FlowKey
    let adoptedIds: Set<String>
    let onSelectTemplate: (FlowHabitTemplate) -> Void

    @Environment(\.dismiss) private var dismiss

    private var habits: [FlowHabitTemplate] {
        CatalogService.shared.habits(for: flowKey)
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Flow Key Header
                    headerSection

                    // About This Key
                    aboutSection

                    // Habits List
                    habitsSection
                }
                .padding()
            }
            .background(Color.background)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .foregroundStyle(.spirit)
                }
            }
        }
        .presentationDragIndicator(.visible)
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(spacing: 16) {
            Image(systemName: flowKey.iconName)
                .font(.system(size: 36))
                .foregroundStyle(flowKey.color)
                .frame(width: 80, height: 80)
                .background(flowKey.color.opacity(0.2))
                .clipShape(Circle())

            VStack(spacing: 4) {
                Text(flowKey.displayName)
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundStyle(.textPrimary)

                Text(flowKey.tagline)
                    .font(.subheadline)
                    .foregroundStyle(.textSecondary)
            }

            PillarBadge(pillar: flowKey.pillar, size: .regular)
        }
        .padding(.top)
    }

    // MARK: - About Section

    private var aboutSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Image(systemName: "lightbulb.fill")
                    .foregroundStyle(flowKey.color)
                Text("About This Key")
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundStyle(.textPrimary)
            }

            Text(flowKey.description)
                .font(.body)
                .foregroundStyle(.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    // MARK: - Habits Section

    private var habitsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("\(habits.count) Habits")
                    .font(.headline)
                    .fontWeight(.semibold)
                    .foregroundStyle(.textPrimary)

                Spacer()

                let adoptedCount = habits.filter { adoptedIds.contains($0.id) }.count
                if adoptedCount > 0 {
                    Text("\(adoptedCount) adopted")
                        .font(.caption)
                        .foregroundStyle(.space)
                }
            }

            ForEach(habits) { template in
                HabitListRow(
                    template: template,
                    isAdopted: adoptedIds.contains(template.id)
                ) {
                    onSelectTemplate(template)
                }
            }
        }
    }
}

// MARK: - Habit List Row

struct HabitListRow: View {
    let template: FlowHabitTemplate
    let isAdopted: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                TemplateIcon(template: template, size: 22)
                    .frame(width: 48, height: 48)
                    .background(template.pillar.color.opacity(0.15))
                    .clipShape(RoundedRectangle(cornerRadius: 10))

                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(template.name)
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundStyle(.textPrimary)

                        if isAdopted {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.caption)
                                .foregroundStyle(.space)
                        }
                    }

                    Text(template.shortDescription)
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                        .lineLimit(1)

                    DifficultyBadge(difficulty: template.difficulty)
                }

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }
            .padding()
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .strokeBorder(
                        isAdopted ? Color.space.opacity(0.3) : Color.clear,
                        lineWidth: 1
                    )
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Preview

#Preview {
    FlowKeyDetailView(
        flowKey: .focusedBody,
        adoptedIds: []
    ) { _ in }
}
