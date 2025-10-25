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
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import FlowSpiritPanel from '../components/FlowSpiritPanel';
import FlowGoalFilter from '../components/FlowGoalFilter';
import QuickAddAction from '../components/QuickAddAction';
import SetupBar from '../components/SetupBar';

// Toast Notification Component
const Toast = ({ message, type = 'info', onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500); // Start fade-out after 2.5s

    const closeTimer = setTimeout(onClose, 3000); // Close after 3s

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-self' : 'bg-blue-500';

  return (
    <div className={`fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 ${bgColor} text-white px-3 py-1.5 rounded-lg shadow-lg z-50 text-xs font-medium transition-all duration-300 ${
      isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-fade-in'
    }`}>
      {message}
    </div>
  );
};

// Sortable Action Card Component
const SortableActionCard = ({ task, onStartFlow, onRemove, isInToday = false, onMoveUp, onMoveDown, canMoveUp = true, canMoveDown = true }) => {
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
      <div className="flex items-center gap-2 py-1 px-2.5">
        {/* Drag Handle - Desktop Only */}
        <button
          {...attributes}
          {...listeners}
          className="hidden md:flex flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover/item:opacity-100 transition-opacity"
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

              {/* Mobile Reordering Buttons */}
              {(onMoveUp || onMoveDown) && (
                <div className="flex md:hidden gap-0.5">
                  {onMoveUp && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveUp();
                      }}
                      disabled={!canMoveUp}
                      className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                        canMoveUp
                          ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                      aria-label="Move up"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 3l-5 5h3v5h4V8h3z" />
                      </svg>
                    </button>
                  )}
                  {onMoveDown && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveDown();
                      }}
                      disabled={!canMoveDown}
                      className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                        canMoveDown
                          ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                      aria-label="Move down"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 13l5-5h-3V3H6v5H3z" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Remove Button - Always visible on mobile, hover on desktop */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="text-gray-400 hover:text-red-600 text-xs transition-colors md:opacity-0 md:group-hover/item:opacity-100"
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
    <div className="bg-gradient-to-br from-self/5 to-self/10 border-2 border-dashed border-self/30 rounded-lg py-1 px-2.5 flex items-center justify-center transition-all hover:border-self/50 hover:bg-self/15">
      <p className="text-xs text-self/60 font-medium">
        <span className="hidden md:inline">Drag action here</span>
        <span className="md:hidden">Tap action below to add</span>
      </p>
    </div>
  );
};

