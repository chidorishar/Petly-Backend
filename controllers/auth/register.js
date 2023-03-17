const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { name, email, password, location, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exists`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    location,
    phone,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: 'success',
    code: '201',
    data: {
      user: {
        name,
        location,
        phone,
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};
module.exports = register;
