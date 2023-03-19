const { User } = require('../../models');

const logout = async (req, res, next) => {
  try {
    const userId = req.user;
    await User.findByIdAndUpdate(userId, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
