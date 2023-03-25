const { InternalServerError, Unauthorized } = require('http-errors');
const { userServices } = require('../../services');

const jwt = require('jsonwebtoken');

const { SECRET_KEY, NODE_ENV } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email }, true);

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong ');
  }

  const payload = {
    id: user._id,
  };
  const tokenLifetime = NODE_ENV === 'development' ? '1w' : '1h';
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: tokenLifetime });
  const usr = await userServices.updateUserById(user._id, { token });
  if (!usr) throw new InternalServerError('Failed to save new user');

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        token,
        email,
        name: usr.name,
      },
    },
  });
};
module.exports = login;
