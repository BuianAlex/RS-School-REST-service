import path from 'path';

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import { loginUser } from './resources/login/login.service';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { responseHandler } from './common/responseHandler';
import HttpError, { NOT_FOUND } from './middleware/httpErrors';
import AppLogger from './middleware/appLogger';
import { permissionValidator } from './middleware/permissionValidator';
import { jsonValidator } from './middleware/jsonValidator';
import * as loginJsonSchema from './resources/login/jsonSchema';

const logger = AppLogger();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logger.accessLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', jsonValidator(loginJsonSchema.validate), loginUser);
app.use(permissionValidator);
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
    const { statusCode, message } = err;

    if (statusCode) {
      if (err instanceof HttpError) {
        return responseHandler(res).httpError(err);
      }
      const httpError = new HttpError({ msg: message, code: statusCode });
      return responseHandler(res).httpError(httpError);
    }
    logger.errorLogger(err);
    return responseHandler(res).internalServerError();
    _next();
  }
);

process
  .on('unhandledRejection', (error: Error) => {
    const rejectionError = error;
    rejectionError.message = `UnhandledRejection ${error.message}`;
    logger.errorLogger(rejectionError, true);
  })
  .on('uncaughtException', (error) => {
    const exceptionError = error;
    exceptionError.message = `UncaughtException ${error.message}`;
    logger.errorLogger(exceptionError, true);
  });

export default app;
