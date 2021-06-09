import { IUser } from '../resources/users/user.types';
import { ITask } from '../resources/tasks/task.types';
import { IBoard } from '../resources/boards/board.types';

export type TableRow = IUser | ITask | IBoard;

export type DBResponse = IUser | ITask | IBoard;
export interface ITables {
  [key: string]: (IUser | ITask | IBoard)[];
  BOARDS: IBoard[];
  TASKS: ITask[];
  USERS: IUser[];
}
export interface IFilter {
  [key: string]: string | number;
}

export interface IFindIndex {
  tableName: string;
  filter: IFilter;
}
export interface IAddRow {
  tableName: string;
  data: IUser | ITask | IBoard;
}
export interface IGetAllRows {
  tableName: string;
}
export interface IUpdateRow {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser> | Partial<ITask> | Partial<IBoard>;
}

export interface IUpdateManyRows {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser> | Partial<ITask> | Partial<IBoard>;
}

export interface IFind {
  tableName: string;
  filter: { [key: string]: string | number };
}
