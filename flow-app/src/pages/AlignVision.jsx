import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const AlignVision = () => {
  const { profile, updateProfile } = useStore();
  const [vision, setVision] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setVision(profile.vision || '');
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile({ vision });
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (vision.trim()) {
      handleSave();
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      {/* Single Row Layout */}
      <div className="flex items-center gap-3">
        {/* Colored Left Section */}
        <div className="bg-spirit text-white text-xs font-bold px-3 py-3 flex items-center justify-center whitespace-nowrap">
          VISION
        </div>

        {/* Vision Statement - Editable */}
        <div className="flex-1 py-3 pr-3">
          {isEditing ? (
            <input
              type="text"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') {
                  setVision(profile?.vision || '');
                  setIsEditing(false);
                }
              }}
              placeholder="Your vision statement..."
              autoFocus
              onFocus={(e) => e.target.scrollIntoView({ behavior: 'instant', block: 'nearest' })}
              className="w-full text-sm text-gray-700 border-b-2 border-spirit focus:outline-none bg-transparent"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="text-sm text-gray-700 cursor-text hover:bg-gray-50 rounded px-2 py-1 -mx-2 min-h-[28px]"
            >
              {vision || <span className="text-gray-400">Tap to set your vision...</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlignVision;
