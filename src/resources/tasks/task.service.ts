/**
 * @module taskService
 */
import * as tasksRepo from './task.memory.repository';
import Task from './task.model';
import { ITask } from './task.types';
/**
 * Get all tasks from the db
 * @async
 * @returns {Promise<Task[]>} Resolve in array of tasks objects
 */
export const getAllTasks = (): Promise<ITask[]> => tasksRepo.getAllTasks();
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
export const createTask = (taskData: ITask): Promise<ITask> => {
  const newTask = new Task(taskData);
  return tasksRepo.addTask(newTask);
};
/**
 * Find task by ID
 * @param {string} taskId Task ID
 * @returns {Promise<(Task|Boolean)>} Resolve in object of task if not found - false
 */
export const findTask = (taskId: string): Promise<ITask | null> =>
  tasksRepo.findTask(taskId);
/**
 * Delete task by ID
 * @param {string} taskId Task ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
export const deleteTask = (taskId: string): Promise<boolean> =>
  tasksRepo.deleteTask(taskId);
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
export const updateTask = (
  taskId: string,
  newProps: ITask
): Promise<ITask | null> => tasksRepo.updateTask(taskId, newProps);
