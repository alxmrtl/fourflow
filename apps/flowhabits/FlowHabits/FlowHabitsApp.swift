//
//  FlowHabitsApp.swift
//  FlowHabits
//
//  A habit tracker built on the FlowHabits framework
//

import SwiftUI
import SwiftData

@main
struct FlowHabitsApp: App {
    @AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false

    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Habit.self,
            HabitCompletion.self
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            // Schema migration failed - delete old store and retry
            // This handles incompatible schema changes during development
            let url = URL.applicationSupportDirectory
                .appending(path: "default.store")

            // Remove all store files (main, wal, shm)
            let fileManager = FileManager.default
            let storeFiles = [url, url.appendingPathExtension("wal"), url.appendingPathExtension("shm")]
            for file in storeFiles {
                try? fileManager.removeItem(at: file)
            }

            // Retry container creation
            do {
                return try ModelContainer(for: schema, configurations: [modelConfiguration])
            } catch {
                fatalError("Could not create ModelContainer after recovery: \(error)")
            }
        }
    }()

    var body: some Scene {
        WindowGroup {
            if hasCompletedOnboarding {
                ContentView()
            } else {
                OnboardingContainerView()
            }
        }
        .modelContainer(sharedModelContainer)
    }
}
