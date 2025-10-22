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
      className="overflow-hidden transition-all duration-300 ease-in-out -mx-6"
      style={{
        background: isEditing
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(74, 222, 128, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(74, 222, 128, 0.05) 100%)',
      }}
    >
      {/* Header with Logo and Title */}
      <div className="px-6 py-2 flex items-center gap-2">
        <img
          src="/OPTIMIZED TOOLS.png"
          alt="Setup"
          className="w-6 h-6 object-contain flex-shrink-0"
        />
        <h2 className="text-xs font-semibold tracking-wide text-space uppercase">Setup</h2>
        <button
          onClick={isEditing ? undefined : handleEdit}
          disabled={isEditing}
          className="ml-auto text-[10px] px-2 py-1 rounded bg-white/60 border border-space/30 hover:bg-white text-space font-medium transition-all"
        >
          {isEditing ? 'Editing...' : 'Settings'}
        </button>
      </div>

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
