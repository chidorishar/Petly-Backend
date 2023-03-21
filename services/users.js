const { InternalServerError } = require('http-errors');

const { User } = require('../models');

const createUser = ({ ...arg }) => {
  return new User(arg);
};

const findUser = ({ ...arg }) => {
  return User.findOne(arg);
};

const updateUserById = (id, data) => {
  return User.findByIdAndUpdate(id, { $set: data }, { new: true });
};

const addPetForUserWithId = async (userId, petId) => {
  const userWithId = await User.findOne({ _id: userId });
  if (!userWithId) throw InternalServerError('Error during connection to DB');

  userWithId.pets.push(petId);

  const savedUser = await userWithId.save();
  if (!savedUser) throw InternalServerError('Error during updating user in DB');

  return savedUser;
};

const deletePetForUserWithId = async (userId, petId) => {
  const userWithId = await User.findOne({ _id: userId });
  if (!userWithId) throw InternalServerError('Error during connection to DB');

  const deletionRes = await userWithId.updateOne(
    { _id: userId },
    {
      $pull: { pets: { $in: [petId] } },
    }
  );
  if (!deletionRes)
    throw InternalServerError('Error during deleting pet from DB');

  return deletionRes;
};

module.exports = {
  createUser,
  findUser,
  updateUserById,
  addPetForUserWithId,
  deletePetForUserWithId,
};
