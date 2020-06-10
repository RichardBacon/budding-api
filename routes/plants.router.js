const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const { getSnapsByPlantId } = require('../controllers/plants.controller');

const plantsRouter = express.Router();

plantsRouter.route('/:plant_id/snapshots').get(getSnapsByPlantId).all(send405);

module.exports = { plantsRouter };
