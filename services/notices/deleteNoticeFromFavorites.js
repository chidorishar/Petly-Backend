const { User } = require('../../models');

const deleteNoticeFromFavorites = async (noticeID, userId) => {
  const { favoriteNotices: oldFavNoticesArray } = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favoriteNotices: noticeID } }
  );

  return oldFavNoticesArray.includes(noticeID);
};

module.exports = deleteNoticeFromFavorites;
