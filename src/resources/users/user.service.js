const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = (userData) => {
  const newUser = new User(userData);
  return usersRepo.pushUser(newUser);
};

const getById = (userID) => usersRepo.getById(userID);

const deleteById = (userID) => usersRepo.deleteById(userID);

const findByIdAndUpdate = (userID, newProps) =>
  usersRepo.findByIdAndUpdate(userID, newProps);

module.exports = { getAll, createUser, getById, deleteById, findByIdAndUpdate };
