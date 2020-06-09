const { selectUsers, selectUserByID } = require('../models/users.model');

const getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getUserByID = (req, res, next) => {
  selectUserByID(req.params)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserByID,
};
