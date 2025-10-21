import React, { useState, useEffect } from 'react';

const AutoSaveIndicator = ({ trigger }) => {
  const [status, setStatus] = useState('idle'); // idle | saving | saved

  useEffect(() => {
    if (trigger > 0) {
      setStatus('saving');

      // Show "saving" briefly
      const savingTimeout = setTimeout(() => {
        setStatus('saved');

        // Auto-hide after 2 seconds
        const hideTimeout = setTimeout(() => {
          setStatus('idle');
        }, 2000);

        return () => clearTimeout(hideTimeout);
      }, 300);

      return () => clearTimeout(savingTimeout);
    }
  }, [trigger]);

  if (status === 'idle') return null;

  return (
    <div
      className={`
        text-xs font-medium transition-opacity duration-300
        ${status === 'saving' ? 'text-gray-500 opacity-100' : ''}
        ${status === 'saved' ? 'text-green-600 opacity-100' : ''}
      `}
    >
      {status === 'saving' && 'Saving...'}
      {status === 'saved' && (
        <span className="flex items-center gap-1">
          <span>Saved</span>
          <span>✓</span>
        </span>
      )}
    </div>
  );
};

export default AutoSaveIndicator;
