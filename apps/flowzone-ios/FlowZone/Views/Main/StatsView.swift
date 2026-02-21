//
//  StatsView.swift
//  FlowZone
//
//  Statistics and review - observatory aesthetic
//

import SwiftUI
import SwiftData

struct StatsView: View {
    @Environment(\.modelContext) private var modelContext
    @StateObject private var viewModel = StatsViewModel()

    var body: some View {
        ZStack {
            // Observatory background with story glow
            ObservatoryBackground(glowColor: .story, glowPosition: .topTrailing)

            ScrollView(showsIndicators: false) {
                VStack(spacing: 16) {
                    // Header
                    headerSection
                        .padding(.top, 8)

                    // Today's Focus
                    todayCard

                    // Weekly Stats
                    weeklyCard

                    // Rep Trend
                    trendCard

                    // Session History
                    historyCard
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 32)
            }
        }
        .onAppear {
            viewModel.loadStats(modelContext: modelContext)
        }
    }

    // MARK: - Header

    private var headerSection: some View {
        HStack(alignment: .center) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Review")
                    .font(.largeTitle.weight(.bold))
                    .foregroundColor(.textPrimary)

                Text(viewModel.motivationalMessage)
                    .font(.subheadline)
                    .foregroundColor(.textSecondary)
                    .lineLimit(2)
            }

            Spacer()
        }
        .padding(.horizontal, 4)
    }

    // MARK: - Today Card

    private var todayCard: some View {
        VStack(spacing: 16) {
            // Header
            HStack {
                HStack(spacing: 8) {
                    Circle()
                        .fill(Color.selfPillar)
                        .frame(width: 8, height: 8)

                    Text("Today")
                        .font(.headline.weight(.semibold))
                        .foregroundColor(.ivory)
                }

                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)

            // Stats row
            HStack(spacing: 0) {
                StatBox(
                    value: "\(viewModel.todaySessionCount)",
                    label: "Sessions",
                    color: .selfPillar
                )

                StatBox(
                    value: "\(viewModel.todayMinutes)",
                    label: "Minutes",
                    color: .space
                )

                StatBox(
                    value: "\(viewModel.todayReps)",
                    label: "Reps",
                    color: .amber
                )
            }
            .padding(.horizontal, 8)
            .padding(.bottom, 16)
        }
        .glassCard(tint: .selfPillar, cornerRadius: 20)
    }

    // MARK: - Weekly Card

    private var weeklyCard: some View {
        VStack(spacing: 16) {
            // Header
            HStack {
                HStack(spacing: 8) {
                    Circle()
                        .fill(Color.story)
                        .frame(width: 8, height: 8)

                    Text("This Week")
                        .font(.headline.weight(.semibold))
                        .foregroundColor(.ivory)
                }

                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)

            // Stats row
            HStack(spacing: 0) {
                StatBox(
                    value: "\(viewModel.weekSessionCount)",
                    label: "Sessions",
                    color: .selfPillar
                )

                StatBox(
                    value: "\(viewModel.weekMinutes)",
                    label: "Minutes",
                    color: .space
                )

                StatBox(
                    value: "\(viewModel.weekReps)",
                    label: "Reps",
                    color: .amber
                )

                StatBox(
                    value: String(format: "%.1f", viewModel.averageRepsPerSession),
                    label: "Avg/Session",
                    color: .spirit
                )
            }
            .padding(.horizontal, 8)
            .padding(.bottom, 16)
        }
        .glassCard(tint: .story, cornerRadius: 20)
    }

    // MARK: - Trend Card

    private var trendCard: some View {
        VStack(spacing: 16) {
            // Header
            HStack {
                HStack(spacing: 8) {
                    Circle()
                        .fill(Color.amber)
                        .frame(width: 8, height: 8)

                    Text("Rep Trends")
                        .font(.headline.weight(.semibold))
                        .foregroundColor(.ivory)
                }

                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)

            // Trend bars
            VStack(spacing: 10) {
                ForEach(viewModel.weeklyTrend, id: \.day) { item in
                    HStack(spacing: 12) {
                        Text(item.day)
                            .font(.caption.weight(.medium))
                            .foregroundColor(.ivory.opacity(0.5))
                            .frame(width: 36, alignment: .leading)

                        GeometryReader { geometry in
                            let width = viewModel.maxDailyReps > 0
                                ? CGFloat(item.reps) / CGFloat(viewModel.maxDailyReps) * geometry.size.width
                                : 0

                            RoundedRectangle(cornerRadius: 4, style: .continuous)
                                .fill(
                                    LinearGradient(
                                        colors: [Color.amber.opacity(0.8), Color.amber.opacity(0.5)],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .frame(width: max(width, item.reps > 0 ? 4 : 0))
                        }
                        .frame(height: 10)

                        Text("\(item.reps)")
                            .font(.caption.weight(.semibold).monospacedDigit())
                            .foregroundColor(.amber)
                            .frame(width: 28, alignment: .trailing)
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 16)
        }
        .glassCard(tint: .amber, cornerRadius: 20)
    }

    // MARK: - History Card

    private var historyCard: some View {
        VStack(spacing: 16) {
            // Header
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "clock")
                        .font(.system(size: 14))
                        .foregroundColor(.ivory.opacity(0.5))

                    Text("Today's Sessions")
                        .font(.subheadline.weight(.medium))
                        .foregroundColor(.ivory.opacity(0.7))
                }

                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.top, 16)

            if viewModel.todaySessions.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "clock")
                        .font(.title)
                        .foregroundColor(.ivory.opacity(0.2))

                    Text("No sessions yet today")
                        .font(.subheadline)
                        .foregroundColor(.ivory.opacity(0.4))
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 24)
                .padding(.bottom, 8)
            } else {
                VStack(spacing: 8) {
                    ForEach(viewModel.todaySessions) { session in
                        SessionRow(session: session)
                    }
                }
                .padding(.horizontal, 12)
                .padding(.bottom, 16)
            }
        }
        .glassCard(cornerRadius: 20)
    }
}

