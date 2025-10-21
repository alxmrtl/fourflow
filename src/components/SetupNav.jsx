import React from 'react';
import { useStore } from '../store/useStore';

const SetupNav = () => {
  const { currentSetupSection, setCurrentSetupSection, getSetupCompletion } = useStore();
  const completion = getSetupCompletion();

  const sections = [
    { id: 'overview', label: 'Overview', color: 'gray' },
    { id: 'spirit', label: 'Spirit', color: 'spirit', complete: completion.spirit },
    { id: 'story', label: 'Story', color: 'story', complete: completion.story },
    { id: 'space', label: 'Space', color: 'space', complete: completion.space },
    { id: 'self', label: 'Self', color: 'self', complete: true },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {sections.map((section) => {
        const isActive = currentSetupSection === section.id;
        const colorClass = section.color === 'gray' ? 'gray-800' : section.color;

        return (
          <button
            key={section.id}
            onClick={() => setCurrentSetupSection(section.id)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-all
              ${isActive
                ? section.color === 'gray'
                  ? 'bg-gray-800 text-white'
                  : `bg-${colorClass} text-white`
                : section.color === 'gray'
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : `bg-${colorClass}/10 text-${colorClass} hover:bg-${colorClass}/20`
              }
            `}
          >
            {section.label}
            {section.complete && section.id !== 'overview' && section.id !== 'self' && (
              <span className={isActive ? 'text-white/80' : 'text-green-600'}>✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SetupNav;
