//
//  HabitDetailSheet.swift
//  FlowHabits
//
//  Detailed view of a Flow Habit template
//

import SwiftUI

struct HabitDetailSheet: View {
    let template: FlowHabitTemplate
    let isAdopted: Bool
    let onAdopt: () -> Void
    var onRemove: (() -> Void)? = nil

    @Environment(\.dismiss) private var dismiss
    @State private var showingRemoveConfirmation = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Single unified card containing all content
                VStack(spacing: 0) {
                    // Header: Icon + Name + Badges
                    headerSection

                    // Content divider
                    sectionDivider

                    // Main content
                    templateContent
                }
                .background(Color.cardBackground)
                .clipShape(RoundedRectangle(cornerRadius: 16))
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(template.pillar.color.opacity(0.15), lineWidth: 1)
                )
                .padding(.horizontal, 16)
                .padding(.top, 8)

                Spacer(minLength: 0)
            }
            .background(Color.canvas)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .foregroundStyle(.spirit)
                }
            }
            .safeAreaInset(edge: .bottom) {
                adoptButton
            }
        }
        .presentationDragIndicator(.visible)
        .preferredColorScheme(.dark)
    }

    // MARK: - Header Section (Compact)

    private var headerSection: some View {
        VStack(spacing: 10) {
            // Icon - reduced size
            TemplateIcon(template: template, size: 32)
                .frame(width: 56, height: 56)
                .background(template.pillar.color.opacity(0.15))
                .clipShape(RoundedRectangle(cornerRadius: 14))

            // Name
            Text(template.name)
                .font(.system(size: 20, weight: .bold))
                .foregroundStyle(.textPrimary)
                .multilineTextAlignment(.center)
                .lineLimit(2)

            // Badges row
            HStack(spacing: 8) {
                // Pillar badge
                HStack(spacing: 4) {
                    Image(systemName: template.pillar.iconName)
                        .font(.system(size: 10, weight: .semibold))
                    Text(template.pillar.displayName)
                        .font(.system(size: 11, weight: .semibold))
                }
                .foregroundStyle(template.pillar.color)
                .padding(.horizontal, 10)
                .padding(.vertical, 5)
                .background(template.pillar.color.opacity(0.15))
                .clipShape(Capsule())

                // Difficulty badge
                Text(template.difficulty.displayName)
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(.textSecondary)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Color.white.opacity(0.08))
                    .clipShape(Capsule())
            }

            // Flow Key badge (if available)
            if let flowKey = template.flowKey {
                HStack(spacing: 4) {
                    Image(systemName: flowKey.iconName)
                        .font(.system(size: 10))
                    Text(flowKey.displayName)
                        .font(.system(size: 11, weight: .medium))
                }
                .foregroundStyle(flowKey.pillar.color.opacity(0.8))
                .padding(.horizontal, 10)
                .padding(.vertical, 5)
                .background(flowKey.pillar.color.opacity(0.1))
                .clipShape(Capsule())
            }
        }
        .padding(.horizontal, 16)
        .padding(.top, 20)
        .padding(.bottom, 14)
    }

    private var sectionDivider: some View {
        Rectangle()
            .fill(Color.white.opacity(0.06))
            .frame(height: 1)
    }

    // MARK: - Template Content (Unified)

    private var templateContent: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Flow Benefit
            VStack(alignment: .leading, spacing: 6) {
                Text("WHY THIS HELPS")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(.textWhisper)
                    .tracking(0.8)

                Text(template.flowBenefit)
                    .font(.system(size: 14))
                    .foregroundStyle(.textSecondary)
                    .lineSpacing(2)
            }
            .padding(.horizontal, 16)
            .padding(.top, 14)
            .padding(.bottom, 12)

            sectionDivider
                .padding(.horizontal, 16)

            // How to Practice
            VStack(alignment: .leading, spacing: 6) {
                Text("HOW TO PRACTICE")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(.textWhisper)
                    .tracking(0.8)

                Text(template.fullDescription)
                    .font(.system(size: 14))
                    .foregroundStyle(.textSecondary)
                    .lineSpacing(2)
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)
            .padding(.bottom, 12)

            // Variations (if any)
            if let variations = template.variations, !variations.isEmpty {
                sectionDivider
                    .padding(.horizontal, 16)

                VStack(alignment: .leading, spacing: 8) {
                    Text("VARIATIONS")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundStyle(.textWhisper)
                        .tracking(0.8)

                    VStack(spacing: 6) {
                        ForEach(variations) { variation in
                            CompactVariationRow(variation: variation)
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 12)
            }

            // Qualities - inline tags
            if !template.qualitiesImproved.isEmpty {
                sectionDivider
                    .padding(.horizontal, 16)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 6) {
                        ForEach(template.qualitiesImproved, id: \.self) { quality in
                            Text(quality)
                                .font(.system(size: 11, weight: .medium))
                                .foregroundStyle(template.pillar.color)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 5)
                                .background(template.pillar.color.opacity(0.12))
                                .clipShape(Capsule())
                        }
                    }
                    .padding(.horizontal, 16)
                }
                .padding(.vertical, 12)
            }

            // Coming Soon Features (if any)
            if template.hasTimer || template.hasVisualGuide || template.hasAudioGuide {
                sectionDivider
                    .padding(.horizontal, 16)

                VStack(alignment: .leading, spacing: 8) {
                    HStack(spacing: 4) {
                        Image(systemName: "sparkle")
                            .font(.system(size: 10))
                        Text("COMING SOON")
                            .font(.system(size: 10, weight: .bold))
                            .tracking(0.8)
                    }
                    .foregroundStyle(.spirit)

                    HStack(spacing: 8) {
                        if template.hasTimer {
                            FeaturePill(icon: "timer", text: "Timer")
                        }
                        if template.hasVisualGuide {
                            FeaturePill(icon: "eye", text: "Visual")
                        }
                        if template.hasAudioGuide {
                            FeaturePill(icon: "headphones", text: "Audio")
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 12)
            }
        }
    }

    // MARK: - Action Button

    private var adoptButton: some View {
        VStack(spacing: 0) {
            if isAdopted {
                if let onRemove = onRemove {
                    // Show Remove button when callback is provided
                    Button {
                        showingRemoveConfirmation = true
                    } label: {
                        HStack(spacing: 6) {
                            Image(systemName: "minus.circle.fill")
                                .font(.system(size: 14))
                            Text("Remove from Habits")
                                .font(.system(size: 15, weight: .semibold))
                        }
                        .foregroundStyle(.white.opacity(0.9))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.selfPillar.opacity(0.7))
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .confirmationDialog(
                        "Remove \(template.name)?",
                        isPresented: $showingRemoveConfirmation,
                        titleVisibility: .visible
                    ) {
                        Button("Remove", role: .destructive) {
                            onRemove()
                            Haptics.medium()
                            dismiss()
                        }
                        Button("Cancel", role: .cancel) {}
                    } message: {
                        Text("This will archive the habit. You can restore it later from Settings.")
                    }
                } else {
                    // Read-only state indicator
                    HStack(spacing: 6) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 14))
                        Text("Already in Your Habits")
                            .font(.system(size: 15, weight: .semibold))
                    }
                    .foregroundStyle(.space)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(Color.space.opacity(0.15))
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                }
            } else {
                Button(action: onAdopt) {
                    Text("Add to My Habits")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(template.pillar.color)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
        }
        .background(Color.canvas)
    }
}

