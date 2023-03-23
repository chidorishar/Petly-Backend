const { BadRequest } = require('http-errors');

const { Notice, User } = require('../../models');
const { filterNotices } = require('./utils/filterNotices.js');

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

  const notices = await filterNotices(Notice, filterObj, paginationObj);
  if (!notices) {
    throw new BadRequest(`Not found such category ${category}`);
  }
  if (!userId) return notices;

  const userWithId = await User.findOne({ _id: userId });
  const userFavoriteNotices = userWithId?.favoriteNotices;

  return notices.map(({ _doc }) => {
    const isOwner = _doc.owner.toString() === userId;
    const isFavorite = userFavoriteNotices.includes(_doc._id);

    return {
      ..._doc,
      isOwner,
      isFavorite,
    };
  });
};

module.exports = getNoticesByCategoryAndSearchQuery;
