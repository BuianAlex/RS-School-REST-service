import { IUser } from '../resources/users/user.types';

export interface ITableRow extends IUser {
  [key: string]: any;
}

export interface ITables {
  [key: string]: IUser[];
}

export interface IFilter {
  [key: string]: string;
}

export interface IFindIndex {
  tableName: string;
  filter: IFilter;
}

export interface IAddRow {
  tableName: string;
  data: IUser;
}

export interface IGetAllRows {
  tableName: string;
}

export interface IUpdateRow {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser>;
}

export interface IUpdateManyRows {
  tableName: string;
  filter: IFilter;
  newProps: Partial<IUser>;
}

export interface IFind {
  tableName: string;
  filter: IFilter;
}
