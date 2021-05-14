const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const validate = require('../../middleWare/validateMiddleware');
const schema = require('./json.schema');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    return res.json(boards.map(Board.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const board = await boardsService.getById(boardId);
    if (board) {
      return res.json(Board.toResponse(board));
    }
    return res.status(404).send('Board not found');
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(validate(schema), async (req, res, next) => {
  try {
    const newBoard = await boardsService.createBoard(req.body);
    res.status(201);
    return res.json(Board.toResponse(newBoard));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const isSuccessful = await boardsService.deleteById(boardId);
    if (isSuccessful) {
      return res.status(204).send('The board has been deleted');
    }
    return res.status(404).send('Board not found');
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').put(validate(schema), async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const boardUpdated = await boardsService.findByIdAndUpdate(
      boardId,
      req.body
    );
    if (boardUpdated) {
      return res.json(Board.toResponse(boardUpdated));
    }
    return res.status(400).send('Bad request');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
