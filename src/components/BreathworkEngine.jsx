import React, { useEffect, useRef } from 'react';
import { useBreathwork } from '../hooks/useBreathwork';
import { breathworkAudio } from '../utils/breathworkAudio';
import { getCurrentLayerLabel } from '../utils/breathworkPatterns';
import BreathworkAnimation from './BreathworkAnimation';

/**
 * BreathworkEngine Component
 * Orchestrates the complete breathwork experience with animation, audio, and UI
 */
const BreathworkEngine = ({ pattern, onComplete, autoStart = false }) => {
  const breathwork = useBreathwork(pattern);
  const audioInitialized = useRef(false);

  const {
    isActive,
    isComplete,
    currentCycle,
    currentPhase,
    timeInPhase,
    progress,
    overallProgress,
    color,
    start,
    pause,
    resume,
    stop,
    onPhaseStart,
    onComplete: onBreathworkComplete,
  } = breathwork;

  // Get current layer label for Four Layer breath
  const currentLayerLabel = currentPhase ? getCurrentLayerLabel(currentPhase, timeInPhase) : null;

  // Initialize audio on first user interaction
  useEffect(() => {
    if (!audioInitialized.current) {
      breathworkAudio.init();
      audioInitialized.current = true;
    }
  }, []);

  // Setup phase change audio
  useEffect(() => {
    onPhaseStart((phase) => {
      breathworkAudio.playPhase(phase);
    });
  }, [onPhaseStart]);

  // Setup completion callback
  useEffect(() => {
    onBreathworkComplete(() => {
      breathworkAudio.playComplete();
      if (onComplete) {
        setTimeout(() => onComplete(), 1000); // Brief delay for completion sound
      }
    });
  }, [onBreathworkComplete, onComplete]);

  // Auto-start if specified
  useEffect(() => {
    if (autoStart && !isActive && !isComplete) {
      start();
    }
  }, [autoStart, isActive, isComplete, start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      breathworkAudio.stopCurrent();
    };
  }, []);

  if (isComplete) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-8 text-white">
        <div className="text-center space-y-4">
          <div className="text-6xl">✓</div>
          <h2 className="text-3xl font-bold">Complete</h2>
          <p className="text-lg text-gray-300">{pattern.name}</p>
        </div>
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-8 text-white p-6">
      {/* Pattern Info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{pattern.name}</h2>
        <p className="text-sm text-gray-300">{pattern.description}</p>
        <p className="text-xs text-gray-400">
          Cycle {currentCycle + 1} of {pattern.cycles}
        </p>
      </div>

      {/* Animation Container */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <BreathworkAnimation phase={currentPhase} progress={progress} color={color} />

        {/* Phase Label Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold drop-shadow-lg">{currentPhase?.label}</p>
            {currentLayerLabel && (
              <p className="text-lg text-gray-200 drop-shadow-lg font-semibold">
                {currentLayerLabel}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="w-full max-w-md space-y-2">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/50 transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${overallProgress * 100}%` }}
          />
        </div>
        <p className="text-xs text-center text-gray-400">
          {Math.round(overallProgress * 100)}% Complete
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isActive && (
          <button
            onClick={start}
            className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Start
          </button>
        )}

        {isActive && (
          <>
            <button
              onClick={pause}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
            >
              Pause
            </button>
            <button
              onClick={stop}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-colors"
            >
              Stop
            </button>
          </>
        )}

        {!isActive && currentCycle > 0 && (
          <button
            onClick={resume}
            className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Resume
          </button>
        )}
      </div>

      {/* Instructions */}
      {!isActive && currentCycle === 0 && (
        <div className="max-w-md text-center text-sm text-gray-300 space-y-2">
          <p>Find a comfortable position and prepare to breathe mindfully.</p>
          <p className="text-xs text-gray-400">Follow the animation and audio cues.</p>
        </div>
      )}
    </div>
  );
};

export default BreathworkEngine;
