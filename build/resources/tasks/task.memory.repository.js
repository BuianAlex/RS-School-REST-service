"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.findTask = exports.addTask = exports.getAllTasks = void 0;
const db_1 = __importDefault(require("../../db"));
const tableName = 'TASKS';
const getAllTasks = async () => db_1.default.getAllRows({ tableName });
exports.getAllTasks = getAllTasks;
const addTask = async (newTask) => db_1.default.addRow({ tableName, data: newTask });
exports.addTask = addTask;
const findTask = async (taskID) => db_1.default.find({ tableName, filter: { id: taskID } });
exports.findTask = findTask;
const deleteTask = async (taskID) => db_1.default.delete({ tableName, filter: { id: taskID } });
exports.deleteTask = deleteTask;
const updateTask = async (taskID, newProps) => db_1.default.updateRow({ tableName, filter: { id: taskID }, newProps });
exports.updateTask = updateTask;
