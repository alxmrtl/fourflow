import React from 'react';
import { useStore } from '../store/useStore';

const Header = () => {
  const { isInFocusMode } = useStore();

  if (isInFocusMode) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-xs text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
