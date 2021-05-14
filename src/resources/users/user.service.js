const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = (userData) => {
  const newUser = new User(userData);
  return usersRepo.pushUser(newUser);
};

const getById = (userID) => usersRepo.getById(userID);

const deleteById = async (userID) => {
  try {
    const result = await usersRepo.deleteById(userID);
    if (result) {
      await taskRepo.updateMany('userId', userID, null);
    }
    return result;
  } catch (error) {
    return error;
  }
};

const findByIdAndUpdate = (userID, newProps) =>
  usersRepo.findByIdAndUpdate(userID, newProps);

module.exports = { getAll, createUser, getById, deleteById, findByIdAndUpdate };
