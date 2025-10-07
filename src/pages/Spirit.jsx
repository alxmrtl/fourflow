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

  useEffect(() => {
    loadValues();
    if (profile) {
      setSelectedValues(profile.selectedValues || []);
      setVision(profile.vision || '');
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
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] overflow-hidden pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 h-full flex flex-col">
        {/* Compact Header */}
        <div className="text-center mb-3">
          <p className="text-xs text-gray-600">What drives you?</p>
        </div>

        {/* Values Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-spirit">Core Values</h2>
              <span className="text-xs text-gray-500">{selectedValues.length}/5</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CURATED_VALUES.map((value) => {
                const isSelected = selectedValues.includes(value.name);

                return (
                  <button
                    key={value.name}
                    onClick={() => toggleValue(value.name)}
                    disabled={!isSelected && selectedValues.length >= 5}
                    className={`
                      p-2 rounded-lg border-2 transition-all text-sm
                      ${isSelected
                        ? 'border-spirit bg-spirit text-white'
                        : 'border-gray-200 hover:border-spirit/50'
                      }
                      ${!isSelected && selectedValues.length >= 5 ? 'opacity-50' : ''}
                    `}
                  >
                    {value.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vision Section */}
          <div className="mt-3 space-y-1">
            <h2 className="text-base font-semibold text-spirit">Vision</h2>
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Your future vision..."
              className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-spirit focus:outline-none min-h-20 resize-none"
            />
          </div>

          {/* Narrative Thread */}
          {selectedValues.length > 0 && (
            <div className="mt-3 bg-spirit/10 rounded-lg p-3">
              <p className="text-xs text-gray-700">
                <span className="font-semibold text-spirit">{selectedValues.join(', ')}</span>
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-spirit text-white py-2 rounded-lg text-sm font-semibold hover:bg-spirit-dark transition-colors mt-3"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Spirit;
