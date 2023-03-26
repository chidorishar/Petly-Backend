const { userServices } = require('../../services');

const getCurrentUser = async (req, res) => {
  const id = req.user;

  const user = await userServices.findUserById(id);

  const { name, location, phone, email, avatarUrl } = user;

  res.status(200).json({
    status: 'success',
    code: '200',
    data: {
      user: {
        name,
        location,
        phone,
        email,
        avatarUrl,
      },
    },
  });
};

module.exports = getCurrentUser;
