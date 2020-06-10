const { selectSnaps } = require('../models/snaps.model');
const { selectPlantsByUserId } = require('../models/plants.model');

const getSnapsByPlantId = (req, res, next) => {
  selectSnaps(req.params).then((snaps) => {
    console.log(snaps);
    res.status(200).send({ snaps });
  });
};

const getPlantsByUserId = (req, res, next) => {
  selectPlantsByUserId(req.params, req.query)
    .then((plants) => {
      res.status(200).send({ plants });
    })
    .catch(next);
};

module.exports = { getSnapsByPlantId, getPlantsByUserId };
