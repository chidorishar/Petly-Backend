const { Unauthorized } = require('http-errors');

const { userServices, utils } = require('../../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email }, true);

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong ');
  }

  const accessToken = utils.createAccessToken({ id: user._id });
  const refreshToken = utils.createRefreshToken({ id: user._id });

  const { name, location, phone, avatarUrl } =
    await userServices.updateUserById(user._id, { accessToken });

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        name,
        location,
        phone,
        email,
<<<<<<< HEAD
        avatarUrl,
        accessToken,
        refreshToken,
=======
        name: usr.name,
>>>>>>> 4197b81 (Added user name to login's response)
      },
    },
  });
};
module.exports = login;
