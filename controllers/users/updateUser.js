const { User } = require('../../models/users');
const { NotFound } = require('http-errors');

const updateUser = async (req, res) => {
  const owner = req.user;
  const user = await User.findOneAndUpdate(
    { _id: owner },
    { $set: req.body },
    { new: true }
    );

  if (!user) {
    throw new NotFound(`Contact with id=${owner} not found`);
  }

  res.json(user);
};

module.exports = updateUser;