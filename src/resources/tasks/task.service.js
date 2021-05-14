const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = () => tasksRepo.getAll();

const createTask = (taskData) => {
  const newTask = new Task(taskData);
  return newTask.save();
};

const getById = (taskId) => tasksRepo.getById(taskId);

const deleteById = (taskId) => tasksRepo.deleteById(taskId);

const findByIdAndUpdate = (taskId, newProps) =>
  tasksRepo.findByIdAndUpdate(taskId, newProps);

module.exports = {
  getAll,
  createTask,
  getById,
  deleteById,
  findByIdAndUpdate,
};
