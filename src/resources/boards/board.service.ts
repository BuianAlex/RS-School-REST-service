/**
 * @module boardService
 */
import * as boardsRepo from './board.memory.repository';
import Board from './board.model';
import { IBoard } from './board.types';
/**
 * Get all boards from the db
 * @async
 * @returns {Promise<Board[]>} Resolve in array of boards objects
 */
export const getAllBoards = async (): Promise<IBoard[]> =>
  boardsRepo.getAllBoards();
/**
 * Create a new board and add to the db
 * @async
 * @param {Object} boardData Data for new board
 * @param {String} boardData.title Board title
 * @param {Array} boardData.columns Array of columns
 * @returns {Promise<Board>} new board object
 */
export const createBoard = (boardData: IBoard): Promise<IBoard> => {
  const newBoard = new Board(boardData);
  return boardsRepo.addBoard(newBoard);
};
/**
 * Find a board by ID
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<(Object|Boolean)>} Resolve board object if board not found - false
 */
export const findBoard = (boardId: string): Promise<IBoard | null> =>
  boardsRepo.findBoard(boardId);
/**
 * Delete board by id
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<Boolean>} Resolve true if board not found - false
 */
export const deleteBoard = async (boardId: string): Promise<boolean> =>
  boardsRepo.deleteBoard(boardId);
/**
 * Find board by id and update
 * @async
 * @param {String} boardID Board ID
 * @property {Object} newProps Prors for update board
 * @property {String} newProps.title Board title
 * @property {Array} newProps.columns Array of columns
 * @returns {Promise<(Board|null)>} Resolve updated board if board not found - false
 */
export const updateBoard = async (
  boardID: string,
  newProps: Partial<IBoard>
): Promise<IBoard | null> => boardsRepo.updateBoard(boardID, newProps);
