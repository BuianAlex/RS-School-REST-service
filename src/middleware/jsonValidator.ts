import express from 'express';
import { validationResult, matchedData } from 'express-validator';

import HttpError, { BAD_REQUEST } from './httpErrors';

export const jsonValidatorCheckResult = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  const result = validationResult(req);
  const sanitized = matchedData(req);
  req.body = sanitized;
  if (result.isEmpty()) {
    return next();
  }
  return next(new HttpError(BAD_REQUEST));
};
