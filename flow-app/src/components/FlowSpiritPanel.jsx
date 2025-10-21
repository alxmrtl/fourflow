import React from 'react';
import { useStore } from '../store/useStore';

const FlowSpiritPanel = () => {
  const { profile, setCurrentPage, setCurrentAlignSection } = useStore();

  const handleClick = () => {
    setCurrentAlignSection('vision');
    setCurrentPage('align');
  };

  const hasValues = profile?.selectedValues && profile.selectedValues.length > 0;
  const hasVision = profile?.vision && profile.vision.trim().length > 0;

  return (
    <button
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-spirit/5 to-spirit/10 border border-spirit/20 rounded-lg p-3 text-left hover:border-spirit/40 transition-colors"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* Values Pills */}
          {hasValues ? (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {profile.selectedValues.slice(0, 5).map((value, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-0.5 bg-spirit text-white text-[10px] font-semibold rounded-full"
                >
                  {value}
                </span>
              ))}
              {profile.selectedValues.length > 5 && (
                <span className="inline-block px-2 py-0.5 bg-spirit/70 text-white text-[10px] font-semibold rounded-full">
                  +{profile.selectedValues.length - 5}
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400 mb-1">No values set</p>
          )}

          {/* Vision Statement */}
          {hasVision ? (
            <p className="text-xs text-gray-700 leading-relaxed">
              {profile.vision}
            </p>
          ) : (
            <p className="text-xs text-gray-400">Set your vision & values</p>
          )}
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0 text-spirit/40 text-sm">
          →
        </div>
      </div>
    </button>
  );
};

export default FlowSpiritPanel;
