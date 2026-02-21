//
//  FlowDesignSystem.swift
//  FlowHabits
//
//  Sacred geometry, typography, and ambient design components
//

import SwiftUI
import UIKit

// MARK: - Mandala Background

/// A procedurally generated sacred geometry pattern that slowly rotates
/// Used as ambient background element - barely visible, deeply felt
struct MandalaBackground: View {
    @State private var rotation: Double = 0

    let opacity: Double
    let color: Color

    init(opacity: Double = 0.02, color: Color = .white) {
        self.opacity = opacity
        self.color = color
    }

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height) * 0.9

            ZStack {
                // Outer circle
                Circle()
                    .stroke(color.opacity(opacity), lineWidth: 0.5)

                // Inner circles - nested
                ForEach(1..<5) { i in
                    Circle()
                        .stroke(color.opacity(opacity * 0.8), lineWidth: 0.5)
                        .frame(width: size * CGFloat(5 - i) / 5)
                }

                // Four-fold symmetry lines (representing the four pillars)
                ForEach(0..<4) { i in
                    Rectangle()
                        .fill(color.opacity(opacity * 0.6))
                        .frame(width: 0.5, height: size * 0.8)
                        .rotationEffect(.degrees(Double(i) * 45))
                }

                // Eight-fold petals
                ForEach(0..<8) { i in
                    Ellipse()
                        .stroke(color.opacity(opacity * 0.5), lineWidth: 0.5)
                        .frame(width: size * 0.3, height: size * 0.5)
                        .offset(y: -size * 0.15)
                        .rotationEffect(.degrees(Double(i) * 45))
                }

                // Central point - the self
                Circle()
                    .fill(color.opacity(opacity * 2))
                    .frame(width: 4, height: 4)
            }
            .frame(width: size, height: size)
            .rotationEffect(.degrees(rotation))
            .position(x: geo.size.width / 2, y: geo.size.height / 2)
            .onAppear {
                withAnimation(.linear(duration: 60).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
        }
    }
}

// MARK: - Four Elements Mandala (Pillar-colored)

/// A mandala where each quadrant represents a pillar
struct FourElementsMandala: View {
    @State private var rotation: Double = 0
    let opacity: Double

    init(opacity: Double = 0.03) {
        self.opacity = opacity
    }

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height) * 0.85

            ZStack {
                // Four quadrant arcs - one per pillar
                ForEach(Array(Pillar.displayOrder.enumerated()), id: \.element.id) { index, pillar in
                    Circle()
                        .trim(from: CGFloat(index) / 4, to: CGFloat(index + 1) / 4)
                        .stroke(pillar.color.opacity(opacity), lineWidth: 1)
                        .frame(width: size, height: size)
                }

                // Inner rings
                ForEach(1..<4) { i in
                    ForEach(Array(Pillar.displayOrder.enumerated()), id: \.element.id) { index, pillar in
                        Circle()
                            .trim(from: CGFloat(index) / 4, to: CGFloat(index + 1) / 4)
                            .stroke(pillar.color.opacity(opacity * 0.7), lineWidth: 0.5)
                            .frame(width: size * CGFloat(4 - i) / 4)
                    }
                }

                // Central spectrum dot
                Circle()
                    .fill(
                        AngularGradient(
                            colors: Pillar.displayOrder.map { $0.color.opacity(opacity * 3) },
                            center: .center
                        )
                    )
                    .frame(width: 8, height: 8)
            }
            .rotationEffect(.degrees(rotation - 90)) // Start from top
            .position(x: geo.size.width / 2, y: geo.size.height / 2)
            .onAppear {
                withAnimation(.linear(duration: 90).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
        }
    }
}

// MARK: - Typography System

extension Font {
    // MARK: - Inter Font (Brand Font)

    /// Check if Inter is available, fallback to system rounded
    private static func inter(size: CGFloat, weight: Font.Weight) -> Font {
        let fontName: String
        switch weight {
        case .regular:
            fontName = "Inter-Regular"
        case .medium:
            fontName = "Inter-Medium"
        case .semibold:
            fontName = "Inter-SemiBold"
        case .bold:
            fontName = "Inter-Bold"
        default:
            fontName = "Inter-Regular"
        }

        // Try custom font, fallback to system rounded
        if let _ = UIFont(name: fontName, size: size) {
            return Font.custom(fontName, size: size)
        }
        return Font.system(size: size, weight: weight, design: .rounded)
    }

    // MARK: - Display (Headlines)

    /// Proclamation - the largest, boldest statement
    static let proclamation = inter(size: 48, weight: .bold)

    /// Statement - primary headlines
    static let statement = inter(size: 40, weight: .bold)

    /// Heading - section headers
    static let flowHeading = inter(size: 32, weight: .bold)

