import fs from 'fs';
import os from 'os';

import moment from 'moment';
/**
 * @module  errorLogger
 * Function for log add errors
 * @param fileStream  Write stream to log file
 * @returns Function
 * @param error Error object
 * @returns void
 */
export default (
  fileStream: fs.WriteStream
): (( error: Error | Record<string, unknown>) => void) => {
  const timeNow = moment().format();
  return (error) => {
    const { message, stack } = error;
    const logRow = JSON.stringify({ time: timeNow, message, stack });
    fileStream.write(logRow + os.EOL);
  };
};
