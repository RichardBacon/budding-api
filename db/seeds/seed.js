const { userData, plantData, snapshotData } = require('../data/index.js');

const { formatDates } = require('../utils/utils');

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('users').insert(userData);
    })
    .then(() => {
      const formattedPlantData = formatDates(plantData);
      return knex('plants').insert(formattedPlantData);
    })
    .then(() => {
      const formattedSnapshotData = formatDates(snapshotData);
      return knex('snapshots').insert(formattedSnapshotData);
    });
};
