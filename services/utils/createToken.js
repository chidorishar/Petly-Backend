const jwt = require('jsonwebtoken');

const { SECRET_KEY, NODE_ENV } = process.env;

/**
 * Creates a token for the user.
 *
 * @param {*} payload - token payload
 * @returns token
 */
const createToken = payload => {
  const tokenLifetime = NODE_ENV === 'development' ? '1w' : '1h';
  return jwt.sign(payload, SECRET_KEY, { expiresIn: tokenLifetime });
};

module.exports = {
  createToken,
};
