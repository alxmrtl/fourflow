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
    <div className="h-[calc(100vh-8rem)] overflow-hidden pb-20 md:pb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">SETUP</h1>
          <p className="text-sm text-gray-600">Build your foundation for flow</p>
        </div>

        {/* Setup Navigation */}
        <SetupNav />

        {/* Content */}
        <div className="flex-1 overflow-y-auto mt-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Setup;
