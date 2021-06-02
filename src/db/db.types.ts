import { IUser } from '../resources/users/user.types';
import {ITask} from '../resources/tasks/task.types';
import {IBoard} from "../resources/boards/board.types";


export interface ITableRow {
  [key: string]: string| null |number;
}

export interface ITablesBase {
  [key: string]: any;
}

export interface ITables extends ITablesBase {
  BOARDS: Array<IBoard>;
  TASKS: Array<ITask>;
  USERS: Array<IUser>,
}
export interface IFilter {
  [key: string]: string| number| boolean | null;
}

export interface IFindIndex {
  tableName: string;
  filter: IFilter;
}

export interface IAddRow {
  tableName: string;
  data: IBoard | IUser | ITask ;
}

interface IData  {
  [key:string]: any
}

export interface IGetAllRows {
  tableName: string;
}

export interface IUpdateRow {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser|ITask|IBoard>;
}

export interface IUpdateManyRows {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser|ITask|IBoard>;
}

export interface IFind {
  tableName: string;
  filter: IFilter;
}
