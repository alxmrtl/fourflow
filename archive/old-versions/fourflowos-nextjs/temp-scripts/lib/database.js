"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentRepository = getContentRepository;
exports.getContentByDimensionAndKey = getContentByDimensionAndKey;
exports.getLearnContent = getLearnContent;
exports.getPracticeContent = getPracticeContent;
exports.getContentById = getContentById;
exports.insertContent = insertContent;
// Database configuration (for future use)
// const DATABASE_CONFIG = {
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '3306'),
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'fourflow_content'
// };
// Mock database implementation for development
// Replace with actual database connection (MySQL, PostgreSQL, etc.)
class MockDatabase {
    constructor() {
        this.data = [];
        // Initialize with current hardcoded content
        this.initializeData();
    }
    static getInstance() {
        if (!MockDatabase.instance) {
            MockDatabase.instance = new MockDatabase();
        }
        return MockDatabase.instance;
    }
    initializeData() {
        // This will be replaced with actual database queries
        // Content is now managed in src/data/content.ts
        this.data = [];
    }
    async query(sql, params) {
        // Mock implementation - replace with actual database query
        console.log('Mock DB Query:', sql, params);
        return this.data;
    }
    async getContentRepository() {
        return this.data.sort((a, b) => {
            // Sort pinned content first
            if (a.is_pinned && !b.is_pinned)
                return -1;
            if (!a.is_pinned && b.is_pinned)
                return 1;
            if (a.is_pinned && b.is_pinned) {
                return (a.pin_order || 0) - (b.pin_order || 0);
            }
            return 0;
        });
    }
    async getContentByDimensionAndKey(dimension, key) {
        return this.data
            .filter(item => item.dimension === dimension && item.key === key)
            .sort((a, b) => {
            // Sort pinned content first
            if (a.is_pinned && !b.is_pinned)
                return -1;
            if (!a.is_pinned && b.is_pinned)
                return 1;
            if (a.is_pinned && b.is_pinned) {
                return (a.pin_order || 0) - (b.pin_order || 0);
            }
            // For non-pinned content, sort by created date (newest first)
            const aDate = new Date(a.created_date || '2024-01-01');
            const bDate = new Date(b.created_date || '2024-01-01');
            return bDate.getTime() - aDate.getTime();
        });
    }
    async getLearnContentWithPinned(dimension, key) {
        return this.data
            .filter(item => item.dimension === dimension &&
            item.key === key &&
            item.type === 'learn')
            .sort((a, b) => {
            // Pinned content first
            if (a.is_pinned && !b.is_pinned)
                return -1;
            if (!a.is_pinned && b.is_pinned)
                return 1;
            if (a.is_pinned && b.is_pinned) {
                return (a.pin_order || 0) - (b.pin_order || 0);
            }
            // For non-pinned content, sort by created date (newest first)
            const aDate = new Date(a.created_date || '2024-01-01');
            const bDate = new Date(b.created_date || '2024-01-01');
            return bDate.getTime() - aDate.getTime();
        });
    }
    async getPracticeContentWithPinned(dimension, key) {
        return this.data
            .filter(item => item.dimension === dimension &&
            item.key === key &&
            item.type === 'practice')
            .sort((a, b) => {
            // Pinned content first
            if (a.is_pinned && !b.is_pinned)
                return -1;
            if (!a.is_pinned && b.is_pinned)
                return 1;
            if (a.is_pinned && b.is_pinned) {
                return (a.pin_order || 0) - (b.pin_order || 0);
            }
            // For non-pinned content, sort by created date (newest first)
            const aDate = new Date(a.created_date || '2024-01-01');
            const bDate = new Date(b.created_date || '2024-01-01');
            return bDate.getTime() - aDate.getTime();
        });
    }
    async insertContent(content) {
        const newContent = Object.assign({ id: content.id || `${content.key}-${content.type}-${Date.now()}`, title: content.title || '', description: content.description || '', content: content.content || '', tags: content.tags || [], type: content.type || 'learn', dimension: content.dimension || 'self', key: content.key || 'tuned-emotions' }, content);
        this.data.push(newContent);
        return newContent.id;
    }
}
// Export database functions
const db = MockDatabase.getInstance();
async function getContentRepository() {
    return await db.getContentRepository();
}
async function getContentByDimensionAndKey(dimension, key) {
    return await db.getContentByDimensionAndKey(dimension, key);
}
async function getLearnContent(dimension, key) {
    return await db.getLearnContentWithPinned(dimension, key);
}
async function getPracticeContent(dimension, key) {
    return await db.getPracticeContentWithPinned(dimension, key);
}
async function getContentById(id) {
    const allContent = await db.getContentRepository();
    return allContent.find(item => item.id === id) || null;
}
async function insertContent(content) {
    return await db.insertContent(content);
}
// For development - log database operations
if (process.env.NODE_ENV === 'development') {
    console.log('🗄️ FourFlow Database initialized (Mock Mode)');
}
