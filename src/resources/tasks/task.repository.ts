import { getRepository, DeleteResult, UpdateResult } from 'typeorm';
//
import { Task } from '../../entities/task.entity';

export const getAllTasks = async (): Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find();
};

export const addTask = async (newTask: Task): Promise<Task> => {
  const taskRepository = getRepository(Task);
  return taskRepository.save(newTask);
};

export const findTask = async (taskID: string): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  return taskRepository.findOne(taskID);
};

export const deleteTask = async (taskID: string): Promise<DeleteResult> => {
  const taskRepository = getRepository(Task);
  return taskRepository.delete(taskID);
};

export const updateTask = async (
  taskID: string,
  newProps: Partial<Task>
): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const taskForUpdate = await taskRepository.findOne(taskID);

  if (taskForUpdate) {
    const updateResult = await taskRepository.save({
      ...taskForUpdate,
      ...newProps,
    });
    console.log(taskForUpdate.boardId);
    return updateResult;
  }
  return undefined;
};

export const updateManyTasks = async (
  filter: Partial<Task>,
  newProps: Partial<Task>
): Promise<UpdateResult> => {
  const taskRepository = getRepository(Task);
  return taskRepository.update(filter, newProps);
};
