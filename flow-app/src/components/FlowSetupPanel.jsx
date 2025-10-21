import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const FlowSetupPanel = () => {
  const { settings, updateSettings } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState({ ...settings });

  const handleEdit = () => {
    setEditedSettings({ ...settings });
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateSettings(editedSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSettings({ ...settings });
    setIsEditing(false);
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
      className={`border border-space/20 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isEditing ? 'border-space/60' : ''
      }`}
      style={{
        maxHeight: isEditing ? '400px' : '60px',
      }}
    >
      <button
        onClick={isEditing ? undefined : handleEdit}
        disabled={isEditing}
        className="w-full text-left hover:bg-space/5 transition-colors"
      >
        <div className="flex items-stretch">
          {/* Left Label Box */}
          <div className="bg-space text-white px-3 py-2 flex items-center justify-center min-w-[80px]">
            <p className="text-xs font-bold tracking-tight">SETUP</p>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 px-3 py-2 flex items-center justify-between gap-2 bg-space/5">
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {/* Sound Pill */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-space text-white text-xs font-semibold rounded-full">
                <span>🔊</span>
                <span>{getSoundLabel(settings.sound)}</span>
              </span>

              {/* Breathwork Pill */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-space text-white text-xs font-semibold rounded-full">
                <span>🫁</span>
                <span>{settings.breathworkBefore ? 'Breathwork' : 'No Breathwork'}</span>
              </span>
            </div>

            {/* Edit Icon */}
            {!isEditing && (
              <div className="flex-shrink-0 text-space/40 text-sm">
                ✏️
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Expandable Edit Section */}
      {isEditing && (
        <div className="px-3 pb-3 space-y-3 border-t border-space/20 pt-3 bg-white transition-opacity duration-300 ease-in-out opacity-100">
          {/* Sound Selection */}
          <div>
            <label className="text-xs text-gray-600 block mb-2">Background Sound</label>
            <div className="grid grid-cols-3 gap-2">
              {SOUND_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setEditedSettings({ ...editedSettings, sound: option.value })}
                  className={`
                    p-2 rounded-lg border-2 transition-all text-xs font-medium
                    ${editedSettings.sound === option.value
                      ? 'border-space bg-space text-white'
                      : 'border-gray-200 hover:border-space/50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base">{option.icon}</span>
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          {editedSettings.sound !== 'silence' && (
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                Volume: {Math.round(editedSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={editedSettings.volume}
                onChange={(e) => setEditedSettings({ ...editedSettings, volume: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-space"
              />
            </div>
          )}

          {/* Breathwork Settings */}
          <div>
            <label className="text-xs text-gray-600 block mb-2">Breathwork</label>
            <label className="flex items-center gap-2 p-2 border-2 border-gray-200 rounded-lg cursor-pointer text-xs hover:border-space/50 transition-colors">
              <input
                type="checkbox"
                checked={editedSettings.breathworkBefore}
                onChange={(e) => setEditedSettings({ ...editedSettings, breathworkBefore: e.target.checked })}
                className="w-4 h-4 accent-space"
              />
              <span>Enable breathwork before flow sessions</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-space text-white py-2 rounded-lg text-sm font-semibold hover:bg-space/90 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowSetupPanel;
