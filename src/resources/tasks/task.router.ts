import express from 'express';

import * as taskService from './task.service';
import { responseHandler } from '../../common/responseHandler';

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
    return responseHandler(res).notFound();
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
    return responseHandler(res).notFound();
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const taskUpdated = await taskService.updateTask(taskId, req.body);
    if (taskUpdated) {
      return responseHandler(res).updated(taskUpdated);
    }
    return responseHandler(res).badRequest();
  } catch (error) {
    return next(error);
  }
});

export default router;
