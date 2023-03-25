const { InternalServerError, Conflict } = require('http-errors');
const { userServices } = require('../../services');

const jwt = require('jsonwebtoken');

const { SECRET_KEY, NODE_ENV } = process.env;

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

  const payload = {
    id: newUser._id,
  };

  const tokenLifetime = NODE_ENV === 'development' ? '1w' : '1h';
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: tokenLifetime });
  newUser.setToken(token);

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
        token,
      },
    },
  });
};
module.exports = register;
