const { User } = require('../../models');
const { cloudinaryServices } = require('../../services');

const updateAvatar = async (req, res) => {
  const ownerID = req.user;
  const { url, public_id } = req;
  const user = await User.findById(ownerID);
  const currAvatCloudID = user.cloudinaryImagePublicId;

  if (currAvatCloudID)
    await cloudinaryServices.deleteImageFromCloudinary(currAvatCloudID);
  user.setAvatar(url, public_id);
  await user.save();

  res.status(201).end();
};

module.exports = updateAvatar;
