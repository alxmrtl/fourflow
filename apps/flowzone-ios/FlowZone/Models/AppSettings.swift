//
//  AppSettings.swift
//  FlowZone
//
//  App preferences for timer, sounds, and breathwork
//  Named AppSettings to avoid conflict with SwiftUI Settings
//

import Foundation
import SwiftData

// MARK: - Breathwork Patterns

enum BreathworkPattern: String, Codable, CaseIterable, Identifiable {
    case none
    case boxBreathing = "box-breathing"
    case energizingBreath = "energizing-breath"
    case powerBreath = "power-breath"
    case relaxation478 = "relaxation-478"
    case coherentBreathing = "coherent-breathing"
    case groundingBreath = "grounding-breath"
    case fourLayer = "four-layer"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .none: return "None"
        case .boxBreathing: return "Box Breathing"
        case .energizingBreath: return "Energizing Breath"
        case .powerBreath: return "Power Breath"
        case .relaxation478: return "4-7-8 Relaxation"
        case .coherentBreathing: return "Coherent Breathing"
        case .groundingBreath: return "Grounding Breath"
        case .fourLayer: return "Four Layer Breath"
        }
    }

    var description: String {
        switch self {
        case .none: return "Skip breathwork"
        case .boxBreathing: return "Equal breathing for calm focus (4-4-4-4)"
        case .energizingBreath: return "Quick breathing for high alert (2-2)"
        case .powerBreath: return "Build confidence and readiness (4-4-6-2)"
        case .relaxation478: return "Deep relaxation and recovery (4-7-8)"
        case .coherentBreathing: return "Balance your nervous system (5-5)"
        case .groundingBreath: return "Integration and centering (4-2-6-2)"
        case .fourLayer: return "Align with all four pillars (8-4-8)"
        }
    }

    var timing: PatternTiming {
        switch self {
        case .none: return .either
        case .boxBreathing, .energizingBreath, .powerBreath: return .before
        case .relaxation478, .coherentBreathing, .groundingBreath: return .after
        case .fourLayer: return .either
        }
    }

    enum PatternTiming {
        case before
        case after
        case either
    }

    static var beforePatterns: [BreathworkPattern] {
        [.none, .boxBreathing, .energizingBreath, .powerBreath, .fourLayer]
    }

    static var afterPatterns: [BreathworkPattern] {
        [.none, .relaxation478, .coherentBreathing, .groundingBreath, .fourLayer]
    }
}

// MARK: - Background Sounds

enum BackgroundSound: String, Codable, CaseIterable, Identifiable {
    case none
    case binaural

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .none: return "None"
        case .binaural: return "Binaural Beats"
        }
    }

    var description: String {
        switch self {
        case .none: return "No background audio"
        case .binaural: return "10 Hz alpha waves for flow state"
        }
    }

    var iconName: String {
        switch self {
        case .none: return "speaker.slash"
        case .binaural: return "waveform.circle"
        }
    }
}

// MARK: - Settings Panel

enum SettingsPanel: String, Codable, CaseIterable, Identifiable {
    case act
    case settings
    case mission
    case vision

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .act: return "ACT"
        case .settings: return "SETTINGS"
        case .mission: return "MISSION"
        case .vision: return "VISION"
        }
    }

    var iconName: String {
        switch self {
        case .act: return "bolt.fill"
        case .settings: return "gearshape.fill"
        case .mission: return "flag.fill"
        case .vision: return "sparkles"
        }
    }

    var color: Color {
        switch self {
        case .act: return .selfPillar
        case .settings: return .space
        case .mission: return .story
        case .vision: return .spirit
        }
    }
}

import SwiftUI

// MARK: - Settings Model

@Model
final class AppSettings {
    @Attribute(.unique) var id: String = "app-settings"

    // Container Settings (Flow sessions per day)
    var dailyContainerCount: Int = 3    // 1-5 flow sessions per day

    // Timer Settings
    var timerDuration: Int = 25          // Default focus duration in minutes
    var breakDuration: Int = 5           // Short break duration
    var longBreakDuration: Int = 15      // Long break duration

    // Sound Settings
    var soundRaw: String = "none"
    var volume: Double = 0.5             // 0.0 to 1.0

    // Breathwork Settings
    var breathworkBeforeRaw: String = "none"
    var breathworkAfterRaw: String = "none"

    // Default Settings Panel
    var defaultSettingsPanelRaw: String = "settings"

    // MARK: - Computed Properties

    var sound: BackgroundSound {
        get { BackgroundSound(rawValue: soundRaw) ?? .none }
        set { soundRaw = newValue.rawValue }
    }

    var breathworkBefore: BreathworkPattern {
        get { BreathworkPattern(rawValue: breathworkBeforeRaw) ?? .none }
        set { breathworkBeforeRaw = newValue.rawValue }
    }

    var breathworkAfter: BreathworkPattern {
        get { BreathworkPattern(rawValue: breathworkAfterRaw) ?? .none }
        set { breathworkAfterRaw = newValue.rawValue }
    }

    var defaultSettingsPanel: SettingsPanel {
        get { SettingsPanel(rawValue: defaultSettingsPanelRaw) ?? .settings }
        set { defaultSettingsPanelRaw = newValue.rawValue }
    }

    // MARK: - Presets

    static let timerPresets = [25, 50, 90]
    static let containerPresets = [1, 2, 3, 4, 5]

    // MARK: - Initialization

    init() {
        self.dailyContainerCount = 3  // Default to 3 flow sessions per day
        self.timerDuration = 25
        self.breakDuration = 5
        self.longBreakDuration = 15
        self.soundRaw = BackgroundSound.none.rawValue
        self.volume = 0.5
        self.breathworkBeforeRaw = BreathworkPattern.none.rawValue
        self.breathworkAfterRaw = BreathworkPattern.none.rawValue
        self.defaultSettingsPanelRaw = SettingsPanel.settings.rawValue
    }
}
