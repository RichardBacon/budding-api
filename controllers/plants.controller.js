const { selectSnaps } = require('../models/snaps.model');
const {
  selectPlantsByUserId,
  insertPlantByUserId,
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

const postPlantByUserId = (req, res, next) => {
  insertPlantByUserId(req.params, req.body)
    .then((plant) => {
      res.status(201).send({ plant });
    })
    .catch(next);
};

module.exports = { getSnapsByPlantId, getPlantsByUserId, postPlantByUserId };
