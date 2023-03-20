const { InternalServerError } = require('http-errors');

const { Pet } = require('../../models');

const createPet = async ({ ...arg }) => {
  const newPet = new Pet(arg);

  // check is document creation in DB successful
  if (!newPet) {
    throw InternalServerError('Failed to save your pet in DB');
  }

  return newPet;
};

module.exports = {
  createPet,
};
