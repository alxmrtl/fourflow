import { useState, useEffect, useRef, useCallback } from 'react';
import { getPhaseColor } from '../utils/breathworkPatterns';

/**
 * Core breathwork timing engine hook
 * Manages state, timing, and phase transitions for any breathwork pattern
 */
export function useBreathwork(pattern) {
  const [isActive, setIsActive] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeInPhase, setTimeInPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const intervalRef = useRef(null);
  const phaseCallbacksRef = useRef({});

  const currentPhase = pattern.phases[currentPhaseIndex];
  const progress = currentPhase ? (timeInPhase / currentPhase.duration) : 0;
  const color = currentPhase ? getPhaseColor(pattern, currentPhase, currentCycle, timeInPhase) : null;

  // Calculate overall progress
  const totalPhases = pattern.phases.length * pattern.cycles;
  const completedPhases = currentCycle * pattern.phases.length + currentPhaseIndex;
  const overallProgress = (completedPhases + progress) / totalPhases;

  /**
   * Start the breathwork exercise
   */
  const start = useCallback(() => {
    setIsActive(true);
    setIsComplete(false);
    setCurrentCycle(0);
    setCurrentPhaseIndex(0);
    setTimeInPhase(0);
  }, []);

  /**
   * Pause the breathwork exercise
   */
  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  /**
   * Resume the breathwork exercise
   */
  const resume = useCallback(() => {
    setIsActive(true);
  }, []);

  /**
   * Stop and reset the breathwork exercise
   */
  const stop = useCallback(() => {
    setIsActive(false);
    setCurrentCycle(0);
    setCurrentPhaseIndex(0);
    setTimeInPhase(0);
    setIsComplete(false);
  }, []);

  /**
   * Register callbacks for phase changes
   */
  const onPhaseChange = useCallback((callback) => {
    phaseCallbacksRef.current.onChange = callback;
  }, []);

  const onPhaseStart = useCallback((callback) => {
    phaseCallbacksRef.current.onStart = callback;
  }, []);

  const onPhaseEnd = useCallback((callback) => {
    phaseCallbacksRef.current.onEnd = callback;
  }, []);

  const onComplete = useCallback((callback) => {
    phaseCallbacksRef.current.onComplete = callback;
  }, []);

  // Main timing loop
  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeInPhase((prev) => {
        const newTime = prev + 0.1; // Update every 100ms for smooth animation
        const phase = pattern.phases[currentPhaseIndex];

        if (newTime >= phase.duration) {
          // Phase complete - trigger callback
          if (phaseCallbacksRef.current.onEnd) {
            phaseCallbacksRef.current.onEnd(phase);
          }

          // Move to next phase or cycle
          const nextPhaseIndex = currentPhaseIndex + 1;

          if (nextPhaseIndex >= pattern.phases.length) {
            // Cycle complete
            const nextCycle = currentCycle + 1;

            if (nextCycle >= pattern.cycles) {
              // Exercise complete
              setIsActive(false);
              setIsComplete(true);
              if (phaseCallbacksRef.current.onComplete) {
                phaseCallbacksRef.current.onComplete();
              }
              return 0;
            }

            setCurrentCycle(nextCycle);
            setCurrentPhaseIndex(0);
            const nextPhase = pattern.phases[0];

            if (phaseCallbacksRef.current.onStart) {
              phaseCallbacksRef.current.onStart(nextPhase);
            }
            if (phaseCallbacksRef.current.onChange) {
              phaseCallbacksRef.current.onChange(nextPhase);
            }

            return 0;
          }

          setCurrentPhaseIndex(nextPhaseIndex);
          const nextPhase = pattern.phases[nextPhaseIndex];

          if (phaseCallbacksRef.current.onStart) {
            phaseCallbacksRef.current.onStart(nextPhase);
          }
          if (phaseCallbacksRef.current.onChange) {
            phaseCallbacksRef.current.onChange(nextPhase);
          }

          return 0;
        }

        return newTime;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentPhaseIndex, currentCycle, pattern]);

  // Trigger initial phase start
  useEffect(() => {
    if (isActive && timeInPhase === 0 && phaseCallbacksRef.current.onStart) {
      phaseCallbacksRef.current.onStart(currentPhase);
    }
  }, [isActive, currentPhase, timeInPhase]);

  return {
    // State
    isActive,
    isComplete,
    currentCycle,
    currentPhaseIndex,
    currentPhase,
    timeInPhase,
    progress,
    overallProgress,
    color,

    // Controls
    start,
    pause,
    resume,
    stop,

    // Callbacks
    onPhaseChange,
    onPhaseStart,
    onPhaseEnd,
    onComplete,
  };
}
