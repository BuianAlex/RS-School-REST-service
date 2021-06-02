/**
 * @module boardMemoryRepository
 */
const inMemoryDb = require('../../db');
const Board = require('./board.model');

const tableName = 'BOARDS';
/**
 * Get all boards from the db
 * @async
 * @returns {Promise<Board[]>} Resolve in array of boards objects
 */
const getAllBoards = async () => inMemoryDb.getAllRows({ tableName });
/**
 * Create a new board and add to the db
 * @async
 * @param {Object} boardData Data for new board
 * @param {String} boardData.title Board title
 * @param {Array} boardData.columns Array of columns
 * @returns {Promise<Board>} new board object
 */
const addBoard = async (board) => inMemoryDb.addRow({ tableName, data: board });
/**
 * Find a board by ID
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<(Board|boolean)>} Resolve board object if board not found - false
 */
const findBoard = async (boardID) =>
  inMemoryDb.find({ tableName, filter: { id: boardID } });
/**
 * Delete board by id
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<Boolean>} Resolve true if board not found - false
 */
const deleteBoard = async (boardID) => {
  await inMemoryDb.delete({ tableName, filter: { id: boardID } });
  await inMemoryDb.deleteMany({
    tableName: 'TASKS',
    filter: { boardId: boardID },
  });
  return true;
};
/**
 * Find board by id and update
 * @async
 * @param {String} boardID Board ID
 * @property {Object} newProps Prors for update board
 * @property {String} newProps.title Board title
 * @property {Array} newProps.columns Array of columns
 * @returns {Promise<(Board|Boolean)>} Resolve updated board if board not found - false
 */
const updateBoard = async (boardID, newProps) =>
  inMemoryDb.updateRow({ tableName, filter: { id: boardID }, newProps });

module.exports = {
  getAllBoards,
  addBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
