"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getById = exports.addUser = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../../db"));
const tableName = 'USERS';
const getAllUsers = async () => db_1.default.getAllRows({ tableName: 'USERS' });
exports.getAllUsers = getAllUsers;
const addUser = async (newUser) => db_1.default.addRow({ tableName, data: newUser });
exports.addUser = addUser;
const getById = async (userID) => db_1.default.find({ tableName, filter: { id: userID } });
exports.getById = getById;
const deleteUser = async (userID) => {
    const isDeleted = await db_1.default.delete({
        tableName,
        filter: { id: userID },
    });
    if (isDeleted) {
        await db_1.default.updateManyRows({
            tableName: 'TASKS',
            filter: { userId: userID },
            newProps: { userId: null },
        });
        return true;
    }
    return false;
};
exports.deleteUser = deleteUser;
const updateUser = async (userID, newProps) => db_1.default.updateRow({
    tableName,
    filter: { id: userID },
    newProps,
});
exports.updateUser = updateUser;
