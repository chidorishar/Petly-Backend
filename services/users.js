const { User } = require('../models');

const createUser = ({ ...arg }) => {
  return new User(arg);
};

const findUser = ({ ...arg }) => {
  return User.findOne(arg);
};

const updateUserById = (id, data) => {
  return User.findByIdAndUpdate(id, data);
};

module.exports = { createUser, findUser, updateUserById };
