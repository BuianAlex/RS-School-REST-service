import { IColumn } from '../columns/columns.types';

type IBaseBoard = Record<string, string | IColumn[]>;
export interface IBoard extends IBaseBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
