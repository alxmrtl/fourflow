import React from 'react';
import { useStore } from '../store/useStore';

const SetupOverview = () => {
  const { setCurrentSetupSection, getSetupCompletion } = useStore();
  const completion = getSetupCompletion();

  const pillars = [
    {
      id: 'spirit',
      name: 'SPIRIT',
      description: 'Define your core values and vision',
      color: 'spirit',
      complete: completion.spirit,
    },
    {
      id: 'story',
      name: 'STORY',
      description: 'Set meaningful goals aligned with your values',
      color: 'story',
      complete: completion.story,
    },
    {
      id: 'space',
      name: 'SPACE',
      description: 'Design your ideal focus environment',
      color: 'space',
      complete: completion.space,
    },
    {
      id: 'self',
      name: 'SELF',
      description: 'Organize and manage your tasks',
      color: 'self',
      complete: true, // Always accessible
    },
  ];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-gradient-to-br from-self/10 to-self/5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Foundation</h2>
        <p className="text-sm text-gray-600 mb-4">
          Complete these three pillars to build a strong base for flow state
        </p>

        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-self h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completion.total / 3) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {completion.total}/3
          </span>
        </div>

        {completion.total === 3 && (
          <p className="text-sm text-self font-semibold mt-3">
            ✓ Foundation complete! You're ready to flow.
          </p>
        )}
      </div>

      {/* Four Pillars */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">The Four Pillars</h3>

        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setCurrentSetupSection(pillar.id)}
            className={`w-full bg-${pillar.color}/10 border-2 border-${pillar.color}/30 hover:border-${pillar.color} rounded-lg p-4 text-left transition-all`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold text-${pillar.color}`}>
                    {pillar.name}
                  </h4>
                  {pillar.complete && pillar.id !== 'self' && (
                    <span className="text-xs text-green-600">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{pillar.description}</p>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </button>
        ))}
      </div>

      {/* Why This Matters */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Why This Matters</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          These four pillars work together to create the conditions for flow state.
          <strong> SPIRIT</strong> gives you purpose,
          <strong> STORY</strong> gives you direction,
          <strong> SPACE</strong> optimizes your environment, and
          <strong> SELF</strong> organizes your execution.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          You don't need to complete everything at once. Start where you are, and build over time.
        </p>
      </div>

      {/* Quick Start */}
      {completion.total === 0 && (
        <div className="bg-self/5 border-2 border-self/20 rounded-lg p-4">
          <h3 className="text-base font-semibold text-self mb-2">Quick Start</h3>
          <p className="text-sm text-gray-700 mb-3">
            New to FlowSpace? Start with SPIRIT to define your values, then move through
            STORY and SPACE to complete your foundation.
          </p>
          <button
            onClick={() => setCurrentSetupSection('spirit')}
            className="bg-self text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Start with SPIRIT →
          </button>
        </div>
      )}
    </div>
  );
};

export default SetupOverview;
