const express = require('express');
const { send405 } = require('../controllers/errors.controller');
const {
  getSnapsByPlantId,
<<<<<<< HEAD
  postSnapByPlantId,
  getPlantById,
=======
  patchPlantById,
  deletePlantById,
>>>>>>> e845fb2aed9f95b3cc215535c2756c1e8b8bfb2f
} = require('../controllers/plants.controller');

const plantsRouter = express.Router();

<<<<<<< HEAD
plantsRouter
  .route('/:plant_id/snapshots')
  .get(getSnapsByPlantId)
  .post(postSnapByPlantId)
  .all(send405);

plantsRouter.route('/:plant_id').get(getPlantById).all(send405);
=======
plantsRouter.route('/:plant_id/snapshots').get(getSnapsByPlantId).all(send405);
plantsRouter
  .route('/:plant_id')
  .patch(patchPlantById)
  .delete(deletePlantById)
  .all(send405);
>>>>>>> e845fb2aed9f95b3cc215535c2756c1e8b8bfb2f

module.exports = { plantsRouter };
