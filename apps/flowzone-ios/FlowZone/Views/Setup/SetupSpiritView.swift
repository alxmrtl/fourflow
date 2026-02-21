//
//  SetupSpiritView.swift
//  FlowZone
//
//  Spirit pillar setup: Vision only (simplified)
//

import SwiftUI
import SwiftData

struct SetupSpiritView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    @Query private var profiles: [Profile]

    var onComplete: (() -> Void)?

    @State private var vision: String = ""

    private var profile: Profile? {
        profiles.first
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "sparkles")
                        .font(.largeTitle)
                        .foregroundColor(.spirit)

                    Text("SPIRIT")
                        .font(.title2.weight(.bold))
                        .foregroundColor(.ivory)

                    Text("What's your vision?")
                        .font(.subheadline)
                        .foregroundColor(.spirit)

                    Text("Describe your ideal future")
                        .font(.caption)
                        .foregroundColor(.ivory.opacity(0.5))
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 32)

                // Vision
                visionSection

                // Continue button
                Button {
                    saveAndContinue()
                } label: {
                    HStack {
                        Text(onComplete != nil ? "Continue" : "Save")
                        if onComplete != nil {
                            Image(systemName: "arrow.right")
                        }
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color.spirit)
                    .cornerRadius(16)
                }
                .padding(.horizontal)
                .padding(.bottom, 32)
            }
        }
        .background(Color.charcoal)
        .onAppear {
            if let profile {
                vision = profile.vision
            }
        }
    }

    // MARK: - Vision Section

    private var visionSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("YOUR VISION")
                .font(.caption.weight(.semibold))
                .foregroundColor(.spirit.opacity(0.8))

            Text("What does your ideal life look like?")
                .font(.caption)
                .foregroundColor(.ivory.opacity(0.5))

            TextEditor(text: $vision)
                .font(.subheadline)
                .foregroundColor(.ivory)
                .scrollContentBackground(.hidden)
                .background(Color.charcoal)
                .frame(minHeight: 150)
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.spirit.opacity(0.3), lineWidth: 1)
                )
        }
        .padding()
        .background(Color.cardBackground)
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Save

    private func saveAndContinue() {
        if let profile {
            profile.update(vision: vision)
        } else {
            let newProfile = Profile(vision: vision)
            modelContext.insert(newProfile)
        }

        try? modelContext.save()
        HapticFeedback.success()

        if let onComplete {
            onComplete()
        } else {
            dismiss()
        }
    }
}

#Preview {
    SetupSpiritView()
        .modelContainer(for: [Profile.self], inMemory: true)
}
