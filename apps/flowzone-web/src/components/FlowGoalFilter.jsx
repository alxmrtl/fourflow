import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import EmojiPickerModal from './EmojiPickerModal';
import ConfirmModal from './ConfirmModal';

const FlowGoalFilter = ({ selectedGoalId, onGoalSelect }) => {
  const { goals, updateGoal, addGoal, deleteGoal, tasks } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', emoji: '🎯' });
  const [showEmojiPickerModal, setShowEmojiPickerModal] = useState(false);
  const [emojiPickerMode, setEmojiPickerMode] = useState(null); // 'add' or 'edit'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const activeGoals = goals.filter(g => g.status === 'active');
  const selectedGoal = activeGoals.find(g => g.id === selectedGoalId);

  const handleEdit = () => {
    if (selectedGoal) {
      setEditedGoal({ ...selectedGoal });
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
    setShowEmojiPickerModal(false);
    setEmojiPickerMode(null);
  };


  const handleAddNewGoal = async () => {
    if (newGoal.title.trim() && activeGoals.length < 5) {
      const addedGoal = await addGoal({ ...newGoal, status: 'active' });
      setNewGoal({ title: '', emoji: '🎯' });
      setShowAddGoal(false);
      setShowEmojiPickerModal(false);
      setEmojiPickerMode(null);
      // Select the newly added goal if it's the first one
      if (activeGoals.length === 0 && addedGoal) {
        onGoalSelect(addedGoal.id);
      }
    }
  };

  const handleCancelAddGoal = () => {
    setShowAddGoal(false);
    setNewGoal({ title: '', emoji: '🎯' });
    setShowEmojiPickerModal(false);
    setEmojiPickerMode(null);
  };

  const handleDeleteGoal = async () => {
    await deleteGoal(selectedGoal.id);
    setIsEditing(false);
    setEditedGoal(null);
    setShowDeleteConfirm(false);
    // Select first remaining goal
    const remaining = activeGoals.filter(g => g.id !== selectedGoal.id);
    if (remaining.length > 0) {
      onGoalSelect(remaining[0].id);
    }
  };

  const getGoalActionCount = (goalId) => {
    return tasks.filter(t => t.goalId === goalId && t.status === 'backlog').length;
  };

  const handleEmojiSelect = (emoji) => {
    if (emojiPickerMode === 'add') {
      setNewGoal({ ...newGoal, emoji });
    } else if (emojiPickerMode === 'edit') {
      setEditedGoal({ ...editedGoal, emoji });
    }
  };

  const openEmojiPicker = (mode) => {
    setEmojiPickerMode(mode);
    setShowEmojiPickerModal(true);
  };

  if (activeGoals.length === 0) {
    return (
      <>
        <div className="overflow-hidden transition-all duration-300 ease-in-out card-glass-story border-0 rounded-none relative">
          {/* Ambient story glow */}
          <div className="absolute inset-0 bg-glow-story opacity-30 pointer-events-none" />

          {/* Header with Logo, Title and Add Button - Single Row */}
          <div className="px-6 py-2.5 flex items-center gap-3 relative z-10">
            <img
              src="/WORTHY MISSION.png"
              alt="Goals"
              className="w-6 h-6 object-contain flex-shrink-0"
              style={{ filter: 'drop-shadow(0 0 8px rgba(91, 132, 177, 0.5))' }}
            />
            <h2 className="text-xs font-semibold tracking-wide text-story uppercase flex-shrink-0">Mission</h2>

            {/* Add Button with Text */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddGoal(!showAddGoal)}
                className="text-base w-7 h-7 rounded-full bg-story/20 border-2 border-dashed border-story/40 text-story transition-all flex-shrink-0 flex items-center justify-center font-bold hover:border-story hover:bg-story/30 hover:scale-105"
                title="Add mission"
              >
                +
              </button>
              {!showAddGoal && (
                <span className="text-xs text-ivory/40">
                  Add your first mission
                </span>
              )}
            </div>
          </div>

          {/* Expandable Add Goal Form - One Row */}
          {showAddGoal && (
            <div className="px-6 pb-3 border-t border-glass-border pt-3 bg-glass transition-opacity duration-300 ease-in-out opacity-100 relative z-10">
              <div className="flex items-center gap-2">
                {/* Emoji Button */}
                <button
                  type="button"
                  onClick={() => openEmojiPicker('add')}
                  className="w-9 h-9 text-lg border border-story/40 rounded-lg hover:border-story focus:border-story focus:outline-none flex items-center justify-center bg-glass flex-shrink-0"
                >
                  {newGoal.emoji || '🎯'}
                </button>

                {/* Goal Title Input */}
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewGoal();
                    } else if (e.key === 'Escape') {
                      handleCancelAddGoal();
                    }
                  }}
                  placeholder="Enter mission title..."
                  className="flex-1 px-2 py-1.5 text-xs border border-story/40 rounded-lg focus:border-story focus:outline-none bg-dark/50 text-ivory"
                  style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}
                  autoFocus
                />

                {/* Action Buttons */}
                <button
                  onClick={handleAddNewGoal}
                  disabled={!newGoal.title.trim()}
                  className="px-3 py-1.5 bg-story text-white rounded-lg text-xs font-semibold hover:bg-story/90 transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  Add
                </button>
                <button
                  onClick={handleCancelAddGoal}
                  className="px-3 py-1.5 bg-glass border border-glass-border text-ivory/60 rounded-lg text-xs font-semibold hover:bg-glass-light hover:text-ivory transition-colors flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Emoji Picker Modal */}
        <EmojiPickerModal
          isOpen={showEmojiPickerModal}
          onClose={() => setShowEmojiPickerModal(false)}
          onSelect={handleEmojiSelect}
          currentEmoji={newGoal.emoji}
        />
      </>
    );
  }

  return (
    <div className="overflow-hidden transition-all duration-300 ease-in-out card-glass-story border-0 rounded-none relative">
      {/* Ambient story glow */}
      <div className="absolute inset-0 bg-glow-story opacity-30 pointer-events-none" />

      {/* Header with Logo, Title and Pills - Single Row */}
      <div className="px-6 py-2.5 flex items-center gap-3 flex-wrap relative z-10">
        <img
          src="/WORTHY MISSION.png"
          alt="Goals"
          className="w-6 h-6 object-contain flex-shrink-0"
          style={{ filter: 'drop-shadow(0 0 8px rgba(91, 132, 177, 0.5))' }}
        />
        <h2 className="text-xs font-semibold tracking-wide text-story uppercase flex-shrink-0">Mission</h2>

        {/* Pills Section - Emoji only */}
        <div className="flex items-center gap-2 flex-wrap">
          {activeGoals.map((goal) => {
            const isSelected = selectedGoalId === goal.id;
            return (
              <button
                key={goal.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isEditing && !showAddGoal) onGoalSelect(goal.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (isSelected && !isEditing && !showAddGoal) handleEdit();
                }}
                disabled={isEditing || showAddGoal}
                className={`
                  text-base w-7 h-7 rounded-full transition-all flex-shrink-0 flex items-center justify-center
                  ${isSelected
                    ? 'bg-story shadow-lg shadow-story/30 scale-110'
                    : 'bg-glass hover:bg-glass-light border border-story/30 hover:scale-105'
                  }
                  ${isEditing || showAddGoal ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                title={`${goal.emoji || '🎯'} ${goal.title}`}
              >
                {goal.emoji || '🎯'}
              </button>
            );
          })}
          {activeGoals.length < 5 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isEditing) setShowAddGoal(true);
              }}
              disabled={isEditing}
              className={`text-base w-7 h-7 rounded-full bg-story/20 border-2 border-dashed border-story/40 text-story transition-all flex-shrink-0 flex items-center justify-center font-bold ${isEditing ? 'opacity-30 cursor-not-allowed' : 'hover:border-story hover:bg-story/30 hover:scale-105'}`}
              title="Add goal"
            >
              +
            </button>
          )}
        </div>
      </div>

      {/* Expandable Add Goal Form - One Row */}
      {showAddGoal && (
        <div className="px-6 pb-3 border-t border-glass-border pt-3 bg-glass transition-opacity duration-300 ease-in-out opacity-100 relative z-10">
          <div className="flex items-center gap-2">
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => openEmojiPicker('add')}
              className="w-9 h-9 text-lg border border-story/40 rounded-lg hover:border-story focus:border-story focus:outline-none flex items-center justify-center bg-glass flex-shrink-0"
            >
              {newGoal.emoji || '🎯'}
            </button>

            {/* Goal Title Input */}
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddNewGoal();
                } else if (e.key === 'Escape') {
                  handleCancelAddGoal();
                }
              }}
              placeholder="Enter mission title..."
              className="flex-1 px-2 py-1.5 text-xs border border-story/40 rounded-lg focus:border-story focus:outline-none bg-dark/50 text-ivory"
              style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}
              autoFocus
            />

            {/* Action Buttons */}
            <button
              onClick={handleAddNewGoal}
              disabled={!newGoal.title.trim()}
              className="px-3 py-1.5 bg-story text-white rounded-lg text-xs font-semibold hover:bg-story/90 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              Add
            </button>
            <button
              onClick={handleCancelAddGoal}
              className="px-3 py-1.5 bg-glass border border-glass-border text-ivory/60 rounded-lg text-xs font-semibold hover:bg-glass-light hover:text-ivory transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Expandable Edit Section - One Row */}
      {isEditing && editedGoal && (
        <div className="px-6 pb-3 border-t border-glass-border pt-3 bg-glass transition-opacity duration-300 ease-in-out opacity-100 relative z-10">
          <div className="flex items-center gap-2">
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => openEmojiPicker('edit')}
              className="w-9 h-9 text-lg border border-story/40 rounded-lg hover:border-story focus:border-story focus:outline-none flex items-center justify-center bg-glass flex-shrink-0"
            >
              {editedGoal.emoji || '🎯'}
            </button>

            {/* Goal Title Input */}
            <input
              type="text"
              value={editedGoal.title}
              onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSave();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
              placeholder="Enter mission title..."
              className="flex-1 px-2 py-1.5 text-xs border border-story/40 rounded-lg focus:border-story focus:outline-none bg-dark/50 text-ivory"
              style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}
              autoFocus
            />

            {/* Action Buttons */}
            <button
              onClick={handleSave}
              disabled={!editedGoal.title.trim()}
              className="px-3 py-1.5 bg-story text-white rounded-lg text-xs font-semibold hover:bg-story/90 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              Save
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1.5 bg-red-500/80 text-white rounded-lg text-xs font-semibold hover:bg-red-500 transition-colors flex-shrink-0"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker Modal */}
      <EmojiPickerModal
        isOpen={showEmojiPickerModal}
        onClose={() => setShowEmojiPickerModal(false)}
        onSelect={handleEmojiSelect}
        currentEmoji={emojiPickerMode === 'add' ? newGoal.emoji : editedGoal?.emoji}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteGoal}
        title="Delete Mission"
        message={`Are you sure you want to delete "${selectedGoal?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

    </div>
  );
};

export default FlowGoalFilter;
