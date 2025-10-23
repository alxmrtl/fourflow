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
    <form onSubmit={handleAddAction} className="bg-white/80 backdrop-blur-sm rounded-lg border border-self/20 p-2">
      <div className="flex gap-2 items-center">
        <input
          ref={titleInputRef}
          type="text"
          value={newAction.title}
          onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
          placeholder="Quick add action..."
          className="flex-1 px-2 py-1.5 text-[11px] border border-gray-200 rounded focus:border-self focus:outline-none bg-white"
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
          className="w-14 px-2 py-1.5 text-[11px] text-center border border-gray-200 rounded focus:border-self focus:outline-none bg-white"
        />
        <button
          type="submit"
          disabled={!newAction.title.trim() || isSaving}
          className="px-3 py-1.5 bg-self text-white rounded text-xs font-semibold hover:bg-self/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSaving ? '...' : '+'}
        </button>
      </div>
    </form>
  );
};

export default QuickAddAction;
