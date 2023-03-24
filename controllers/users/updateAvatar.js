const cloudinary = require('cloudinary').v2;
const { User } = require('../../models');
const fs = require('fs/promises');

const updateAvatar = async (req, res) => {
  const ownerID = req.user;
  const { path: tempUpload } = req.file;

  const user = await User.findById(ownerID);
  const currentAvatarURL = user.avatarURL;

  if (currentAvatarURL) {
    const public_id = currentAvatarURL.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(public_id);
  }

  const { public_id, url } = await cloudinary.uploader.upload(tempUpload);
  const avatarURL = url;

  await User.findByIdAndUpdate(ownerID, { avatarURL });
  await fs.unlink(tempUpload);
  res.json({ avatarURL });
};

module.exports = updateAvatar;
