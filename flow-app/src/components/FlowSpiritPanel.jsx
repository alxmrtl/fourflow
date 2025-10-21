import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const FlowSpiritPanel = () => {
  const { profile, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedVision, setEditedVision] = useState('');

  const hasVision = profile?.vision && profile.vision.trim().length > 0;

  const handleEdit = () => {
    setEditedVision(profile?.vision || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfile({ vision: editedVision });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedVision('');
    setIsEditing(false);
  };

  return (
    <div
      className={`border-3 rounded-lg overflow-hidden transition-all duration-300 ease-in-out border-spirit ${
        isEditing ? 'shadow-lg shadow-spirit/20' : ''
      }`}
      style={{
        maxHeight: isEditing ? '300px' : 'none',
        borderWidth: '3px',
      }}
    >
      {/* Header with Logo and Title */}
      <div className="px-3 py-2 flex items-center gap-3 bg-spirit/5">
        <img
          src="/VISUALIZED VISION.png"
          alt="Vision"
          className="w-8 h-8 object-contain flex-shrink-0"
        />
        <h2 className="text-sm font-semibold text-spirit">VISION</h2>
      </div>

      {/* Content */}
      <button
        onClick={isEditing ? undefined : handleEdit}
        disabled={isEditing}
        className="w-full text-left hover:bg-spirit/5 transition-colors bg-white px-3 py-2"
      >
        <div className="flex-1 min-w-0">
          {hasVision ? (
            <p className="text-sm text-gray-700 leading-snug">
              {profile.vision}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">Set your vision statement</p>
          )}
        </div>
      </button>

      {/* Expandable Edit Section */}
      {isEditing && (
        <div className="px-3 pb-3 space-y-2 border-t border-spirit/20 pt-3 bg-white transition-opacity duration-300 ease-in-out opacity-100">
          <textarea
            value={editedVision}
            onChange={(e) => setEditedVision(e.target.value)}
            placeholder="Your vision statement..."
            className="w-full p-2 text-sm border-2 border-spirit/30 rounded-lg focus:border-spirit focus:outline-none min-h-24 resize-none"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-spirit text-white py-2 rounded-lg text-sm font-semibold hover:bg-spirit/90 transition-colors"
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

export default FlowSpiritPanel;
