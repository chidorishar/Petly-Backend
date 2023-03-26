const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

/**
 * Creates a token for the user.
 *
 * @param {*} payload - token payload
 * @returns token
 */
const createAccessToken = payload => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = {
  createAccessToken,
};
