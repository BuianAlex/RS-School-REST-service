import express from 'express';

import * as taskService from './task.service';
import * as httpCodes from '../../common/statusCodes';

const router = express.Router();

 router.route('/:boardId/tasks').get(async (_req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.findTask(taskId);
    if (task) {
      return res.json(task);
    }
    return res.status(httpCodes.NotFound).send('Task not found');
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
    res.status(httpCodes.Created);
    return res.json(newTask);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const isSuccessful = await taskService.deleteTask(taskId);
    if (isSuccessful) {
      return res.status(httpCodes.Deleted).send('The task has been deleted');
    }
    return res.status(httpCodes.NotFound).send('Task not found');
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const taskUpdated = await taskService.updateTask(taskId, req.body);
    if (taskUpdated) {
      return res.json(taskUpdated);
    }
    return res.status(httpCodes.NotFound).send('Task not found');
  } catch (error) {
    return next(error);
  }
});

export default router;