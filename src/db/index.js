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
    addRow: async ({ tableName, data }) => {
      tables[tableName].push(data);
      const tableLength = tables[tableName].length;
      return tables[tableName][tableLength - 1];
    },

    getAllRows: async ({ tableName }) => tables[tableName],

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
