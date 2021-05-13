const userList = [];

const getAll = async () => userList;

const pushUser = async (user) => {
  userList.push(user);
  return user;
};

const getById = async (userId) => {
  const filteredArray = userList.filter((item) => item.id === userId);
  if (filteredArray.length) {
    return filteredArray[0];
  }
  return false;
};

const deleteById = async (userId) => {
  const rowIndex = userList.findIndex((item) => item.id === userId);
  if (rowIndex >= 0) {
    userList.splice(rowIndex, 1);
    return true;
  }
  return false;
};

const findByIdAndUpdate = async (userId, newProps) => {
  console.log(newProps);
  const rowIndex = userList.findIndex((item) => item.id === userId);
  if (rowIndex >= 0) {
    const user = userList[rowIndex];
    Object.keys(newProps).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        user[key] = newProps[key];
      }
    });
    return user;
  }
  return false;
};

module.exports = { getAll, pushUser, getById, deleteById, findByIdAndUpdate };
