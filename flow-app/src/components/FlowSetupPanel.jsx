import React from 'react';
import { useStore } from '../store/useStore';

const FlowSetupPanel = () => {
  const { settings, setCurrentPage, setCurrentAlignSection } = useStore();

  const handleClick = () => {
    setCurrentAlignSection('setup');
    setCurrentPage('align');
  };

  const getSoundLabel = (sound) => {
    const soundMap = {
      'silence': 'Silence',
      'white-noise': 'White Noise',
      'rain': 'Rain',
      'cafe': 'Café',
      'binaural': 'Binaural',
    };
    return soundMap[sound] || 'Silence';
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-space/5 border border-space/20 rounded-lg p-3 text-left hover:border-space/40 transition-colors"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-gray-700">
          <span className="flex items-center gap-1">
            <span>🔊</span>
            <span>{getSoundLabel(settings.sound)}</span>
          </span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1">
            <span>🌬️</span>
            <span>{settings.breathworkBefore ? 'Breathwork' : 'No Breathwork'}</span>
          </span>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0 text-space/40 text-sm">
          →
        </div>
      </div>
    </button>
  );
};

export default FlowSetupPanel;
