//
//  SettingsView.swift
//  FourFlowHabits
//
//  Settings and habit management
//

import SwiftUI
import SwiftData

struct SettingsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Habit.sortOrder) private var allHabits: [Habit]

    @State private var showingAddHabit = false
    @State private var habitToEdit: Habit?
    @State private var showingDeleteConfirmation = false
    @State private var habitToDelete: Habit?

    private var activeHabits: [Habit] {
        allHabits.filter { $0.isActive }
    }

    private var archivedHabits: [Habit] {
        allHabits.filter { !$0.isActive }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                List {
                    // Active Habits Section
                    Section {
                        ForEach(Pillar.allCases) { pillar in
                            let pillarHabits = activeHabits.filter { $0.pillar == pillar }
                            if !pillarHabits.isEmpty {
                                ForEach(pillarHabits) { habit in
                                    HabitManagementRow(habit: habit)
                                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                            Button(role: .destructive) {
                                                habitToDelete = habit
                                                showingDeleteConfirmation = true
                                            } label: {
                                                Label("Delete", systemImage: "trash")
                                            }

                                            Button {
                                                habit.isActive = false
                                                Haptics.medium()
                                            } label: {
                                                Label("Archive", systemImage: "archivebox")
                                            }
                                            .tint(.amber)
                                        }
                                        .swipeActions(edge: .leading) {
                                            Button {
                                                habitToEdit = habit
                                            } label: {
                                                Label("Edit", systemImage: "pencil")
                                            }
                                            .tint(.story)
                                        }
                                }
                            }
                        }

                        Button {
                            showingAddHabit = true
                        } label: {
                            Label("Add New Habit", systemImage: "plus.circle.fill")
                                .foregroundStyle(.space)
                        }
                    } header: {
                        Text("Active Habits")
                    }
                    .listRowBackground(Color.cardBackground)

                    // Archived Section
                    if !archivedHabits.isEmpty {
                        Section {
                            ForEach(archivedHabits) { habit in
                                HabitManagementRow(habit: habit, isArchived: true)
                                    .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                        Button(role: .destructive) {
                                            habitToDelete = habit
                                            showingDeleteConfirmation = true
                                        } label: {
                                            Label("Delete", systemImage: "trash")
                                        }
                                    }
                                    .swipeActions(edge: .leading) {
                                        Button {
                                            habit.isActive = true
                                            Haptics.medium()
                                        } label: {
                                            Label("Restore", systemImage: "arrow.uturn.backward")
                                        }
                                        .tint(.space)
                                    }
                            }
                        } header: {
                            Text("Archived")
                        }
                        .listRowBackground(Color.cardBackground)
                    }

                    // About Section
                    Section {
                        Link(destination: URL(string: "https://fourflow.app")!) {
                            HStack {
                                Label("About FourFlow", systemImage: "info.circle")
                                Spacer()
                                Image(systemName: "arrow.up.right")
                                    .font(.caption)
                                    .foregroundStyle(.textSecondary)
                            }
                        }

                        HStack {
                            Label("Version", systemImage: "number")
                            Spacer()
                            Text("1.0.0")
                                .foregroundStyle(.textSecondary)
                        }
                    } header: {
                        Text("About")
                    }
                    .listRowBackground(Color.cardBackground)
                }
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.large)
            .sheet(isPresented: $showingAddHabit) {
                AddHabitView(selectedPillar: .spirit)
            }
            .sheet(item: $habitToEdit) { habit in
                EditHabitView(habit: habit)
            }
            .alert("Delete Habit?", isPresented: $showingDeleteConfirmation) {
                Button("Cancel", role: .cancel) { }
                Button("Delete", role: .destructive) {
                    if let habit = habitToDelete {
                        modelContext.delete(habit)
                        Haptics.medium()
                    }
                }
            } message: {
                Text("This will permanently delete this habit and all its history. This cannot be undone.")
            }
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Habit Management Row

struct HabitManagementRow: View {
    let habit: Habit
    var isArchived: Bool = false

    var body: some View {
        HStack(spacing: 12) {
            // Pillar indicator
            Circle()
                .fill(habit.pillar.color)
                .frame(width: 8, height: 8)

            Text(habit.emoji)
                .font(.title3)

            VStack(alignment: .leading, spacing: 2) {
                Text(habit.name)
                    .font(.body)
                    .foregroundStyle(isArchived ? .textSecondary : .textPrimary)

                Text(habit.pillar.displayName)
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }

            Spacer()

            if !isArchived && habit.currentStreak > 0 {
                HStack(spacing: 4) {
                    Image(systemName: "flame.fill")
                        .font(.caption2)
                    Text("\(habit.currentStreak)")
                        .font(.caption.weight(.semibold))
                }
                .foregroundStyle(.amber)
            }

            if isArchived {
                Image(systemName: "archivebox.fill")
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Edit Habit View

struct EditHabitView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @Bindable var habit: Habit
    @State private var editedName: String = ""
    @State private var editedEmoji: String = ""
    @State private var editedPillar: Pillar = .spirit

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
                                        isSelected: editedPillar == pillar
                                    ) {
                                        editedPillar = pillar
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
                                Button {
                                    let emojis = ["✨", "🌟", "💫", "⭐️", "🔥", "💪", "🧘", "📚", "🎯", "🌱"]
                                    editedEmoji = emojis.randomElement() ?? "✨"
                                    Haptics.light()
                                } label: {
                                    Text(editedEmoji)
                                        .font(.title2)
                                        .frame(width: 48, height: 48)
                                        .background(Color.cardBackground)
                                        .clipShape(RoundedRectangle(cornerRadius: 10))
                                }

                                TextField("Habit name", text: $editedName)
                                    .font(.body)
                                    .foregroundStyle(.textPrimary)
                                    .padding()
                                    .background(Color.cardBackground)
                                    .clipShape(RoundedRectangle(cornerRadius: 10))
                            }
                        }

                        // Stats
                        VStack(alignment: .leading, spacing: 12) {
                            Text("STATISTICS")
                                .font(.caption.weight(.bold))
                                .foregroundStyle(.textSecondary)
                                .tracking(1)

                            HStack(spacing: 16) {
                                StatPill(title: "Current", value: "\(habit.currentStreak)", icon: "flame.fill")
                                StatPill(title: "Best", value: "\(habit.longestStreak)", icon: "trophy.fill")
                                StatPill(title: "Total", value: "\(habit.completions.count)", icon: "checkmark.circle.fill")
                            }
                        }

                        Spacer(minLength: 40)
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Edit Habit")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundStyle(.textSecondary)
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveChanges()
                    }
                    .font(.headline)
                    .foregroundStyle(editedName.isEmpty ? .textSecondary : editedPillar.color)
                    .disabled(editedName.isEmpty)
                }
            }
            .onAppear {
                editedName = habit.name
                editedEmoji = habit.emoji
                editedPillar = habit.pillar
            }
        }
        .presentationDetents([.medium])
        .presentationDragIndicator(.visible)
    }

    private func saveChanges() {
        habit.name = editedName.trimmingCharacters(in: .whitespaces)
        habit.emoji = editedEmoji
        habit.pillar = editedPillar
        Haptics.success()
        dismiss()
    }
}

struct StatPill: View {
    let title: String
    let value: String
    let icon: String

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.caption)
                .foregroundStyle(.amber)

            Text(value)
                .font(.headline)
                .foregroundStyle(.textPrimary)

            Text(title)
                .font(.caption2)
                .foregroundStyle(.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}

#Preview {
    SettingsView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
