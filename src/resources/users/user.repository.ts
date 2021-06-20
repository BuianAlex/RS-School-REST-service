import { getRepository, DeleteResult } from 'typeorm';

import { User } from '../../entities/user.entity';

export const getAllUsers = async (): Promise<User[]> => {
  const usersRepository = getRepository(User);
  return usersRepository.find();
};

export const addUser = async (newUser: User): Promise<User> => {
  const usersRepository = getRepository(User);
  const user = usersRepository.create(newUser);
  return usersRepository.save(user);
};

export const getById = async (userID: string): Promise<User | undefined> => {
  const usersRepository = getRepository(User);
  return usersRepository.findOne(userID);
};

export const deleteUser = async (userID: string): Promise<DeleteResult> => {
  const usersRepository = getRepository(User);
  const userDeleteResult = await usersRepository.delete(userID);
  return userDeleteResult;
};

export const updateUser = async (
  userID: string,
  newProps: Partial<User>
): Promise<User | undefined> => {
  const usersRepository = getRepository(User);
  const userForUpdate = await usersRepository.findOne(userID);
  if (userForUpdate) {
    const updateResult = await usersRepository.save({
      ...userForUpdate,
      ...newProps,
    });
    return updateResult;
  }
  return undefined;
};
