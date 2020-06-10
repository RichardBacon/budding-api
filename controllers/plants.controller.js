const { selectSnaps } = require('../models/snaps.model');

const getSnapsByPlantId = (req, res, next) => {
  selectSnaps(req.params)
    .then((snaps) => {
      console.log(snaps);
      res.status(200).send({ snaps });
    })
    .catch(next);
};

module.exports = { getSnapsByPlantId };
