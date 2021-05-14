const { v4: uuidv4 } = require('uuid');
const boardsRepo = require('./board.memory.repository');

class Board {
  constructor({ id = uuidv4(), title = 'testBoard', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  async save() {
    return boardsRepo.pushBoard(this);
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
