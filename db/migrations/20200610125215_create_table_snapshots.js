exports.up = function (knex) {
  return knex.schema.createTable('snapshots', (snapshotsTable) => {
    snapshotsTable.increments('snapshot_id').primary();
    snapshotsTable
      .integer('plant_id')
      .references('plants.plant_id')
      .notNullable()
      .onDelete('CASCADE');
    snapshotsTable.string('plant_uri').notNullable();
    snapshotsTable.integer('no_leaves');
    snapshotsTable.integer('height').notNullable();
    snapshotsTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('snapshots');
};
