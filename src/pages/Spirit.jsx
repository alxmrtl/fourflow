import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const CURATED_VALUES = [
  { name: 'Focus', pair: 'Love', dream: 'Inner Peace' },
  { name: 'Love', pair: 'Focus', dream: 'Inner Peace' },
  { name: 'Generosity', pair: 'Freedom', dream: 'Dreams' },
  { name: 'Freedom', pair: 'Generosity', dream: 'Dreams' },
  { name: 'Presence', pair: 'Growth', dream: 'Wonder' },
  { name: 'Growth', pair: 'Presence', dream: 'Wonder' },
  { name: 'Creativity', pair: 'Service', dream: 'Impact' },
  { name: 'Service', pair: 'Creativity', dream: 'Impact' },
  { name: 'Courage', pair: 'Wisdom', dream: 'Mastery' },
  { name: 'Wisdom', pair: 'Courage', dream: 'Mastery' },
  { name: 'Joy', pair: 'Purpose', dream: 'Fulfillment' },
  { name: 'Purpose', pair: 'Joy', dream: 'Fulfillment' },
];

const Spirit = () => {
  const { profile, updateProfile, values, loadValues } = useStore();
  const [selectedValues, setSelectedValues] = useState([]);
  const [vision, setVision] = useState('');
  const [curiosities, setCuriosities] = useState('');

  useEffect(() => {
    loadValues();
    if (profile) {
      setSelectedValues(profile.selectedValues || []);
      setVision(profile.vision || '');
      setCuriosities(profile.curiosities || '');
    }
  }, [profile, loadValues]);

  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else if (selectedValues.length < 5) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSave = async () => {
    await updateProfile({
      selectedValues,
      vision,
      curiosities,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <img
            src="/logos/SPIRIT - Section Logo.png"
            alt="Spirit"
            className="h-24"
          />
        </div>
        <h1 className="text-4xl font-display font-bold text-spirit">SPIRIT</h1>
        <p className="text-lg text-gray-600">What drives you?</p>
      </div>

      {/* Values Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-spirit mb-2">Your Core Values</h2>
          <p className="text-gray-600 mb-4">Select 3-5 values that resonate with you</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CURATED_VALUES.map((value) => {
            const isSelected = selectedValues.includes(value.name);
            const pair = CURATED_VALUES.find(v => v.name === value.pair);

            return (
              <button
                key={value.name}
                onClick={() => toggleValue(value.name)}
                disabled={!isSelected && selectedValues.length >= 5}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300
                  ${isSelected
                    ? 'border-spirit bg-spirit text-white shadow-lg'
                    : 'border-gray-200 hover:border-spirit/50 hover:bg-spirit/5'
                  }
                  ${!isSelected && selectedValues.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className="font-semibold">{value.name}</div>
                {isSelected && pair && (
                  <div className="text-xs mt-1 opacity-90">
                    + {pair.name} → {value.dream}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 text-center">
          {selectedValues.length}/5 values selected
        </p>
      </div>

      {/* Vision Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-spirit mb-2">Your Vision</h2>
          <p className="text-gray-600 mb-4">What future are you working toward?</p>
        </div>

        <textarea
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          placeholder="Describe your vision for your future self..."
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-spirit focus:outline-none min-h-32 resize-none"
        />
      </div>

      {/* Curiosities Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-spirit mb-2">Ignited Curiosity</h2>
          <p className="text-gray-600 mb-4">What are you genuinely drawn to explore?</p>
        </div>

        <textarea
          value={curiosities}
          onChange={(e) => setCuriosities(e.target.value)}
          placeholder="List things you're curious about..."
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-spirit focus:outline-none min-h-24 resize-none"
        />
      </div>

      {/* Narrative Thread */}
      {selectedValues.length > 0 && (
        <div className="bg-spirit/10 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-semibold text-spirit">Your Narrative Thread</h3>
          <p className="text-gray-700">
            Your work today can express: <span className="font-semibold">{selectedValues.join(', ')}</span>
          </p>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-spirit text-white py-3 rounded-lg font-semibold hover:bg-spirit-dark transition-colors"
      >
        Save Your Spirit
      </button>
    </div>
  );
};

export default Spirit;
