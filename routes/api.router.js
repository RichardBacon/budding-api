const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const { usersRouter } = require('./users.router.js');
const { plantsRouter } = require('./plants.router.js');
const { snapsRouter } = require('./snaps.router.js');

const apiRouter = express.Router();

apiRouter.route('/').all(send405);

apiRouter.use('/users', usersRouter);
apiRouter.use('/plants', plantsRouter);
apiRouter.use('/snapshots', snapsRouter);

module.exports = { apiRouter };
