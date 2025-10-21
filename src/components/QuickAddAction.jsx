import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';

const QuickAddAction = ({ selectedGoalId, onActionAdded }) => {
  const { addTask } = useStore();
  const [newAction, setNewAction] = useState({ title: '', duration: 25 });
  const [isSaving, setIsSaving] = useState(false);
  const titleInputRef = useRef(null);

  const handleAddAction = async (e) => {
    e?.preventDefault();

    if (newAction.title.trim() && selectedGoalId) {
      setIsSaving(true);

      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }

      const newTaskData = {
        ...newAction,
        goalId: selectedGoalId,
        status: 'backlog',
        order: Date.now(),
      };

      await addTask(newTaskData);

      // Reset form
      setNewAction({ title: '', duration: 25 });
      setIsSaving(false);

      // Call callback to refresh
      if (onActionAdded) {
        await onActionAdded();
      }

      // Refocus title input
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleAddAction}>
      <div className="bg-white border-2 border-self/30 rounded-lg p-3 space-y-2">
        <div className="flex gap-2">
          <input
            ref={titleInputRef}
            type="text"
            value={newAction.title}
            onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
            placeholder="New action..."
            className="flex-1 p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddAction();
              }
            }}
          />
          <input
            type="number"
            value={newAction.duration}
            onChange={(e) => setNewAction({ ...newAction, duration: parseInt(e.target.value) || 25 })}
            min="1"
            max="180"
            className="w-20 p-2 text-sm text-center border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
          />
          <span className="text-xs text-gray-500 self-center whitespace-nowrap">min</span>
        </div>
        <button
          type="submit"
          disabled={!newAction.title.trim() || isSaving}
          className="w-full bg-self text-white py-2 rounded-lg text-sm font-semibold hover:bg-self/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Adding...' : 'Add Action'}
        </button>
      </div>
    </form>
  );
};

export default QuickAddAction;
