import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const EMOJI_SUGGESTIONS = [
  '🎯', '💪', '🚀', '📚', '💼', '🏃', '🎨', '💰',
  '🌱', '⭐', '🔥', '💡', '🎓', '❤️', '🌟', '✨',
  '🧠', '💻', '🏆', '🎵', '🏋️', '🧘', '📝', '📈',
  '🌈', '🎪', '⚡', '🌸', '🎁', '🍀'
];

const AlignGoals = () => {
  const {
    goals,
    loadGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    tasks,
    loadTasks,
    lastSelectedGoalId,
    setLastSelectedGoal
  } = useStore();

  const [showManageModal, setShowManageModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', why: '', emoji: '🎯' });
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    loadGoals();
    loadTasks();
  }, [loadGoals, loadTasks]);

  const activeGoals = goals.filter(g => g.status === 'active');
  const selectedGoal = activeGoals.find(g => g.id === lastSelectedGoalId) || activeGoals[0];

  // Set initial selected goal if none selected
  useEffect(() => {
    if (activeGoals.length > 0 && !lastSelectedGoalId) {
      setLastSelectedGoal(activeGoals[0].id);
    }
  }, [activeGoals, lastSelectedGoalId, setLastSelectedGoal]);

  const handleSelectGoal = (goalId) => {
    setLastSelectedGoal(goalId);
  };

  const handleAddGoal = async () => {
    if (newGoal.title.trim()) {
      if (activeGoals.length >= 10) {
        alert('Maximum 10 active goals allowed');
        return;
      }
      await addGoal(newGoal);
      await loadGoals();
      setNewGoal({ title: '', why: '', emoji: '🎯' });
    }
  };

  const handleUpdateGoal = async (goalId, updates) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    await updateGoal({ ...goal, ...updates });
    await loadGoals();
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Delete this goal? All linked actions will remain in the backlog.')) {
      await deleteGoal(goalId);
      await loadGoals();
      setEditingGoal(null);
    }
  };

  const getGoalProgress = (goalId) => {
    const goalTasks = tasks.filter(t => t.goalId === goalId);
    const completed = goalTasks.filter(t => t.status === 'completed').length;
    return { total: goalTasks.length, completed };
  };

  return (
    <>
      <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
        {/* Single Row Layout */}
        <div className="flex items-center gap-3">
          {/* Label */}
          <div className="text-sm font-bold text-story whitespace-nowrap w-20 flex-shrink-0">
            GOALS
          </div>

          {/* Compact Emoji Picker Grid - 2 rows */}
          <div className="grid grid-cols-5 gap-1 flex-shrink-0">
            {activeGoals.slice(0, 10).map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal.id)}
                className={`text-xl p-1 rounded transition-all ${
                  selectedGoal?.id === goal.id
                    ? 'bg-story/20 scale-110 ring-2 ring-story'
                    : 'hover:bg-gray-100'
                }`}
                title={goal.title}
              >
                {goal.emoji || '🎯'}
              </button>
            ))}
            {/* Add button if less than 10 goals */}
            {activeGoals.length < 10 && (
              <button
                onClick={() => setShowManageModal(true)}
                className="text-xl p-1 rounded hover:bg-story/10 text-story"
                title="Add goal"
              >
                +
              </button>
            )}
          </div>

          {/* Selected Goal Display */}
          <div className="flex-1 flex items-center justify-between min-w-0">
            {selectedGoal ? (
              <>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-base font-semibold text-story truncate">
                    {selectedGoal.title}
                  </span>
                </div>
                <button
                  onClick={() => setShowManageModal(true)}
                  className="text-xs text-gray-500 hover:text-story flex-shrink-0 ml-2"
                >
                  manage
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowManageModal(true)}
                className="text-sm text-gray-400 hover:text-story"
              >
                + Add your first goal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Manage Goals Modal */}
      {showManageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-story">Manage Goals</h3>
              <button
                onClick={() => {
                  setShowManageModal(false);
                  setEditingGoal(null);
                  setNewGoal({ title: '', why: '', emoji: '🎯' });
                }}
                className="text-2xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Add New Goal Form */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Add New Goal</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const currentIndex = EMOJI_SUGGESTIONS.indexOf(newGoal.emoji);
                      const nextIndex = (currentIndex + 1) % EMOJI_SUGGESTIONS.length;
                      setNewGoal({ ...newGoal, emoji: EMOJI_SUGGESTIONS[nextIndex] });
                    }}
                    className="text-2xl p-2 border-2 border-story rounded-lg hover:bg-story/10"
                  >
                    {newGoal.emoji}
                  </button>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="Goal title..."
                    className="flex-1 p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
                  />
                </div>
                <textarea
                  value={newGoal.why}
                  onChange={(e) => setNewGoal({ ...newGoal, why: e.target.value })}
                  placeholder="Why does this matter? (optional)"
                  className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none min-h-16 resize-none"
                />
                <button
                  onClick={handleAddGoal}
                  disabled={!newGoal.title.trim()}
                  className="w-full bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story-dark transition-colors disabled:opacity-50"
                >
                  Add Goal
                </button>
              </div>

              {/* Existing Goals List */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">
                  Active Goals ({activeGoals.length})
                </h4>
                {activeGoals.map((goal) => {
                  const progress = getGoalProgress(goal.id);
                  const isEditing = editingGoal?.id === goal.id;

                  return (
                    <div
                      key={goal.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <button
                          onClick={() => {
                            const currentIndex = EMOJI_SUGGESTIONS.indexOf(goal.emoji);
                            const nextIndex = (currentIndex + 1) % EMOJI_SUGGESTIONS.length;
                            handleUpdateGoal(goal.id, { emoji: EMOJI_SUGGESTIONS[nextIndex] });
                          }}
                          className="text-xl hover:bg-gray-200 rounded p-1"
                        >
                          {goal.emoji || '🎯'}
                        </button>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingGoal.title}
                            onChange={(e) =>
                              setEditingGoal({ ...editingGoal, title: e.target.value })
                            }
                            onBlur={() => {
                              handleUpdateGoal(goal.id, { title: editingGoal.title });
                              setEditingGoal(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateGoal(goal.id, { title: editingGoal.title });
                                setEditingGoal(null);
                              }
                            }}
                            autoFocus
                            className="flex-1 text-sm font-semibold border-b-2 border-story focus:outline-none bg-transparent"
                          />
                        ) : (
                          <div
                            onClick={() => setEditingGoal(goal)}
                            className="flex-1 text-sm font-semibold cursor-text hover:bg-gray-100 rounded px-1"
                          >
                            {goal.title}
                          </div>
                        )}
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="text-gray-400 hover:text-red-600 text-xl"
                        >
                          ×
                        </button>
                      </div>
                      {goal.why && (
                        <p className="text-xs text-gray-600 ml-7">{goal.why}</p>
                      )}
                      <div className="ml-7">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>
                            {progress.completed}/{progress.total} actions
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-story h-1 rounded-full transition-all"
                            style={{
                              width: `${
                                progress.total > 0
                                  ? (progress.completed / progress.total) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlignGoals;
