//
//  FlowZoneApp.swift
//  FlowZone
//
//  Flow-state productivity app with focus timer, breathwork, and the Four Pillars framework
//

import SwiftUI
import SwiftData

@main
struct FlowZoneApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Profile.self,
            Goal.self,
            FlowTask.self,
            Session.self,
            AppSettings.self,
            DailyQueue.self
        ])
        let modelConfiguration = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false,
            cloudKitDatabase: .none  // Local-only for MVP
        )

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .preferredColorScheme(.dark)
        }
        .modelContainer(sharedModelContainer)
    }
}
