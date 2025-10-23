import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { BREATHWORK_PATTERNS } from '../utils/breathworkPatterns';

const SetupBar = () => {
  const { settings, updateSettings } = useStore();
  const [showSoundDropdown, setShowSoundDropdown] = useState(false);
  const [showBreathworkDropdown, setShowBreathworkDropdown] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(null);

  const soundRef = useRef(null);
  const breathworkRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (soundRef.current && !soundRef.current.contains(event.target)) {
        setShowSoundDropdown(false);
      }
      if (breathworkRef.current && !breathworkRef.current.contains(event.target)) {
        setShowBreathworkDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sound options
  const SOUND_OPTIONS = [
    { value: 'none', label: 'None', emoji: '' },
    { value: 'white-noise', label: 'White Noise', emoji: '🌫️' },
    { value: 'forest', label: 'Forest', emoji: '🏞️' },
    { value: 'waves', label: 'Waves', emoji: '🌊' },
    { value: 'rain', label: 'Rain', emoji: '🌧️' },
    { value: 'binaural', label: 'Binaural Beats', emoji: '🎧' },
  ];

  // Breathwork options - Before
  const BREATHWORK_BEFORE = [
    { value: 'box-breathing', label: 'Box Breathing', pattern: BREATHWORK_PATTERNS.BOX_BREATHING },
    { value: 'energizing-breath', label: 'Energizing Breath', pattern: BREATHWORK_PATTERNS.ENERGIZING_BREATH },
    { value: 'power-breath', label: 'Power Breath', pattern: BREATHWORK_PATTERNS.POWER_BREATH },
  ];

  // Breathwork options - After
  const BREATHWORK_AFTER = [
    { value: 'relaxation-478', label: '4-7-8 Relaxation', pattern: BREATHWORK_PATTERNS.RELAXATION_478 },
    { value: 'coherent-breathing', label: 'Coherent Breathing', pattern: BREATHWORK_PATTERNS.COHERENT_BREATHING },
    { value: 'grounding-breath', label: 'Grounding Breath', pattern: BREATHWORK_PATTERNS.GROUNDING_BREATH },
  ];

  // Get background sound text and emoji
  const getSoundText = () => {
    const option = SOUND_OPTIONS.find(opt => opt.value === settings.backgroundSound);
    return option ? option.label : 'None';
  };

  const getSoundEmoji = () => {
    const option = SOUND_OPTIONS.find(opt => opt.value === settings.backgroundSound);
    return option?.emoji || '';
  };

  // Get breathwork text - simplified to ON/OFF
  const getBreathworkText = () => {
    const { breathworkBefore, breathworkAfter } = settings;

    // Check if ANY breathwork is enabled
    const isEnabled = (breathworkBefore && breathworkBefore !== 'none') ||
                      (breathworkAfter && breathworkAfter !== 'none');

    return isEnabled ? 'ON' : 'OFF';
  };

  const handleSoundSelect = async (value) => {
    await updateSettings({ backgroundSound: value });
    setSaveAnimation('sound');
    setTimeout(() => {
      setShowSoundDropdown(false);
      setSaveAnimation(null);
    }, 600);
  };

  const handleBreathworkToggle = async (timing, value) => {
    if (timing === 'before') {
      // Toggle: if already selected, set to 'none', otherwise set to the value
      const newValue = settings.breathworkBefore === value ? 'none' : value;
      await updateSettings({ breathworkBefore: newValue });
    } else {
      const newValue = settings.breathworkAfter === value ? 'none' : value;
      await updateSettings({ breathworkAfter: newValue });
    }
    setSaveAnimation('breathwork');
    setTimeout(() => {
      setSaveAnimation(null);
    }, 600);
  };

  const soundText = getSoundText();
  const soundEmoji = getSoundEmoji();
  const breathworkText = getBreathworkText();

  return (
    <>
      <div
        className="overflow-visible shadow-md"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.10) 50%, rgba(21, 128, 61, 0.08) 100%)',
        }}
      >
        {/* Header with Logo and Title */}
        <div className="px-6 py-2.5 flex items-center gap-3">
          <img
            src="/OPTIMIZED TOOLS.png"
            alt="Setup"
            className="w-6 h-6 object-contain flex-shrink-0"
          />
          <h2 className="text-xs font-semibold tracking-wide text-space uppercase flex-shrink-0">Setup</h2>

          {/* Configuration Display */}
          <div className="flex items-center gap-2 relative">
            {/* Sound Pill - Clickable */}
            <div ref={soundRef} className="relative">
              <button
                onClick={() => {
                  setShowSoundDropdown(!showSoundDropdown);
                  setShowBreathworkDropdown(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-lg border transition-all ${
                  showSoundDropdown || saveAnimation === 'sound'
                    ? 'border-space bg-white shadow-md scale-105'
                    : 'border-space/30 hover:border-space/50 hover:bg-white/80'
                }`}
              >
                <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Sound</span>
                {soundEmoji && <span className="text-sm">{soundEmoji}</span>}
              </button>

              {/* Sound Dropdown */}
              {showSoundDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border-2 border-space/20 py-2 min-w-[160px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <p className="text-[10px] font-semibold text-space uppercase tracking-wide">Select Sound</p>
                  </div>
                  <div className="py-1">
                    {SOUND_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSoundSelect(option.value)}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                          settings.backgroundSound === option.value
                            ? 'bg-space/10 text-space font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                        {settings.backgroundSound === option.value && (
                          <span className="ml-2">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="px-3 py-2 border-t border-gray-100">
                    <button
                      onClick={() => setShowSoundDropdown(false)}
                      className="w-full text-[10px] text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Breathwork Pill - Clickable */}
            <div ref={breathworkRef} className="relative">
              <button
                onClick={() => {
                  setShowBreathworkDropdown(!showBreathworkDropdown);
                  setShowSoundDropdown(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-lg border transition-all ${
                  showBreathworkDropdown || saveAnimation === 'breathwork'
                    ? 'border-space bg-white shadow-md scale-105'
                    : 'border-space/30 hover:border-space/50 hover:bg-white/80'
                }`}
              >
                <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Breathwork</span>
                <span className="text-[9px] text-gray-700">{breathworkText}</span>
              </button>

              {/* Breathwork Dropdown */}
              {showBreathworkDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border-2 border-space/20 py-2 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Before Section */}
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <p className="text-[10px] font-semibold text-space uppercase tracking-wide">Before Flow</p>
                  </div>
                  <div className="py-1">
                    {BREATHWORK_BEFORE.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleBreathworkToggle('before', option.value)}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                          settings.breathworkBefore === option.value
                            ? 'bg-space/10 text-space font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{option.pattern.benefit}</span>
                        {settings.breathworkBefore === option.value && (
                          <span className="text-space">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* After Section */}
                  <div className="px-3 py-1.5 border-b border-t border-gray-100 mt-1">
                    <p className="text-[10px] font-semibold text-space uppercase tracking-wide">After Flow</p>
                  </div>
                  <div className="py-1">
                    {BREATHWORK_AFTER.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleBreathworkToggle('after', option.value)}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                          settings.breathworkAfter === option.value
                            ? 'bg-space/10 text-space font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{option.pattern.benefit}</span>
                        {settings.breathworkAfter === option.value && (
                          <span className="text-space">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="px-3 py-2 border-t border-gray-100">
                    <button
                      onClick={() => setShowBreathworkDropdown(false)}
                      className="w-full text-[10px] text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupBar;
