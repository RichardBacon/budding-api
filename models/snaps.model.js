const connection = require('../db/connection');

const selectSnaps = ({ plant_id }) => {
  return connection
    .select('*')
    .from('snapshots')
    .where({ plant_id })
    .then((snaps) => {
      if (snaps.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'plant not found',
        });
      }
      return snaps;
    });
};

module.exports = { selectSnaps };
