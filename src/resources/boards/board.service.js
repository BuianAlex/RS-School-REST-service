const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAllBoards = async () => boardsRepo.getAllBoards();

const createBoard = (userData) => {
  const newBoard = new Board(userData);
  return boardsRepo.addBoard(newBoard);
};

const findBoard = (boardId) => boardsRepo.findBoard(boardId);

const deleteBoard = async (boardId) => {
  const result = await boardsRepo.deleteBoard(boardId);

  return result;
};

const updateBoard = async (boardID, newProps) =>
  boardsRepo.updateBoard(boardID, newProps);

module.exports = {
  getAllBoards,
  createBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
