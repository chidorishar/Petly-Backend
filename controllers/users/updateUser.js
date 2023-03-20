const { NotFound } = require('http-errors');
const { userServices } = require('../../services');

const updateUser = async (req, res) => {
  const ownerID = req.user;
  const user = await userServices.updateUserById(ownerID, req.body);

  if (!user) {
    throw new NotFound(`Contact with id=${ownerID} not found`);
  }

  res.json(user);
};

module.exports = updateUser;
