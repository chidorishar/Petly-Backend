const { NotFound } = require('http-errors');

const { Pet } = require('../../models');
const { userServices } = require('../../services');

const deletePetById = async (req, res) => {
  const ownerID = req.user;
  const petID = req.params.id;

  userServices.deletePetForUserWithId(ownerID);
  const result = await Pet.findOneAndRemove({ owner: ownerID, _id: petID });
  if (!result) {
    throw new NotFound('Pet not found');
  }

  res.json({
    message: `pet with ${ownerID} deleted`,
    result,
  });
};

module.exports = deletePetById;
