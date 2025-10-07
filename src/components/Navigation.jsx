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
      <div className="flex justify-around items-center h-14 md:h-auto md:flex-col md:space-y-1 md:p-3 max-w-4xl mx-auto">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setCurrentPillar(pillar.id)}
            className={`
              flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 p-1 md:p-2 rounded-lg
              transition-all flex-1 md:w-full text-xs
              ${currentPillar === pillar.id
                ? `bg-${pillar.color} text-white shadow-lg`
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
            aria-label={pillar.label}
            aria-current={currentPillar === pillar.id ? 'page' : undefined}
          >
            <img
              src={pillar.icon}
              alt=""
              className="w-5 h-5 md:w-6 md:h-6"
              style={{
                filter: currentPillar === pillar.id ? 'brightness(0) invert(1)' : 'none'
              }}
            />
            <span className="text-[10px] md:text-xs font-medium">{pillar.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
