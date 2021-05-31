import fs from 'fs';
import path from 'path';

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../log/access.log'),
  { flags: 'a' }
);

app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));

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

app.use((err:express.ErrorRequestHandler, _req: express.Request, res:express.Response, _next:express.NextFunction) => {
  console.error(err);
  res.status(500).json({msg: 'Something broke!'});
});

export default  app;
