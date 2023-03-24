const { User, Notice } = require('../../models');
// const { BadRequest } = require('http-errors');

const addNotice = async (userId, data, image, imageCloudinaryID) => {
  const notice = new Notice({
    ...data,
    owner: userId,
    image,
    cloudinaryImagePublicId: imageCloudinaryID,
  });
  await notice.save();

  await User.updateOne({ _id: userId }, { $push: { notices: notice._id } });

  return notice;
};

module.exports = addNotice;
