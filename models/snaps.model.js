const connection = require('../db/connection');
const { orderBy } = require('../db/connection');

const selectSnaps = ({ plant_id }) => {
  return connection
    .select('*')
    .from('snapshots')
    .where({ plant_id })
    .orderBy('created_at', 'desc')
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

const insertSnapByPlantId = (params, body) => {
  const { plant_id } = params;
  const { plant_uri, height } = body;
  if ((plant_uri, height, plant_id)) {
    return connection('plants')
      .select('*')
      .where({ plant_id })
      .then((plant) => {
        if (plant.length === 0) {
          return Promise.reject({ status: 404, msg: 'plant not found' });
        }
        return connection('snapshots')
          .insert([{ plant_id, plant_uri, height }])
          .where({ plant_id })
          .returning('*');
      });
  }
  return Promise.reject({ status: 400, msg: 'bad request' });
};

const removeSnapBySnapId = ({ snapshot_id }) => {
  return connection('snapshots')
    .del()
    .where({ snapshot_id })
    .then((deletionCount) => {
      if (deletionCount === 0) {
        return Promise.reject({ status: 404, msg: 'snapshot not found' });
      }

      return Promise.resolve();
    });
};

module.exports = { selectSnaps, insertSnapByPlantId, removeSnapBySnapId };
