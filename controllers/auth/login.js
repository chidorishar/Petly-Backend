const { InternalServerError, Unauthorized } = require('http-errors');
const { userServices } = require('../../services');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong ');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
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
