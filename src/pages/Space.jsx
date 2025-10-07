import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const Space = () => {
  const { settings, loadSettings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = async () => {
    await updateSettings(localSettings);
  };

  const updateSetting = (key, value) => {
    setLocalSettings({ ...localSettings, [key]: value });
  };

  const TIMER_PRESETS = [
    { value: 25, label: '25 min' },
    { value: 50, label: '50 min' },
    { value: 90, label: '90 min' },
  ];

  const SOUND_OPTIONS = [
    { value: 'silence', label: 'Silence' },
    { value: 'white-noise', label: 'White Noise' },
    { value: 'rain', label: 'Rain' },
    { value: 'cafe', label: 'Café' },
    { value: 'binaural', label: 'Binaural' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] overflow-hidden pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 h-full flex flex-col">
        {/* Compact Header */}
        <div className="text-center mb-3">
          <p className="text-xs text-gray-600">What supports your flow?</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Session Settings */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-3 space-y-3">
            <h2 className="text-base font-semibold text-space">Session</h2>

            {/* Timer Duration */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Timer Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIMER_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => updateSetting('timerDuration', preset.value)}
                    className={`
                      p-2 rounded-lg border-2 transition-all text-sm
                      ${localSettings.timerDuration === preset.value
                        ? 'border-space bg-space text-white'
                        : 'border-gray-200 hover:border-space/50'
                      }
                    `}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Breaks */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Short Break
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={localSettings.breakDuration}
                    onChange={(e) => updateSetting('breakDuration', parseInt(e.target.value) || 5)}
                    className="w-full p-1.5 text-sm border-2 border-gray-200 rounded-lg focus:border-space focus:outline-none"
                  />
                  <span className="text-xs text-gray-600">min</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Long Break
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={localSettings.longBreakDuration}
                    onChange={(e) => updateSetting('longBreakDuration', parseInt(e.target.value) || 15)}
                    className="w-full p-1.5 text-sm border-2 border-gray-200 rounded-lg focus:border-space focus:outline-none"
                  />
                  <span className="text-xs text-gray-600">min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environment Settings */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-3 space-y-3">
            <h2 className="text-base font-semibold text-space">Environment</h2>

            {/* Sound Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Background Sound
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SOUND_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateSetting('sound', option.value)}
                    className={`
                      p-1.5 rounded-lg border-2 transition-all text-xs
                      ${localSettings.sound === option.value
                        ? 'border-space bg-space text-white'
                        : 'border-gray-200 hover:border-space/50'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Control */}
            {localSettings.sound !== 'silence' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Volume: {Math.round(localSettings.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={localSettings.volume}
                  onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-space"
                />
              </div>
            )}

            {/* Breathwork Settings */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-gray-700">Breathwork</h3>

              <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={localSettings.breathworkBefore}
                  onChange={(e) => updateSetting('breathworkBefore', e.target.checked)}
                  className="w-4 h-4 accent-space"
                />
                <span>Before sessions</span>
              </label>

              <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={localSettings.breathworkAfter}
                  onChange={(e) => updateSetting('breathworkAfter', e.target.checked)}
                  className="w-4 h-4 accent-space"
                />
                <span>After sessions</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-space text-white py-2 rounded-lg text-sm font-semibold hover:bg-space-dark transition-colors mt-3"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Space;
