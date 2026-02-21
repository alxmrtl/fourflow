//
//  RepositoryComponents.swift
//  FlowHabits
//
//  Reusable UI components for the Flow Habit repository
//

import SwiftUI

// MARK: - Flow Key Badge

struct FlowKeyBadge: View {
    let flowKey: FlowKey

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: flowKey.iconName)
                .font(.caption2)
            Text(flowKey.displayName)
                .font(.caption2)
                .fontWeight(.medium)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(flowKey.color.opacity(0.2))
        .foregroundStyle(flowKey.color)
        .clipShape(Capsule())
    }
}

// MARK: - Pillar Badge

struct PillarBadge: View {
    let pillar: Pillar
    var showEmoji: Bool = true
    var size: BadgeSize = .regular

    enum BadgeSize {
        case small, regular, large

        var font: Font {
            switch self {
            case .small: return .caption2
            case .regular: return .caption
            case .large: return .subheadline
            }
        }

        var padding: EdgeInsets {
            switch self {
            case .small: return EdgeInsets(top: 2, leading: 6, bottom: 2, trailing: 6)
            case .regular: return EdgeInsets(top: 4, leading: 8, bottom: 4, trailing: 8)
            case .large: return EdgeInsets(top: 6, leading: 12, bottom: 6, trailing: 12)
            }
        }
    }

    var body: some View {
        HStack(spacing: 4) {
            if showEmoji {
                Image(systemName: pillar.iconName)
                    .font(size.font)
            }
            Text(pillar.displayName)
                .font(size.font)
                .fontWeight(.medium)
        }
        .padding(size.padding)
        .background(pillar.color.opacity(0.2))
        .foregroundStyle(pillar.color)
        .clipShape(Capsule())
    }
}

// MARK: - Difficulty Badge

struct DifficultyBadge: View {
    let difficulty: HabitDifficulty

    private var color: Color {
        switch difficulty {
        case .beginner: return .space
        case .intermediate: return .amber
        case .advanced: return .selfPillar
        }
    }

    var body: some View {
        Text(difficulty.displayName)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(color.opacity(0.2))
            .foregroundStyle(color)
            .clipShape(Capsule())
    }
}

// MARK: - Duration Badge

struct DurationBadge: View {
    let minutes: Int

    private var displayText: String {
        if minutes < 60 {
            return "\(minutes) min"
        } else {
            let hours = minutes / 60
            let mins = minutes % 60
            return mins == 0 ? "\(hours) hr" : "\(hours)h \(mins)m"
        }
    }

    var body: some View {
        HStack(spacing: 2) {
            Image(systemName: "clock")
                .font(.caption2)
            Text(displayText)
                .font(.caption2)
                .fontWeight(.medium)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(Color.ivory.opacity(0.1))
        .foregroundStyle(.textSecondary)
        .clipShape(Capsule())
    }
}

// MARK: - Quality Tag

struct QualityTag: View {
    let text: String
    var color: Color = .spirit

    var body: some View {
        Text(text)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(color.opacity(0.15))
            .foregroundStyle(color)
            .clipShape(Capsule())
    }
}

// MARK: - Pillar Card

struct PillarCard: View {
    let pillar: Pillar
    let habitCount: Int
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Image(systemName: pillar.iconName)
                        .font(.title)
                        .foregroundStyle(pillar.color)

                    Spacer()

                    Text("\(habitCount)")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundStyle(pillar.color)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text(pillar.displayName)
                        .font(.headline)
                        .fontWeight(.semibold)
                        .foregroundStyle(.textPrimary)

                    Text(pillar.tagline)
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                }

                Spacer(minLength: 0)

                HStack {
                    Text("Explore habits")
                        .font(.caption)
                        .foregroundStyle(pillar.color)

                    Spacer()

                    Image(systemName: "chevron.right")
                        .font(.caption)
                        .foregroundStyle(pillar.color)
                }
            }
            .padding()
            .frame(height: 150)
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .strokeBorder(pillar.color.opacity(0.3), lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Flow Key Card

struct FlowKeyCard: View {
    let flowKey: FlowKey
    let habitCount: Int
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: flowKey.iconName)
                    .font(.title2)
                    .foregroundStyle(flowKey.color)
                    .frame(width: 44, height: 44)
                    .background(flowKey.color.opacity(0.2))
                    .clipShape(Circle())

                VStack(alignment: .leading, spacing: 2) {
                    Text(flowKey.displayName)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundStyle(.textPrimary)

                    Text(flowKey.tagline)
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 2) {
                    Text("\(habitCount)")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundStyle(flowKey.color)

                    Text("habits")
                        .font(.caption2)
                        .foregroundStyle(.textSecondary)
                }

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }
            .padding()
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Habit Row Card

struct HabitRowCard: View {
    let template: FlowHabitTemplate
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                TemplateIcon(template: template, size: 22)
                    .frame(width: 44, height: 44)
                    .background(template.pillar.color.opacity(0.15))
                    .clipShape(RoundedRectangle(cornerRadius: 10))

                VStack(alignment: .leading, spacing: 4) {
                    Text(template.name)
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundStyle(.textPrimary)
                        .lineLimit(1)

                    Text(template.shortDescription)
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                        .lineLimit(1)
                }

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(Color.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Section Header

struct SectionHeader: View {
    let title: String
    var subtitle: String? = nil
    var action: (() -> Void)? = nil
    var actionLabel: String = "See All"

    var body: some View {
        HStack(alignment: .bottom) {
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundStyle(.textPrimary)

                if let subtitle = subtitle {
                    Text(subtitle)
                        .font(.caption)
                        .foregroundStyle(.textSecondary)
                }
            }

            Spacer()

            if let action = action {
                Button(action: action) {
                    HStack(spacing: 4) {
                        Text(actionLabel)
                            .font(.caption)
                        Image(systemName: "chevron.right")
                            .font(.caption2)
                    }
                    .foregroundStyle(.spirit)
                }
            }
        }
    }
}

// MARK: - Progress Ring (for quiz)

struct QuizProgressRing: View {
    let progress: Double
    var lineWidth: CGFloat = 4
    var size: CGFloat = 24

