const { NotFound } = require('http-errors');
const { userServices } = require('../../services');

const updateUser = async (req, res) => {
  const owner = req.user;
  const user = await userServices.updateUserById(
    { _id: owner },
    { $set: req.body },
    );

  if (!user) {
    throw new NotFound(`Contact with id=${owner} not found`);
  }

  res.json(user);
};

module.exports = updateUser;