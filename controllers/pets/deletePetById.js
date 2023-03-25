const { NotFound } = require('http-errors');

const { Pet } = require('../../models');
const { userServices, cloudinaryServices } = require('../../services');

const deletePetById = async (req, res) => {
  const ownerID = req.user;
  const petID = req.params.id;

  userServices.deletePetForUserWithId(ownerID, petID);
  const deletedPet = await Pet.findOneAndRemove({ owner: ownerID, _id: petID });
  if (!deletedPet) {
    throw new NotFound('Pet not found');
  }

  const { cloudinaryImagePublicId } = deletedPet;
  if (cloudinaryImagePublicId)
    await cloudinaryServices.deleteImageFromCloudinary(cloudinaryImagePublicId);

  res.json({
    message: `pet with ${ownerID} deleted`,
    result: deletedPet,
  });
};

module.exports = deletePetById;
