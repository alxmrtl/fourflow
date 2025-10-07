import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const Story = () => {
  const { goals, loadGoals, addGoal, updateGoal, deleteGoal, tasks, loadTasks } = useStore();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', why: '' });

  useEffect(() => {
    loadGoals();
    loadTasks();
  }, [loadGoals, loadTasks]);

  const handleAddGoal = async () => {
    if (newGoal.title.trim()) {
      await addGoal(newGoal);
      setNewGoal({ title: '', why: '' });
      setShowAddGoal(false);
    }
  };

  const getGoalProgress = (goalId) => {
    const goalTasks = tasks.filter(t => t.goalId === goalId);
    const completed = goalTasks.filter(t => t.status === 'completed').length;
    return { total: goalTasks.length, completed };
  };

  return (
    <div className="h-[calc(100vh-8rem)] overflow-hidden pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 h-full flex flex-col">
        {/* Compact Header */}
        <div className="text-center mb-3">
          <p className="text-xs text-gray-600">What are you building?</p>
        </div>

        {/* Add Goal Button */}
        <button
          onClick={() => setShowAddGoal(true)}
          className="w-full bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story-dark transition-colors mb-3"
        >
          + Add Goal
        </button>

        {/* Add Goal Form */}
        {showAddGoal && (
          <div className="bg-white border-2 border-story rounded-lg p-3 mb-3 space-y-2">
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="Goal title"
              className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
              autoFocus
            />
            <textarea
              value={newGoal.why}
              onChange={(e) => setNewGoal({ ...newGoal, why: e.target.value })}
              placeholder="Why does this matter?"
              className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none min-h-16 resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddGoal}
                className="flex-1 bg-story text-white py-1.5 rounded-lg text-sm font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddGoal(false);
                  setNewGoal({ title: '', why: '' });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Goals List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {goals.filter(g => g.status === 'active').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No goals yet. Add your first goal!</p>
            </div>
          ) : (
            goals
              .filter(g => g.status === 'active')
              .map((goal) => {
                const progress = getGoalProgress(goal.id);
                const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

                return (
                  <div
                    key={goal.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-3"
                  >
                    <h3 className="text-sm font-semibold text-story mb-1">{goal.title}</h3>
                    {goal.why && (
                      <p className="text-xs text-gray-600 mb-2">{goal.why}</p>
                    )}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress.completed}/{progress.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-story h-1.5 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default Story;
