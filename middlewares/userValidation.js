const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const [type, token] = req.headers.authorization.split(' ');
    if (!token || type !== 'Bearer') {
      throw new Unauthorized('Not authorized in IF');
    }

    const {id} = jwt.verify(token, secretKey);
    
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = id;
    next();
  } catch (error) {
    return next(error);
  }
};
