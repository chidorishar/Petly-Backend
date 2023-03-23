const { User, Notice } = require('../../models');
// const { BadRequest } = require('http-errors');

const deleteOwnNotice = async (noticeID, ownerID) => {
  // try to find the notice which is owned by a user with ownerID and remove it from notices DB
  const notice = await Notice.findOneAndRemove({
    _id: noticeID,
    owner: ownerID,
  });

  // if notice was removed from notices DB then remove it from favorites for all users
  if (notice)
    await User.updateMany(
      { favoriteNotices: noticeID },
      { $pull: { favoriteNotices: noticeID } }
    );

  return notice;
};

module.exports = deleteOwnNotice;
