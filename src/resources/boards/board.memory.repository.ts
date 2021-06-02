import inMemoryDb from '../../db';
import { IBoard } from './board.types';

const tableName: string = 'BOARDS';

export const getAllBoards = async (): Promise<IBoard[]> =>
  inMemoryDb.getAllRows({ tableName });

export const addBoard = async (board: IBoard): Promise<IBoard> =>
  inMemoryDb.addRow({ tableName, data: board });

export const findBoard = async (boardID: string): Promise<IBoard | null> =>
  inMemoryDb.find({ tableName, filter: { id: boardID } });

export const deleteBoard = async (boardID: string): Promise<boolean> => {
  const isDeleted = await inMemoryDb.delete({
    tableName,
    filter: { id: boardID },
  });
  if (isDeleted) {
    await inMemoryDb.deleteMany({
      tableName: 'TASKS',
      filter: { boardId: boardID },
    });
    return true;
  }
  return false;
};

export const updateBoard = async (
  boardID: string,
  newProps: Partial<IBoard>
): Promise<IBoard | null> =>
  inMemoryDb.updateRow({ tableName, filter: { id: boardID }, newProps });
