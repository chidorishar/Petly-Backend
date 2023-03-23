const cloudinary = require('cloudinary').v2;
const { User } = require('../../models');
const fs = require('fs/promises');

const updateAvatar = async (req, res) => {
  const ownerID = req.user;
  const { path: tempUpload } = req.file;
  const { url } = await cloudinary.uploader.upload(tempUpload);
  const avatarURL = url;
  await User.findByIdAndUpdate(ownerID, { avatarURL });
  fs.unlink(tempUpload);
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
