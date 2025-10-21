import React from 'react';
import AlignVision from './AlignVision';
import AlignGoals from './AlignGoals';
import AlignSetup from './AlignSetup';
import AlignActions from './AlignActions';

const Flow = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 pb-24 md:pb-6 space-y-3">
      {/* Compact unified layout */}
      <AlignVision />
      <AlignGoals />
      <AlignSetup />
      <AlignActions />
    </div>
  );
};

export default Flow;
