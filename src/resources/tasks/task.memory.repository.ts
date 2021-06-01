import inMemoryDb from '../../db';
import { ITask } from './task.types';

const tableName: string = 'TASKS';

export const getAllTasks = async (): Promise<ITask[]> =>
  inMemoryDb.getAllRows({ tableName });

export const addTask = async (newTask: ITask): Promise<ITask> =>
  inMemoryDb.addRow({ tableName, data: newTask });

export const findTask = async (taskID: string): Promise<ITask | null> =>
  inMemoryDb.find({ tableName, filter: { id: taskID } });

export const deleteTask = async (taskID: string): Promise<boolean> =>
  inMemoryDb.delete({ tableName, filter: { id: taskID } });

export const updateTask = async (taskID: string, newProps: Partial<ITask>) =>
  inMemoryDb.updateRow({ tableName, filter: { id: taskID }, newProps });
