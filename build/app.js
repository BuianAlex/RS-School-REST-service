"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const morgan_1 = __importDefault(require("morgan"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
const app = express_1.default();
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../doc/api.yaml'));
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, '../log/access.log'), { flags: 'a' });
app.use(express_1.default.json());
app.use(morgan_1.default('combined', { stream: accessLogStream }));
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', user_router_1.default);
app.use('/boards', board_router_1.default);
app.use('/boards', task_router_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ msg: 'Something broke!' });
});
exports.default = app;
