import React from 'react';
import { useStore } from '../store/useStore';

const AlignNav = () => {
  const { currentAlignSection, setCurrentAlignSection } = useStore();

  const sections = [
    { id: 'actions', label: 'ACTIONS' },
    { id: 'setup', label: 'SETUP' },
    { id: 'goals', label: 'GOALS' },
    { id: 'vision', label: 'VISION' },
  ];

  return (
    <nav className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setCurrentAlignSection(section.id)}
          className={`
            flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all
            ${currentAlignSection === section.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

export default AlignNav;
