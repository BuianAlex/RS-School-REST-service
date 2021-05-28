const inMemoryDb = require('../../db');

const tableName = 'BOARDS';

const getAllBoards = async () => inMemoryDb.getAllRows({ tableName });

const addBoard = async (board) => inMemoryDb.addRow({ tableName, data: board });

const findBoard = async (boardID) =>
  inMemoryDb.find({ tableName, filter: { id: boardID } });

const deleteBoard = async (boardID) =>{
  await inMemoryDb.delete({ tableName, filter: { id: boardID } });
  await inMemoryDb.deleteMany({tableName: 'TASKS', filter:{boardId: boardID}})
  return true;
}
  

const updateBoard = async (boardID, newProps) =>
  inMemoryDb.updateRow({ tableName, filter: { id: boardID }, newProps });

module.exports = {
  getAllBoards,
  addBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
