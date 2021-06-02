import { v4 as uuidv4 } from 'uuid';
import { ITask } from './task.types';
/**
 * Class to create a task object
 */
class Task implements ITask {
  /**
   * @param {Object} taskData  Data object for new task
   * @param {string} taskData.id Task ID
   * @param {string} taskData.boardId  Board ID with belong task
   * @param {string} taskData.title Title of task
   * @param {number} taskData.order Order for showing
   * @param {string} taskData.description Task description
   * @param {string} taskData.userId Owner User ID
   * @param {string} taskData.columnId Column ID with belong task
   */
  id: string;

  title: string;

  boardId: string;

  order: number;

  description: string;

  userId: string | null;

  columnId: string;

  constructor({
    id = uuidv4(),
    title = 'testTask',
    boardId,
    order,
    description,
    userId,
    columnId,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.boardId = boardId;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
