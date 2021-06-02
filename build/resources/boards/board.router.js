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
const boardsService = __importStar(require("./board.service"));
const router = express_1.default.Router();
router.route('/').get(async (_req, res, next) => {
    try {
        const boards = await boardsService.getAllBoards();
        return res.json(boards);
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:boardId').get(async (req, res, next) => {
    const { boardId } = req.params;
    try {
        const board = await boardsService.findBoard(boardId);
        if (board) {
            return res.json(board);
        }
        return res.status(404).send('Board not found');
    }
    catch (error) {
        return next(error);
    }
});
router.route('/').post(async (req, res, next) => {
    try {
        const newBoard = await boardsService.createBoard(req.body);
        res.status(201);
        return res.json(newBoard);
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:boardId').delete(async (req, res, next) => {
    const { boardId } = req.params;
    try {
        const isSuccessful = await boardsService.deleteBoard(boardId);
        if (isSuccessful) {
            return res.status(204).send('The board has been deleted');
        }
        return res.status(404).send('Board not found');
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:boardId').put(async (req, res, next) => {
    const { boardId } = req.params;
    try {
        const boardUpdated = await boardsService.updateBoard(boardId, req.body);
        if (boardUpdated) {
            return res.json(boardUpdated);
        }
        return res.status(400).send('Bad request');
    }
    catch (error) {
        return next(error);
    }
});
exports.default = router;
