import React, { useEffect, useRef, useState } from 'react';
import { useBreathwork } from '../hooks/useBreathwork';
import { breathworkAudio } from '../utils/breathworkAudio';
import { getCurrentLayerLabel } from '../utils/breathworkPatterns';
import BreathworkAnimation from './BreathworkAnimation';

/**
 * BreathworkEngine Component
 * Orchestrates the complete breathwork experience with animation, audio, and UI
 * Features: Smooth auto-start sequence, charcoal background, skip button, minimal layout
 */
const BreathworkEngine = ({ pattern, onComplete, autoStart = false, onSkip, taskTitle }) => {
  const breathwork = useBreathwork(pattern);
  const audioInitialized = useRef(false);
  const [preparationPhase, setPreparationPhase] = useState('initial'); // 'initial' | 'ready' | 'countdown' | 'complete'
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [introCountdown, setIntroCountdown] = useState(3);
  const [completionPhase, setCompletionPhase] = useState('complete'); // 'complete' | 'action-display' | 'countdown' | 'done'
  const [countdown, setCountdown] = useState(3);

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

  // Setup completion callback with action display and countdown
  useEffect(() => {
    onBreathworkComplete(() => {
      breathworkAudio.playComplete();

      // Show completion checkmark
      setTimeout(() => setCompletionPhase('action-display'), 1500);

      // Show action name
      setTimeout(() => setCompletionPhase('countdown'), 3500);

      // Start countdown
      setTimeout(() => setCountdown(3), 3500);
      setTimeout(() => setCountdown(2), 4500);
      setTimeout(() => setCountdown(1), 5500);

      // Transition to focus mode
      setTimeout(() => {
        setCompletionPhase('done');
        if (onComplete) {
          onComplete();
        }
      }, 6500);
    });
  }, [onBreathworkComplete, onComplete, taskTitle]);

  // Smooth preparation sequence with auto-start and countdown
  useEffect(() => {
    if (autoStart && !isActive && !isComplete && preparationPhase === 'initial') {
      // Fade in "Prepare for flow..."
      setTimeout(() => setShowContent(true), 100);

      // Fade out "Prepare for flow..."
      setTimeout(() => setFadeOut(true), 2000);

      // Switch to "Get ready to breathe"
      setTimeout(() => {
        setPreparationPhase('ready');
        setShowContent(false);
        setFadeOut(false);
      }, 2800);

      // Fade in "Get ready to breathe"
      setTimeout(() => setShowContent(true), 2900);

      // Fade out "Get ready to breathe"
      setTimeout(() => setFadeOut(true), 4900);

      // Switch to countdown
      setTimeout(() => {
        setPreparationPhase('countdown');
        setShowContent(false);
        setFadeOut(false);
      }, 5700);

      // Show countdown: 3
      setTimeout(() => {
        setShowContent(true);
        setIntroCountdown(3);
      }, 5800);

      // Show countdown: 2
      setTimeout(() => setIntroCountdown(2), 6800);

      // Show countdown: 1
      setTimeout(() => setIntroCountdown(1), 7800);

      // Fade out countdown
      setTimeout(() => setFadeOut(true), 8800);

      // Start breathing exercise with gentle fade
      setTimeout(() => {
        setPreparationPhase('complete');
        setShowContent(false);
        setFadeOut(false);
      }, 9300);

      // Fade in breathing animation
      setTimeout(() => {
        setShowContent(true);
        start();
      }, 9400);
    }
  }, [autoStart, isActive, isComplete, start, preparationPhase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      breathworkAudio.stopCurrent();
    };
  }, []);

  const handleSkip = () => {
    breathworkAudio.stopCurrent();
    if (onSkip) {
      onSkip();
    } else if (onComplete) {
      onComplete();
    }
  };

  // Completion state - smooth auto-transition with action display and countdown
  if (isComplete) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        {/* Completion Checkmark */}
        {completionPhase === 'complete' && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-7xl">✓</div>
            <h2 className="text-2xl font-semibold tracking-wide">Complete</h2>
          </div>
        )}

        {/* Action Name Display */}
        {completionPhase === 'action-display' && taskTitle && (
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold text-self tracking-tight">FLOW</h1>
            <p className="text-2xl font-medium text-white/90 max-w-md px-6">{taskTitle}</p>
          </div>
        )}

        {/* Countdown */}
        {completionPhase === 'countdown' && (
          <div className="text-center animate-fade-in">
            <div className="text-8xl font-bold text-self animate-pulse-subtle">{countdown}</div>
          </div>
        )}
      </div>
    );
  }

  // Get preparation content
  const getPreparationContent = () => {
    if (!autoStart || preparationPhase === 'complete') return null;
    if (preparationPhase === 'initial') return { type: 'text', content: 'Prepare for flow...' };
    if (preparationPhase === 'ready') return { type: 'text', content: 'Get ready to breathe' };
    if (preparationPhase === 'countdown') return { type: 'countdown', content: introCountdown };
    return null;
  };

  const preparationContent = getPreparationContent();
  const showAnimation = preparationPhase === 'complete' || !autoStart;

  return (
    <div className="w-full h-full relative text-white flex flex-col">
      {/* Skip Button - Top Right with safe area */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 text-sm text-white/60 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-lg z-10 safe-top"
        style={{ top: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))' }}
      >
        Skip
      </button>

      {/* Preparation Phase - Centered Messages with Smooth Fades and Safe Area */}
      {preparationContent && (
        <div
          className={`flex-1 flex items-center justify-center px-6 transition-opacity duration-700 ${
            showContent && !fadeOut ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            paddingTop: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))',
            paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))'
          }}
        >
          {preparationContent.type === 'text' && (
            <h2 className="text-lg font-medium tracking-wide">
              {preparationContent.content}
            </h2>
          )}
          {preparationContent.type === 'countdown' && (
            <div className="text-4xl font-bold text-white/90">
              {preparationContent.content}
            </div>
          )}
        </div>
      )}

      {/* Main Breathwork Content */}
      {showAnimation && (
        <div
          className={`flex-1 flex flex-col items-center justify-center space-y-8 p-6 transition-opacity duration-1000 ${
            preparationPhase === 'complete' && showContent ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            paddingTop: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))',
            paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))'
          }}
        >

          {/* Animation Container - The Star */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            <BreathworkAnimation phase={currentPhase} progress={progress} color={color} />

            {/* Phase Label Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center space-y-2">
                <p className="text-4xl sm:text-5xl font-semibold tracking-wide drop-shadow-2xl transition-all duration-500">
                  {currentPhase?.label}
                </p>
                {currentLayerLabel && (
                  <p className="text-xl text-white/80 drop-shadow-lg font-medium transition-all duration-500">
                    {currentLayerLabel}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar - Thin and Elegant */}
          <div className="w-full max-w-sm space-y-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/40 transition-all duration-300 ease-linear rounded-full"
                style={{ width: `${overallProgress * 100}%` }}
              />
            </div>
          </div>

          {/* Bottom Info - Minimal */}
          <div className="flex items-center justify-between w-full max-w-sm text-xs text-white/40">
            <span>Cycle {currentCycle + 1} of {pattern.cycles}</span>
            <span className="px-2 py-1 bg-white/5 rounded-md">
              {pattern.phases.map(p => p.duration).join('-')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathworkEngine;
