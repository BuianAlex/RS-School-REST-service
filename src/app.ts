import path from 'path';

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import accessLogger from './middleware/accessLogger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { responseHandler } from './common/responseHandler';
import logStreamCreator from './common/logStreamCreator';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const accessLogStream = logStreamCreator('access.log');

app.use(express.json());
app.use(accessLogger(accessLogStream));

// app.use((_req, _res, _next) => {
//   throw new Error('Dfdfd');
//   // next();
// });

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((_req, res, next) => {
  responseHandler(res).notFound();
  next();
});

app.use(
  (
    err: express.ErrorRequestHandler,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    responseHandler(res).internalServerError();
    _next();
  }
);

export default app;
