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
import ErrorLogger from './middleware/errorLogger';
import HttpError, { NOT_FOUND } from './middleware/httpErrors';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const accessLogStream = logStreamCreator('access.log');
const appErrorLogStream = logStreamCreator('error.log');
const errorLogger = ErrorLogger(appErrorLogStream);

app.use(express.json());

app.use(accessLogger(accessLogStream));

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

app.use(() => {
  throw new HttpError(NOT_FOUND);
});

app.use(
  (
    err: HttpError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const { statusCode } = err;
    if (statusCode) {
      return responseHandler(res).httpError(err);
    }
    errorLogger(err);
    return responseHandler(res).internalServerError();
    _next();
  }
);

process
  .on('unhandledRejection', (error: Error) => {
    const updatedError = error;
    updatedError.message = `UnhandledRejection ${error.message}`;
    errorLogger(updatedError);
  })
  .on('uncaughtException', (error) => {
    console.log('dfddf');

    const updatedError = error;
    updatedError.message = `UncaughtException ${error.message}`;
    errorLogger(updatedError);
    appErrorLogStream.on('close', () => {
      process.exit(1);
    });
  });
throw Error('Oops!');
// Promise.reject(Error('Oops!'));
export default app;
