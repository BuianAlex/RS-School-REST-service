"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * Class to create a task object
 */
class Task {
    /**
     * @param {Object} taskData  Data object for new task
     * @param {string} taskData.id Task ID
     * @param {string} taskData.boardId  Board ID with belong task
     * @param {string} taskData.title Title of task
     * @param {number} taskData.order Order for showing
     * @param {string} taskData.description Task description
     * @param {string} taskData.userId Owner User ID
     * @param {string} taskData.columnId Column ID with belong task
     */
    constructor({ id = uuid_1.v4(), title = 'testTask', boardId, order, description, userId, columnId, }) {
        this.id = id;
        this.title = title;
        this.boardId = boardId;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.default = Task;
