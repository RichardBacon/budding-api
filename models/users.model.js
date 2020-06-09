const connection = require('../db/connection');

const selectUsers = () => {
  return connection.select('*').from('users');
};

module.exports = {
  selectUsers,
};
