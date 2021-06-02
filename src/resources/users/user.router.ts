import express from 'express';

import User from './user.model';
import * as usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    return res.json(users.map(User.toResponse));
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
    return res.status(404).json({ msg: 'User not found' });
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);
    res.status(201);
    return res.json(User.toResponse(newUser));
  } catch (error) {
    return next(error);
  }
});

router.route('/:userId').delete(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const isSuccessful = await usersService.deleteUser(userId);
    console.log(isSuccessful);

    if (typeof isSuccessful === 'boolean' && isSuccessful) {
      return res.status(204).json({ msg: 'The user has been deleted' });
    }
    return res.status(404).json({ msg: 'User not found' });
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
    return res.status(400).send('Bad request');
  } catch (error) {
    return next(error);
  }
});

export default router;
