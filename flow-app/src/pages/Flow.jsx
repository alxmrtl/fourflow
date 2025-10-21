import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FlowSpiritPanel from '../components/FlowSpiritPanel';
import FlowGoalFilter from '../components/FlowGoalFilter';
import FlowSetupPanel from '../components/FlowSetupPanel';
import QuickAddAction from '../components/QuickAddAction';

// Sortable Action Card Component
const SortableActionCard = ({ task, goal, onStartFlow, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-self/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing mt-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5" cy="3" r="1.5" />
            <circle cx="11" cy="3" r="1.5" />
            <circle cx="5" cy="8" r="1.5" />
            <circle cx="11" cy="8" r="1.5" />
            <circle cx="5" cy="13" r="1.5" />
            <circle cx="11" cy="13" r="1.5" />
          </svg>
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {task.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{task.duration || 25} min</span>
                {goal && (
                  <span className="flex items-center gap-1 text-story">
                    <span className="text-base">{goal.emoji || '🎯'}</span>
                    <span className="font-medium">{goal.title}</span>
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-600 text-sm transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Start Flow Button */}
          <button
            onClick={onStartFlow}
            className="w-full bg-self text-white py-2 rounded-lg text-sm font-semibold hover:bg-self/90 transition-colors"
          >
            Start Flow
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty Slot Component
const EmptySlot = ({ onAddAction }) => {
  return (
    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
      <button
        onClick={onAddAction}
        className="w-full text-center text-sm text-gray-500 hover:text-self transition-colors"
      >
        + Add Action
      </button>
    </div>
  );
};

const Flow = () => {
  const {
    tasks,
    goals,
    settings,
    profile,
    lastSelectedGoalId,
    loadTasks,
    loadGoals,
    loadSettings,
    loadProfile,
    loadLastSelectedGoal,
    setLastSelectedGoal,
    getTopActionsForGoal,
    startSession,
    enterFocusMode,
    updateTask,
    deleteTask,
  } = useStore();

  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [queuedActions, setQueuedActions] = useState([]);
  const [showBacklog, setShowBacklog] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load data on mount
  useEffect(() => {
    const initialize = async () => {
      await Promise.all([
        loadTasks(),
        loadGoals(),
        loadSettings(),
        loadProfile(),
      ]);
      loadLastSelectedGoal();
    };
    initialize();
  }, [loadTasks, loadGoals, loadSettings, loadProfile, loadLastSelectedGoal]);

  // Set initial goal selection
  useEffect(() => {
    const activeGoals = goals.filter(g => g.status === 'active');

    if (activeGoals.length === 0) {
      setSelectedGoalId(null);
      setQueuedActions([]);
      return;
    }

    // Use last selected goal if it exists and is still active
    if (lastSelectedGoalId && activeGoals.find(g => g.id === lastSelectedGoalId)) {
      setSelectedGoalId(lastSelectedGoalId);
    } else {
      // Otherwise use first active goal
      setSelectedGoalId(activeGoals[0].id);
      setLastSelectedGoal(activeGoals[0].id);
    }
  }, [goals, lastSelectedGoalId, setLastSelectedGoal]);

  // Auto-fill queue when goal changes
  useEffect(() => {
    if (selectedGoalId) {
      const topActions = getTopActionsForGoal(selectedGoalId, 3);
      setQueuedActions(topActions);
    } else {
      setQueuedActions([]);
    }
  }, [selectedGoalId, tasks, getTopActionsForGoal]);

  const handleGoalSelect = (goalId) => {
    setSelectedGoalId(goalId);
    setLastSelectedGoal(goalId);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setQueuedActions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleStartFlow = (task) => {
    if (!task) return;
    const duration = task.duration || settings.timerDuration || 25;
    startSession(task.id, duration);
    enterFocusMode();
  };

  const handleRemoveFromQueue = (taskId) => {
    setQueuedActions(prev => prev.filter(t => t.id !== taskId));
  };

  const handleAddFromBacklog = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && queuedActions.length < 3) {
      setQueuedActions(prev => [...prev, task]);
      setShowBacklog(false);
    }
  };

  const getGoalForTask = (goalId) => {
    return goals.find(g => g.id === goalId);
  };

  const allGoalTasks = tasks
    .filter(t => t.status === 'backlog' && t.goalId === selectedGoalId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const nextUpTask = allGoalTasks.length > 0 ? allGoalTasks[0] : null;
  const backlogTasks = allGoalTasks.slice(1);

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this action?')) {
      await deleteTask(taskId);
      await loadTasks();
    }
  };

  const handleDragEndBacklog = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = allGoalTasks.findIndex(a => a.id === active.id);
      const newIndex = allGoalTasks.findIndex(a => a.id === over.id);

      const reorderedActions = arrayMove(allGoalTasks, oldIndex, newIndex);

      // Update order for all affected actions
      for (let i = 0; i < reorderedActions.length; i++) {
        await updateTask({ ...reorderedActions[i], order: i });
      }

      await loadTasks();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 md:pb-6">
      <div className="space-y-4">
        {/* SPIRIT Panel */}
        <FlowSpiritPanel />

        {/* GOAL Filter */}
        <FlowGoalFilter
          selectedGoalId={selectedGoalId}
          onGoalSelect={handleGoalSelect}
        />

        {/* SETUP Panel */}
        <FlowSetupPanel />

        {/* Next Up Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-self">SELF · ACTIONS</h2>

          {selectedGoalId ? (
            <div className="space-y-4">
              {/* Primary Action - Next Up */}
              {nextUpTask && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Next Up</p>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEndBacklog}
                  >
                    <SortableContext
                      items={allGoalTasks.map(a => a.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <SortableActionCard
                        task={nextUpTask}
                        goal={getGoalForTask(nextUpTask.goalId)}
                        onStartFlow={() => handleStartFlow(nextUpTask)}
                        onRemove={() => handleDeleteTask(nextUpTask.id)}
                      />
                    </SortableContext>
                  </DndContext>
                </div>
              )}

              {/* Quick Add Action */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Quick Add</p>
                <QuickAddAction
                  selectedGoalId={selectedGoalId}
                  onActionAdded={loadTasks}
                />
              </div>

              {/* Backlog */}
              {backlogTasks.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-600">Backlog</p>
                    <span className="text-xs text-gray-400">{backlogTasks.length} action{backlogTasks.length !== 1 ? 's' : ''}</span>
                  </div>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEndBacklog}
                  >
                    <SortableContext
                      items={allGoalTasks.map(a => a.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {backlogTasks.slice(0, 5).map(task => (
                          <SortableActionCard
                            key={task.id}
                            task={task}
                            goal={getGoalForTask(task.goalId)}
                            onStartFlow={() => handleStartFlow(task)}
                            onRemove={() => handleDeleteTask(task.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  {backlogTasks.length > 5 && (
                    <button
                      onClick={() => setShowBacklog(true)}
                      className="w-full mt-2 py-2 text-xs text-self hover:text-self/80 font-medium transition-colors"
                    >
                      Show {backlogTasks.length - 5} more...
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Select a goal to see actions</p>
            </div>
          )}
        </div>
      </div>

      {/* Backlog Selection Modal */}
      {showBacklog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full md:max-w-2xl rounded-lg max-h-[70vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add from Backlog</h3>
              <button
                onClick={() => setShowBacklog(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {backlogTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">
                    No more actions available for this goal
                  </p>
                </div>
              ) : (
                backlogTasks.map(task => {
                  const goal = getGoalForTask(task.goalId);
                  return (
                    <button
                      key={task.id}
                      onClick={() => handleAddFromBacklog(task.id)}
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
                        <span className="text-self text-xs font-semibold">Add</span>
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
