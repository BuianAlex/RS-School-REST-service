"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Column {
    /**
     * Create a column instance.
     * @param {string} id Column ID
     * @param {string} title Column title
  
     */
    constructor({ id = uuid_1.v4(), title = 'testColumn' } = {}) {
        this.id = id;
        this.title = title;
    }
}
exports.default = Column;
