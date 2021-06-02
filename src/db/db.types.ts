import { IUser } from '../resources/users/user.types';
import { ITask } from '../resources/tasks/task.types';
import { IBoard } from '../resources/boards/board.types';

export interface ITableRow {
  [key: string]: any;
}

export interface ITablesBase {
  [key: string]: any;
}

export interface ITables extends ITablesBase {
  BOARDS: IBoard[];
  TASKS: ITask[];
  USERS: IUser[];
}

export type returnedData = IBoard | ITask | IUser;
export interface IFilter {
  [key: string]: string | number | boolean | null;
}

export interface IFindIndex {
  tableName: string;
  filter: IFilter;
}
export interface IAddRow {
  tableName: string;
  data: IBoard | IUser | ITask;
}
export interface IGetAllRows {
  tableName: string;
}
export interface IUpdateRow {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser | ITask | IBoard>;
}

export interface IUpdateManyRows {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser | ITask | IBoard>;
}

export interface IFind {
  tableName: string;
  filter: IFilter;
}
