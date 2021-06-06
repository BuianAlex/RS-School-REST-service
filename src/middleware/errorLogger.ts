import fs from 'fs';
import os from 'os';

import moment from 'moment';
/**
 * @module  errorLogger
 * Function for log  errors
 * @param fileStream  Write stream to log file
 * @returns Function
 * @param error Error object
 * @returns void
 */
export default (
  fileStream: fs.WriteStream
): ((error: Error | Record<string, unknown>, isCritical?: boolean) => void) => {
  const timeNow = moment().format();
  return (error, isCritical = false) => {
    const { message, stack } = error;
    const logRow = JSON.stringify({ time: timeNow, message, stack });
    fileStream.write(logRow + os.EOL, () => {
      if (isCritical) {
        process.exit(1);
      }
    });
  };
};
