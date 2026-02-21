//
//  ContentView.swift
//  FlowHabits
//
//  Four dimensions of practice - the daily flow interface
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @State private var selectedTab = 0
    @AppStorage("shouldOpenPracticesTab") private var shouldOpenPracticesTab = false

    var body: some View {
        TabView(selection: $selectedTab) {
            TodayView()
                .tabItem {
                    Label("Now", systemImage: "circle.circle.fill")
                }
                .tag(0)

            DiscoverTabView()
                .tabItem {
                    Label("Practices", systemImage: "sparkles")
                }
                .tag(1)

            StatsView()
                .tabItem {
                    Label("Rhythm", systemImage: "waveform.path")
                }
                .tag(2)

            SettingsView()
                .tabItem {
                    Label("Tune", systemImage: "slider.horizontal.3")
                }
                .tag(3)
        }
        .tint(.ivory)
        .onAppear {
            if shouldOpenPracticesTab {
                selectedTab = 1
                shouldOpenPracticesTab = false
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: [Habit.self, HabitCompletion.self], inMemory: true)
}
