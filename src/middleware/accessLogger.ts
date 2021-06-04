import fs from 'fs';
import os from 'os';

import express from 'express';
import moment from 'moment';
/**
 * @module  accessLogger
 * Function for log requests
 * @param fileStream  Write stream to log file
 * @returns Function
 * @param req Express request
 * @param res Express response
 * @param next Express nextFunction
 * @returns void
 */
export default (
  fileStream: fs.WriteStream
): ((
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
    fileStream.write(logRow + os.EOL);
  });
  next();
};
