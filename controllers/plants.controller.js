const { selectSnaps, insertSnapByPlantId } = require('../models/snaps.model');
const {
  selectPlantsByUserId,
  selectPlantById,
  insertPlantByUserId,
  updatePlantById,
  removePlantById,
} = require('../models/plants.model');

const getSnapsByPlantId = (req, res, next) => {
  selectSnaps(req.params)
    .then((snaps) => {
      res.status(200).send({ snaps });
    })
    .catch(next);
};

const getPlantsByUserId = (req, res, next) => {
  selectPlantsByUserId(req.params, req.query)
    .then((plants) => {
      res.status(200).send({ plants });
    })
    .catch(next);
};

const getPlantById = (req, res, next) => {
  selectPlantById(req.params)
    .then(([plant]) => {
      res.status(200).send({ plant });
    })
    .catch(next);
};

const postPlantByUserId = (req, res, next) => {
  insertPlantByUserId(req.params, req.body)
    .then((plant) => {
      res.status(201).send({ plant });
    })
    .catch(next);
};

const patchPlantById = (req, res, next) => {
  updatePlantById(req.params, req.body)
    .then((plant) => {
      res.status(200).send({ plant });
    })
    .catch(next);
};

const postSnapByPlantId = (req, res, next) => {
  insertSnapByPlantId(req.params, req.body)
    .then((snap) => {
      res.status(201).send({ snap });
    })
    .catch(next);
};

const deletePlantById = (req, res, next) => {
  removePlantById(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = {
  getSnapsByPlantId,
  getPlantsByUserId,
  getPlantById,
  postSnapByPlantId,
  postPlantByUserId,
  patchPlantById,
  deletePlantById,
};
