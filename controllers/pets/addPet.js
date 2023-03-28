const {
  petServices,
  userServices,
  checkCorrectDate,
} = require('../../services');
const { BadRequest } = require('http-errors');

const addPet = async (req, res) => {
  const _id = req.user;

  const { birthday } = req.body;
  const isDateCorrect = checkCorrectDate(birthday, 'pet');

  if (!isDateCorrect)
    throw new BadRequest(
      'The date must be no more than 15 years in the past, or later than today'
    );

  const newPet = await petServices.createPet({
    ...req.body,
    photo: req.url,
    cloudinaryImagePublicId: req.public_id,
    owner: _id,
  });
  await userServices.addPetForUserWithId(_id, newPet._id);

  res.status(201).json({
    message: 'success',
    pet: newPet,
  });
};

module.exports = addPet;
