const { Pet } = require('../../models');
const { NotFound } = require('http-errors');

const deletePetById = async (req, res) => {
  const ownerID = req.user;
  const result = await Pet.findOneAndRemove(ownerID, req.body);
  if (!result) {
    throw new NotFound(404, 'Pet not found');
  }

  res.json({
    message: `pet with ${ownerID} deleted`,
    result,
  });
};

module.exports = deletePetById;
