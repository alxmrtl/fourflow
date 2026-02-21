//
//  AddGoalView.swift
//  FlowZone
//
//  Create a new goal
//

import SwiftUI
import SwiftData

struct AddGoalView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var why = ""
    @State private var emoji = "🎯"

    @State private var showEmojiPicker = false

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
                        // Emoji & Title
                        VStack(spacing: 16) {
                            Button {
                                showEmojiPicker = true
                            } label: {
                                Text(emoji)
                                    .font(.system(size: 48))
                                    .frame(width: 80, height: 80)
                                    .background(Color.cardBackground)
                                    .cornerRadius(20)
                            }

                            TextField("Goal title", text: $title)
                                .font(.title3.weight(.medium))
                                .foregroundColor(.ivory)
                                .multilineTextAlignment(.center)
                                .padding()
                                .background(Color.cardBackground)
                                .cornerRadius(12)
                        }
                        .padding(.top, 16)

                        // Why
                        VStack(alignment: .leading, spacing: 8) {
                            Text("WHY")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.story.opacity(0.8))

                            TextField("Why is this important to you?", text: $why, axis: .vertical)
                                .font(.subheadline)
                                .foregroundColor(.ivory)
                                .lineLimit(3...6)
                                .padding()
                                .background(Color.cardBackground)
                                .cornerRadius(12)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("New Goal")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(.ivory.opacity(0.7))
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveGoal()
                    }
                    .foregroundColor(isValid ? .story : .ivory.opacity(0.3))
                    .disabled(!isValid)
                }
            }
            .sheet(isPresented: $showEmojiPicker) {
                EmojiPickerView(selectedEmoji: $emoji)
            }
        }
    }

    private func saveGoal() {
        let goal = Goal(
            title: title.trimmingCharacters(in: .whitespacesAndNewlines),
            emoji: emoji,
            why: why.trimmingCharacters(in: .whitespacesAndNewlines)
        )

        modelContext.insert(goal)
        try? modelContext.save()

        HapticFeedback.success()
        dismiss()
    }
}

// MARK: - Emoji Picker

struct EmojiPickerView: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var selectedEmoji: String

    private let emojis = [
        "🎯", "🚀", "💪", "🧠", "💡", "⭐", "🔥", "💎",
        "🌟", "🏆", "📚", "✍️", "🎨", "🎵", "💻", "📱",
        "🏃", "🧘", "🌱", "🌳", "☀️", "🌙", "⚡", "💫",
        "❤️", "💜", "💙", "💚", "🧡", "💛", "🤍", "🖤"
    ]

    var body: some View {
        NavigationStack {
            ZStack {
                Color.charcoal
                    .ignoresSafeArea()

                LazyVGrid(columns: [
                    GridItem(.flexible()),
                    GridItem(.flexible()),
                    GridItem(.flexible()),
                    GridItem(.flexible())
                ], spacing: 16) {
                    ForEach(emojis, id: \.self) { emoji in
                        Button {
                            selectedEmoji = emoji
                            HapticFeedback.selection()
                            dismiss()
                        } label: {
                            Text(emoji)
                                .font(.system(size: 32))
                                .frame(width: 60, height: 60)
                                .background(selectedEmoji == emoji ? Color.story.opacity(0.3) : Color.cardBackground)
                                .cornerRadius(12)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Choose Emoji")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(.ivory.opacity(0.7))
                }
            }
        }
        .presentationDetents([.medium])
    }
}

#Preview {
    AddGoalView()
        .modelContainer(for: [Goal.self], inMemory: true)
}
