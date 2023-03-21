const { petServices, userServices } = require('../../services');

const addPet = async (req, res) => {
  const _id = req.user;

  const newPet = await petServices.createPet({
    ...req.body,
    photo: req.url,
    owner: _id,
  });
  await userServices.addPetForUserWithId(_id, newPet._id);

  res.status(201).json({
    message: 'success',
    pet: newPet,
  });
};

module.exports = addPet;
