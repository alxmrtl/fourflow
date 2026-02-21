//
//  WholeStatDots.swift
//  FlowHabits
//
//  Visual pillar dots showing which dimensions have active habits
//  Replaces the text-based "WHOLE 2/4" stat
//

import SwiftUI

struct WholeStatDots: View {
    let habits: [Habit]
    var showLabel: Bool = true
    var size: CGFloat = 10

    private var activePillars: Set<Pillar> {
        Set(habits.filter { $0.isActive }.map(\.pillar))
    }

    var body: some View {
        VStack(spacing: 6) {
            // Dots row
            HStack(spacing: 4) {
                ForEach(Pillar.displayOrder) { pillar in
                    PillarDot(
                        pillar: pillar,
                        isActive: activePillars.contains(pillar),
                        size: size
                    )
                }
            }

            // Label
            if showLabel {
                Text("WHOLE")
                    .font(.system(size: 9, weight: .semibold))
                    .foregroundStyle(.textWhisper)
                    .tracking(1.0)
            }
        }
    }
}

// MARK: - Pillar Dot

struct PillarDot: View {
    let pillar: Pillar
    let isActive: Bool
    var size: CGFloat = 10

    @State private var breathScale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.0

    var body: some View {
        ZStack {
            // Glow behind active dots
            if isActive {
                Circle()
                    .fill(pillar.color.opacity(0.3))
                    .frame(width: size * 1.6, height: size * 1.6)
                    .scaleEffect(breathScale)
                    .opacity(glowOpacity)
            }

            // Main dot
            Circle()
                .fill(isActive ? pillar.color : Color.white.opacity(0.15))
                .frame(width: size, height: size)
                .scaleEffect(isActive ? breathScale : 1.0)
        }
        .frame(width: size * 1.8, height: size * 1.8)
        .onAppear {
            if isActive {
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    breathScale = 1.08
                    glowOpacity = 0.6
                }
            }
        }
        .onChange(of: isActive) { _, newValue in
            if newValue {
                withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                    breathScale = 1.08
                    glowOpacity = 0.6
                }
            } else {
                withAnimation(.easeOut(duration: 0.3)) {
                    breathScale = 1.0
                    glowOpacity = 0.0
                }
            }
        }
    }
}

// MARK: - Whole Stat Box (Dashboard Integration)

struct WholeStatBox: View {
    let habits: [Habit]
    var color: Color = .space

    private var activePillars: Set<Pillar> {
        Set(habits.filter { $0.isActive }.map(\.pillar))
    }

    var body: some View {
        VStack(spacing: 6) {
            // Pillar dots
            HStack(spacing: 3) {
                ForEach(Pillar.displayOrder) { pillar in
                    PillarDot(
                        pillar: pillar,
                        isActive: activePillars.contains(pillar),
                        size: 8
                    )
                }
            }

            // Label
            Text("WHOLE")
                .font(.system(size: 9, weight: .semibold))
                .foregroundStyle(.textWhisper)
                .tracking(1.0)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 10)
        .background(Color.white.opacity(0.03))
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(color.opacity(0.1), lineWidth: 1)
        )
    }
}

// MARK: - Preview

#Preview {
    ZStack {
        Color.canvas.ignoresSafeArea()

        VStack(spacing: 32) {
            Text("All Active")
                .font(.caption)
                .foregroundStyle(.textSecondary)

            WholeStatDots(habits: [])

            Text("Two Active")
                .font(.caption)
                .foregroundStyle(.textSecondary)

            WholeStatDots(habits: [])

            Text("Dashboard Box")
                .font(.caption)
                .foregroundStyle(.textSecondary)

            WholeStatBox(habits: [])
                .padding(.horizontal, 40)
        }
    }
}
