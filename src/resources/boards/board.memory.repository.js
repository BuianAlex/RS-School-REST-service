const boardList = [];

const getAll = async () => boardList;

const pushBoard = async (board) => {
  boardList.push(board);
  return board;
};

const getById = async (boardId) => {
  const filteredArray = boardList.filter((item) => item.id === boardId);
  if (filteredArray.length) {
    return filteredArray[0];
  }
  return false;
};

const deleteById = async (boardId) => {
  const rowIndex = boardList.findIndex((item) => item.id === boardId);
  if (rowIndex >= 0) {
    boardList.splice(rowIndex, 1);
    return true;
  }
  return false;
};

const findByIdAndUpdate = async (boardId, newProps) => {
  const rowIndex = boardList.findIndex((item) => item.id === boardId);
  if (rowIndex >= 0) {
    const board = boardList[rowIndex];
    Object.keys(newProps).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(board, key)) {
        board[key] = newProps[key];
      }
    });
    return board;
  }
  return false;
};

module.exports = { getAll, pushBoard, getById, deleteById, findByIdAndUpdate };