// MARK: - Stat Box

struct StatBox: View {
    let value: String
    let label: String
    let color: Color

    var body: some View {
        VStack(spacing: 6) {
            Text(value)
                .font(.title2.weight(.bold).monospacedDigit())
                .foregroundColor(color)

            Text(label)
                .font(.caption)
                .foregroundColor(.ivory.opacity(0.5))
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Session Row

struct SessionRow: View {
    let session: Session

    var body: some View {
        HStack(spacing: 12) {
            // Time
            Text(session.formattedTime)
                .font(.caption.monospacedDigit())
                .foregroundColor(.ivory.opacity(0.4))
                .frame(width: 52, alignment: .leading)

            // Task info
            VStack(alignment: .leading, spacing: 3) {
                Text(session.task?.title ?? "Focus Session")
                    .font(.subheadline.weight(.medium))
                    .foregroundColor(.ivory)
                    .lineLimit(1)

                HStack(spacing: 8) {
                    Text(session.durationText)
                        .font(.caption)
                        .foregroundColor(.ivory.opacity(0.4))

                    if session.feltFlow {
                        HStack(spacing: 3) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 10))
                            Text("Flow")
                                .font(.caption2.weight(.medium))
                        }
                        .foregroundColor(.space)
                    }
                }
            }

            Spacer()

            // Reps
            VStack(spacing: 2) {
                Text("\(session.reps)")
                    .font(.title3.weight(.bold).monospacedDigit())
                    .foregroundColor(.amber)

                Text("reps")
                    .font(.caption2)
                    .foregroundColor(.ivory.opacity(0.3))
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(Color.white.opacity(0.03))
        )
    }
}

#Preview {
    StatsView()
        .modelContainer(for: [Profile.self, Goal.self, FlowTask.self, Session.self, AppSettings.self, DailyQueue.self], inMemory: true)
}
