exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments('user_id');
    usersTable.string('username').unique().notNullable();
    usersTable.string('name').notNullable();
    usersTable.string('avatar_url').notNullable();
    usersTable.string('password').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
