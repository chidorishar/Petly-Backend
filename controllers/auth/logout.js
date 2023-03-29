const { User } = require('../../models');

const logout = async (req, res, next) => {
  const userId = req.user;
  await User.findByIdAndUpdate(userId, { accessToken: null });
  res.status(204).json();
};

module.exports = logout;
