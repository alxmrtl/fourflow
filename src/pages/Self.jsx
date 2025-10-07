import React from 'react';
import { useStore } from '../store/useStore';
import SelfNav from '../components/SelfNav';
import SelfPlan from './SelfPlan';
import SelfFocus from './SelfFocus';
import SelfReview from './SelfReview';

const Self = () => {
  const { currentSelfView, isInFocusMode } = useStore();

  // In focus mode, only show focus component
  if (isInFocusMode) {
    return <SelfFocus />;
  }

  return (
    <div className="pb-20 md:pb-6">
      {/* Compact Self Navigation - no logo duplication */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40 py-2">
        <div className="max-w-4xl mx-auto px-4">
          <SelfNav />
        </div>
      </div>

      {/* Content */}
      <div>
        {currentSelfView === 'plan' && <SelfPlan />}
        {currentSelfView === 'focus' && <SelfFocus />}
        {currentSelfView === 'review' && <SelfReview />}
      </div>
    </div>
  );
};

export default Self;
