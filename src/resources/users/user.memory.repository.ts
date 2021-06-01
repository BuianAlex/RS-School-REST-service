import inMemoryDb from '../../db';
import { IUser, UserID } from './user.types';

const tableName: string = 'USERS';

export const getAllUsers = async (): Promise<IUser[]> =>
  inMemoryDb.getAllRows({ tableName: 'USERS' });

export const addUser = async (newUser: IUser): Promise<IUser> =>
  inMemoryDb.addRow({ tableName, data: newUser });

export const getById = async (userID: UserID): Promise<IUser | null> =>
  inMemoryDb.find({ tableName, filter: { id: userID } });

export const deleteUser = async (userID: UserID): Promise<boolean> => {
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

export const updateUser = async (
  userID: UserID,
  newProps: IUser
): Promise<IUser | null> =>
  inMemoryDb.updateRow({
    tableName,
    filter: { id: userID },
    newProps,
  });
