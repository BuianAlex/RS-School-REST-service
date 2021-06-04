export type TableRow = Record<string, unknown>;
export interface ITables {
  [key: string]: Record<string, unknown>[];
}
export interface IFilter {
  [key: string]: unknown;
}

export interface IFindIndex {
  tableName: string;
  filter: IFilter;
}
export interface IAddRow {
  tableName: string;
  data: Record<string, unknown>;
}
export interface IGetAllRows {
  tableName: string;
}
export interface IUpdateRow {
  tableName: string;
  filter: IFilter;
  newProps: Record<string, unknown>;
}

export interface IUpdateManyRows {
  tableName: string;
  filter: IFilter;
  newProps: Record<string, unknown>;
}

export interface IFind {
  tableName: string;
  filter: IFilter;
}
