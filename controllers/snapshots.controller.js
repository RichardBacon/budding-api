const { removeSnapBySnapId } = require('../models/snaps.model');

const deleteSnapBySnapId = (req, res, next) => {
  console.log('inside snap controller', req.params);
  removeSnapBySnapId(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = { deleteSnapBySnapId };
