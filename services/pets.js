const { Pet } = require('../models');

const findPets = ({ ...arg }) => {
  return Pet.find(arg);
};

module.exports = { findPets };
