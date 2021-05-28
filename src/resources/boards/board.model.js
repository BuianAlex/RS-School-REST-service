const { v4: uuidv4 } = require('uuid');
/**
 * Class representing a board
 */
class Board {
  /**
   * Create a board.
   * @param {string} id Board ID
   * @param {string} title Board title
   * @param {Array} columns Array of columns
   */
  constructor({ id = uuidv4(), title = 'testBoard', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

}

module.exports = Board;
