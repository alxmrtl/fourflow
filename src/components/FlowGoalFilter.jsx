import React from 'react';
import { useStore } from '../store/useStore';

const FlowGoalFilter = ({ selectedGoalId, onGoalSelect }) => {
  const { goals, setCurrentPage, setCurrentAlignSection } = useStore();
  const activeGoals = goals.filter(g => g.status === 'active');

  const handleGoToGoals = () => {
    setCurrentAlignSection('goals');
    setCurrentPage('align');
  };

  if (activeGoals.length === 0) {
    return (
      <button
        onClick={handleGoToGoals}
        className="w-full bg-story/5 border border-story/20 rounded-lg p-3 text-left hover:border-story/40 transition-colors"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">No goals set</p>
          <span className="text-story/40 text-sm">→</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-story/5 border border-story/20 rounded-lg p-2">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {activeGoals.map((goal) => {
          const isSelected = selectedGoalId === goal.id;

          return (
            <button
              key={goal.id}
              onClick={() => onGoalSelect(goal.id)}
              className={`
                flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all
                flex items-center gap-1.5
                ${isSelected
                  ? 'bg-story text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-story/10 border border-story/20'
                }
              `}
            >
              <span className="text-base">{goal.emoji || '🎯'}</span>
              <span className="whitespace-nowrap">{goal.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FlowGoalFilter;
