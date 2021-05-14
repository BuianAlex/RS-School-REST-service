let taskList = [];

const getAll = async () => taskList;

const pushTask = async (task) => {
  taskList.push(task);
  return task;
};

const getById = async (boardId) => {
  const filteredArray = taskList.filter((item) => item.id === boardId);
  if (filteredArray.length) {
    return filteredArray[0];
  }
  return false;
};

const deleteById = async (taskId) => {
  const rowIndex = taskList.findIndex((item) => item.id === taskId);
  if (rowIndex >= 0) {
    taskList.splice(rowIndex, 1);
    return true;
  }
  return false;
};

const findByIdAndUpdate = async (taskId, newProps) => {
  const rowIndex = taskList.findIndex((item) => item.id === taskId);
  if (rowIndex >= 0) {
    const task = taskList[rowIndex];
    Object.keys(newProps).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(task, key)) {
        task[key] = newProps[key];
      }
    });
    return task;
  }
  return false;
};

const updateMany = async (filter, filterValue, newValue) => {
  taskList.forEach((item, i) => {
    if (item[filter] === filterValue) {
      taskList[i][filter] = newValue;
    }
  });
};

const deleteMany = async (filter, filterValue) => {
  const newList = taskList.filter((item) => {
    if (item[filter] !== filterValue) {
      return true;
    }
    return false;
  });

  taskList = newList;
};

module.exports = {
  getAll,
  pushTask,
  getById,
  deleteById,
  findByIdAndUpdate,
  updateMany,
  deleteMany,
};
