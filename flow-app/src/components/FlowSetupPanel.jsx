import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const FlowSetupPanel = () => {
  const { settings, updateSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editedSettings, setEditedSettings] = useState({ ...settings });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleOpen = () => {
    if (isOpen) {
      // Closing, reset to current settings
      setEditedSettings({ ...settings });
      setHasChanges(false);
    } else {
      // Opening, load current settings
      setEditedSettings({ ...settings });
    }
    setIsOpen(!isOpen);
  };

  const handleSettingChange = async (newSettings) => {
    setEditedSettings(newSettings);
    setHasChanges(true);
    setIsSaving(true);

    // Auto-save after a short delay
    setTimeout(async () => {
      await updateSettings(newSettings);
      setHasChanges(false);
      setIsSaving(false);
    }, 500);
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

  const SOUND_OPTIONS = [
    { value: 'silence', label: 'Silence', icon: '🔇' },
    { value: 'white-noise', label: 'White Noise', icon: '🌊' },
    { value: 'rain', label: 'Rain', icon: '🌧️' },
    { value: 'cafe', label: 'Café', icon: '☕' },
    { value: 'binaural', label: 'Binaural', icon: '🎧' },
  ];

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        background: isOpen
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(74, 222, 128, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(74, 222, 128, 0.05) 100%)',
      }}
    >
      {/* Setup Button */}
      <div className="px-6 py-2">
        <button
          onClick={toggleOpen}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 border border-space/30 hover:bg-white text-space font-medium transition-all"
        >
          <img
            src="/OPTIMIZED TOOLS.png"
            alt="Setup"
            className="w-4 h-4 object-contain"
          />
          <span className="text-[11px] font-semibold tracking-wide uppercase">Setup</span>
          {hasChanges && !isSaving && (
            <span className="w-1.5 h-1.5 rounded-full bg-space animate-pulse"></span>
          )}
          {isSaving && (
            <span className="text-[9px] text-space/60">Saving...</span>
          )}
          <span className={`text-[10px] text-space/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
      </div>

      {/* Expandable Settings Panel */}
      {isOpen && (
        <div className="px-6 pb-3 space-y-3 pt-2 bg-white/30 transition-opacity duration-300 ease-in-out opacity-100">
          {/* Sound Selection */}
          <div>
            <label className="text-[10px] text-gray-600 block mb-1.5 font-medium">Background Sound</label>
            <div className="grid grid-cols-3 gap-1.5">
              {SOUND_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSettingChange({ ...editedSettings, sound: option.value })}
                  className={`
                    p-1.5 rounded-lg border transition-all text-[10px] font-medium
                    ${editedSettings.sound === option.value
                      ? 'border-space bg-space text-white'
                      : 'border-gray-200 bg-white hover:border-space/50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-sm">{option.icon}</span>
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          {editedSettings.sound !== 'silence' && (
            <div>
              <label className="text-[10px] text-gray-600 block mb-1 font-medium">
                Volume: {Math.round(editedSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={editedSettings.volume}
                onChange={(e) => handleSettingChange({ ...editedSettings, volume: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-space"
              />
            </div>
          )}

          {/* Breathwork Settings */}
          <div>
            <label className="text-[10px] text-gray-600 block mb-1.5 font-medium">Breathwork</label>
            <label className="flex items-center gap-2 p-1.5 border border-gray-200 rounded-lg cursor-pointer text-[10px] hover:border-space/50 transition-colors bg-white">
              <input
                type="checkbox"
                checked={editedSettings.breathworkBefore}
                onChange={(e) => handleSettingChange({ ...editedSettings, breathworkBefore: e.target.checked })}
                className="w-3 h-3 accent-space"
              />
              <span>Enable breathwork before flow sessions</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowSetupPanel;
