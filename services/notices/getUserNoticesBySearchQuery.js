const { BadRequest } = require('http-errors');

const { User } = require('../../models');
const utils = require('./utils');

const getUserNoticesBySearchQuery = async (
  getOwnNotices = true,
  searchString = '',
  userId,
  paginationData
) => {
  const filterObj = {
    $or: [
      { title: { $regex: searchString, $options: 'i' } }, // $options: 'i' позволяет игнорировать регистр при поиске
      { comments: { $regex: searchString, $options: 'i' } },
    ],
  };

  const fieldToPopulate = getOwnNotices ? 'notices' : 'favoriteNotices';
  const userWithPopulatedData = await User.findOne({ _id: userId }).populate({
    path: fieldToPopulate,
    options: paginationData,
    match: filterObj,
  });
  if (!userWithPopulatedData) {
    throw new BadRequest(`Not found user with ID ${userId}`);
  }
  const userWithID = await User.findOne({ _id: userId });

  const notices = getOwnNotices
    ? userWithPopulatedData.notices
    : userWithPopulatedData.favoriteNotices;
  const extendedNotices = await utils.addFieldsRelativeToUserData(
    notices,
    userWithID
  );

  return extendedNotices;
};

module.exports = getUserNoticesBySearchQuery;
