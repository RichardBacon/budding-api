const {
  selectUsers,
  selectUserByID,
  insertUser,
} = require('../models/users.model');

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

const postUser = (req, res, next) => {
  insertUser(req.body)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
};
