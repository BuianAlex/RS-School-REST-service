import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';

import config from '../../common/config';
import * as usersRepo from '../users/user.repository';
import HttpError, { FORBIDDEN, BAD_REQUEST } from '../../middleware/httpErrors';
import { responseHandler } from '../../common/responseHandler';

export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { password, login } = req.body;
  try {
    if (!password || !login) throw new HttpError(BAD_REQUEST);
    const user = await usersRepo.getByLogin(login);
    if (user) {
      const compareResult = await bcrypt.compare(password, user.password);
      if (!compareResult) throw new HttpError(FORBIDDEN);
      const token = await new Promise<string | Error>((resolve, reject) => {
        jwt.sign(
          { id: user.id },
          config.JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60 * 24,
          },
          (err, result) => {
            if (err) return reject(err);
            if (!result) return reject(new Error('Token not created'));
            return resolve(result);
          }
        );
      });
      if (typeof token === 'string') {
        return responseHandler(res).successful({ token });
      }
      throw new Error('Token not created');
    }
    throw new HttpError(FORBIDDEN);
  } catch (error) {
    return next(error);
  }
};
