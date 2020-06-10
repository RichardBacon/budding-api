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

const insertSnapByPlantId = (params, body) => {
  const { plant_id } = params;
  const { plant_uri, no_leaves, height } = body;
  if ((plant_uri, height, plant_id)) {
    return connection('snapshots')
      .insert([{ plant_id, plant_uri, no_leaves, height }])
      .where({ plant_id })
      .returning('*');
  } else {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }
};

const removeSnapBySnapId = ({ snapshot_id }) => {
  console.log('inside snap model', snapshot_id);
  return connection('snapshots')
    .where({ snapshot_id })
    .then((snap) => {
      if (snap.length === 0) {
        return Promise.reject({ status: 404, msg: 'snapshot not found' });
      }
    })
    .then(() => {
      return connection('snapshots').where({ snapshot_id }).del();
    });
};

module.exports = { selectSnaps, insertSnapByPlantId, removeSnapBySnapId };
