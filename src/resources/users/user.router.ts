import express from 'express';
import * as httpCodes from '../../common/statusCodes';

import User from './user.model';
import * as usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    // throw new Error();
    setTimeout(() => res.json(users.map(User.toResponse)), 2000);
  } catch (error) {
    return next(error);
  }
});

router.route('/:userId').get(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await usersService.findUser(userId);
    if (user) {
      return res.json(User.toResponse(user));
    }
    return res.status(httpCodes.NotFound).json({ msg: 'User not found' });
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);
    res.status(httpCodes.Created);
    return res.json(User.toResponse(newUser));
  } catch (error) {
    return next(error);
  }
});

router.route('/:userId').delete(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const isSuccessful = await usersService.deleteUser(userId);
    if (typeof isSuccessful === 'boolean' && isSuccessful) {
      return res
        .status(httpCodes.Deleted)
        .json({ msg: 'The user has been deleted' });
    }
    return res.status(httpCodes.NotFound).json({ msg: 'User not found' });
  } catch (error) {
    return next(error);
  }
});

router.route('/:userId').put(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userUpdated = await usersService.updateUser(userId, req.body);
    if (userUpdated) {
      return res.json(User.toResponse(userUpdated));
    }
    return res.status(httpCodes.BadRequest).send('Bad request');
  } catch (error) {
    return next(error);
  }
});

export default router;
