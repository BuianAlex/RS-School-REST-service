"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.findUser = exports.createUser = exports.getAll = void 0;
/**
 * @module userService
 */
const usersRepo = __importStar(require("./user.memory.repository"));
const user_model_1 = __importDefault(require("./user.model"));
/**
 * Get all users from the db
 * @async
 * @returns {Promise<Array>} Resolve in array of user objects
 */
const getAll = async () => usersRepo.getAllUsers();
exports.getAll = getAll;
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
    const newUser = new user_model_1.default(userData);
    return usersRepo.addUser(newUser);
};
exports.createUser = createUser;
/**
 * Find user by ID
 * @param {string} userID User ID
 * @returns {Promise<(Object|Boolean)>} Resolve in object of user if not found - false
 */
const findUser = async (userID) => usersRepo.getById(userID);
exports.findUser = findUser;
/**
 * Delete user by ID
 * @param {string} taskId User ID
 * @returns {Promise<Boolean>} Resolve true if not found - false
 */
const deleteUser = async (userID) => usersRepo.deleteUser(userID);
exports.deleteUser = deleteUser;
/**
 * Find user by id and update
 * @param {string} userID User ID
 * @param {Object} newProps Prors for update user
 * @param {string} userData.name  User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @returns {Promise<(Object|Boolean)>} Resolve updated user if not found - false
 */
const updateUser = async (userID, newProps) => usersRepo.updateUser(userID, newProps);
exports.updateUser = updateUser;
