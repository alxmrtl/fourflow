import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import Modal from './Modal';
import { backgroundAudio } from '../utils/backgroundAudio';

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
    // Stop any preview sounds when closing
    backgroundAudio.stop();
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

  const handleSoundPreview = (soundType) => {
    if (soundType === 'none') {
      backgroundAudio.stop();
    } else {
      // Play preview with quick fade in (0.5 seconds)
      backgroundAudio.play(soundType, 0.5, 0.5);
    }
  };

  const SOUND_OPTIONS = [
    { value: 'none', label: 'None', icon: '🔇' },
    { value: 'white-noise', label: 'White Noise', icon: '🌫️' },
    { value: 'binaural', label: 'Binaural Beats', icon: '🎧' },
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
            <p className="text-xs text-gray-500 mb-3">Click to select • Adjust volume using your system controls</p>
            <div className="grid grid-cols-3 gap-2">
              {SOUND_OPTIONS.map((option) => (
                <div key={option.value} className="relative">
                  <button
                    onClick={() => {
                      handleSettingChange({ ...editedSettings, sound: option.value, volume: 0.5 });
                      handleSoundPreview(option.value);
                    }}
                    className={`
                      w-full p-3 rounded-xl border-2 transition-all text-xs font-medium
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
                </div>
              ))}
            </div>
            {editedSettings.sound !== 'none' && (
              <button
                onClick={() => handleSoundPreview('none')}
                className="mt-3 w-full py-2 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Stop Preview
              </button>
            )}
          </div>

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
