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
const user_model_1 = __importDefault(require("./user.model"));
const usersService = __importStar(require("./user.service"));
const router = express_1.default.Router();
router.route('/').get(async (_req, res, next) => {
    try {
        const users = await usersService.getAll();
        return res.json(users.map(user_model_1.default.toResponse));
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:userId').get(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await usersService.findUser(userId);
        if (user) {
            return res.json(user_model_1.default.toResponse(user));
        }
        return res.status(404).json({ msg: 'User not found' });
    }
    catch (error) {
        return next(error);
    }
});
router.route('/').post(async (req, res, next) => {
    try {
        const newUser = await usersService.createUser(req.body);
        res.status(201);
        return res.json(user_model_1.default.toResponse(newUser));
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:userId').delete(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const isSuccessful = await usersService.deleteUser(userId);
        console.log(isSuccessful);
        if (typeof isSuccessful === 'boolean' && isSuccessful) {
            return res.status(204).json({ msg: 'The user has been deleted' });
        }
        return res.status(404).json({ msg: 'User not found' });
    }
    catch (error) {
        return next(error);
    }
});
router.route('/:userId').put(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const userUpdated = await usersService.updateUser(userId, req.body);
        if (userUpdated) {
            return res.json(user_model_1.default.toResponse(userUpdated));
        }
        return res.status(400).send('Bad request');
    }
    catch (error) {
        return next(error);
    }
});
exports.default = router;
