const { InternalServerError, Unauthorized } = require('http-errors');

const { User } = require('../models');

const createUser = ({ ...arg }) => {
  return new User(arg);
};

const findUser = (searchQueryObj, returnFullData = false) => {
  const foundUser = User.findOne(searchQueryObj);

  return returnFullData
    ? foundUser
    : foundUser?.select('-token -password -favoriteNotices -notices');
};

const findUserById = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new Unauthorized('Not authorized');
  }

  return user;
};

const updateUserById = async (id, data) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  ).select('-token -password -favoriteNotices -pets -notices');

  if (!user) throw new InternalServerError('Failed to save new user');

  return user;
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
  findUserById,
  updateUserById,
  addPetForUserWithId,
  deletePetForUserWithId,
};
