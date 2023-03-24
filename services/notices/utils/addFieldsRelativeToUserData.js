/**
 *
 * @param {*} notices - must be populated notices array!!!
 * @param {*} userDoc - must be userDoc without populated "notices" or "favoriteNotices" fields!!!
 * @returns
 */
async function addFieldsRelativeToUserData(notices, userDoc) {
  const userId = userDoc._id.toString();
  // console.log(userId);
  const userFavoriteNotices = userDoc?.favoriteNotices;

  return notices.map(({ _doc }) => {
    const isOwner = _doc.owner.toString() === userId;
    const isFavorite = userFavoriteNotices.includes(_doc._id);

    return {
      ..._doc,
      isOwner,
      isFavorite,
    };
  });
}

module.exports = {
  addFieldsRelativeToUserData,
};
