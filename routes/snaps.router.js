const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const { deleteSnapBySnapId } = require('../controllers/snapshots.controller');

const snapsRouter = express.Router();

snapsRouter.route('/:snapshot_id').delete(deleteSnapBySnapId).all(send405);

module.exports = { snapsRouter };
