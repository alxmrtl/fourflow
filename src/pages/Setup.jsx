import React from 'react';
import { useStore } from '../store/useStore';
import SetupNav from '../components/SetupNav';
import SetupOverview from './SetupOverview';
import SetupSpirit from './SetupSpirit';
import SetupStory from './SetupStory';
import SetupSpace from './SetupSpace';
import SetupSelf from './SetupSelf';

const Setup = () => {
  const { currentSetupSection } = useStore();

  const renderSection = () => {
    switch (currentSetupSection) {
      case 'overview':
        return <SetupOverview />;
      case 'spirit':
        return <SetupSpirit />;
      case 'story':
        return <SetupStory />;
      case 'space':
        return <SetupSpace />;
      case 'self':
        return <SetupSelf />;
      default:
        return <SetupOverview />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 md:pb-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">SETUP</h1>
        <p className="text-sm text-gray-600">Build your foundation for flow</p>
      </div>

      {/* Setup Navigation */}
      <SetupNav />

      {/* Content */}
      <div>
        {renderSection()}
      </div>
    </div>
  );
};

export default Setup;