    /// Subheading - secondary headers
    static let flowSubheading = inter(size: 24, weight: .semibold)

    // MARK: - Body

    /// Body - primary reading text
    static let flowBody = inter(size: 16, weight: .regular)

    /// Body emphasized
    static let flowBodyBold = inter(size: 16, weight: .semibold)

    // MARK: - Supporting

    /// Whisper - quiet, secondary text
    static let whisper = inter(size: 14, weight: .regular)

    /// Label - uppercase tracking labels
    static let flowLabel = inter(size: 10, weight: .bold)

    /// Metric - large numbers
    static let metric = inter(size: 56, weight: .bold)

    /// Metric small
    static let metricSmall = inter(size: 32, weight: .bold)

    // MARK: - Quiz Typography

    /// Quiz instruction - the gut-check prompt
    static let quizInstruction = inter(size: 15, weight: .medium)

    /// Quiz question - the metaphor prompt
    static let quizQuestion = inter(size: 20, weight: .semibold)

    /// Quiz answer - the tappable choice
    static let quizAnswer = inter(size: 14, weight: .medium)
}

// MARK: - Ambient Glow Layer

/// A reusable ambient glow that can be placed behind content
struct AmbientGlow: View {
    let color: Color
    let position: UnitPoint
    let radius: CGFloat
    let opacity: Double

    init(
        color: Color = .spirit,
        position: UnitPoint = .bottom,
        radius: CGFloat = 300,
        opacity: Double = 0.12
    ) {
        self.color = color
        self.position = position
        self.radius = radius
        self.opacity = opacity
    }

    var body: some View {
        RadialGradient(
            colors: [color.opacity(opacity), Color.clear],
            center: position,
            startRadius: 0,
            endRadius: radius
        )
    }
}

// MARK: - Glass Card Modifier

struct GlassCard: ViewModifier {
    var cornerRadius: CGFloat = 16
    var borderColor: Color = .white
    var borderOpacity: Double = 0.08

    func body(content: Content) -> some View {
        content
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .stroke(borderColor.opacity(borderOpacity), lineWidth: 1)
            )
    }
}

extension View {
    func glassCard(cornerRadius: CGFloat = 16, borderColor: Color = .white) -> some View {
        modifier(GlassCard(cornerRadius: cornerRadius, borderColor: borderColor))
    }

    func pillarCard(_ pillar: Pillar, cornerRadius: CGFloat = 16) -> some View {
        modifier(GlassCard(cornerRadius: cornerRadius, borderColor: pillar.color, borderOpacity: 0.12))
    }
}

// MARK: - Breathing Modifier

struct BreathingModifier: ViewModifier {
    @State private var scale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.3

    let intensity: CGFloat // 0.01 to 0.05 typical
    let duration: Double

    func body(content: Content) -> some View {
        content
            .scaleEffect(scale)
            .onAppear {
                withAnimation(.easeInOut(duration: duration).repeatForever(autoreverses: true)) {
                    scale = 1.0 + intensity
                    glowOpacity = 0.6
                }
            }
    }
}

extension View {
    /// Makes the view gently breathe (scale pulse)
    func breathing(intensity: CGFloat = 0.02, duration: Double = 6.0) -> some View {
        modifier(BreathingModifier(intensity: intensity, duration: duration))
    }
}

// MARK: - Streak Celebration View

struct StreakCelebration: View {
    let streakCount: Int
    let pillarColor: Color

    @State private var showCelebration = false
    @State private var ringScale: CGFloat = 0.5
    @State private var ringOpacity: Double = 1.0

    private var isMilestone: Bool {
        [7, 14, 21, 30, 60, 90, 100, 365].contains(streakCount)
    }

    private var milestoneMessage: String {
        switch streakCount {
        case 7: return "One week of presence"
        case 14: return "Two weeks strong"
        case 21: return "A habit is forming"
        case 30: return "One month of practice"
        case 60: return "Two months of dedication"
        case 90: return "Quarter year of flow"
        case 100: return "Century achieved"
        case 365: return "One year. Transformed."
        default: return ""
        }
    }

    var body: some View {
        ZStack {
            if showCelebration && isMilestone {
                // Multiple expanding rings
                ForEach(0..<3) { i in
                    Circle()
                        .stroke(pillarColor.opacity(0.3 - Double(i) * 0.1), lineWidth: 2)
                        .scaleEffect(ringScale + CGFloat(i) * 0.2)
                        .opacity(ringOpacity)
                }

                VStack(spacing: 8) {
                    HStack(spacing: 4) {
                        Image(systemName: "flame.fill")
                            .font(.system(size: 24))
                        Text("\(streakCount)")
                            .font(.system(size: 32, weight: .bold, design: .rounded))
                    }
                    .foregroundStyle(.amber)

                    Text(milestoneMessage)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(.textSecondary)
                }
            }
        }
        .onAppear {
            if isMilestone {
                showCelebration = true
                withAnimation(.easeOut(duration: 1.5)) {
                    ringScale = 2.0
                    ringOpacity = 0
                }
            }
        }
    }
}

