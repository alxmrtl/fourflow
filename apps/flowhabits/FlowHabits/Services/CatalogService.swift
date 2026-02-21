//
//  CatalogService.swift
//  FlowHabits
//
//  Service for loading and querying the Flow Habit catalog
//

import Foundation

final class CatalogService {
    static let shared = CatalogService()

    private(set) var catalog: FlowHabitCatalog
    private(set) var habits: [FlowHabitTemplate]

    private init() {
        // Load catalog from bundled JSON
        guard let url = Bundle.main.url(forResource: "FlowHabitCatalog", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let loadedCatalog = try? JSONDecoder().decode(FlowHabitCatalog.self, from: data) else {
            // Fallback to empty catalog if loading fails
            print("Warning: Failed to load FlowHabitCatalog.json")
            self.catalog = FlowHabitCatalog(version: "0.0", habits: [])
            self.habits = []
            return
        }

        self.catalog = loadedCatalog
        self.habits = loadedCatalog.habits
    }

    // MARK: - Query Methods

    /// Get all habits for a specific pillar
    func habits(for pillar: Pillar) -> [FlowHabitTemplate] {
        habits.filter { $0.pillar == pillar }
    }

    /// Get all habits for a specific Flow Key
    func habits(for flowKey: FlowKey) -> [FlowHabitTemplate] {
        habits.filter { $0.flowKeyRaw == flowKey.rawValue }
    }

    /// Get a specific habit by ID
    func habit(withId id: String) -> FlowHabitTemplate? {
        habits.first { $0.id == id }
    }

    /// Search habits by query string
    func search(query: String) -> [FlowHabitTemplate] {
        guard !query.isEmpty else { return habits }
        return habits.filter { $0.matches(query: query) }
    }

    /// Get habits with any of the specified tags
    func habits(withTags tags: [String]) -> [FlowHabitTemplate] {
        guard !tags.isEmpty else { return habits }
        return habits.filter { $0.hasAnyTag(tags) }
    }

    /// Get habits by difficulty level
    func habits(difficulty: HabitDifficulty) -> [FlowHabitTemplate] {
        habits.filter { $0.difficulty == difficulty }
    }

    /// Get habits by tier
    func habits(tier: HabitTier) -> [FlowHabitTemplate] {
        habits.filter { $0.tier == tier }
    }

    /// Get habits for a Flow Key, organized by tier
    func habitsByTier(for flowKey: FlowKey) -> [HabitTier: [FlowHabitTemplate]] {
        let keyHabits = habits(for: flowKey)
        return Dictionary(grouping: keyHabits) { $0.tier }
    }

    /// Get habits suitable for beginners
    var beginnerHabits: [FlowHabitTemplate] {
        habits(difficulty: .beginner)
    }

    /// Get foundation-tier habits (most essential)
    var foundationHabits: [FlowHabitTemplate] {
        habits(tier: .foundations)
    }

    /// Get quick habits (under 10 minutes)
    var quickHabits: [FlowHabitTemplate] {
        habits.filter {
            guard let duration = $0.suggestedDuration else { return true }
            return duration <= 10
        }
    }

    /// Get habits with timers (for future premium features)
    var timedHabits: [FlowHabitTemplate] {
        habits.filter { $0.hasTimer }
    }

    // MARK: - Grouped Access

    /// Get all habits grouped by pillar
    var habitsByPillar: [Pillar: [FlowHabitTemplate]] {
        Dictionary(grouping: habits) { $0.pillar }
    }

    /// Get all habits grouped by Flow Key
    var habitsByFlowKey: [FlowKey: [FlowHabitTemplate]] {
        var result: [FlowKey: [FlowHabitTemplate]] = [:]
        for habit in habits {
            guard let key = habit.flowKey else { continue }
            result[key, default: []].append(habit)
        }
        return result
    }

    /// Get count of habits per pillar
    var countsByPillar: [Pillar: Int] {
        Dictionary(grouping: habits) { $0.pillar }
            .mapValues { $0.count }
    }

    /// Get count of habits per Flow Key
    var countsByFlowKey: [FlowKey: Int] {
        var result: [FlowKey: Int] = [:]
        for habit in habits {
            guard let key = habit.flowKey else { continue }
            result[key, default: 0] += 1
        }
        return result
    }

    // MARK: - Recommendations

    /// Get recommended habits for a set of prioritized Flow Keys
    func recommendedHabits(
        forKeys prioritizedKeys: [FlowKey],
        count: Int = 5,
        excludingTemplateIds: Set<String> = []
    ) -> [FlowHabitTemplate] {
        var result: [FlowHabitTemplate] = []
        var seen: Set<String> = excludingTemplateIds

        // Take top habits from each prioritized key, prioritizing foundations tier
        for key in prioritizedKeys {
            let keyHabits = habits(for: key)
                .filter { !seen.contains($0.id) }
                .sorted { $0.tier.sortOrder < $1.tier.sortOrder }

            for habit in keyHabits.prefix(2) {
                if result.count < count {
                    result.append(habit)
                    seen.insert(habit.id)
                }
            }
        }

        return result
    }

    /// Get a balanced set of habits across all pillars
    func balancedHabitSet(count: Int = 4) -> [FlowHabitTemplate] {
        var result: [FlowHabitTemplate] = []

        // One from each pillar, prioritizing foundations tier
        for pillar in Pillar.displayOrder {
            if result.count >= count { break }
            if let habit = habits(for: pillar)
                .filter({ $0.tier == .foundations })
                .first {
                result.append(habit)
            }
        }

        return result
    }

    /// Get recommended habits with guaranteed cross-pillar coverage, weighted by pillar scores
    ///
    /// Algorithm:
    /// 1. Baseline: 1 habit per pillar (4 habits minimum coverage)
    /// 2. Weighted extras: Distribute remaining slots proportionally by pillar score
    /// 3. Selection: For each pillar, pick from highest-scoring Flow Keys within that pillar
    func balancedRecommendedHabits(
        pillarScores: [Pillar: Double],
        flowKeyScores: [FlowKey: Double] = [:],
        totalCount: Int
    ) -> [FlowHabitTemplate] {
        var result: [FlowHabitTemplate] = []
        var seen: Set<String> = []

        // Calculate how many habits per pillar
        let pillarAllocation = calculatePillarAllocation(
            pillarScores: pillarScores,
            totalCount: totalCount
        )

        // For each pillar, select habits from highest-scoring flow keys
        for pillar in Pillar.displayOrder {
            let countForPillar = pillarAllocation[pillar] ?? 1
            let pillarHabits = selectHabitsForPillar(
                pillar: pillar,
                count: countForPillar,
                flowKeyScores: flowKeyScores,
                excluding: seen
            )

            for habit in pillarHabits {
                result.append(habit)
                seen.insert(habit.id)
            }
        }

        return result
    }

    /// Calculate how many habits to allocate per pillar based on scores
    private func calculatePillarAllocation(
        pillarScores: [Pillar: Double],
        totalCount: Int
    ) -> [Pillar: Int] {
        var allocation: [Pillar: Int] = [:]
        let pillars = Pillar.displayOrder

        // Baseline: 1 per pillar
        for pillar in pillars {
            allocation[pillar] = 1
        }

        // Calculate remaining slots to distribute
        let baseline = pillars.count
        var remaining = max(0, totalCount - baseline)

        if remaining > 0 {
            // Get total score for weighting
            let totalScore = pillarScores.values.reduce(0, +)

            if totalScore > 0 {
                // Sort pillars by score (highest first) for weighted distribution
                let sortedPillars = pillars.sorted { p1, p2 in
                    (pillarScores[p1] ?? 0) > (pillarScores[p2] ?? 0)
                }

                // Distribute remaining slots proportionally
                var distributed = 0
                for (index, pillar) in sortedPillars.enumerated() {
                    let score = pillarScores[pillar] ?? 0
                    let proportion = score / totalScore

                    // Calculate this pillar's share of remaining slots
                    var extra: Int
                    if index == sortedPillars.count - 1 {
                        // Last pillar gets whatever is left to avoid rounding issues
                        extra = remaining - distributed
                    } else {
                        extra = Int((Double(remaining) * proportion).rounded())
                    }

                    extra = max(0, min(extra, remaining - distributed))
                    allocation[pillar, default: 1] += extra
                    distributed += extra
                }
            } else {
                // No scores - distribute evenly to first pillars
                for pillar in pillars.prefix(remaining) {
                    allocation[pillar, default: 1] += 1
                }
            }
        }

        return allocation
    }

    /// Select habits for a pillar, prioritizing by flow key scores and tier
    private func selectHabitsForPillar(
        pillar: Pillar,
        count: Int,
        flowKeyScores: [FlowKey: Double],
        excluding seen: Set<String>
    ) -> [FlowHabitTemplate] {
        var result: [FlowHabitTemplate] = []

        // Get all habits for this pillar, excluding already selected
        let available = habits(for: pillar)
            .filter { !seen.contains($0.id) }

        // Sort by: flow key score (desc), then tier (foundations first)
        let sorted = available.sorted { h1, h2 in
            let score1 = h1.flowKey.map { flowKeyScores[$0] ?? 0 } ?? 0
            let score2 = h2.flowKey.map { flowKeyScores[$0] ?? 0 } ?? 0

            if score1 != score2 {
                return score1 > score2
            }

            return h1.tier.sortOrder < h2.tier.sortOrder
        }

        // Take the requested count
        for habit in sorted.prefix(count) {
            result.append(habit)
        }

        return result
    }
}
