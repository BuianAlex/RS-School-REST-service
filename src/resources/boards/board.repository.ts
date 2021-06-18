import { getRepository, DeleteResult } from 'typeorm';
//
import { Board } from '../../entities/board.entity';
import { ColumnEnt } from '../../entities/column.entity';

export const getAllBoards = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({ relations: ['columns'] });
};

export const addBoard = async (newBoard: Board): Promise<Board> => {
  const { columns, title } = newBoard;
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(ColumnEnt);
  const arrColumns = columns.map((item) => columnRepository.create(item));
  await columnRepository.save(arrColumns);
  const board = boardRepository.create({ title, columns: arrColumns });
  return boardRepository.save(board);
};

export const findBoard = async (
  boardID: string
): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  try {
    return boardRepository.findOne(boardID, { relations: ['columns'] });
  } catch (error) {
    return error;
  }
};

export const deleteBoard = async (boardID: string): Promise<DeleteResult> => {
  const boardRepository = getRepository(Board);
  return boardRepository.delete(boardID);
};

export const updateBoard = async (
  boardID: string,
  newProps: Partial<Board>
): Promise<Board | undefined> => {
  const { columns, ...restProp } = newProps;
  console.log(columns, restProp);

  const boardRepository = getRepository(Board);
  const boardForUpdate = await boardRepository.findOne(boardID, {
    relations: ['columns'],
  });
  if (boardForUpdate) {
    const updateResult = await boardRepository.save({
      ...boardForUpdate,
      ...restProp,
    });
    return updateResult;
  }
  return undefined;
};
