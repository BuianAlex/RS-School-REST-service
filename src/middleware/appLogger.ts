import fs from 'fs';
import path from 'path';
import os from 'os';

import express from 'express';
import moment from 'moment';

interface IAppLogger {
  accessLogger: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
  errorLogger: (error: Error, isCritical?: boolean) => void;
}

export default (): IAppLogger => {
  const logDir = path.join(__dirname, '../../log/');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const accessLogStream = fs.createWriteStream(
    path.join(logDir, 'access.log'),
    {
      flags: 'a',
    }
  );
  const appErrorLogStream = fs.createWriteStream(
    path.join(logDir, 'error.log'),
    {
      flags: 'a',
    }
  );
  return {
    accessLogger: (req, res, next) => {
      const { ip, url, method, body, query, protocol } = req;
      const timeNow = moment().format();
      res.on('finish', () => {
        const { statusCode } = res;
        const logRow = JSON.stringify({
          ip,
          time: timeNow,
          method,
          protocol,
          url,
          body,
          query,
          statusCode,
        });
        accessLogStream.write(logRow + os.EOL);
      });
      next();
    },
    errorLogger: (error: Error, exitOnError = false) => {
      const timeNow = moment().format();
      const { message, stack } = error;
      const logRow = JSON.stringify({ time: timeNow, message, stack });
      console.log(error);

      appErrorLogStream.write(logRow + os.EOL, () => {
        if (exitOnError) {
          process.exit(1);
        }
      });
    },
  };
};
