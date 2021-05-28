const inMemoryDb = require('../../db');

const tableName = 'TASKS';

const getAllTasks = async () => inMemoryDb.getAllRows({ tableName });

const addTask = async (newTask) =>
  inMemoryDb.addRow({ tableName, data: newTask });

const findTask = async (taskID) =>
  inMemoryDb.find({ tableName, filter: { id: taskID } });

const deleteTask = async (taskID) =>
  inMemoryDb.delete({ tableName, filter: { id: taskID } });

const updateTask = async (taskID, newProps) =>
  inMemoryDb.updateRow({ tableName, filter: { id: taskID }, newProps });


module.exports = {
  getAllTasks,
  addTask,
  findTask,
  deleteTask,
  updateTask,
};
