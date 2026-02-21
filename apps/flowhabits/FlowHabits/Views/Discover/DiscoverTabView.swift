//
//  DiscoverTabView.swift
//  FlowHabits
//
//  Discover practices - where curiosity meets commitment
//  Uses PracticePickerView in immersive mode for full-screen exploration
//

import SwiftUI
import SwiftData

struct DiscoverTabView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<Habit> { $0.isActive }) private var activeHabits: [Habit]

    @State private var selectedPillar: Pillar = .self_

    var body: some View {
        NavigationStack {
            PracticePickerView(mode: .immersive, selectedPillar: selectedPillar)
                .navigationBarHidden(true)
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - Preview

#Preview {
    DiscoverTabView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
