import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const AlignActions = () => {
  const {
    tasks,
    goals,
    loadTasks,
    loadGoals,
    addTask,
    updateTask,
    deleteTask,
  } = useStore();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', goalId: null, duration: 25 });

  useEffect(() => {
    loadTasks();
    loadGoals();
  }, [loadTasks, loadGoals]);

  const handleAddTask = async () => {
    if (newTask.title.trim()) {
      await addTask({ ...newTask, status: 'backlog' });
      setNewTask({ title: '', goalId: null, duration: 25 });
      setShowAddTask(false);
    }
  };

  const getGoalForTask = (goalId) => {
    return goals.find(g => g.id === goalId);
  };

  const backlogTasks = tasks.filter(t => t.status === 'backlog');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-self">ACTIONS - Task Backlog</h2>
        <p className="text-sm text-gray-600">Build your repository of actions</p>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => setShowAddTask(true)}
        className="w-full bg-self text-white py-2 rounded-lg text-sm font-semibold"
      >
        + Add Action
      </button>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="bg-white border-2 border-self rounded-lg p-3 space-y-2">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Action title"
            className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
            autoFocus
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-600 block mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={newTask.duration}
                onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) || 25 })}
                min="1"
                max="120"
                className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 block mb-1">Link to Goal (optional)</label>
              <select
                value={newTask.goalId || ''}
                onChange={(e) => setNewTask({ ...newTask, goalId: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
              >
                <option value="">No goal</option>
                {goals.filter(g => g.status === 'active').map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.emoji ? `${goal.emoji} ` : ''}{goal.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="flex-1 bg-self text-white py-1.5 rounded-lg text-sm font-semibold"
            >
              Add to Backlog
            </button>
            <button
              onClick={() => {
                setShowAddTask(false);
                setNewTask({ title: '', goalId: null, duration: 25 });
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Backlog</h3>
          <span className="text-xs text-gray-500">{backlogTasks.length} actions</span>
        </div>

        {backlogTasks.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">No actions in backlog. Add your first action!</p>
          </div>
        ) : (
          backlogTasks.map((task) => {
            const goal = getGoalForTask(task.goalId);

            return (
              <div
                key={task.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {task.duration || 25} min
                      </span>
                      {goal && (
                        <span className="text-xs text-story" title={goal.title}>
                          {goal.emoji ? `${goal.emoji} ` : '→ '}{goal.title}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Delete this action?')) {
                        deleteTask(task.id);
                      }
                    }}
                    className="px-3 bg-red-50 text-red-600 py-1 rounded text-xs border border-red-200 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
        <p className="font-semibold mb-1">Actions are:</p>
        <p>• Your repository of tasks ready to be scheduled</p>
        <p>• Each has a default duration for flow sessions</p>
        <p>• Optionally linked to goals for tracking progress</p>
        <p>• Added to your daily queue on the FLOW page</p>
      </div>
    </div>
  );
};

export default AlignActions;
