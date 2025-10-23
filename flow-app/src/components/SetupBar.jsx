import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import SetupModal from './SetupModal';

const SetupBar = () => {
  const { settings } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get background sound text
  const getSoundText = () => {
    switch (settings.backgroundSound) {
      case 'whitenoise':
        return 'White Noise';
      case 'binaural':
        return 'Binaural';
      default:
        return 'Silence';
    }
  };

  // Get breathwork text
  const getBreathworkText = () => {
    const { breathworkBefore, breathworkAfter } = settings;

    if (breathworkBefore && breathworkAfter) {
      return 'Both';
    } else if (breathworkBefore) {
      return 'Before';
    } else if (breathworkAfter) {
      return 'After';
    } else {
      return 'Off';
    }
  };

  const soundText = getSoundText();
  const breathworkText = getBreathworkText();

  return (
    <>
      <div
        className="overflow-hidden -mx-6 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.10) 50%, rgba(21, 128, 61, 0.08) 100%)',
        }}
      >
        {/* Header with Logo and Title */}
        <div className="px-6 py-2 flex items-center gap-2">
          <img
            src="/OPTIMIZED TOOLS.png"
            alt="Setup"
            className="w-6 h-6 object-contain flex-shrink-0"
          />
          <h2 className="text-xs font-semibold tracking-wide text-space uppercase">Setup</h2>

          {/* Configuration Display */}
          <div className="flex items-center gap-2 ml-auto pr-1">
            {/* Sound Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-full border border-space/30">
              <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Sound</span>
              <span className="text-[9px] text-gray-700">{soundText}</span>
            </div>

            {/* Breathwork Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-full border border-space/30">
              <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Breathwork</span>
              <span className="text-[9px] text-gray-700">{breathworkText}</span>
            </div>

            {/* Edit Button - Circular subtle style */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-7 h-7 rounded-full bg-space/10 border-2 border-dashed border-space/40 text-space transition-all flex items-center justify-center hover:border-space hover:bg-space/20 hover:scale-105"
              title="Edit setup"
            >
              ⚙️
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
