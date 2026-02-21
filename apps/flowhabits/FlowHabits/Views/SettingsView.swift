//
//  SettingsView.swift
//  FlowHabits
//
//  Tune your practices - where alignment is refined
//

import SwiftUI
import SwiftData

struct SettingsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Habit.sortOrder) private var allHabits: [Habit]

    @AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false
    @AppStorage("quizResultData") private var quizResultData: Data?

    @State private var showingDeleteConfirmation = false
    @State private var habitToDelete: Habit?
    @State private var showingRetakeConfirmation = false
    @State private var showingArchived = false
    @State private var showingRestoreAllConfirmation = false
    @State private var showingDeleteAllArchivedConfirmation = false
    @State private var showingResetAllConfirmation = false

    private var archivedHabits: [Habit] {
        allHabits.filter { !$0.isActive }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // The Void canvas
                Color.canvas.ignoresSafeArea()

                // Subtle Self glow from center-right
                HStack {
                    Spacer()
                    RadialGradient(
                        colors: [Color.selfPillar.opacity(0.05), Color.clear],
                        center: .trailing,
                        startRadius: 0,
                        endRadius: 200
                    )
                    .frame(width: 250, height: 400)
                }
                .ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(spacing: 18) {
                        // Archived Section - Collapsible
                        if !archivedHabits.isEmpty {
                            VStack(alignment: .leading, spacing: 8) {
                                // Toggle button to show/hide archived
                                Button {
                                    withAnimation(.spring(duration: 0.3)) {
                                        showingArchived.toggle()
                                    }
                                    Haptics.light()
                                } label: {
                                    HStack {
                                        Image(systemName: "archivebox.fill")
                                            .font(.system(size: 12))
                                        Text("Archived")
                                            .font(.system(size: 13, weight: .medium))

                                        Text("\(archivedHabits.count)")
                                            .font(.system(size: 11, weight: .bold, design: .rounded))
                                            .foregroundStyle(.textWhisper)
                                            .padding(.horizontal, 6)
                                            .padding(.vertical, 2)
                                            .background(Color.white.opacity(0.08))
                                            .clipShape(Capsule())

                                        Spacer()

                                        Image(systemName: showingArchived ? "chevron.up" : "chevron.down")
                                            .font(.system(size: 10, weight: .semibold))
                                    }
                                    .foregroundStyle(.textSecondary)
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 10)
                                    .background(Color.cardBackground.opacity(0.5))
                                    .clipShape(RoundedRectangle(cornerRadius: 10))
                                }

                                if showingArchived {
                                    VStack(spacing: 1) {
                                        ForEach(archivedHabits.sorted { $0.createdAt > $1.createdAt }) { habit in
                                            ArchivedHabitRow(
                                                habit: habit,
                                                onRestore: {
                                                    habit.isActive = true
                                                    Haptics.medium()
                                                },
                                                onDelete: {
                                                    habitToDelete = habit
                                                    showingDeleteConfirmation = true
                                                }
                                            )
                                        }
                                    }
                                    .background(Color.cardBackground.opacity(0.3))
                                    .clipShape(RoundedRectangle(cornerRadius: 12))

                                    // Bulk actions
                                    HStack(spacing: 10) {
                                        Button {
                                            showingRestoreAllConfirmation = true
                                        } label: {
                                            HStack(spacing: 4) {
                                                Image(systemName: "arrow.uturn.backward")
                                                    .font(.system(size: 10))
                                                Text("Restore All")
                                                    .font(.system(size: 11, weight: .medium))
                                            }
                                            .foregroundStyle(.space)
                                            .padding(.horizontal, 10)
                                            .padding(.vertical, 6)
                                            .background(Color.space.opacity(0.15))
                                            .clipShape(Capsule())
                                        }

                                        Button {
                                            showingDeleteAllArchivedConfirmation = true
                                        } label: {
                                            HStack(spacing: 4) {
                                                Image(systemName: "trash")
                                                    .font(.system(size: 10))
                                                Text("Delete All")
                                                    .font(.system(size: 11, weight: .medium))
                                            }
                                            .foregroundStyle(.selfPillar)
                                            .padding(.horizontal, 10)
                                            .padding(.vertical, 6)
                                            .background(Color.selfPillar.opacity(0.15))
                                            .clipShape(Capsule())
                                        }

                                        Spacer()
                                    }
                                    .padding(.top, 4)
                                }
                            }
                        }

                        // Flow Profile Section
                        VStack(spacing: 1) {
                            Button {
                                showingRetakeConfirmation = true
                            } label: {
                                HStack(spacing: 10) {
                                    Image(systemName: "sparkles")
                                        .font(.system(size: 14))
                                        .foregroundStyle(.spirit)
                                    Text("Redesign My Routine")
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(.textPrimary)
                                    Spacer()
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 10))
                                        .foregroundStyle(.textSecondary)
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 12)
                                .background(Color.cardBackground)
                            }

                            if let data = quizResultData,
                               let result = try? JSONDecoder().decode(QuizResult.self, from: data) {
                                HStack(spacing: 10) {
                                    Image(systemName: "chart.pie.fill")
                                        .font(.system(size: 14))
                                        .foregroundStyle(.space)
                                    Text("Last Quiz")
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(.textPrimary)
                                    Spacer()
                                    Text(result.completedAt, style: .date)
                                        .font(.system(size: 12))
                                        .foregroundStyle(.textSecondary)
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 12)
                                .background(Color.cardBackground)
                            }
                        }
                        .clipShape(RoundedRectangle(cornerRadius: 12))

                        // About Section
                        VStack(spacing: 1) {
                            Link(destination: URL(string: "https://fourflowos.com")!) {
                                HStack(spacing: 10) {
                                    Image(systemName: "info.circle")
                                        .font(.system(size: 14))
                                        .foregroundStyle(.space)
                                    Text("About FlowHabits")
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(.textPrimary)
                                    Spacer()
                                    Image(systemName: "arrow.up.right")
                                        .font(.system(size: 10))
                                        .foregroundStyle(.textSecondary)
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 12)
                                .background(Color.cardBackground)
                            }

                            Link(destination: URL(string: "https://fourflowos.com/privacy")!) {
                                HStack(spacing: 10) {
                                    Image(systemName: "hand.raised.fill")
                                        .font(.system(size: 14))
                                        .foregroundStyle(.space)
                                    Text("Privacy Policy")
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(.textPrimary)
                                    Spacer()
                                    Image(systemName: "arrow.up.right")
                                        .font(.system(size: 10))
                                        .foregroundStyle(.textSecondary)
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 12)
                                .background(Color.cardBackground)
                            }

                            Link(destination: URL(string: "mailto:fourflowos@gmail.com")!) {
                                HStack(spacing: 10) {
                                    Image(systemName: "envelope.fill")
                                        .font(.system(size: 14))
                                        .foregroundStyle(.space)
                                    Text("Contact Support")
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(.textPrimary)
                                    Spacer()
                                    Image(systemName: "arrow.up.right")
                                        .font(.system(size: 10))
                                        .foregroundStyle(.textSecondary)
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 12)
                                .background(Color.cardBackground)
                            }

                            HStack(spacing: 10) {
                                Image(systemName: "number")
                                    .font(.system(size: 14))
                                    .foregroundStyle(.space)
                                Text("Version")
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundStyle(.textPrimary)
                                Spacer()
                                Text("1.0.0")
                                    .font(.system(size: 12))
                                    .foregroundStyle(.textSecondary)
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 12)
                            .background(Color.cardBackground)
                        }
                        .clipShape(RoundedRectangle(cornerRadius: 12))

                        // Danger Zone - Reset All Data
                        VStack(spacing: 1) {
                            Button {
                                showingResetAllConfirmation = true
                            } label: {
                                HStack(spacing: 10) {
                                    Image(systemName: "arrow.counterclockwise")
                                        .font(.system(size: 14))
                                        .foregroundStyle(.selfPillar)
                                    Text("Reset All Data")
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundStyle(.selfPillar)
                                    Spacer()
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 10))
                                        .foregroundStyle(.selfPillar.opacity(0.5))
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 12)
                                .background(Color.selfPillar.opacity(0.08))
                            }
                        }
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.selfPillar.opacity(0.15), lineWidth: 1)
                        )

                        Spacer(minLength: 80)
                    }
                    .padding(.horizontal, 16)
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
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
            .alert("Redesign Your Routine?", isPresented: $showingRetakeConfirmation) {
                Button("Cancel", role: .cancel) { }
                Button("Retake Quiz") {
                    quizResultData = nil
                    hasCompletedOnboarding = false
                    Haptics.medium()
                }
            } message: {
                Text("This will take you through the Flow Quiz again to get updated habit recommendations. Your current habits will not be affected.")
            }
            .alert("Restore All Archived?", isPresented: $showingRestoreAllConfirmation) {
                Button("Cancel", role: .cancel) { }
                Button("Restore All") {
                    for habit in archivedHabits {
                        habit.isActive = true
                    }
                    withAnimation {
                        showingArchived = false
                    }
                    Haptics.success()
                }
            } message: {
                Text("This will restore \(archivedHabits.count) archived habit\(archivedHabits.count == 1 ? "" : "s") to your active practices.")
            }
            .alert("Delete All Archived?", isPresented: $showingDeleteAllArchivedConfirmation) {
                Button("Cancel", role: .cancel) { }
                Button("Delete All", role: .destructive) {
                    for habit in archivedHabits {
                        modelContext.delete(habit)
                    }
                    withAnimation {
                        showingArchived = false
                    }
                    Haptics.medium()
                }
            } message: {
                Text("This will permanently delete \(archivedHabits.count) archived habit\(archivedHabits.count == 1 ? "" : "s") and all their history. This cannot be undone.")
            }
            .alert("Reset All Data?", isPresented: $showingResetAllConfirmation) {
                Button("Cancel", role: .cancel) { }
                Button("Reset Everything", role: .destructive) {
                    // Delete all habits (completions cascade automatically)
                    for habit in allHabits {
                        modelContext.delete(habit)
                    }
                    // Clear quiz data
                    quizResultData = nil
                    // Reset onboarding to start fresh
                    hasCompletedOnboarding = false
                    Haptics.medium()
                }
            } message: {
                Text("This will permanently delete all your habits, completion history, and quiz results. You'll start fresh with the Flow Quiz. This cannot be undone.")
            }
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Archived Habit Row

