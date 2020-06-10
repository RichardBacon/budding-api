const { selectPlantsByUserId } = require('../models/plants.model');

const getPlantsByUserId = (req, res, next) => {
  selectPlantsByUserId(req.params, req.query)
    .then((plants) => {
      res.status(200).send({ plants });
    })
    .catch(next);
};

module.exports = {
  getPlantsByUserId,
};
