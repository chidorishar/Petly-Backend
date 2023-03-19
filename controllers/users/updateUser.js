const { User } = require('../../models/users');
const ObjectId = require('mongodb').ObjectId;
const { NotFound } = require('http-errors');

const updateUser = async (req, res) => {
  console.log('body', req.body);
  const owner = req.user;
  const _id = ObjectId(req.params.id);

  const user = await User.findOneAndUpdate(
    { _id: owner },
    { $set: req.body },
    { new: true }
    );

    
  if (!user) {
    throw new NotFound(`Contact with id=${_id} not found`);
  }

  res.json(user);
};

module.exports = updateUser;