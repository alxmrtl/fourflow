import React from 'react';
import { useStore } from '../store/useStore';

const Navigation = () => {
  const { currentPage, setCurrentPage, isInFocusMode } = useStore();

  if (isInFocusMode) return null;

  const pages = [
    { id: 'flow', label: 'FLOW', icon: '/logos/FOURFLOW - MAIN LOGO.png' },
    { id: 'stats', label: 'STATS', emoji: '📊' },
    { id: 'about', label: 'ABOUT', emoji: 'ℹ️' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:relative md:border-0 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 md:h-auto md:flex-col md:space-y-1 md:p-3 max-w-4xl mx-auto">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setCurrentPage(page.id)}
            className={`
              flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 p-1 md:p-2 rounded-lg
              transition-all flex-1 md:w-full text-xs
              ${currentPage === page.id
                ? 'bg-self text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
            aria-label={page.label}
            aria-current={currentPage === page.id ? 'page' : undefined}
          >
            {page.icon ? (
              <img src={page.icon} alt={page.label} className="h-7 md:h-8" />
            ) : (
              <span className="text-lg md:text-xl">{page.emoji}</span>
            )}
            <span className="text-[10px] md:text-xs font-medium">{page.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
