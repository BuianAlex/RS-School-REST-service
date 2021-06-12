import { ValidateFunction } from 'ajv/dist/jtd';
import express from 'express';
import HttpError, { BAD_REQUEST } from './httpErrors';

const validate = (validator: ValidateFunction) => (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  if (!validator(req.body)) {
    next(new HttpError(BAD_REQUEST));
  } else {
    next();
  }
};

export default validate;
