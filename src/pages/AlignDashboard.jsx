import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const AlignDashboard = () => {
  const { getAlignmentStatus, setCurrentAlignSection } = useStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const alignmentStatus = getAlignmentStatus();

  const sectionMap = {
    vision: 'vision',
    goals: 'goals',
    setup: 'setup',
    actions: 'actions',
  };

  const handleItemClick = (key) => {
    if (!alignmentStatus[key]) {
      setCurrentAlignSection(sectionMap[key]);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${alignmentStatus.isAligned ? 'bg-green-500' : 'bg-orange-500'}`} />
          <h3 className="font-semibold text-gray-900">
            {alignmentStatus.isAligned ? 'ALIGNED' : 'NEEDS ATTENTION'}
          </h3>
        </div>
        <span className="text-gray-500 text-sm">{isExpanded ? '▲' : '▼'}</span>
      </button>

      {/* Checklist */}
      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-200 space-y-2">
          {alignmentStatus.items.map((item) => (
            <button
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left ${
                !item.complete ? 'hover:bg-orange-50 cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs ${
                item.complete
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {item.complete ? '✓' : '○'}
              </div>
              <span className={`text-sm ${item.complete ? 'text-gray-700' : 'text-orange-600 font-medium'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlignDashboard;
