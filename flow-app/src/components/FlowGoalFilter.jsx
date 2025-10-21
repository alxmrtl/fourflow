import React, { useState } from 'react';
import { useStore } from '../store/useStore';

// 50+ goal and mission-related emojis organized by category
const EMOJI_SUGGESTIONS = [
  // Achievement & Success
  '🎯', '🏆', '🥇', '🥈', '🥉', '🏅', '⭐', '🌟', '✨', '💫', '🎖️',
  // Growth & Progress
  '🚀', '📈', '🌱', '🌿', '🌳', '🔥', '💪', '⚡', '💥', '🎆',
  // Learning & Education
  '📚', '📖', '✏️', '📝', '🎓', '🧠', '💡', '🔬', '🔭', '🎯',
  // Work & Career
  '💼', '💻', '⚙️', '🛠️', '🏗️', '📊', '📈', '💰', '💵', '💎',
  // Health & Fitness
  '🏃', '🏋️', '🧘', '🚴', '🏊', '⚽', '🏀', '🎾', '🥊', '🤸',
  // Creativity & Arts
  '🎨', '🎭', '🎬', '🎤', '🎸', '🎹', '📷', '✍️', '🖌️', '🎪',
  // Life & Mindset
  '❤️', '💚', '🧡', '💙', '💜', '🌈', '☀️', '🌍', '🦋', '🌸',
  // Focus & Time
  '⏰', '⏳', '🎯', '🔔', '📅', '🗓️'
];

