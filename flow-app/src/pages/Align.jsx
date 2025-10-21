import React from 'react';
import AlignActions from './AlignActions';
import AlignSetup from './AlignSetup';
import AlignGoals from './AlignGoals';
import AlignVision from './AlignVision';

const Align = () => {
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

export default Align;
