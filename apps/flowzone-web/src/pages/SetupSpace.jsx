import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import BreathworkEngine from '../components/BreathworkEngine';
import { BREATHWORK_PATTERNS } from '../utils/breathworkPatterns';

const SetupSpace = () => {
  const { settings, loadSettings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showBreathwork, setShowBreathwork] = useState(false);
  const [activeBreathwork, setActiveBreathwork] = useState(null);

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
    { value: 'none', label: 'None' },
    { value: 'white-noise', label: 'White Noise' },
    { value: 'forest', label: 'Forest' },
    { value: 'waves', label: 'Waves' },
    { value: 'rain', label: 'Rain' },
    { value: 'binaural', label: 'Binaural' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-space">SPACE - Design Your Environment</h2>
        <p className="text-sm text-gray-600">Optimize your focus environment</p>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Session Settings */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-3 space-y-3">
          <h3 className="text-base font-semibold text-space">Session</h3>

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
          <h3 className="text-base font-semibold text-space">Environment</h3>

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
          {localSettings.sound !== 'none' && (
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

            <button
              onClick={() => setShowBreathwork(true)}
              className="w-full bg-space/10 text-space border-2 border-space/30 hover:border-space py-2 rounded-lg text-xs font-semibold transition-all"
            >
              Try Breathwork Practice →
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-space text-white py-2 rounded-lg text-sm font-semibold hover:bg-space-dark transition-colors"
      >
        Save Settings
      </button>

      {/* Breathwork Selection Modal */}
      {showBreathwork && !activeBreathwork && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-space">Try Breathwork</h3>
                <p className="text-sm text-gray-600">Choose a guided breathing exercise</p>
              </div>
              <button
                onClick={() => setShowBreathwork(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {/* Pre-Flow */}
              <button
                onClick={() => setActiveBreathwork(BREATHWORK_PATTERNS.PRE_FLOW)}
                className="w-full bg-gradient-to-br from-self/20 to-space/20 hover:from-self/30 hover:to-space/30 border-2 border-self/30 rounded-xl p-4 text-left space-y-1 transition-all"
              >
                <h4 className="font-semibold text-gray-800">{BREATHWORK_PATTERNS.PRE_FLOW.name}</h4>
                <p className="text-xs text-gray-600">{BREATHWORK_PATTERNS.PRE_FLOW.description}</p>
                <div className="text-xs text-gray-500">
                  {BREATHWORK_PATTERNS.PRE_FLOW.cycles} cycles • Activation
                </div>
              </button>

              {/* Post-Flow */}
              <button
                onClick={() => setActiveBreathwork(BREATHWORK_PATTERNS.POST_FLOW)}
                className="w-full bg-gradient-to-br from-space/20 to-story/20 hover:from-space/30 hover:to-story/30 border-2 border-space/30 rounded-xl p-4 text-left space-y-1 transition-all"
              >
                <h4 className="font-semibold text-gray-800">{BREATHWORK_PATTERNS.POST_FLOW.name}</h4>
                <p className="text-xs text-gray-600">{BREATHWORK_PATTERNS.POST_FLOW.description}</p>
                <div className="text-xs text-gray-500">
                  {BREATHWORK_PATTERNS.POST_FLOW.cycles} cycles • Recovery
                </div>
              </button>

              {/* Four Layer */}
              <button
                onClick={() => setActiveBreathwork(BREATHWORK_PATTERNS.FOUR_LAYER)}
                className="w-full bg-gradient-to-br from-story/20 to-spirit/20 hover:from-story/30 hover:to-spirit/30 border-2 border-spirit/30 rounded-xl p-4 text-left space-y-1 transition-all"
              >
                <h4 className="font-semibold text-gray-800">{BREATHWORK_PATTERNS.FOUR_LAYER.name}</h4>
                <p className="text-xs text-gray-600">{BREATHWORK_PATTERNS.FOUR_LAYER.description}</p>
                <div className="text-xs text-gray-500">
                  {BREATHWORK_PATTERNS.FOUR_LAYER.cycles} cycles • Integration
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breathwork Practice - Full Screen */}
      {activeBreathwork && (
        <div className="fixed inset-0 bg-black z-50">
          <button
            onClick={() => {
              setActiveBreathwork(null);
              setShowBreathwork(false);
            }}
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white text-2xl w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>
          <BreathworkEngine
            pattern={activeBreathwork}
            onComplete={() => {
              setActiveBreathwork(null);
              setShowBreathwork(false);
            }}
            autoStart={false}
          />
        </div>
      )}
    </div>
  );
};

export default SetupSpace;
