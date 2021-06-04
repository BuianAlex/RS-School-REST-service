import { IColumn } from '../columns/columns.types';

type IBaseBoard = Record<string, unknown>;
export interface IBoard extends IBaseBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
