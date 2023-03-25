const parseUserToken = require('./parseUserToken');
const parsePagination = require('./parsePagination');

module.exports = {
  ...parsePagination,
  ...parseUserToken,
  ...require('./createToken'),
};
