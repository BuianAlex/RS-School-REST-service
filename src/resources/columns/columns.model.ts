import { v4 as uuidv4 } from 'uuid';
import { IColumn } from './columns.types';

class Column implements IColumn {
  /**
   * Create a column instance.
   * @param {string} id Column ID
   * @param {string} title Column title

   */
  constructor({ id = uuidv4(), title = 'testColumn' } = {}) {
    this.id = id;
    this.title = title;
  }

  id: string;

  title: string;

}

export default Column;