const { InternalServerError } = require('http-errors');

const { Pet } = require('../../models');

const createPet = async ({ ...arg }) => {
  const newPet = new Pet(arg);

  const savedPet = await newPet.save();
  // check is document creation in DB successful
  if (!savedPet) {
    throw InternalServerError('Failed to save your pet in DB');
  }

  return savedPet;
};

module.exports = {
  createPet,
};