struct ArchivedHabitRow: View {
    let habit: Habit
    let onRestore: () -> Void
    let onDelete: () -> Void

    @State private var showingActions = false

    private var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM d, yyyy"
        return formatter.string(from: habit.createdAt)
    }

    var body: some View {
        Button {
            showingActions = true
            Haptics.light()
        } label: {
            HStack(spacing: 10) {
                Circle()
                    .fill(habit.pillar.color.opacity(0.5))
                    .frame(width: 6, height: 6)

                HabitIcon(habit: habit, size: 14)
                    .opacity(0.6)

                VStack(alignment: .leading, spacing: 2) {
                    Text(habit.name)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(.textSecondary)
                        .lineLimit(1)

                    HStack(spacing: 4) {
                        Text("Added \(formattedDate)")
                            .font(.system(size: 9))
                            .foregroundStyle(.textWhisper)

                        if habit.completions.count > 0 {
                            Text("•")
                                .font(.system(size: 8))
                                .foregroundStyle(.textWhisper)
                            Text("\(habit.completions.count) reps")
                                .font(.system(size: 9))
                                .foregroundStyle(.textWhisper)
                        }
                    }
                }

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.system(size: 10))
                    .foregroundStyle(.textSecondary.opacity(0.5))
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(Color.cardBackground)
        }
        .confirmationDialog("Archived Habit", isPresented: $showingActions, titleVisibility: .visible) {
            Button("Restore") {
                onRestore()
            }
            Button("Delete Permanently", role: .destructive) {
                onDelete()
            }
            Button("Cancel", role: .cancel) { }
        }
    }
}

#Preview {
    SettingsView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
