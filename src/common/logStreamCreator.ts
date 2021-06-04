import fs from 'fs';
import path from 'path';
/**
 * @module logStreamCreator
 * Create stream for write log to file
 * @param fileName Log File name
 * @returns  writeStream
 */
export default (fileName: string): fs.WriteStream => {
  const logDir = path.join(__dirname, '../../log/');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  return fs.createWriteStream(path.join(logDir, fileName), {
    flags: 'a',
  });
};
