import jwt from 'jsonwebtoken';
import express from 'express';

import HttpError, { UNAUTHORIZED } from './httpErrors';

export const validator = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  try {
    const headerString = req.header('Authorization');
    if (!headerString) throw new HttpError(UNAUTHORIZED);
    const [type, token] = headerString.split(' ');
    if (type !== 'Bearer' || !token) throw new HttpError(UNAUTHORIZED);
    try {
      jwt.verify(token, 'lets_play_sum_games_man');
    } catch (error) {
      next(new HttpError(UNAUTHORIZED));
    }
    next();
  } catch (error) {
    next(error);
  }
};
