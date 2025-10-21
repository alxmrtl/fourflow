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

const AlignVision = () => {
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
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-spirit">VISION - Your North Star</h2>
        <p className="text-sm text-gray-600">Define your core values and vision</p>
      </div>

      {/* Values Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-spirit">Core Values</h3>
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
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-spirit">Vision Statement</h3>
        <textarea
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          placeholder="Your future vision..."
          className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-spirit focus:outline-none min-h-20 resize-none"
        />
      </div>

      {/* Narrative Thread */}
      {selectedValues.length > 0 && (
        <div className="bg-spirit/10 rounded-lg p-3">
          <p className="text-xs text-gray-700">
            <span className="font-semibold text-spirit">{selectedValues.join(', ')}</span>
          </p>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-spirit text-white py-2 rounded-lg text-sm font-semibold hover:bg-spirit-dark transition-colors"
      >
        Save Vision
      </button>

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1">Your vision guides:</p>
        <p>• Which goals you set (GOALS)</p>
        <p>• Which actions you prioritize (ACTIONS)</p>
        <p>• Your alignment and sense of purpose</p>
      </div>
    </div>
  );
};

export default AlignVision;
