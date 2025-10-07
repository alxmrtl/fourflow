import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const SelfPlan = () => {
  const {
    tasks,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    goals,
    loadGoals,
    startSession,
    setCurrentSelfView,
    enterFocusMode,
    settings,
  } = useStore();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', goalId: null, notes: '' });

  useEffect(() => {
    loadTasks();
    loadGoals();
  }, [loadTasks, loadGoals]);

  const handleAddTask = async () => {
    if (newTask.title.trim()) {
      await addTask(newTask);
      setNewTask({ title: '', goalId: null, notes: '' });
      setShowAddTask(false);
    }
  };

  const handleStartSession = (taskId) => {
    startSession(taskId, settings.timerDuration);
    setCurrentSelfView('focus');
    enterFocusMode();
  };

  const backlogTasks = tasks.filter(t => t.status === 'backlog');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const getGoalForTask = (goalId) => {
    return goals.find(g => g.id === goalId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-self">PLAN</h1>
          <p className="text-gray-600">What will you focus on today?</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-self text-white px-4 py-2 rounded-lg font-semibold hover:bg-self-dark transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="bg-white border-2 border-self rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-self">New Task</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="What do you need to do?"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link to Goal (Optional)
            </label>
            <select
              value={newTask.goalId || ''}
              onChange={(e) => setNewTask({ ...newTask, goalId: e.target.value ? parseInt(e.target.value) : null })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
            >
              <option value="">No goal (one-off task)</option>
              {goals.filter(g => g.status === 'active').map(goal => (
                <option key={goal.id} value={goal.id}>{goal.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={newTask.notes}
              onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
              placeholder="Any additional details..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none min-h-20 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddTask}
              className="flex-1 bg-self text-white py-2 rounded-lg font-semibold hover:bg-self-dark transition-colors"
            >
              Add Task
            </button>
            <button
              onClick={() => {
                setShowAddTask(false);
                setNewTask({ title: '', goalId: null, notes: '' });
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Quick Start */}
      {!showAddTask && backlogTasks.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <p className="text-gray-500">No tasks in your backlog</p>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-self text-white px-6 py-3 rounded-lg font-semibold hover:bg-self-dark transition-colors"
          >
            Add Your First Task
          </button>
        </div>
      )}

      {/* Task Backlog */}
      {backlogTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Task Backlog</h2>
          {backlogTasks.map(task => {
            const goal = getGoalForTask(task.goalId);

            return (
              <div
                key={task.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-self/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {task.title}
                    </h3>
                    {goal && (
                      <p className="text-sm text-story mb-2">
                        Building: {goal.title}
                      </p>
                    )}
                    {task.notes && (
                      <p className="text-sm text-gray-600">{task.notes}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleStartSession(task.id)}
                      className="bg-self text-white px-4 py-2 rounded-lg font-semibold hover:bg-self-dark transition-colors whitespace-nowrap"
                    >
                      Start Session
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this task?')) {
                          deleteTask(task.id);
                        }
                      }}
                      className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recently Completed */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Recently Completed</h2>
          {completedTasks.slice(0, 5).map(task => {
            const goal = getGoalForTask(task.goalId);

            return (
              <div
                key={task.id}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 opacity-75"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-600 line-through mb-1">
                      {task.title}
                    </h3>
                    {goal && (
                      <p className="text-sm text-gray-500">
                        Built: {goal.title}
                      </p>
                    )}
                  </div>
                  <div className="text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelfPlan;
