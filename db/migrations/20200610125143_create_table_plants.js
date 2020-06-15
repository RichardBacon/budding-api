exports.up = function (knex) {
  return knex.schema.createTable('plants', (plantsTable) => {
    plantsTable.increments('plant_id');
    plantsTable.text('plant_name').notNullable();
    plantsTable.integer('user_id').references('users.user_id').notNullable();
    plantsTable
      .text('plant_type')
      .references('plant_types.plant_type')
      .notNullable();
    plantsTable.text('plant_variety').notNullable();
    plantsTable.decimal('pot_height').notNullable();
    plantsTable.text('soil').notNullable();
    plantsTable.boolean('direct_sunlight').notNullable();
    plantsTable.boolean('inside').notNullable();
    plantsTable.integer('watering_freq').notNullable();
    plantsTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('plants');
};
