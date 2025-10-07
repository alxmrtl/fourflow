import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const SetupSelf = () => {
  const {
    tasks,
    goals,
    loadTasks,
    loadGoals,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToToday,
    moveTaskToBacklog,
    completeTask,
  } = useStore();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', goalId: null, status: 'backlog' });
  const [filter, setFilter] = useState('all'); // all, backlog, today, completed

  useEffect(() => {
    loadTasks();
    loadGoals();
  }, [loadTasks, loadGoals]);

  const handleAddTask = async () => {
    if (newTask.title.trim()) {
      await addTask(newTask);
      setNewTask({ title: '', goalId: null, status: 'backlog' });
      setShowAddTask(false);
    }
  };

  const getGoalTitle = (goalId) => {
    const goal = goals.find(g => g.id === goalId);
    return goal?.title || null;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const counts = {
    all: tasks.length,
    backlog: tasks.filter(t => t.status === 'backlog').length,
    today: tasks.filter(t => t.status === 'today').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-self">SELF - Manage Your Actions</h2>
        <p className="text-sm text-gray-600">Organize your task backlog and execution</p>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => setShowAddTask(true)}
        className="w-full bg-self text-white py-2 rounded-lg text-sm font-semibold"
      >
        + Add Task
      </button>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="bg-white border-2 border-self rounded-lg p-3 space-y-2">
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
            <option value="">No goal (optional)</option>
            {goals.filter(g => g.status === 'active').map(goal => (
              <option key={goal.id} value={goal.id}>{goal.title}</option>
            ))}
          </select>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-self focus:outline-none"
          >
            <option value="backlog">Add to Backlog</option>
            <option value="today">Add to Today</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="flex-1 bg-self text-white py-1.5 rounded-lg text-sm font-semibold"
            >
              Add Task
            </button>
            <button
              onClick={() => {
                setShowAddTask(false);
                setNewTask({ title: '', goalId: null, status: 'backlog' });
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All' },
          { id: 'backlog', label: 'Backlog' },
          { id: 'today', label: 'Today' },
          { id: 'completed', label: 'Done' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all
              ${filter === tab.id
                ? 'bg-self text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {tab.label} ({counts[tab.id]})
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">
              {filter === 'all' && 'No tasks yet. Add your first task!'}
              {filter === 'backlog' && 'No backlog tasks'}
              {filter === 'today' && 'No tasks for today'}
              {filter === 'completed' && 'No completed tasks'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const goal = getGoalTitle(task.goalId);

            return (
              <div
                key={task.id}
                className={`bg-white border-2 rounded-lg p-3 ${
                  task.status === 'completed' ? 'border-gray-200 opacity-75' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold ${task.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    {goal && (
                      <p className="text-xs text-story mt-0.5">→ {goal}</p>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                    task.status === 'today' ? 'bg-self/20 text-self' :
                    task.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {task.status === 'today' ? 'Today' : task.status === 'completed' ? 'Done' : 'Backlog'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 text-xs">
                  {task.status === 'backlog' && (
                    <button
                      onClick={() => moveTaskToToday(task.id)}
                      className="flex-1 bg-self/10 text-self py-1 rounded border border-self/30 hover:bg-self/20"
                    >
                      → Move to Today
                    </button>
                  )}
                  {task.status === 'today' && (
                    <>
                      <button
                        onClick={() => completeTask(task.id)}
                        className="flex-1 bg-green-50 text-green-700 py-1 rounded border border-green-200 hover:bg-green-100"
                      >
                        ✓ Complete
                      </button>
                      <button
                        onClick={() => moveTaskToBacklog(task.id)}
                        className="flex-1 bg-gray-100 text-gray-600 py-1 rounded border border-gray-200 hover:bg-gray-200"
                      >
                        ← Back to Backlog
                      </button>
                    </>
                  )}
                  {task.status === 'completed' && (
                    <button
                      onClick={() => moveTaskToBacklog(task.id)}
                      className="flex-1 bg-gray-100 text-gray-600 py-1 rounded border border-gray-200 hover:bg-gray-200"
                    >
                      Reopen
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm('Delete this task?')) {
                        deleteTask(task.id);
                      }
                    }}
                    className="px-3 bg-red-50 text-red-600 py-1 rounded border border-red-200 hover:bg-red-100"
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
        <p className="font-semibold mb-1">Task Flow:</p>
        <p><strong>Backlog</strong> → Tasks you want to do eventually</p>
        <p><strong>Today</strong> → Ready to work on in your FLOW page</p>
        <p><strong>Completed</strong> → Finished tasks (tracked in STATS)</p>
      </div>
    </div>
  );
};

export default SetupSelf;
