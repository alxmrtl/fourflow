import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const Flow = () => {
  const {
    tasks,
    goals,
    settings,
    dailyQueue,
    loadTasks,
    loadGoals,
    loadDailyQueue,
    addTaskToQueue,
    removeTaskFromQueue,
    addQueueSlot,
    removeQueueSlot,
    completeTask,
    startSession,
    enterFocusMode,
    setCurrentPage,
  } = useStore();

  const [showBacklog, setShowBacklog] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  useEffect(() => {
    loadTasks();
    loadGoals();
    loadDailyQueue();
  }, [loadTasks, loadGoals, loadDailyQueue]);

  const backlogTasks = tasks.filter(t => t.status === 'backlog');

  const getTaskById = (taskId) => {
    return tasks.find(t => t.id === taskId);
  };

  const getGoalForTask = (goalId) => {
    return goals.find(g => g.id === goalId);
  };

  const handleSelectTask = async (taskId) => {
    if (selectedSlotId) {
      await addTaskToQueue(selectedSlotId, taskId);
      setShowBacklog(false);
      setSelectedSlotId(null);
    }
  };

  const handleStartFlow = (task) => {
    if (!task) return;
    const duration = task.duration || settings.timerDuration || 25;
    startSession(task.id, duration);
    enterFocusMode();
  };

  const handleMarkComplete = async (taskId) => {
    await completeTask(taskId);
    // Remove from queue after completion
    const slot = dailyQueue?.slots.find(s => s.taskId === taskId);
    if (slot) {
      await removeTaskFromQueue(slot.id);
    }
  };

  const handleRemoveFromQueue = async (slotId) => {
    await removeTaskFromQueue(slotId);
  };

  if (!dailyQueue) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 md:pb-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-self mb-2">FLOW</h1>
          <p className="text-sm text-gray-600">Your daily flow execution hub</p>
        </div>

        {/* Today's Queue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Today's Queue</h2>
            <div className="flex gap-2">
              <button
                onClick={() => addQueueSlot()}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg font-semibold transition-colors"
              >
                + Slot
              </button>
            </div>
          </div>

          {/* Queue Slots */}
          <div className="space-y-3">
            {dailyQueue.slots.map((slot) => {
              const task = getTaskById(slot.taskId);
              const goal = task ? getGoalForTask(task.goalId) : null;

              return (
                <div
                  key={slot.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-self/30 transition-colors"
                >
                  {!task ? (
                    // Empty Slot
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-400">Empty slot</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSlotId(slot.id);
                            setShowBacklog(true);
                          }}
                          className="bg-self text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-self/90 transition-colors"
                        >
                          + Add Action
                        </button>
                        {dailyQueue.slots.length > 1 && (
                          <button
                            onClick={() => removeQueueSlot(slot.id)}
                            className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
                          >
                            Remove Slot
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Task in Slot
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-800 mb-1">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{task.duration || 25} min</span>
                            {goal && (
                              <button
                                className="flex items-center gap-1 hover:text-story transition-colors"
                                title={goal.title}
                              >
                                <span className="text-base">{goal.emoji || '🎯'}</span>
                                <span className="text-story font-medium">{goal.title}</span>
                              </button>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromQueue(slot.id)}
                          className="text-gray-400 hover:text-red-600 text-sm transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartFlow(task)}
                          className="flex-1 bg-self text-white py-2 rounded-lg text-sm font-semibold hover:bg-self/90 transition-colors"
                        >
                          Start Flow
                        </button>
                        <button
                          onClick={() => handleMarkComplete(task.id)}
                          className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-100 border border-green-200 transition-colors"
                        >
                          ✓ Complete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Space Configuration Display */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <button
            onClick={() => setCurrentPage('align')}
            className="w-full flex items-center justify-between hover:bg-gray-100 -m-4 p-4 rounded-lg transition-colors"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Space Configuration</h3>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>Sound: {settings.sound === 'silence' ? 'Silence' : settings.sound}</span>
                <span>Breathwork: {settings.breathworkBefore ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
            <span className="text-gray-400 text-xs">Edit in ALIGN →</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCurrentPage('align');
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            + Add More Actions
          </button>
        </div>
      </div>

      {/* Backlog Selection Modal */}
      {showBacklog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white w-full md:max-w-2xl md:rounded-lg max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Action</h3>
              <button
                onClick={() => {
                  setShowBacklog(false);
                  setSelectedSlotId(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {backlogTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-3">
                    No actions in backlog
                  </p>
                  <button
                    onClick={() => {
                      setShowBacklog(false);
                      setSelectedSlotId(null);
                      setCurrentPage('align');
                    }}
                    className="text-xs text-self font-semibold hover:underline"
                  >
                    Add actions in ALIGN →
                  </button>
                </div>
              ) : (
                backlogTasks.map(task => {
                  const goal = getGoalForTask(task.goalId);
                  return (
                    <button
                      key={task.id}
                      onClick={() => handleSelectTask(task.id)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-left hover:border-self hover:bg-self/5 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{task.duration || 25} min</span>
                            {goal && (
                              <span className="text-story">
                                {goal.emoji ? `${goal.emoji} ` : '→ '}{goal.title}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-self text-xs font-semibold">Select</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
