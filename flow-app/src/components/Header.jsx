import React from 'react';
import { useStore } from '../store/useStore';

const VERSION = 'v1.2.0'; // Updated: 2025-10-21

const Header = () => {
  const { isInFocusMode } = useStore();

  if (isInFocusMode) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/logos/FOURFLOW - MAIN LOGO.png"
            alt="FourFlow"
            className="h-8"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white bg-self px-2 py-1 rounded">{VERSION}</span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
