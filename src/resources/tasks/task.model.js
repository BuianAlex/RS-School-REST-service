const { v4: uuidv4 } = require('uuid');
const tasksRepo = require('./task.memory.repository');

class Task {
  constructor({
    id = uuidv4(),
    title = 'testTask',
    boardId,
    order,
    description,
    userId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.boardId = boardId;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  async save() {
    return tasksRepo.pushTask(this);
  }

  static toResponse(task) {
    return task;
  }
}

module.exports = Task;
