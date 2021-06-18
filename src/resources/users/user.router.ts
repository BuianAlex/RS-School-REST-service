/* eslint-disable dot-notation */
import express from 'express';

import { User } from '../../entities/user.entity';
import * as usersService from './user.service';
import { responseHandler } from '../../common/responseHandler';
import HttpError, { NOT_FOUND, BAD_REQUEST } from '../../middleware/httpErrors';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    const dataToSend = users.map(User.toResponse);
    return responseHandler(res).successful(dataToSend);
  } catch (error) {
    return next(error);
  }
});

router.route('/:userID').get(async (req, res, next) => {
  const { userID } = req.params;

  try {
    const user = await usersService.findUser(userID);
    if (user) {
      const dataToSend = User.toResponse(user);
      return responseHandler(res).successful(dataToSend);
    }
    throw new HttpError(NOT_FOUND);
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);
    const dataToSend = User.toResponse(newUser);
    return responseHandler(res).created(dataToSend);
  } catch (error) {
    return next(error);
  }
});

router.route('/:userID').delete(async (req, res, next) => {
  const { userID } = req.params;
  try {
    const deleteResult = await usersService.deleteUser(userID);
    const { affected } = deleteResult;
    if (affected === 1) {
      return responseHandler(res).deleted();
    }
    throw new HttpError(NOT_FOUND);
  } catch (error) {
    return next(error);
  }
});

router.route('/:userID').put(async (req, res, next) => {
  const { userID } = req.params;
  try {
    const userUpdated = await usersService.updateUser(userID, req.body);
    if (userUpdated) {
      const dataToSend = User.toResponse(userUpdated);
      return responseHandler(res).updated(dataToSend);
    }
    throw new HttpError(BAD_REQUEST);
  } catch (error) {
    return next(error);
  }
});

export default router;
