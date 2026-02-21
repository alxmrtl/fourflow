import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const SetupModal = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useStore();
  const [showSaved, setShowSaved] = useState(false);

  const [localSettings, setLocalSettings] = useState({
    backgroundSound: settings.backgroundSound || 'silence',
    breathworkBefore: settings.breathworkBefore || false,
    breathworkAfter: settings.breathworkAfter || false,
  });

  useEffect(() => {
    setLocalSettings({
      backgroundSound: settings.backgroundSound || 'silence',
      breathworkBefore: settings.breathworkBefore || false,
      breathworkAfter: settings.breathworkAfter || false,
    });
  }, [settings]);

  const handleChange = async (field, value) => {
    const newSettings = { ...localSettings, [field]: value };
    setLocalSettings(newSettings);

    // Auto-save
    await updateSettings({ [field]: value });

    // Show saved animation
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1500);
  };

  if (!isOpen) return null;

  const soundOptions = [
    { value: 'silence', label: 'Silence', emoji: '🔇' },
    { value: 'whitenoise', label: 'White Noise', emoji: '🔊' },
    { value: 'binaural', label: 'Binaural Beats', emoji: '🎧' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="/OPTIMIZED TOOLS.png"
              alt="Setup"
              className="w-8 h-8 object-contain"
            />
            <h2 className="text-lg font-semibold text-gray-800">Setup</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Background Sound */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Background Sound
            </label>
            <div className="space-y-2">
              {soundOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('backgroundSound', option.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                    localSettings.backgroundSound === option.value
                      ? 'border-space bg-space/10'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium text-gray-800">{option.label}</span>
                  {localSettings.backgroundSound === option.value && (
                    <span className="ml-auto text-space">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Breathwork */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Breathwork
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.breathworkBefore}
                  onChange={(e) => handleChange('breathworkBefore', e.target.checked)}
                  className="w-5 h-5 text-space border-gray-300 rounded focus:ring-space"
                />
                <span className="text-gray-800">Before session</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.breathworkAfter}
                  onChange={(e) => handleChange('breathworkAfter', e.target.checked)}
                  className="w-5 h-5 text-space border-gray-300 rounded focus:ring-space"
                />
                <span className="text-gray-800">After session</span>
              </label>
            </div>
          </div>

          {/* Saved Indicator */}
          {showSaved && (
            <div className="flex items-center justify-center gap-2 text-green-600 animate-fade-in">
              <span className="text-lg">✓</span>
              <span className="text-sm font-medium">Saved</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
