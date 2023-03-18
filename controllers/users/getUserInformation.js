const { userServices } = require('../../services');

const getUserInformation = async (req, res) => {
  const _id = req.user;
  const user = await userServices.findUser({ _id });
  await user.populate('pets');

  res.status(200).json({ user });
};

module.exports = getUserInformation;
