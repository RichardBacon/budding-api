const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const {
  getSnapsByPlantId,
  postSnapByPlantId,
  getPlantById,
} = require('../controllers/plants.controller');

const plantsRouter = express.Router();

plantsRouter
  .route('/:plant_id/snapshots')
  .get(getSnapsByPlantId)
  .post(postSnapByPlantId)
  .all(send405);

plantsRouter.route('/:plant_id').get(getPlantById).all(send405);

module.exports = { plantsRouter };
