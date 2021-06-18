import { DeleteResult } from 'typeorm';
/**
 * @module boardService
 */
import * as boardsRepo from './board.repository';
import { Board } from '../../entities/board.entity';

/**
 * Get all boards from the db
 * @async
 * @returns {Promise<Board[]>} Resolve in array of boards objects
 */
export const getAllBoards = async (): Promise<Board[]> =>
  boardsRepo.getAllBoards();
/**
 * Create a new board and add to the db
 * @async
 * @param {Object} boardData Data for new board
 * @param {String} boardData.title Board title
 * @param {Array} boardData.columns Array of columns
 * @returns {Promise<Board>} new board object
 */
export const createBoard = (boardData: Board): Promise<Board> =>
  boardsRepo.addBoard(boardData);

/**
 * Find a board by ID
 * @async
 * @param {String} boardID  Board ID
 * @returns {Promise<(Board|Boolean)>} Resolve board object if board not found - false
 */
export const findBoard = (boardID: string): Promise<Board | undefined> =>
  boardsRepo.findBoard(boardID);
/**
 * Delete board by id
 * @async
 * @param {String} boardID  Board ID
 * @returns {Promise<Boolean>} Resolve true if board not found - false
 */
export const deleteBoard = async (boardID: string): Promise<DeleteResult> =>
  boardsRepo.deleteBoard(boardID);
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
  newProps: Partial<Board>
): Promise<Board | undefined> => boardsRepo.updateBoard(boardID, newProps);
