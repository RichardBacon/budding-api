const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const {
  getUsers,
  getUserByID,
  postUser,
} = require('../controllers/users.controller');
const {
  getPlantsByUserId,
  postPlantByUserId,
} = require('../controllers/plants.controller');

const usersRouter = express.Router();

usersRouter.route('/').get(getUsers).post(postUser).all(send405);

usersRouter.route('/:user_id').get(getUserByID).all(send405);

usersRouter
  .route('/:user_id/plants')
  .get(getPlantsByUserId)
  .post(postPlantByUserId)
  .all(send405);

module.exports = { usersRouter };
