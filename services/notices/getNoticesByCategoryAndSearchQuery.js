const { BadRequest } = require('http-errors');

const { Notice, User } = require('../../models');
const utils = require('./utils');

/**
 *
 * @param {*} category
 * @param {*} searchString
 * @param {*} userId
 * @param {*} paginationObj
 * @returns
 */
const getNoticesByCategoryAndSearchQuery = async (
  category,
  searchString = '',
  userId,
  paginationObj
) => {
  const filterObj = {
    category,
    $or: [
      { title: { $regex: searchString, $options: 'i' } }, // $options: 'i' позволяет игнорировать регистр при поиске
      { comments: { $regex: searchString, $options: 'i' } },
    ],
  };

  const notices = await utils.filterNotices(Notice, filterObj, paginationObj);
  if (!notices) {
    throw new BadRequest(`Not found such category ${category}`);
  }
  if (!userId) return notices;

  const userWithId = await User.findOne({ _id: userId });
  const extendedNotices = await utils.addFieldsRelativeToUserData(
    notices,
    userWithId
  );

  return extendedNotices;
};

module.exports = getNoticesByCategoryAndSearchQuery;
