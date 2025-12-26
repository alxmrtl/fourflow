//
//  HabitCompletion.swift
//  FourFlowHabits
//
//  Records when a habit was completed
//

import Foundation
import SwiftData

@Model
final class HabitCompletion {
    var id: UUID
    var date: Date
    var habit: Habit?

    init(date: Date = Date(), habit: Habit) {
        self.id = UUID()
        self.date = date
        self.habit = habit
    }
}
