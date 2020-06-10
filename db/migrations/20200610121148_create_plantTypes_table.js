exports.up = function (knex) {
  return knex.schema.createTable('plant_types', (plantTypesTable) => {
    plantTypesTable.increments('plant_type_id');
    plantTypesTable.text('plant_type').unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('plant_types');
};
