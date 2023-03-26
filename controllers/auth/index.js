const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./current');
const refreshAccessToken = require('./refresh');

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  refreshAccessToken,
};
