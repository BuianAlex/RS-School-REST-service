import express from 'express';

import * as taskService from './task.service';
import { responseHandler } from '../../common/responseHandler';
import HttpError, { NOT_FOUND, BAD_REQUEST } from '../../middleware/httpErrors';

const router = express.Router();

router.route('/:boardId/tasks').get(async (_req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    return responseHandler(res).successful(tasks);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.findTask(taskId);
    if (task) {
      return responseHandler(res).successful(task);
    }
    throw new HttpError(NOT_FOUND);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  const { boardId } = req.params;
  const taskData = req.body;
  taskData.boardId = boardId;
  try {
    const newTask = await taskService.createTask(taskData);
    return responseHandler(res).created(newTask);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const isSuccessful = await taskService.deleteTask(taskId);
    if (isSuccessful) {
      return responseHandler(res).deleted();
    }
    throw new HttpError(NOT_FOUND);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  const { taskId, boardId } = req.params;
  const newProps = req.body;
  newProps.boardId = boardId;
  try {
    const taskUpdated = await taskService.updateTask(taskId, newProps);
    if (taskUpdated) {
      return responseHandler(res).updated(taskUpdated);
    }
    throw new HttpError(BAD_REQUEST);
  } catch (error) {
    return next(error);
  }
});

export default router;
