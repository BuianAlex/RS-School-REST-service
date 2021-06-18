import { DeleteResult } from 'typeorm';
/**
 * @module taskService
 */
import * as tasksRepo from './task.repository';
import { Task } from '../../entities/task.entity';

/**
 * Get all tasks from the db
 * @async
 * @returns {Promise<Task[]>} Resolve in array of tasks objects
 */
export const getAllTasks = (): Promise<Task[]> => tasksRepo.getAllTasks();
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
export const createTask = (taskData: Task): Promise<Task> =>
  tasksRepo.addTask(taskData);

/**
 * Find task by ID
 * @param {string} taskID Task ID
 * @returns {Promise<(Task|null)>} Resolve in object of task if not found - false
 */
export const findTask = (taskID: string): Promise<Task | undefined> =>
  tasksRepo.findTask(taskID);
// /**
//  * Delete task by ID
//  * @param {string} taskID Task ID
//  * @returns {Promise<Boolean>} Resolve true if not found - false
//  */
export const deleteTask = (taskID: string): Promise<DeleteResult> =>
  tasksRepo.deleteTask(taskID);
/**
 * Find task by id and update
 * @param {string} taskID
 * @param {Object} newProps Prors for update task
 * @param {string} newProps.title Title of task
 * @param {number} newProps.order Order for showing
 * @param {string} newProps.description Task description
 * @param {string} newProps.userId Owner User ID
 * @param {string} newProps.columnId Column ID with belong task
 * @returns {Promise<(Task|null)>} Resolve updated task if not found - false
 */
export const updateTask = (
  taskID: string,
  newProps: Partial<Task>
): Promise<Task | undefined> => tasksRepo.updateTask(taskID, newProps);
