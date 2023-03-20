const { Pet } = require('../../models');

const createPet = ({ ...arg }) => {
  return new Pet(arg);
};

module.exports = {
  createPet,
};
