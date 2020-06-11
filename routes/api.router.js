const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const { usersRouter } = require('./users.router.js');
const { plantsRouter } = require('./plants.router.js');
const endpoints = require('../endpoints.json');

const apiRouter = express.Router();

apiRouter
  .route('/')
  .get((req, res) => {
    res.status(200).send(endpoints);
  })
  .all(send405);

apiRouter.use('/users', usersRouter);
apiRouter.use('/plants', plantsRouter);

module.exports = { apiRouter };
