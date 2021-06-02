"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const columns_model_1 = __importDefault(require("../columns/columns.model"));
/**
 * Class representing a board
 */
class Board {
    /**
     * Create a board.
     * @param {string} id Board ID
     * @param {string} title Board title
     * @param {Array} columns Array of columns
     */
    constructor({ id = uuid_1.v4(), title = 'testBoard', columns = [new columns_model_1.default()] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}
exports.default = Board;
