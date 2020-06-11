const { selectSnaps, insertSnapByPlantId } = require('../models/snaps.model');
const {
  selectPlantsByUserId,
  selectPlantById,
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

const postSnapByPlantId = (req, res, next) => {
  insertSnapByPlantId(req.params, req.body)
    .then(([snap]) => {
      res.status(200).send({ snap });
    })
    .catch(next);
};

module.exports = {
  getSnapsByPlantId,
  getPlantsByUserId,
  getPlantById,
  postSnapByPlantId,
};