const FlowGoalFilter = ({ selectedGoalId, onGoalSelect }) => {
  const { goals, updateGoal, addGoal, deleteGoal, tasks } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', emoji: '🎯' });
  const [showNewGoalEmojiPicker, setShowNewGoalEmojiPicker] = useState(false);

  const activeGoals = goals.filter(g => g.status === 'active');
  const selectedGoal = activeGoals.find(g => g.id === selectedGoalId);

  const handleEdit = () => {
    if (selectedGoal) {
      setEditedGoal({ ...selectedGoal, missions: selectedGoal.missions || [] });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (editedGoal) {
      await updateGoal(editedGoal);
      setIsEditing(false);
      setEditedGoal(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedGoal(null);
    setShowEmojiPicker(false);
  };

  const handleAddMission = () => {
    const missions = editedGoal?.missions || [];
    setEditedGoal({
      ...editedGoal,
      missions: [...missions, '']
    });
  };

  const handleUpdateMission = (index, value) => {
    const missions = [...(editedGoal?.missions || [])];
    missions[index] = value;
    setEditedGoal({ ...editedGoal, missions });
  };

  const handleDeleteMission = (index) => {
    const missions = [...(editedGoal?.missions || [])];
    missions.splice(index, 1);
    setEditedGoal({ ...editedGoal, missions });
  };

  const handleAddNewGoal = async () => {
    if (newGoal.title.trim() && activeGoals.length < 5) {
      const addedGoal = await addGoal({ ...newGoal, status: 'active' });
      setNewGoal({ title: '', emoji: '🎯' });
      setShowAddGoal(false);
      setShowNewGoalEmojiPicker(false);
      // Select the newly added goal if it's the first one
      if (activeGoals.length === 0 && addedGoal) {
        onGoalSelect(addedGoal.id);
      }
    }
  };

  const handleCancelAddGoal = () => {
    setShowAddGoal(false);
    setNewGoal({ title: '', emoji: '🎯' });
    setShowNewGoalEmojiPicker(false);
  };

  const handleDeleteGoal = async () => {
    if (selectedGoal && window.confirm(`Delete goal "${selectedGoal.title}"?`)) {
      await deleteGoal(selectedGoal.id);
      setIsEditing(false);
      setEditedGoal(null);
      // Select first remaining goal
      const remaining = activeGoals.filter(g => g.id !== selectedGoal.id);
      if (remaining.length > 0) {
        onGoalSelect(remaining[0].id);
      }
    }
  };

  const getGoalActionCount = (goalId) => {
    return tasks.filter(t => t.goalId === goalId && t.status === 'backlog').length;
  };

  if (activeGoals.length === 0) {
    return (
      <div
        className={`border border-story/20 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
          showAddGoal ? 'border-story/60' : ''
        }`}
        style={{
          maxHeight: showAddGoal ? '400px' : '60px',
        }}
      >
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="w-full text-left hover:bg-story/5 transition-colors"
        >
          <div className="flex items-stretch">
            {/* Left Label Box */}
            <div className="bg-story text-white px-3 py-2 flex items-center justify-center min-w-[80px]">
              <p className="text-xs font-bold tracking-tight">GOALS</p>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 px-3 py-2 bg-story/5 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {showAddGoal ? 'Adding new goal...' : '+ Add your first goal'}
              </span>
              {!showAddGoal && (
                <span className="text-story/40 text-sm">✏️</span>
              )}
            </div>
          </div>
        </button>

        {/* Expandable Add Goal Form */}
        {showAddGoal && (
          <div className="px-3 pb-3 space-y-3 border-t border-story/20 pt-3 bg-white transition-opacity duration-300 ease-in-out opacity-100">
            {/* Emoji Picker */}
            <div>
              <label className="text-xs text-gray-600 block mb-1">Emoji</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNewGoalEmojiPicker(!showNewGoalEmojiPicker)}
                  className="w-full p-2 text-2xl border-2 border-story/30 rounded-lg hover:border-story focus:border-story focus:outline-none text-center"
                >
                  {newGoal.emoji || '🎯'}
                </button>
                {showNewGoalEmojiPicker && (
                  <div className="absolute z-10 mt-1 w-full bg-white border-2 border-story/30 rounded-lg p-2 grid grid-cols-8 gap-1 shadow-lg max-h-48 overflow-y-auto">
                    {EMOJI_SUGGESTIONS.map((emoji, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setNewGoal({ ...newGoal, emoji });
                          setShowNewGoalEmojiPicker(false);
                        }}
                        className="text-xl hover:bg-story/10 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Goal Title */}
            <div>
              <label className="text-xs text-gray-600 block mb-1">Goal Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Enter goal title..."
                className="w-full p-2 border-2 border-story/30 rounded-lg focus:border-story focus:outline-none"
                autoFocus
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAddNewGoal}
                disabled={!newGoal.title.trim()}
                className="flex-1 bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story/90 transition-colors disabled:opacity-50"
              >
                Add Goal
              </button>
              <button
                onClick={handleCancelAddGoal}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`border border-story/20 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isEditing || showAddGoal ? 'border-story/60' : ''
      }`}
      style={{
        maxHeight: isEditing || showAddGoal ? '600px' : '60px',
      }}
    >
      <div className="flex items-stretch">
        {/* Left Label Box */}
        <div className="bg-story text-white px-3 py-2 flex items-center justify-center min-w-[80px]">
          <p className="text-xs font-bold tracking-tight">GOALS</p>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 px-3 py-2 bg-story/5 hover:bg-story/10 transition-colors">
          <div className="flex items-center justify-between gap-3">
            {/* Emoji Selector + Goal Title */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Goal Emoji Buttons */}
              {activeGoals.map((goal) => {
                const isSelected = selectedGoalId === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => !isEditing && onGoalSelect(goal.id)}
                    disabled={isEditing}
                    className={`
                      text-lg p-1.5 rounded transition-all flex-shrink-0
                      ${isSelected
                        ? 'bg-story text-white shadow-sm'
                        : 'bg-white hover:bg-story/10 border border-story/20'
                      }
                      ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title={goal.title}
                  >
                    {goal.emoji || '🎯'}
                  </button>
                );
              })}
              {activeGoals.length < 5 && !isEditing && (
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="text-sm p-1.5 rounded bg-white border border-dashed border-story/30 hover:border-story/60 text-story/40 hover:text-story transition-all flex-shrink-0"
                  title="Add goal"
                >
                  +
                </button>
              )}

              {/* Selected Goal Title (inline) */}
              {selectedGoal && !isEditing && (
                <div className="ml-2 flex-1 min-w-0">
                  <p className="text-xs font-semibold text-story truncate">{selectedGoal.title}</p>
                  <p className="text-xs text-gray-500">{getGoalActionCount(selectedGoal.id)} actions</p>
                </div>
              )}
            </div>

            {/* Edit Icon */}
            {!isEditing && selectedGoal && (
              <button
                onClick={handleEdit}
                className="text-story/40 hover:text-story text-sm transition-colors flex-shrink-0"
              >
                ✏️
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Edit Section */}
      {isEditing && editedGoal && (
        <div className="px-3 pb-3 space-y-3 border-t border-story/20 pt-3 bg-white transition-opacity duration-300 ease-in-out opacity-100">
          {/* Goal Title */}
          <div>
            <label className="text-xs text-gray-600 block mb-1">Goal Title</label>
            <input
              type="text"
              value={editedGoal.title}
              onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
              className="w-full p-2 text-sm border-2 border-story/30 rounded-lg focus:border-story focus:outline-none"
            />
          </div>

          {/* Emoji Picker */}
          <div>
            <label className="text-xs text-gray-600 block mb-1">Emoji</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-full p-2 text-2xl border-2 border-story/30 rounded-lg hover:border-story focus:border-story focus:outline-none text-center"
              >
                {editedGoal.emoji || '🎯'}
              </button>
              {showEmojiPicker && (
                <div className="absolute z-10 mt-1 w-full bg-white border-2 border-story/30 rounded-lg p-2 grid grid-cols-8 gap-1 shadow-lg max-h-48 overflow-y-auto">
                  {EMOJI_SUGGESTIONS.map((emoji, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setEditedGoal({ ...editedGoal, emoji });
                        setShowEmojiPicker(false);
                      }}
                      className="text-xl hover:bg-story/10 rounded p-1 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Missions */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-gray-600">Missions (Optional)</label>
              <button
                onClick={handleAddMission}
                className="text-xs text-story hover:text-story/80"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {(editedGoal.missions || []).map((mission, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={mission}
                    onChange={(e) => handleUpdateMission(idx, e.target.value)}
                    placeholder="Mission description..."
                    className="flex-1 p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
                  />
                  <button
                    onClick={() => handleDeleteMission(idx)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story/90 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Delete Goal */}
          <button
            onClick={handleDeleteGoal}
            className="w-full text-xs text-red-600 hover:text-red-800 py-1 transition-colors"
          >
            Delete Goal
          </button>
        </div>
      )}

      {/* Expandable Add New Goal Form */}
      {showAddGoal && !isEditing && (
        <div className="px-3 pb-3 space-y-3 border-t border-story/20 pt-3 bg-white transition-opacity duration-300 ease-in-out opacity-100">
          <p className="text-sm font-semibold text-story">Add New Goal</p>

          {/* Emoji Picker */}
          <div>
            <label className="text-xs text-gray-600 block mb-1">Emoji</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNewGoalEmojiPicker(!showNewGoalEmojiPicker)}
                className="w-full p-2 text-2xl border-2 border-story/30 rounded-lg hover:border-story focus:border-story focus:outline-none text-center"
              >
                {newGoal.emoji || '🎯'}
              </button>
              {showNewGoalEmojiPicker && (
                <div className="absolute z-10 mt-1 w-full bg-white border-2 border-story/30 rounded-lg p-2 grid grid-cols-8 gap-1 shadow-lg max-h-48 overflow-y-auto">
                  {EMOJI_SUGGESTIONS.map((emoji, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setNewGoal({ ...newGoal, emoji });
                        setShowNewGoalEmojiPicker(false);
                      }}
                      className="text-xl hover:bg-story/10 rounded p-1 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Goal Title */}
          <div>
            <label className="text-xs text-gray-600 block mb-1">Goal Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="Enter goal title..."
              className="w-full p-2 border-2 border-story/30 rounded-lg focus:border-story focus:outline-none"
              autoFocus
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddNewGoal}
              disabled={!newGoal.title.trim()}
              className="flex-1 bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story/90 transition-colors disabled:opacity-50"
            >
              Add Goal
            </button>
            <button
              onClick={handleCancelAddGoal}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowGoalFilter;
