import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const FocusMode = () => {
  const {
    currentSession,
    tasks,
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

  const task = tasks.find(t => t.id === currentSession?.taskId);
  const totalSeconds = currentSession?.duration * 60 || 0;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeRemaining) / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 120;

  useEffect(() => {
    if (!currentSession || currentSession.isPaused) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        updateSessionTime(newTime);

        if (newTime <= 0) {
          clearInterval(interval);
          setShowEndModal(true);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession?.isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = async () => {
    await endSession({ feltFlow });
    exitFocusMode();
  };

  const handleCancel = () => {
    if (confirm('Cancel this session? Your reps won\'t be saved.')) {
      cancelSession();
      exitFocusMode();
    }
  };

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No active session</p>
      </div>
    );
  }

  if (showEndModal) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <h1 className="text-3xl font-bold text-self">Session Complete</h1>

          <div className="space-y-4">
            <div>
              <p className="text-6xl font-bold text-self mb-2">{currentSession.reps}</p>
              <p className="text-gray-400">reps tracked</p>
            </div>

            <div>
              <p className="text-2xl font-semibold mb-2">{task?.title}</p>
              <p className="text-gray-400">{currentSession.duration} minutes</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={feltFlow}
                onChange={(e) => setFeltFlow(e.target.checked)}
                className="w-5 h-5 accent-self"
              />
              <span className="text-left">Did you experience flow state?</span>
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Task Info */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">{task?.title}</h1>
          <p className="text-gray-400">{currentSession.duration} min session</p>
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
              className="text-white/10"
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
            <span className="text-5xl font-bold">
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
          <p className="text-sm text-gray-400">
            Press when you resist distraction
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => currentSession.isPaused ? resumeSession() : pauseSession()}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {currentSession.isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => setShowEndModal(true)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            End Early
          </button>
          <button
            onClick={handleCancel}
            className="px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-lg font-semibold transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
