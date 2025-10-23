import { create } from 'zustand';
import { db } from '../lib/db';

export const useStore = create((set, get) => ({
  // Profile
  profile: null,
  loadProfile: async () => {
    const profile = await db.getProfile();
    set({ profile });
  },
  updateProfile: async (updates) => {
    const profile = { ...(get().profile || {}), ...updates };
    await db.saveProfile(profile);
    set({ profile });
  },

  // Values
  values: [],
  loadValues: async () => {
    const values = await db.getAllValues();
    set({ values });
  },
  addValue: async (value) => {
    await db.addValue(value);
    await get().loadValues();
  },
  removeValue: async (id) => {
    await db.deleteValue(id);
    await get().loadValues();
  },

  // Goals
  goals: [],
  loadGoals: async () => {
    const goals = await db.getAllGoals();
    set({ goals });
  },
  addGoal: async (goal) => {
    await db.addGoal(goal);
    await get().loadGoals();
  },
  updateGoal: async (goal) => {
    await db.updateGoal(goal);
    await get().loadGoals();
  },
  deleteGoal: async (id) => {
    await db.deleteGoal(id);
    await get().loadGoals();
  },

  // Tasks
  tasks: [],
  loadTasks: async () => {
    const tasks = await db.getAllTasks();
    set({ tasks });
  },
  addTask: async (task) => {
    await db.addTask(task);
    await get().loadTasks();
  },
  updateTask: async (task) => {
    await db.updateTask(task);
    await get().loadTasks();
  },
  deleteTask: async (id) => {
    await db.deleteTask(id);
    await get().loadTasks();
  },
  completeTask: async (id) => {
    const task = await db.getTask(id);
    await db.updateTask({ ...task, status: 'completed', completedAt: new Date().toISOString() });
    await get().loadTasks();
  },
  moveTaskToToday: async (taskId) => {
    await db.moveTaskToToday(taskId);
    await get().loadTasks();
  },
  moveTaskToBacklog: async (taskId) => {
    await db.moveTaskToBacklog(taskId);
    await get().loadTasks();
  },
  getTodayTasks: () => {
    return get().tasks.filter(t => t.status === 'today');
  },
  getBacklogTasks: () => {
    return get().tasks.filter(t => t.status === 'backlog');
  },
  getCompletedTasks: () => {
    return get().tasks.filter(t => t.status === 'completed');
  },
  getTopActionsForGoal: (goalId, limit = 3) => {
    const { tasks } = get();
    return tasks
      .filter(t => t.status === 'backlog' && t.goalId === goalId)
      .slice(0, limit);
  },

  // Sessions
  sessions: [],
  currentSession: null,
  loadSessions: async () => {
    const sessions = await db.getAllSessions();
    set({ sessions });
  },
  startSession: (taskId, duration) => {
    set({
      currentSession: {
        taskId,
        duration,
        startTime: Date.now(),
        reps: 0,
        isPaused: false,
        timeRemaining: duration * 60,
      },
    });
  },
  pauseSession: () => {
    const session = get().currentSession;
    if (session) {
      set({ currentSession: { ...session, isPaused: true } });
    }
  },
  resumeSession: () => {
    const session = get().currentSession;
    if (session) {
      set({ currentSession: { ...session, isPaused: false } });
    }
  },
  updateSessionTime: (timeRemaining) => {
    const session = get().currentSession;
    if (session) {
      set({ currentSession: { ...session, timeRemaining } });
    }
  },
  incrementReps: () => {
    const session = get().currentSession;
    if (session) {
      set({ currentSession: { ...session, reps: session.reps + 1 } });
    }
  },
  endSession: async (sessionData) => {
    const session = get().currentSession;
    if (session) {
      await db.addSession({
        taskId: session.taskId,
        plannedDuration: session.duration,
        actualDuration: Math.round((Date.now() - session.startTime) / 1000 / 60),
        reps: session.reps,
        ...sessionData,
      });
      await get().loadSessions();
      set({ currentSession: null });
    }
  },
  cancelSession: () => {
    set({ currentSession: null });
  },

  // Settings
  settings: {
    timerDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sound: 'silence',
    volume: 0.5,
    breathworkBefore: false,
    breathworkAfter: false,
    backgroundSound: 'silence',
  },
  loadSettings: async () => {
    const settings = await db.getSettings();
    set({ settings });
  },
  updateSettings: async (updates) => {
    const settings = { ...get().settings, ...updates };
    await db.saveSettings(settings);
    set({ settings });
  },

  // Daily Queue
  dailyQueue: null,
  loadDailyQueue: async () => {
    const queue = await db.getDailyQueue();
    set({ dailyQueue: queue });
  },
  updateDailyQueue: async (queue) => {
    await db.saveDailyQueue(queue);
    set({ dailyQueue: queue });
  },
  addTaskToQueue: async (slotId, taskId) => {
    const queue = get().dailyQueue;
    const updatedSlots = queue.slots.map(slot =>
      slot.id === slotId ? { ...slot, taskId } : slot
    );
    await get().updateDailyQueue({ ...queue, slots: updatedSlots });
  },
  removeTaskFromQueue: async (slotId) => {
    const queue = get().dailyQueue;
    const updatedSlots = queue.slots.map(slot =>
      slot.id === slotId ? { ...slot, taskId: null } : slot
    );
    await get().updateDailyQueue({ ...queue, slots: updatedSlots });
  },
  addQueueSlot: async () => {
    const queue = get().dailyQueue;
    const newSlot = { id: queue.slots.length + 1, taskId: null };
    await get().updateDailyQueue({ ...queue, slots: [...queue.slots, newSlot] });
  },
  removeQueueSlot: async (slotId) => {
    const queue = get().dailyQueue;
    const updatedSlots = queue.slots.filter(slot => slot.id !== slotId);
    await get().updateDailyQueue({ ...queue, slots: updatedSlots });
  },

  // UI State
  currentPage: 'flow',
  currentSetupSection: 'actions',
  isInFocusMode: false,
  lastSelectedGoalId: null,
  setCurrentPage: (page) => set({ currentPage: page }),
  setCurrentSetupSection: (section) => set({ currentSetupSection: section }),
  enterFocusMode: () => set({ isInFocusMode: true }),
  exitFocusMode: () => set({ isInFocusMode: false }),
  setLastSelectedGoal: (goalId) => {
    set({ lastSelectedGoalId: goalId });
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSelectedGoalId', String(goalId));
    }
  },
  loadLastSelectedGoal: () => {
    if (typeof window !== 'undefined') {
      const goalId = localStorage.getItem('lastSelectedGoalId');
      if (goalId) {
        set({ lastSelectedGoalId: parseInt(goalId) });
      }
    }
  },

  // Initialize all data
  initializeApp: async () => {
    await Promise.all([
      get().loadProfile(),
      get().loadValues(),
      get().loadGoals(),
      get().loadTasks(),
      get().loadSessions(),
      get().loadSettings(),
      get().loadDailyQueue(),
    ]);
  },
}));
