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
      // Auto-resize textarea
      adjustTextareaHeight();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [editedVision, isEditing]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

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

  const handleBlur = (e) => {
    // Don't blur if clicking the save button
    if (e.relatedTarget?.classList.contains('vision-save-btn')) {
      return;
    }
    // Auto-save on blur
    if (editedVision !== profile?.vision) {
      handleSave();
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out relative group -mx-6 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%)',
      }}
    >
      {/* Header with Logo, Title, and Vision Pill */}
      <div className="px-6 py-2.5 flex items-center gap-3">
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
              <div className="px-3 py-1.5 rounded-full bg-spirit-dark hover:bg-spirit transition-all min-h-[32px] flex items-center">
                {hasVision ? (
                  <p className="leading-tight text-white italic break-words" style={{ fontSize: '12px' }}>
                    {profile.vision}
                  </p>
                ) : (
                  <p className="leading-tight text-white/70 italic" style={{ fontSize: '12px' }}>
                    Click to set your vision...
                  </p>
                )}
              </div>
            </button>
          ) : (
            <div className="relative flex items-center gap-2">
              <textarea
                ref={textareaRef}
                value={editedVision}
                onChange={(e) => setEditedVision(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Your aspirational vision for daily action..."
                className="flex-1 px-3 py-1.5 leading-tight border border-spirit rounded-full focus:border-spirit-dark focus:outline-none resize-none bg-white italic text-black transition-all overflow-hidden"
                rows={1}
                style={{
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  minHeight: '32px',
                }}
              />
              <button
                onClick={handleSave}
                onMouseDown={(e) => e.preventDefault()}
                className="vision-save-btn flex-shrink-0 w-7 h-7 rounded-full bg-spirit hover:bg-spirit-dark transition-all flex items-center justify-center text-white"
                aria-label="Save vision"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </button>
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
