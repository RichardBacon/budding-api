const connection = require('../db/connection');

const selectUsers = () => {
  return connection.select('*').from('users');
};

const selectUserByID = ({ user_id }) => {
  return connection
    .select('*')
    .from('users')
    .modify((query) => {
      if (user_id) query.where('user_id', user_id);
    })
    .then((users) => {
      if (users.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'user not found',
        });
      }
      return users[0];
    });
};

const insertUser = ({ username, name }) => {
  if (!username || !name) {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }

  return connection
    .insert({
      username,
      name,
    })
    .into('users')
    .returning('*')
    .then((users) => {
      return users[0];
    });
};

module.exports = {
  selectUsers,
  selectUserByID,
  insertUser,
};
