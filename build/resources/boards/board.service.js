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
exports.updateBoard = exports.deleteBoard = exports.findBoard = exports.createBoard = exports.getAllBoards = void 0;
/**
 * @module boardService
 */
const boardsRepo = __importStar(require("./board.memory.repository"));
const board_model_1 = __importDefault(require("./board.model"));
/**
 * Get all boards from the db
 * @async
 * @returns {Promise<Board[]>} Resolve in array of boards objects
 */
const getAllBoards = async () => boardsRepo.getAllBoards();
exports.getAllBoards = getAllBoards;
/**
 * Create a new board and add to the db
 * @async
 * @param {Object} boardData Data for new board
 * @param {String} boardData.title Board title
 * @param {Array} boardData.columns Array of columns
 * @returns {Promise<Board>} new board object
 */
const createBoard = (boardData) => {
    const newBoard = new board_model_1.default(boardData);
    return boardsRepo.addBoard(newBoard);
};
exports.createBoard = createBoard;
/**
 * Find a board by ID
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<(Object|Boolean)>} Resolve board object if board not found - false
 */
const findBoard = (boardId) => boardsRepo.findBoard(boardId);
exports.findBoard = findBoard;
/**
 * Delete board by id
 * @async
 * @param {String} boardId  Board ID
 * @returns {Promise<Boolean>} Resolve true if board not found - false
 */
const deleteBoard = async (boardId) => boardsRepo.deleteBoard(boardId);
exports.deleteBoard = deleteBoard;
/**
 * Find board by id and update
 * @async
 * @param {String} boardID Board ID
 * @property {Object} newProps Prors for update board
 * @property {String} newProps.title Board title
 * @property {Array} newProps.columns Array of columns
 * @returns {Promise<(Board|null)>} Resolve updated board if board not found - false
 */
const updateBoard = async (boardID, newProps) => boardsRepo.updateBoard(boardID, newProps);
exports.updateBoard = updateBoard;
