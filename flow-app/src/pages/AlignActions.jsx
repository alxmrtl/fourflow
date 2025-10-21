import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Action Card Component
const SortableActionCard = ({ action, onDelete, isNew }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: action.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Trigger haptic feedback on drag
  const handleDragStart = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Medium impact
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border-2 border-gray-200 rounded-lg p-3 flex items-center gap-3 group hover:border-gray-300 transition-colors ${
        isDragging ? 'shadow-lg scale-105' : ''
      } ${isNew ? 'animate-slide-in' : ''}`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        onPointerDown={handleDragStart}
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M8 6H8.01M12 6H12.01M8 10H8.01M12 10H12.01M8 14H8.01M12 14H12.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Action Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {action.title}
        </h3>
      </div>

      {/* Duration */}
      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
        {action.duration || 25} min
      </span>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="text-gray-300 hover:text-red-600 text-xl transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
        title="Delete action"
      >
        ×
      </button>
    </div>
  );
};

const AlignActions = () => {
  const {
    tasks,
    goals,
    loadTasks,
    loadGoals,
    addTask,
    updateTask,
    deleteTask,
    lastSelectedGoalId,
    setLastSelectedGoal,
  } = useStore();

  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const [newAction, setNewAction] = useState({ title: '', duration: 25 });
  const [justSaved, setJustSaved] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [newlyAddedActionId, setNewlyAddedActionId] = useState(null);
  const titleInputRef = useRef(null);
  const tabScrollRef = useRef(null);

  useEffect(() => {
    loadTasks();
    loadGoals();
  }, [loadTasks, loadGoals]);

  // Sync with lastSelectedGoalId from GOALS section
  useEffect(() => {
    const activeGoals = goals.filter(g => g.status === 'active');
    if (activeGoals.length > 0) {
      // Sync with lastSelectedGoalId or use first goal
      const goalToSelect = lastSelectedGoalId && activeGoals.find(g => g.id === lastSelectedGoalId)
        ? lastSelectedGoalId
        : activeGoals[0].id;

      if (goalToSelect !== selectedMissionId) {
        setSelectedMissionId(goalToSelect);
      }
    }
  }, [goals, lastSelectedGoalId]);

  // Auto-focus title input
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus({ preventScroll: true });
    }
  }, [selectedMissionId]);

  const activeGoals = goals.filter(g => g.status === 'active');
  const currentMissionActions = tasks
    .filter(t => t.goalId === selectedMissionId && t.status === 'backlog')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Drag and Drop Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddAction = async (e) => {
    e?.preventDefault();

    if (newAction.title.trim() && selectedMissionId) {
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }

      const newTaskData = {
        ...newAction,
        goalId: selectedMissionId,
        status: 'backlog',
        order: currentMissionActions.length,
      };

      await addTask(newTaskData);

      // Get the newly added task ID (it will be the last one)
      await loadTasks();
      const updatedActions = tasks.filter(
        t => t.goalId === selectedMissionId && t.status === 'backlog'
      );
      if (updatedActions.length > 0) {
        const newestAction = updatedActions[updatedActions.length - 1];
        setNewlyAddedActionId(newestAction.id);
        // Clear the animation flag after animation completes
        setTimeout(() => setNewlyAddedActionId(null), 400);
      }

      // Success animation
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 300);

      // Reset form
      setNewAction({ title: '', duration: 25 });

      // Increment session counter
      setActionCount(prev => prev + 1);

      // Refocus title input without scrolling
      if (titleInputRef.current) {
        titleInputRef.current.focus({ preventScroll: true });
      }
    }
  };

  const handleMissionSwitch = (missionId) => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(5);
    }

    setSelectedMissionId(missionId);
    setLastSelectedGoal(missionId);
    setNewAction({ title: '', duration: 25 });
  };

  const handleDeleteAction = async (actionId) => {
    if (window.confirm('Delete this action?')) {
      await deleteTask(actionId);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = currentMissionActions.findIndex(a => a.id === active.id);
      const newIndex = currentMissionActions.findIndex(a => a.id === over.id);

      const reorderedActions = arrayMove(currentMissionActions, oldIndex, newIndex);

      // Update order for all affected actions
      for (let i = 0; i < reorderedActions.length; i++) {
        await updateTask({ ...reorderedActions[i], order: i });
      }

      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }

      await loadTasks();
    }
  };

  const getActionCountForGoal = (goalId) => {
    return tasks.filter(t => t.goalId === goalId && t.status === 'backlog').length;
  };

  const selectedMission = activeGoals.find(g => g.id === selectedMissionId);

  return (
    <div className="space-y-3 pb-6">
      {/* Header - Compact */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3">
          {/* Colored Left Section */}
          <div className="bg-self text-white text-xs font-bold px-3 py-3 flex items-center justify-center whitespace-nowrap">
            ACTIONS
          </div>

          <div className="flex-1 flex items-center justify-between py-3 pr-3">
            <div className="flex items-center gap-2">
              {selectedMission && (
                <span className="text-sm font-semibold text-gray-700">
                  {selectedMission.emoji} {selectedMission.title}
                </span>
              )}
            </div>
            {actionCount > 0 && (
              <span className="text-xs text-gray-500">
                +{actionCount} this session
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Warning if no goals */}
      {activeGoals.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          ⚠️ Create at least one goal in the <strong>GOALS</strong> section first
        </div>
      )}

      {/* Quick Add Form - Persistent */}
      {selectedMissionId && (
        <form onSubmit={handleAddAction}>
          <div
            className={`bg-white border-2 rounded-lg p-3 space-y-2 transition-all ${
              justSaved ? 'border-green-400 shadow-lg' : 'border-story'
            }`}
          >
            <div className="flex gap-2">
              <input
                ref={titleInputRef}
                type="text"
                value={newAction.title}
                onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                placeholder="Action title..."
                className="flex-1 p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAction();
                  }
                }}
              />
              <input
                type="number"
                value={newAction.duration}
                onChange={(e) => setNewAction({ ...newAction, duration: parseInt(e.target.value) || 25 })}
                min="1"
                max="180"
                className="w-20 p-2 text-sm text-center border-2 border-gray-200 rounded-lg focus:border-story focus:outline-none"
              />
              <span className="text-xs text-gray-500 self-center whitespace-nowrap">min</span>
            </div>
            <button
              type="submit"
              disabled={!newAction.title.trim()}
              className="w-full bg-story text-white py-2 rounded-lg text-sm font-semibold hover:bg-story-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Action
            </button>
          </div>
        </form>
      )}

      {/* Actions List */}
      {selectedMissionId && (
        <div className="space-y-2">
          {currentMissionActions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">No actions yet</p>
              <p className="text-xs text-gray-400">Add your first action above ↑</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={currentMissionActions}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {currentMissionActions.map(action => (
                    <SortableActionCard
                      key={action.id}
                      action={action}
                      onDelete={() => handleDeleteAction(action.id)}
                      isNew={action.id === newlyAddedActionId}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}
    </div>
  );
};

export default AlignActions;
