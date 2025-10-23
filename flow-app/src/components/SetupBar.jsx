import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import SetupModal from './SetupModal';

const SetupBar = () => {
  const { settings } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get background sound emoji and label
  const getSoundDisplay = () => {
    switch (settings.backgroundSound) {
      case 'whitenoise':
        return { emoji: '🔊', label: 'White Noise' };
      case 'binaural':
        return { emoji: '🎧', label: 'Binaural' };
      default:
        return { emoji: '🔇', label: 'Silence' };
    }
  };

  // Get breathwork display
  const getBreathworkDisplay = () => {
    const { breathworkBefore, breathworkAfter } = settings;

    if (breathworkBefore && breathworkAfter) {
      return { emoji: '✅', label: 'BOTH' };
    } else if (breathworkBefore) {
      return { emoji: '✅', label: 'BEFORE' };
    } else if (breathworkAfter) {
      return { emoji: '✅', label: 'AFTER' };
    } else {
      return { emoji: '❌', label: '' };
    }
  };

  const soundDisplay = getSoundDisplay();
  const breathworkDisplay = getBreathworkDisplay();

  return (
    <>
      <div
        className="overflow-hidden -mx-6 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.10) 50%, rgba(21, 128, 61, 0.08) 100%)',
        }}
      >
        {/* Header with Logo and Title */}
        <div className="px-6 py-2 flex items-center gap-3">
          <img
            src="/OPTIMIZED TOOLS.png"
            alt="Setup"
            className="w-5 h-5 object-contain flex-shrink-0"
          />
          <h2 className="text-[10px] font-semibold tracking-wide text-space uppercase">Setup</h2>

          {/* Configuration Display */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Background Sound */}
            <div className="flex flex-col items-center">
              <span className="text-lg">{soundDisplay.emoji}</span>
              <span className="text-[9px] text-gray-600 uppercase tracking-wide">{soundDisplay.label}</span>
            </div>

            {/* Breathwork */}
            <div className="flex flex-col items-center">
              <span className="text-lg">{breathworkDisplay.emoji}</span>
              {breathworkDisplay.label && (
                <span className="text-[9px] text-gray-600 uppercase tracking-wide">{breathworkDisplay.label}</span>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-2 px-3 py-1.5 bg-space text-white rounded-lg text-[10px] font-semibold hover:bg-space/90 transition-colors shadow-sm"
            >
              EDIT
            </button>
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      <SetupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SetupBar;
