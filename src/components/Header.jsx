import React from 'react';
import { useStore } from '../store/useStore';

const Header = () => {
  const { isInFocusMode } = useStore();

  if (isInFocusMode) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logos/FOURFLOW - MAIN LOGO.png"
            alt="FourFlow Logo"
            className="h-10 md:h-12"
          />
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
