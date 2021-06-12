import inMemoryDb from '../../db';
import { DBResponse } from '../../db/db.types';
import Task from './task.model';
import { ITask } from './task.types';

const tableName = 'TASKS';

export const getAllTasks = async (): Promise<ITask[]> => {
  const dbResult = await inMemoryDb.getAllRows({ tableName });
  if (Array.isArray(dbResult)) {
    const checked: Task[] = [];
    dbResult.forEach((item) => {
      if (item instanceof Task) {
        checked.push(item);
      }
    });
    return checked;
  }
  throw new Error('DB error');
};

export const addTask = async (newTask: ITask): Promise<ITask> => {
  const dbResult: DBResponse = await inMemoryDb.addRow({
    tableName,
    data: newTask,
  });
  if (dbResult instanceof Task) {
    return dbResult;
  }
  throw new Error('DB error');
};

export const findTask = async (taskID: string): Promise<ITask | null> => {
  const dbResult: DBResponse | null = await inMemoryDb.find({
    tableName,
    filter: { id: taskID },
  });
  if (dbResult instanceof Task || !dbResult) {
    return dbResult;
  }
  throw new Error('DB error');
};

export const deleteTask = async (taskID: string): Promise<boolean> =>
  inMemoryDb.delete({ tableName, filter: { id: taskID } });

export const updateTask = async (
  taskID: string,
  newProps: Partial<ITask>
): Promise<ITask | null> => {
  const dbResult: DBResponse | null = await inMemoryDb.updateRow({
    tableName,
    filter: { id: taskID },
    newProps,
  });
  if (dbResult instanceof Task || !dbResult) {
    return dbResult;
  }
  throw new Error('DB error');
};
