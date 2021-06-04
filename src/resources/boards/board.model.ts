import { v4 as uuidv4 } from 'uuid';
import { IBoard } from './board.types';
import Column from '../columns/columns.model';
import { IColumn } from '../columns/columns.types';
/**
 * Class representing a board
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumn[];

  [x: string]: unknown;

  /**
   * Create a board.
   * @param {string} id Board ID
   * @param {string} title Board title
   * @param {Array} columns Array of columns
   */
  constructor({
    id = uuidv4(),

    title = 'testBoard',

    columns = [new Column()],
  }: IBoard) {
    this.id = id;

    this.title = title;

    this.columns = columns;
  }
}

export default Board;
