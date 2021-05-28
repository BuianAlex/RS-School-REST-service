const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');

const getAll = async () => usersRepo.getAllUsers();

const createUser = async (userData) => {
  const newUser = new User(userData);
  return usersRepo.addUser(newUser);
};

const getById = async (userID) => usersRepo.getById(userID);

const deleteUser = async (userID) => {
  try {
    const result = await usersRepo.deleteUser(userID);
    if (result) {
      await taskRepo.updateMany('userId', userID, null);
    }
    return result;
  } catch (error) {
    return error;
  }
};

const updateUser = async (userID, newProps) =>
  usersRepo.updateUser(userID, newProps);

module.exports = { getAll, createUser, getById, deleteUser, updateUser };
