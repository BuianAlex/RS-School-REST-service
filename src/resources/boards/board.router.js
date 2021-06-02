const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();
    return res.json(boards);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const board = await boardsService.findBoard(boardId);
    if (board) {
      return res.json(board);
    }
    return res.status(404).send('Board not found');
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await boardsService.createBoard(req.body);
    res.status(201);
    return res.json(newBoard);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const isSuccessful = await boardsService.deleteBoard(boardId);
    if (isSuccessful) {
      return res.status(204).send('The board has been deleted');
    }
    return res.status(404).send('Board not found');
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const boardUpdated = await boardsService.updateBoard(boardId, req.body);
    if (boardUpdated) {
      return res.json(boardUpdated);
    }
    return res.status(400).send('Bad request');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
