const { InternalServerError, Conflict } = require('http-errors');
const { userServices } = require('../../services');

const register = async (req, res) => {
  const { name, email, password, location, phone } = req.body;

  const user = await userServices.findUser({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exists`);
  }

  const {public_id, url} = req;
  const newUser = await userServices.createUser({
    name,
    email,
    location,
    phone,
  });
  newUser.setPassword(password);
  newUser.setAvatar(url, public_id);
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
