/**
 * @module userMemoryRepository
 */
const inMemoryDb = require('../../db');
const User = require('./user.model');

const tableName = 'USERS';
/**
 * Get all users from the db
 * @async
 * @returns {Promise<User[]>} Resolve in array of user objects
 */
const getAllUsers = async () => inMemoryDb.getAllRows({ tableName: 'USERS' });
/**
 * Create new user and add to the db
 * @async
 * @param {Object} userData  Data for new user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<User>} Resolve in object of new user
 */
const addUser = async (newUser) =>
  inMemoryDb.addRow({ tableName, data: newUser });
/**
 * Find user by ID
 * @param {string} userID User ID
 * @returns {Promise<(User|Boolean)>} Resolve in object of user if not found - false
 */
const getById = async (userId) =>
  inMemoryDb.find({ tableName, filter: { id: userId } });
/**
 * Delete user by ID
 * @param {string} taskId User ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
const deleteUser = async (userID) => {
  await inMemoryDb.delete({
    tableName,
    filter: { id: userID },
  });
  await inMemoryDb.updateManyRows({
    tableName: 'TASKS',
    filter: { userId: userID },
    newProps: { userId: null },
  });
  return true;
};
/**
 * Find user by id and update
 * @param {string} userID User ID
 * @param {Object} newProps Prors for update user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<(User|Boolean)>} Resolve updated user if not found - false
 */
const updateUser = async (userID, newProps) =>
  inMemoryDb.updateRow({
    tableName,
    filter: { id: userID },
    newProps,
  });

module.exports = {
  getAllUsers,
  addUser,
  getById,
  deleteUser,
  updateUser,
};
