//
//  PillarSelectorStrip.swift
//  FlowHabits
//
//  Horizontal pillar pills with glow animation on selection
//

import SwiftUI

struct PillarSelectorStrip: View {
    @Binding var selectedPillar: Pillar
    var showLabels: Bool = true
    var compact: Bool = false

    var body: some View {
        HStack(spacing: compact ? 8 : 12) {
            ForEach(Pillar.displayOrder) { pillar in
                PillarPill(
                    pillar: pillar,
                    isSelected: selectedPillar == pillar,
                    showLabel: showLabels,
                    compact: compact
                ) {
                    withAnimation(.spring(duration: 0.3)) {
                        selectedPillar = pillar
                    }
                    Haptics.selection()
                }
            }
        }
    }
}

// MARK: - Pillar Pill

struct PillarPill: View {
    let pillar: Pillar
    let isSelected: Bool
    var showLabel: Bool = true
    var compact: Bool = false
    let action: () -> Void

    @State private var glowOpacity: Double = 0
    @State private var breathScale: CGFloat = 1.0

    var body: some View {
        Button(action: action) {
            VStack(spacing: compact ? 4 : 6) {
                ZStack {
                    // Glow behind icon when selected
                    if isSelected {
                        Circle()
                            .fill(pillar.color.opacity(0.3))
                            .frame(width: compact ? 24 : 28, height: compact ? 24 : 28)
                            .scaleEffect(breathScale)
                            .opacity(glowOpacity)
                    }

                    Image(systemName: pillar.iconName)
                        .font(.system(size: compact ? 14 : 18, weight: .semibold))
                        .foregroundStyle(isSelected ? .white : pillar.color)
                }

                if showLabel {
                    Text(pillar.displayName)
                        .font(.system(size: compact ? 10 : 11, weight: .semibold))
                        .foregroundStyle(isSelected ? .white : .textSecondary)
                }
            }
            .padding(.horizontal, compact ? 12 : 16)
            .padding(.vertical, compact ? 10 : 12)
            .background(
                Group {
                    if isSelected {
                        pillar.color
                    } else {
                        Color.cardBackground
                    }
                }
            )
            .clipShape(Capsule())
            .overlay(
                Capsule()
                    .strokeBorder(
                        isSelected ? pillar.color.opacity(0.5) : Color.white.opacity(0.06),
                        lineWidth: 1
                    )
            )
            .shadow(
                color: isSelected ? pillar.color.opacity(0.3) : .clear,
                radius: isSelected ? 8 : 0,
                y: 2
            )
        }
        .buttonStyle(PillarPillButtonStyle())
        .onChange(of: isSelected) { _, newValue in
            if newValue {
                // Start breathing animation when selected
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    glowOpacity = 0.8
                    breathScale = 1.15
                }
            } else {
                // Stop animation when deselected
                withAnimation(.easeOut(duration: 0.2)) {
                    glowOpacity = 0
                    breathScale = 1.0
                }
            }
        }
        .onAppear {
            if isSelected {
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    glowOpacity = 0.8
                    breathScale = 1.15
                }
            }
        }
    }
}

// MARK: - Button Style

struct PillarPillButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.spring(duration: 0.2), value: configuration.isPressed)
    }
}

// MARK: - Preview

#Preview {
    ZStack {
        Color.canvas.ignoresSafeArea()

        VStack(spacing: 24) {
            Text("Standard")
                .font(.caption)
                .foregroundStyle(.textSecondary)

            PillarSelectorStrip(selectedPillar: .constant(.self_))

            Text("Compact")
                .font(.caption)
                .foregroundStyle(.textSecondary)

            PillarSelectorStrip(selectedPillar: .constant(.space), compact: true)

            Text("Icons Only")
                .font(.caption)
                .foregroundStyle(.textSecondary)

            PillarSelectorStrip(selectedPillar: .constant(.story), showLabels: false)
        }
        .padding()
    }
}
