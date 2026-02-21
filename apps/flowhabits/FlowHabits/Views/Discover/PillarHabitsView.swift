//
//  PillarHabitsView.swift
//  FlowHabits
//
//  Shows all habits for a pillar - direct navigation, no Flow Key intermediate layer
//

import SwiftUI
import SwiftData

struct PillarHabitsView: View {
    let pillar: Pillar
    let adoptedIds: Set<String>
    let onSelectTemplate: (FlowHabitTemplate) -> Void

    @Environment(\.dismiss) private var dismiss

    private var catalog: CatalogService { CatalogService.shared }

    private var habits: [FlowHabitTemplate] {
        catalog.habits(for: pillar)
    }

    private var beginnerHabits: [FlowHabitTemplate] {
        habits.filter { $0.difficulty == .beginner }
    }

    private var otherHabits: [FlowHabitTemplate] {
        habits.filter { $0.difficulty != .beginner }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Pillar header
                    pillarHeader

                    // Start Here section (beginner habits)
                    if !beginnerHabits.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            SectionHeader(
                                title: "Start Here",
                                subtitle: "Easy habits to build momentum"
                            )

                            ForEach(beginnerHabits) { template in
                                HabitTemplateRow(
                                    template: template,
                                    isAdopted: adoptedIds.contains(template.id)
                                ) {
                                    onSelectTemplate(template)
                                }
                            }
                        }
                    }

                    // More habits section
                    if !otherHabits.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            SectionHeader(
                                title: "More \(pillar.displayName) Habits",
                                subtitle: "Intermediate and advanced practices"
                            )

                            ForEach(otherHabits) { template in
                                HabitTemplateRow(
                                    template: template,
                                    isAdopted: adoptedIds.contains(template.id)
                                ) {
                                    onSelectTemplate(template)
                                }
                            }
                        }
                    }

                    Spacer(minLength: 40)
                }
                .padding()
            }
            .background(Color.background)
            .navigationTitle(pillar.displayName)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") {
                        dismiss()
                    }
                    .foregroundStyle(.textSecondary)
                }
            }
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
    }

    private var pillarHeader: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                Image(systemName: pillar.iconName)
                    .font(.system(size: 28))
                    .foregroundStyle(pillar.color)
                    .frame(width: 64, height: 64)
                    .background(pillar.color.opacity(0.2))
                    .clipShape(RoundedRectangle(cornerRadius: 16))

                VStack(alignment: .leading, spacing: 4) {
                    Text(pillar.tagline)
                        .font(.headline)
                        .foregroundStyle(pillar.color)

                    Text(pillar.encompasses)
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                }
            }

            Text(pillar.description)
                .font(.subheadline)
                .foregroundStyle(.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding()
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}

// MARK: - Habit Template Row

struct HabitTemplateRow: View {
    let template: FlowHabitTemplate
    let isAdopted: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                TemplateIcon(template: template, size: 22)
                    .frame(width: 48, height: 48)
                    .background(template.pillar.color.opacity(0.15))
                    .clipShape(RoundedRectangle(cornerRadius: 12))

                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Text(template.name)
                            .font(.subheadline)
                            .fontWeight(.semibold)
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
                        .lineLimit(2)
                }

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }
            .padding()
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 14))
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    PillarHabitsView(
        pillar: .self_,
        adoptedIds: [],
        onSelectTemplate: { _ in }
    )
}
