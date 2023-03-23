const { BadRequest } = require('http-errors');

const { User } = require('../../models');

const getFavoriteNotices = async (userId, paginationData) => {
  const userWithID = await User.findOne({ _id: userId }).populate({
    path: 'favoriteNotices',
    options: paginationData,
  });
  if (!userWithID) {
    throw new BadRequest(`User with such id ${userId} not found`);
  }

  const notices = userWithID.favoriteNotices;

  return notices;
};

module.exports = getFavoriteNotices;

/// const notices = await User.findOne({ _id: userId }).populate('favoriteNotices')
// return notices.favoriteNotices;
