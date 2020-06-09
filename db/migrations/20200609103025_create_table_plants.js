exports.up = function (knex) {
  return knex.schema.createTable('plants', (plantsTable) => {
    plantsTable.increments('plant_id');
    plantsTable.text('plant_name').notNullable();
    plantsTable.integer('owner_id').references('users.user_id').notNullable();
    plantsTable.text('type').notNullable();
    plantsTable.text('soil').notNullable();
    plantsTable.boolean('directSunlight').notNullable();
    plantsTable.boolean('inside').notNullable();
    plantsTable.text('wateringFreq').notNullable();
    plantsTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('plants');
};
