//
//  AddTaskView.swift
//  FlowZone
//
//  Unified task creation and editing sheet
//

import SwiftUI
import SwiftData

// MARK: - Task Edit Sheet (Unified Add/Edit)

struct TaskEditSheet: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @Query(filter: #Predicate<Goal> { $0.statusRaw == "active" }, sort: \Goal.sortOrder)
    private var goals: [Goal]

    // Existing task to edit (nil for new task)
    let task: FlowTask?
    let defaultGoal: Goal?
    let defaultToToday: Bool

    @State private var title = ""
    @State private var goal: Goal?
    @State private var duration = 25
    @State private var addToToday = true
    @State private var showDeleteConfirm = false

    private let durations = [15, 25, 50, 90]

    private var isEditing: Bool { task != nil }

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
                        // Task Title
                        VStack(alignment: .leading, spacing: 8) {
                            Text("TASK")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.selfPillar.opacity(0.8))

                            TextField("What needs to be done?", text: $title)
                                .font(.subheadline)
                                .foregroundColor(.ivory)
                                .padding()
                                .background(Color.cardBackground)
                                .cornerRadius(12)
                        }

                        // Mission (Goal) Selection
                        VStack(alignment: .leading, spacing: 8) {
                            Text("MISSION")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.story.opacity(0.8))

                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 8) {
                                    // All / No mission option
                                    Button {
                                        goal = nil
                                        HapticFeedback.selection()
                                    } label: {
                                        HStack(spacing: 4) {
                                            Text("🌀")
                                            Text("All")
                                        }
                                        .font(.caption.weight(.medium))
                                        .foregroundColor(goal == nil ? .white : .ivory.opacity(0.7))
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 10)
                                        .background(goal == nil ? Color.story : Color.cardBackground)
                                        .cornerRadius(20)
                                    }

                                    ForEach(goals) { g in
                                        Button {
                                            goal = g
                                            HapticFeedback.selection()
                                        } label: {
                                            HStack(spacing: 4) {
                                                Text(g.emoji)
                                                Text(g.title)
                                                    .lineLimit(1)
                                            }
                                            .font(.caption.weight(.medium))
                                            .foregroundColor(goal?.id == g.id ? .white : .ivory.opacity(0.7))
                                            .padding(.horizontal, 12)
                                            .padding(.vertical, 10)
                                            .background(goal?.id == g.id ? Color.story : Color.cardBackground)
                                            .cornerRadius(20)
                                        }
                                    }
                                }
                            }
                        }

                        // Duration
                        VStack(alignment: .leading, spacing: 8) {
                            Text("DURATION")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.space.opacity(0.8))

                            HStack(spacing: 8) {
                                ForEach(durations, id: \.self) { d in
                                    Button {
                                        duration = d
                                        HapticFeedback.selection()
                                    } label: {
                                        Text("\(d)m")
                                            .font(.subheadline.weight(.medium))
                                            .foregroundColor(duration == d ? .white : .space)
                                            .frame(maxWidth: .infinity)
                                            .padding(.vertical, 12)
                                            .background(duration == d ? Color.space : Color.cardBackground)
                                            .cornerRadius(12)
                                    }
                                }
                            }
                        }

                        // Save Location (for new tasks or ability to move)
                        VStack(alignment: .leading, spacing: 8) {
                            Text("SAVE TO")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.selfPillar.opacity(0.8))

                            HStack(spacing: 8) {
                                // Container (Today's focus)
                                Button {
                                    addToToday = true
                                    HapticFeedback.selection()
                                } label: {
                                    HStack(spacing: 6) {
                                        Image(systemName: "bolt.fill")
                                            .font(.system(size: 12))
                                        Text("Container")
                                            .font(.subheadline.weight(.medium))
                                    }
                                    .foregroundColor(addToToday ? .white : .selfPillar)
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 14)
                                    .background(addToToday ? Color.selfPillar : Color.cardBackground)
                                    .cornerRadius(12)
                                }

                                // Pipeline
                                Button {
                                    addToToday = false
                                    HapticFeedback.selection()
                                } label: {
                                    HStack(spacing: 6) {
                                        Image(systemName: "arrow.right.circle.fill")
                                            .font(.system(size: 12))
                                        Text("Pipeline")
                                            .font(.subheadline.weight(.medium))
                                    }
                                    .foregroundColor(!addToToday ? .white : .ivory.opacity(0.6))
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 14)
                                    .background(!addToToday ? Color.ivory.opacity(0.3) : Color.cardBackground)
                                    .cornerRadius(12)
                                }
                            }
                        }

                        // Delete button (only for editing)
                        if isEditing {
                            Button(role: .destructive) {
                                showDeleteConfirm = true
                            } label: {
                                HStack {
                                    Image(systemName: "trash")
                                    Text("Delete Task")
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
                    }
                    .padding()
                }
            }
            .navigationTitle(isEditing ? "Edit Task" : "New Task")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(.ivory.opacity(0.7))
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button(isEditing ? "Save" : "Add") {
                        saveTask()
                    }
                    .foregroundColor(isValid ? .selfPillar : .ivory.opacity(0.3))
                    .disabled(!isValid)
                }
            }
            .onAppear {
                if let existingTask = task {
                    // Editing existing task
                    title = existingTask.title
                    goal = existingTask.goal
                    duration = existingTask.duration
                    addToToday = existingTask.status == .container
                } else {
                    // New task
                    goal = defaultGoal
                    addToToday = defaultToToday
                }
            }
            .alert("Delete Task?", isPresented: $showDeleteConfirm) {
                Button("Cancel", role: .cancel) { }
                Button("Delete", role: .destructive) {
                    deleteTask()
                }
            } message: {
                Text("This action cannot be undone.")
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func saveTask() {
        if let existingTask = task {
            // Update existing task
            existingTask.title = title.trimmingCharacters(in: .whitespacesAndNewlines)
            existingTask.goal = goal
            existingTask.duration = duration

            // Update status if changed
            if addToToday && existingTask.status != .container {
                existingTask.pullToContainer()
            } else if !addToToday && existingTask.status == .container {
                existingTask.returnToPipeline()
            }
        } else {
            // Create new task
            let newTask = FlowTask(
                title: title.trimmingCharacters(in: .whitespacesAndNewlines),
                goal: goal,
                duration: duration,
                status: addToToday ? .container : .pipeline
            )
            modelContext.insert(newTask)
        }

        try? modelContext.save()
        HapticFeedback.success()
        dismiss()
    }

    private func deleteTask() {
        if let existingTask = task {
            modelContext.delete(existingTask)
            try? modelContext.save()
            HapticFeedback.success()
        }
        dismiss()
    }
}

// MARK: - Legacy AddTaskView (for compatibility)

struct AddTaskView: View {
    var selectedGoal: Goal?

    var body: some View {
        TaskEditSheet(task: nil, defaultGoal: selectedGoal, defaultToToday: false)
    }
}

#Preview {
    TaskEditSheet(task: nil, defaultGoal: nil, defaultToToday: true)
        .modelContainer(for: [Goal.self, FlowTask.self], inMemory: true)
}
