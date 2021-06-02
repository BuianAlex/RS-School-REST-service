/**
 * @module userService
 */
import * as usersRepo from './user.memory.repository';
import User from './user.model';
import { IUser, UserID } from './user.types';
/**
 * Get all users from the db
 * @async
 * @returns {Promise<Array>} Resolve in array of user objects
 */
export const getAll = async (): Promise<IUser[]> => usersRepo.getAllUsers();
/**
 * Create new user and add to the db
 * @async
 * @param {Object} userData  Data for new user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<Object>} Resolve in object of new user
 */
export const createUser = async (userData: IUser): Promise<IUser> => {
  const newUser = new User(userData);
  return usersRepo.addUser(newUser);
};
/**
 * Find user by ID
 * @param {string} userID User ID
 * @returns {Promise<(Object|Boolean)>} Resolve in object of user if not found - false
 */
export const findUser = async (userID: UserID): Promise<IUser | null> =>
  usersRepo.getById(userID);
/**
 * Delete user by ID
 * @param {string} taskId User ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
export const deleteUser = async (userID: UserID): Promise<boolean> => usersRepo.deleteUser(userID);

/**
 * Find user by id and update
 * @param {string} userID User ID
 * @param {Object} newProps Prors for update user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<(Object|Boolean)>} Resolve updated user if not found - false
 */
export const updateUser = async (
  userID: UserID,
  newProps: IUser
): Promise<IUser | null> => usersRepo.updateUser(userID, newProps);
