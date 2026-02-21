//
//  SetupSpaceView.swift
//  FlowZone
//
//  Space pillar setup: Environment & Tools
//

import SwiftUI
import SwiftData

struct SetupSpaceView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    @Query private var settingsQuery: [AppSettings]

    var onComplete: (() -> Void)?

    private var settings: AppSettings? {
        settingsQuery.first
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "square.grid.2x2.fill")
                        .font(.largeTitle)
                        .foregroundColor(.space)

                    Text("SPACE")
                        .font(.title2.weight(.bold))
                        .foregroundColor(.ivory)

                    Text("What supports your flow?")
                        .font(.subheadline)
                        .foregroundColor(.space)

                    Text("Configure your focus environment")
                        .font(.caption)
                        .foregroundColor(.ivory.opacity(0.5))
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 32)

                // Timer Duration
                timerSection

                // Breathwork
                breathworkSection

                // Sound
                soundSection

                // Continue button
                Button {
                    try? modelContext.save()
                    HapticFeedback.success()

                    if let onComplete {
                        onComplete()
                    } else {
                        dismiss()
                    }
                } label: {
                    HStack {
                        Text(onComplete != nil ? "Continue" : "Done")
                        if onComplete != nil {
                            Image(systemName: "arrow.right")
                        }
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color.space)
                    .cornerRadius(16)
                }
                .padding(.horizontal)
                .padding(.bottom, 32)
            }
        }
        .background(Color.charcoal)
        .onAppear {
            ensureSettings()
        }
    }

    private func ensureSettings() {
        if settings == nil {
            let newSettings = AppSettings()
            modelContext.insert(newSettings)
            try? modelContext.save()
        }
    }

    // MARK: - Timer Section

    private var timerSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("FOCUS DURATION")
                .font(.caption.weight(.semibold))
                .foregroundColor(.space.opacity(0.8))

            Text("How long do you want to focus?")
                .font(.caption)
                .foregroundColor(.ivory.opacity(0.5))

            HStack(spacing: 12) {
                ForEach(AppSettings.timerPresets, id: \.self) { duration in
                    Button {
                        settings?.timerDuration = duration
                        try? modelContext.save()
                        HapticFeedback.selection()
                    } label: {
                        VStack(spacing: 4) {
                            Text("\(duration)")
                                .font(.title2.weight(.bold))

                            Text("min")
                                .font(.caption)
                        }
                        .foregroundColor(settings?.timerDuration == duration ? .white : .space)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(settings?.timerDuration == duration ? Color.space : Color.charcoal)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.space.opacity(0.3), lineWidth: 1)
                        )
                    }
                }
            }
        }
        .padding()
        .background(Color.cardBackground)
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Breathwork Section

    private var breathworkSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("BREATHWORK")
                .font(.caption.weight(.semibold))
                .foregroundColor(.space.opacity(0.8))

            Text("Prepare and recover with guided breathing")
                .font(.caption)
                .foregroundColor(.ivory.opacity(0.5))

            VStack(spacing: 12) {
                // Before focus
                HStack {
                    Text("Before focus")
                        .font(.subheadline)
                        .foregroundColor(.ivory.opacity(0.7))

                    Spacer()

                    Picker("Before", selection: Binding(
                        get: { settings?.breathworkBefore ?? .none },
                        set: { newValue in
                            settings?.breathworkBefore = newValue
                            try? modelContext.save()
                        }
                    )) {
                        ForEach(BreathworkPattern.beforePatterns) { pattern in
                            Text(pattern.displayName).tag(pattern)
                        }
                    }
                    .pickerStyle(.menu)
                    .tint(.space)
                }

                Divider()
                    .background(Color.ivory.opacity(0.1))

                // After focus
                HStack {
                    Text("After focus")
                        .font(.subheadline)
                        .foregroundColor(.ivory.opacity(0.7))

                    Spacer()

                    Picker("After", selection: Binding(
                        get: { settings?.breathworkAfter ?? .none },
                        set: { newValue in
                            settings?.breathworkAfter = newValue
                            try? modelContext.save()
                        }
                    )) {
                        ForEach(BreathworkPattern.afterPatterns) { pattern in
                            Text(pattern.displayName).tag(pattern)
                        }
                    }
                    .pickerStyle(.menu)
                    .tint(.space)
                }
            }
        }
        .padding()
        .background(Color.cardBackground)
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Sound Section

    private var soundSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("BACKGROUND SOUND")
                .font(.caption.weight(.semibold))
                .foregroundColor(.space.opacity(0.8))

            Text("Ambient audio during focus sessions")
                .font(.caption)
                .foregroundColor(.ivory.opacity(0.5))

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 12) {
                ForEach(BackgroundSound.allCases) { sound in
                    Button {
                        settings?.sound = sound
                        try? modelContext.save()
                        HapticFeedback.selection()
                    } label: {
                        VStack(spacing: 8) {
                            Image(systemName: sound.iconName)
                                .font(.title2)

                            Text(sound.displayName)
                                .font(.caption)
                                .lineLimit(1)
                        }
                        .foregroundColor(settings?.sound == sound ? .white : .ivory.opacity(0.7))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(settings?.sound == sound ? Color.space : Color.charcoal)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.space.opacity(0.3), lineWidth: 1)
                        )
                    }
                }
            }
        }
        .padding()
        .background(Color.cardBackground)
        .cornerRadius(16)
        .padding(.horizontal)
    }
}

#Preview {
    SetupSpaceView()
        .modelContainer(for: [AppSettings.self], inMemory: true)
}
