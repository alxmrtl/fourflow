import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const EMOJI_SUGGESTIONS = ['🎯', '💪', '🚀', '📚', '💼', '🏃', '🎨', '💰', '🌱', '⭐', '🔥', '💡', '🎓', '❤️', '🌟'];

const AlignGoals = () => {
  const { goals, loadGoals, addGoal, updateGoal, deleteGoal, tasks, loadTasks } = useStore();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', why: '', emoji: '🎯' });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    loadGoals();
    loadTasks();
  }, [loadGoals, loadTasks]);

  const handleAddGoal = async () => {
    if (newGoal.title.trim()) {
      await addGoal(newGoal);
      setNewGoal({ title: '', why: '', emoji: '🎯' });
      setShowAddGoal(false);
    }
  };

  const getGoalProgress = (goalId) => {
    const goalTasks = tasks.filter(t => t.goalId === goalId);
    const completed = goalTasks.filter(t => t.status === 'completed').length;
    return { total: goalTasks.length, completed };
  };

  const activeGoals = goals.filter(g => g.status === 'active');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-story">GOALS - Define Your Aims</h2>
        <p className="text-sm text-gray-600">Create meaningful goals with visual identifiers</p>
      </div>

      {/* Add Goal Button */}
      <button
        onClick={() => setShowAddGoal(true)}
        className="w-full bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story-dark transition-colors"
      >
        + Add Goal
      </button>

      {/* Add Goal Form */}
      {showAddGoal && (
        <div className="bg-white border-2 border-story rounded-lg p-3 space-y-2">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Emoji</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-full p-2 text-2xl border-2 border-gray-200 rounded-lg hover:border-story focus:border-story focus:outline-none text-center"
              >
                {newGoal.emoji}
              </button>
              {showEmojiPicker && (
                <div className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg p-2 grid grid-cols-5 gap-2 shadow-lg">
                  {EMOJI_SUGGESTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setNewGoal({ ...newGoal, emoji });
                        setShowEmojiPicker(false);
                      }}
                      className="text-2xl hover:bg-gray-100 rounded p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Goal title"
            className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
          />
          <textarea
            value={newGoal.why}
            onChange={(e) => setNewGoal({ ...newGoal, why: e.target.value })}
            placeholder="Why does this matter? (optional)"
            className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none min-h-16 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddGoal}
              className="flex-1 bg-story text-white py-1.5 rounded-lg text-sm font-semibold"
            >
              Save Goal
            </button>
            <button
              onClick={() => {
                setShowAddGoal(false);
                setNewGoal({ title: '', why: '', emoji: '🎯' });
                setShowEmojiPicker(false);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Active Goals</h3>
          <span className="text-xs text-gray-500">{activeGoals.length} goals</span>
        </div>

        {activeGoals.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">No goals yet. Add your first goal!</p>
          </div>
        ) : (
          activeGoals.map((goal) => {
            const progress = getGoalProgress(goal.id);
            const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

            return (
              <div
                key={goal.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{goal.emoji || '🎯'}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-story mb-1">{goal.title}</h3>
                    {goal.why && (
                      <p className="text-xs text-gray-600 mb-2">{goal.why}</p>
                    )}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress.completed}/{progress.total} actions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-story h-1.5 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1">Goals help you:</p>
        <p>• Stay focused on what matters most</p>
        <p>• Track progress through linked actions</p>
        <p>• Visualize your progress with emojis on the FLOW page</p>
      </div>
    </div>
  );
};

export default AlignGoals;
