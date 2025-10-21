import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const Flow = () => {
  const {
    tasks,
    goals,
    sessions,
    settings,
    loadTasks,
    loadGoals,
    loadSessions,
    addTask,
    moveTaskToToday,
    completeTask,
    deleteTask,
    startSession,
    enterFocusMode,
    getSetupCompletion,
    setCurrentPage,
  } = useStore();

  const [showQuickTask, setShowQuickTask] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', goalId: null });

  useEffect(() => {
    loadTasks();
    loadGoals();
    loadSessions();
  }, [loadTasks, loadGoals, loadSessions]);

  const todayTasks = tasks.filter(t => t.status === 'today');
  const backlogTasks = tasks.filter(t => t.status === 'backlog');
  const completedToday = tasks.filter(t => {
    if (t.status !== 'completed') return false;
    const today = new Date().toISOString().split('T')[0];
    const completedDate = t.completedAt?.split('T')[0];
    return completedDate === today;
  });

  const todaySessions = sessions.filter(s => {
    const today = new Date().toISOString().split('T')[0];
    return s.date === today;
  });

  const todayReps = todaySessions.reduce((sum, s) => sum + (s.reps || 0), 0);
  const todayTime = todaySessions.reduce((sum, s) => sum + (s.actualDuration || 0), 0);
  const streak = 7; // TODO: Calculate actual streak

  const setupCompletion = getSetupCompletion();

  const handleQuickTask = async () => {
    if (newTask.title.trim()) {
      await addTask({ ...newTask, status: 'today' });
      setNewTask({ title: '', goalId: null });
      setShowQuickTask(false);
    }
  };

  const handlePullFromBacklog = async (taskId) => {
    await moveTaskToToday(taskId);
  };

  const handleStartSession = (taskId) => {
    startSession(taskId, settings.timerDuration);
    enterFocusMode();
  };

  const getGoalForTask = (goalId) => {
    return goals.find(g => g.id === goalId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 md:pb-6">
      <div className="space-y-4">
        {/* Header Stats */}
        <div>
          <h1 className="text-2xl font-bold text-self mb-1">FLOW</h1>
          <div className="flex gap-4 text-xs text-gray-600">
            <span>{todayReps} reps</span>
            <span>{todayTime} min</span>
            <span>{streak} day streak</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Ready to Focus */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">Ready to Focus</h2>
              <span className="text-xs text-gray-500">{todayTasks.length} tasks</span>
            </div>

            {todayTasks.length === 0 && !showQuickTask && (
              <div className="text-center py-8 text-gray-500 text-sm">
                <p className="mb-3">No tasks for today</p>
                <p className="text-xs">Add a quick task or pull from your backlog</p>
              </div>
            )}

            {todayTasks.map(task => {
              const goal = getGoalForTask(task.goalId);
              return (
                <div
                  key={task.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {task.title}
                      </h3>
                      {goal && (
                        <p className="text-xs text-story mt-0.5">
                          → {goal.title}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleStartSession(task.id)}
                      className="bg-self text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0"
                    >
                      START
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Task Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowQuickTask(true)}
              className="flex-1 bg-self text-white py-2 rounded-lg text-xs font-semibold"
            >
              + Quick Task
            </button>
            <button
              onClick={() => setShowBacklog(true)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-semibold"
            >
              📋 Pull from Backlog ({backlogTasks.length})
            </button>
          </div>

          {/* Quick Task Form */}
          {showQuickTask && (
            <div className="bg-white border-2 border-self rounded-lg p-3 space-y-2">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task title..."
                className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
                autoFocus
              />
              <select
                value={newTask.goalId || ''}
                onChange={(e) => setNewTask({ ...newTask, goalId: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
              >
                <option value="">No goal (optional)</option>
                {goals.filter(g => g.status === 'active').map(goal => (
                  <option key={goal.id} value={goal.id}>{goal.title}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleQuickTask}
                  className="flex-1 bg-self text-white py-1.5 rounded-lg text-xs font-semibold"
                >
                  Add to Today
                </button>
                <button
                  onClick={() => {
                    setShowQuickTask(false);
                    setNewTask({ title: '', goalId: null });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Backlog Sheet */}
          {showBacklog && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
              <div className="bg-white w-full md:max-w-2xl md:rounded-lg max-h-[80vh] flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Backlog</h3>
                  <button
                    onClick={() => setShowBacklog(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {backlogTasks.length === 0 ? (
                    <p className="text-center text-gray-500 py-8 text-sm">
                      No backlog tasks. Add tasks in Setup → SELF
                    </p>
                  ) : (
                    backlogTasks.map(task => {
                      const goal = getGoalForTask(task.goalId);
                      return (
                        <div
                          key={task.id}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-2"
                        >
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold">{task.title}</h4>
                            {goal && (
                              <p className="text-xs text-story mt-0.5">→ {goal.title}</p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              handlePullFromBacklog(task.id);
                              setShowBacklog(false);
                            }}
                            className="bg-self text-white px-3 py-1 rounded text-xs font-semibold whitespace-nowrap"
                          >
                            + Add Today
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Completed Today */}
          {completedToday.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600">✓ Completed Today</h3>
              {completedToday.map(task => {
                const goal = getGoalForTask(task.goalId);
                return (
                  <div
                    key={task.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2 opacity-75"
                  >
                    <h4 className="text-sm text-gray-600 line-through">{task.title}</h4>
                    {goal && (
                      <p className="text-xs text-gray-500">→ {goal.title}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Setup Indicator */}
        {setupCompletion.total < 3 && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">
              Setup: {setupCompletion.total}/3 complete
            </p>
            <button
              onClick={() => setCurrentPage('setup')}
              className="text-xs text-self font-semibold hover:underline"
            >
              Complete setup →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flow;
