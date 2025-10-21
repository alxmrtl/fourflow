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
    <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
      {/* Single Row Layout */}
      <div className="flex items-center gap-3">
        {/* Label */}
        <div className="text-sm font-bold text-spirit whitespace-nowrap w-20 flex-shrink-0">
          VISION
        </div>

        {/* Vision Statement - Editable */}
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
            className="flex-1 text-sm text-gray-700 border-b-2 border-spirit focus:outline-none bg-transparent"
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="flex-1 text-sm text-gray-700 cursor-text hover:bg-gray-50 rounded px-2 py-1 -mx-2 min-h-[28px]"
          >
            {vision || <span className="text-gray-400">Tap to set your vision...</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlignVision;
