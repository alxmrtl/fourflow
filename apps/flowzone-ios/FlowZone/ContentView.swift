//
//  ContentView.swift
//  FlowZone
//
//  Root navigation controller
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        ZStack {
            Color.charcoal
                .ignoresSafeArea()

            if appState.isInFocusMode {
                FocusModeView()
                    .transition(.opacity.combined(with: .scale(scale: 0.95)))
            } else if appState.showBreathwork {
                BreathworkContainerView()
                    .transition(.opacity)
            } else if !appState.hasCompletedOnboarding {
                SetupContainerView()
                    .transition(.opacity)
            } else {
                MainTabView()
                    .transition(.opacity)
            }
        }
        .animation(.easeInOut(duration: 0.5), value: appState.isInFocusMode)
        .animation(.easeInOut(duration: 0.5), value: appState.showBreathwork)
        .animation(.easeInOut(duration: 0.3), value: appState.hasCompletedOnboarding)
        .onAppear {
            appState.initialize(modelContext: modelContext)
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
