const { User } = require('../../models');
const { cloudinaryServices } = require('../../services');

const updateAvatar = async (req, res) => {
  const ownerID = req.user;
  const { url, public_id } = req;
  const user = await User.findById(ownerID);

  await cloudinaryServices.deleteImageFromCloudinary(user.cloudinaryImagePublicId);
  user.setAvatar(url, public_id);
  user.save();

  res.status(201).end();
};

module.exports = updateAvatar;