// MARK: - Section Header Component

struct FlowSectionHeader: View {
    let title: String
    var subtitle: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title.uppercased())
                .font(.flowLabel)
                .foregroundStyle(.textWhisper)
                .tracking(1.2)

            if let subtitle = subtitle {
                Text(subtitle)
                    .font(.whisper)
                    .foregroundStyle(.textSecondary)
            }
        }
    }
}

// MARK: - Pillar Glow Modifier

struct PillarGlowModifier: ViewModifier {
    let pillar: Pillar
    let isSelected: Bool

    @State private var glowOpacity: Double = 0

    func body(content: Content) -> some View {
        content
            .shadow(
                color: isSelected ? pillar.color.opacity(glowOpacity) : .clear,
                radius: 12,
                y: 4
            )
            .onAppear {
                if isSelected {
                    withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                        glowOpacity = 0.4
                    }
                }
            }
            .onChange(of: isSelected) { _, newValue in
                if newValue {
                    withAnimation(.easeInOut(duration: FlowAnimation.fullBreath).repeatForever(autoreverses: true)) {
                        glowOpacity = 0.4
                    }
                } else {
                    withAnimation(.easeOut(duration: 0.3)) {
                        glowOpacity = 0
                    }
                }
            }
    }
}

extension View {
    func pillarGlow(_ pillar: Pillar, isSelected: Bool) -> some View {
        modifier(PillarGlowModifier(pillar: pillar, isSelected: isSelected))
    }
}

// MARK: - Satisfying Tap Animation Modifier

struct SatisfyingTapModifier: ViewModifier {
    @State private var scale: CGFloat = 1.0
    @State private var showRipple = false

    let color: Color

    func body(content: Content) -> some View {
        content
            .scaleEffect(scale)
            .background(
                Circle()
                    .fill(color.opacity(0.2))
                    .scaleEffect(showRipple ? 2.0 : 0.5)
                    .opacity(showRipple ? 0 : 1)
            )
            .simultaneousGesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { _ in
                        withAnimation(.spring(duration: 0.15)) {
                            scale = 0.95
                        }
                    }
                    .onEnded { _ in
                        withAnimation(.spring(duration: 0.3, bounce: 0.4)) {
                            scale = 1.0
                        }
                        // Ripple effect
                        showRipple = true
                        withAnimation(.easeOut(duration: 0.4)) {
                            showRipple = false
                        }
                    }
            )
    }
}

extension View {
    func satisfyingTap(color: Color = .white) -> some View {
        modifier(SatisfyingTapModifier(color: color))
    }
}

// MARK: - Streak Intensity View

struct StreakIntensityFlame: View {
    let streak: Int

    @State private var flameScale: CGFloat = 1.0
    @State private var innerGlow: Double = 0.5

    private var intensity: Double {
        min(1.0, Double(streak) / 30.0)
    }

    private var flameSize: CGFloat {
        12 + CGFloat(intensity * 6)
    }

    private var flameColor: Color {
        Color.amber.opacity(0.7 + intensity * 0.3)
    }

    var body: some View {
        ZStack {
            // Outer glow
            Image(systemName: "flame.fill")
                .font(.system(size: flameSize + 4))
                .foregroundStyle(flameColor.opacity(innerGlow * 0.3))
                .blur(radius: 4)
                .scaleEffect(flameScale * 1.2)

            // Main flame
            Image(systemName: "flame.fill")
                .font(.system(size: flameSize))
                .foregroundStyle(flameColor)
                .scaleEffect(flameScale)
        }
        .onAppear {
            if streak > 0 {
                withAnimation(.easeInOut(duration: 1.5 + (1 - intensity)).repeatForever(autoreverses: true)) {
                    flameScale = 1.0 + CGFloat(intensity * 0.1)
                    innerGlow = 0.7 + intensity * 0.3
                }
            }
        }
    }
}

// MARK: - Previews

#Preview("Mandala") {
    ZStack {
        Color.canvas.ignoresSafeArea()
        MandalaBackground(opacity: 0.05, color: .white)
    }
}

#Preview("Four Elements") {
    ZStack {
        Color.canvas.ignoresSafeArea()
        FourElementsMandala(opacity: 0.08)
    }
}

#Preview("Glass Card") {
    ZStack {
        Color.canvas.ignoresSafeArea()

        VStack {
            Text("Glass Card")
                .foregroundStyle(.ivory)
                .padding()
        }
        .glassCard()
        .padding()
    }
}
