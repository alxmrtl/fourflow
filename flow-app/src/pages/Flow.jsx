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
import QuickAddAction from '../components/QuickAddAction';
import SetupBar from '../components/SetupBar';

// Sortable Action Card Component
const SortableActionCard = ({ task, onStartFlow, onRemove, showStartButton = false, isNextUp = false }) => {
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
      className={`group/item rounded-lg transition-all ${
        isNextUp ? 'bg-white/90 backdrop-blur-sm border border-self shadow-md shadow-self/20 p-2' : 'py-2 px-3 hover:bg-self/5'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover/item:opacity-100 transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5" cy="3" r="1.5" />
            <circle cx="11" cy="3" r="1.5" />
            <circle cx="5" cy="8" r="1.5" />
            <circle cx="11" cy="8" r="1.5" />
            <circle cx="5" cy="13" r="1.5" />
            <circle cx="11" cy="13" r="1.5" />
          </svg>
        </button>

        {/* Bullet Point for non-next-up items */}
        {!isNextUp && <span className="text-sm text-self">•</span>}

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-normal text-gray-800 truncate">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] text-self/60">[{task.duration || 25}min]</span>
              <button
                onClick={onRemove}
                className="text-gray-400 hover:text-red-600 text-xs transition-colors opacity-0 group-hover/item:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start Flow Button - Only for Next Up */}
      {showStartButton && (
        <button
          onClick={onStartFlow}
          className="w-full bg-self text-white py-2 rounded-lg text-xs font-semibold hover:bg-self/90 transition-colors mt-2"
        >
          Start Flow
        </button>
      )}
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
      <div className="space-y-0">
        {/* FourFlow Header */}
        <div className="flex items-center gap-4 mb-3 -mx-6 px-6 py-2">
          <img
            src="/logos/FOURFLOW - MAIN LOGO.png"
            alt="FourFlow"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <h1 className="text-sm font-medium text-gray-700 leading-tight">
            Align <span className="font-semibold text-spirit">VISION</span>, <span className="font-semibold text-story">MISSION</span>, <span className="font-semibold text-space">SETUP</span> and <span className="font-semibold text-self">ACTION</span> into <span className="font-bold text-gray-900">FLOW</span>.
          </h1>
        </div>

        {/* SPIRIT Panel */}
        <FlowSpiritPanel />

        {/* MISSION Panel */}
        <div className="-mx-6">
          <FlowGoalFilter
            selectedGoalId={selectedGoalId}
            onGoalSelect={handleGoalSelect}
          />
        </div>

        {/* SETUP Bar */}
        <div className="-mx-6">
          <SetupBar />
        </div>

        {/* ACTION Panel */}
        <div
          className="overflow-hidden -mx-6 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.10) 50%, rgba(234, 88, 12, 0.08) 100%)',
          }}
        >
          {/* Header with Logo and Title */}
          <div className="px-6 py-2.5 flex items-center gap-2">
            <img
              src="/FOCUSED BODY.png"
              alt="Action"
              className="w-6 h-6 object-contain flex-shrink-0"
            />
            <h2 className="text-xs font-semibold tracking-wide text-self uppercase">Action</h2>
            {selectedGoalId && goals.find(g => g.id === selectedGoalId) && (
              <div className="ml-2 px-3 py-1 bg-story text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm">
                <span>{goals.find(g => g.id === selectedGoalId).emoji}</span>
                <span>{goals.find(g => g.id === selectedGoalId).title}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-6 pb-3 space-y-3">
            {selectedGoalId ? (
              <>
                {/* Quick Add Action - Narrow Expandable */}
                <QuickAddAction
                  selectedGoalId={selectedGoalId}
                  onActionAdded={loadTasks}
                />

                {/* Next Up - First in Queue */}
                {nextUpTask && (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-self animate-pulse"></div>
                      <p className="text-[9px] font-bold text-self uppercase tracking-wider">Next Up</p>
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
                        <SortableActionCard
                          task={nextUpTask}
                          onStartFlow={() => handleStartFlow(nextUpTask)}
                          onRemove={() => handleDeleteTask(nextUpTask.id)}
                          showStartButton={true}
                          isNextUp={true}
                        />
                      </SortableContext>
                    </DndContext>
                  </div>
                )}

                {/* Backlog */}
                {backlogTasks.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[9px] font-semibold text-gray-600 uppercase tracking-wider">TODO ({backlogTasks.length})</p>
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
                        <div className="space-y-1.5">
                          {backlogTasks.slice(0, 5).map(task => (
                            <SortableActionCard
                              key={task.id}
                              task={task}
                              onStartFlow={() => handleStartFlow(task)}
                              onRemove={() => handleDeleteTask(task.id)}
                              showStartButton={false}
                              isNextUp={false}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                    {backlogTasks.length > 5 && (
                      <button
                        onClick={() => setShowBacklog(true)}
                        className="w-full mt-1.5 py-1.5 text-[10px] text-self/70 hover:text-self font-medium transition-colors"
                      >
                        +{backlogTasks.length - 5} more
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">← Select a mission to view actions</p>
              </div>
            )}
          </div>
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
                backlogTasks.map(task => (
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
                        </div>
                      </div>
                      <span className="text-self text-xs font-semibold">Add</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
