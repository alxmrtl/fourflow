import React, { useState } from 'react';

// Emojis organized by Four Pillars
const EMOJI_CATEGORIES = {
  ALL: {
    label: 'All',
    color: 'gray-600',
    emojis: []
  },
  SPIRIT: {
    label: 'Spirit',
    color: 'purple-600',
    emojis: ['🧠', '💡', '🎯', '⭐', '🌟', '✨', '💫', '🧘', '🦋', '🌈', '☀️', '🔥', '⚡']
  },
  STORY: {
    label: 'Story',
    color: 'blue-600',
    emojis: ['🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🚀', '📈', '💪', '💥', '🎆', '🎓', '💎']
  },
  SPACE: {
    label: 'Space',
    color: 'green-600',
    emojis: ['💼', '💻', '⚙️', '🛠️', '🏗️', '📊', '📚', '📖', '✏️', '📝', '🔬', '🔭', '📅', '🗓️', '⏰', '⏳', '🔔']
  },
  SELF: {
    label: 'Self',
    color: 'orange-600',
    emojis: ['❤️', '💚', '🧡', '💙', '💜', '🏃', '🏋️', '🚴', '🏊', '⚽', '🏀', '🎾', '🥊', '🤸', '🎨', '🎭', '🎬', '🎤', '🎸', '🎹', '📷', '✍️', '🖌️', '🎪', '🌱', '🌿', '🌳', '🌸', '🌍']
  }
};

// Populate ALL with all emojis
EMOJI_CATEGORIES.ALL.emojis = [
  ...EMOJI_CATEGORIES.SPIRIT.emojis,
  ...EMOJI_CATEGORIES.STORY.emojis,
  ...EMOJI_CATEGORIES.SPACE.emojis,
  ...EMOJI_CATEGORIES.SELF.emojis
];

const EmojiPickerModal = ({ isOpen, onClose, onSelect, currentEmoji }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

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
            {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${selectedCategory === key
                    ? `bg-${category.color} text-white shadow-md`
                    : `bg-gray-100 text-gray-600 hover:bg-gray-200`
                  }
                `}
                style={selectedCategory === key ? {
                  backgroundColor: key === 'ALL' ? '#4b5563' :
                    key === 'SPIRIT' ? '#7c3aed' :
                    key === 'STORY' ? '#2563eb' :
                    key === 'SPACE' ? '#16a34a' :
                    '#ea580c'
                } : {}}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Emoji Grid */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-8 gap-2">
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