// Droppable Container Component
const DroppableContainer = ({ id, children, className = '' }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
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
  const [toast, setToast] = useState(null);

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
      setTodayActions([]);
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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    // Get source and destination containers
    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    const activeId = active.id;
    const overId = over.id;

    // Find the dragged task
    const activeTask = [...todayActions, ...todoTasks].find(t => t.id === activeId);
    if (!activeTask) return;

    // Case 1: Dragging within TODAY
    if (activeContainer === 'today' && overContainer === 'today') {
      if (activeId !== overId) {
        setTodayActions((items) => {
          const oldIndex = items.findIndex((item) => item.id === activeId);
          const newIndex = items.findIndex((item) => item.id === overId);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
    // Case 2: Dragging within TO-DO
    else if (activeContainer === 'todo' && overContainer === 'todo') {
      if (activeId !== overId) {
        const oldIndex = todoTasks.findIndex(a => a.id === activeId);
        const newIndex = todoTasks.findIndex(a => a.id === overId);
        const reorderedActions = arrayMove(todoTasks, oldIndex, newIndex);

        // Update order for all todo actions
        for (let i = 0; i < reorderedActions.length; i++) {
          await updateTask({ ...reorderedActions[i], order: i + todayActions.length });
        }
        await loadTasks();
      }
    }
    // Case 3: Moving from TO-DO to TODAY
    else if (activeContainer === 'todo' && overContainer === 'today') {
      if (todayActions.length >= dailyActionCount) {
        return; // Respect daily action limit
      }
      setTodayActions(prev => [...prev, activeTask]);
    }
    // Case 4: Moving from TODAY back to TO-DO
    else if (activeContainer === 'today' && overContainer === 'todo') {
      setTodayActions(prev => prev.filter(t => t.id !== activeId));
    }
  };

  const handleMoveToToday = (taskId) => {
    if (todayActions.length >= dailyActionCount) {
      setToast({ message: 'Today is full. Remove an action first.', type: 'error' });
      return;
    }
    const task = todoTasks.find(t => t.id === taskId);
    if (task) {
      setTodayActions(prev => [...prev, task]);
      setToast({ message: 'Added to Today', type: 'success' });
    }
  };

  const handleMoveToTodo = (taskId) => {
    setTodayActions(prev => prev.filter(t => t.id !== taskId));
  };

  // Mobile reordering handlers for TODAY section
  const handleMoveTodayUp = (taskId) => {
    setTodayActions(prev => {
      const index = prev.findIndex(t => t.id === taskId);
      if (index <= 0) return prev;
      const newArray = [...prev];
      [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      return newArray;
    });
  };

  const handleMoveTodayDown = (taskId) => {
    setTodayActions(prev => {
      const index = prev.findIndex(t => t.id === taskId);
      if (index < 0 || index >= prev.length - 1) return prev;
      const newArray = [...prev];
      [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];
      return newArray;
    });
  };

  // Mobile reordering handlers for TODO section
  const handleMoveTodoUp = async (taskId) => {
    const index = todoTasks.findIndex(t => t.id === taskId);
    if (index <= 0) return;

    const newArray = arrayMove(todoTasks, index, index - 1);

    // Update order for affected tasks
    for (let i = 0; i < newArray.length; i++) {
      await updateTask({ ...newArray[i], order: i + todayActions.length });
    }
    await loadTasks();
  };

  const handleMoveTodoDown = async (taskId) => {
    const index = todoTasks.findIndex(t => t.id === taskId);
    if (index < 0 || index >= todoTasks.length - 1) return;

    const newArray = arrayMove(todoTasks, index, index + 1);

    // Update order for affected tasks
    for (let i = 0; i < newArray.length; i++) {
      await updateTask({ ...newArray[i], order: i + todayActions.length });
    }
    await loadTasks();
  };

  return (
    <div className="max-w-4xl mx-auto h-[100dvh] flex flex-col overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        {/* FourFlow Header */}
        <div className="flex items-center gap-4 px-6 py-1.5 bg-charcoal shadow-md">
          <h1 className="text-xs font-medium text-ivory leading-tight">
            <span className="font-semibold text-spirit" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(122, 77, 164, 0.4)' }}>VISION</span> → <span className="font-semibold text-story" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(91, 132, 177, 0.4)' }}>MISSION</span> → <span className="font-semibold text-space" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(107, 162, 146, 0.4)' }}>SETUP</span> → <span className="font-semibold text-self" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 111, 97, 0.4)' }}>ACTION</span> → <span className="font-bold"><span className="text-spirit" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(122, 77, 164, 0.4)' }}>F</span><span className="text-story" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(91, 132, 177, 0.4)' }}>L</span><span className="text-space" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(107, 162, 146, 0.4)' }}>O</span><span className="text-self" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 111, 97, 0.4)' }}>W</span></span>
          </h1>
        </div>

        {/* Content Area with Padding */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 px-6">
            {/* SPIRIT Panel */}
            <FlowSpiritPanel />
          </div>

          {/* MISSION Panel */}
          <div className="flex-shrink-0 -mx-0">
            <FlowGoalFilter
              selectedGoalId={selectedGoalId}
              onGoalSelect={handleGoalSelect}
            />
          </div>

          {/* SETUP Bar */}
          <div className="flex-shrink-0 -mx-0">
            <SetupBar />
          </div>

          {/* ACTION Panel */}
          <div
            className="flex-1 flex flex-col overflow-hidden -mx-0 shadow-sm animate-gradient-flow"
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
                    style={{ filter: 'drop-shadow(0 0.5px 1px rgba(0, 0, 0, 0.4))' }}
                  />
                  <h2 className="text-xs font-semibold tracking-wide text-self uppercase">Action</h2>
                </div>

                {/* Mission Pill */}
                {selectedGoalId && selectedGoal && (
                  <div className="inline-flex px-2.5 py-0.5 bg-story rounded-lg text-[10px] font-medium flex items-center gap-1.5">
                    <span>{selectedGoal.emoji}</span>
                    <span className="text-white">{selectedGoal.title}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden px-6 pb-6">
              {selectedGoalId ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* TODAY Section */}
                    <div className="flex-shrink-0 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-self animate-pulse"></div>
                          <p className="text-[10px] font-bold text-self uppercase tracking-wider">Today</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Daily Action Count Setting */}
                          {selectedGoalId && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg border border-space/30 hover:border-space/50 transition-all">
                              <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Daily Actions</span>
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
                          <button
                            onClick={() => handleStartFlow(firstTodayAction)}
                            disabled={!firstTodayAction}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-colors uppercase tracking-wide shadow-md ${
                              firstTodayAction
                                ? 'bg-self text-white hover:bg-self/90 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Start Flow
                          </button>
                        </div>
                      </div>

                      {/* TODAY Slots with Drag and Drop */}
                      <DroppableContainer id="today" className="space-y-2">
                        <SortableContext
                          items={todayActions.map(a => a.id)}
                          strategy={verticalListSortingStrategy}
                          id="today"
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
                                  onMoveUp={() => handleMoveTodayUp(action.id)}
                                  onMoveDown={() => handleMoveTodayDown(action.id)}
                                  canMoveUp={index > 0}
                                  canMoveDown={index < todayActions.length - 1}
                                />
                              ) : (
                                <EmptyTodaySlot key={`empty-${index}`} slotIndex={index} />
                              );
                            })}
                          </div>
                        </SortableContext>
                      </DroppableContainer>
                    </div>

                    {/* Quick Add Action - Between TODAY and TO-DO */}
                    {selectedGoalId && (
                      <div className="flex-shrink-0 py-1.5">
                        <QuickAddAction
                          selectedGoalId={selectedGoalId}
                          onActionAdded={loadTasks}
                          compact={true}
                        />
                      </div>
                    )}

                    {/* TO-DO Section - Always Visible */}
                    <div className="flex-1 flex flex-col overflow-hidden min-h-0 mb-3">
                      <div className="flex-shrink-0 flex items-center gap-2 mb-2 pb-1 border-t border-self/20 pt-2">
                        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                          To-Do ({todoTasks.length})
                        </p>
                      </div>

                      <DroppableContainer id="todo" className="flex-1 overflow-hidden bg-white/50 border border-gray-300 rounded-lg p-3">
                        <SortableContext
                          items={todoTasks.map(a => a.id)}
                          strategy={verticalListSortingStrategy}
                          id="todo"
                        >
                          {todoTasks.length > 0 ? (
                            <div className="h-full overflow-y-auto space-y-1.5 pr-1">
                              {todoTasks.map((task, index) => (
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
                                    onMoveUp={() => handleMoveTodoUp(task.id)}
                                    onMoveDown={() => handleMoveTodoDown(task.id)}
                                    canMoveUp={index > 0}
                                    canMoveDown={index < todoTasks.length - 1}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <p className="text-xs text-gray-400 font-medium">No actions yet — add one above</p>
                            </div>
                          )}
                        </SortableContext>
                      </DroppableContainer>
                    </div>
                  </div>
                </DndContext>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">← Select a mission to view actions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Flow;
