const { Services } = require('../models');

const findServices = ({ ...arg }) => {
  return Services.find(arg);
};

module.exports = { findServices };
