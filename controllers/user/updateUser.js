const User = require('../models/user'); 
const { joiEditSchema } = require('../../models'); 

async function updateUser(req, res) {
  const { error } = joiEditSchema.validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message); 

  const { email, name, location, phone } = req.body;
  const userId = req.params._id; 

  try {
    const user = await User.findById(userId); 
    if (!user) return res.status(404).send('User not found');

    if (email) user.email = email; 
    if (name) user.name = name;
    if (location) user.location = location;
    if (phone) user.phone = phone;

    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = { updateUser };
