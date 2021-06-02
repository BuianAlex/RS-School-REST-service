/**
 * @module taskMemoryRepository
 */
const inMemoryDb = require('../../db');

const tableName = 'TASKS';
/**
 * Get all tasks from the db
 * @async
 * @returns {Promise<Task[]>} Resolve in array of tasks objects
 */
const getAllTasks = async () => inMemoryDb.getAllRows({ tableName });
/**
 * Create new task and add it to the db
 * @async
 * @param {Object} taskData  Data object for new task
 * @param {string} taskData.boardId  Board ID with belong task
 * @param {string} taskData.title Title of task
 * @param {number} taskData.order Order for showing
 * @param {string} taskData.description Task description
 * @param {string} taskData.userId Owner User ID
 * @param {string} taskData.columnId Column ID with belong task
 * @returns {Promise<Task>} Resolve in object of new task
 */
const addTask = async (newTask) =>
  inMemoryDb.addRow({ tableName, data: newTask });
/**
 * Find task by ID
 * @param {string} taskId Task ID
 * @returns {Promise<(Task|Boolean)>} Resolve in object of task if not found - false
 */
const findTask = async (taskID) =>
  inMemoryDb.find({ tableName, filter: { id: taskID } });
/**
 * Delete task by ID
 * @param {string} taskId Task ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
const deleteTask = async (taskID) =>
  inMemoryDb.delete({ tableName, filter: { id: taskID } });
/**
 * Find task by id and update
 * @param {string} taskId
 * @param {Object} newProps Prors for update task
 * @param {string} newProps.title Title of task
 * @param {number} newProps.order Order for showing
 * @param {string} newProps.description Task description
 * @param {string} newProps.userId Owner User ID
 * @param {string} newProps.columnId Column ID with belong task
 * @returns {Promise<(Task|Boolean)>} Resolve updated task if not found - false
 */
const updateTask = async (taskID, newProps) =>
  inMemoryDb.updateRow({ tableName, filter: { id: taskID }, newProps });

module.exports = {
  getAllTasks,
  addTask,
  findTask,
  deleteTask,
  updateTask,
};
