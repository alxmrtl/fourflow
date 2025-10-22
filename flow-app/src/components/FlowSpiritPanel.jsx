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
      className="border-3 rounded-lg overflow-hidden transition-all duration-300 ease-in-out relative group"
      style={{
        borderWidth: '3px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)',
        borderColor: isEditing ? 'rgb(139, 92, 246)' : 'rgba(139, 92, 246, 0.4)',
        boxShadow: isEditing
          ? '0 0 20px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
          : '0 0 0 rgba(139, 92, 246, 0)',
      }}
    >
      {/* Header with Logo and Title */}
      <div className="px-3 py-2 flex items-center gap-3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-spirit/8 via-spirit/5 to-transparent"></div>
        <img
          src="/VISUALIZED VISION.png"
          alt="Vision"
          className="w-8 h-8 object-contain flex-shrink-0 relative z-10 drop-shadow-sm"
        />
        <h2 className="text-sm font-bold tracking-wider text-spirit relative z-10 flex items-center gap-2">
          VISION STATEMENT
          <span className="text-xs font-normal opacity-60">✦</span>
        </h2>
      </div>

      {/* Inline Editable Content */}
      <div className="px-3 py-3 bg-white/60 backdrop-blur-sm relative">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="w-full text-left group/vision transition-all duration-200 rounded-md px-2 py-1 -mx-2 -my-1 hover:bg-spirit/5"
          >
            <div className="flex-1 min-w-0 relative">
              {hasVision ? (
                <p className="text-sm leading-relaxed text-gray-800 font-medium italic tracking-wide">
                  {profile.vision}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">
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
            className="w-full p-2 text-sm leading-relaxed border-2 border-spirit/40 rounded-md focus:border-spirit focus:outline-none resize-none bg-white/80 font-medium italic tracking-wide text-gray-800 transition-all"
            rows={3}
            style={{
              minHeight: '4rem',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.1)',
            }}
          />
        )}
      </div>

      {/* Inspirational accent line */}
      <div
        className="h-1 bg-gradient-to-r from-transparent via-spirit/30 to-transparent transition-opacity duration-300"
        style={{
          opacity: isEditing ? 1 : 0.3,
        }}
      ></div>

      {/* Helper text when editing */}
      {isEditing && (
        <div className="px-3 py-1.5 text-xs text-spirit/60 bg-spirit/5 flex justify-between items-center">
          <span className="italic">Your north star guiding daily actions</span>
          <span>⌘+Enter to save • Esc to cancel</span>
        </div>
      )}
    </div>
  );
};

export default FlowSpiritPanel;
