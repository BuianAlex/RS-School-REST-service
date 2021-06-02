const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
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
    return res.status(404).send('User not found');
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
    if (isSuccessful) {
      return res.status(204).send('The user has been deleted');
    }
    return res.status(404).send('User not found');
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

module.exports = router;
