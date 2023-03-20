const { InternalServerError } = require('http-errors');

const { User } = require('../models');

const createUser = ({ ...arg }) => {
  return new User(arg);
};

const findUser = ({ ...arg }) => {
  return User.findOne(arg);
};

const updateUserById = (id, data) => {
  return User.findByIdAndUpdate(id, data);
};

const addPetForUserWithId = async (userId, petId) => {
  const userWithId = await User.find(userId);
  if (!userWithId) throw InternalServerError('Error during connection to DB');

  userWithId.pets.push(petId);

  const savedUser = await userWithId.save();
  if (!savedUser) throw InternalServerError('Error during updating user in DB');

  return savedUser;
};

module.exports = { createUser, findUser, updateUserById, addPetForUserWithId };
