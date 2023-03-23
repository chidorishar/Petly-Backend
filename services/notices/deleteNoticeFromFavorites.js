const { User } = require('../../models');


const deleteNoticeFromFavorites = async (id, userId) => {
  const {favoriteNotices} = await User.findOneAndUpdate({ _id: userId },  { $pull: { favoriteNotices: id } });
  return favoriteNotices;
};

module.exports = deleteNoticeFromFavorites;
