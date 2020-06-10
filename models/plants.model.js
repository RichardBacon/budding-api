const connection = require('../db/connection');

const selectPlantsByUserId = (
  { user_id },
  { sort_by = 'created_at', order = 'desc', plant_type },
) => {
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

const insertPlantByUserId = (
  { user_id },
  { plant_name, plant_type, soil, directSunlight, inside, wateringFreq },
) => {
  return connection
    .insert({
      plant_name,
      user_id,
      plant_type,
      soil,
      directSunlight,
      inside,
      wateringFreq,
    })
    .into('plants')
    .returning('*')
    .then((plants) => {
      return plants[0];
    });
};

const updatePlantById = (
  { plant_id },
  { plant_name, plant_type, soil, directSunlight, inside, wateringFreq },
) => {
  return connection('plants')
    .update({
      plant_name,
      plant_type,
      soil,
      directSunlight,
      inside,
      wateringFreq,
    })
    .where({ plant_id })
    .returning('*')
    .then((plants) => {
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
    });
};

module.exports = {
  selectPlantsByUserId,
  insertPlantByUserId,
  updatePlantById,
  removePlantById,
};
