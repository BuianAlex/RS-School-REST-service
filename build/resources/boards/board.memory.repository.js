"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoard = exports.deleteBoard = exports.findBoard = exports.addBoard = exports.getAllBoards = void 0;
const db_1 = __importDefault(require("../../db"));
const tableName = 'BOARDS';
const getAllBoards = async () => db_1.default.getAllRows({ tableName });
exports.getAllBoards = getAllBoards;
const addBoard = async (board) => db_1.default.addRow({ tableName, data: board });
exports.addBoard = addBoard;
const findBoard = async (boardID) => db_1.default.find({ tableName, filter: { id: boardID } });
exports.findBoard = findBoard;
const deleteBoard = async (boardID) => {
    const isDeleted = await db_1.default.delete({
        tableName,
        filter: { id: boardID },
    });
    if (isDeleted) {
        await db_1.default.deleteMany({
            tableName: 'TASKS',
            filter: { boardId: boardID },
        });
        return true;
    }
    return false;
};
exports.deleteBoard = deleteBoard;
const updateBoard = async (boardID, newProps) => db_1.default.updateRow({ tableName, filter: { id: boardID }, newProps });
exports.updateBoard = updateBoard;
