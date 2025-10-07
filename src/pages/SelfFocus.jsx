import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const STRUGGLE_MESSAGES = [
  "Building focus neurochemistry...",
  "Struggle phase = growth phase",
  "Your brain is warming up",
  "The breakthrough is coming",
  "This discomfort is temporary",
];

const SelfFocus = () => {
  const {
    currentSession,
    updateSessionTime,
    incrementReps,
    pauseSession,
    resumeSession,
    endSession,
    cancelSession,
    exitFocusMode,
    setCurrentSelfView,
    tasks,
    goals,
  } = useStore();

  const [timeRemaining, setTimeRemaining] = useState(currentSession?.timeRemaining || 0);
  const [showStruggle, setShowStruggle] = useState(true);
  const [struggleMessage, setStruggleMessage] = useState(STRUGGLE_MESSAGES[0]);
  const [lastRepTime, setLastRepTime] = useState(Date.now());
  const [showEndModal, setShowEndModal] = useState(false);
  const [sessionFeedback, setSessionFeedback] = useState({ energy: 3, feltFlow: false, distractionTags: [] });

  const timerRef = useRef(null);
  const struggleTimerRef = useRef(null);

  const task = tasks.find(t => t.id === currentSession?.taskId);
  const goal = task?.goalId ? goals.find(g => g.id === task.goalId) : null;

  const totalTime = currentSession?.duration * 60 || 1500;
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;
  const isInStrugglePhase = progress < 25;

  useEffect(() => {
    if (!currentSession) {
      exitFocusMode();
      setCurrentSelfView('plan');
      return;
    }

    setTimeRemaining(currentSession.timeRemaining);
  }, [currentSession, exitFocusMode, setCurrentSelfView]);

  // Timer countdown
  useEffect(() => {
    if (!currentSession?.isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          updateSessionTime(newTime);

          if (newTime <= 0) {
            handleSessionComplete();
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSession?.isPaused, timeRemaining]);

  // Struggle phase logic
  useEffect(() => {
    if (isInStrugglePhase) {
      setShowStruggle(true);

      // Rotate messages every 10 seconds
      struggleTimerRef.current = setInterval(() => {
        setStruggleMessage(STRUGGLE_MESSAGES[Math.floor(Math.random() * STRUGGLE_MESSAGES.length)]);
      }, 10000);
    } else {
      setShowStruggle(false);
    }

    return () => {
      if (struggleTimerRef.current) {
        clearInterval(struggleTimerRef.current);
      }
    };
  }, [isInStrugglePhase]);

  // Auto-hide struggle after 5 min of no reps
  useEffect(() => {
    if (Date.now() - lastRepTime > 5 * 60 * 1000) {
      setShowStruggle(false);
    }
  }, [lastRepTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFocusRep = () => {
    incrementReps();
    setLastRepTime(Date.now());

    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handlePauseResume = () => {
    if (currentSession?.isPaused) {
      resumeSession();
    } else {
      pauseSession();
    }
  };

  const handleSessionComplete = () => {
    setShowEndModal(true);
  };

  const handleEndSession = async (completed = true) => {
    await endSession({
      ...sessionFeedback,
      completed,
    });

    // Mark task as completed if session finished
    if (completed && task) {
      const { completeTask } = useStore.getState();
      await completeTask(task.id);
    }

    exitFocusMode();
    setCurrentSelfView('review');
  };

  const handleCancel = () => {
    if (confirm('End this session early? Your progress will not be saved.')) {
      cancelSession();
      exitFocusMode();
      setCurrentSelfView('plan');
    }
  };

  if (!currentSession || !task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No active session</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6 transition-focus-mode">
      <div className="w-full max-w-2xl space-y-12 text-center">
        {/* Struggle Phase Indicator */}
        {showStruggle && (
          <div className="animate-fade-in">
            <div className="inline-block px-6 py-2 rounded-full bg-amber-struggle/20 border border-amber-struggle/30">
              <p className="text-sm text-amber-900">{struggleMessage}</p>
            </div>
          </div>
        )}

        {/* Task Display */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {task.title}
          </h1>
          {goal && (
            <p className="text-lg text-story">
              Building: {goal.title}
            </p>
          )}
        </div>

        {/* Timer */}
        <div className="relative">
          {/* Progress Ring */}
          <svg className="w-64 h-64 md:w-80 md:h-80 mx-auto transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#FF6F61"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * (window.innerWidth > 768 ? 160 : 128)}`}
              strokeDashoffset={`${2 * Math.PI * (window.innerWidth > 768 ? 160 : 128) * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl font-bold text-gray-900 font-mono">
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Focus Button */}
        <div className="space-y-4">
          <button
            onClick={handleFocusRep}
            className="relative w-full max-w-md mx-auto bg-self text-white py-8 rounded-2xl font-bold text-2xl hover:bg-self-dark transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
            FOCUS
          </button>

          <p className="text-lg text-gray-600">
            <span className="font-bold text-self text-2xl">{currentSession.reps}</span> reps today
          </p>
        </div>

        {/* Minimal Controls */}
        <div className="flex justify-center gap-4 text-sm">
          <button
            onClick={handlePauseResume}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            {currentSession.isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => setShowEndModal(true)}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            End Session
          </button>
          <button
            onClick={handleCancel}
            className="text-red-500 hover:text-red-700 underline"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* End Session Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Session Complete!</h2>

            <div className="space-y-4">
              <p className="text-gray-700">
                Nice work. <span className="font-bold text-self">{currentSession.reps} reps</span> today.
              </p>

              {/* Energy Check */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Energy Level (Optional)
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      onClick={() => setSessionFeedback({ ...sessionFeedback, energy: level })}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        sessionFeedback.energy === level
                          ? 'border-self bg-self text-white'
                          : 'border-gray-300 hover:border-self/50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flow Check */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Felt flow?
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSessionFeedback({ ...sessionFeedback, feltFlow: true })}
                    className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                      sessionFeedback.feltFlow
                        ? 'border-self bg-self text-white'
                        : 'border-gray-300 hover:border-self/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setSessionFeedback({ ...sessionFeedback, feltFlow: false })}
                    className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                      !sessionFeedback.feltFlow
                        ? 'border-gray-400 bg-gray-100'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleEndSession(true)}
              className="w-full bg-self text-white py-3 rounded-lg font-semibold hover:bg-self-dark transition-colors"
            >
              Complete Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfFocus;
