const { Notice, User } = require('../../models');
const { BadRequest } = require('http-errors');

const getNoticesByCategory = async (category, { skip, limit }, userId) => {
  const notices = await Notice.find({ category }).skip(skip).limit(limit);

  if (!notices) {
    throw new BadRequest(`Not found such category ${category}`);
  }
  // console.log(notices)
  console.log("userid",userId)
  if (!userId) return notices;
  
  const userWithId = await User.findOne({ _id: userId });
  const usersFavoriteNotices = userWithId?.favoriteNotices.toString();
  
   console.log(usersFavoriteNotices)
  return notices.map(({ _doc }) => {
    const isOwner = _doc.owner.toString() === userId;
    const isFavorite = usersFavoriteNotices.includes(_doc._id.toString())

    return {
      ..._doc,
      isOwner,
      isFavorite,
    };
  });
};

module.exports = getNoticesByCategory;
