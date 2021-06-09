import inMemoryDb from '../../db';
import { DBResponse } from '../../db/db.types';
import Board from './board.model';
import { IBoard } from './board.types';

const tableName = 'BOARDS';

export const getAllBoards = async (): Promise<IBoard[]> => {
  const dbResult = await inMemoryDb.getAllRows({ tableName });
  if (Array.isArray(dbResult)) {
    const checked: Board[] = [];
    dbResult.forEach((item) => {
      if (item instanceof Board) {
        checked.push(item);
      }
    });
    return checked;
  }
  throw new Error('DB error');
};

export const addBoard = async (board: IBoard): Promise<IBoard> => {
  const dbResult: DBResponse = await inMemoryDb.addRow({
    tableName,
    data: board,
  });
  if (dbResult instanceof Board) {
    return dbResult;
  }
  throw new Error('DB error');
};

export const findBoard = async (boardID: string): Promise<IBoard | null> => {
  const dbResult: DBResponse | null = await inMemoryDb.find({
    tableName,
    filter: { id: boardID },
  });
  if (dbResult instanceof Board || !dbResult) {
    return dbResult;
  }
  throw new Error('DB error');
};

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
): Promise<IBoard | null> => {
  const dbResult: DBResponse | null = await inMemoryDb.updateRow({
    tableName,
    filter: { id: boardID },
    newProps,
  });
  if (dbResult instanceof Board || !dbResult) {
    return dbResult;
  }
  throw new Error('DB error');
};
