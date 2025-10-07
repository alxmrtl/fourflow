import React from 'react';
import { useStore } from '../store/useStore';

const Navigation = () => {
  const { currentPillar, setCurrentPillar, isInFocusMode } = useStore();

  if (isInFocusMode) return null;

  const pillars = [
    { id: 'spirit', label: 'SPIRIT', color: 'spirit', icon: '/logos/SPIRIT - Circle.png' },
    { id: 'story', label: 'STORY', color: 'story', icon: '/logos/STORY - Cross.png' },
    { id: 'space', label: 'SPACE', color: 'space', icon: '/logos/SPACE - Sqaure.png' },
    { id: 'self', label: 'SELF', color: 'self', icon: '/logos/SELF - Frequencies.png' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:relative md:border-0 z-50">
      <div className="flex justify-around items-center h-16 md:h-auto md:flex-col md:space-y-2 md:p-4 max-w-4xl mx-auto">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setCurrentPillar(pillar.id)}
            className={`
              flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 p-2 md:p-3 rounded-lg
              transition-all duration-300 flex-1 md:w-full
              ${currentPillar === pillar.id
                ? `bg-${pillar.color} text-white shadow-lg scale-105`
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
            aria-label={pillar.label}
            aria-current={currentPillar === pillar.id ? 'page' : undefined}
          >
            <img
              src={pillar.icon}
              alt={`${pillar.label} icon`}
              className="w-6 h-6 md:w-8 md:h-8"
              style={{
                filter: currentPillar === pillar.id ? 'brightness(0) invert(1)' : 'none'
              }}
            />
            <span className="text-xs md:text-sm font-medium">{pillar.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
