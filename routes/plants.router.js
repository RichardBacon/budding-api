const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const {
  getSnapsByPlantId,
  patchPlantById,
  deletePlantById,
} = require('../controllers/plants.controller');

const plantsRouter = express.Router();

plantsRouter.route('/:plant_id/snapshots').get(getSnapsByPlantId).all(send405);
plantsRouter
  .route('/:plant_id')
  .patch(patchPlantById)
  .delete(deletePlantById)
  .all(send405);

module.exports = { plantsRouter };