    var body: some View {
        ZStack {
            Circle()
                .stroke(Color.ivory.opacity(0.2), lineWidth: lineWidth)

            Circle()
                .trim(from: 0, to: progress)
                .stroke(
                    Color.spirit,
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 0.3), value: progress)
        }
        .frame(width: size, height: size)
    }
}

// MARK: - Primary Button Style

struct PrimaryButtonStyle: ButtonStyle {
    var color: Color = .spirit

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity)
            .padding()
            .background(color)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .opacity(configuration.isPressed ? 0.8 : 1.0)
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

// MARK: - Secondary Button Style

struct SecondaryButtonStyle: ButtonStyle {
    var color: Color = .spirit

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(color)
            .frame(maxWidth: .infinity)
            .padding()
            .background(color.opacity(0.15))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .opacity(configuration.isPressed ? 0.8 : 1.0)
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

// MARK: - Habit Icon

/// Displays a habit's icon using SF Symbols
struct HabitIcon: View {
    let habit: Habit
    var size: CGFloat = 16

    var body: some View {
        Image(systemName: habit.iconName ?? habit.pillar.defaultIconName)
            .font(.system(size: size))
            .foregroundStyle(habit.pillar.color)
    }
}

// MARK: - Template Icon

/// Displays a template's icon using SF Symbols
struct TemplateIcon: View {
    let template: FlowHabitTemplate
    var size: CGFloat = 18

    var body: some View {
        Image(systemName: template.iconName ?? template.pillar.defaultIconName)
            .font(.system(size: size))
            .foregroundStyle(template.pillar.color)
    }
}

// MARK: - Icon Picker View

/// SF Symbol picker organized by pillar categories
struct IconPickerView: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var selectedIconName: String
    let pillar: Pillar

    var body: some View {
        NavigationStack {
            ZStack {
                Color.background.ignoresSafeArea()

                ScrollView(showsIndicators: false) {
                    VStack(alignment: .leading, spacing: 24) {
                        // Current pillar icons first
                        iconSection(
                            title: "\(pillar.displayName) Icons",
                            icons: pillar.curatedIcons,
                            color: pillar.color
                        )

                        // Then show other pillars
                        ForEach(Pillar.displayOrder.filter { $0 != pillar }) { otherPillar in
                            iconSection(
                                title: "\(otherPillar.displayName) Icons",
                                icons: otherPillar.curatedIcons,
                                color: otherPillar.color
                            )
                        }
                    }
                    .padding(16)
                }
            }
            .navigationTitle("Choose Icon")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundStyle(.textSecondary)
                }
            }
        }
        .presentationDetents([.large])
        .presentationDragIndicator(.visible)
    }

    private func iconSection(title: String, icons: [String], color: Color) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title.uppercased())
                .font(.system(size: 10, weight: .bold))
                .foregroundStyle(.textSecondary)
                .tracking(1)

            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 6), spacing: 10) {
                ForEach(icons, id: \.self) { iconName in
                    Button {
                        selectedIconName = iconName
                        Haptics.selection()
                        dismiss()
                    } label: {
                        Image(systemName: iconName)
                            .font(.system(size: 20))
                            .foregroundStyle(selectedIconName == iconName ? .white : color)
                            .frame(width: 48, height: 48)
                            .background(
                                selectedIconName == iconName
                                    ? color
                                    : color.opacity(0.1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                            .overlay(
                                RoundedRectangle(cornerRadius: 10)
                                    .strokeBorder(
                                        selectedIconName == iconName ? color : .clear,
                                        lineWidth: 2
                                    )
                            )
                    }
                }
            }
        }
    }
}

// MARK: - Previews

#Preview("Badges") {
    VStack(spacing: 20) {
        HStack {
            PillarBadge(pillar: .self_)
            PillarBadge(pillar: .space)
            PillarBadge(pillar: .story)
            PillarBadge(pillar: .spirit)
        }

        HStack {
            FlowKeyBadge(flowKey: .focusedBody)
            FlowKeyBadge(flowKey: .openMind)
        }

        HStack {
            DifficultyBadge(difficulty: .beginner)
            DifficultyBadge(difficulty: .intermediate)
            DifficultyBadge(difficulty: .advanced)
        }

        HStack {
            DurationBadge(minutes: 5)
            DurationBadge(minutes: 30)
            DurationBadge(minutes: 90)
        }

        HStack {
            QualityTag(text: "Focus")
            QualityTag(text: "Calm", color: .space)
            QualityTag(text: "Energy", color: .selfPillar)
        }
    }
    .padding()
    .background(Color.background)
}

#Preview("Cards") {
    ScrollView {
        VStack(spacing: 16) {
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                PillarCard(pillar: .self_, habitCount: 15) {}
                PillarCard(pillar: .space, habitCount: 12) {}
            }

            FlowKeyCard(flowKey: .focusedBody, habitCount: 7) {}
            FlowKeyCard(flowKey: .tunedEmotions, habitCount: 5) {}
        }
        .padding()
    }
    .background(Color.background)
}
