"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.findTask = exports.createTask = exports.getAllTasks = void 0;
/**
 * @module taskService
 */
const tasksRepo = __importStar(require("./task.memory.repository"));
const task_model_1 = __importDefault(require("./task.model"));
/**
 * Get all tasks from the db
 * @async
 * @returns {Promise<Task[]>} Resolve in array of tasks objects
 */
const getAllTasks = () => tasksRepo.getAllTasks();
exports.getAllTasks = getAllTasks;
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
const createTask = (taskData) => {
    const newTask = new task_model_1.default(taskData);
    return tasksRepo.addTask(newTask);
};
exports.createTask = createTask;
/**
 * Find task by ID
 * @param {string} taskId Task ID
 * @returns {Promise<(Task|Boolean)>} Resolve in object of task if not found - false
 */
const findTask = (taskId) => tasksRepo.findTask(taskId);
exports.findTask = findTask;
/**
 * Delete task by ID
 * @param {string} taskId Task ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);
exports.deleteTask = deleteTask;
/**
 * Find task by id and update
 * @param {string} taskId
 * @param {Object} newProps Prors for update task
 * @param {string} newProps.title Title of task
 * @param {number} newProps.order Order for showing
 * @param {string} newProps.description Task description
 * @param {string} newProps.userId Owner User ID
 * @param {string} newProps.columnId Column ID with belong task
 * @returns {Promise<(Task|null)>} Resolve updated task if not found - false
 */
const updateTask = (taskId, newProps) => tasksRepo.updateTask(taskId, newProps);
exports.updateTask = updateTask;
