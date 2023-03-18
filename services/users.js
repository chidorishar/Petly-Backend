const { User } = require('../models');

const findUser = ({ ...arg }) => {
  return User.findOne(arg);
};

module.exports = { findUser };
