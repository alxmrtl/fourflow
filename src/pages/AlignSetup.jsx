import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const AlignSetup = () => {
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

  const SOUND_OPTIONS = [
    { value: 'silence', label: 'Silence' },
    { value: 'white-noise', label: 'White Noise' },
    { value: 'rain', label: 'Rain' },
    { value: 'cafe', label: 'Café' },
    { value: 'binaural', label: 'Binaural' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-space">SETUP - Default Configuration</h2>
        <p className="text-sm text-gray-600">Set your default space configuration</p>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Environment Settings */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-3 space-y-3">
          <h3 className="text-base font-semibold text-space">Environment Defaults</h3>

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
            <h4 className="text-xs font-medium text-gray-700">Breathwork</h4>

            <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={localSettings.breathworkBefore}
                onChange={(e) => updateSetting('breathworkBefore', e.target.checked)}
                className="w-4 h-4 accent-space"
              />
              <span>Enable breathwork before flow sessions</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-space text-white py-2 rounded-lg text-sm font-semibold hover:bg-space-dark transition-colors"
      >
        Save Default Settings
      </button>

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1">Default configuration:</p>
        <p>• Applies to all flow sessions unless overridden</p>
        <p>• Can be adjusted per-session on the FLOW page</p>
        <p>• Breathwork runs before timer if enabled</p>
      </div>
    </div>
  );
};

export default AlignSetup;
