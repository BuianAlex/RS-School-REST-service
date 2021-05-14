const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getAll();
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.getById(taskId);
    if (task) {
      return res.json(task);
    }
    return res.status(404).send('Task not found');
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
    res.status(201);
    return res.json(Task.toResponse(newTask));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  const { taskId } = req.params;
  console.log(taskId);
  try {
    const isSuccessful = await taskService.deleteById(taskId);
    if (isSuccessful) {
      return res.status(204).send('The task has been deleted');
    }
    return res.status(404).send('Task not found');
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const taskUpdated = await taskService.findByIdAndUpdate(taskId, req.body);
    if (taskUpdated) {
      return res.json(taskUpdated);
    }
    return res.status(404).send('Task not found');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
