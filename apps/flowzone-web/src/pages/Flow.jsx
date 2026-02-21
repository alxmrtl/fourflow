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

  const bgColor = type === 'error' ? 'bg-red-500/90' : type === 'success' ? 'bg-gradient-to-r from-self to-spirit' : 'bg-story/90';

  return (
    <div className={`fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 ${bgColor} backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg z-50 text-xs font-medium transition-all duration-300 border border-white/10 ${
      isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-fade-in'
    }`}>
      {message}
    </div>
  );
};

// Sortable Action Card Component
const SortableActionCard = ({ task, onStartFlow, onRemove, isInToday = false, isNextInLine = false, onMoveUp, onMoveDown, canMoveUp = true, canMoveDown = true }) => {
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
      className={`group/item rounded-xl transition-all relative ${
        isInToday && !isNextInLine
          ? 'card-glass border-self/30 shadow-lg shadow-self/10'
          : isInToday && isNextInLine
          ? 'card-glass-self border-self/50'
          : 'card-glass hover:border-glass-border-light'
      }`}
    >
      {/* Play Icon Indicator - Only for next in line */}
      {isNextInLine && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-self text-sm animate-breathe-zen flex items-center justify-center">
          ▶
        </div>
      )}

      <div className={`flex items-center gap-2 py-1.5 ${isNextInLine ? 'pl-8 pr-2.5' : 'px-2.5'}`}>
        {/* Drag Handle - Desktop Only */}
        <button
          {...attributes}
          {...listeners}
          className="hidden md:flex flex-shrink-0 text-ivory/30 hover:text-ivory/60 cursor-grab active:cursor-grabbing opacity-0 group-hover/item:opacity-100 transition-opacity"
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
            <h3 className="text-xs font-medium text-ivory truncate">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-semibold ${isInToday ? 'text-self' : 'text-self/60'}`}>
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
                          ? 'text-ivory/50 hover:text-ivory hover:bg-glass-light active:bg-glass'
                          : 'text-ivory/20 cursor-not-allowed'
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
                          ? 'text-ivory/50 hover:text-ivory hover:bg-glass-light active:bg-glass'
                          : 'text-ivory/20 cursor-not-allowed'
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
                className="text-ivory/30 hover:text-self text-xs transition-colors md:opacity-0 md:group-hover/item:opacity-100"
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
    <div className="bg-glass border-2 border-dashed border-self/20 rounded-xl py-2 px-2.5 flex items-center justify-center transition-all hover:border-self/40 hover:bg-glass-light">
      <p className="text-xs text-ivory/40 font-medium">
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
        {/* FourFlow Header - Gradient Journey Bar */}
        <div className="flex items-center gap-4 px-6 py-2 bg-darker/80 backdrop-blur-md border-b border-glass-border">
          <h1 className="text-xs font-medium text-ivory/80 leading-tight tracking-wide">
            <span className="font-semibold text-spirit">VISION</span>
            <span className="text-ivory/30 mx-1.5">→</span>
            <span className="font-semibold text-story">MISSION</span>
            <span className="text-ivory/30 mx-1.5">→</span>
            <span className="font-semibold text-space">SETUP</span>
            <span className="text-ivory/30 mx-1.5">→</span>
            <span className="font-semibold text-self">ACTION</span>
            <span className="text-ivory/30 mx-1.5">→</span>
            <span className="font-bold bg-gradient-to-r from-spirit via-story via-space to-self bg-clip-text text-transparent">FLOW</span>
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
            className="flex-1 flex flex-col overflow-hidden -mx-0 relative"
          >
            {/* Subtle self glow at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-self/5 to-transparent pointer-events-none" />

            {/* Header with Logo, Title, and Mission */}
            <div className="px-6 py-2.5 relative z-10">
              <div className="flex items-center gap-3">
                {/* Left: ACTION Header */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <img
                    src="/FOCUSED BODY.png"
                    alt="Action"
                    className="w-6 h-6 object-contain flex-shrink-0"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255, 111, 97, 0.4))' }}
                  />
                  <h2 className="text-xs font-semibold tracking-wide text-self uppercase">Action</h2>
                </div>

                {/* Mission Pill */}
                {selectedGoalId && selectedGoal && (
                  <div className="inline-flex px-2.5 py-0.5 bg-story/80 backdrop-blur-sm rounded-lg text-[10px] font-medium flex items-center gap-1.5 border border-story/30">
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
                    <div className="flex-shrink-0 mb-2 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-self animate-breathe-zen"></div>
                          <p className="text-[10px] font-bold text-self uppercase tracking-wider">Today</p>
                        </div>
                        <div className="flex items-center gap-2 relative">
                          {/* Daily Action Count Setting */}
                          {selectedGoalId && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 card-glass-space rounded-lg">
                              <span className="text-[9px] font-semibold text-space uppercase tracking-wide">Daily</span>
                              <div className="flex gap-0.5">
                                {[1, 2, 3].map(num => (
                                  <button
                                    key={num}
                                    onClick={() => handleDailyActionCountChange(num)}
                                    className={`w-5 h-5 text-[10px] font-bold rounded transition-all ${
                                      dailyActionCount === num
                                        ? 'bg-space text-white'
                                        : 'bg-glass text-ivory/40 hover:bg-glass-light hover:text-space'
                                    }`}
                                  >
                                    {num}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          <button
                            id="start-flow-button"
                            onClick={() => handleStartFlow(firstTodayAction)}
                            disabled={!firstTodayAction}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-bold transition-all uppercase tracking-wide flex items-center gap-1.5 ${
                              firstTodayAction
                                ? 'btn-primary shadow-lg shadow-spirit/20'
                                : 'bg-glass text-ivory/30 cursor-not-allowed border border-glass-border'
                            }`}
                          >
                            <span className="text-xs">▶</span>
                            <span>Enter Flow</span>
                          </button>
                        </div>
                      </div>

                      {/* TODAY Slots with Drag and Drop */}
                      <DroppableContainer id="today" className="space-y-2 relative">
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
                                  isNextInLine={index === 0}
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
                    <div className="flex-1 flex flex-col overflow-hidden min-h-0 mb-3 relative z-10">
                      <div className="flex-shrink-0 flex items-center gap-2 mb-2 pb-1 border-t border-glass-border pt-2">
                        <p className="text-[10px] font-semibold text-ivory/50 uppercase tracking-wider">
                          To-Do ({todoTasks.length})
                        </p>
                      </div>

                      <DroppableContainer id="todo" className="flex-1 overflow-hidden card-glass p-3">
                        <SortableContext
                          items={todoTasks.map(a => a.id)}
                          strategy={verticalListSortingStrategy}
                          id="todo"
                        >
                          {todoTasks.length > 0 ? (
                            <div className="h-full overflow-y-auto space-y-1.5 pr-1 scrollbar-hide">
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
                              <p className="text-xs text-ivory/30 font-medium">No actions yet — add one above</p>
                            </div>
                          )}
                        </SortableContext>
                      </DroppableContainer>
                    </div>
                  </div>
                </DndContext>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-ivory/40">← Select a mission to view actions</p>
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
