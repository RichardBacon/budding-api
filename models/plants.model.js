const connection = require('../db/connection');

const selectPlantsByUserId = (
  { user_id },
  { sort_by = 'created_at', order = 'desc', plant_type },
) => {
  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }

  return connection
    .select('plants.*')
    .count('snapshots.snapshot_id AS snapshot_count')
    .from('plants')
    .leftJoin('snapshots', 'plants.plant_id', 'snapshots.plant_id')
    .modify((query) => {
      if (user_id) query.where('user_id', user_id);
      if (plant_type) query.where('plant_type', plant_type);
    })
    .groupBy('plants.plant_id')
    .orderBy(sort_by, order)
    .then((plants) => {
      if (plants.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'plant not found',
        });
      }
      return plants;
    });
};

const selectPlantById = ({ plant_id }) => {
  return connection
    .select('*')
    .from('plants')
    .where({ plant_id })
    .then((plant) => {
      if (plant.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'plant not found',
        });
      }
      return plant;
    });
};

const insertPlantByUserId = (
  { user_id },
  {
    plant_name,
    plant_type,
    soil,
    direct_sunlight,
    inside,
    watering_freq,
    plant_variety,
    pot_height,
  },
) => {
  if (
    !plant_name ||
    !plant_type ||
    !soil ||
    !watering_freq ||
    !plant_variety ||
    !pot_height
  ) {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }

  return connection
    .select('users.user_id')
    .from('users')
    .modify((query) => {
      if (user_id) query.where('user_id', user_id);
    })
    .then((users) => {
      if (users.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'user not found',
        });
      }

      return connection
        .insert({
          plant_name,
          user_id,
          plant_type,
          soil,
          direct_sunlight,
          inside,
          watering_freq,
          plant_variety,
          pot_height,
        })
        .into('plants')
        .returning('*');
    })
    .then((plants) => {
      if (plants.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'user not found',
        });
      }
      return plants[0];
    });
};

const updatePlantById = (
  { plant_id },
  {
    plant_name,
    plant_type,
    soil,
    direct_sunlight,
    inside,
    watering_freq,
    plant_variety,
    pot_height,
  },
) => {
  return connection('plants')
    .modify((query) => {
      if (plant_name) query.update('plant_name', plant_name);
      if (plant_type) query.update('plant_type', plant_type);
      if (soil) query.update('soil', soil);
      if (direct_sunlight !== null)
        query.update('direct_sunlight', direct_sunlight);
      if (inside !== null) query.update('inside', inside);
      if (watering_freq) query.update('watering_freq', watering_freq);
      if (plant_variety) query.update('plant_variety', plant_variety);
      if (pot_height) query.update('pot_height', pot_height);
    })
    .where({ plant_id })
    .returning('*')
    .then((plants) => {
      if (plants.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'plant not found',
        });
      }

      return plants[0];
    });
};

const removePlantById = ({ plant_id }) => {
  return connection('plants')
    .del()
    .where({ plant_id })
    .then((deletionCount) => {
      if (deletionCount === 0) {
        return Promise.reject({ status: 404, msg: 'plant not found' });
      }

      return Promise.resolve();
    });
};

module.exports = {
  selectPlantsByUserId,
  selectPlantById,
  insertPlantByUserId,
  updatePlantById,
  removePlantById,
};
