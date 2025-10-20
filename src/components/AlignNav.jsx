import React from 'react';
import { useStore } from '../store/useStore';

const AlignNav = () => {
  const { currentAlignSection, setCurrentAlignSection, getAlignmentStatus } = useStore();
  const alignmentStatus = getAlignmentStatus();

  const sections = [
    { id: 'actions', label: 'ACTIONS', color: 'self', complete: alignmentStatus.actions },
    { id: 'setup', label: 'SETUP', color: 'space', complete: alignmentStatus.setup },
    { id: 'goals', label: 'GOALS', color: 'story', complete: alignmentStatus.goals },
    { id: 'vision', label: 'VISION', color: 'spirit', complete: alignmentStatus.vision },
  ];

  const getColorClasses = (section, isActive) => {
    const colorMap = {
      self: {
        active: 'bg-self text-white shadow-sm',
        inactive: 'border-2 border-self/30 text-gray-600 hover:border-self/50 hover:text-gray-900',
      },
      space: {
        active: 'bg-space text-white shadow-sm',
        inactive: 'border-2 border-space/30 text-gray-600 hover:border-space/50 hover:text-gray-900',
      },
      story: {
        active: 'bg-story text-white shadow-sm',
        inactive: 'border-2 border-story/30 text-gray-600 hover:border-story/50 hover:text-gray-900',
      },
      spirit: {
        active: 'bg-spirit text-white shadow-sm',
        inactive: 'border-2 border-spirit/30 text-gray-600 hover:border-spirit/50 hover:text-gray-900',
      },
    };

    return colorMap[section.color][isActive ? 'active' : 'inactive'];
  };

  return (
    <nav className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      {sections.map((section) => {
        const isActive = currentAlignSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => setCurrentAlignSection(section.id)}
            className={`
              flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all
              flex items-center justify-center gap-1
              ${getColorClasses(section, isActive)}
            `}
          >
            {section.complete && <span className="text-[10px]">✓</span>}
            {section.label}
          </button>
        );
      })}
    </nav>
  );
};

export default AlignNav;
