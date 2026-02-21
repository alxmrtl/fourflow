//
//  FlowKey.swift
//  FlowHabits
//
//  The 12 Flow Keys that organize habits within each pillar
//

import SwiftUI

enum FlowKey: String, CaseIterable, Codable, Identifiable {
    // SELF Pillar Keys
    case tunedEmotions
    case focusedBody
    case openMind

    // SPACE Pillar Keys
    case intentionalSpace
    case optimizedTools
    case feedbackSystems

    // STORY Pillar Keys
    case generativeStory
    case clearMission
    case empoweredRole

    // SPIRIT Pillar Keys
    case groundingValues
    case ignitedCuriosity
    case visualizedVision

    var id: String { rawValue }

    // MARK: - Pillar Mapping

    var pillar: Pillar {
        switch self {
        case .tunedEmotions, .focusedBody, .openMind:
            return .self_
        case .intentionalSpace, .optimizedTools, .feedbackSystems:
            return .space
        case .generativeStory, .clearMission, .empoweredRole:
            return .story
        case .groundingValues, .ignitedCuriosity, .visualizedVision:
            return .spirit
        }
    }

    // MARK: - Display Properties

    var displayName: String {
        switch self {
        case .tunedEmotions: return "Tuned Emotions"
        case .focusedBody: return "Focused Body"
        case .openMind: return "Open Mind"
        case .intentionalSpace: return "Intentional Space"
        case .optimizedTools: return "Optimized Tools"
        case .feedbackSystems: return "Feedback Systems"
        case .generativeStory: return "Generative Story"
        case .clearMission: return "Clear Mission"
        case .empoweredRole: return "Empowered Role"
        case .groundingValues: return "Grounding Values"
        case .ignitedCuriosity: return "Ignited Curiosity"
        case .visualizedVision: return "Visualized Vision"
        }
    }

    var tagline: String {
        switch self {
        case .tunedEmotions: return "Emotions as compass"
        case .focusedBody: return "Deep embodiment"
        case .openMind: return "Mental clarity"
        case .intentionalSpace: return "Environment design"
        case .optimizedTools: return "Leverage & systems"
        case .feedbackSystems: return "Progress tracking"
        case .generativeStory: return "Narrative alignment"
        case .clearMission: return "Goal hierarchy"
        case .empoweredRole: return "Identity work"
        case .groundingValues: return "Core principles"
        case .ignitedCuriosity: return "Active exploration"
        case .visualizedVision: return "Future sight"
        }
    }

    var description: String {
        switch self {
        case .tunedEmotions:
            return "Use emotions as a compass through the Challenge-Skills Balance. Stay 4% outside your comfort zone—engaged without overwhelm."
        case .focusedBody:
            return "Shift from mental chatter to body awareness. Activate the Task-Positive Network by engaging your senses fully in the present moment."
        case .openMind:
            return "Cultivate mental flexibility and clarity. Reduce cognitive clutter through brain dumps, beginner's mindset, and singular focus."
        case .intentionalSpace:
            return "Design your environment for flow. Remove 99% of distractions, control sensory inputs, and create a space that supports deep work."
        case .optimizedTools:
            return "Do more with less through leverage. Focus on ROI over hours worked with the right tools and minimal friction."
        case .feedbackSystems:
            return "Accelerate learning with immediate, clear feedback. Measure what matters and iterate quickly toward mastery."
        case .generativeStory:
            return "Embrace the Flow Cycle: Struggle, Release, Flow, Recovery. Frustration signals learning—struggle gracefully through the process."
        case .clearMission:
            return "Break your vision into actionable steps. A clear mission hierarchy from years to quarters to days creates unstoppable momentum."
        case .empoweredRole:
            return "Claim autonomy over your work. T-shaped specialization with clear ownership creates the conditions for deep engagement."
        case .groundingValues:
            return "Anchor in core principles that guide decisions. Values-aligned action requires no willpower—it flows naturally."
        case .ignitedCuriosity:
            return "Follow the breadcrumbs of genuine interest. Curiosity is an active force that pulls you toward meaningful challenges."
        case .visualizedVision:
            return "Bridge your current reality to your desired future. A clear vision acts as a lighthouse through the fog of daily challenges."
        }
    }

    var iconName: String {
        switch self {
        case .tunedEmotions: return "slider.horizontal.3"
        case .focusedBody: return "figure.mind.and.body"
        case .openMind: return "brain.head.profile"
        case .intentionalSpace: return "house.fill"
        case .optimizedTools: return "wrench.and.screwdriver.fill"
        case .feedbackSystems: return "chart.bar.fill"
        case .generativeStory: return "scroll.fill"
        case .clearMission: return "target"
        case .empoweredRole: return "crown.fill"
        case .groundingValues: return "anchor"
        case .ignitedCuriosity: return "flame.fill"
        case .visualizedVision: return "eye.circle.fill"
        }
    }

    var color: Color {
        pillar.color
    }

    // MARK: - Grouping

    static var byPillar: [Pillar: [FlowKey]] {
        [
            .self_: [.tunedEmotions, .focusedBody, .openMind],
            .space: [.intentionalSpace, .optimizedTools, .feedbackSystems],
            .story: [.generativeStory, .clearMission, .empoweredRole],
            .spirit: [.groundingValues, .ignitedCuriosity, .visualizedVision]
        ]
    }

    static func keys(for pillar: Pillar) -> [FlowKey] {
        byPillar[pillar] ?? []
    }
}

// MARK: - Pillar Extension

extension Pillar {
    var flowKeys: [FlowKey] {
        FlowKey.keys(for: self)
    }
}
