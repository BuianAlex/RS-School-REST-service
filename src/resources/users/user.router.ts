import express from 'express';

import User from './user.model';
import * as usersService from './user.service';
import { responseHandler } from '../../common/responseHandler';

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

router.route('/:userId').get(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await usersService.findUser(userId);
    if (user) {
      const dataToSend = User.toResponse(user);
      return responseHandler(res).successful(dataToSend);
    }
    return responseHandler(res).notFound();
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

router.route('/:userId').delete(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const isSuccessful = await usersService.deleteUser(userId);
    if (typeof isSuccessful === 'boolean' && isSuccessful) {
      return responseHandler(res).deleted();
    }
    return responseHandler(res).notFound();
  } catch (error) {
    return next(error);
  }
});

router.route('/:userId').put(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userUpdated = await usersService.updateUser(userId, req.body);
    if (userUpdated) {
      const dataToSend = User.toResponse(userUpdated);
      return responseHandler(res).updated(dataToSend);
    }
    return responseHandler(res).badRequest();
  } catch (error) {
    return next(error);
  }
});

export default router;
