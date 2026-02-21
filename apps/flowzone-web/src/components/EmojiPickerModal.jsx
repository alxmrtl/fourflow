import React, { useState } from 'react';

// Emojis organized by Four Pillars - 24 emojis each (6x4 grid)
const EMOJI_CATEGORIES = {
  SPIRIT: {
    label: 'Spirit',
    color: '#7A4DA4',
    emojis: [
      '🧠', '💡', '🎯', '⭐', '🌟', '✨',
      '💫', '🧘', '🦋', '🌈', '☀️', '🔥',
      '⚡', '🌙', '✝️', '☮️', '🕉️', '☯️',
      '🙏', '🔮', '💭', '🌌', '🪬', '🕊️'
    ]
  },
  STORY: {
    label: 'Story',
    color: '#5B84B1',
    emojis: [
      '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️',
      '🚀', '📈', '💪', '💥', '🎆', '🎓',
      '💎', '👑', '🗝️', '📜', '🎯', '🏁',
      '⚔️', '🛡️', '🎪', '🎭', '📚', '✍️'
    ]
  },
  SPACE: {
    label: 'Space',
    color: '#6BA292',
    emojis: [
      '💼', '💻', '⚙️', '🛠️', '🏗️', '📊',
      '📚', '📖', '✏️', '📝', '🔬', '🔭',
      '📅', '🗓️', '⏰', '⏳', '🔔', '📌',
      '📍', '🗂️', '📋', '🖥️', '⌨️', '🖱️'
    ]
  },
  SELF: {
    label: 'Self',
    color: '#FF6F61',
    emojis: [
      '❤️', '💚', '🧡', '💙', '💜', '🏃',
      '🏋️', '🚴', '🏊', '⚽', '🏀', '🎾',
      '🥊', '🤸', '🎨', '🎭', '🎬', '🎤',
      '🎸', '🎹', '📷', '🌱', '🌿', '🌸'
    ]
  }
};

const EmojiPickerModal = ({ isOpen, onClose, onSelect, currentEmoji }) => {
  const [selectedCategory, setSelectedCategory] = useState('SPIRIT');

  if (!isOpen) return null;

  const currentCategoryEmojis = EMOJI_CATEGORIES[selectedCategory].emojis;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Choose Emoji</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors group"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex gap-2 mt-4">
            {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => {
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={
                    isSelected
                      ? {
                          backgroundColor: category.color,
                          color: 'white',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          border: 'none'
                        }
                      : {
                          backgroundColor: '#F5F5F5',
                          color: '#6B7280',
                          border: `2px solid ${category.color}`,
                          boxShadow: 'none'
                        }
                  }
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Emoji Grid - 6x4 */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-6 gap-2">
            {currentCategoryEmojis.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelect(emoji);
                  onClose();
                }}
                className={`
                  text-3xl p-3 rounded-lg transition-all hover:scale-110
                  ${emoji === currentEmoji
                    ? 'bg-blue-100 ring-2 ring-blue-500'
                    : 'hover:bg-gray-100'
                  }
                `}
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiPickerModal;
