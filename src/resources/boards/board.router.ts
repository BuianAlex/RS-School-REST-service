import express from 'express';

import * as boardsService from './board.service';
import { responseHandler } from '../../common/responseHandler';
import HttpError, { NOT_FOUND, BAD_REQUEST } from '../../middleware/httpErrors';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();
    return responseHandler(res).successful(boards);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const board = await boardsService.findBoard(boardId);
    if (board) {
      return responseHandler(res).successful(board);
    }
    throw new HttpError(NOT_FOUND);
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await boardsService.createBoard(req.body);
    return responseHandler(res).created(newBoard);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const isSuccessful = await boardsService.deleteBoard(boardId);
    if (isSuccessful) {
      return responseHandler(res).deleted();
    }
    throw new HttpError(NOT_FOUND);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const boardUpdated = await boardsService.updateBoard(boardId, req.body);
    if (boardUpdated) {
      return responseHandler(res).updated(boardUpdated);
    }
    throw new HttpError(BAD_REQUEST);
  } catch (error) {
    return next(error);
  }
});

export default router;
