/**
 * @module inMemoryDb
 * @description This function return methods for work with data base.
 */
import { IUser } from '../resources/users/user.types';
import { ITask } from '../resources/tasks/task.types';
import { IBoard } from '../resources/boards/board.types';
import * as dbTypes from './db.types';

export default (() => {
  const tables: dbTypes.ITables = {
    BOARDS: [],
    TASKS: [],
    USERS: [],
  };
  const dbErrorHandler = (tableName: string | undefined | number): string =>
    `DB_ERROR table ${tableName} not exist`;

  const findIndex = ({ tableName, filter }: dbTypes.IFindIndex): number => {
    const dbTable = tables[tableName];
    let rowIndex = -1;
    if (dbTable) {
      rowIndex = dbTable.findIndex((item: dbTypes.TableRow) => {
        let filterResult = false;
        Object.keys(filter).forEach((keyName) => {
          if (item[keyName] === filter[keyName]) {
            filterResult = true;
          }
        });
        return filterResult;
      });
    }
    return rowIndex;
  };

  return {
    /**
     * Add new data to the db
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.data Data for add to the table
     * @returns {Promise<Object>} Resolve last added row in table
     */
    addRow: async ({
      tableName,
      data,
    }: dbTypes.IAddRow): Promise<dbTypes.DBResponse> => {
      // eslint-disable-next-line dot-notation
      const dbTable = tables[tableName];
      if (dbTable !== undefined) {
        dbTable.push(data);
        const lastRow = dbTable[dbTable.length - 1];
        if (lastRow) {
          return lastRow;
        }
      }
      throw new Error(dbErrorHandler(tableName));
    },
    /**
     * Get all row from db table
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @returns {Promise<Object>} Resolve array with table data
     */
    getAllRows: async ({
      tableName,
    }: dbTypes.IGetAllRows): Promise<(IUser | ITask | IBoard)[]> => {
      const dbTable = tables[tableName];
      if (dbTable) {
        return dbTable;
      }
      throw new Error(dbErrorHandler(tableName));
    },
    /**
     * Find and update one row in db table
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @param {Object} param.newProps Data for update row
     * @returns {Promise<Object>} Resolve updated row
     */
    updateRow: async ({
      tableName,
      filter,
      newProps,
    }: dbTypes.IUpdateRow): Promise<dbTypes.DBResponse | null> => {
      const dbTable = tables[tableName];
      if (dbTable) {
        const rowIndex = findIndex({ tableName, filter });
        if (rowIndex >= 0) {
          const tableRow = dbTable[rowIndex];
          if (tableRow !== undefined) {
            Object.keys(newProps).forEach((key) => {
              if (Object.prototype.hasOwnProperty.call(tableRow, key)) {
                const newValue = newProps[key];
                if (newValue) {
                  tableRow[key] = newValue;
                }
              }
            });
            return tableRow;
          }
        }
        return null;
      }
      throw new Error(dbErrorHandler(tableName));
    },
    /**
     * Find and update rows in db table that match filter
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @param {Object} param.newProps Data for update row
     * @returns {Promise<Number>} Resolve calc of updated rows
     */
    updateManyRows: async ({
      tableName,
      filter,
      newProps,
    }: dbTypes.IUpdateRow): Promise<number> => {
      let calcUpdatedRows = 0;
      const dbTable = tables[tableName];
      if (dbTable) {
        const updatedArray = dbTable.map((tableRow: dbTypes.TableRow) => {
          const updatedRow = tableRow;
          let shouldUpdate = false;
          Object.keys(filter).forEach((keyName) => {
            if (updatedRow[keyName] === filter[keyName]) {
              shouldUpdate = true;
            }
          });
          if (shouldUpdate) {
            Object.keys(newProps).forEach((key) => {
              if (Object.prototype.hasOwnProperty.call(tableRow, key)) {
                const newValue = newProps[key];
                if (newValue !== undefined) {
                  updatedRow[key] = newValue;
                }
              }
            });
            calcUpdatedRows += 1;
          }
          return updatedRow;
        });
        tables[tableName] = updatedArray;
        return calcUpdatedRows;
      }
      throw new Error(dbErrorHandler(tableName));
    },
    /**
     * Find a row in db table that match filter
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @returns  Resolve found row or if not found - false
     */
    find: async ({
      tableName,
      filter,
    }: dbTypes.IFind): Promise<dbTypes.DBResponse | null> => {
      const dbTable = tables[tableName];
      if (dbTable) {
        const rowIndex = findIndex({ tableName, filter });
        if (rowIndex >= 0) {
          const row = dbTable[rowIndex];
          if (row) {
            return row;
          }
          return null;
        }
        return null;
      }
      throw new Error(dbErrorHandler(tableName));
    },
    /**
     * Find and delete a row in db table that match filter
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @returns {Promise<Boolean>} Resolve true or if not found - false
     */
    delete: async ({ tableName, filter }: dbTypes.IFind): Promise<boolean> => {
      const dbTable = tables[tableName];
      if (dbTable) {
        const rowIndex = findIndex({ tableName, filter });
        if (rowIndex >= 0) {
          dbTable.splice(rowIndex, 1);
          return true;
        }
        return false;
      }
      throw new Error(dbErrorHandler(tableName));
    },
    /**
     * Find and delete rows in db table that match filter
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @returns {Promise<Boolean>} Resolve true or if not found - false
     */
    deleteMany: async ({
      tableName,
      filter,
    }: dbTypes.IFind): Promise<number> => {
      const dbTable = tables[tableName];
      let calcDeleted = 0;
      if (Array.isArray(dbTable)) {
        const newArray = dbTable.filter((row: dbTypes.TableRow) => {
          let shouldDelete = false;
          Object.keys(filter).forEach((keyName) => {
            if (row[keyName] === filter[keyName]) {
              shouldDelete = true;
            }
          });
          if (shouldDelete) {
            calcDeleted += 1;
            return false;
          }
          return true;
        });
        tables[tableName] = newArray;
        return calcDeleted;
      }
      throw new Error(dbErrorHandler(tableName));
    },
  };
})();
