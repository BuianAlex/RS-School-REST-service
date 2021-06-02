/**
 * @module userService
 */
const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');
/**
 * Get all users from the db
 * @async
 * @returns {Promise<Array>} Resolve in array of user objects
 */
const getAll = async () => usersRepo.getAllUsers();
/**
 * Create new user and add to the db
 * @async
 * @param {Object} userData  Data for new user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<Object>} Resolve in object of new user
 */
const createUser = async (userData) => {
  const newUser = new User(userData);
  return usersRepo.addUser(newUser);
};
/**
 * Find user by ID
 * @param {string} userID User ID
 * @returns {Promise<(Object|Boolean)>} Resolve in object of user if not found - false
 */
const findUser = async (userID) => usersRepo.getById(userID);
/**
 * Delete user by ID
 * @param {string} taskId User ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
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
/**
 * Find user by id and update
 * @param {string} userID User ID
 * @param {Object} newProps Prors for update user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<(Object|Boolean)>} Resolve updated user if not found - false
 */
const updateUser = async (userID, newProps) =>
  usersRepo.updateUser(userID, newProps);

module.exports = { getAll, createUser, findUser, deleteUser, updateUser };
