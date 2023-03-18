const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const [type, token] = req.headers.authorization.split(' ');
    if (!token || type !== 'Bearer') {
      throw new Unauthorized('Not authorized in IF');
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.id;
    next();
  } catch (error) {
    return next(error);
  }
};
