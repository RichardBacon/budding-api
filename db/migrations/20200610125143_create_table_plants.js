exports.up = function (knex) {
  return knex.schema.createTable('plants', (plantsTable) => {
    plantsTable.increments('plant_id');
    plantsTable.string('plant_name').notNullable();
    plantsTable.integer('user_id').references('users.user_id').notNullable();
    plantsTable
      .string('plant_type')
      .references('plant_types.plant_type')
      .notNullable();
    plantsTable.string('plant_variety').notNullable();
    plantsTable.decimal('pot_height', 8, 1).notNullable();
    plantsTable.string('soil');
    plantsTable.string('sunlight').notNullable();
    plantsTable.string('location').notNullable();
    plantsTable.string('watering_freq');
    plantsTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('plants');
};
