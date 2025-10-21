import React from 'react';
import { useStore } from '../store/useStore';
import AlignNav from '../components/AlignNav';
import AlignActions from './AlignActions';
import AlignSetup from './AlignSetup';
import AlignGoals from './AlignGoals';
import AlignVision from './AlignVision';

const Align = () => {
  const { currentAlignSection } = useStore();

  const renderSection = () => {
    switch (currentAlignSection) {
      case 'actions':
        return <AlignActions />;
      case 'setup':
        return <AlignSetup />;
      case 'goals':
        return <AlignGoals />;
      case 'vision':
        return <AlignVision />;
      default:
        return <AlignActions />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 md:pb-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ALIGN</h1>
        <p className="text-sm text-gray-600">Configure your foundation for flow</p>
      </div>

      {/* Secondary Navigation */}
      <AlignNav />

      {/* Content */}
      <div>
        {renderSection()}
      </div>
    </div>
  );
};

export default Align;
