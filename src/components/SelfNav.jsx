import React from 'react';
import { useStore } from '../store/useStore';

const SelfNav = () => {
  const { currentSelfView, setCurrentSelfView, isInFocusMode } = useStore();

  if (isInFocusMode) return null;

  const views = [
    { id: 'plan', label: 'PLAN' },
    { id: 'focus', label: 'FOCUS' },
    { id: 'review', label: 'REVIEW' },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setCurrentSelfView(view.id)}
          className={`
            px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
            ${currentSelfView === view.id
              ? 'bg-self text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
};

export default SelfNav;
