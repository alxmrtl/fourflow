//
//  AddHabitView.swift
//  FourFlowHabits
//
//  Sheet for adding new habits
//

import SwiftUI
import SwiftData

struct AddHabitView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State var selectedPillar: Pillar
    @State private var habitName: String = ""
    @State private var selectedEmoji: String = ""
    @State private var showingSuggestions = true

    @Query private var existingHabits: [Habit]

    private var nextSortOrder: Int {
        (existingHabits.map(\.sortOrder).max() ?? 0) + 1
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 28) {
                        // Pillar Selector
                        VStack(alignment: .leading, spacing: 12) {
                            Text("PILLAR")
                                .font(.caption.weight(.bold))
                                .foregroundStyle(.textSecondary)
                                .tracking(1)

                            HStack(spacing: 12) {
                                ForEach(Pillar.allCases) { pillar in
                                    PillarButton(
                                        pillar: pillar,
                                        isSelected: selectedPillar == pillar
                                    ) {
                                        selectedPillar = pillar
                                        selectedEmoji = ""
                                        showingSuggestions = true
                                        Haptics.selection()
                                    }
                                }
                            }
                        }

                        // Habit Name Input
                        VStack(alignment: .leading, spacing: 12) {
                            Text("HABIT NAME")
                                .font(.caption.weight(.bold))
                                .foregroundStyle(.textSecondary)
                                .tracking(1)

                            HStack(spacing: 12) {
                                // Emoji button
                                Button {
                                    // Simple emoji assignment based on pillar
                                    let emojis = ["✨", "🌟", "💫", "⭐️", "🔥", "💪", "🧘", "📚", "🎯", "🌱"]
                                    selectedEmoji = emojis.randomElement() ?? "✨"
                                    Haptics.light()
                                } label: {
                                    Text(selectedEmoji.isEmpty ? selectedPillar.defaultEmoji : selectedEmoji)
                                        .font(.title2)
                                        .frame(width: 48, height: 48)
                                        .background(Color.cardBackground)
                                        .clipShape(RoundedRectangle(cornerRadius: 10))
                                }

                                TextField("e.g., Morning meditation", text: $habitName)
                                    .font(.body)
                                    .foregroundStyle(.textPrimary)
                                    .padding()
                                    .background(Color.cardBackground)
                                    .clipShape(RoundedRectangle(cornerRadius: 10))
                            }
                        }

                        // Suggestions
                        if showingSuggestions && habitName.isEmpty {
                            VStack(alignment: .leading, spacing: 12) {
                                Text("SUGGESTIONS")
                                    .font(.caption.weight(.bold))
                                    .foregroundStyle(.textSecondary)
                                    .tracking(1)

                                FlowLayout(spacing: 8) {
                                    ForEach(selectedPillar.suggestedHabits, id: \.self) { suggestion in
                                        Button {
                                            habitName = suggestion
                                            showingSuggestions = false
                                            Haptics.light()
                                        } label: {
                                            Text(suggestion)
                                                .font(.subheadline)
                                                .foregroundStyle(.textPrimary)
                                                .padding(.horizontal, 14)
                                                .padding(.vertical, 8)
                                                .background(selectedPillar.color.opacity(0.2))
                                                .clipShape(Capsule())
                                        }
                                    }
                                }
                            }
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
                        addHabit()
                    }
                    .font(.headline)
                    .foregroundStyle(habitName.isEmpty ? .textSecondary : selectedPillar.color)
                    .disabled(habitName.isEmpty)
                }
            }
        }
        .presentationDetents([.medium])
        .presentationDragIndicator(.visible)
    }

    private func addHabit() {
        guard !habitName.trimmingCharacters(in: .whitespaces).isEmpty else { return }

        let habit = Habit(
            name: habitName.trimmingCharacters(in: .whitespaces),
            pillar: selectedPillar,
            emoji: selectedEmoji.isEmpty ? selectedPillar.defaultEmoji : selectedEmoji,
            sortOrder: nextSortOrder
        )

        modelContext.insert(habit)
        Haptics.success()
        dismiss()
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

// MARK: - Flow Layout for Suggestions

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = arrange(proposal: proposal, subviews: subviews)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrange(proposal: proposal, subviews: subviews)

        for (index, position) in result.positions.enumerated() {
            subviews[index].place(
                at: CGPoint(x: bounds.minX + position.x, y: bounds.minY + position.y),
                proposal: ProposedViewSize(result.sizes[index])
            )
        }
    }

    private func arrange(proposal: ProposedViewSize, subviews: Subviews) -> (size: CGSize, positions: [CGPoint], sizes: [CGSize]) {
        let maxWidth = proposal.width ?? .infinity

        var positions: [CGPoint] = []
        var sizes: [CGSize] = []
        var currentX: CGFloat = 0
        var currentY: CGFloat = 0
        var lineHeight: CGFloat = 0
        var maxX: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            sizes.append(size)

            if currentX + size.width > maxWidth && currentX > 0 {
                currentX = 0
                currentY += lineHeight + spacing
                lineHeight = 0
            }

            positions.append(CGPoint(x: currentX, y: currentY))
            lineHeight = max(lineHeight, size.height)
            currentX += size.width + spacing
            maxX = max(maxX, currentX)
        }

        return (
            size: CGSize(width: maxX, height: currentY + lineHeight),
            positions: positions,
            sizes: sizes
        )
    }
}

#Preview {
    AddHabitView(selectedPillar: .spirit)
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
