const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAllTasks = () => tasksRepo.getAllTasks();

const createTask = (taskData) => {
  const newTask = new Task(taskData);
  return tasksRepo.addTask(newTask);
};

const findTask = (taskId) => tasksRepo.findTask(taskId);

const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);

const updateTask = (taskId, newProps) => tasksRepo.updateTask(taskId, newProps);

module.exports = {
  getAllTasks,
  createTask,
  findTask,
  deleteTask,
  updateTask,
};
