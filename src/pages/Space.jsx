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
    { value: 25, label: '25 min (Pomodoro)' },
    { value: 50, label: '50 min (Deep Work)' },
    { value: 90, label: '90 min (Ultradian)' },
  ];

  const SOUND_OPTIONS = [
    { value: 'silence', label: 'Silence' },
    { value: 'white-noise', label: 'White Noise' },
    { value: 'rain', label: 'Rain' },
    { value: 'cafe', label: 'Café Ambience' },
    { value: 'binaural', label: 'Binaural Beats' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <img
            src="/logos/SPACE - Section Logo.png"
            alt="Space"
            className="h-24"
          />
        </div>
        <h1 className="text-4xl font-display font-bold text-space">SPACE</h1>
        <p className="text-lg text-gray-600">What supports your flow?</p>
      </div>

      {/* Session Settings */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-space">Session Settings</h2>

        {/* Timer Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Default Timer Duration
          </label>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {TIMER_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => updateSetting('timerDuration', preset.value)}
                className={`
                  p-3 rounded-lg border-2 transition-all
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

          {/* Custom Duration */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Custom:</label>
            <input
              type="number"
              min="1"
              max="180"
              value={localSettings.timerDuration}
              onChange={(e) => updateSetting('timerDuration', parseInt(e.target.value) || 25)}
              className="w-24 p-2 border-2 border-gray-200 rounded-lg focus:border-space focus:outline-none"
            />
            <span className="text-sm text-gray-600">minutes</span>
          </div>
        </div>

        {/* Break Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Break
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="30"
                value={localSettings.breakDuration}
                onChange={(e) => updateSetting('breakDuration', parseInt(e.target.value) || 5)}
                className="w-20 p-2 border-2 border-gray-200 rounded-lg focus:border-space focus:outline-none"
              />
              <span className="text-sm text-gray-600">min</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="60"
                value={localSettings.longBreakDuration}
                onChange={(e) => updateSetting('longBreakDuration', parseInt(e.target.value) || 15)}
                className="w-20 p-2 border-2 border-gray-200 rounded-lg focus:border-space focus:outline-none"
              />
              <span className="text-sm text-gray-600">min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Settings */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-space">Environment</h2>

        {/* Sound Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Background Sound
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SOUND_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting('sound', option.value)}
                className={`
                  p-3 rounded-lg border-2 transition-all
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
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Volume: {Math.round(localSettings.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={localSettings.volume}
              onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-space"
            />
          </div>
        )}

        {/* Breathwork Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Breathwork</h3>

          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-space/50 transition-colors">
            <input
              type="checkbox"
              checked={localSettings.breathworkBefore}
              onChange={(e) => updateSetting('breathworkBefore', e.target.checked)}
              className="w-5 h-5 accent-space"
            />
            <div className="flex-1">
              <div className="font-medium">Before Sessions</div>
              <div className="text-sm text-gray-600">1-minute breathwork to prepare for focus</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-space/50 transition-colors">
            <input
              type="checkbox"
              checked={localSettings.breathworkAfter}
              onChange={(e) => updateSetting('breathworkAfter', e.target.checked)}
              className="w-5 h-5 accent-space"
            />
            <div className="flex-1">
              <div className="font-medium">After Sessions</div>
              <div className="text-sm text-gray-600">1-minute breathwork for recovery</div>
            </div>
          </label>
        </div>
      </div>

      {/* Flow Tips */}
      <div className="bg-space/10 rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold text-space">Flow Environment Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Longer sessions (50-90 min) allow deeper flow states</li>
          <li>• White noise and binaural beats can mask distractions</li>
          <li>• Breathwork primes your nervous system for focus</li>
          <li>• Experiment to find what works best for you</li>
        </ul>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-space text-white py-3 rounded-lg font-semibold hover:bg-space-dark transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Space;
