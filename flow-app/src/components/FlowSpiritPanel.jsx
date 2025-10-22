import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const FlowSpiritPanel = () => {
  const { profile, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedVision, setEditedVision] = useState('');
  const textareaRef = useRef(null);

  const hasVision = profile?.vision && profile.vision.trim().length > 0;

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const handleEdit = () => {
    setEditedVision(profile?.vision || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfile({ vision: editedVision });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditedVision('');
      setIsEditing(false);
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  const handleBlur = () => {
    // Auto-save on blur
    if (editedVision !== profile?.vision) {
      handleSave();
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out relative group -mx-6"
      style={{
        background: isEditing
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%)',
      }}
    >
      {/* Header with Logo and Title */}
      <div className="px-6 py-2 flex items-center gap-2">
        <img
          src="/VISUALIZED VISION.png"
          alt="Vision"
          className="w-6 h-6 object-contain flex-shrink-0"
        />
        <h2 className="text-xs font-semibold tracking-wide text-spirit uppercase">
          Spirit
        </h2>
      </div>

      {/* Inline Editable Content */}
      <div className="px-6 pb-2 relative">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="w-full text-left group/vision transition-all duration-200"
          >
            <div className="flex-1 min-w-0 relative">
              {hasVision ? (
                <p className="text-xs leading-relaxed text-gray-700 italic">
                  {profile.vision}
                </p>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Click to set your vision statement...
                </p>
              )}
              {/* Subtle edit indicator on hover */}
              <div className="absolute -right-1 top-0 opacity-0 group-hover/vision:opacity-100 transition-opacity">
                <span className="text-xs text-spirit/50">✎</span>
              </div>
            </div>
          </button>
        ) : (
          <textarea
            ref={textareaRef}
            value={editedVision}
            onChange={(e) => setEditedVision(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Your aspirational vision for daily action..."
            className="w-full p-2 text-xs leading-relaxed border border-spirit/40 rounded focus:border-spirit focus:outline-none resize-none bg-white/80 italic text-gray-700 transition-all"
            rows={2}
            style={{
              minHeight: '3rem',
            }}
          />
        )}
      </div>

      {/* Helper text when editing */}
      {isEditing && (
        <div className="px-6 pb-2 text-[10px] text-spirit/60 flex justify-between items-center">
          <span className="italic">Your north star</span>
          <span>⌘+Enter • Esc</span>
        </div>
      )}
    </div>
  );
};

export default FlowSpiritPanel;