// MARK: - Detail Section

struct DetailSection<Content: View>: View {
    let title: String
    let icon: String
    let color: Color
    let content: () -> Content

    init(
        title: String,
        icon: String,
        color: Color,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.title = title
        self.icon = icon
        self.color = color
        self.content = content
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Image(systemName: icon)
                    .foregroundStyle(color)
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundStyle(.textPrimary)
            }

            content()
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.cardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Supporting Views

struct InfoPill: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: icon)
                .font(.caption2)
            Text(text)
                .font(.caption)
        }
        .foregroundStyle(.textSecondary)
        .padding(.horizontal, 10)
        .padding(.vertical, 6)
        .background(Color.ivory.opacity(0.1))
        .clipShape(Capsule())
    }
}

struct FeaturePill: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: icon)
                .font(.caption2)
            Text(text)
                .font(.caption)
        }
        .foregroundStyle(.spirit)
        .padding(.horizontal, 10)
        .padding(.vertical, 6)
        .background(Color.spirit.opacity(0.2))
        .clipShape(Capsule())
    }
}

struct VariationRow: View {
    let variation: HabitVariation

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "circle.fill")
                .font(.system(size: 6))
                .foregroundStyle(.amber)
                .padding(.top, 6)

            VStack(alignment: .leading, spacing: 2) {
                HStack {
                    Text(variation.name)
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundStyle(.textPrimary)

                    if let duration = variation.duration {
                        Text("• \(duration) min")
                            .font(.caption)
                            .foregroundStyle(.textSecondary)
                    }
                }

                Text(variation.description)
                    .font(.caption)
                    .foregroundStyle(.textSecondary)
            }

            Spacer()
        }
        .padding(.vertical, 4)
    }
}

struct CompactVariationRow: View {
    let variation: HabitVariation

    var body: some View {
        HStack(alignment: .top, spacing: 8) {
            Image(systemName: "circle.fill")
                .font(.system(size: 4))
                .foregroundStyle(.amber)
                .padding(.top, 5)

            VStack(alignment: .leading, spacing: 1) {
                HStack(spacing: 4) {
                    Text(variation.name)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundStyle(.textPrimary)

                    if let duration = variation.duration {
                        Text("• \(duration)m")
                            .font(.system(size: 11))
                            .foregroundStyle(.textWhisper)
                    }
                }

                Text(variation.description)
                    .font(.system(size: 12))
                    .foregroundStyle(.textSecondary)
                    .lineLimit(2)
            }

            Spacer(minLength: 0)
        }
    }
}

// MARK: - Flow Layout

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = layout(proposal: proposal, subviews: subviews)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = layout(proposal: proposal, subviews: subviews)

        for (index, frame) in result.frames.enumerated() {
            subviews[index].place(
                at: CGPoint(x: bounds.minX + frame.minX, y: bounds.minY + frame.minY),
                proposal: ProposedViewSize(frame.size)
            )
        }
    }

    private func layout(proposal: ProposedViewSize, subviews: Subviews) -> (size: CGSize, frames: [CGRect]) {
        let maxWidth = proposal.width ?? .infinity
        var frames: [CGRect] = []
        var currentX: CGFloat = 0
        var currentY: CGFloat = 0
        var lineHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)

            if currentX + size.width > maxWidth && currentX > 0 {
                currentX = 0
                currentY += lineHeight + spacing
                lineHeight = 0
            }

            frames.append(CGRect(x: currentX, y: currentY, width: size.width, height: size.height))
            lineHeight = max(lineHeight, size.height)
            currentX += size.width + spacing
        }

        let totalHeight = currentY + lineHeight
        return (CGSize(width: maxWidth, height: totalHeight), frames)
    }
}

// MARK: - Preview

#Preview {
    HabitDetailSheet(
        template: CatalogService.shared.habits.first!,
        isAdopted: false
    ) {
        print("Adopted!")
    }
}
