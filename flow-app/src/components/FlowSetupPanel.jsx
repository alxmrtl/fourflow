import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import Modal from './Modal';

const FlowSetupPanel = () => {
  const { settings, updateSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editedSettings, setEditedSettings] = useState({ ...settings });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpen = () => {
    setEditedSettings({ ...settings });
    setIsOpen(true);
  };

  const handleClose = () => {
    setEditedSettings({ ...settings });
    setHasChanges(false);
    setIsOpen(false);
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

  const SOUND_OPTIONS = [
    { value: 'silence', label: 'Silence', icon: '🔇' },
    { value: 'white-noise', label: 'White Noise', icon: '🌊' },
    { value: 'rain', label: 'Rain', icon: '🌧️' },
    { value: 'cafe', label: 'Café', icon: '☕' },
    { value: 'binaural', label: 'Binaural', icon: '🎧' },
  ];

  return (
    <>
      {/* Setup Button */}
      <div
        className="px-6 py-2"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(74, 222, 128, 0.05) 100%)',
        }}
      >
        <button
          onClick={handleOpen}
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
        </button>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={{
          icon: '/OPTIMIZED TOOLS.png',
          text: 'Flow Setup'
        }}
      >
        <div className="space-y-5">
          {/* Sound Selection */}
          <div>
            <label className="text-sm text-gray-700 font-semibold block mb-2.5">Background Sound</label>
            <div className="grid grid-cols-3 gap-2">
              {SOUND_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSettingChange({ ...editedSettings, sound: option.value })}
                  className={`
                    p-3 rounded-xl border-2 transition-all text-xs font-medium
                    ${editedSettings.sound === option.value
                      ? 'border-space bg-space text-white shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-space/50 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-[11px]">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          {editedSettings.sound !== 'silence' && (
            <div>
              <label className="text-sm text-gray-700 font-semibold block mb-2">
                Volume: {Math.round(editedSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={editedSettings.volume}
                onChange={(e) => handleSettingChange({ ...editedSettings, volume: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-space"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Breathwork Settings */}
          <div>
            <label className="text-sm text-gray-700 font-semibold block mb-2.5">Breathwork</label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer text-sm hover:border-space/50 transition-all bg-white hover:shadow-md">
              <input
                type="checkbox"
                checked={editedSettings.breathworkBefore}
                onChange={(e) => handleSettingChange({ ...editedSettings, breathworkBefore: e.target.checked })}
                className="w-4 h-4 accent-space"
              />
              <span className="flex-1">Enable breathwork before flow sessions</span>
            </label>
          </div>

          {/* Save Status */}
          {isSaving && (
            <div className="text-center text-sm text-space font-medium">
              Saving changes...
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default FlowSetupPanel;
