const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const createBoard = (userData) => {
  const newBoard = new Board(userData);
  return newBoard.save();
};

const getById = (boardId) => boardsRepo.getById(boardId);

const deleteById = (boardId) => boardsRepo.deleteById(boardId);

const findByIdAndUpdate = (userID, newProps) =>
  boardsRepo.findByIdAndUpdate(userID, newProps);

module.exports = {
  getAll,
  createBoard,
  getById,
  deleteById,
  findByIdAndUpdate,
};
