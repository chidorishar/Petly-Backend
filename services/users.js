const { InternalServerError } = require('http-errors');

const { User } = require('../models');

const createUser = ({ ...arg }) => {
  return new User(arg);
};

const findUser = ({ ...arg }) => {
  return User.findOne(arg).select('-token -password -favoriteNotices -notices');
};

const updateUserById = (id, data) => {
  return User.findByIdAndUpdate(id, { $set: data }, { new: true }).select(
    '-token -password -favoriteNotices -pets -notices'
  );
};

const addPetForUserWithId = async (userId, petId) => {
  const userWithId = await User.findOne({ _id: userId });
  if (!userWithId) throw InternalServerError('Error during connection to DB');

  userWithId.pets.push(petId);

  const savedUser = await userWithId.save();
  if (!savedUser) throw InternalServerError('Error during updating user in DB');

  return savedUser;
};

module.exports = { createUser, findUser, updateUserById, addPetForUserWithId };
