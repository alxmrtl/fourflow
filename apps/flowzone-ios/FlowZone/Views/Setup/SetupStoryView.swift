//
//  SetupStoryView.swift
//  FlowZone
//
//  Story pillar setup: Goals & Mission
//

import SwiftUI
import SwiftData

struct SetupStoryView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @Query(filter: #Predicate<Goal> { $0.statusRaw == "active" }, sort: \Goal.sortOrder)
    private var goals: [Goal]

    var onComplete: (() -> Void)?

    @State private var showAddGoal = false

    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "book.fill")
                        .font(.largeTitle)
                        .foregroundColor(.story)

                    Text("STORY")
                        .font(.title2.weight(.bold))
                        .foregroundColor(.ivory)

                    Text("What are you building?")
                        .font(.subheadline)
                        .foregroundColor(.story)

                    Text("Add 1-3 meaningful goals you're working toward")
                        .font(.caption)
                        .foregroundColor(.ivory.opacity(0.5))
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 32)

                // Goals List
                goalsSection

                // Continue button
                Button {
                    if let onComplete {
                        onComplete()
                    } else {
                        dismiss()
                    }
                } label: {
                    HStack {
                        Text(onComplete != nil ? "Continue" : "Done")
                        if onComplete != nil {
                            Image(systemName: "arrow.right")
                        }
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color.story)
                    .cornerRadius(16)
                }
                .padding(.horizontal)
                .padding(.bottom, 32)
            }
        }
        .background(Color.charcoal)
        .sheet(isPresented: $showAddGoal) {
            AddGoalView()
        }
    }

    // MARK: - Goals Section

    private var goalsSection: some View {
        VStack(spacing: 16) {
            HStack {
                Text("YOUR GOALS (\(goals.count)/5)")
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.story.opacity(0.8))

                Spacer()

                if goals.count < 5 {
                    Button {
                        showAddGoal = true
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "plus")
                            Text("Add")
                        }
                        .font(.caption.weight(.medium))
                        .foregroundColor(.story)
                    }
                }
            }

            if goals.isEmpty {
                emptyGoalsState
            } else {
                VStack(spacing: 8) {
                    ForEach(goals) { goal in
                        GoalRow(goal: goal)
                    }
                }
            }
        }
        .padding()
        .background(Color.cardBackground)
        .cornerRadius(16)
        .padding(.horizontal)
    }

    private var emptyGoalsState: some View {
        VStack(spacing: 16) {
            Image(systemName: "target")
                .font(.title)
                .foregroundColor(.ivory.opacity(0.3))

            Text("No goals yet")
                .font(.subheadline)
                .foregroundColor(.ivory.opacity(0.5))

            Button {
                showAddGoal = true
            } label: {
                Text("Add your first goal")
                    .font(.subheadline.weight(.medium))
                    .foregroundColor(.story)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 32)
    }
}

// MARK: - Goal Row

struct GoalRow: View {
    let goal: Goal

    var body: some View {
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
                        .foregroundColor(.ivory.opacity(0.5))
                        .lineLimit(1)
                }
            }

            Spacer()

            // Progress
            if goal.totalTasksCount > 0 {
                Text("\(goal.completedTasksCount)/\(goal.totalTasksCount)")
                    .font(.caption)
                    .foregroundColor(.ivory.opacity(0.5))
            }
        }
        .padding(12)
        .background(Color.charcoal)
        .cornerRadius(12)
    }
}

#Preview {
    SetupStoryView()
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self], inMemory: true)
}
