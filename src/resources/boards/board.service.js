/**
 * @module boardService
 */
const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
/**
 * Get all boards from the db
 * @async
 * @returns {Promise<Array>} Resolve in array of boards objects
 */
const getAllBoards = async () => boardsRepo.getAllBoards();
/**
 * Create a new board and add to the db
 * @async
 * @param {Object} boardData Data for new board
 * @param {String} boardData.title Board title
 * @param {Array} boardData.columns Array of columns
 * @returns {Promise<Object>} new board object
 */
const createBoard = (userData) => {
  const newBoard = new Board(userData);
  return boardsRepo.addBoard(newBoard);
};
/**
 * Find a board by ID
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<(Object|Boolean)>} Resolve board object if board not found - false
 */
const findBoard = (boardId) => boardsRepo.findBoard(boardId);
/**
 * Delete board by id
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<Boolean>} Resolve true if board not found - false
 */
const deleteBoard = async (boardId) => boardsRepo.deleteBoard(boardId);
/**
 * Find board by id and update
 * @async
 * @param {String} boardID Board ID
 * @property {Object} newProps Prors for update board
 * @property {String} newProps.title Board title
 * @property {Array} newProps.columns Array of columns
 * @returns {Promise<(Object|Boolean)>} Resolve updated board if board not found - false
 */
const updateBoard = async (boardID, newProps) =>
  boardsRepo.updateBoard(boardID, newProps);

module.exports = {
  getAllBoards,
  createBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
