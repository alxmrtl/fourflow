//
//  MainTabView.swift
//  FlowZone
//
//  Tab-based navigation - observatory aesthetic
//

import SwiftUI

struct MainTabView: View {
    @State private var selectedTab = 0

    init() {
        // Configure tab bar appearance - subtle, no blur
        let appearance = UITabBarAppearance()
        appearance.configureWithTransparentBackground()
        appearance.backgroundColor = UIColor(Color.canvas)

        // Subtle top border
        appearance.shadowColor = UIColor(Color.white.opacity(0.05))

        // Normal state - muted
        appearance.stackedLayoutAppearance.normal.iconColor = UIColor(Color.white.opacity(0.4))
        appearance.stackedLayoutAppearance.normal.titleTextAttributes = [
            .foregroundColor: UIColor(Color.white.opacity(0.4))
        ]

        // Selected state - pillar color
        appearance.stackedLayoutAppearance.selected.iconColor = UIColor(Color.selfPillar)
        appearance.stackedLayoutAppearance.selected.titleTextAttributes = [
            .foregroundColor: UIColor(Color.selfPillar)
        ]

        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            FlowView()
                .tabItem {
                    Label("Flow", systemImage: "play.circle.fill")
                }
                .tag(0)

            StatsView()
                .tabItem {
                    Label("Review", systemImage: "chart.bar.fill")
                }
                .tag(1)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape.fill")
                }
                .tag(2)
        }
        .tint(.selfPillar)
    }
}

#Preview {
    MainTabView()
        .environmentObject(AppState())
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
