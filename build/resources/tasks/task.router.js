"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskService = __importStar(require("./task.service"));
const router = express_1.default.Router();
router.route('/:boardId/tasks').get(async (_req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks();
        return res.json(tasks);
    }
    catch (error) {
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
        return res.status(404).send('Task not found');
    }
    catch (error) {
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
        return res.json(newTask);
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const isSuccessful = await taskService.deleteTask(taskId);
        if (isSuccessful) {
            return res.status(204).send('The task has been deleted');
        }
        return res.status(404).send('Task not found');
    }
    catch (error) {
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
        return res.status(404).send('Task not found');
    }
    catch (error) {
        return next(error);
    }
});
exports.default = router;
