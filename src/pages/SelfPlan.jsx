import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const SelfPlan = () => {
  const {
    tasks,
    loadTasks,
    addTask,
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
  const getGoalForTask = (goalId) => goals.find(g => g.id === goalId);

  return (
    <div className="h-[calc(100vh-14rem)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-2 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-600">What will you focus on?</p>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-self text-white px-3 py-1 rounded-lg text-xs font-semibold"
          >
            + Add
          </button>
        </div>

        {/* Add Task Form */}
        {showAddTask && (
          <div className="bg-white border-2 border-self rounded-lg p-3 mb-3 space-y-2">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task title"
              className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
              autoFocus
            />
            <select
              value={newTask.goalId || ''}
              onChange={(e) => setNewTask({ ...newTask, goalId: e.target.value ? parseInt(e.target.value) : null })}
              className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
            >
              <option value="">No goal</option>
              {goals.filter(g => g.status === 'active').map(goal => (
                <option key={goal.id} value={goal.id}>{goal.title}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleAddTask}
                className="flex-1 bg-self text-white py-1.5 rounded-lg text-xs font-semibold"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddTask(false);
                  setNewTask({ title: '', goalId: null, notes: '' });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="flex-1 overflow-y-auto">
          {!showAddTask && backlogTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500 mb-3">No tasks in backlog</p>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-self text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Add Your First Task
              </button>
            </div>
          )}

          {backlogTasks.length > 0 && (
            <div className="space-y-2">
              {backlogTasks.map(task => {
                const goal = getGoalForTask(task.goalId);

                return (
                  <div
                    key={task.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 truncate">
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
                        Start
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfPlan;
