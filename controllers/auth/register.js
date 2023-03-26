const { InternalServerError, Conflict } = require('http-errors');

const { userServices, utils } = require('../../services');

const register = async (req, res) => {
  const { name, email, password, location, phone } = req.body;

  const user = await userServices.findUser({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exists`);
  }

  const newUser = await userServices.createUser({
    name,
    email,
    location,
    phone,
  });
  newUser.setPassword(password);
  newUser.setAvatar(null, '');

  const accessToken = utils.createAccessToken({ id: newUser._id });
  const refreshToken = utils.createRefreshToken({ id: newUser._id });
  newUser.setToken(accessToken);

  const savedUser = await newUser.save();
  if (!savedUser) throw new InternalServerError('Failed to save new user');

  res.status(201).json({
    status: 'success',
    code: '201',
    data: {
      user: {
        name,
        location,
        phone,
        email,
        avatarUrl: savedUser.avatarUrl,
        accessToken,
        refreshToken,
      },
    },
  });
};
module.exports = register;
