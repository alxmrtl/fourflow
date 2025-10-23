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
const SortableActionCard = ({ task, onStartFlow, onRemove, isInToday = false }) => {
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
        isInToday
          ? 'bg-white/90 backdrop-blur-sm border-2 border-self/60 shadow-lg shadow-self/10'
          : 'bg-white/70 border border-gray-200 hover:border-self/40 hover:bg-self/5'
      }`}
    >
      <div className="flex items-center gap-2 p-2.5">
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

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-medium text-gray-800 truncate">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-semibold ${isInToday ? 'text-self' : 'text-self/70'}`}>
                {task.duration || 25}min
              </span>
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
    </div>
  );
};

// Empty TODAY Slot Component
const EmptyTodaySlot = ({ slotIndex }) => {
  return (
    <div className="bg-gradient-to-br from-self/5 to-self/10 border-2 border-dashed border-self/30 rounded-lg p-4 min-h-[60px] flex items-center justify-center transition-all hover:border-self/50 hover:bg-self/15">
      <p className="text-xs text-self/60 font-medium">Drag action here</p>
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
    updateGoalDailyActionCount,
  } = useStore();

  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [todayActions, setTodayActions] = useState([]);
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

  // Get selected goal
  const selectedGoal = goals.find(g => g.id === selectedGoalId);
  const dailyActionCount = selectedGoal?.dailyActionCount || 3;

  // Auto-fill TODAY slots when goal changes
  useEffect(() => {
    if (selectedGoalId) {
      const topActions = getTopActionsForGoal(selectedGoalId, dailyActionCount);
      setTodayActions(topActions);
    } else {
      setTodayActions([]);
    }
  }, [selectedGoalId, tasks, getTopActionsForGoal, dailyActionCount]);

  const handleGoalSelect = (goalId) => {
    setSelectedGoalId(goalId);
    setLastSelectedGoal(goalId);
  };

  const handleStartFlow = (task) => {
    if (!task) return;
    const duration = task.duration || settings.timerDuration || 25;
    startSession(task.id, duration);
    enterFocusMode();
  };

  const handleDailyActionCountChange = async (newCount) => {
    if (selectedGoalId) {
      await updateGoalDailyActionCount(selectedGoalId, newCount);
      // Adjust todayActions if needed
      if (newCount < todayActions.length) {
        setTodayActions(prev => prev.slice(0, newCount));
      }
    }
  };

  // Get all tasks for the selected goal
  const allGoalTasks = tasks
    .filter(t => t.status === 'backlog' && t.goalId === selectedGoalId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Separate TODAY from TO-DO
  const todayTaskIds = new Set(todayActions.map(t => t.id));
  const todoTasks = allGoalTasks.filter(t => !todayTaskIds.has(t.id));
  const firstTodayAction = todayActions[0];

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this action?')) {
      await deleteTask(taskId);
      await loadTasks();
      // Also remove from todayActions if present
      setTodayActions(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleDragEndToday = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setTodayActions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndTodo = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todoTasks.findIndex(a => a.id === active.id);
    const newIndex = todoTasks.findIndex(a => a.id === over.id);

    const reorderedActions = arrayMove(todoTasks, oldIndex, newIndex);

    // Update order for all todo actions
    for (let i = 0; i < reorderedActions.length; i++) {
      await updateTask({ ...reorderedActions[i], order: i + todayActions.length });
    }

    await loadTasks();
  };

  const handleMoveToToday = (taskId) => {
    if (todayActions.length >= dailyActionCount) return;
    const task = todoTasks.find(t => t.id === taskId);
    if (task) {
      setTodayActions(prev => [...prev, task]);
    }
  };

  const handleMoveToTodo = (taskId) => {
    setTodayActions(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-6">
      <div className="space-y-0">
        {/* FourFlow Header */}
        <div className="flex items-center gap-4 px-6 py-1.5 bg-charcoal shadow-md">
          <img
            src="/logos/FOURFLOW - MAIN LOGO.png"
            alt="FourFlow"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <h1 className="text-sm font-medium text-ivory leading-tight">
            Align <span className="font-semibold text-spirit" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(122, 77, 164, 0.4)' }}>VISION</span>, <span className="font-semibold text-story" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(91, 132, 177, 0.4)' }}>MISSION</span>, <span className="font-semibold text-space" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(107, 162, 146, 0.4)' }}>SETUP</span> and <span className="font-semibold text-self" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 111, 97, 0.4)' }}>ACTION</span> into <span className="font-bold text-ivory">FLOW</span>.
          </h1>
        </div>

        {/* Content Area with Padding */}
        <div className="px-6 pb-6">
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
            {/* Header with Logo, Title, and Mission */}
            <div className="px-6 py-2.5">
              <div className="flex items-center gap-3">
                {/* Left: ACTION Header */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <img
                    src="/FOCUSED BODY.png"
                    alt="Action"
                    className="w-6 h-6 object-contain flex-shrink-0"
                  />
                  <h2 className="text-xs font-semibold tracking-wide text-self uppercase">Action</h2>
                </div>

                {/* Mission Pill */}
                {selectedGoalId && selectedGoal && (
                  <div className="inline-flex px-2.5 py-0.5 bg-story rounded-full text-[10px] font-medium flex items-center gap-1.5">
                    <span>{selectedGoal.emoji}</span>
                    <span className="text-white">{selectedGoal.title}</span>
                  </div>
                )}

                {/* Daily Action Count Setting */}
                {selectedGoalId && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg border border-space/30 hover:border-space/50 transition-all">
                    <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Daily</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(num => (
                        <button
                          key={num}
                          onClick={() => handleDailyActionCountChange(num)}
                          className={`w-5 h-5 text-[10px] font-bold rounded transition-all ${
                            dailyActionCount === num
                              ? 'bg-space text-white'
                              : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-space'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Add Action */}
              {selectedGoalId && (
                <div className="mt-2">
                  <QuickAddAction
                    selectedGoalId={selectedGoalId}
                    onActionAdded={loadTasks}
                    compact={true}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 pb-3">
              {selectedGoalId ? (
                <div className="space-y-4">
                  {/* TODAY Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-self animate-pulse"></div>
                        <p className="text-[10px] font-bold text-self uppercase tracking-wider">Today</p>
                      </div>
                      {firstTodayAction && (
                        <button
                          onClick={() => handleStartFlow(firstTodayAction)}
                          className="px-3 py-1 bg-self text-white rounded-lg text-[10px] font-bold hover:bg-self/90 transition-colors uppercase tracking-wide shadow-md"
                        >
                          Start Flow
                        </button>
                      )}
                    </div>

                    {/* TODAY Slots with Drag and Drop */}
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEndToday}
                    >
                      <SortableContext
                        items={todayActions.map(a => a.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {Array.from({ length: dailyActionCount }).map((_, index) => {
                            const action = todayActions[index];
                            return action ? (
                              <SortableActionCard
                                key={action.id}
                                task={action}
                                onStartFlow={() => handleStartFlow(action)}
                                onRemove={() => handleMoveToTodo(action.id)}
                                isInToday={true}
                              />
                            ) : (
                              <EmptyTodaySlot key={`empty-${index}`} slotIndex={index} />
                            );
                          })}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>

                  {/* TO-DO Section */}
                  {todoTasks.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2 pb-1.5 border-t border-self/20 pt-3">
                        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                          To-Do ({todoTasks.length})
                        </p>
                      </div>

                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEndTodo}
                      >
                        <SortableContext
                          items={todoTasks.map(a => a.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                            {todoTasks.map(task => (
                              <div
                                key={task.id}
                                onClick={() => handleMoveToToday(task.id)}
                                className={todayActions.length >= dailyActionCount ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                              >
                                <SortableActionCard
                                  task={task}
                                  onStartFlow={() => handleStartFlow(task)}
                                  onRemove={() => handleDeleteTask(task.id)}
                                  isInToday={false}
                                />
                              </div>
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">← Select a mission to view actions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Flow;
