import { openDB } from 'idb';

const DB_NAME = 'flowspace-db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // User Profile store
      if (!db.objectStoreNames.contains('profile')) {
        db.createObjectStore('profile', { keyPath: 'id' });
      }

      // Values store
      if (!db.objectStoreNames.contains('values')) {
        const valueStore = db.createObjectStore('values', { keyPath: 'id', autoIncrement: true });
        valueStore.createIndex('name', 'name');
      }

      // Goals store
      if (!db.objectStoreNames.contains('goals')) {
        const goalStore = db.createObjectStore('goals', { keyPath: 'id', autoIncrement: true });
        goalStore.createIndex('status', 'status');
        goalStore.createIndex('createdAt', 'createdAt');
      }

      // Tasks store
      if (!db.objectStoreNames.contains('tasks')) {
        const taskStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        taskStore.createIndex('goalId', 'goalId');
        taskStore.createIndex('status', 'status');
        taskStore.createIndex('createdAt', 'createdAt');
      }

      // Sessions store
      if (!db.objectStoreNames.contains('sessions')) {
        const sessionStore = db.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true });
        sessionStore.createIndex('taskId', 'taskId');
        sessionStore.createIndex('timestamp', 'timestamp');
        sessionStore.createIndex('date', 'date');
      }

      // Reflections store
      if (!db.objectStoreNames.contains('reflections')) {
        const reflectionStore = db.createObjectStore('reflections', { keyPath: 'id', autoIncrement: true });
        reflectionStore.createIndex('date', 'date');
      }

      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'id' });
      }
    },
  });
};

// Helper functions for each store
export const db = {
  // Profile
  async getProfile() {
    const database = await initDB();
    return database.get('profile', 'user-profile');
  },

  async saveProfile(profile) {
    const database = await initDB();
    return database.put('profile', { ...profile, id: 'user-profile' });
  },

  // Values
  async getAllValues() {
    const database = await initDB();
    return database.getAll('values');
  },

  async addValue(value) {
    const database = await initDB();
    return database.add('values', value);
  },

  async deleteValue(id) {
    const database = await initDB();
    return database.delete('values', id);
  },

  // Goals
  async getAllGoals() {
    const database = await initDB();
    return database.getAll('goals');
  },

  async getGoal(id) {
    const database = await initDB();
    return database.get('goals', id);
  },

  async addGoal(goal) {
    const database = await initDB();
    return database.add('goals', {
      ...goal,
      createdAt: new Date().toISOString(),
      status: 'active',
    });
  },

  async updateGoal(goal) {
    const database = await initDB();
    return database.put('goals', goal);
  },

  async deleteGoal(id) {
    const database = await initDB();
    return database.delete('goals', id);
  },

  // Tasks
  async getAllTasks() {
    const database = await initDB();
    return database.getAll('tasks');
  },

  async getTasksByGoal(goalId) {
    const database = await initDB();
    return database.getAllFromIndex('tasks', 'goalId', goalId);
  },

  async getTask(id) {
    const database = await initDB();
    return database.get('tasks', id);
  },

  async addTask(task) {
    const database = await initDB();
    return database.add('tasks', {
      ...task,
      createdAt: new Date().toISOString(),
      status: 'backlog',
    });
  },

  async updateTask(task) {
    const database = await initDB();
    return database.put('tasks', task);
  },

  async deleteTask(id) {
    const database = await initDB();
    return database.delete('tasks', id);
  },

  async getTasksByStatus(status) {
    const database = await initDB();
    const allTasks = await database.getAll('tasks');
    return allTasks.filter(t => t.status === status);
  },

  async moveTaskToToday(taskId) {
    const database = await initDB();
    const task = await database.get('tasks', taskId);
    return database.put('tasks', { ...task, status: 'today' });
  },

  async moveTaskToBacklog(taskId) {
    const database = await initDB();
    const task = await database.get('tasks', taskId);
    return database.put('tasks', { ...task, status: 'backlog' });
  },

  // Sessions
  async getAllSessions() {
    const database = await initDB();
    return database.getAll('sessions');
  },

  async getSessionsByDate(date) {
    const database = await initDB();
    return database.getAllFromIndex('sessions', 'date', date);
  },

  async addSession(session) {
    const database = await initDB();
    const now = new Date();
    return database.add('sessions', {
      ...session,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0],
    });
  },

  async updateSession(session) {
    const database = await initDB();
    return database.put('sessions', session);
  },

  // Reflections
  async getReflectionByDate(date) {
    const database = await initDB();
    const reflections = await database.getAllFromIndex('reflections', 'date', date);
    return reflections[0];
  },

  async saveReflection(reflection) {
    const database = await initDB();
    const existing = await this.getReflectionByDate(reflection.date);
    if (existing) {
      return database.put('reflections', { ...reflection, id: existing.id });
    }
    return database.add('reflections', reflection);
  },

  // Settings
  async getSettings() {
    const database = await initDB();
    const settings = await database.get('settings', 'app-settings');
    return settings || {
      id: 'app-settings',
      timerDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sound: 'silence',
      volume: 0.5,
      breathworkBefore: false,
      breathworkAfter: false,
    };
  },

  async saveSettings(settings) {
    const database = await initDB();
    return database.put('settings', { ...settings, id: 'app-settings' });
  },
};
