const { userServices, petsServices } = require('../../services');

const getUserInformation = async (req, res) => {
  const _id = req.user;

  const user = await userServices.findUser({ _id });
  const pets = await petsServices.findPets({ owner: _id });

  res.status(200).json({ user, pets });
};

module.exports = getUserInformation;
