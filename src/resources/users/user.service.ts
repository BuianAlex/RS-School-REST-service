import { DeleteResult } from 'typeorm';
import bcrypt from 'bcryptjs';
/**
 * @module userService
 */
import * as usersRepo from './user.repository';
import { User } from '../../entities/user.entity';

/**
 * Get all users from the db
 * @async
 * @returns {Promise<User[]>} Resolve in array of user objects
 */
export const getAll = async (): Promise<User[]> => usersRepo.getAllUsers();
/**
 * Create new user and add to the db
 * @async
 * @param {Object} userData  Data for new user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<User>} Resolve in object of new user
 */
export const createUser = async (userData: User): Promise<User> => {
  const { password, ...restData } = userData;
  const passwordHash = bcrypt.hashSync(password, 10);
  const passwordObject = { password: passwordHash };
  const updateUserData = { ...passwordObject, ...restData };
  return usersRepo.addUser(updateUserData);
};
/**
 * Find user by ID
 * @param {string} userID User ID
 * @returns {Promise<(User|null)>} Resolve in object of user if not found - false
 */
export const findUser = async (userID: string): Promise<User | undefined> =>
  usersRepo.getById(userID);
/**
 * Delete user by ID
 * @param {string} userID User ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
export const deleteUser = async (userID: string): Promise<DeleteResult> =>
  usersRepo.deleteUser(userID);

/**
 * Find user by id and update
 * @param {string} userID User ID
 * @param {Object} newProps Prors for update user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<(User|null)>} Resolve updated user if not found - false
 */
export const updateUser = async (
  userID: string,
  newProps: Partial<User>
): Promise<User | undefined> => usersRepo.updateUser(userID, newProps);
