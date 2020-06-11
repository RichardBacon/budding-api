const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const { usersRouter } = require('./users.router.js');
const { plantsRouter } = require('./plants.router.js');
<<<<<<< HEAD
const { snapsRouter } = require('./snaps.router.js');
=======
const endpoints = require('../endpoints.json');
>>>>>>> e845fb2aed9f95b3cc215535c2756c1e8b8bfb2f

const apiRouter = express.Router();

apiRouter
  .route('/')
  .get((req, res) => {
    res.status(200).send(endpoints);
  })
  .all(send405);

apiRouter.use('/users', usersRouter);
apiRouter.use('/plants', plantsRouter);
apiRouter.use('/snapshots', snapsRouter);

module.exports = { apiRouter };
