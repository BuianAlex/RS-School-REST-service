/**
 * @module inMemoryDb
 * @description This function return methods for work with data base.
 */

module.exports = (() => {
  const tables = {
    BOARDS: [],
    TASKS: [],
    USERS: [],
  };
  const findIndex = ({ tableName, filter }) => {
    const rowIndex = tables[tableName].findIndex((item) => {
      let filterResult = false;
      Object.keys(filter).forEach((keyName) => {
        if (item[keyName] === filter[keyName]) {
          filterResult = true;
        }
      });
      return filterResult;
    });
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
    addRow: async ({ tableName, data }) => {
      tables[tableName].push(data);
      const tableLength = tables[tableName].length;
      return tables[tableName][tableLength - 1];
    },
    /**
     * Get all row from db table
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @returns {Promise<Object>} Resolve array with table data
     */
    getAllRows: async ({ tableName }) => tables[tableName],
    /**
     * Find and update one row in db table
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @param {Object} param.newProps Data for update row
     * @returns {Promise<Object>} Resolve updated row
     */
    updateRow: async ({ tableName, filter, newProps }) => {
      const rowIndex = findIndex({ tableName, filter });
      if (rowIndex >= 0) {
        const tableRow = tables[tableName][rowIndex];
        Object.keys(newProps).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(tableRow, key)) {
            tableRow[key] = newProps[key];
          }
        });
        return tableRow;
      }
      return false;
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
    updateManyRows: async ({ tableName, filter, newProps }) => {
      let calcUpdatedRows = 0;
      const updatedArray = tables[tableName].map((tableRow) => {
        const newRow = tableRow;
        let shouldUpdate = false;
        Object.keys(filter).forEach((keyName) => {
          if (tableRow[keyName] === filter[keyName]) {
            shouldUpdate = true;
          }
        });
        if (shouldUpdate) {
          Object.keys(newProps).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(newRow, key)) {
              newRow[key] = newProps[key];
            }
          });
          calcUpdatedRows += 1;
        }
        return newRow;
      });
      tables[tableName] = [...updatedArray];
      return calcUpdatedRows;
    },
    /**
     * Find a row in db table that match filter
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @returns {Promise<(Object|Boolean)>} Resolve found row or if not found - false
     */
    find: async ({ tableName, filter }) => {
      const rowIndex = findIndex({ tableName, filter });
      if (rowIndex >= 0) {
        return tables[tableName][rowIndex];
      }
      return false;
    },

    delete: async ({ tableName, filter }) => {
      const rowIndex = findIndex({ tableName, filter });
      if (rowIndex >= 0) {
        tables[tableName].splice(rowIndex, 1);
        return true;
      }
      return false;
    },
    /**
     * Find and delete a row in db table that match filter
     * @async
     * @param {Object} param
     * @param {String} param.tableName Table name
     * @param {Object} param.filter Parameters for row search
     * @returns {Promise<Boolean>} Resolve true or if not found - false
     */
    deleteMany: async ({ tableName, filter }) => {
      const newArray = tables[tableName].filter((row) => {
        let shouldDelete = false;
        Object.keys(filter).forEach((keyName) => {
          if (row[keyName] === filter[keyName]) {
            shouldDelete = true;
          }
        });
        if (shouldDelete) {
          return false;
        }
        return true;
      });
      tables[tableName] = [...newArray];
    },
  };
})();
