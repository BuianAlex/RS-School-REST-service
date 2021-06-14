import inMemoryDb from '../../db';
import { DBResponse } from '../../db/db.types';
import User from './user.model';

import { IUser, UserID } from './user.types';

const tableName = 'USERS';

export const getAllUsers = async (): Promise<IUser[]> => {
  const dbResult = await inMemoryDb.getAllRows({ tableName });
  if (Array.isArray(dbResult)) {
    const checked: IUser[] = [];
    dbResult.forEach((item) => {
      if (item instanceof User) {
        checked.push(item);
      }
    });
    return checked;
  }
  throw new Error('DB error');
};

export const addUser = async (newUser: IUser): Promise<IUser> => {
  const dbResult: DBResponse = await inMemoryDb.addRow({
    tableName,
    data: newUser,
  });
  if (dbResult instanceof User) {
    return dbResult;
  }
  throw new Error('DB error');
};

export const getById = async (userID: UserID): Promise<IUser | null> => {
  const dbResult: DBResponse | null = await inMemoryDb.find({
    tableName,
    filter: { id: userID },
  });
  if (dbResult instanceof User || !dbResult) {
    return dbResult;
  }
  throw new Error('DB error');
};

export const deleteUser = async (userID: UserID): Promise<boolean> => {
  const isDeleted = await inMemoryDb.delete({
    tableName,
    filter: { id: userID },
  });
  if (isDeleted) {
    await inMemoryDb.updateManyRows({
      tableName: 'TASKS',
      filter: { userId: userID },
      newProps: { userId: null },
    });
    return true;
  }
  return false;
};

export const updateUser = async (
  userID: UserID,
  newProps: Partial<IUser>
): Promise<IUser | null> => {
  const dbResult: DBResponse | null = await inMemoryDb.updateRow({
    tableName,
    filter: { id: userID },
    newProps,
  });
  if (dbResult instanceof User || !dbResult) {
    return dbResult;
  }
  throw new Error('DB error');
};
