import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const AlignSetup = () => {
  const { settings, loadSettings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showSoundPicker, setShowSoundPicker] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const updateSetting = async (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    await updateSettings(newSettings);
  };

  const SOUND_OPTIONS = [
    { value: 'silence', label: 'Silence', emoji: '🔇' },
    { value: 'white-noise', label: 'White Noise', emoji: '📻' },
    { value: 'rain', label: 'Rain', emoji: '🌧️' },
    { value: 'cafe', label: 'Café', emoji: '☕' },
    { value: 'binaural', label: 'Binaural', emoji: '🎧' },
  ];

  const selectedSound = SOUND_OPTIONS.find(opt => opt.value === localSettings.sound) || SOUND_OPTIONS[0];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
      {/* Single Row Layout */}
      <div className="flex items-center gap-3">
        {/* Label */}
        <div className="text-sm font-bold text-space whitespace-nowrap w-20 flex-shrink-0">
          SETUP
        </div>

        {/* Sound Choice */}
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs text-gray-600 whitespace-nowrap">Sound:</span>
          <div className="relative">
            <button
              onClick={() => setShowSoundPicker(!showSoundPicker)}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium border-2 border-gray-200 rounded-lg hover:border-space transition-colors"
            >
              <span>{selectedSound.emoji}</span>
              <span>{selectedSound.label}</span>
            </button>

            {showSoundPicker && (
              <div className="absolute z-20 left-0 top-full mt-1 bg-white border-2 border-space rounded-lg shadow-xl min-w-[140px]">
                {SOUND_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      updateSetting('sound', option.value);
                      setShowSoundPicker(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-space/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      localSettings.sound === option.value ? 'bg-space/20 font-semibold' : ''
                    }`}
                  >
                    <span>{option.emoji}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Breathwork Choice */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-600 whitespace-nowrap">Breath:</span>
          <button
            onClick={() => updateSetting('breathworkBefore', !localSettings.breathworkBefore)}
            className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
              localSettings.breathworkBefore
                ? 'bg-space text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {localSettings.breathworkBefore ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlignSetup;
