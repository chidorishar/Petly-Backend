const { InternalServerError, Unauthorized } = require('http-errors');

const { userServices, utils } = require('../../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email }, true);

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong ');
  }

  const token = utils.createToken({ id: user._id });

  const usr = await userServices.updateUserById(user._id, { token });
  if (!usr) throw new InternalServerError('Failed to save new user');

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
      },
    },
  });
};
module.exports = login;
