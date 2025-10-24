import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';

const QuickAddAction = ({ selectedGoalId, onActionAdded, compact = false }) => {
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

  // Styles based on compact mode
  const containerClass = compact
    ? "bg-white/70 backdrop-blur-sm rounded border border-self/20 px-2 py-1"
    : "bg-white/80 backdrop-blur-sm rounded-lg border border-self/20 p-2";

  const inputTextSize = compact ? "text-[10px]" : "text-xs";
  const inputPadding = compact ? "px-1.5 py-1" : "px-2 py-1.5";
  const placeholder = compact ? "add action..." : "Quick add action...";

  return (
    <form onSubmit={handleAddAction} className={containerClass}>
      <div className="flex gap-1.5 items-center">
        <input
          ref={titleInputRef}
          type="text"
          value={newAction.title}
          onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
          placeholder={placeholder}
          className={`flex-1 ${inputPadding} ${inputTextSize} border border-gray-200 rounded focus:border-self focus:outline-none bg-white`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddAction();
            }
          }}
        />
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={newAction.duration}
            onChange={(e) => setNewAction({ ...newAction, duration: parseInt(e.target.value) || 25 })}
            min="1"
            max="180"
            className={`w-12 ${inputPadding} ${inputTextSize} text-center border border-gray-200 rounded focus:border-self focus:outline-none bg-white`}
          />
          <span className={`${inputTextSize} text-gray-500 font-medium`}>min</span>
        </div>
        <button
          type="submit"
          disabled={!newAction.title.trim() || isSaving}
          className={`px-3 py-1.5 bg-self text-white rounded ${compact ? 'text-sm' : 'text-base'} font-bold hover:bg-self/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[32px] flex items-center justify-center`}
        >
          {isSaving ? '...' : '+'}
        </button>
      </div>
    </form>
  );
};

export default QuickAddAction;
