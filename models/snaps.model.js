const connection = require('../db/connection');

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

  if (!plant_uri || !height || !plant_id) {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }

  return connection
    .select('*')
    .from('plants')
    .where({ plant_id })
    .then((plants) => {
      if (plants.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'plant not found',
        });
      }

      return connection
        .insert({ plant_id, plant_uri, height })
        .into('snapshots')
        .returning('*');
    })
    .then((snapshots) => {
      return snapshots[0];
    });
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
