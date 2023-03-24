const cloudinary = require('cloudinary').v2;
const { User } = require('../../models');
const fs = require('fs/promises');

const updateAvatar = async (req, res) => {
  const ownerID = req.user;
  const { path: tempUpload } = req.file;
  const { url, public_id } = await cloudinary.uploader.upload(tempUpload);
  const avatarURL = url;
  await User.findByIdAndUpdate(ownerID, { avatarURL });
  await cloudinary.uploader.destroy(public_id);
  fs.unlink(tempUpload);
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
