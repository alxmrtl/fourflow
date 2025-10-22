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
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%)',
      }}
    >
      {/* Header with Logo, Title, and Vision Pill */}
      <div className="px-6 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src="/VISUALIZED VISION.png"
            alt="Vision"
            className="w-6 h-6 object-contain flex-shrink-0"
          />
          <h2 className="text-xs font-semibold tracking-wide text-spirit uppercase">
            Vision
          </h2>
        </div>

        {/* Vision Pill Container */}
        <div className="flex-1 min-w-0">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="w-full text-left group/vision transition-all duration-200"
            >
              <div className="px-3 py-1.5 rounded-full bg-spirit-dark hover:bg-spirit transition-all">
                {hasVision ? (
                  <p className="text-xs leading-relaxed text-white italic truncate">
                    {profile.vision}
                  </p>
                ) : (
                  <p className="text-xs text-white/70 italic">
                    Click to set your vision...
                  </p>
                )}
              </div>
            </button>
          ) : (
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={editedVision}
                onChange={(e) => setEditedVision(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Your aspirational vision for daily action..."
                className="w-full px-3 py-1.5 text-xs leading-relaxed border border-spirit rounded-full focus:border-spirit-dark focus:outline-none resize-none bg-white italic text-black transition-all"
                rows={1}
                style={{
                  minHeight: '2rem',
                }}
              />
              {/* Helper text when editing */}
              <div className="absolute -bottom-4 right-0 text-[10px] text-spirit/60">
                <span>⌘+Enter • Esc</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowSpiritPanel;
