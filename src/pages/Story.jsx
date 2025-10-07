import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const Story = () => {
  const { goals, loadGoals, addGoal, updateGoal, deleteGoal, tasks, loadTasks } = useStore();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', why: '', linkedValue: '' });
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    loadGoals();
    loadTasks();
  }, [loadGoals, loadTasks]);

  const handleAddGoal = async () => {
    if (newGoal.title.trim()) {
      await addGoal(newGoal);
      setNewGoal({ title: '', why: '', linkedValue: '' });
      setShowAddGoal(false);
    }
  };

  const getGoalProgress = (goalId) => {
    const goalTasks = tasks.filter(t => t.goalId === goalId);
    const completed = goalTasks.filter(t => t.status === 'completed').length;
    return { total: goalTasks.length, completed };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <img
            src="/logos/STORY - Section Logo.png"
            alt="Story"
            className="h-24"
          />
        </div>
        <h1 className="text-4xl font-display font-bold text-story">STORY</h1>
        <p className="text-lg text-gray-600">What are you building?</p>
      </div>

      {/* Add Goal Button */}
      <button
        onClick={() => setShowAddGoal(true)}
        className="w-full bg-story text-white py-3 rounded-lg font-semibold hover:bg-story-dark transition-colors"
      >
        + Add Long-Term Goal
      </button>

      {/* Add Goal Form */}
      {showAddGoal && (
        <div className="bg-white border-2 border-story rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-story">New Goal</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Title *
            </label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="e.g., Creative Mastery, Launch Startup, Write a Book"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why does this matter?
            </label>
            <textarea
              value={newGoal.why}
              onChange={(e) => setNewGoal({ ...newGoal, why: e.target.value })}
              placeholder="What makes this meaningful to you?"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none min-h-24 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddGoal}
              className="flex-1 bg-story text-white py-2 rounded-lg font-semibold hover:bg-story-dark transition-colors"
            >
              Save Goal
            </button>
            <button
              onClick={() => {
                setShowAddGoal(false);
                setNewGoal({ title: '', why: '', linkedValue: '' });
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.filter(g => g.status === 'active').length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No goals yet. Add your first long-term goal to get started!</p>
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
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-story/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-story mb-2">{goal.title}</h3>
                      {goal.why && (
                        <p className="text-gray-600 text-sm mb-3">{goal.why}</p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{progress.completed} of {progress.total} tasks</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-story h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Goal Details (Expanded) */}
                  {selectedGoal === goal.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Archive goal
                            updateGoal({ ...goal, status: 'archived' });
                          }}
                          className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                          Archive Goal
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this goal? This cannot be undone.')) {
                              deleteGoal(goal.id);
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-800 underline"
                        >
                          Delete Goal
                        </button>
                      </div>

                      {/* Tasks linked to this goal */}
                      <div className="bg-story/5 rounded p-3">
                        <h4 className="text-sm font-semibold text-story mb-2">Related Tasks</h4>
                        {tasks.filter(t => t.goalId === goal.id).length === 0 ? (
                          <p className="text-sm text-gray-500">No tasks linked to this goal yet</p>
                        ) : (
                          <ul className="space-y-1">
                            {tasks
                              .filter(t => t.goalId === goal.id)
                              .slice(0, 5)
                              .map(task => (
                                <li key={task.id} className="text-sm text-gray-700">
                                  <span className={task.status === 'completed' ? 'line-through text-gray-400' : ''}>
                                    • {task.title}
                                  </span>
                                </li>
                              ))
                            }
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
        )}
      </div>

      {/* Journey Visualization */}
      {goals.filter(g => g.status === 'active').length > 0 && (
        <div className="bg-story/10 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-semibold text-story">Your Journey</h3>
          <p className="text-gray-700">
            You're building <span className="font-semibold">{goals.filter(g => g.status === 'active').length}</span> long-term goals through daily focused work.
          </p>
          <p className="text-sm text-gray-600">
            Connect your tasks to these goals in the PLAN section to see your momentum grow.
          </p>
        </div>
      )}
    </div>
  );
};

export default Story;
