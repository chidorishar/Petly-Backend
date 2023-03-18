const { User } = require('../../models');
const { InternalServerError, Conflict } = require('http-errors');

const register = async (req, res) => {
  const { name, email, password, location, phone } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exists`);
  }

  const newUser = new User({
    name,
    email,
    location,
    phone,
  });
  newUser.setPassword(password);
  newUser.setAvatar();
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
      },
    },
  });
};
module.exports = register;
