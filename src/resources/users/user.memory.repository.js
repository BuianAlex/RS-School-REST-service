const inMemoryDb = require('../../db');

const tableName = 'USERS';

const getAllUsers = async () => inMemoryDb.getAllRows({ tableName: 'USERS' });

const addUser = async (newUser) =>
  inMemoryDb.addRow({ tableName, data: newUser });

const getById = async (userId) =>
  inMemoryDb.find({ tableName, filter: { id: userId } });

const deleteUser = async (userID) => {
  await inMemoryDb.delete({
    tableName,
    filter: { id: userID },
  });
  await inMemoryDb.updateManyRows({
    tableName: 'TASKS',
    filter: { userId: userID },
    newProps: { userId: null },
  });
  return true;
};

const updateUser = async (userID, newProps) =>
  inMemoryDb.updateRow({
    tableName,
    filter: { id: userID },
    newProps,
  });

module.exports = {
  getAllUsers,
  addUser,
  getById,
  deleteUser,
  updateUser,
};
