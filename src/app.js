const fs = require('fs');
const path = require('path');

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err && err.status) {
    res.status(err.status);
    res.send(err.message);
  } else {
    const answer = new Error();
    answer.message = 'Something broke!';
    res.status(500).send(answer);
  }
  next();
});

module.exports = app;
