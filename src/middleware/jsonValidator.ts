import { ValidateFunction } from 'ajv/dist/jtd';
import express from 'express';

import HttpError, { BAD_REQUEST } from './httpErrors';

export const jsonValidator = (validatorFnc: ValidateFunction) => (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  if (!validatorFnc(req.body)) {
    next(new HttpError(BAD_REQUEST));
  } else {
    next();
  }
};
