const connection = require('../db/connection');

const selectPlantsByUserId = (
  { user_id },
  { sort_by = 'created_at', order = 'desc' },
) => {
  return connection
    .select('*')
    .from('plants')
    .modify((query) => {
      if (user_id) query.where('user_id', user_id);
    })
    .orderBy(sort_by, order)
    .then((plants) => {
      if (plants.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'user not found',
        });
      }

      return plants;
    });
};

module.exports = {
  selectPlantsByUserId,
};
