import { IColumn } from '../columns/columns.types';

interface IBaseBoard {
  [key: string]: any;
}
export interface IBoard extends IBaseBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
