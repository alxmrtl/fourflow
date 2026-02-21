//
//  BreathworkAnimationView.swift
//  FlowZone
//
//  Animated breathing circle with scale, glow, and rotation
//

import SwiftUI

struct BreathworkAnimationView: View {
    let phase: BreathPhase?
    let progress: Double
    let color: Color

    // MARK: - Animation Calculations

    private var scale: Double {
        guard let phase = phase else { return 0.65 }

        switch phase.type {
        case .inhale:
            // 0.3 -> 1.0 with easeInOutQuart
            let eased = easeInOutQuart(progress)
            return 0.3 + (eased * 0.7)

        case .holdFull:
            // Gentle pulse at full size
            let time = progress * .pi * 6
            let pulse1 = sin(time) * 0.03
            let pulse2 = sin(time * 1.3 + 0.5) * 0.02
            return 1.0 + pulse1 + pulse2

        case .exhale:
            // 1.0 -> 0.3 with easeInOutSine
            let eased = easeInOutSine(progress)
            return 1.0 - (eased * 0.7)

        case .holdEmpty:
            // Subtle breathing at small size
            let time = progress * .pi * 4
            let pulse = sin(time) * 0.02
            return 0.3 + pulse
        }
    }

    private var glowIntensity: Double {
        guard let phase = phase else { return 0.5 }

        switch phase.type {
        case .inhale:
            return 0.2 + (easeInOutQuart(progress) * 0.6)
        case .holdFull:
            let time = progress * .pi * 3
            return 0.8 + (sin(time) * 0.15)
        case .exhale:
            return 0.8 - (easeInOutSine(progress) * 0.5)
        case .holdEmpty:
            return 0.25
        }
    }

    private var rotation: Angle {
        guard let phase = phase else { return .zero }

        switch phase.type {
        case .inhale:
            return .degrees(progress * 15)
        case .holdFull:
            return .degrees(15 + progress * 10)
        case .exhale:
            return .degrees(25 + progress * 15)
        case .holdEmpty:
            return .degrees(40 + progress * 5)
        }
    }

    private var blurAmount: Double {
        guard let phase = phase else { return 30 }

        switch phase.type {
        case .inhale:
            return 25 + (progress * 15)
        case .holdFull:
            let time = progress * .pi * 2
            return 40 + (sin(time) * 10)
        case .exhale:
            return 40 - (progress * 15)
        case .holdEmpty:
            return 25
        }
    }

    // MARK: - Body

    var body: some View {
        ZStack {
            // Layer 1: Ambient background glow
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            color.opacity(0.15),
                            color.opacity(0.08),
                            .clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 150
                    )
                )
                .scaleEffect(scale * 0.9)
                .blur(radius: blurAmount * 1.5)
                .opacity(glowIntensity * 0.6)

            // Layer 2: Outer glow ring
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            color.opacity(glowIntensity * 0.6),
                            color.opacity(glowIntensity * 0.3),
                            .clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 120
                    )
                )
                .scaleEffect(scale)
                .rotationEffect(rotation * 0.5)
                .blur(radius: blurAmount)

            // Layer 3: Middle ring
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            color.opacity(0.8),
                            color.opacity(0.4),
                            .clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 100
                    )
                )
                .frame(width: 180, height: 180)
                .scaleEffect(scale * 1.05)
                .rotationEffect(rotation * 0.7)
                .blur(radius: blurAmount * 0.6)
                .opacity(glowIntensity * 0.7)

            // Layer 4: Core solid circle
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            color,
                            color.opacity(0.85),
                            color.opacity(0.7)
                        ],
                        center: UnitPoint(x: 0.4, y: 0.4),
                        startRadius: 0,
                        endRadius: 80
                    )
                )
                .frame(width: 160, height: 160)
                .scaleEffect(scale)
                .shadow(color: color.opacity(glowIntensity), radius: 30)
                .shadow(color: color.opacity(glowIntensity * 0.5), radius: 60)

            // Layer 5: Inner highlight
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            .white.opacity(0.4),
                            .clear
                        ],
                        center: UnitPoint(x: 0.3, y: 0.3),
                        startRadius: 0,
                        endRadius: 50
                    )
                )
                .frame(width: 80, height: 80)
                .scaleEffect(scale * 1.1)
                .offset(x: -15, y: -15)
                .blur(radius: 10)
                .opacity(glowIntensity * 0.5)
        }
        .animation(.easeInOut(duration: 0.1), value: progress)
    }

    // MARK: - Easing Functions

    private func easeInOutQuart(_ t: Double) -> Double {
        t < 0.5 ? 8 * t * t * t * t : 1 - pow(-2 * t + 2, 4) / 2
    }

    private func easeInOutSine(_ t: Double) -> Double {
        -(cos(.pi * t) - 1) / 2
    }
}

#Preview {
    ZStack {
        Color.charcoal
            .ignoresSafeArea()

        BreathworkAnimationView(
            phase: BreathPhase(type: .inhale, duration: 4),
            progress: 0.5,
            color: .selfPillar
        )
        .frame(width: 280, height: 280)
    }
}
