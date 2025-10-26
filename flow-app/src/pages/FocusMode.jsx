import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import BreathworkEngine from '../components/BreathworkEngine';
import { BREATHWORK_PATTERNS } from '../utils/breathworkPatterns';
import { backgroundAudio } from '../utils/backgroundAudio';

const FocusMode = () => {
  const {
    currentSession,
    tasks,
    settings,
    pauseSession,
    resumeSession,
    incrementReps,
    endSession,
    cancelSession,
    exitFocusMode,
    updateSessionTime,
  } = useStore();

  const [timeRemaining, setTimeRemaining] = useState(currentSession?.timeRemaining || 0);
  const [showEndModal, setShowEndModal] = useState(false);
  const [feltFlow, setFeltFlow] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [showPreFlowBreathwork, setShowPreFlowBreathwork] = useState(false);
  const [showPostFlowBreathwork, setShowPostFlowBreathwork] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [fadeInFlow, setFadeInFlow] = useState(false);

  const task = tasks.find(t => t.id === currentSession?.taskId);
  const totalSeconds = currentSession?.duration * 60 || 0;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeRemaining) / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 120;

  // Check if we should show pre-flow breathwork on mount
  useEffect(() => {
    if (settings.breathworkBefore && settings.breathworkBefore !== 'none' && !sessionStarted) {
      setShowPreFlowBreathwork(true);
    } else {
      setSessionStarted(true);
    }
  }, [settings.breathworkBefore, sessionStarted]);

  // Fade in the flow screen when session starts
  useEffect(() => {
    if (sessionStarted && !showPreFlowBreathwork && !showPostFlowBreathwork) {
      // Small delay before fade in
      setTimeout(() => setFadeInFlow(true), 100);
    }
  }, [sessionStarted, showPreFlowBreathwork, showPostFlowBreathwork]);

  // Start background audio when session starts (with fade in)
  useEffect(() => {
    if (sessionStarted && settings.sound && settings.sound !== 'none') {
      // Initialize audio context on user interaction
      backgroundAudio.init();
      // Play with 3 second fade in
      backgroundAudio.play(settings.sound, settings.volume || 0.5, 3);
    }

    // Cleanup: fade out and stop when component unmounts
    return () => {
      if (backgroundAudio.isPlaying) {
        backgroundAudio.fadeOut(2);
      }
    };
  }, [sessionStarted, settings.sound, settings.volume]);

  useEffect(() => {
    if (!currentSession || currentSession.isPaused || !sessionStarted) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        updateSessionTime(newTime);

        if (newTime <= 0) {
          clearInterval(interval);
          // Check if we should show post-flow breathwork
          if (settings.breathworkAfter && settings.breathworkAfter !== 'none') {
            setShowPostFlowBreathwork(true);
          } else {
            setShowEndModal(true);
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession?.isPaused, sessionStarted, settings.breathworkAfter]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = async () => {
    // Fade out audio before ending
    if (backgroundAudio.isPlaying) {
      backgroundAudio.fadeOut(1);
    }

    await endSession({ feltFlow });

    // Mark task as completed if user indicated so
    if (taskCompleted && currentSession?.taskId) {
      const { completeTask, dailyQueue, removeTaskFromQueue } = useStore.getState();
      await completeTask(currentSession.taskId);

      // Remove from queue after completion
      const slot = dailyQueue?.slots.find(s => s.taskId === currentSession.taskId);
      if (slot) {
        await removeTaskFromQueue(slot.id);
      }
    }

    exitFocusMode();
  };

  const handleCancel = () => {
    if (confirm('Cancel this session? Your reps won\'t be saved.')) {
      // Stop audio immediately
      backgroundAudio.stop();
      cancelSession();
      exitFocusMode();
    }
  };

  // Get the selected breathwork pattern
  const getBreathworkPattern = (patternKey) => {
    const patternMap = {
      'box-breathing': BREATHWORK_PATTERNS.BOX_BREATHING,
      'energizing-breath': BREATHWORK_PATTERNS.ENERGIZING_BREATH,
      'power-breath': BREATHWORK_PATTERNS.POWER_BREATH,
      'relaxation-478': BREATHWORK_PATTERNS.RELAXATION_478,
      'coherent-breathing': BREATHWORK_PATTERNS.COHERENT_BREATHING,
      'grounding-breath': BREATHWORK_PATTERNS.GROUNDING_BREATH,
    };
    return patternMap[patternKey] || BREATHWORK_PATTERNS.BOX_BREATHING;
  };

  // Pre-Flow Breathwork
  if (showPreFlowBreathwork) {
    const pattern = getBreathworkPattern(settings.breathworkBefore);
    return (
      <div className="h-screen bg-charcoal animate-fade-in overflow-hidden">
        <BreathworkEngine
          pattern={pattern}
          taskTitle={task?.title}
          onComplete={() => {
            setShowPreFlowBreathwork(false);
            setSessionStarted(true);
          }}
          onSkip={() => {
            setShowPreFlowBreathwork(false);
            setSessionStarted(true);
          }}
          autoStart={true}
        />
      </div>
    );
  }

  // Post-Flow Breathwork
  if (showPostFlowBreathwork) {
    const pattern = getBreathworkPattern(settings.breathworkAfter);
    return (
      <div className="h-screen bg-charcoal animate-fade-in overflow-hidden">
        <BreathworkEngine
          pattern={pattern}
          taskTitle={task?.title}
          onComplete={() => {
            setShowPostFlowBreathwork(false);
            setShowEndModal(true);
          }}
          onSkip={() => {
            setShowPostFlowBreathwork(false);
            setShowEndModal(true);
          }}
          autoStart={true}
        />
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-charcoal text-white flex items-center justify-center">
        <p>No active session</p>
      </div>
    );
  }

  if (showEndModal) {
    return (
      <div className="min-h-screen bg-charcoal text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <h1 className="text-3xl font-bold text-self">Session Complete</h1>

          <div className="space-y-4">
            <div>
              <p className="text-6xl font-bold text-self mb-2">{currentSession.reps}</p>
              <p className="text-ivory/60">reps tracked</p>
            </div>

            <div>
              <p className="text-2xl font-semibold mb-2 text-ivory">{task?.title}</p>
              <p className="text-ivory/60">{currentSession.duration} minutes</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 bg-ivory/5 rounded-lg cursor-pointer hover:bg-ivory/10 transition-colors">
              <input
                type="checkbox"
                checked={taskCompleted}
                onChange={(e) => setTaskCompleted(e.target.checked)}
                className="w-5 h-5 accent-space"
              />
              <span className="text-left text-ivory">Was this action completed?</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-ivory/5 rounded-lg cursor-pointer hover:bg-ivory/10 transition-colors">
              <input
                type="checkbox"
                checked={feltFlow}
                onChange={(e) => setFeltFlow(e.target.checked)}
                className="w-5 h-5 accent-self"
              />
              <span className="text-left text-ivory">Did you experience flow state?</span>
            </label>

            <button
              onClick={handleEndSession}
              className="w-full bg-self text-white py-4 rounded-lg font-semibold text-lg hover:bg-self-dark transition-colors"
            >
              Save Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-charcoal text-white flex items-center justify-center p-6 transition-opacity duration-1000 ${fadeInFlow ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Task Info */}
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-ivory">{task?.title}</h1>
          <p className="text-ivory/60">{currentSession.duration} min session</p>
        </div>

        {/* Circular Timer */}
        <div className="relative w-64 h-64 mx-auto">
          <svg className="transform -rotate-90 w-64 h-64">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-ivory/20"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-self transition-all duration-1000"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-ivory">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Rep Counter */}
        <div className="space-y-4">
          <button
            onClick={incrementReps}
            className="w-full bg-self hover:bg-self-dark text-white py-6 rounded-2xl font-semibold text-xl transition-colors"
          >
            + Rep ({currentSession.reps})
          </button>
          <p className="text-sm text-ivory/50">
            Press when you resist distraction
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentSession.isPaused) {
                resumeSession();
                // Resume audio if it was playing
                if (settings.sound && settings.sound !== 'none') {
                  backgroundAudio.play(settings.sound, settings.volume || 0.5, 0.5);
                }
              } else {
                pauseSession();
                // Fade out audio when pausing
                if (backgroundAudio.isPlaying) {
                  backgroundAudio.fadeOut(0.5);
                }
              }
            }}
            className="flex-1 bg-ivory/10 hover:bg-ivory/20 text-ivory py-3 rounded-lg font-semibold transition-colors"
          >
            {currentSession.isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => {
              // Fade out audio when ending early
              if (backgroundAudio.isPlaying) {
                backgroundAudio.fadeOut(0.5);
              }
              // Check if we should show post-flow breathwork
              if (settings.breathworkAfter && settings.breathworkAfter !== 'none') {
                setShowPostFlowBreathwork(true);
              } else {
                setShowEndModal(true);
              }
            }}
            className="flex-1 bg-ivory/10 hover:bg-ivory/20 text-ivory py-3 rounded-lg font-semibold transition-colors"
          >
            End Early
          </button>
          <button
            onClick={handleCancel}
            className="px-4 bg-self/20 hover:bg-self/30 text-self py-3 rounded-lg font-semibold transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
