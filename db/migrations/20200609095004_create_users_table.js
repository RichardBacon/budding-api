exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments('user_id');
    usersTable.string('username').unique().notNullable();
    usersTable.string('name').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
