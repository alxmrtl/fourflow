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

  // Calculate button width based on number of goals
  const getButtonWidth = () => {
    const count = activeGoals.length;
    if (count === 1 || count === 2 || count === 3) return '33.333%';
    if (count === 4) return '25%';
    if (count >= 5) return '20%';
    return '33.333%';
  };

  const buttonWidth = getButtonWidth();

  return (
    <div className="bg-story/5 border border-story/20 rounded-lg p-2">
      <div className="flex items-center gap-2 justify-center flex-wrap">
        {activeGoals.map((goal) => {
          const isSelected = selectedGoalId === goal.id;

          return (
            <button
              key={goal.id}
              onClick={() => onGoalSelect(goal.id)}
              style={{ width: `calc(${buttonWidth} - 0.5rem)` }}
              className={`
                px-3 py-2 rounded-lg text-xs font-semibold transition-all
                flex items-center justify-center gap-1.5
                ${isSelected
                  ? 'bg-story text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-story/10 border border-story/20'
                }
              `}
            >
              <span className="text-base flex-shrink-0">{goal.emoji || '🎯'}</span>
              <span className="whitespace-normal text-center break-words">{goal.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FlowGoalFilter;
